import React, { useState } from "react";
import { PRIORIDADES, ESTADOS_PREGUNTA } from "./publicaciones.data";

const FILTROS = [
  { id: "todas",        label: "Todas"        },
  { id: "sin-resolver", label: "Sin resolver" },
  { id: "resuelto",     label: "Resueltas"    },
];

/* ── Tarjeta de pregunta ── */
function FilaPregunta({ post, filtro, onMarcarComentarioUtil }) {
  const cfgPrioridad = PRIORIDADES.find((p) => p.id === post.prioridad) ?? PRIORIDADES[1];
  const cfgEstado    = ESTADOS_PREGUNTA.find((e) => e.id === post.estado) ?? ESTADOS_PREGUNTA[1];
  const resuelto     = post.estado === "resuelto";

  return (
    <div className="flex flex-col gap-[10px] py-4 border-b border-[var(--border-color)] last:border-b-0">

      {/* Cabecera: prioridad + estado + tiempo */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-semibold px-2 py-[3px] rounded-full"
          style={{ background: cfgPrioridad.bg, color: cfgPrioridad.color }}>
          {cfgPrioridad.label}
        </span>
        {/* En "Todas" mostramos el badge de estado para saber de un vistazo cuál es cuál */}
        {filtro === "todas" && (
          <span className="text-[11px] font-medium px-2 py-[3px] rounded-full"
            style={{ background: cfgEstado.bg, color: cfgEstado.color }}>
            {cfgEstado.label}
          </span>
        )}
        <span className="ml-auto text-[12px] text-[var(--text-muted)]">{post.time}</span>
      </div>

      {/* Texto de la pregunta */}
      <p className="text-[14px] text-[var(--text-dark)] leading-[1.6] m-0">{post.text}</p>

      {/* Sin resolver: aviso de que la acción va en el post */}
      {!resuelto && (
        <p className="text-[12px] text-[var(--text-muted)] m-0 italic">
          Entra a tu publicación y marca el comentario que te ayudó como útil para cerrar la pregunta.
        </p>
      )}

      {/* Resuelto: muestra la respuesta que marcaste como útil */}
      {resuelto && post.comentarioUtil && (
        <div className="flex gap-2 items-start p-3 rounded-[var(--radius-sm)] border-l-[3px]"
          style={{ borderLeftColor: "var(--primary-color)", background: "var(--hover-color)" }}>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold m-0 mb-[2px]" style={{ color: "var(--primary-color)" }}>
              ✓ Respuesta útil · {post.comentarioUtil.autor}
            </p>
            <p className="text-[13px] text-[var(--text-dark)] m-0 leading-[1.4]">
              {post.comentarioUtil.texto}
            </p>
          </div>
          <button
            onClick={() => onMarcarComentarioUtil?.(post.id, null)}
            className="shrink-0 text-[13px] text-[var(--text-muted)] bg-transparent border-none cursor-pointer p-0 leading-none hover:text-[var(--error-color)] transition-colors"
            title="Desmarcar respuesta útil">
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Panel principal ── */
function PanelMisPreguntas({ misPreguntas, onMarcarComentarioUtil }) {
  const [filtro, setFiltro] = useState("todas");

  const total       = misPreguntas.length;
  const resueltas   = misPreguntas.filter((p) => p.estado === "resuelto").length;
  const sinResolver = total - resueltas;

  const filtradas = filtro === "todas"
    ? misPreguntas
    : misPreguntas.filter((p) => p.estado === filtro);

  return (
    <div className="bg-[var(--white-color)] rounded-[var(--radius-md)] border border-[var(--border-color)] shadow-[var(--shadow-sm)] overflow-hidden">

      {/* Resumen + filtros */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)] flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-semibold text-[var(--text-dark)]">
            {total} {total === 1 ? "pregunta" : "preguntas"}
          </span>
          <span className="text-[13px]" style={{ color: "var(--success-text)" }}>
            {resueltas} resueltas
          </span>
          <span className="text-[13px] text-[var(--text-muted)]">
            {sinResolver} pendientes
          </span>
        </div>

        <div className="flex items-center gap-1">
          {FILTROS.map(({ id, label }) => (
            <button key={id} onClick={() => setFiltro(id)}
              className="px-3 py-[5px] rounded-full text-[12px] font-medium border cursor-pointer transition-all duration-150"
              style={filtro === id
                ? { background: "var(--primary-color)", color: "white", borderColor: "var(--primary-color)" }
                : { background: "transparent", color: "var(--text-muted)", borderColor: "transparent" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      <div className="px-6">
        {total === 0 ? (
          <div className="py-12 text-center">
            <p className="text-[14px] text-[var(--text-muted)] m-0">
              Aún no has publicado ninguna pregunta
            </p>
          </div>
        ) : filtradas.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-[14px] text-[var(--text-muted)] m-0">
              {filtro === "resuelto" ? "Ninguna pregunta resuelta aún" : "No tienes preguntas pendientes 🎉"}
            </p>
          </div>
        ) : (
          filtradas.map((post) => (
            <FilaPregunta key={post.id} post={post} filtro={filtro}
              onMarcarComentarioUtil={onMarcarComentarioUtil} />
          ))
        )}
      </div>
    </div>
  );
}

export default PanelMisPreguntas;
