import React from 'react';
import Icon from '@/compartido/interfaz/primitivas/Icono';
import { usarInicioSesion } from '../ganchos/usarInicioSesion';

/* ═══════════════════════════════════════════════════════════════
   TabInicioSesion — UI pura del formulario de login.
   No contiene lógica de negocio ni llamadas a Supabase.
   Toda la lógica vive en usarInicioSesion.
═══════════════════════════════════════════════════════════════ */
const inputCls = 'w-full py-[10px] px-[14px] bg-[var(--background-color)] border-[1.5px] border-[var(--border-color)] rounded-[var(--radius-sm)] text-[var(--text-dark)] font-[inherit] text-[13.5px] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--primary-color)] focus:bg-[var(--white-color)] focus:shadow-[0_0_0_3px_rgba(72,127,255,0.12)]';

interface TabInicioSesionProps { alConfirmar: () => void }

export function TabInicioSesion({ alConfirmar }: TabInicioSesionProps) {
  const {
    email,             setEmail,
    contrasena,        setContrasena,
    mostrarContrasena, alternarContrasena,
    cargando,          exitoso,           error,
    iniciarSesion,
  } = usarInicioSesion(alConfirmar);

  return (
    <form onSubmit={iniciarSesion} className="flex flex-col gap-4">

      {/* Google */}
      <button type="button"
        className="flex items-center justify-center gap-[9px] w-full py-[10px] px-4 border-[1.5px] border-[var(--border-color)] rounded-[var(--radius-sm)] bg-[var(--white-color)] text-[var(--text-dark)] text-[13px] font-semibold cursor-pointer transition-all hover:border-[var(--primary-color)] hover:bg-[var(--background-color)] hover:-translate-y-px font-[inherit]"
        onClick={alConfirmar}>
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continuar con Google
      </button>

      <div className="flex items-center gap-2 text-[var(--text-muted)]">
        <div className="flex-1 h-px bg-[var(--border-color)]"/>
        <span className="text-[11px] font-bold tracking-[0.5px] uppercase">o con correo</span>
        <div className="flex-1 h-px bg-[var(--border-color)]"/>
      </div>

      {/* Correo */}
      <div>
        <label className="block text-[12px] font-bold text-[var(--text-dark)] mb-[6px]">Correo electrónico</label>
        <input type="email" className={inputCls} placeholder="tu@correo.com"
          value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      {/* Contraseña */}
      <div>
        <label className="block text-[12px] font-bold text-[var(--text-dark)] mb-[6px]">Contraseña</label>
        <div className="relative">
          <input
            type={mostrarContrasena ? 'text' : 'password'}
            className={`${inputCls} pr-10`}
            placeholder="••••••••"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
          />
          <button type="button" tabIndex={-1} onClick={alternarContrasena}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-dark)] bg-transparent border-none cursor-pointer p-0 flex items-center">
            <Icon name={mostrarContrasena ? 'icon_eye' : 'icon_eye_slash'} size={16} />
          </button>
        </div>
      </div>

      {error && (
        <p className="text-[12px] text-[var(--error-color)] text-center m-0 -mt-2">{error}</p>
      )}

      <button type="submit" disabled={cargando || exitoso}
        className="w-full py-3 border-none rounded-[var(--radius-sm)] text-white text-[14px] font-bold cursor-pointer transition-all disabled:opacity-70 font-[inherit]"
        style={{ background: exitoso ? 'var(--success-color, #22c55e)' : 'var(--gradient-primary)' }}>
        {cargando
          ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          : exitoso ? '✓  Acceso concedido' : 'Iniciar sesión'
        }
      </button>
    </form>
  );
}
