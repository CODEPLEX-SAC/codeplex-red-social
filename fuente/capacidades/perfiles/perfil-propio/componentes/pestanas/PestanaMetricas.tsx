import React from "react";
import { card } from "@/compartido/constantes/estilos.constantes";
function TabMetricas({ perfilSocial, publicaciones, misPreguntas, onEditarInfo }) {
  const misPublicaciones = (publicaciones ?? []).filter(p => p.esPropia);
  const resueltas        = (misPreguntas ?? []).filter(p => p.estado === "resuelto");
  const habilidades      = perfilSocial.habilidades ?? [];

  const perfilIncompleto =
    !perfilSocial.nombreVisible &&
    !perfilSocial.bioPÃºblica &&
    habilidades.length === 0 &&
    misPublicaciones.length === 0;

  if (perfilIncompleto) {
    return (
      <div className={card}>
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <div className="w-14 h-14 rounded-full bg-[var(--background-color)] flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div>
            <p className="text-[15px] font-bold text-[var(--text-dark)] m-0 mb-1">MÃ©tricas bloqueadas</p>
            <p className="text-[13px] text-[var(--text-muted)] m-0 max-w-[260px] leading-[1.5]">
              Se generan automÃ¡ticamente al completar tu perfil y participar en la plataforma.
            </p>
          </div>
          <button onClick={onEditarInfo}
            className="px-5 py-[10px] text-[13px] font-bold rounded-[var(--radius-sm)] text-white border-none cursor-pointer"
            style={{ background: "var(--gradient-primary)" }}>
            Completar perfil
          </button>
        </div>
      </div>
    );
  }

  const PCTS = ["80%", "72%", "65%", "58%", "50%", "45%"];
  const cards = [
    { label: "Publicaciones", valor: misPublicaciones.length, color: "var(--primary-color)"   },
    { label: "Preguntas",     valor: misPreguntas?.length ?? 0, color: "var(--secondary-color)" },
    { label: "Resueltas",     valor: resueltas.length,          color: "var(--success-color)"   },
    { label: "Amigos",        valor: 0,                         color: "var(--text-muted)"       },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className={card}>
        <h4 className="text-[11px] font-bold text-[var(--text-muted)] tracking-[0.5px] m-0 mb-4">RESUMEN DE ACTIVIDAD</h4>
        <div className="grid grid-cols-4 gap-3 [@media(max-width:900px)]:grid-cols-2">
          {cards.map((c, i) => (
            <div key={i} className="bg-[var(--background-color)] border border-[var(--border-color)] rounded-[var(--radius-sm)] p-[14px] flex flex-col gap-1">
              <p className="text-[11px] text-[var(--text-muted)] m-0">{c.label}</p>
              <p className="text-[26px] font-bold my-1" style={{ color: c.color }}>{c.valor}</p>
            </div>
          ))}
        </div>
      </div>

      {habilidades.length > 0 && (
        <div className={card}>
          <h4 className="text-[11px] font-bold text-[var(--text-muted)] tracking-[0.5px] m-0 mb-4">PROGRESO DE HABILIDADES</h4>
          {habilidades.map((h, i) => (
            <div key={h} className="mb-3 last:mb-0">
              <div className="flex justify-between text-[12px] mb-1">
                <span className="text-[var(--text-dark)] font-medium">{h}</span>
                <span className="text-[var(--text-muted)]">{PCTS[i % PCTS.length]}</span>
              </div>
              <div className="h-1 bg-[var(--border-color)] rounded-[2px] overflow-hidden mt-[6px]">
                <div className="h-full bg-[var(--primary-color)] rounded-[2px]" style={{ width: PCTS[i % PCTS.length] }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TabMetricas;

