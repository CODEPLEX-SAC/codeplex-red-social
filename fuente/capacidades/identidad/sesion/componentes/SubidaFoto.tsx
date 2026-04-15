import React, { useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════
   SubidaFoto — zona de carga de archivo (DNI anverso/reverso).
   Responsabilidad ÚNICA: capturar un archivo de imagen y notificar.
═══════════════════════════════════════════════════════════════ */
interface SubidaFotoProps {
  etiqueta:     string;
  subeEtiqueta: string;
  tipo:         'dni' | 'selfie';
  prevista:     string | null;
  alCambiar:    (archivo: File) => void;
}

export function SubidaFoto({ etiqueta, subeEtiqueta, tipo, prevista, alCambiar }: SubidaFotoProps) {
  const refEntrada = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => refEntrada.current?.click()}
      className={`relative flex flex-col items-center justify-center gap-2 p-5 rounded-[var(--radius-md)] border-2 border-dashed cursor-pointer transition-all duration-200 ${
        prevista
          ? 'border-[var(--primary-color)] bg-[rgba(72,127,255,0.04)]'
          : 'border-[var(--border-color)] hover:border-[var(--primary-color)] hover:bg-[var(--background-color)]'
      }`}
    >
      <input
        ref={refEntrada}
        type="file"
        accept="image/*"
        capture={tipo === 'selfie' ? 'user' : undefined}
        className="hidden"
        onChange={e => {
          const archivo = e.target.files?.[0];
          if (archivo) alCambiar(archivo);
        }}
      />

      {prevista ? (
        <>
          <img src={prevista} alt={etiqueta} className="w-full h-[110px] object-cover rounded-[var(--radius-sm)]" />
          <div className="flex items-center gap-1 text-[var(--primary-color)]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span className="text-[11px] font-semibold">Cargado</span>
          </div>
        </>
      ) : (
        <>
          <div className="w-10 h-10 rounded-full bg-[var(--background-color)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)]">
            {tipo === 'selfie' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <path d="M7 5V3h10v2"/>
              </svg>
            )}
          </div>
          <div className="text-center">
            <p className="text-[12px] font-semibold text-[var(--text-dark)] m-0">{etiqueta}</p>
            <p className="text-[11px] text-[var(--text-muted)] m-0 mt-[2px]">{subeEtiqueta}</p>
          </div>
        </>
      )}
    </div>
  );
}
