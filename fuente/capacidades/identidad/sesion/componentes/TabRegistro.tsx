import React from 'react';
import Icon from '@/compartido/interfaz/primitivas/Icono';
import { usarRegistroSocial } from '../ganchos/usarRegistroSocial';

/* ═══════════════════════════════════════════════════════════════
   TabRegistro — UI pura del formulario de creación de cuenta.
   No contiene lógica de negocio ni llamadas a Supabase.
   Toda la lógica vive en usarRegistroSocial.
═══════════════════════════════════════════════════════════════ */
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const ANIOS = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 18 - i);
const DIAS  = Array.from({ length: 31  }, (_, i) => i + 1);

const inputCls  = 'w-full py-[10px] px-[14px] bg-[var(--background-color)] border-[1.5px] border-[var(--border-color)] rounded-[var(--radius-sm)] text-[var(--text-dark)] font-[inherit] text-[13.5px] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--primary-color)] focus:bg-[var(--white-color)] focus:shadow-[0_0_0_3px_rgba(72,127,255,0.12)]';
const selectCls = 'w-full min-w-0 min-h-[42px] box-border py-[10px] pl-[12px] pr-[30px] bg-[var(--background-color)] border-[1.5px] border-[var(--border-color)] rounded-[var(--radius-sm)] text-[var(--text-dark)] font-[inherit] text-[13px] outline-none transition-[border-color] duration-200 cursor-pointer focus:border-[var(--primary-color)] appearance-none bg-no-repeat bg-[right_10px_center] bg-[length:12px]';
const flechaSvg = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")";

interface TabRegistroProps { alConfirmar: () => void }

export function TabRegistro({ alConfirmar }: TabRegistroProps) {
  const {
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
  } = usarRegistroSocial(alConfirmar);

  return (
    <form onSubmit={registrarse} className="flex flex-col gap-[14px]">

      <div className="mb-1">
        <h2 className="text-[18px] font-bold text-[var(--text-dark)] m-0 leading-tight">
          Empieza a usar Codeplex Red Social
        </h2>
        <p className="text-[12.5px] text-[var(--text-muted)] m-0 mt-1">
          Es rápido y fácil. Tu perfil social es independiente de tu cuenta empresarial.
        </p>
      </div>

      {/* Nombre + Apellido */}
      <div className="flex gap-3">
        <div className="flex-1">
          <input type="text" className={inputCls} placeholder="Nombre"
            value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>
        <div className="flex-1">
          <input type="text" className={inputCls} placeholder="Apellido"
            value={apellido} onChange={e => setApellido(e.target.value)} />
        </div>
      </div>

      {/* Fecha de nacimiento */}
      <div className="w-full min-w-0">
        <label className="block text-[12px] font-bold text-[var(--text-dark)] mb-[6px]">
          Fecha de nacimiento
        </label>
        <div className="grid w-full min-w-0 gap-2 [grid-template-columns:minmax(0,1fr)_minmax(0,2fr)_minmax(0,1.1fr)] max-[340px]:grid-cols-1">
          <select className={selectCls} value={dia}  onChange={e => setDia(e.target.value)}  style={{ backgroundImage: flechaSvg }}>
            <option value="">Día</option>
            {DIAS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className={selectCls} value={mes}  onChange={e => setMes(e.target.value)}  style={{ backgroundImage: flechaSvg }}>
            <option value="">Mes</option>
            {MESES.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
          </select>
          <select className={selectCls} value={anio} onChange={e => setAnio(e.target.value)} style={{ backgroundImage: flechaSvg }}>
            <option value="">Año</option>
            {ANIOS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      {/* Género */}
      <div>
        <label className="block text-[12px] font-bold text-[var(--text-dark)] mb-[6px]">Género</label>
        <select className={selectCls} value={genero} onChange={e => setGenero(e.target.value)} style={{ backgroundImage: flechaSvg }}>
          <option value="">Selecciona tu género</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Prefiero no decirlo</option>
        </select>
      </div>

      {/* Correo */}
      <div>
        <label className="block text-[12px] font-bold text-[var(--text-dark)] mb-[6px]">
          Número de móvil o correo electrónico
        </label>
        <input type="email" className={inputCls} placeholder="tu@correo.com"
          value={email} onChange={e => setEmail(e.target.value)} required />
        <p className="text-[10.5px] text-[var(--text-muted)] m-0 mt-[5px]">
          Es posible que recibas notificaciones nuestras.{' '}
          <span className="text-[var(--primary-color)] cursor-pointer">¿Por qué pedimos esto?</span>
        </p>
      </div>

      {/* Contraseña */}
      <div>
        <label className="block text-[12px] font-bold text-[var(--text-dark)] mb-[6px]">Contraseña</label>
        <div className="relative">
          <input
            type={mostrarContrasena ? 'text' : 'password'}
            className={`${inputCls} pr-10`}
            placeholder="Contraseña"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
            required
          />
          <button type="button" tabIndex={-1} onClick={alternarContrasena}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-dark)] bg-transparent border-none cursor-pointer p-0 flex items-center">
            <Icon name={mostrarContrasena ? 'icon_eye' : 'icon_eye_slash'} size={16} />
          </button>
        </div>
      </div>

      {/* Términos */}
      <p className="text-[10.5px] text-[var(--text-muted)] m-0 leading-[1.5]">
        Al hacer clic en <strong>Enviar</strong>, aceptas los{' '}
        <span className="text-[var(--primary-color)] cursor-pointer font-semibold">Términos de uso</span>,{' '}
        la <span className="text-[var(--primary-color)] cursor-pointer font-semibold">Política de privacidad</span> y la{' '}
        <span className="text-[var(--primary-color)] cursor-pointer font-semibold">Política de cookies</span>.
      </p>

      {error && (
        <div className="flex items-center gap-2 px-3 py-[9px] rounded-[var(--radius-sm)] bg-[#fef2f2] border border-[#fecaca]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p className="text-[12px] text-[#ef4444] m-0">{error}</p>
        </div>
      )}

      <button type="submit" disabled={cargando || exitoso}
        className="w-full py-3 border-none rounded-[var(--radius-sm)] text-white text-[14px] font-bold cursor-pointer transition-all disabled:opacity-70 font-[inherit]"
        style={{ background: exitoso ? 'var(--success-color, #22c55e)' : 'var(--gradient-primary)' }}>
        {cargando
          ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          : exitoso ? '✓  Cuenta creada' : 'Enviar'
        }
      </button>
    </form>
  );
}
