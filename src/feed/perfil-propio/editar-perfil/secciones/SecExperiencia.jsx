import React, { useState } from "react";
import FormExperiencia from "../experiencia/FormExperiencia";

const cardCls = "bg-[var(--white-color)] rounded-[var(--radius-md)] border border-[var(--border-color)] p-6 flex flex-col gap-5";
const tituloCard = "text-[15px] font-bold text-[var(--text-dark)] m-0";
const EXPERIENCIA_VACIA = { id: null, cargo: "", empresa: "", periodo: "", desc: "" };

export default function SecExperiencia({ form, setForm }) {
  const [indiceEnEdicion, setIndiceEnEdicion] = useState(null);
  const [experienciaEnEdicion, setExperienciaEnEdicion] = useState(EXPERIENCIA_VACIA);
  const experienciasLaborales = form.trabajos ?? [];
  const actualizarCampo = (campo, valor) => setExperienciaEnEdicion((prev) => ({ ...prev, [campo]: valor }));
  const iniciarNuevaExperiencia = () => { setExperienciaEnEdicion({ ...EXPERIENCIA_VACIA, id: Date.now() }); setIndiceEnEdicion("nuevo"); };
  const iniciarEdicionExperiencia = (indice) => { setExperienciaEnEdicion({ ...experienciasLaborales[indice] }); setIndiceEnEdicion(indice); };
  const confirmarGuardado = () => { if (!experienciaEnEdicion.cargo && !experienciaEnEdicion.empresa) return; const nuevas = indiceEnEdicion === "nuevo" ? [...experienciasLaborales, experienciaEnEdicion] : experienciasLaborales.map((experiencia, i) => (i === indiceEnEdicion ? experienciaEnEdicion : experiencia)); setForm((prev) => ({ ...prev, trabajos: nuevas })); setIndiceEnEdicion(null); };
  const eliminarExperiencia = (indice) => setForm((prev) => ({ ...prev, trabajos: experienciasLaborales.filter((_, idx) => idx !== indice) }));

  return <div className={cardCls}><h4 className={tituloCard}>Experiencia laboral</h4>{experienciasLaborales.map((experiencia, indice) => indiceEnEdicion === indice ? <FormExperiencia key={indice} experienciaEnEdicion={experienciaEnEdicion} actualizarCampo={actualizarCampo} confirmarGuardado={confirmarGuardado} onCancelar={() => setIndiceEnEdicion(null)} /> : <div key={indice} className="flex gap-3 p-4 border border-[var(--border-color)] rounded-[var(--radius-sm)]"><div className="flex-1"><span className="text-[14px] font-bold text-[var(--text-dark)]">{experiencia.cargo || "Sin cargo"}</span><p className="text-[12px] text-[var(--text-muted)] m-0">{experiencia.empresa}</p></div><button onClick={() => iniciarEdicionExperiencia(indice)} className="text-[var(--text-muted)] bg-transparent border-none cursor-pointer">Editar</button><button onClick={() => eliminarExperiencia(indice)} className="text-[var(--error-color)] bg-transparent border-none cursor-pointer">Eliminar</button></div>)}{indiceEnEdicion === "nuevo" && <FormExperiencia experienciaEnEdicion={experienciaEnEdicion} actualizarCampo={actualizarCampo} confirmarGuardado={confirmarGuardado} onCancelar={() => setIndiceEnEdicion(null)} />}{indiceEnEdicion === null && <button onClick={iniciarNuevaExperiencia} className="w-full py-[10px] border border-dashed border-[var(--border-color)] rounded-[var(--radius-sm)] text-[13px] font-semibold text-[var(--text-muted)] bg-transparent cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors">+ Agregar experiencia</button>}</div>;
}

