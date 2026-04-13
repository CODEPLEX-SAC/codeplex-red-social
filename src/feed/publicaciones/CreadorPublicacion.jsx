import React, { useState, useRef, useEffect } from "react";
import Icon from "../../ui/Icon/Icon";
import { useSesion } from "../../identidad/sesion/SesionContext";
import { usePerfilSocial } from "../perfil-propio/PerfilSocialContext";
import { subirMedio, subirMedios } from "../../servicios/medios/SubidaMedios";
import { PRIORIDADES } from "./publicaciones.data";


/* ── Chips de tipo de publicación ── */
const TABS_MODAL = [
  {
    id: "post", label: "Post",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    color: "var(--primary-color)", bg: "var(--primary-bg, #eff6ff)",
  },
  {
    id: "videos", label: "Video",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>,
    color: "var(--error-color)", bg: "var(--error-bg)",
  },
  {
    id: "encuesta", label: "Encuesta",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    color: "#0d9488", bg: "#f0fdfa",
  },
  {
    id: "pregunta", label: "Pregunta",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    color: "var(--secondary-color)", bg: "var(--hover-color)",
  },
];

/* ── Chips de prioridad (inline, solo cuando tipo = pregunta) ── */
function ChipsPrioridad({ prioridad, onChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[12px] text-[var(--text-muted)] font-semibold">Prioridad:</span>
      {PRIORIDADES.map(({ id, label, color, bg }) => {
        const activo = prioridad === id;
        return (
          <button key={id} onClick={() => onChange(id)}
            className="flex items-center gap-[5px] px-[10px] py-[5px] rounded-full text-[12px] font-semibold border cursor-pointer transition-all duration-150"
            style={{
              background:   activo ? bg    : "transparent",
              color:        activo ? color : "var(--text-muted)",
              borderColor:  activo ? color : "var(--border-color)",
            }}>
            <span className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: color }} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* ── Modal de creación / edición de publicación ── */
export function ModalPublicacion({ usuario, onPublicar, onCerrar, textoInicial = "", imagenesIniciales = [], modoEditar = false }) {
  const [texto,     setTexto]     = useState(textoInicial);
  const [imagenes,  setImagenes]  = useState(imagenesIniciales);
  const [activeTab, setActiveTab] = useState("post");
  const [prioridad, setPrioridad] = useState("normal");
  const [publicando,setPublicando]= useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  /* Foco en textarea al abrir */
  useEffect(() => { setTimeout(() => textareaRef.current?.focus(), 80); }, []);

  /* Cerrar con Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onCerrar(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onCerrar]);

  /* Autosize del textarea */
  const handleTextoChange = (e) => {
    setTexto(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 300) + "px";
  };

  /* Subir medios a través del servicio SubidaMedios */
  const agregarMedios = async (files) => {
    const urls = await subirMedios(files);
    setImagenes((prev) => [...prev, ...urls]);
  };

  /* Pegar imagen/video con Ctrl+V */
  const handlePaste = async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith("image/") || item.type.startsWith("video/")) {
        e.preventDefault();
        const medio = await subirMedio(item.getAsFile());
        setImagenes((prev) => [...prev, medio]);
      }
    }
  };

  /* Drag & drop en el área del textarea */
  const handleDrop = (e) => {
    e.preventDefault();
    agregarMedios(e.dataTransfer.files);
  };

  /* Publicar */
  const handlePublicar = () => {
    if ((!texto.trim() && imagenes.length === 0) || publicando) return;
    setPublicando(true);
    setTimeout(() => {
      onPublicar(
        texto,
        usuario?.nombre,
        usuario?.avatar,
        activeTab === "pregunta" ? "pregunta" : activeTab,
        activeTab === "pregunta" ? prioridad : "normal",
        imagenes,   // siempre pasar el array (puede estar vacío en edición)
      );
      onCerrar();
    }, 350);
  };

  const puedePublicar = (texto.trim().length > 0 || imagenes.length > 0) && !publicando;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={onCerrar}>
      <div className="bg-[var(--white-color)] rounded-[var(--radius-md)] shadow-[0_24px_64px_rgba(0,0,0,0.22)] w-full max-w-[520px] flex flex-col overflow-hidden"
        style={{ animation: "modalSlideIn 0.18s ease", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)] shrink-0">
          <div className="w-8" />
          <h3 className="text-[16px] font-bold text-[var(--text-dark)] m-0">{modoEditar ? "Editar publicación" : "Crear publicación"}</h3>
          <button onClick={onCerrar}
            className="w-8 h-8 flex items-center justify-center bg-[var(--hover-color)] border-none rounded-full cursor-pointer text-[var(--text-muted)] transition-colors duration-200 hover:bg-[var(--border-color)] hover:text-[var(--text-dark)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* ── Usuario ── */}
        <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
          {usuario?.avatar
            ? <img src={usuario.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
            : <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center bg-[var(--border-color)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </div>
          }
          <div className="flex flex-col gap-[6px]">
            <p className="text-[14px] font-bold text-[var(--text-dark)] m-0">{usuario?.nombre || "Usuario"}</p>
            {/* Chips de tipo de publicación */}
            <div className="flex items-center gap-[6px] flex-wrap">
              {TABS_MODAL.map(({ id, label, icon, color, bg }) => {
                const activo = activeTab === id;
                return (
                  <button key={id} onClick={() => setActiveTab(id)}
                    className="flex items-center gap-[5px] px-[10px] py-[4px] rounded-full text-[12px] font-semibold border cursor-pointer transition-all duration-150"
                    style={{
                      background:  activo ? bg    : "transparent",
                      color:       activo ? color : "var(--text-muted)",
                      borderColor: activo ? color : "var(--border-color)",
                    }}>
                    {icon}
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Textarea + preview — scroll si hay mucho contenido ── */}
        <div className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-4 px-5 pt-3 pb-4">
          <textarea
            ref={textareaRef}
            value={texto}
            onChange={handleTextoChange}
            onPaste={handlePaste}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            placeholder={`¿Qué estás pensando, ${usuario?.nombre?.split(" ")[0] || ""}?`}
            className="w-full resize-none border-none outline-none text-[16px] text-[var(--text-dark)] bg-transparent leading-[1.5] placeholder:text-[var(--text-muted)]"
            style={{ minHeight: "48px", height: "auto" }}
            rows={2}
          />

          {/* Preview medios (imágenes y videos) */}
          {imagenes.length > 0 && (
            <div className="rounded-[var(--radius-sm)] overflow-hidden border border-[var(--border-color)]">
              <div className={`grid gap-[2px] ${imagenes.length === 1 ? "grid-cols-1" : imagenes.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                {imagenes.map((medio, i) => (
                  <div key={i} className="relative group overflow-hidden" style={{ maxHeight: "220px" }}>
                    {medio.tipo === "video" ? (
                      <>
                        <video src={medio.url} className="w-full h-full object-cover block" style={{ maxHeight: "220px" }} muted />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="white" style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.6))" }}>
                            <polygon points="5 3 19 12 5 21 5 3"/>
                          </svg>
                        </div>
                      </>
                    ) : (
                      <img src={medio.url} alt="" className="w-full h-full object-cover block" style={{ maxHeight: "220px" }} />
                    )}
                    <button onClick={() => setImagenes((prev) => prev.filter((_, j) => j !== i))}
                      className="absolute top-2 right-2 w-7 h-7 border-none rounded-full cursor-pointer flex items-center justify-center transition-colors duration-200 hover:opacity-80"
                      style={{ background: "var(--text-dark)", color: "var(--white-color)" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chips de prioridad — solo visible cuando el tipo es Pregunta */}
          {activeTab === "pregunta" && (
            <ChipsPrioridad prioridad={prioridad} onChange={setPrioridad} />
          )}
        </div>

        {/* ── Añadir a tu publicación ── */}
        <div className="mx-5 mb-4 shrink-0">
          <div className="flex items-center justify-between border border-[var(--border-color)] rounded-[var(--radius-sm)] px-4 py-3">
            <span className="text-[13px] font-semibold text-[var(--text-dark)]">Añadir a tu publicación</span>
            <div className="flex items-center gap-1">

              {/* Foto / Video — file picker */}
              <button title="Foto / Video"
                onClick={() => fileInputRef.current?.click()}
                className="w-9 h-9 flex items-center justify-center border-none rounded-full cursor-pointer transition-all duration-200 text-[var(--success-text,#16a34a)] hover:bg-[var(--success-bg)]">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </button>
              <input ref={fileInputRef} type="file" accept="image/*,video/*" multiple className="hidden"
                onChange={(e) => { agregarMedios(e.target.files); e.target.value = ""; }} />

              {/* Etiquetar personas */}
              <button title="Etiquetar personas"
                className="w-9 h-9 flex items-center justify-center border-none rounded-full cursor-pointer transition-all duration-200 text-[var(--primary-color)] hover:bg-[var(--hover-color)]">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <line x1="19" y1="8" x2="19" y2="14"/>
                  <line x1="22" y1="11" x2="16" y2="11"/>
                </svg>
              </button>

              {/* Invitar colaborador */}
              <button title="Invitar colaborador"
                className="w-9 h-9 flex items-center justify-center border-none rounded-full cursor-pointer transition-all duration-200 text-[var(--secondary-color)] hover:bg-[var(--hover-color)]">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 11h-6M19 8v6"/>
                </svg>
              </button>

            </div>
          </div>
        </div>

        {/* ── Botón publicar ── */}
        <div className="px-5 pb-4 shrink-0">
          <button onClick={handlePublicar} disabled={!puedePublicar}
            className="w-full py-[11px] border-none rounded-[var(--radius-sm)] text-white text-[15px] font-bold cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))" }}>
            {publicando ? (modoEditar ? "Guardando..." : "Publicando...") : (modoEditar ? "Guardar cambios" : "Publicar")}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalSlideIn {
          from { opacity: 0; transform: scale(0.95) translateY(-10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CreadorPublicacion — barra de entrada (trigger)
══════════════════════════════════════════════ */
function CreadorPublicacion({ onPublicar, alNavegar }) {
  const { modoExploracion, comenzarAutenticacionSocial, userSocial } = useSesion();
  const { perfilSocial, tienePerfil } = usePerfilSocial();
  /* La foto que aparece en la red social es la del perfil social, no la de la cuenta */
  const avatarRed = perfilSocial.avatar || null;
  const nombreRed = perfilSocial.nombreVisible;
  /* Sin @username completado: el modal de onboarding (App) es el flujo correcto, no el login */
  const onboardingSocialPendiente = Boolean(userSocial && tienePerfil === false);
  const requiereLoginRedSocial      = modoExploracion || !userSocial;
  const bloquearComposer            = requiereLoginRedSocial || onboardingSocialPendiente;
  const [modalAbierto, setModalAbierto] = useState(false);

  const handlePublicar = (texto, autor, avatar, tipo, prioridad, imagenes) => {
    onPublicar(texto, autor, avatar, tipo, prioridad, imagenes);
  };

  return (
    <>
      {/* ── Barra trigger ── */}
      <div className="bg-[var(--white-color)] p-[20px] rounded-[var(--radius-md)] shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-[var(--border-color)] [@media(max-width:480px)]:px-[15px]">
        <div className="flex items-center gap-[14px]">
          {bloquearComposer ? (
            <div className="w-10 h-10 rounded-full bg-[var(--border-light)] border-2 border-dashed border-[var(--border-color)] flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
          ) : avatarRed ? (
            <img src={avatarRed} alt=""
              className="w-10 h-10 rounded-full shrink-0 object-cover cursor-pointer"
              onClick={() => alNavegar?.("perfil-propio")} />
          ) : (
            <div onClick={() => alNavegar?.("perfil-propio")}
              className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center cursor-pointer bg-[var(--border-color)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
          )}
          <button
            type="button"
            disabled={onboardingSocialPendiente}
            onClick={requiereLoginRedSocial ? comenzarAutenticacionSocial : () => setModalAbierto(true)}
            className={`flex-1 text-left px-[15px] py-3 rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--white-color)] text-[14px] text-[var(--text-muted)] font-[inherit] transition-colors duration-200 ${
              onboardingSocialPendiente ? "cursor-not-allowed opacity-90" : "cursor-pointer hover:bg-[var(--background-color)]"
            } disabled:cursor-not-allowed`}
          >
            {requiereLoginRedSocial
              ? "Inicia sesión para publicar..."
              : onboardingSocialPendiente
                ? "Completa tu @username arriba para publicar…"
                : `¿Qué estás pensando, ${nombreRed.split(" ")[0] || ""}?`}
          </button>
        </div>
      </div>

      {/* ── Modal ── */}
      {modalAbierto && (
        <ModalPublicacion
          usuario={{ nombre: nombreRed, avatar: avatarRed }}
          onPublicar={handlePublicar}
          onCerrar={() => setModalAbierto(false)}
        />
      )}
    </>
  );
}

export default CreadorPublicacion;
