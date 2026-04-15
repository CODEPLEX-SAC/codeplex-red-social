import React, { useEffect, useState } from "react";
import { PAISES, CIUDADES_POR_PAIS } from "@/capacidades/identidad/datos-personales/contratos/datos-personales.contratos";
import BotonesInline from "@/compartido/interfaz/acciones/BotonesInline";
import BtnEditar from "@/compartido/interfaz/acciones/BotonEditar";

export default function SeccionDetallesFijados({ perfilSocial, actualizarPerfilSocial, card, tituloLg, inputCls }) {
  const [detallesFijadosEnEdicion, setDetallesFijadosEnEdicion] = useState({ empresa: perfilSocial.empresa || "", pais: perfilSocial.pais || "", ciudad: perfilSocial.ciudad || "" });
  const [indiceEnEdicion, setIndiceEnEdicion] = useState(false);
  useEffect(() => { setDetallesFijadosEnEdicion({ empresa: perfilSocial.empresa || "", pais: perfilSocial.pais || "", ciudad: perfilSocial.ciudad || "" }); }, [perfilSocial.empresa, perfilSocial.pais, perfilSocial.ciudad]);
  const actualizarCampo = (campo, valor) => setDetallesFijadosEnEdicion((prev) => ({ ...prev, [campo]: valor }));
  const confirmarGuardado = () => { actualizarPerfilSocial(detallesFijadosEnEdicion); setIndiceEnEdicion(false); };
  const ciudades = detallesFijadosEnEdicion.pais ? CIUDADES_POR_PAIS[detallesFijadosEnEdicion.pais] || [] : [];
  const ubicacion = [perfilSocial.ciudad, perfilSocial.pais].filter(Boolean).join(", ");
  return <div className={card}><div className="flex items-center justify-between mb-3"><h4 className={tituloLg}>Detalles fijados</h4>{!indiceEnEdicion && <BtnEditar onClick={() => setIndiceEnEdicion(true)} />}</div>{indiceEnEdicion ? <div className="flex flex-col gap-3"><input className={inputCls} value={detallesFijadosEnEdicion.empresa} onChange={(e) => actualizarCampo("empresa", e.target.value)} placeholder="Empresa" /><select className={inputCls} value={detallesFijadosEnEdicion.pais} onChange={(e) => { actualizarCampo("pais", e.target.value); actualizarCampo("ciudad", ""); }}><option value="">Selecciona un país</option>{PAISES.map((p) => <option key={p} value={p}>{p}</option>)}</select>{ciudades.length ? <select className={inputCls} value={detallesFijadosEnEdicion.ciudad} onChange={(e) => actualizarCampo("ciudad", e.target.value)}><option value="">Selecciona una ciudad</option>{ciudades.map((c) => <option key={c} value={c}>{c}</option>)}</select> : <input className={inputCls} value={detallesFijadosEnEdicion.ciudad} onChange={(e) => actualizarCampo("ciudad", e.target.value)} placeholder="Ciudad" />}<BotonesInline onCancelar={() => setIndiceEnEdicion(false)} onGuardar={confirmarGuardado} /></div> : <button onClick={() => setIndiceEnEdicion(true)} className="text-left bg-transparent border-none p-0">{ubicacion || "+ Agrega ubicación, empresa o formación"}</button>}</div>;
}

