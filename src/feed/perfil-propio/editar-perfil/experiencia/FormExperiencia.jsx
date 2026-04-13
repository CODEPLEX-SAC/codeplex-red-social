import React from "react";
import Field from "../../../compartido/ui/Field";

const inputCls = "w-full px-[14px] py-[10px] border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[13.5px] bg-[var(--white-color)] text-[var(--text-dark)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] font-[inherit] focus:border-[var(--primary-color)] focus:shadow-[0_0_0_3px_rgba(72,127,255,0.1)]";

export default function FormExperiencia({ experienciaEnEdicion, actualizarCampo, confirmarGuardado, onCancelar }) {
  return (
    <div className="border border-[var(--primary-color)] rounded-[var(--radius-sm)] p-4 flex flex-col gap-3 bg-[var(--background-color)]">
      <div className="grid grid-cols-2 gap-3 [@media(max-width:500px)]:grid-cols-1">
        <Field label="Cargo"><input type="text" className={inputCls} placeholder="Ej: Contador Senior" value={experienciaEnEdicion.cargo} onChange={(e) => actualizarCampo("cargo", e.target.value)} /></Field>
        <Field label="Empresa"><input type="text" className={inputCls} placeholder="Nombre de la empresa" value={experienciaEnEdicion.empresa} onChange={(e) => actualizarCampo("empresa", e.target.value)} /></Field>
        <Field label="PerÃ­odo" className="col-span-2 [@media(max-width:500px)]:col-span-1"><input type="text" className={inputCls} placeholder="Ej: 2022â€“Actualidad" value={experienciaEnEdicion.periodo} onChange={(e) => actualizarCampo("periodo", e.target.value)} /></Field>
        <Field label="DescripciÃ³n" className="col-span-2 [@media(max-width:500px)]:col-span-1"><textarea className={`${inputCls} resize-none`} rows={3} placeholder="Describe tus responsabilidades..." value={experienciaEnEdicion.desc} onChange={(e) => actualizarCampo("desc", e.target.value)} /></Field>
      </div>
      <div className="flex justify-end gap-2"><button onClick={onCancelar} className="px-4 py-[7px] text-[13px] font-semibold border border-[var(--border-color)] text-[var(--text-muted)] bg-transparent rounded-[var(--radius-sm)] cursor-pointer">Cancelar</button><button onClick={confirmarGuardado} className="px-5 py-[7px] text-[13px] font-semibold text-white rounded-[var(--radius-sm)] border-none cursor-pointer" style={{ background: "var(--primary-color)" }}>Guardar</button></div>
    </div>
  );
}

