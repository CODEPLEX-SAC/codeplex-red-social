import React, { useState } from "react";
import Field from "../../../compartido/ui/Field";
import SelectField from "../../../compartido/ui/SelectField";
import BotonesGuardar from "../../../compartido/ui/BotonesGuardar";
import { PAISES, CIUDADES_POR_PAIS } from "../../../identidad/datos-personales/datosPersonalesData";

const inputCls = "w-full px-[14px] py-[10px] border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[13.5px] bg-[var(--white-color)] text-[var(--text-dark)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] font-[inherit] focus:border-[var(--primary-color)] focus:shadow-[0_0_0_3px_rgba(72,127,255,0.1)]";
const cardCls = "bg-[var(--white-color)] rounded-[var(--radius-md)] border border-[var(--border-color)] p-6 flex flex-col gap-5";
const tituloCard = "text-[15px] font-bold text-[var(--text-dark)] m-0";

export default function SecDetalles({ form, setForm, onCancelar, onGuardar, guardado }) {
  const actualizarCampo = (campo, valor) => setForm((prev) => ({ ...prev, [campo]: valor }));
  const partes = (form.nombreVisible || "").split(" ");
  const [nombre, setNombre] = useState(partes[0] || "");
  const [apellido, setApellido] = useState(partes.slice(1).join(" ") || "");
  const actualizarNombreVisible = (nuevoNombre, nuevoApellido) => actualizarCampo("nombreVisible", [nuevoNombre, nuevoApellido].filter(Boolean).join(" ").trim());

  return <div className="flex flex-col gap-4 flex-1"><div className={cardCls}><h4 className={tituloCard}>Detalles fijados</h4><div className="grid grid-cols-2 gap-4 [@media(max-width:500px)]:grid-cols-1"><Field label="Empresa / Negocio"><input type="text" className={inputCls} placeholder="Nombre de tu empresa" value={form.empresa || ""} onChange={(e) => actualizarCampo("empresa", e.target.value)} /></Field><Field label="País"><SelectField value={form.pais || ""} onChange={(v) => { actualizarCampo("pais", v); actualizarCampo("ciudad", ""); }} placeholder="Selecciona tu país">{PAISES.map((p) => <option key={p} value={p}>{p}</option>)}</SelectField></Field><Field label="Ciudad">{(CIUDADES_POR_PAIS[form.pais] ?? []).length > 0 ? <SelectField value={form.ciudad || ""} onChange={(v) => actualizarCampo("ciudad", v)} placeholder="Selecciona tu ciudad">{(CIUDADES_POR_PAIS[form.pais] ?? []).map((c) => <option key={c} value={c}>{c}</option>)}</SelectField> : <input type="text" className={inputCls} placeholder="Tu ciudad" value={form.ciudad || ""} onChange={(e) => actualizarCampo("ciudad", e.target.value)} />}</Field><Field label="Formación académica"><input type="text" className={inputCls} value={(form.titulos ?? []).find((t) => t.esFormacion)?.institucion || ""} disabled /></Field></div></div><div className={cardCls}><h4 className={tituloCard}>Datos personales</h4><div className="grid grid-cols-2 gap-4 [@media(max-width:500px)]:grid-cols-1"><Field label="Nombre"><input type="text" className={inputCls} value={nombre} onChange={(e) => { setNombre(e.target.value); actualizarNombreVisible(e.target.value, apellido); }} /></Field><Field label="Apellido"><input type="text" className={inputCls} value={apellido} onChange={(e) => { setApellido(e.target.value); actualizarNombreVisible(nombre, e.target.value); }} /></Field><Field label="Cargo profesional" className="col-span-2 [@media(max-width:500px)]:col-span-1"><input type="text" className={inputCls} value={form.tituloProfesional || ""} onChange={(e) => actualizarCampo("tituloProfesional", e.target.value)} /></Field><Field label="Años de experiencia"><input type="number" className={inputCls} min="0" max="60" value={form.anosExperiencia || ""} onChange={(e) => actualizarCampo("anosExperiencia", e.target.value)} /></Field></div><BotonesGuardar onCancelar={onCancelar} onGuardar={onGuardar} guardado={guardado} /></div></div>;
}

