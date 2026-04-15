import React from "react";

export default function ChecklistCompletarPerfil({ pasosParaCompletarPerfil, perfilCompleto, card }) {
  if (perfilCompleto) return null;
  return <div className={card}><h4 className="text-[11px] font-bold text-[var(--text-muted)] tracking-[0.5px] m-0 mb-3">PARA COMPLETAR TU PERFIL</h4><div className="flex flex-col">{pasosParaCompletarPerfil.map((paso, i) => <button key={i} onClick={paso.onClick} className="flex items-center gap-3 py-[10px] border-b border-[var(--border-color)] last:border-b-0 bg-transparent border-x-0 border-t-0 cursor-pointer text-left px-1"><span className={`text-[12px] flex-1 ${paso.done ? "line-through text-[var(--text-muted)]" : "text-[var(--text-dark)] font-medium"}`}>{paso.label}</span></button>)}</div></div>;
}

