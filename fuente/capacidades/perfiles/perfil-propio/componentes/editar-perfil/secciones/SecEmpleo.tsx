import React, { useState } from "react";
import FormEmpleo from "@/capacidades/perfiles/perfil-propio/componentes/editar-perfil/empleo/FormEmpleo";
import { EMPLEO_VACIO } from "@/capacidades/perfiles/perfil-propio/componentes/editar-perfil/empleo/empleo.constantes";

const cardCls = "bg-[var(--white-color)] rounded-[var(--radius-md)] border border-[var(--border-color)] p-6 flex flex-col gap-5";
const tituloCard = "text-[15px] font-bold text-[var(--text-dark)] m-0";

export default function SecEmpleo({ form, setForm }) {
  const [indiceEnEdicion, setIndiceEnEdicion] = useState(null);
  const [empleoEnEdicion, setEmpleoEnEdicion] = useState(EMPLEO_VACIO);
  const empleos = form.empleos ?? [];
  const actualizarCampo = (campo, valor) => setEmpleoEnEdicion((prev) => ({ ...prev, [campo]: valor }));
  const iniciarNuevoEmpleo = () => { setEmpleoEnEdicion({ ...EMPLEO_VACIO, id: Date.now() }); setIndiceEnEdicion("nuevo"); };
  const iniciarEdicionEmpleo = (indice) => { setEmpleoEnEdicion({ ...empleos[indice] }); setIndiceEnEdicion(indice); };
  const confirmarGuardado = () => { if (!empleoEnEdicion.empresa.trim() || !empleoEnEdicion.puesto.trim()) return; const nuevosEmpleos = indiceEnEdicion === "nuevo" ? [...empleos, empleoEnEdicion] : empleos.map((empleo, i) => (i === indiceEnEdicion ? empleoEnEdicion : empleo)); setForm((prev) => ({ ...prev, empleos: nuevosEmpleos })); setIndiceEnEdicion(null); };
  const eliminarEmpleo = (indice) => setForm((prev) => ({ ...prev, empleos: empleos.filter((_, idx) => idx !== indice) }));

  return <div className={cardCls}><h4 className={tituloCard}>Empleo</h4>{empleos.length === 0 && indiceEnEdicion === null && <button onClick={iniciarNuevoEmpleo} className="w-full py-[10px] border border-dashed border-[var(--border-color)] rounded-[var(--radius-sm)] text-[13px] font-semibold text-[var(--text-muted)] bg-transparent cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors">+ Agregar empleo</button>}{empleos.map((empleo, indice) => indiceEnEdicion === indice ? <FormEmpleo key={indice} empleoEnEdicion={empleoEnEdicion} actualizarCampo={actualizarCampo} confirmarGuardado={confirmarGuardado} onCancelar={() => setIndiceEnEdicion(null)} eliminarEmpleo={() => { eliminarEmpleo(indice); setIndiceEnEdicion(null); }} /> : <div key={indice} className="flex gap-3 p-4 border border-[var(--border-color)] rounded-[var(--radius-sm)]"><div className="flex-1"><span className="text-[14px] font-bold text-[var(--text-dark)]">{empleo.puesto || "Sin puesto"}</span><p className="text-[12px] text-[var(--text-muted)] m-0">{empleo.empresa}</p></div><button onClick={() => iniciarEdicionEmpleo(indice)} className="text-[var(--text-muted)] bg-transparent border-none cursor-pointer">Editar</button><button onClick={() => eliminarEmpleo(indice)} className="text-[var(--error-color)] bg-transparent border-none cursor-pointer">Eliminar</button></div>)}{indiceEnEdicion === "nuevo" && <FormEmpleo empleoEnEdicion={empleoEnEdicion} actualizarCampo={actualizarCampo} confirmarGuardado={confirmarGuardado} onCancelar={() => setIndiceEnEdicion(null)} />}{empleos.length > 0 && indiceEnEdicion === null && <button onClick={iniciarNuevoEmpleo} className="w-full py-[10px] border border-dashed border-[var(--border-color)] rounded-[var(--radius-sm)] text-[13px] font-semibold text-[var(--text-muted)] bg-transparent cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors">+ Agregar empleo</button>}</div>;
}

