import React from "react";

export default function PanelDatosPersonales({ perfilSocial, onEditarInfo, onIrResumen, onIrExperiencia, card }) {
  const ubicacion = [perfilSocial.ciudad, perfilSocial.pais].filter(Boolean).join(", ");
  const habilidadesDelPerfil = (perfilSocial.habilidades ?? []).slice(0, 5);
  const experienciasLaborales = perfilSocial.trabajos ?? [];
  const formacionAcademica = (perfilSocial.titulos ?? []).find((t) => t.esFormacion);
  return <div className={card}><h4 className="text-[13px] font-bold text-[var(--text-dark)] m-0 mb-3">Datos personales</h4><div className="flex flex-col gap-[10px]"><div className="text-[13px] text-[var(--text-muted)]">{ubicacion || <button onClick={onEditarInfo} className="text-[var(--primary-color)] bg-transparent border-none p-0">+ Agregar ubicación</button>}</div>{experienciasLaborales.length ? <div className="text-[13px] text-[var(--text-dark)]">{experienciasLaborales[0].cargo}{experienciasLaborales[0].empresa ? ` · ${experienciasLaborales[0].empresa}` : ""}</div> : <button onClick={onIrExperiencia} className="text-[var(--primary-color)] bg-transparent border-none p-0 text-left">+ Agregar experiencia</button>}{formacionAcademica ? <div className="text-[13px] text-[var(--text-dark)]">{formacionAcademica.titulo ? `${formacionAcademica.titulo} · ` : ""}{formacionAcademica.institucion}</div> : <button onClick={onIrExperiencia} className="text-[var(--primary-color)] bg-transparent border-none p-0 text-left">+ Agregar formación</button>}{habilidadesDelPerfil.length ? <div className="flex flex-wrap gap-[5px]">{habilidadesDelPerfil.map((h) => <span key={h} className="px-[10px] py-[4px] rounded-full text-[11px] font-bold text-white" style={{ background: "var(--gradient-primary)" }}>{h}</span>)}</div> : <button onClick={onIrResumen} className="text-[13px] text-[var(--primary-color)] bg-transparent border-none p-0 text-left">+ Agregar habilidades</button>}</div></div>;
}

