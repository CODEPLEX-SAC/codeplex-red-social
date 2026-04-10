/* ═══════════════════════════════════════════════════════════
   BOUNDED CONTEXT: Perfil Social
   Separado de Datos Personales (cuenta) — vive aquí la info
   que el usuario decide mostrar a la comunidad.
   Store: Supabase → tabla "perfiles"
═══════════════════════════════════════════════════════════ */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useSesion } from '../../identidad/sesion/SesionContext';

const PerfilSocialContext = createContext(null);

const DEFAULT = {
  nombreVisible:    '',
  tituloProfesional:'',
  bioPública:       '',
  avatar:           '',
  ciudad:           '',
  pais:             '',
  empresa:          '',
  cargo:            '',
  habilidades:      [],
  titulos:          [],   // [{ id, titulo, institucion, verificado }]
  trabajos:         [],   // [{ id, cargo, empresa, periodo, desc }]
  documentos:       [],   // [{ id, nombre, tipo, fecha }]
  redesSociales:    { linkedin: '', twitter: '', website: '' },
  disponible:       false,
  anosExperiencia:  '',
  /* ── Verificación de identidad ── */
  verificado:         false,
  estadoVerificacion: 'pendiente', // 'pendiente' | 'en-revision' | 'verificado' | 'rechazado'
};

/* Mapea fila de Supabase → estructura interna */
function desdeSupabase(fila) {
  return {
    ...DEFAULT,
    nombreVisible:     fila.nombre_visible      ?? '',
    tituloProfesional: fila.titulo_profesional   ?? '',
    bioPública:        fila.bio_publica          ?? '',
    avatar:            fila.avatar_url           ?? '',
    ciudad:            fila.ciudad               ?? '',
    pais:              fila.pais                 ?? '',
    empresa:           fila.empresa              ?? '',
    cargo:             fila.cargo                ?? '',
    habilidades:       fila.habilidades          ?? [],
    titulos:           fila.titulos              ?? [],
    trabajos:          fila.trabajos             ?? [],
    documentos:        fila.documentos           ?? [],
    redesSociales:     fila.redes_sociales       ?? { linkedin: '', twitter: '', website: '' },
    disponible:        fila.disponible           ?? false,
    anosExperiencia:   fila.anos_experiencia     ?? '',
    verificado:        fila.verificado           ?? false,
    estadoVerificacion: fila.estado_verificacion ?? 'pendiente',
  };
}

/* Mapea estructura interna → columnas de Supabase */
function haciaSupabase(userId, datos) {
  return {
    id:                  userId,
    nombre_visible:      datos.nombreVisible      ?? '',
    titulo_profesional:  datos.tituloProfesional  ?? '',
    bio_publica:         datos.bioPública         ?? '',
    avatar_url:          datos.avatar             ?? '',
    ciudad:              datos.ciudad             ?? '',
    pais:                datos.pais               ?? '',
    empresa:             datos.empresa            ?? '',
    cargo:               datos.cargo              ?? '',
    habilidades:         datos.habilidades        ?? [],
    titulos:             datos.titulos            ?? [],
    trabajos:            datos.trabajos           ?? [],
    documentos:          datos.documentos         ?? [],
    redes_sociales:      datos.redesSociales      ?? { linkedin: '', twitter: '', website: '' },
    disponible:          datos.disponible         ?? false,
    anos_experiencia:    datos.anosExperiencia    ?? '',
  };
}

export function PerfilSocialProvider({ children }) {
  const { userSocial, estadoSesion } = useSesion();
  const [perfilSocial, setPerfilSocial] = useState({ ...DEFAULT });
  const [cargando, setCargando] = useState(false);

  /* ── Cargar perfil desde Supabase cuando hay sesión activa ── */
  useEffect(() => {
    if (estadoSesion !== 'autenticado' || !userSocial?.id) {
      setPerfilSocial({ ...DEFAULT });
      return;
    }

    let cancelado = false;
    setCargando(true);

    supabase
      .from('perfiles')
      .select('*')
      .eq('id', userSocial.id)
      .single()
      .then(({ data, error }) => {
        if (cancelado) return;
        if (data && !error) {
          setPerfilSocial(desdeSupabase(data));
        } else {
          /* El perfil no existe todavía (usuario nuevo) → lo creamos */
          supabase
            .from('perfiles')
            .insert({ id: userSocial.id, nombre_visible: userSocial.user_metadata?.nombre_visible ?? '' })
            .then(() => {
              if (!cancelado) setPerfilSocial({ ...DEFAULT });
            });
        }
        setCargando(false);
      });

    return () => { cancelado = true; };
  }, [estadoSesion, userSocial?.id]);

  /* ── Guardar cambios en Supabase ── */
  const actualizarPerfilSocial = async (datos) => {
    const merged = { ...perfilSocial, ...datos };
    setPerfilSocial(merged); // optimistic update

    if (!userSocial?.id) return; // sin sesión, solo actualiza estado local

    const { error } = await supabase
      .from('perfiles')
      .upsert(haciaSupabase(userSocial.id, merged));

    if (error) {
      console.error('Error al guardar perfil social:', error.message);
    }
  };

  return (
    <PerfilSocialContext.Provider value={{ perfilSocial, actualizarPerfilSocial, cargando }}>
      {children}
    </PerfilSocialContext.Provider>
  );
}

export function usePerfilSocial() {
  const ctx = useContext(PerfilSocialContext);
  if (!ctx) throw new Error('usePerfilSocial debe usarse dentro de <PerfilSocialProvider>');
  return ctx;
}
