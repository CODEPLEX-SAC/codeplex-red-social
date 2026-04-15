import React from "react";

export default function FilaVacia({ icono, label, sublabel, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-3 rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-[var(--background-color)] cursor-pointer text-left hover:border-[var(--primary-color)] transition-colors group">
      <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--hover-color)] flex items-center justify-center shrink-0 text-[var(--text-muted)] group-hover:bg-[var(--primary-bg)] group-hover:text-[var(--primary-color)] transition-colors">{icono}</div>
      <div className="flex-1 min-w-0"><p className="text-[13px] font-semibold text-[var(--text-muted)] m-0 group-hover:text-[var(--primary-color)] transition-colors">{label}</p>{sublabel && <p className="text-[11px] text-[var(--text-muted)] m-0 mt-[1px]">{sublabel}</p>}</div>
    </button>
  );
}
