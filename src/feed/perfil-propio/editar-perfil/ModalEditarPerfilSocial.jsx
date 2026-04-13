import React, { useState } from "react";
import { usePerfilSocial } from "../PerfilSocialContext";
import { SECCIONES, TAB_ALIAS, ICONOS_SECCION } from "./editar-perfil.constants";
import { tieneIncompleto } from "./editar-perfil.helpers";
import SecDetalles from "./secciones/SecDetalles";
import SecDatosPersonales from "./secciones/SecDatosPersonales";
import SecEmpleo from "./secciones/SecEmpleo";
import SecExperiencia from "./secciones/SecExperiencia";
import SecFormacion from "./secciones/SecFormacion";
import SecTitulos from "./secciones/SecTitulos";
import SecHabilidades from "./secciones/SecHabilidades";
import SecContacto from "./secciones/SecContacto";
import SecDocumentos from "./secciones/SecDocumentos";

export function ModalEditarPerfilSocial({ onCerrar, initialTab = "datos-basicos" }) {
  const { perfilSocial, actualizarPerfilSocial } = usePerfilSocial();
  const [form, setForm] = useState({ trabajos: [], documentos: [], titulos: [], habilidades: [], ...perfilSocial });
  const [seccionActiva, setSeccionActiva] = useState(TAB_ALIAS[initialTab] ?? initialTab ?? "detalles");
  const [guardado, setGuardado] = useState(false);
  const confirmarGuardado = () => { actualizarPerfilSocial(form); setGuardado(true); setTimeout(() => setGuardado(false), 2000); };
  const props = { form, setForm, onCancelar: onCerrar, onGuardar: confirmarGuardado, guardado };

  return <div className="w-full flex flex-col bg-[var(--background-color)]"><div className="flex items-center gap-3 px-4 py-[10px] bg-[var(--white-color)] border border-[var(--border-color)] rounded-[var(--radius-md)] mb-4 sticky z-10" style={{ top: "var(--header-height)" }}><button onClick={onCerrar} className="flex items-center gap-[6px] text-[13px] font-semibold text-[var(--text-muted)] bg-transparent border border-[var(--border-color)] rounded-[var(--radius-sm)] px-3 py-[5px] cursor-pointer hover:text-[var(--text-dark)] hover:border-[var(--text-muted)] transition-colors shrink-0">Volver</button><span className="text-[15px] font-bold text-[var(--text-dark)]">Editar perfil</span></div><div className="flex gap-4 items-stretch [@media(max-width:768px)]:flex-col"><div className="w-[220px] shrink-0 bg-[var(--white-color)] border border-[var(--border-color)] rounded-[var(--radius-md)] py-4 px-2">{SECCIONES.map(({ id, label, requerido }) => { const activo = seccionActiva === id; const incompleto = requerido && tieneIncompleto(id, form); return <button key={id} onClick={() => setSeccionActiva(id)} className={`w-full flex items-center gap-[10px] px-3 py-[9px] rounded-[var(--radius-sm)] text-[13px] font-medium text-left border-none cursor-pointer ${activo ? "bg-[var(--primary-bg,#eff6ff)] text-[var(--primary-color)] font-semibold" : "bg-transparent text-[var(--text-dark)] hover:bg-[var(--hover-color)]"}`}><span className={activo ? "text-[var(--primary-color)]" : "text-[var(--text-muted)]"}>{ICONOS_SECCION[id]}</span><span className="flex-1">{label}</span>{incompleto && <span className="w-[6px] h-[6px] rounded-full bg-[var(--error-color)] shrink-0" />}</button>; })}</div><div className="flex-1 min-w-0 flex flex-col">{seccionActiva === "detalles" && <SecDetalles {...props} />}{seccionActiva === "datos-personales" && <SecDatosPersonales {...props} />}{seccionActiva === "empleo" && <SecEmpleo {...props} />}{seccionActiva === "experiencia" && <SecExperiencia {...props} />}{seccionActiva === "formacion" && <SecFormacion {...props} />}{seccionActiva === "titulos" && <SecTitulos {...props} />}{seccionActiva === "habilidades" && <SecHabilidades {...props} />}{seccionActiva === "contacto" && <SecContacto {...props} />}{seccionActiva === "documentos" && <SecDocumentos {...props} />}</div></div></div>;
}

