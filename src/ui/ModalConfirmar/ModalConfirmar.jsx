import React, { useEffect } from "react";

/**
 * Modal de confirmación reutilizable.
 * Props:
 *   titulo    — título del modal
 *   mensaje   — texto descriptivo
 *   labelOk   — texto botón confirmar  (default: "Eliminar")
 *   labelNo   — texto botón cancelar   (default: "Cancelar")
 *   variante  — "danger" | "warning" | "info"  (default: "danger")
 *   onConfirm — callback al confirmar
 *   onCerrar  — callback al cancelar / cerrar
 */
function ModalConfirmar({
  titulo    = "¿Estás seguro?",
  mensaje   = "Esta acción no se puede deshacer.",
  labelOk   = "Eliminar",
  labelNo   = "Cancelar",
  variante  = "danger",
  onConfirm,
  onCerrar,
}) {
  /* Cerrar con Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onCerrar?.(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onCerrar]);

  const colorOk = variante === "danger"  ? "bg-[#ef4444] hover:bg-[#dc2626]"
                : variante === "warning" ? "bg-[#f59e0b] hover:bg-[#d97706]"
                :                         "bg-[var(--primary-color)] hover:bg-[var(--secondary-color)]";

  const iconColor = variante === "danger"  ? "#ef4444"
                  : variante === "warning" ? "#f59e0b"
                  :                         "var(--primary-color)";

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
      onClick={onCerrar}
    >
      {/* Panel */}
      <div
        className="bg-[var(--white-color)] rounded-[var(--radius-md)] shadow-[0_20px_60px_rgba(0,0,0,0.25)] w-full max-w-[400px] overflow-hidden"
        style={{ animation: "modalSlideIn 0.18s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            {/* Icono según variante */}
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: iconColor + "18" }}>
              {variante === "danger" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              )}
            </div>
            <h3 className="text-[16px] font-bold text-[var(--text-dark)] m-0">{titulo}</h3>
          </div>
          <button
            className="w-8 h-8 flex items-center justify-center bg-transparent border-none rounded-full cursor-pointer text-[var(--text-muted)] transition-colors duration-200 hover:bg-[var(--hover-color)] hover:text-[var(--text-dark)]"
            onClick={onCerrar}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-[14px] text-[var(--text-muted)] leading-[1.6] m-0">{mensaje}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 pb-5">
          <button
            className="px-5 py-[9px] bg-transparent border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[14px] font-semibold text-[var(--text-dark)] cursor-pointer transition-colors duration-200 hover:bg-[var(--hover-color)]"
            onClick={onCerrar}
          >{labelNo}</button>
          <button
            className={`px-5 py-[9px] border-none rounded-[var(--radius-sm)] text-[14px] font-semibold text-white cursor-pointer transition-colors duration-200 ${colorOk}`}
            onClick={() => { onConfirm?.(); onCerrar?.(); }}
          >{labelOk}</button>
        </div>
      </div>

      <style>{`
        @keyframes modalSlideIn {
          from { opacity: 0; transform: scale(0.94) translateY(-8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }
      `}</style>
    </div>
  );
}

export default ModalConfirmar;
