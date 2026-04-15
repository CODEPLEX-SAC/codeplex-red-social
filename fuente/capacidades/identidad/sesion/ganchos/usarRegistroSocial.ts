import { useState } from 'react';
import { supabase } from '@/integraciones/persistencia/supabase-red-social';

/* ═══════════════════════════════════════════════════════════════
   Gancho: usarRegistroSocial
   Responsabilidad ÚNICA: lógica de creación de cuenta en la red
   social (signUp + upsert de perfil inicial).
   La UI recibe estado y llama a `registrarse` — sin saber de Supabase.
═══════════════════════════════════════════════════════════════ */
export function usarRegistroSocial(alConfirmar: () => void) {
  const [nombre,            setNombre]            = useState('');
  const [apellido,          setApellido]          = useState('');
  const [dia,               setDia]               = useState('');
  const [mes,               setMes]               = useState('');
  const [anio,              setAnio]              = useState('');
  const [genero,            setGenero]            = useState('');
  const [email,             setEmail]             = useState('');
  const [contrasena,        setContrasena]        = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [cargando,          setCargando]          = useState(false);
  const [exitoso,           setExitoso]           = useState(false);
  const [error,             setError]             = useState('');

  const alternarContrasena = () => setMostrarContrasena(v => !v);

  const registrarse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !contrasena.trim() || cargando) return;
    setCargando(true);
    setError('');

    const nombreVisible = [nombre.trim(), apellido.trim()].filter(Boolean).join(' ');

    const { data, error: errRegistro } = await supabase.auth.signUp({
      email,
      password: contrasena,
      options: { data: { nombre_visible: nombreVisible } },
    });

    if (errRegistro) {
      setError(
        errRegistro.message === 'User already registered'
          ? 'Ya existe una cuenta con ese correo.'
          : errRegistro.message,
      );
      setCargando(false);
      return;
    }

    if (data.user) {
      await supabase.from('perfiles').upsert({
        id:             data.user.id,
        nombre_visible: nombreVisible,
      });
    }

    setExitoso(true);
    setTimeout(alConfirmar, 600);
  };

  return {
    nombre,            setNombre,
    apellido,          setApellido,
    dia,               setDia,
    mes,               setMes,
    anio,              setAnio,
    genero,            setGenero,
    email,             setEmail,
    contrasena,        setContrasena,
    mostrarContrasena, alternarContrasena,
    cargando,          exitoso,           error,
    registrarse,
  };
}
