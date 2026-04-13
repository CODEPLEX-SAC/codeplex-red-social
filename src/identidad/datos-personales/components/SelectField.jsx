import React from "react";

export const CLASE_CAMPO_TEXTO_DATOS_PERSONALES =
  "input-codeplex w-full px-4 py-[10px] border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[14px] bg-[var(--input-bg)] text-[var(--input-text)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] font-[inherit] disabled:opacity-50 disabled:cursor-not-allowed";

const CLASE_CAMPO_SELECT_DATOS_PERSONALES = `${CLASE_CAMPO_TEXTO_DATOS_PERSONALES} cursor-pointer appearance-none`;

export default function SelectField({ valor, alCambiar, children, textoPlaceholder, deshabilitado }) {
  return (
    <div className="relative">
      <select
        className={CLASE_CAMPO_SELECT_DATOS_PERSONALES}
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
        disabled={deshabilitado}
      >
        {textoPlaceholder && <option value="">{textoPlaceholder}</option>}
        {children}
      </select>
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}
