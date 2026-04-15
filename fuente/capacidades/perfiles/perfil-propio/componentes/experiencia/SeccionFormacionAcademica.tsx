import React, { useState } from "react";
import BotonesInline from "@/compartido/interfaz/acciones/BotonesInline";
import FilaVacia from "@/compartido/interfaz/primitivas/FilaVacia";
import BtnEditar from "@/compartido/interfaz/acciones/BotonEditar";

export default function SeccionFormacionAcademica({ perfilSocial, actualizarPerfilSocial, card, tituloLg, inputCls }) {
  const titulosYCertificaciones = perfilSocial.titulos ?? [];
  const formacionAcademica = titulosYCertificaciones.filter((t) => t.esFormacion);
  const [indiceEnEdicion, setIndiceEnEdicion] = useState(false);
  const [institucionInput, setInstitucionInput] = useState("");
  const [gradoInput, setGradoInput] = useState("");
  const agregarFormacion = () => { if (!institucionInput.trim()) return; const nuevo = { id: Date.now(), institucion: institucionInput.trim(), titulo: gradoInput.trim(), esFormacion: true }; actualizarPerfilSocial({ titulos: [...titulosYCertificaciones, nuevo] }); setInstitucionInput(""); setGradoInput(""); };
  const eliminarFormacion = (id) => actualizarPerfilSocial({ titulos: titulosYCertificaciones.filter((t) => t.id !== id) });
  return <div className={card}><div className="flex items-center justify-between mb-4"><h4 className={tituloLg}>Formación académica</h4>{!indiceEnEdicion && <BtnEditar onClick={() => setIndiceEnEdicion(true)} />}</div>{indiceEnEdicion ? <div className="flex flex-col gap-3"><input className={inputCls} value={institucionInput} onChange={(e) => setInstitucionInput(e.target.value)} placeholder="Institución" /><input className={inputCls} value={gradoInput} onChange={(e) => setGradoInput(e.target.value)} placeholder="Grado / Título" /><button onClick={agregarFormacion} className="self-start px-4 py-[7px] text-[13px] font-semibold border border-[var(--border-color)] rounded-[var(--radius-sm)]">+ Agregar formación</button><BotonesInline onCancelar={() => setIndiceEnEdicion(false)} onGuardar={() => { if (institucionInput.trim()) agregarFormacion(); setIndiceEnEdicion(false); }} /></div> : formacionAcademica.length ? formacionAcademica.map((item) => <div key={item.id} className="flex justify-between py-2"><span>{item.titulo || item.institucion}</span><button onClick={() => eliminarFormacion(item.id)} className="text-[var(--error-color)] bg-transparent border-none">×</button></div>) : <FilaVacia icono={<span>+</span>} label="+ Agregar formación académica" sublabel="Universidad y grado" onClick={() => setIndiceEnEdicion(true)} />}</div>;
}

