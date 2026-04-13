import React from "react";
import { ANIOS_EMPLEO } from "./empleo.constants";

const inputCls = "w-full px-[14px] py-[10px] border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[13.5px] bg-[var(--white-color)] text-[var(--text-dark)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] font-[inherit] focus:border-[var(--primary-color)] focus:shadow-[0_0_0_3px_rgba(72,127,255,0.1)]";
const labelCls = "block text-[12px] font-semibold text-[var(--text-dark)] mb-[6px]";

export default function FormEmpleo({ empleoEnEdicion, actualizarCampo, confirmarGuardado, onCancelar, eliminarEmpleo }) {
  return (
    <div className="flex flex-col gap-3">
      <div><input type="text" className={inputCls} placeholder="Empresa" value={empleoEnEdicion.empresa} onChange={(e) => actualizarCampo("empresa", e.target.value)} /><p className="text-[10.5px] text-[var(--text-muted)] m-0 mt-[3px]">Obligatorio</p></div>
      <div><input type="text" className={inputCls} placeholder="Puesto" value={empleoEnEdicion.puesto} onChange={(e) => actualizarCampo("puesto", e.target.value)} /><p className="text-[10.5px] text-[var(--text-muted)] m-0 mt-[3px]">Obligatorio</p></div>
      <div className="flex flex-col gap-[6px]"><label className={labelCls}>PerÃ­odo de tiempo</label><div className="flex items-center gap-2"><span className="text-[13px] text-[var(--text-muted)] shrink-0">Del</span><div className="relative flex-1 max-w-[140px]"><select className={`${inputCls} cursor-pointer appearance-none`} value={empleoEnEdicion.desdeAnio} onChange={(e) => actualizarCampo("desdeAnio", e.target.value)}><option value="">AÃ±o</option>{ANIOS_EMPLEO.map((anio) => <option key={anio} value={anio}>{anio}</option>)}</select></div></div><label className="flex items-center gap-2 cursor-pointer w-fit mt-1"><input type="checkbox" checked={!!empleoEnEdicion.actualmenteTrabajo} onChange={(e) => actualizarCampo("actualmenteTrabajo", e.target.checked)} className="w-4 h-4 accent-[var(--primary-color)] cursor-pointer" /><span className="text-[13px] text-[var(--text-dark)]">Actualmente trabajo aquÃ­</span></label></div>
      <input type="text" className={inputCls} placeholder="Ciudad o localidad" value={empleoEnEdicion.ciudadLocalidad} onChange={(e) => actualizarCampo("ciudadLocalidad", e.target.value)} />
      <textarea className={`${inputCls} resize-none`} rows={3} placeholder="DescripciÃ³n" value={empleoEnEdicion.descripcion} onChange={(e) => actualizarCampo("descripcion", e.target.value)} />
      <div className="flex items-center gap-2 pt-1 border-t border-[var(--border-color)]">{eliminarEmpleo && <button onClick={eliminarEmpleo} className="flex items-center gap-1 px-3 py-[7px] text-[12px] font-semibold text-[var(--error-color)] bg-transparent border border-[var(--error-color)] rounded-[var(--radius-sm)] cursor-pointer hover:bg-[#fef2f2] transition-colors">Eliminar</button>}<div className="flex-1" /><button onClick={onCancelar} className="px-4 py-[7px] text-[13px] font-semibold border border-[var(--border-color)] text-[var(--text-muted)] bg-transparent rounded-[var(--radius-sm)] cursor-pointer hover:border-[var(--text-muted)] transition-colors">Cancelar</button><button onClick={confirmarGuardado} disabled={!empleoEnEdicion.empresa.trim() || !empleoEnEdicion.puesto.trim()} className="px-5 py-[7px] text-[13px] font-semibold text-white rounded-[var(--radius-sm)] border-none cursor-pointer disabled:opacity-40" style={{ background: "var(--primary-color)" }}>Guardar</button></div>
    </div>
  );
}

