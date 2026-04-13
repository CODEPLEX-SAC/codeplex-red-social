import React from "react";

export default function BotonesGuardar({ onCancelar, onGuardar, guardado }) {
  return (
    <div className="flex justify-end gap-3 pt-2 border-t border-[var(--border-color)]">
      <button onClick={onCancelar} className="px-6 py-[9px] rounded-[var(--radius-sm)] text-[13px] font-semibold border border-[var(--border-color)] text-[var(--text-muted)] bg-transparent cursor-pointer hover:text-[var(--text-dark)] transition-colors">Cancelar</button>
      <button onClick={onGuardar} className="flex items-center gap-2 px-6 py-[9px] rounded-[var(--radius-sm)] text-[13px] font-semibold text-white border-none cursor-pointer transition-all" style={{ background: guardado ? "var(--success-color,#22c55e)" : "var(--gradient-primary)" }}>
        {guardado ? <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>Guardado</> : "Guardar cambios"}
      </button>
    </div>
  );
}
