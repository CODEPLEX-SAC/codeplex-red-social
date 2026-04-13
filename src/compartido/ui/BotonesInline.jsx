import React from "react";

export default function BotonesInline({ onCancelar, onGuardar, labelGuardar = "Guardar" }) {
  return (
    <div className="flex justify-end gap-2 pt-2 mt-1 border-t border-[var(--border-color)]">
      <button onClick={onCancelar} className="px-4 py-[7px] text-[13px] font-semibold border border-[var(--border-color)] text-[var(--text-dark)] bg-transparent rounded-[var(--radius-sm)] cursor-pointer hover:bg-[var(--background-color)] transition-colors">Cancelar</button>
      <button onClick={onGuardar} className="px-5 py-[7px] text-[13px] font-semibold text-white rounded-[var(--radius-sm)] border-none cursor-pointer" style={{ background: "var(--primary-color)" }}>{labelGuardar}</button>
    </div>
  );
}
