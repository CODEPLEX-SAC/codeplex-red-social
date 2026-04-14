import React, { useState } from "react";
import BotonesInline from "../../../compartido/ui/BotonesInline";
import FilaVacia from "../../../compartido/ui/FilaVacia";
import BtnEditar from "../../../compartido/ui/BtnEditar";

export default function SeccionTitulosVerificados({ perfilSocial, actualizarPerfilSocial, card, tituloLg, inputCls }) {
  const titulosYCertificaciones = (perfilSocial.titulos ?? []).filter((t) => !t.esFormacion);
  const [indiceEnEdicion, setIndiceEnEdicion] = useState(false);
  const [tituloInput, setTituloInput] = useState("");
  const [institucionInput, setInstitucionInput] = useState("");
  const agregarTitulo = () => { if (!tituloInput.trim()) return; const nuevo = { id: Date.now(), titulo: tituloInput.trim(), institucion: institucionInput.trim(), esFormacion: false }; actualizarPerfilSocial({ titulos: [...(perfilSocial.titulos ?? []), nuevo] }); setTituloInput(""); setInstitucionInput(""); };
  const eliminarTitulo = (id) => actualizarPerfilSocial({ titulos: (perfilSocial.titulos ?? []).filter((t) => t.id !== id) });
  return <div className={card}><div className="flex items-center justify-between mb-4"><h4 className={tituloLg}>Títulos verificados</h4>{!indiceEnEdicion && <BtnEditar onClick={() => setIndiceEnEdicion(true)} />}</div>{indiceEnEdicion ? <div className="flex flex-col gap-3"><input className={inputCls} value={tituloInput} onChange={(e) => setTituloInput(e.target.value)} placeholder="Título / Certificación" /><input className={inputCls} value={institucionInput} onChange={(e) => setInstitucionInput(e.target.value)} placeholder="Institución" /><button onClick={agregarTitulo} className="self-start px-4 py-[7px] text-[13px] font-semibold border border-[var(--border-color)] text-[var(--text-dark)] bg-transparent rounded-[var(--radius-sm)]">+ Agregar título</button><BotonesInline onCancelar={() => setIndiceEnEdicion(false)} onGuardar={() => { if (tituloInput.trim()) agregarTitulo(); setIndiceEnEdicion(false); }} /></div> : titulosYCertificaciones.length ? titulosYCertificaciones.map((titulo) => <div key={titulo.id} className="flex items-center justify-between py-2"><span>{titulo.titulo}</span><button onClick={() => eliminarTitulo(titulo.id)} className="text-[var(--error-color)] bg-transparent border-none">×</button></div>) : <FilaVacia icono={<span>+</span>} label="+ Agregar título o certificación" onClick={() => setIndiceEnEdicion(true)} />}</div>;
}

