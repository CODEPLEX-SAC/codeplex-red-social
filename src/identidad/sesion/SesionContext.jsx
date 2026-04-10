import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseSaas } from '../../lib/supabase-saas';

/* ═══════════════════════════════════════════════════════════════
   BOUNDED CONTEXT: Sesión
   Ubiquitous Language: estadoSesion, modoExploracion, usuario
   Valores posibles de estadoSesion:
     'cargando'              → verificando sesión al inicio
     'exploracion'           → visitante sin cuenta
     'autenticando-social'   → modal auth red social activo
     'autenticando-saas'     → página login SaaS completa
     'verificando-identidad' → registro OK, subiendo DNI+selfie
     'autenticado'           → sesión confirmada
═══════════════════════════════════════════════════════════════ */

const SesionContext = createContext(null);

const PERFIL_DEFAULT = {
  nombre: '', apellido: '', email: '', telefono: '', dni: '',
  fechaNacimiento: '', genero: '', pais: '', ciudad: '',
  empresa: '', cargo: '', rubro: '', bio: '', avatar: '',
};

/* Clave de localStorage por usuario — cada usuario tiene su propio espacio */
function storagePerfil(userId) {
  return userId ? `codeplex_datos_personales_${userId}` : null;
}

function cargarPerfil(userId) {
  try {
    const key = storagePerfil(userId);
    if (!key) return PERFIL_DEFAULT;
    const raw = localStorage.getItem(key);
    return raw ? { ...PERFIL_DEFAULT, ...JSON.parse(raw) } : PERFIL_DEFAULT;
  } catch { return PERFIL_DEFAULT; }
}

export function SesionProvider({ children }) {
  const [estadoSesion, setEstadoSesion] = useState('cargando');
  const [perfil,       setPerfil]       = useState(PERFIL_DEFAULT);
  const [userSocial,   setUserSocial]   = useState(null); // usuario de Supabase Auth

  /* ── Al montar: verificar si ya hay sesión activa en Supabase ── */
  useEffect(() => {
    /* Obtener sesión actual */
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserSocial(session.user);
        setPerfil(cargarPerfil(session.user.id));
        setEstadoSesion('autenticado');
      } else {
        setEstadoSesion('exploracion');
      }
    });

    /* Escuchar cambios de sesión (login/logout desde cualquier tab) */
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserSocial(session.user);
        setPerfil(cargarPerfil(session.user.id));
        /* Si está en medio de verificación de identidad, no interrumpir el flujo */
        setEstadoSesion(prev =>
          prev === 'verificando-identidad' ? 'verificando-identidad' : 'autenticado'
        );
      } else {
        setUserSocial(null);
        setPerfil(PERFIL_DEFAULT);
        setEstadoSesion('exploracion');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const modoExploracion = estadoSesion === 'exploracion' || estadoSesion === 'cargando' || estadoSesion === 'autenticando-social' || estadoSesion === 'verificando-identidad';

  const usuario = (estadoSesion === 'autenticado') ? {
    nombre: [perfil.nombre, perfil.apellido].filter(Boolean).join(' ') || userSocial?.user_metadata?.nombre_visible || 'Sin nombre',
    rol:    perfil.cargo || 'Sin cargo',
    avatar: perfil.avatar || '',
    email:  userSocial?.email || '',
    ...perfil,
  } : null;

  const actualizarPerfil = (nuevosPerfil) => {
    const merged = { ...perfil, ...nuevosPerfil };
    const key = storagePerfil(userSocial?.id);
    if (key) localStorage.setItem(key, JSON.stringify(merged));
    setPerfil(merged);
  };

  /* ── Acciones del dominio ── */
  const comenzarAutenticacionSocial  = () => setEstadoSesion('autenticando-social');
  const comenzarAutenticacion        = () => setEstadoSesion('autenticando-saas');
  const comenzarAutenticacionSaas    = () => setEstadoSesion('autenticando-saas');
  const comenzarVerificacionIdentidad = () => setEstadoSesion('verificando-identidad');

  const confirmarSesion = () => {
    setPerfil(cargarPerfil(userSocial?.id));
    setEstadoSesion('autenticado');
  };

  const cerrarSesion = async () => {
    /* Cierra sesión en ambos proyectos Supabase */
    await Promise.allSettled([
      supabase.auth.signOut(),
      supabaseSaas.auth.signOut(),
    ]);
    setPerfil(PERFIL_DEFAULT);
    setUserSocial(null);
    setEstadoSesion('exploracion');
  };

  const irAExploracion = () => {
    setPerfil(PERFIL_DEFAULT);
    setEstadoSesion('exploracion');
  };

  /* Mientras verifica la sesión, no renderizar nada aún */
  if (estadoSesion === 'cargando') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background-color)]">
        <div className="flex flex-col items-center gap-3">
          <span className="inline-block w-8 h-8 border-[3px] border-[var(--border-color)] border-t-[var(--primary-color)] rounded-full animate-spin" />
          <p className="text-[13px] text-[var(--text-muted)]">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <SesionContext.Provider value={{
      estadoSesion,
      modoExploracion,
      usuario,
      userSocial,
      perfil,
      actualizarPerfil,
      comenzarAutenticacion,
      comenzarAutenticacionSocial,
      comenzarAutenticacionSaas,
      comenzarVerificacionIdentidad,
      confirmarSesion,
      cerrarSesion,
      irAExploracion,
    }}>
      {children}
    </SesionContext.Provider>
  );
}

/* ── Hook de consumo ── */
export function useSesion() {
  const ctx = useContext(SesionContext);
  if (!ctx) throw new Error('useSesion debe usarse dentro de <SesionProvider>');
  return ctx;
}
