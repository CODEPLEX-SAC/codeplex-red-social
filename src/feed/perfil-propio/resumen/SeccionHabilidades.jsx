import React, { useState } from "react";
import BotonesInline from "../../../compartido/ui/BotonesInline";

export default function SeccionHabilidades({ perfilSocial, actualizarPerfilSocial, card, tituloLg, inputCls }) {
  const habilidadesDelPerfil = perfilSocial.habilidades ?? [];
  const [indiceEnEdicion, setIndiceEnEdicion] = useState(false);
  const [habilidadInput, setHabilidadInput] = useState("");
  const agregarHabilidad = () => { const valor = habilidadInput.trim(); if (!valor || habilidadesDelPerfil.includes(valor)) return; actualizarPerfilSocial({ habilidades: [...habilidadesDelPerfil, valor] }); setHabilidadInput(""); };
  const eliminarHabilidad = (habilidad) => actualizarPerfilSocial({ habilidades: habilidadesDelPerfil.filter((item) => item !== habilidad) });
  return <div className={card}><div className="flex items-center justify-between mb-4"><h4 className={tituloLg}>Habilidades</h4></div>{indiceEnEdicion ? <div className="flex flex-col gap-3"><div className="flex gap-2"><input className={inputCls} value={habilidadInput} onChange={(e) => setHabilidadInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); agregarHabilidad(); } }} /><button onClick={agregarHabilidad} className="px-4 py-[10px] text-[13px] font-semibold text-white rounded-[var(--radius-sm)] border-none" style={{ background: "var(--primary-color)" }}>+ Agregar</button></div><BotonesInline onCancelar={() => setIndiceEnEdicion(false)} onGuardar={() => { if (habilidadInput.trim()) agregarHabilidad(); setIndiceEnEdicion(false); }} /></div> : habilidadesDelPerfil.length ? <div className="flex flex-wrap gap-2">{habilidadesDelPerfil.map((habilidad) => <span key={habilidad} className="px-3 py-[5px] rounded-full text-[12px] font-semibold border border-[var(--border-color)] bg-[var(--background-color)] text-[var(--text-dark)]">{habilidad}<button onClick={() => eliminarHabilidad(habilidad)} className="ml-1 bg-transparent border-none">×</button></span>)}</div> : <button onClick={() => setIndiceEnEdicion(true)} className="flex items-center gap-1 px-3 py-[6px] rounded-full text-[12px] font-semibold border border-dashed border-[var(--border-color)] text-[var(--text-muted)] bg-transparent">+ Habilidad</button>}</div>;
}

