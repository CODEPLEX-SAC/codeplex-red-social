import React from 'react';

/* Indicador visual de progreso en flujos de múltiples pasos */
interface PasoIndicadorProps {
  pasoActual: number;
  totalPasos: number;
}

export function PasoIndicador({ pasoActual, totalPasos }: PasoIndicadorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-5">
      {Array.from({ length: totalPasos }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
            i + 1 < pasoActual
              ? 'bg-[var(--primary-color)] text-white'
              : i + 1 === pasoActual
              ? 'bg-[var(--primary-color)] text-white shadow-[0_0_0_3px_rgba(72,127,255,0.2)]'
              : 'bg-[var(--background-color)] text-[var(--text-muted)] border border-[var(--border-color)]'
          }`}>
            {i + 1 < pasoActual ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : i + 1}
          </div>

          {i < totalPasos - 1 && (
            <div className={`w-8 h-[2px] rounded-full transition-all duration-300 ${
              i + 1 < pasoActual ? 'bg-[var(--primary-color)]' : 'bg-[var(--border-color)]'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}
