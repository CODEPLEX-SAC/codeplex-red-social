import React, { useState } from "react";

function IconoOjoContrasena({ visible }) {
  return visible ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

const CLASE_INPUT_CONTRASENA =
  "input-codeplex w-full pl-4 pr-10 py-[10px] border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[14px] bg-[var(--input-bg)] text-[var(--input-text)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] font-[inherit] disabled:opacity-50 disabled:cursor-not-allowed";

export default function PasswordField({ etiqueta, textoPlaceholder, deshabilitado, valor, alCambiarValor }) {
  const [contrasenaVisible, setContrasenaVisible] = useState(false);

  return (
    <div>
      <label className="block text-[13px] font-semibold text-[var(--text-dark)] mb-[6px]">{etiqueta}</label>
      <div className="relative">
        <input
          type={contrasenaVisible ? "text" : "password"}
          className={CLASE_INPUT_CONTRASENA}
          placeholder={textoPlaceholder}
          disabled={deshabilitado}
          value={valor ?? ""}
          onChange={(e) => alCambiarValor?.(e.target.value)}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setContrasenaVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-dark)] bg-transparent border-none cursor-pointer p-0 flex items-center"
        >
          <IconoOjoContrasena visible={contrasenaVisible} />
        </button>
      </div>
    </div>
  );
}
