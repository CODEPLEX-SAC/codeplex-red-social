import React, { useState } from "react";

const CONFIG_PRIORIDAD = {
  urgente: { label: "Urgente", color: "#ef4444", bg: "#fef2f2" },
  normal:  { label: "Normal",  color: "#f59e0b", bg: "#fffbeb" },
  facil:   { label: "Fácil",   color: "#22c55e", bg: "#f0fdf4" },
};

const FILTROS = [
  { id: "todas",        label: "Todas" },
  { id: "sin-resolver", label: "Sin resolver" },
  { id: "resuelto",     label: "Resueltas" },
];

function FilaPregunta({ post, onCambiarEstado, onFeedback }) {
  const cfg = CONFIG_PRIORIDAD[post.prioridad] ?? CONFIG_PRIORIDAD.normal;
  const resuelto = post.estado === "resuelto";

  return (
    <div className="flex flex-col gap-3 py-4 border-b border-[var(--border-color)] last:border-b-0">
      {/* Cabecera */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-semibold px-2 py-[3px] rounded-full"
          style={{ background: cfg.bg, color: cfg.color }}>
          {cfg.label}
        </span>
        <span className="text-[11px] font-medium px-2 py-[3px] rounded-full"
          style={resuelto
            ? { background: "#f0fdf4", color: "#16a34a" }
            : { background: "#f1f5f9", color: "#64748b" }}>
          {resuelto ? "✓ Resuelto" : "Sin resolver"}
        </span>
        <span className="ml-auto text-[12px] text-[var(--text-muted)]">{post.time}</span>
      </div>

      {/* Texto */}
      <p className="text-[14px] text-[var(--text-dark)] leading-[1.6] m-0">{post.text}</p>

      {/* Acciones */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[12px] text-[var(--text-muted)]">¿Te ayudó?</span>
        <button
          onClick={() => onFeedback(post.id, post.feedback === "ayudo" ? null : "ayudo")}
          className="text-[12px] font-medium px-3 py-[4px] rounded-full border cursor-pointer transition-all duration-150"
          style={post.feedback === "ayudo"
            ? { background: "#f0fdf4", color: "#16a34a", borderColor: "#bbf7d0" }
            : { background: "transparent", color: "var(--text-muted)", borderColor: "var(--border-color)" }}
        >
          👍 Sí
        </button>
        <button
          onClick={() => onFeedback(post.id, post.feedback === "no-ayudo" ? null : "no-ayudo")}
          className="text-[12px] font-medium px-3 py-[4px] rounded-full border cursor-pointer transition-all duration-150"
          style={post.feedback === "no-ayudo"
            ? { background: "#fef2f2", color: "#ef4444", borderColor: "#fecaca" }
            : { background: "transparent", color: "var(--text-muted)", borderColor: "var(--border-color)" }}
        >
          👎 No
        </button>
        <button
          onClick={() => onCambiarEstado(post.id, resuelto ? "sin-resolver" : "resuelto")}
          className="ml-auto text-[12px] font-semibold px-3 py-[4px] rounded-full border cursor-pointer transition-all duration-150"
          style={resuelto
            ? { background: "#f0fdf4", color: "#16a34a", borderColor: "#bbf7d0" }
            : { background: "transparent", color: "var(--primary-color)", borderColor: "var(--primary-color)" }}
        >
          {resuelto ? "✓ Resuelto" : "Marcar resuelto"}
        </button>
      </div>
    </div>
  );
}

function PanelMisPreguntas({ misPreguntas, onCambiarEstado, onFeedback }) {
  const [filtro, setFiltro] = useState("todas");

  const total       = misPreguntas.length;
  const resueltas   = misPreguntas.filter((p) => p.estado === "resuelto").length;
  const sinResolver = total - resueltas;

  const filtradas = filtro === "todas"
    ? misPreguntas
    : misPreguntas.filter((p) => p.estado === filtro);

  return (
    <div className="bg-[var(--white-color)] rounded-[var(--radius-md)] border border-[var(--border-color)] shadow-[var(--shadow-sm)] overflow-hidden">

      {/* Header con resumen */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-semibold text-[var(--text-dark)]">
            {total} {total === 1 ? "pregunta" : "preguntas"}
          </span>
          <span className="text-[13px] text-[#16a34a]">{resueltas} resueltas</span>
          <span className="text-[13px] text-[var(--text-muted)]">{sinResolver} pendientes</span>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-1">
          {FILTROS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFiltro(id)}
              className="px-3 py-[5px] rounded-full text-[12px] font-medium border cursor-pointer transition-all duration-150"
              style={filtro === id
                ? { background: "var(--primary-color)", color: "white", borderColor: "var(--primary-color)" }
                : { background: "transparent", color: "var(--text-muted)", borderColor: "transparent" }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      <div className="px-6">
        {filtradas.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-[14px] text-[var(--text-muted)] m-0">No hay preguntas en esta categoría</p>
          </div>
        ) : (
          filtradas.map((post) => (
            <FilaPregunta
              key={post.id}
              post={post}
              onCambiarEstado={onCambiarEstado}
              onFeedback={onFeedback}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PanelMisPreguntas;
