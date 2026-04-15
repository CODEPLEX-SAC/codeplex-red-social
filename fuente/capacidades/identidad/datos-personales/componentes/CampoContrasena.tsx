import React, { useState } from 'react';
import Icon from '@/compartido/interfaz/primitivas/Icono';

const CLASE_INPUT_CONTRASENA =
  'input-codeplex w-full pl-4 pr-10 py-[10px] border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[14px] bg-[var(--input-bg)] text-[var(--input-text)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] font-[inherit] disabled:opacity-50 disabled:cursor-not-allowed';

export default function PasswordField({ etiqueta, textoPlaceholder, deshabilitado, valor, alCambiarValor }) {
  const [contrasenaVisible, setContrasenaVisible] = useState(false);

  return (
    <div>
      <label className="block text-[13px] font-semibold text-[var(--text-dark)] mb-[6px]">{etiqueta}</label>
      <div className="relative">
        <input
          type={contrasenaVisible ? 'text' : 'password'}
          className={CLASE_INPUT_CONTRASENA}
          placeholder={textoPlaceholder}
          disabled={deshabilitado}
          value={valor ?? ''}
          onChange={(e) => alCambiarValor?.(e.target.value)}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setContrasenaVisible(v => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-dark)] bg-transparent border-none cursor-pointer p-0 flex items-center"
        >
          <Icon name={contrasenaVisible ? 'icon_eye' : 'icon_eye_slash'} size={16} />
        </button>
      </div>
    </div>
  );
}
