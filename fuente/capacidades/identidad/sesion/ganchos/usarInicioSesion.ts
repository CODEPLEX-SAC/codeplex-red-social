import { useState } from 'react';
import { supabase } from '@/integraciones/persistencia/supabase-red-social';

/* ═══════════════════════════════════════════════════════════════
   Gancho: usarInicioSesion
   Responsabilidad ÚNICA: lógica de autenticación por correo/Google.
   La UI no sabe que existe Supabase — solo llama a `iniciarSesion`.
═══════════════════════════════════════════════════════════════ */
export function usarInicioSesion(alConfirmar: () => void) {
  const [email,             setEmail]             = useState('');
  const [contrasena,        setContrasena]        = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [cargando,          setCargando]          = useState(false);
  const [exitoso,           setExitoso]           = useState(false);
  const [error,             setError]             = useState('');

  const alternarContrasena = () => setMostrarContrasena(v => !v);

  const iniciarSesion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !contrasena.trim() || cargando) return;
    setCargando(true);
    setError('');

    const { error: errAuth } = await supabase.auth.signInWithPassword({
      email,
      password: contrasena,
    });

    if (errAuth) {
      setError('Correo o contraseña incorrectos');
      setCargando(false);
      return;
    }

    setExitoso(true);
    setTimeout(alConfirmar, 500);
  };

  return {
    email,             setEmail,
    contrasena,        setContrasena,
    mostrarContrasena, alternarContrasena,
    cargando,          exitoso,           error,
    iniciarSesion,
  };
}
