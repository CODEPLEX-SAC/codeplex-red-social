import React from "react";
import { inputCls } from "../styles";

export default function FormEditarIdentidad({ identidadEnEdicion, actualizarCampo, onCancelar, onGuardar }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] font-semibold text-[var(--text-dark)] block mb-1">Nombre</label>
          <input className={inputCls} placeholder="Nombre" value={identidadEnEdicion.nombre} onChange={(e) => actualizarCampo("nombre", e.target.value)} />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-[var(--text-dark)] block mb-1">Apellido</label>
          <input className={inputCls} placeholder="Apellido" value={identidadEnEdicion.apellido} onChange={(e) => actualizarCampo("apellido", e.target.value)} />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={onCancelar} className="px-4 py-[7px] text-[13px] font-semibold border border-[var(--border-color)] text-[var(--text-dark)] bg-transparent rounded-[var(--radius-sm)] cursor-pointer hover:bg-[var(--background-color)] transition-colors">Cancelar</button>
        <button onClick={onGuardar} className="px-5 py-[7px] text-[13px] font-semibold text-white rounded-[var(--radius-sm)] border-none cursor-pointer" style={{ background: "var(--primary-color)" }}>Guardar</button>
      </div>
    </div>
  );
}

