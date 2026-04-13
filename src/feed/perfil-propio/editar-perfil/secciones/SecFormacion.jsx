import React, { useState } from "react";
import BotonesGuardar from "../../../compartido/ui/BotonesGuardar";

const inputCls = "w-full px-[14px] py-[10px] border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[13.5px] bg-[var(--white-color)] text-[var(--text-dark)]";
const cardCls = "bg-[var(--white-color)] rounded-[var(--radius-md)] border border-[var(--border-color)] p-6 flex flex-col gap-5";
export default function SecFormacion({ form, setForm, onCancelar, onGuardar, guardado }) {
  const [institucionInput, setInstitucionInput] = useState("");
  const [gradoInput, setGradoInput] = useState("");
  const formacionAcademica = (form.titulos ?? []).filter((t) => t.esFormacion);
  const agregarFormacionAcademica = () => { if (!institucionInput.trim()) return; const nuevo = { id: Date.now(), titulo: gradoInput.trim(), institucion: institucionInput.trim(), verificado: false, esFormacion: true }; setForm((prev) => ({ ...prev, titulos: [...(prev.titulos ?? []), nuevo] })); setInstitucionInput(""); setGradoInput(""); };
  const eliminarFormacionAcademica = (id) => setForm((prev) => ({ ...prev, titulos: (prev.titulos ?? []).filter((t) => t.id !== id) }));
  return <div className={cardCls}><h4 className="text-[15px] font-bold text-[var(--text-dark)] m-0">Formación académica</h4><input className={inputCls} value={institucionInput} onChange={(e) => setInstitucionInput(e.target.value)} placeholder="Universidad / Institución" /><input className={inputCls} value={gradoInput} onChange={(e) => setGradoInput(e.target.value)} placeholder="Grado / Carrera" /><button onClick={agregarFormacionAcademica} className="w-full py-[10px] rounded-[var(--radius-sm)] text-[13px] font-semibold text-white border-none cursor-pointer" style={{ background: "var(--primary-color)" }}>+ Agregar</button>{formacionAcademica.map((item) => <div key={item.id} className="flex items-center justify-between"><span>{item.titulo || item.institucion}</span><button onClick={() => eliminarFormacionAcademica(item.id)} className="text-[var(--error-color)] bg-transparent border-none">×</button></div>)}<BotonesGuardar onCancelar={onCancelar} onGuardar={onGuardar} guardado={guardado} /></div>;
}

