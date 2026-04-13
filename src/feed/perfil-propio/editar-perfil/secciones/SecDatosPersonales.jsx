import React, { useState } from "react";
import Field from "../../../compartido/ui/Field";
import SelectField from "../../../compartido/ui/SelectField";
import BotonesGuardar from "../../../compartido/ui/BotonesGuardar";
import { ANIOS_NAC, MESES_NAC, DIAS_NAC } from "../../../compartido/ui/fechas.constants";

const inputCls = "w-full px-[14px] py-[10px] border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[13.5px] bg-[var(--white-color)] text-[var(--text-dark)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] font-[inherit] focus:border-[var(--primary-color)] focus:shadow-[0_0_0_3px_rgba(72,127,255,0.1)]";
const cardCls = "bg-[var(--white-color)] rounded-[var(--radius-md)] border border-[var(--border-color)] p-6 flex flex-col gap-5";
const labelCls = "block text-[12px] font-semibold text-[var(--text-dark)] mb-[6px]";

export default function SecDatosPersonales({ form, setForm, onCancelar, onGuardar, guardado }) {
  const [idiomaInput, setIdiomaInput] = useState("");
  const actualizarCampo = (campo, valor) => setForm((prev) => ({ ...prev, [campo]: valor }));
  const agregarIdioma = () => { const valor = idiomaInput.trim(); if (!valor) return; const idiomas = form.idiomas ?? []; if (idiomas.includes(valor)) return; actualizarCampo("idiomas", [...idiomas, valor]); setIdiomaInput(""); };
  return <div className={cardCls}><h4 className="text-[15px] font-bold text-[var(--text-dark)] m-0">Datos personales</h4><div className="flex flex-col gap-[6px]"><label className={labelCls}>Fecha de nacimiento</label><div className="flex gap-2"><select className={inputCls} value={form.fechaNacDia || ""} onChange={(e) => actualizarCampo("fechaNacDia", e.target.value)}><option value="">Día</option>{DIAS_NAC.map((d) => <option key={d} value={d}>{d}</option>)}</select><select className={inputCls} value={form.fechaNacMes || ""} onChange={(e) => actualizarCampo("fechaNacMes", e.target.value)}><option value="">Mes</option>{MESES_NAC.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}</select><select className={inputCls} value={form.fechaNacAnio || ""} onChange={(e) => actualizarCampo("fechaNacAnio", e.target.value)}><option value="">Año</option>{ANIOS_NAC.map((a) => <option key={a} value={a}>{a}</option>)}</select></div></div><Field label="Género"><SelectField value={form.genero || ""} onChange={(v) => actualizarCampo("genero", v)} placeholder="Selecciona tu género"><option value="masculino">Masculino</option><option value="femenino">Femenino</option><option value="no-binario">No binario</option><option value="prefiero-no-decir">Prefiero no decirlo</option></SelectField></Field><div className="flex gap-2"><input type="text" className={`${inputCls} flex-1`} value={idiomaInput} onChange={(e) => setIdiomaInput(e.target.value)} /><button onClick={agregarIdioma} className="px-4 py-[10px] rounded-[var(--radius-sm)] text-[13px] font-semibold text-white border-none cursor-pointer" style={{ background: "var(--primary-color)" }}>+ Añadir</button></div><BotonesGuardar onCancelar={onCancelar} onGuardar={onGuardar} guardado={guardado} /></div>;
}

