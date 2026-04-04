import React, { useState, useRef, useEffect } from "react";
import Icon from "../../ui/Icon/Icon";
import { useSesion } from "../../identidad/sesion/SesionContext";

const PRIORIDADES = [
  { id: "urgente", label: "Urgente", color: "#ef4444" },
  { id: "normal",  label: "Normal",  color: "#f59e0b" },
  { id: "facil",   label: "Fácil",   color: "#22c55e" },
];

const POST_TABS = [
  { id: "post",     icon: "post",     label: "Post" },
  { id: "videos",   icon: "videos",   label: "Videos" },
  { id: "encuesta", icon: "encuesta", label: "Encuesta" },
];

const actionBtnCls = (activo) =>
  `flex items-center gap-2 px-[15px] py-[10px] border-none bg-transparent rounded-[var(--radius-sm)] cursor-pointer text-[14px] transition-all duration-300 ${
    activo
      ? "text-[var(--primary-color)] font-semibold"
      : "text-[var(--text-muted)] hover:bg-[var(--hover-color)] hover:text-[var(--text-dark)]"
  }`;

function DropdownPrioridad({ prioridad, onChange }) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef(null);
  const actual = PRIORIDADES.find((p) => p.id === prioridad);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setAbierto(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setAbierto((v) => !v)}
        className="flex items-center gap-[6px] px-[15px] py-[10px] border-none bg-transparent rounded-[var(--radius-sm)] cursor-pointer text-[14px] font-semibold transition-all duration-200 text-[var(--primary-color)]"
      >
        {/* Icono pregunta */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span>Pregunta</span>
        {/* Punto de color según prioridad */}
        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: actual?.color }} />
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {abierto && (
        <div className="absolute left-0 top-[calc(100%+6px)] bg-[var(--white-color)] border border-[var(--border-color)] rounded-[var(--radius-md)] shadow-[var(--shadow-md)] z-[100] min-w-[150px] py-1 overflow-hidden">
          <p className="text-[11px] font-semibold text-[var(--text-muted)] px-3 pt-2 pb-1 uppercase tracking-wide">Prioridad</p>
          {PRIORIDADES.map(({ id, label, color }) => (
            <button
              key={id}
              onClick={() => { onChange(id); setAbierto(false); }}
              className="flex items-center gap-[10px] w-full px-3 py-[8px] text-[13px] text-left border-none bg-transparent cursor-pointer hover:bg-[var(--hover-color)] transition-colors duration-150 font-[inherit]"
              style={{ color: prioridad === id ? color : "var(--text-dark)", fontWeight: prioridad === id ? 600 : 400 }}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
              {label}
              {prioridad === id && (
                <svg className="ml-auto" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CreadorPublicacion({ onPublicar }) {
  const { modoExploracion, comenzarAutenticacion, usuario } = useSesion();
  const [activeTab,  setActiveTab]  = useState("post");
  const [texto,      setTexto]      = useState("");
  const [prioridad,  setPrioridad]  = useState("normal");
  const [publicando, setPublicando] = useState(false);

  const demoBlock = modoExploracion
    ? { onClick: comenzarAutenticacion, title: "Inicia sesión para usar esta función", style: { cursor: "not-allowed", opacity: 0.6 } }
    : {};

  const handlePublicar = () => {
    if (!texto.trim() || publicando) return;
    setPublicando(true);
    setTimeout(() => {
      onPublicar(texto, usuario?.nombre, 12, activeTab, activeTab === "pregunta" ? prioridad : "normal");
      setTexto("");
      setPublicando(false);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handlePublicar(); }
  };

  return (
    <div className="bg-[var(--white-color)] p-[25px] rounded-[var(--radius-md)] shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-[var(--border-color)] [@media(max-width:480px)]:p-5 [@media(max-width:480px)]:px-[15px]">
      <div className="flex items-center gap-[15px] mb-5">
        {modoExploracion ? (
          <div className="w-9 h-9 rounded-full bg-[var(--border-light)] border-2 border-dashed border-[var(--border-color)] flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
        ) : (
          <img
            src={usuario?.avatar || "https://i.pravatar.cc/150?img=12"}
            alt={usuario?.nombre || "Usuario"}
            className="w-[50px] h-[50px] rounded-full shrink-0 object-cover"
          />
        )}
        <input
          type="text"
          placeholder={modoExploracion ? "Inicia sesión para publicar..." : `¿Qué estas pensando, ${usuario?.nombre?.split(" ")[0] || ""}?`}
          className="input-codeplex flex-1 border border-[var(--border-color)] px-[15px] py-3 rounded-[var(--radius-sm)] text-[14px] outline-none transition-all duration-300 bg-[var(--white-color)] text-[var(--text-dark)]"
          value={modoExploracion ? "" : texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={!modoExploracion ? handleKeyDown : undefined}
          readOnly={modoExploracion}
          {...(modoExploracion ? { onClick: comenzarAutenticacion, style: { cursor: "not-allowed" } } : {})}
        />
      </div>

      <div className="flex justify-between items-center [@media(max-width:768px)]:flex-col [@media(max-width:768px)]:gap-[15px] [@media(max-width:768px)]:items-stretch">
        <div className="flex flex-wrap [@media(max-width:768px)]:w-full [@media(max-width:768px)]:justify-around">
          {POST_TABS.map(({ id, icon, label }) => (
            <button
              key={id}
              className={actionBtnCls(activeTab === id)}
              onClick={modoExploracion ? comenzarAutenticacion : () => setActiveTab(id)}
              style={modoExploracion ? { cursor: "not-allowed", opacity: 0.6 } : undefined}
            >
              <Icon name={icon} size={18} />
              <span>{label}</span>
            </button>
          ))}

          {/* Pregunta — integrado con dropdown de prioridad */}
          {modoExploracion ? (
            <button className={actionBtnCls(false)} onClick={comenzarAutenticacion} style={{ cursor: "not-allowed", opacity: 0.6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span>Pregunta</span>
            </button>
          ) : activeTab === "pregunta" ? (
            <DropdownPrioridad prioridad={prioridad} onChange={setPrioridad} />
          ) : (
            <button className={actionBtnCls(false)} onClick={() => setActiveTab("pregunta")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span>Pregunta</span>
            </button>
          )}
        </div>

        <button
          className="border-none px-[30px] py-[10px] rounded-[var(--radius-sm)] text-white font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(72,127,255,0.3)] disabled:opacity-50 [@media(max-width:768px)]:w-full"
          style={{ background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))" }}
          onClick={modoExploracion ? comenzarAutenticacion : handlePublicar}
          disabled={!modoExploracion && (!texto.trim() || publicando)}
          {...(modoExploracion ? demoBlock : {})}
        >
          {publicando ? "Publicando..." : "Publicar"}
        </button>
      </div>
    </div>
  );
}

export default CreadorPublicacion;
