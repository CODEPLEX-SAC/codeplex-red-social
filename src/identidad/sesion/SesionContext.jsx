import React, { createContext, useContext, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   BOUNDED CONTEXT: Sesión
   Ubiquitous Language: estadoSesion, modoExploracion, usuario
   Valores posibles de estadoSesion:
     'exploracion'  → visitante sin cuenta
     'autenticando' → pantalla de login activa
     'autenticado'  → sesión iniciada
═══════════════════════════════════════════════════════════════ */

const SesionContext = createContext(null);

const STORAGE_KEY_PERFIL = "codeplex_datos_personales";

const PERFIL_DEFAULT = {
  nombre: '', apellido: '', email: '', telefono: '', dni: '',
  fechaNacimiento: '',
  genero: '', pais: '', ciudad: '',
  empresa: '', cargo: '', rubro: '', bio: '',
  avatar: '',
};

function cargarPerfil() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PERFIL);
    return raw ? { ...PERFIL_DEFAULT, ...JSON.parse(raw) } : PERFIL_DEFAULT;
  } catch { return PERFIL_DEFAULT; }
}

export function SesionProvider({ children }) {
  const [estadoSesion, setEstadoSesion] = useState('exploracion');
  const [perfil, setPerfil] = useState(PERFIL_DEFAULT); // vacío hasta autenticarse

  const modoExploracion = estadoSesion === 'exploracion';

  /* usuario expone los datos del perfil con formato compatible con el sidebar */
  const usuario = modoExploracion ? null : {
    nombre: [perfil.nombre, perfil.apellido].filter(Boolean).join(' ') || 'Sin nombre',
    rol:    perfil.cargo || 'Sin cargo',
    avatar: perfil.avatar || '',
    ...perfil,
  };

  const actualizarPerfil = (nuevosPerfil) => {
    const merged = { ...perfil, ...nuevosPerfil };
    localStorage.setItem(STORAGE_KEY_PERFIL, JSON.stringify(merged));
    setPerfil(merged);
  };

  /* ── Acciones del dominio ── */
  const comenzarAutenticacion = () => setEstadoSesion('autenticando');
  const confirmarSesion = () => {
    setPerfil(PERFIL_DEFAULT);
    setEstadoSesion('autenticado');
  };
  const cerrarSesion = () => {
    setPerfil(PERFIL_DEFAULT); // limpia perfil al cerrar sesión
    setEstadoSesion('autenticando');
  };
  const irAExploracion = () => {
    setPerfil(PERFIL_DEFAULT);
    setEstadoSesion('exploracion');
  };

  return (
    <SesionContext.Provider value={{
      estadoSesion,
      modoExploracion,
      usuario,
      perfil,
      actualizarPerfil,
      comenzarAutenticacion,
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
