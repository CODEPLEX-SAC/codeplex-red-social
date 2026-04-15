import React, { useState } from "react";
import BotonesGuardar from "../../../compartido/ui/BotonesGuardar";
const inputCls = "w-full px-[14px] py-[10px] border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[13.5px] bg-[var(--white-color)] text-[var(--text-dark)]";
const cardCls = "bg-[var(--white-color)] rounded-[var(--radius-md)] border border-[var(--border-color)] p-6 flex flex-col gap-5";
export default function SecTitulos({ form, setForm, onCancelar, onGuardar, guardado }) {
  const [tituloInput, setTituloInput] = useState(""); const [institucionInput, setInstitucionInput] = useState("");
  const titulosYCertificaciones = (form.titulos ?? []).filter((t) => !t.esFormacion);
  const agregarTitulo = () => { if (!tituloInput.trim()) return; const nuevo = { id: Date.now(), titulo: tituloInput.trim(), institucion: institucionInput.trim(), verificado: false }; setForm((prev) => ({ ...prev, titulos: [...(prev.titulos ?? []), nuevo] })); setTituloInput(""); setInstitucionInput(""); };
  const eliminarTitulo = (id) => setForm((prev) => ({ ...prev, titulos: (prev.titulos ?? []).filter((t) => t.id !== id) }));
  return <div className={cardCls}><h4 className="text-[15px] font-bold text-[var(--text-dark)] m-0">Títulos y certificaciones</h4><input className={inputCls} value={tituloInput} onChange={(e) => setTituloInput(e.target.value)} /><input className={inputCls} value={institucionInput} onChange={(e) => setInstitucionInput(e.target.value)} /><button onClick={agregarTitulo} className="w-full py-[10px] border border-dashed border-[var(--primary-color)] rounded-[var(--radius-sm)] text-[13px] font-semibold text-[var(--primary-color)] bg-transparent cursor-pointer">+ Agregar título</button>{titulosYCertificaciones.map((item) => <div key={item.id} className="flex items-center justify-between"><span>{item.titulo}</span><button onClick={() => eliminarTitulo(item.id)} className="text-[var(--error-color)] bg-transparent border-none">×</button></div>)}<BotonesGuardar onCancelar={onCancelar} onGuardar={onGuardar} guardado={guardado} /></div>;
}

