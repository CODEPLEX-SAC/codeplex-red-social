import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase-red-social';
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

/* Clave de localStorage por usuario */
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
  const [userSocial,   setUserSocial]   = useState(null); // sesión Red Social
  const [userSaas,     setUserSaas]     = useState(null); // sesión SaaS

  /* Evita que onAuthStateChange reaccione durante la inicialización */
  const iniciandoRef = useRef(true);

  /* ── Al montar: verificar AMBAS sesiones en paralelo ── */
  useEffect(() => {
    let cancelado = false;

    Promise.all([
      supabase.auth.getSession(),
      supabaseSaas.auth.getSession(),
    ]).then(([{ data: { session: sesionSocial } }, { data: { session: sesionSaas } }]) => {
      if (cancelado) return;

      if (sesionSaas?.user) {
        /* Usuario SaaS autenticado — es la sesión principal del producto */
        setUserSaas(sesionSaas.user);
        setPerfil(cargarPerfil(sesionSaas.user.id));
        setEstadoSesion('autenticado');
        /* Si también hay sesión en Red Social (otro cliente), hidratarla siempre */
        if (sesionSocial?.user) {
          setUserSocial(sesionSocial.user);
        }
      } else if (sesionSocial?.user) {
        /* Solo tiene sesión de Red Social */
        setUserSocial(sesionSocial.user);
        setPerfil(cargarPerfil(sesionSocial.user.id));
        setEstadoSesion('autenticado');
      } else {
        setEstadoSesion('exploracion');
      }

      iniciandoRef.current = false;
    });

    /* Escuchar cambios de sesión Red Social */
    const { data: { subscription: subSocial } } = supabase.auth.onAuthStateChange((_evento, sesion) => {
      if (iniciandoRef.current) return;
      if (sesion?.user) {
        setUserSocial(sesion.user);
      } else {
        setUserSocial(null);
      }
    });

    /* Escuchar cambios de sesión SaaS */
    const { data: { subscription: subSaas } } = supabaseSaas.auth.onAuthStateChange((_evento, sesion) => {
      if (iniciandoRef.current) return;
      if (sesion?.user) {
        setUserSaas(sesion.user);
        setPerfil(prev => ({ ...prev, email: sesion.user.email ?? prev.email }));
        setEstadoSesion(prev =>
          prev === 'verificando-identidad' ? 'verificando-identidad' : 'autenticado'
        );
      } else {
        /* signOut disparó este evento — solo limpiar si no hay sesión social tampoco */
        setUserSaas(null);
      }
    });

    return () => {
      cancelado = true;
      subSocial.unsubscribe();
      subSaas.unsubscribe();
    };
  }, []);

  /* ── ID activo: SaaS tiene prioridad sobre Social ── */
  const userIdActivo = userSaas?.id ?? userSocial?.id ?? null;

  const modoExploracion = (
    estadoSesion === 'exploracion' ||
    estadoSesion === 'cargando' ||
    estadoSesion === 'autenticando-social' ||
    estadoSesion === 'verificando-identidad'
  );

  const usuario = (estadoSesion === 'autenticado') ? {
    nombre: [perfil.nombre, perfil.apellido].filter(Boolean).join(' ')
      || userSaas?.user_metadata?.nombre_visible
      || userSocial?.user_metadata?.nombre_visible
      || 'Sin nombre',
    rol:    perfil.cargo || 'Sin cargo',
    avatar: perfil.avatar || '',
    email:  userSaas?.email || userSocial?.email || '',
    ...perfil,
  } : null;

  /* actualizarPerfil: actualiza estado + localStorage usando el ID correcto */
  const actualizarPerfil = (nuevosPerfil) => {
    setPerfil(prev => {
      const merged = { ...prev, ...nuevosPerfil };
      const key = storagePerfil(userIdActivo);
      if (key) {
        try { localStorage.setItem(key, JSON.stringify(merged)); } catch {}
      }
      return merged;
    });
  };

  /* ── Acciones del dominio ── */
  const comenzarAutenticacionSocial   = () => setEstadoSesion('autenticando-social');
  const comenzarAutenticacion         = () => setEstadoSesion('autenticando-saas');
  const comenzarAutenticacionSaas     = () => setEstadoSesion('autenticando-saas');
  const comenzarVerificacionIdentidad = () => setEstadoSesion('verificando-identidad');

  /* confirmarSesion: tras login SaaS o tras cerrar modal de Red Social (login/registro) */
  const confirmarSesion = async () => {
    const { data: { user: userSaasActual } } = await supabaseSaas.auth.getUser();
    const { data: { user: userSocialActual } } = await supabase.auth.getUser();

    if (userSaasActual) {
      setUserSaas(userSaasActual);
      const perfilLocal = cargarPerfil(userSaasActual.id);
      setPerfil({ ...perfilLocal, email: userSaasActual.email ?? perfilLocal.email });
    }
    if (userSocialActual) {
      setUserSocial(userSocialActual);
      if (!userSaasActual) {
        const perfilLocal = cargarPerfil(userSocialActual.id);
        setPerfil({ ...perfilLocal, email: userSocialActual.email ?? perfilLocal.email });
      }
    }
    setEstadoSesion('autenticado');
  };

  const cerrarSesion = async () => {
    await Promise.allSettled([
      supabase.auth.signOut(),
      supabaseSaas.auth.signOut(),
    ]);
    setPerfil(PERFIL_DEFAULT);
    setUserSocial(null);
    setUserSaas(null);
    setEstadoSesion('exploracion');
  };

  const irAExploracion = () => {
    setPerfil(PERFIL_DEFAULT);
    setEstadoSesion('exploracion');
  };

  /* Pantalla de carga inicial */
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
      userSaas,
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
