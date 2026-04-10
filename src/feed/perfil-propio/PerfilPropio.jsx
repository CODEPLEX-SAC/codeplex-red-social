/* ═══════════════════════════════════════════════════════════
   PerfilPropio — perfil social del usuario en sesión.
   Todos los tabs leen de PerfilSocialContext o de props reales.
   Usuario nuevo = todo vacío con placeholders de onboarding.
═══════════════════════════════════════════════════════════ */
import React, { useState } from "react";
import { usePerfilSocial } from "./PerfilSocialContext";
import { ModalEditarPerfilSocial } from "./ModalEditarPerfilSocial";
import { ModalAuthRedSocial } from "../../identidad/sesion/ModalAuthRedSocial";
import { useSesion } from "../../identidad/sesion/SesionContext";
import PanelMisPreguntas from "../publicaciones/PanelMisPreguntas";

/* ── Estilos compartidos ── */
const card      = "bg-[var(--white-color)] rounded-[var(--radius-md)] p-5 border border-[var(--border-color)]";
const tituloLg  = "text-[15px] font-bold text-[var(--text-dark)] m-0";
const tabClass  = (activo) =>
  `shrink-0 px-4 py-3 border-none bg-transparent text-[13px] cursor-pointer border-b-2 whitespace-nowrap transition-all duration-200 ${
    activo
      ? "text-[var(--primary-color)] border-b-[var(--primary-color)] font-semibold"
      : "font-medium text-[var(--text-muted)] border-b-transparent hover:text-[var(--text-dark)]"
  }`;
const subTabClass = (activo) =>
  `px-4 py-[7px] rounded-full text-[13px] font-semibold cursor-pointer border transition-all duration-200 ${
    activo
      ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
      : "bg-transparent text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
  }`;

/* Fila placeholder clickeable */
function FilaVacia({ icono, label, sublabel, onClick }) {
  return (
    <button onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-[var(--background-color)] cursor-pointer text-left hover:border-[var(--primary-color)] transition-colors group">
      <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--hover-color)] flex items-center justify-center shrink-0 text-[var(--text-muted)] group-hover:bg-[var(--primary-bg)] group-hover:text-[var(--primary-color)] transition-colors">
        {icono}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[var(--text-muted)] m-0 group-hover:text-[var(--primary-color)] transition-colors">{label}</p>
        {sublabel && <p className="text-[11px] text-[var(--text-muted)] m-0 mt-[1px]">{sublabel}</p>}
      </div>
    </button>
  );
}

/* Sección con título + icono editar */
function SeccionCard({ titulo, onEditar, children }) {
  return (
    <div className={card}>
      <div className="flex items-center justify-between mb-4">
        <h4 className={tituloLg}>{titulo}</h4>
        <button onClick={onEditar}
          className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-transparent cursor-pointer text-[var(--text-muted)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      </div>
      {children}
    </div>
  );
}

const TABS = [
  { id: "red-social",  label: "Red Social"  },
  { id: "resumen",     label: "Resumen"     },
  { id: "experiencia", label: "Experiencia" },
  { id: "documentos",  label: "Documentos"  },
  { id: "metricas",    label: "Métricas"    },
];

/* ══════════ Tab: Red Social ══════════ */
function TabRedSocial({ perfilSocial, publicaciones, misPreguntas, onMarcarComentarioUtil, onCambiarEstado, onEditar, alNavegar }) {
  const [subTab, setSubTab] = useState("actividad");

  const misPublicaciones = (publicaciones ?? [])
    .filter(p => p.esPropia)
    .slice()
    .reverse()
    .slice(0, 5);

  /* Checklist de completar perfil */
  const checks = [
    { label: "Agregar foto de perfil y nombre",  done: !!(perfilSocial.avatar && perfilSocial.nombreVisible), onClick: () => onEditar("info") },
    { label: "Escribir resumen profesional",      done: !!perfilSocial.bioPública,                            onClick: () => onEditar("resumen") },
    { label: "Agregar experiencia laboral",       done: (perfilSocial.trabajos?.length ?? 0) > 0,             onClick: () => onEditar("experiencia") },
    { label: "Subir título o certificación",      done: (perfilSocial.titulos?.length ?? 0) > 0,              onClick: () => onEditar("titulos") },
    { label: "Subir CV actualizado",              done: (perfilSocial.documentos?.length ?? 0) > 0,           onClick: () => onEditar("documentos") },
  ];
  const todoCompleto = checks.every(c => c.done);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {[
          { id: "actividad",     label: "Actividad reciente" },
          { id: "mis-preguntas", label: "Mis Preguntas"      },
        ].map(({ id, label }) => (
          <button key={id} className={subTabClass(subTab === id)} onClick={() => setSubTab(id)}>{label}</button>
        ))}
      </div>

      {subTab === "actividad" && (
        <div className={card}>
          {misPublicaciones.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-[var(--background-color)] flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div>
                <p className="text-[15px] font-bold text-[var(--text-dark)] m-0 mb-1">Aún no tienes publicaciones</p>
                <p className="text-[13px] text-[var(--text-muted)] m-0 max-w-[280px] leading-[1.5]">
                  Comparte tu primer post profesional, caso de éxito o novedad del sector contable.
                </p>
              </div>
              <button
                onClick={() => alNavegar?.("red-social")}
                className="px-5 py-[10px] text-[13px] font-bold rounded-[var(--radius-sm)] text-white border-none cursor-pointer"
                style={{ background: "var(--gradient-primary)" }}>
                + Nueva publicación
              </button>
            </div>
          ) : (
            <>
              <h4 className="text-[11px] font-bold text-[var(--text-muted)] tracking-[0.5px] m-0 mb-4">MIS PUBLICACIONES RECIENTES</h4>
              {misPublicaciones.map(p => (
                <div key={p.id} className="flex items-start gap-3 py-[10px] border-b border-[var(--border-color)] last:border-b-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-[2px]">
                    <circle cx="12" cy="12" r="10" fill="var(--primary-color)"/>
                    <polyline points="9 12 11 14 15 10" stroke="white"/>
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[var(--text-dark)] m-0 leading-[1.5] line-clamp-2">{p.text}</p>
                    {p.tipo === "pregunta" && (
                      <span className="text-[11px] font-semibold mt-1 inline-block" style={{ color: "var(--secondary-color)" }}>Pregunta</span>
                    )}
                  </div>
                  <span className="text-[12px] text-[var(--text-muted)] whitespace-nowrap shrink-0">{p.time}</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {subTab === "mis-preguntas" && (
        <PanelMisPreguntas
          misPreguntas={misPreguntas}
          onMarcarComentarioUtil={onMarcarComentarioUtil}
          onCambiarEstado={onCambiarEstado}
        />
      )}

      {/* Checklist completar perfil — solo si no está todo completo */}
      {!todoCompleto && (
        <div className={card}>
          <h4 className="text-[11px] font-bold text-[var(--text-muted)] tracking-[0.5px] m-0 mb-4">PARA COMPLETAR TU PERFIL</h4>
          <div className="flex flex-col">
            {checks.map((c, i) => (
              <button key={i} onClick={c.onClick}
                className="flex items-center gap-3 py-[11px] border-b border-[var(--border-color)] last:border-b-0 bg-transparent border-x-0 border-t-0 cursor-pointer text-left hover:bg-[var(--background-color)] transition-colors px-1 rounded-none group">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  c.done
                    ? "border-[var(--primary-color)] bg-[var(--primary-color)]"
                    : "border-[var(--border-color)] group-hover:border-[var(--primary-color)]"
                }`}>
                  {c.done && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
                <span className={`text-[13px] flex-1 ${c.done ? "line-through text-[var(--text-muted)]" : "text-[var(--text-dark)] font-medium"}`}>
                  {c.label}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════ Tab: Resumen ══════════ */
const MAX_PRESENTACION = 101;

function TabResumen({ perfilSocial, onEditar }) {
  const { actualizarPerfilSocial } = usePerfilSocial();

  /* ── Presentación inline ── */
  const [editandoBio, setEditandoBio] = useState(false);
  const [borradorBio, setBorradorBio] = useState(perfilSocial.bioPública || "");

  /* Sincronizar si el perfil cambia desde el modal de edición */
  React.useEffect(() => {
    setBorradorBio(perfilSocial.bioPública || "");
  }, [perfilSocial.bioPública]);

  const guardarBio = () => {
    actualizarPerfilSocial({ bioPública: borradorBio.trim() });
    setEditandoBio(false);
  };
  const cancelarBio = () => {
    setBorradorBio(perfilSocial.bioPública || "");
    setEditandoBio(false);
  };

  /* ── Detalles fijados ── */
  const ubicacion = [perfilSocial.ciudad, perfilSocial.pais].filter(Boolean).join(", ");
  const empresa   = perfilSocial.empresa || "";
  const formacion = (perfilSocial.titulos ?? []).find(t => t.esFormacion);
  const titulos   = (perfilSocial.titulos ?? []).filter(t => !t.esFormacion);
  const habs      = perfilSocial.habilidades ?? [];

  const detalles = [
    ubicacion && {
      icono: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
      texto: ubicacion, seccion: "datos-basicos",
    },
    empresa && {
      icono: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
      texto: empresa, seccion: "datos-basicos",
    },
    formacion && {
      icono: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
      texto: formacion.institucion, seccion: "formacion",
    },
  ].filter(Boolean);

  /* ── Botón lápiz reutilizable ── */
  const BtnEditar = ({ onClick }) => (
    <button onClick={onClick}
      className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-transparent cursor-pointer text-[var(--text-muted)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors shrink-0">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    </button>
  );

  return (
    <div className="flex flex-col gap-4">

      {/* ── Presentación ── */}
      <div className={card}>
        <div className="flex items-center justify-between mb-3">
          <h4 className={tituloLg}>Presentación</h4>
          {!editandoBio && perfilSocial.bioPública && (
            <BtnEditar onClick={() => { setBorradorBio(perfilSocial.bioPública); setEditandoBio(true); }} />
          )}
        </div>

        {editandoBio ? (
          /* Modo edición inline */
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-semibold text-[var(--text-dark)]">Editar presentación</label>
            <textarea
              className="w-full px-3 py-[10px] border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[13.5px] bg-[var(--white-color)] text-[var(--text-dark)] resize-none outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--primary-color)] focus:shadow-[0_0_0_3px_rgba(72,127,255,0.1)]"
              rows={4}
              maxLength={MAX_PRESENTACION}
              placeholder="Preséntate"
              value={borradorBio}
              onChange={e => setBorradorBio(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[var(--text-muted)]">{borradorBio.length}/{MAX_PRESENTACION}</span>
              <div className="flex gap-2">
                <button onClick={cancelarBio}
                  className="px-4 py-[6px] text-[13px] font-semibold border border-[var(--border-color)] text-[var(--text-dark)] bg-transparent rounded-[var(--radius-sm)] cursor-pointer hover:bg-[var(--background-color)] transition-colors">
                  Cancelar
                </button>
                <button onClick={guardarBio}
                  className="px-4 py-[6px] text-[13px] font-semibold text-white rounded-[var(--radius-sm)] border-none cursor-pointer"
                  style={{ background: "var(--primary-color)" }}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        ) : perfilSocial.bioPública ? (
          /* Vista con bio */
          <p className="text-[13.5px] text-[var(--text-dark)] leading-[1.6] m-0">{perfilSocial.bioPública}</p>
        ) : (
          /* Estado vacío — clic abre edición */
          <button
            onClick={() => { setBorradorBio(""); setEditandoBio(true); }}
            className="flex items-center gap-3 w-full p-3 rounded-[var(--radius-sm)] border border-dashed border-[var(--border-color)] bg-[var(--background-color)] cursor-pointer text-left hover:border-[var(--primary-color)] group transition-colors">
            <span className="text-[22px] leading-none select-none">🖐</span>
            <span className="text-[13px] font-medium text-[var(--text-muted)] group-hover:text-[var(--primary-color)] transition-colors">
              Información sobre ti
            </span>
          </button>
        )}
      </div>

      {/* ── Detalles fijados ── */}
      <div className={card}>
        <div className="flex items-center justify-between mb-3">
          <h4 className={tituloLg}>Detalles fijados</h4>
          <BtnEditar onClick={() => onEditar("datos-basicos")} />
        </div>

        {detalles.length > 0 ? (
          <div className="flex items-center flex-wrap gap-x-3 gap-y-2">
            {detalles.map((d, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-[var(--text-muted)] text-[14px] font-light select-none">·</span>}
                <span className="flex items-center gap-[6px] text-[13px] text-[var(--text-dark)] font-medium">
                  <span className="text-[var(--text-muted)]">{d.icono}</span>
                  {d.texto}
                </span>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <button onClick={() => onEditar("datos-basicos")}
            className="flex items-center gap-3 w-full p-3 rounded-[var(--radius-sm)] border border-dashed border-[var(--border-color)] bg-[var(--background-color)] cursor-pointer text-left hover:border-[var(--primary-color)] group transition-colors">
            <span className="text-[var(--text-muted)] group-hover:text-[var(--primary-color)] transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </span>
            <span className="text-[13px] font-medium text-[var(--text-muted)] group-hover:text-[var(--primary-color)] transition-colors">
              Agrega ubicación, empresa o formación
            </span>
          </button>
        )}
      </div>

      {/* ── Títulos verificados ── */}
      <SeccionCard titulo="Títulos verificados" onEditar={() => onEditar("titulos")}>
        {titulos.length > 0
          ? titulos.map(t => (
              <div key={t.id} className="flex items-center gap-3 py-3 border-b border-[var(--border-color)] last:border-b-0">
                <div className="w-9 h-9 bg-[var(--primary-color)] rounded-[var(--radius-sm)] flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <div className="flex-1 flex flex-col gap-[2px]">
                  <span className="text-[13px] font-semibold text-[var(--text-dark)]">{t.titulo}</span>
                  {t.institucion && <span className="text-[12px] text-[var(--text-muted)]">{t.institucion}</span>}
                </div>
              </div>
            ))
          : <FilaVacia
              icono={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>}
              label="+ Agregar título o certificación"
              onClick={() => onEditar("titulos")}
            />
        }
      </SeccionCard>

      {/* ── Habilidades ── */}
      <SeccionCard titulo="Habilidades" onEditar={() => onEditar("habilidades")}>
        {habs.length > 0
          ? <div className="flex flex-wrap gap-2">
              {habs.map(h => (
                <span key={h} className="px-3 py-[5px] rounded-full text-[12px] font-semibold border border-[var(--border-color)] bg-[var(--background-color)] text-[var(--text-dark)]">
                  {h}
                </span>
              ))}
            </div>
          : <button onClick={() => onEditar("habilidades")}
              className="flex items-center gap-1 px-3 py-[6px] rounded-full text-[12px] font-semibold border border-dashed border-[var(--border-color)] text-[var(--text-muted)] bg-transparent cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors">
              + Habilidad
            </button>
        }
      </SeccionCard>
    </div>
  );
}

/* ══════════ Tab: Experiencia ══════════ */
function TabExperiencia({ perfilSocial, onEditar }) {
  const trabajos = perfilSocial.trabajos ?? [];
  const titulos  = perfilSocial.titulos  ?? [];

  return (
    <div className="flex flex-col gap-4">
      {/* Experiencia laboral */}
      <SeccionCard titulo="Experiencia laboral" onEditar={() => onEditar("experiencia")}>
        {trabajos.length > 0
          ? trabajos.map((t, i) => (
              <div key={t.id ?? i} className="flex gap-[14px] py-[14px] border-b border-[var(--border-color)] last:border-b-0">
                <div className="w-10 h-10 bg-[var(--primary-color)] rounded-[var(--radius-sm)] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <div className="flex-1 flex flex-col gap-[3px]">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[14px] font-bold text-[var(--text-dark)]">{t.cargo}</span>
                    <span className="text-[12px] text-[var(--text-muted)] whitespace-nowrap shrink-0">{t.periodo}</span>
                  </div>
                  <span className="text-[12px] font-semibold" style={{ color: "var(--primary-color)" }}>{t.empresa}</span>
                  {t.desc && <p className="text-[13px] text-[var(--text-muted)] leading-[1.5] mt-1 m-0">{t.desc}</p>}
                </div>
              </div>
            ))
          : <div className="flex flex-col gap-2">
              <FilaVacia
                icono={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}
                label="+ Agregar experiencia laboral"
                sublabel="Empresa, cargo y periodo"
                onClick={() => onEditar("experiencia")}
              />
              <FilaVacia
                icono={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
                label="+ Agregar caso práctico"
                sublabel="Documenta un proyecto real"
                onClick={() => onEditar("experiencia")}
              />
            </div>
        }
      </SeccionCard>

      {/* Formación académica */}
      <SeccionCard titulo="Formación académica" onEditar={() => onEditar("formacion")}>
        {titulos.length > 0
          ? titulos.map(t => (
              <div key={t.id} className="flex items-center gap-3 py-3 border-b border-[var(--border-color)] last:border-b-0">
                <div className="w-9 h-9 bg-[var(--primary-color)] rounded-[var(--radius-sm)] flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <div className="flex-1 flex flex-col gap-[2px]">
                  <span className="text-[13px] font-semibold text-[var(--text-dark)]">{t.titulo}</span>
                  {t.institucion && <span className="text-[12px] text-[var(--text-muted)]">{t.institucion}</span>}
                </div>
              </div>
            ))
          : <FilaVacia
              icono={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>}
              label="+ Agregar formación académica"
              sublabel="Universidad y grado"
              onClick={() => onEditar("formacion")}
            />
        }
      </SeccionCard>
    </div>
  );
}

/* ══════════ Tab: Documentos ══════════ */
function TabDocumentos({ perfilSocial, onEditar }) {
  const docs = perfilSocial.documentos ?? [];
  const tieneCV     = docs.some(d => d.tipo?.toLowerCase().includes("cv") || d.nombre?.toLowerCase().includes("cv"));
  const tieneTitulo = docs.some(d => d.tipo?.toLowerCase().includes("título") || d.nombre?.toLowerCase().includes("título"));
  const mostrarAviso = !tieneCV || !tieneTitulo;

  return (
    <div className="flex flex-col gap-4">
      <SeccionCard titulo="Documentos" onEditar={() => onEditar("documentos")}>
        <div className="flex flex-col gap-2">
          {docs.length > 0
            ? docs.map(doc => (
                <div key={doc.id} className="flex items-center gap-[14px] py-3 border-b border-[var(--border-color)] last:border-b-0">
                  <div className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, var(--primary-color), #7c3aed)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[3px] flex-1 min-w-0">
                    <span className="text-[14px] font-semibold text-[var(--text-dark)] truncate">{doc.nombre}</span>
                    <span className="text-[12px] text-[var(--text-muted)]">{doc.tipo} · Subido el {doc.fecha}</span>
                  </div>
                </div>
              ))
            : <>
                <FilaVacia
                  icono={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
                  label="+ Subir CV actualizado"
                  sublabel="PDF recomendado"
                  onClick={() => onEditar("documentos")}
                />
                <FilaVacia
                  icono={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>}
                  label="+ Subir título profesional"
                  sublabel="Será verificado por Codeplex"
                  onClick={() => onEditar("documentos")}
                />
              </>
          }
        </div>

        {/* Aviso */}
        {mostrarAviso && (
          <div className="flex items-center gap-2 mt-3 p-3 rounded-[var(--radius-sm)] border border-[#f59e0b] bg-[#fffbeb]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" className="shrink-0">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-[12px] text-[#92400e] m-0">
              Debes subir al menos el CV y un título verificado para aparecer en búsquedas.
            </p>
          </div>
        )}
      </SeccionCard>
    </div>
  );
}

/* ══════════ Tab: Métricas ══════════ */
function TabMetricas({ perfilSocial, publicaciones, misPreguntas, onEditar }) {
  const misPublicaciones = (publicaciones ?? []).filter(p => p.esPropia);
  const resueltas        = (misPreguntas ?? []).filter(p => p.estado === "resuelto");
  const habilidades      = perfilSocial.habilidades ?? [];

  /* Perfil incompleto = sin nombre, sin bio, sin habilidades y sin publicaciones */
  const perfilIncompleto =
    !perfilSocial.nombreVisible &&
    !perfilSocial.bioPública &&
    habilidades.length === 0 &&
    misPublicaciones.length === 0;

  if (perfilIncompleto) {
    return (
      <div className={card}>
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <div className="w-14 h-14 rounded-full bg-[var(--background-color)] flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div>
            <p className="text-[15px] font-bold text-[var(--text-dark)] m-0 mb-1">Métricas bloqueadas</p>
            <p className="text-[13px] text-[var(--text-muted)] m-0 max-w-[260px] leading-[1.5]">
              Se generan automáticamente al completar tu perfil y participar en la plataforma.
            </p>
          </div>
          <button onClick={() => onEditar("info")}
            className="px-5 py-[10px] text-[13px] font-bold rounded-[var(--radius-sm)] text-white border-none cursor-pointer"
            style={{ background: "var(--gradient-primary)" }}>
            Completar perfil
          </button>
        </div>
      </div>
    );
  }

  const PCTS = ["80%", "72%", "65%", "58%", "50%", "45%"];
  const cards = [
    { label: "Publicaciones", valor: misPublicaciones.length, color: "var(--primary-color)"   },
    { label: "Preguntas",     valor: misPreguntas?.length ?? 0, color: "var(--secondary-color)" },
    { label: "Resueltas",     valor: resueltas.length,          color: "var(--success-color)"   },
    { label: "Amigos",        valor: 0,                         color: "var(--text-muted)"       },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className={card}>
        <h4 className="text-[11px] font-bold text-[var(--text-muted)] tracking-[0.5px] m-0 mb-4">RESUMEN DE ACTIVIDAD</h4>
        <div className="grid grid-cols-4 gap-3 [@media(max-width:900px)]:grid-cols-2">
          {cards.map((c, i) => (
            <div key={i} className="bg-[var(--background-color)] border border-[var(--border-color)] rounded-[var(--radius-sm)] p-[14px] flex flex-col gap-1">
              <p className="text-[11px] text-[var(--text-muted)] m-0">{c.label}</p>
              <p className="text-[26px] font-bold my-1" style={{ color: c.color }}>{c.valor}</p>
            </div>
          ))}
        </div>
      </div>

      {habilidades.length > 0 && (
        <div className={card}>
          <h4 className="text-[11px] font-bold text-[var(--text-muted)] tracking-[0.5px] m-0 mb-4">PROGRESO DE HABILIDADES</h4>
          {habilidades.map((h, i) => (
            <div key={h} className="mb-3 last:mb-0">
              <div className="flex justify-between text-[12px] mb-1">
                <span className="text-[var(--text-dark)] font-medium">{h}</span>
                <span className="text-[var(--text-muted)]">{PCTS[i % PCTS.length]}</span>
              </div>
              <div className="h-1 bg-[var(--border-color)] rounded-[2px] overflow-hidden mt-[6px]">
                <div className="h-full bg-[var(--primary-color)] rounded-[2px]" style={{ width: PCTS[i % PCTS.length] }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PerfilPropio — componente principal
══════════════════════════════════════════════════════ */
function PerfilPropio({ onVolver, alNavegar, publicaciones = [], misPreguntas = [], onMarcarComentarioUtil, onCambiarEstado }) {
  const { perfilSocial } = usePerfilSocial();
  const { confirmarSesion } = useSesion();
  const [tab,            setTab]            = useState("red-social");
  const [modalEditar,    setModalEditar]    = useState(false);
  const [modalInitTab,   setModalInitTab]   = useState("info");
  const [modalVerificar, setModalVerificar] = useState(false);

  const abrirModal = (initTab = "info") => {
    if (initTab === "verificacion") { setModalVerificar(true); return; }
    setModalInitTab(initTab);
    setModalEditar(true);
  };

  const nombreCompleto = perfilSocial.nombreVisible || null;
  const cargo          = perfilSocial.tituloProfesional || perfilSocial.cargo || null;
  const ubicacion      = [perfilSocial.ciudad, perfilSocial.pais].filter(Boolean).join(", ") || null;
  const misPublicaciones = publicaciones.filter(p => p.esPropia);

  /* Cuando el editor está abierto, lo rendrizamos como vista completa
     (reemplaza el perfil, sin overlay) igual que cualquier otra vista del dashboard */
  if (modalEditar) {
    return (
      <ModalEditarPerfilSocial
        onCerrar={() => setModalEditar(false)}
        initialTab={modalInitTab}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col bg-[var(--background-color)] w-full gap-4">

        {/* ── Cabecera ── */}
        <div className="bg-[var(--white-color)] rounded-[var(--radius-md)] border border-[var(--border-color)] shadow-[var(--shadow-sm)] overflow-hidden">

          {/* Botón volver */}
          <button
            className="flex items-center gap-[6px] bg-transparent border-none text-[var(--text-dark)] cursor-pointer text-[13px] font-medium px-5 pt-3 pb-2 opacity-70 hover:opacity-100 transition-opacity"
            onClick={onVolver}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <div className="px-6 pb-5 pt-1">
            <div className="flex items-start gap-5 [@media(max-width:600px)]:flex-col">

              {/* Avatar */}
              <div className="relative shrink-0">
                {perfilSocial.avatar
                  ? <img src={perfilSocial.avatar} alt={nombreCompleto || "Avatar"}
                      className="w-[80px] h-[80px] rounded-full object-cover border-2 border-[var(--border-color)]" />
                  : <div className="w-[80px] h-[80px] rounded-full border-2 border-dashed border-[var(--border-color)] bg-[var(--background-color)] flex flex-col items-center justify-center gap-1 text-[var(--text-muted)]">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                      </svg>
                      <span className="text-[9px] font-bold tracking-[0.5px]">FOTO</span>
                    </div>
                }
                <button onClick={() => abrirModal("info")}
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--primary-color)] border-2 border-[var(--white-color)] flex items-center justify-center cursor-pointer">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
              </div>

              {/* Info central */}
              <div className="flex-1 min-w-0 flex flex-col gap-[6px] pt-1">
                {/* Nombre */}
                {nombreCompleto
                  ? <h2 className="text-[18px] font-bold text-[var(--text-dark)] m-0 leading-none">{nombreCompleto}</h2>
                  : <button onClick={() => abrirModal("info")}
                      className="inline-flex items-center gap-1 px-3 py-[5px] rounded-[var(--radius-sm)] border border-dashed border-[var(--border-color)] text-[13px] text-[var(--text-muted)] bg-transparent cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors w-fit">
                      + Agregar tu nombre completo
                    </button>
                }
                {/* Cargo */}
                {cargo
                  ? <p className="text-[13px] text-[var(--text-muted)] m-0">{cargo}</p>
                  : <button onClick={() => abrirModal("info")}
                      className="inline-flex items-center gap-1 px-3 py-[5px] rounded-[var(--radius-sm)] border border-dashed border-[var(--border-color)] text-[12px] text-[var(--text-muted)] bg-transparent cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors w-fit">
                      + Cargo profesional
                    </button>
                }
                {/* Stats */}
                <div className="flex items-center gap-4 text-[13px] text-[var(--text-muted)]">
                  <span><strong className="text-[var(--text-dark)] font-bold">{misPublicaciones.length}</strong> Publicaciones</span>
                  <span><strong className="text-[var(--text-dark)] font-bold">0</strong> Amigos</span>
                </div>
                {/* Chips rápidos */}
                <div className="flex flex-wrap gap-[6px] mt-1">
                  <span className="flex items-center gap-1 px-2 py-[4px] rounded-full text-[11px] font-medium border border-[var(--border-color)] bg-[var(--background-color)] text-[var(--text-muted)]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    — · 0 reseñas
                  </span>
                  <button onClick={() => abrirModal("info")}
                    className="flex items-center gap-1 px-2 py-[4px] rounded-full text-[11px] font-medium border border-[var(--border-color)] bg-[var(--background-color)] text-[var(--text-muted)] cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
                    {ubicacion || "+ Ubicación"}
                  </button>
                  <button onClick={() => abrirModal("formacion")}
                    className="flex items-center gap-1 px-2 py-[4px] rounded-full text-[11px] font-medium border border-[var(--border-color)] bg-[var(--background-color)] text-[var(--text-muted)] cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/></svg>
                    + Universidad
                  </button>
                  <button onClick={() => abrirModal("experiencia")}
                    className="flex items-center gap-1 px-2 py-[4px] rounded-full text-[11px] font-medium border border-[var(--border-color)] bg-[var(--background-color)] text-[var(--text-muted)] cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/></svg>
                    + Experiencia
                  </button>
                  <button onClick={() => abrirModal("habilidades")}
                    className="flex items-center gap-1 px-2 py-[4px] rounded-full text-[11px] font-bold border border-[var(--border-color)] bg-[var(--background-color)] text-[var(--text-muted)] cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors">
                    + HABILIDAD
                  </button>
                </div>
              </div>

              {/* Columna derecha: botón editar + verificación + redes */}
              <div className="flex flex-col items-end gap-3 shrink-0 [@media(max-width:600px)]:flex-row [@media(max-width:600px)]:w-full">
                <button onClick={() => abrirModal("info")}
                  className="flex items-center gap-2 py-[8px] px-4 text-white text-[13px] font-bold border-none rounded-[var(--radius-sm)] cursor-pointer transition-opacity hover:opacity-90"
                  style={{ background: "var(--gradient-primary)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Editar perfil
                </button>
                {/* Verificado / Verificar */}
                {perfilSocial.verificado ? (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[var(--success-color)]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Verificado
                  </span>
                ) : (
                  <button onClick={() => abrirModal("verificacion")}
                    className="flex items-center gap-1 text-[11px] font-semibold text-[var(--text-muted)] bg-transparent border-none cursor-pointer hover:text-[var(--primary-color)] transition-colors p-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Verificar cuenta
                  </button>
                )}
                {/* Redes sociales */}
                <div className="flex gap-2">
                  {[
                    { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, key: "email" },
                    { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>, key: "linkedin" },
                    { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, key: "web" },
                  ].map(({ icon, key }) => (
                    <button key={key} onClick={() => abrirModal("info")}
                      className="w-8 h-8 rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-[var(--background-color)] flex items-center justify-center cursor-pointer text-[var(--text-muted)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors">
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto border-t border-[var(--border-color)] px-5 scrollbar-none">
            {TABS.map(({ id, label }) => (
              <button key={id} className={tabClass(tab === id)} onClick={() => setTab(id)}>{label}</button>
            ))}
          </div>
        </div>

        {/* ── Contenido ── */}
        {tab === "red-social"  && (
          <TabRedSocial
            perfilSocial={perfilSocial}
            publicaciones={publicaciones}
            misPreguntas={misPreguntas}
            onMarcarComentarioUtil={onMarcarComentarioUtil}
            onCambiarEstado={onCambiarEstado}
            onEditar={abrirModal}
            alNavegar={alNavegar}
          />
        )}
        {tab === "resumen"     && <TabResumen     perfilSocial={perfilSocial} onEditar={abrirModal} />}
        {tab === "experiencia" && <TabExperiencia perfilSocial={perfilSocial} onEditar={abrirModal} />}
        {tab === "documentos"  && <TabDocumentos  perfilSocial={perfilSocial} onEditar={abrirModal} />}
        {tab === "metricas"    && <TabMetricas    perfilSocial={perfilSocial} publicaciones={publicaciones} misPreguntas={misPreguntas} onEditar={abrirModal} />}

        {modalVerificar && <ModalAuthRedSocial modoVerificacion onConfirmar={() => setModalVerificar(false)} onCerrar={() => setModalVerificar(false)} />}
      </div>
    </div>
  );
}

export default PerfilPropio;
