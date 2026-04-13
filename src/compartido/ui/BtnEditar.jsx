import React from "react";

export default function BtnEditar({ onClick }) {
  return (
    <button onClick={onClick} className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-transparent cursor-pointer text-[var(--text-muted)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors shrink-0">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
    </button>
  );
}
