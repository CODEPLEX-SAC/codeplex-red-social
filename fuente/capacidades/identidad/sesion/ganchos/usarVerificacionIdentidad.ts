import { useState } from 'react';
import { supabase } from '@/integraciones/persistencia/supabase-red-social';
import { useSesion } from '@/capacidades/identidad/sesion/ContextoSesion';

/* ═══════════════════════════════════════════════════════════════
   Gancho: usarVerificacionIdentidad
   Responsabilidad ÚNICA: flujo de carga y envío del DNI (anverso
   + reverso). Actualiza el perfil en Supabase al confirmar.

   TODO(backend): cuando el backend valide DNI realmente, reemplazar
   el setTimeout + update manual por la llamada al servicio real.
═══════════════════════════════════════════════════════════════ */
export function usarVerificacionIdentidad(alConfirmar: () => void) {
  const { userSocial } = useSesion();

  const [paso,            setPaso]            = useState<1 | 2 | 3>(1);
  const [dniFrontal,      setDniFrontal]      = useState<File | null>(null);
  const [dniReverso,      setDniReverso]      = useState<File | null>(null);
  const [previstaFrontal, setPrevistaFrontal] = useState<string | null>(null);
  const [previstaReverso, setPrevistaReverso] = useState<string | null>(null);
  const [cargando,        setCargando]        = useState(false);

  const cargarFoto = (archivo: File, tipo: 'frontal' | 'reverso') => {
    const url = URL.createObjectURL(archivo);
    if (tipo === 'frontal') { setDniFrontal(archivo);  setPrevistaFrontal(url); }
    if (tipo === 'reverso') { setDniReverso(archivo);  setPrevistaReverso(url); }
  };

  const avanzarPaso    = () => setPaso(p => (p + 1) as 1 | 2 | 3);
  const retrocederPaso = () => setPaso(p => (p - 1) as 1 | 2 | 3);

  const enviarVerificacion = async () => {
    setCargando(true);
    await new Promise(r => setTimeout(r, 1200));

    if (userSocial?.id) {
      await supabase.from('perfiles').update({
        verificado:          true,
        estado_verificacion: 'verificado',
      }).eq('id', userSocial.id);
    }

    setPaso(3);
    setCargando(false);
  };

  return {
    paso,
    avanzarPaso,
    retrocederPaso,
    dniFrontal,
    dniReverso,
    previstaFrontal,
    previstaReverso,
    cargando,
    cargarFoto,
    enviarVerificacion,
  };
}
