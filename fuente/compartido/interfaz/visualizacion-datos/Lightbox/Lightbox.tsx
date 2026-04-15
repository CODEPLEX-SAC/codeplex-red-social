import React, { useEffect, useState } from "react";

/**
 * Lightbox — visor de imágenes/video a pantalla completa.
 * Props:
 *   items    — array de { src, tipo: "imagen"|"video", poster? }
 *   indice   — índice inicial a mostrar
 *   onCerrar — callback al cerrar
 */
function Lightbox({ items, indice: indiceInicial = 0, onCerrar }) {
  const [indice, setIndice] = useState(indiceInicial);
  const item = items[indice];
  const total = items.length;

  /* Navegación con teclado */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape")      onCerrar();
      if (e.key === "ArrowRight")  setIndice((i) => Math.min(i + 1, total - 1));
      if (e.key === "ArrowLeft")   setIndice((i) => Math.max(i - 1, 0));
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onCerrar, total]);

  const irA = (nuevoIndice) => {
    if (nuevoIndice >= 0 && nuevoIndice < total) setIndice(nuevoIndice);
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onCerrar}
    >
      {/* Botón cerrar */}
      <button
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border-none rounded-full cursor-pointer transition-colors duration-200 z-10"
        style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
        onClick={onCerrar}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      {/* Flecha izquierda */}
      {total > 1 && indice > 0 && (
        <button
          className="absolute left-4 w-11 h-11 flex items-center justify-center border-none rounded-full cursor-pointer transition-colors duration-200 z-10"
          style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
          onClick={(e) => { e.stopPropagation(); irA(indice - 1); }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
      )}

      {/* Flecha derecha */}
      {total > 1 && indice < total - 1 && (
        <button
          className="absolute right-4 w-11 h-11 flex items-center justify-center border-none rounded-full cursor-pointer transition-colors duration-200 z-10"
          style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
          onClick={(e) => { e.stopPropagation(); irA(indice + 1); }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      )}

      {/* Contenido */}
      <div
        className="flex items-center justify-center w-full h-full px-16 py-12"
        onClick={(e) => e.stopPropagation()}
      >
        {item.tipo === "video" ? (
          <video
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            className="max-w-full max-h-full rounded-[var(--radius-sm)] shadow-[0_0_60px_rgba(0,0,0,0.8)]"
            style={{ maxHeight: "calc(100vh - 96px)" }}
          />
        ) : (
          <img
            src={item.src}
            alt=""
            className="max-w-full max-h-full object-contain rounded-[var(--radius-sm)] shadow-[0_0_60px_rgba(0,0,0,0.8)]"
            style={{ maxHeight: "calc(100vh - 96px)" }}
          />
        )}
      </div>

      {/* Indicadores de punto */}
      {total > 1 && (
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); irA(i); }}
              className="border-none cursor-pointer rounded-full transition-all duration-200 p-0"
              style={{
                width: i === indice ? "24px" : "8px",
                height: "8px",
                background: i === indice ? "var(--primary-color)" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Lightbox;
