/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   BOUNDED CONTEXT: Perfil Social
   Identidad pÃºblica de la red social â€” completamente separada
   del perfil SaaS (datos personales / cuenta empresarial).
   Store: Supabase Social â†' tabla "perfiles"
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase-red-social';
import { useSesion } from '../../identidad/sesion/SesionContext';

const PerfilSocialContext = createContext(null);

const DEFAULT = {
  username:              '',
  nombreVisible:         '',
  tituloProfesional:     '',
  bioPÃºblica:            '',
  avatar:                '',
  ciudad:                '',
  pais:                  '',
  empresa:               '',
  cargo:                 '',
  habilidades:           [],
  titulos:               [],
  trabajos:              [],
  empleos:               [],
  documentos:            [],
  redesSociales:         { linkedin: '', twitter: '', website: '' },
  disponible:            false,
  anosExperiencia:       '',
  /* Datos personales adicionales */
  genero:                '',
  situacionSentimental:  '',
  fechaNacDia:           '',
  fechaNacMes:           '',
  fechaNacAnio:          '',
  idiomas:               [],
  verificado:            false,
  estadoVerificacion:    'pendiente',
};

/* â”€â”€ Mapeo Supabase â†' estado interno â”€â”€ */
function desdeSupabase(fila) {
  return {
    ...DEFAULT,
    username:             fila.username             ?? '',
    nombreVisible:        fila.nombre_visible        ?? '',
    tituloProfesional:    fila.titulo_profesional    ?? '',
    bioPÃºblica:           fila.bio_publica           ?? '',
    avatar:               fila.avatar_url            ?? '',
    ciudad:               fila.ciudad                ?? '',
    pais:                 fila.pais                  ?? '',
    empresa:              fila.empresa               ?? '',
    cargo:                fila.cargo                 ?? '',
    habilidades:          fila.habilidades           ?? [],
    titulos:              fila.titulos               ?? [],
    trabajos:             fila.trabajos              ?? [],
    empleos:              fila.empleos               ?? [],
    documentos:           fila.documentos            ?? [],
    redesSociales:        fila.redes_sociales        ?? { linkedin: '', twitter: '', website: '' },
    disponible:           fila.disponible            ?? false,
    anosExperiencia:      fila.anos_experiencia      ?? '',
    genero:               fila.genero                ?? '',
    situacionSentimental: fila.situacion_sentimental ?? '',
    fechaNacDia:          fila.fecha_nac_dia         ?? '',
    fechaNacMes:          fila.fecha_nac_mes         ?? '',
    fechaNacAnio:         fila.fecha_nac_anio        ?? '',
    idiomas:              fila.idiomas               ?? [],
    verificado:           fila.verificado            ?? false,
    estadoVerificacion:   fila.estado_verificacion   ?? 'pendiente',
  };
}

/* â”€â”€ Mapeo estado interno â†' Supabase â”€â”€ */
function haciaSupabase(userId, datos) {
  return {
    id:                   userId,
    username:             datos.username            ?? '',
    nombre_visible:       datos.nombreVisible        ?? '',
    titulo_profesional:   datos.tituloProfesional    ?? '',
    bio_publica:          datos.bioPÃºblica           ?? '',
    avatar_url:           datos.avatar               ?? '',
    ciudad:               datos.ciudad               ?? '',
    pais:                 datos.pais                 ?? '',
    empresa:              datos.empresa              ?? '',
    cargo:                datos.cargo                ?? '',
    habilidades:          datos.habilidades          ?? [],
    titulos:              datos.titulos              ?? [],
    trabajos:             datos.trabajos             ?? [],
    empleos:              datos.empleos              ?? [],
    documentos:           datos.documentos           ?? [],
    redes_sociales:       datos.redesSociales        ?? { linkedin: '', twitter: '', website: '' },
    disponible:           datos.disponible           ?? false,
    anos_experiencia:     datos.anosExperiencia      ?? '',
    genero:               datos.genero               ?? '',
    situacion_sentimental: datos.situacionSentimental ?? '',
    fecha_nac_dia:        datos.fechaNacDia          ?? '',
    fecha_nac_mes:        datos.fechaNacMes          ?? '',
    fecha_nac_anio:       datos.fechaNacAnio         ?? '',
    idiomas:              datos.idiomas              ?? [],
  };
}

export function PerfilSocialProvider({ children }) {
  const { userSocial, estadoSesion, perfil: perfilSaas } = useSesion();

  /* El perfil social siempre se vincula al usuario de Supabase Social */
  const userIdSocial = userSocial?.id ?? null;

  const [perfilSocial, setPerfilSocial] = useState({ ...DEFAULT });
  const [cargando,     setCargando]     = useState(false);

  /*
   * tienePerfil:
   *   null  → aún no se ha determinado (cargando inicial)
   *   false → usuario autenticado pero sin perfil social (fallback modal)
   *   true  → perfil social listo para usar
   */
  const [tienePerfil, setTienePerfil] = useState(null);

  /* ── Auto-generar username único a partir de un nombre base ── */
  const generarUsernameDisponible = useCallback(async (base) => {
    const sanitizado = base
      .toLowerCase()
      .split('')
      .map((c) => {
        const code = c.charCodeAt(0);
        if (code >= 0x00e0 && code <= 0x00e6) return 'a'; // a con tilde/diacritico
        if (code >= 0x00e8 && code <= 0x00eb) return 'e';
        if (code >= 0x00ec && code <= 0x00ef) return 'i';
        if (code >= 0x00f2 && code <= 0x00f6) return 'o';
        if (code >= 0x00f9 && code <= 0x00fc) return 'u';
        if (code === 0x00f1) return 'n'; // n con tilde
        return c;
      })
      .join('')
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '')
      .slice(0, 15) || 'usuario';

    for (let intento = 0; intento < 6; intento++) {
      const username = intento === 0
        ? sanitizado
        : `${sanitizado}${Math.floor(Math.random() * 9000) + 100}`;

      const { data } = await supabase
        .from('perfiles').select('id').eq('username', username).maybeSingle();

      if (!data) return username; // disponible
    }
    return `usuario_${Date.now().toString(36)}`; // fallback garantizado único
  }, []);

  /* ── Crear perfil social automáticamente desde datos SaaS ── */
  const autoCrearPerfilSocial = useCallback(async (userId) => {
    /* Nombre: prioridad → SaaS datos personales → metadata → email */
    const nombreCompleto = [perfilSaas?.nombre, perfilSaas?.apellido]
      .filter(Boolean).join(' ').trim()
      || userSocial?.user_metadata?.nombre_visible
      || userSocial?.email?.split('@')[0]
      || 'Usuario';

    const username = await generarUsernameDisponible(nombreCompleto);

    const { error } = await supabase
      .from('perfiles')
      .upsert({ id: userId, username, nombre_visible: nombreCompleto });

    if (!error) {
      setPerfilSocial(prev => ({ ...prev, username, nombreVisible: nombreCompleto }));
      setTienePerfil(true);
    } else {
      console.error('[PerfilSocial] Auto-creación fallida:', error.message);
      setTienePerfil(false); // fallback: muestra el modal
    }
  }, [perfilSaas, userSocial, generarUsernameDisponible]);

  /* ── Cargar perfil al iniciar sesión ── */
  useEffect(() => {
    if (estadoSesion !== 'autenticado' || !userIdSocial) {
      setPerfilSocial({ ...DEFAULT });
      setTienePerfil(null);
      return;
    }

    let cancelado = false;
    setCargando(true);

    supabase
      .from('perfiles')
      .select('*')
      .eq('id', userIdSocial)
      .maybeSingle()
      .then(async ({ data, error }) => {
        if (cancelado) return;
        setCargando(false);

        if (error) {
          console.error('[PerfilSocial] Error al cargar perfil:', error.message);
          setTienePerfil(false);
          return;
        }

        if (data) {
          setPerfilSocial(desdeSupabase(data));
          const perfilCompleto = !!(data.username?.trim() && data.nombre_visible?.trim());
          setTienePerfil(perfilCompleto);
        } else {
          /* Usuario nuevo → auto-crear perfil con datos del SaaS, sin mostrar modal */
          await autoCrearPerfilSocial(userIdSocial);
        }
      });

    return () => { cancelado = true; };
  }, [estadoSesion, userSocial?.id]);

  /* â”€â”€ Completar onboarding (primer acceso) â”€â”€ */
  const completarOnboarding = useCallback(async (username, nombrePublico) => {
    if (!userIdSocial) return { error: new Error('Sin sesiÃ³n') };

    const usernameNorm = username.trim().toLowerCase();
    const nombreNorm   = nombrePublico.trim();

    const { error } = await supabase
      .from('perfiles')
      .upsert({
        id:             userIdSocial,
        username:       usernameNorm,
        nombre_visible: nombreNorm,
      });

    if (error) return { error };

    setPerfilSocial(prev => ({ ...prev, username: usernameNorm, nombreVisible: nombreNorm }));
    setTienePerfil(true);
    return { error: null };
  }, [userIdSocial]);

  /* â”€â”€ Verificar disponibilidad de username â”€â”€ */
  const verificarUsername = useCallback(async (username) => {
    const usernameNorm = username.trim().toLowerCase();
    if (!usernameNorm) return { disponible: false };

    const { data, error } = await supabase
      .from('perfiles')
      .select('id')
      .eq('username', usernameNorm)
      .maybeSingle();

    if (error) return { disponible: false, error };
    /* Si encontrÃ³ fila y es del propio usuario â†' disponible (puede re-confirmar) */
    if (data && data.id === userIdSocial) return { disponible: true };
    return { disponible: !data };
  }, [userIdSocial]);

  /* â”€â”€ Guardar cambios de perfil â”€â”€ */
  const actualizarPerfilSocial = useCallback(async (datos) => {
    const merged = { ...perfilSocial, ...datos };
    setPerfilSocial(merged); // optimistic update

    if (!userIdSocial) return;

    const { error } = await supabase
      .from('perfiles')
      .upsert(haciaSupabase(userIdSocial, merged));

    if (error) {
      console.error('[PerfilSocial] Error al guardar:', error.message);
    }
  }, [perfilSocial, userIdSocial]);

  return (
    <PerfilSocialContext.Provider value={{
      perfilSocial,
      tienePerfil,
      cargando,
      actualizarPerfilSocial,
      completarOnboarding,
      verificarUsername,
    }}>
      {children}
    </PerfilSocialContext.Provider>
  );
}

export function usePerfilSocial() {
  const ctx = useContext(PerfilSocialContext);
  if (!ctx) throw new Error('usePerfilSocial debe usarse dentro de <PerfilSocialProvider>');
  return ctx;
}

