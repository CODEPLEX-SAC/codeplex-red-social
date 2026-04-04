import React, { useState, useRef, useEffect } from "react";
import { CONVERSACIONES_MOCK } from "./mensajes.data";
import { useSesion } from "../../identidad/sesion/SesionContext";

/* ── Iconos ── */
const IcoInbox  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>;
const IcoStar   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IcoSend   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const IcoDraft  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;
const IcoSpam   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IcoBin    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>;
const IcoSearch = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IcoRefresh= () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>;
const IcoDots   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>;
const IcoChevL  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoChevR  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
const IcoPrint  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 0 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>;
const IcoDelete = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>;
const IcoLink   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
const IcoAttach = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>;

/* ── Datos sidebar ── */
const CARPETAS = [
  { id: "inbox",   label: "Bandeja de entrada", count: 800, Ico: IcoInbox  },
  { id: "starred", label: "Destacados",          count: 250, Ico: IcoStar   },
  { id: "sent",    label: "Enviados",            count: 80,  Ico: IcoSend   },
  { id: "draft",   label: "Borradores",          count: 50,  Ico: IcoDraft  },
  { id: "spam",    label: "Spam",                count: 30,  Ico: IcoSpam   },
  { id: "bin",     label: "Papelera",            count: 20,  Ico: IcoBin    },
];

const ETIQUETAS = [
  { id: "personal",    label: "Personal",    color: "#3b82f6" },
  { id: "social",      label: "Social",      color: "#a855f7" },
  { id: "promociones", label: "Promociones", color: "#22c55e" },
  { id: "negocios",    label: "Negocios",    color: "#f59e0b" },
];

/* ══════════════════════════════════════════
   VISTA DE HILO DE CORREO
══════════════════════════════════════════ */
const ETIQUETA_COLORES = {
  Personal:    { bg: "#eff6ff", text: "#3b82f6" },
  Social:      { bg: "#faf5ff", text: "#a855f7" },
  Promociones: { bg: "#f0fdf4", text: "#22c55e" },
  Negocios:    { bg: "#fffbeb", text: "#f59e0b" },
};

function VistaCorreo({ correo, etiqueta, onVolver, destacado, onDestacar }) {
  const [respuesta, setRespuesta] = useState("");
  const [hilo, setHilo] = useState(correo.mensajes);
  const threadRef = useRef(null);

  useEffect(() => { setHilo(correo.mensajes); }, [correo]);
  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [hilo]);

  const enviar = () => {
    if (!respuesta.trim()) return;
    setHilo([...hilo, {
      id: `m-${Date.now()}`,
      texto: respuesta,
      hora: new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" }),
      esPropio: true,
    }]);
    setRespuesta("");
  };

  const etqColor = ETIQUETA_COLORES[etiqueta] ?? ETIQUETA_COLORES["Personal"];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[var(--white-color)]">

      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-5 py-[13px] border-b border-[var(--border-color)] shrink-0">
        {/* Volver + nombre + etiqueta */}
        <button
          className="p-1 bg-transparent border-none cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-dark)] transition-colors duration-150 flex items-center"
          onClick={onVolver}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
        <span className="text-[16px] font-bold text-[var(--text-dark)]">{correo.nombre}</span>
        <span className="px-[10px] py-[3px] rounded-full text-[11px] font-semibold" style={{ background: etqColor.bg, color: etqColor.text }}>
          {etiqueta}
        </span>

        {/* Acciones derecha */}
        <div className="ml-auto flex items-center gap-1">
          <button className="p-2 bg-transparent border-none cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-dark)] hover:bg-[#f1f3f4] rounded-full transition-colors duration-150"><IcoPrint /></button>
          <button
            className={`p-2 bg-transparent border-none cursor-pointer hover:bg-[#f1f3f4] rounded-full transition-colors duration-150 ${destacado ? "text-[#f59e0b]" : "text-[var(--text-muted)] hover:text-[var(--text-dark)]"}`}
            onClick={onDestacar}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={destacado ? "#f59e0b" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </button>
          <button className="p-2 bg-transparent border-none cursor-pointer text-[var(--text-muted)] hover:text-red-500 hover:bg-[#fff1f1] rounded-full transition-colors duration-150"><IcoDelete /></button>
        </div>
      </div>

      {/* ── Hilo de mensajes ── */}
      <div className="flex-1 overflow-y-auto" ref={threadRef}>
        {hilo.map((msg, idx) => (
          <div key={msg.id} className={`px-6 py-5 ${idx < hilo.length - 1 ? "border-b border-[var(--border-color)]" : ""}`}>
            {/* Remitente */}
            <div className="flex items-center gap-3 mb-3">
              {msg.esPropio ? (
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold text-white shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  Yo
                </div>
              ) : (
                <img src={correo.avatar} alt={correo.nombre} className="w-10 h-10 rounded-full object-cover shrink-0" />
              )}
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-[14px] font-bold text-[var(--text-dark)]">
                  {msg.esPropio ? "Tú" : correo.nombre}
                </span>
                <span className="text-[12px] text-[var(--text-muted)]">
                  {msg.esPropio ? "yo@correo.com" : correo.especialidad}
                </span>
              </div>
              <span className="ml-auto text-[12px] text-[var(--text-muted)] shrink-0">{msg.hora}</span>
            </div>
            {/* Cuerpo */}
            <p className="text-[14px] text-[var(--text-dark)] leading-[1.7] m-0 pl-[52px]">{msg.texto}</p>
          </div>
        ))}
      </div>

      {/* ── Compose ── */}
      <div className="border-t border-[var(--border-color)] shrink-0">
        <div className="flex items-center px-6 py-4 gap-3">
          <input
            type="text"
            placeholder="Escribe tu respuesta..."
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviar(); } }}
            className="flex-1 border-none outline-none text-[14px] text-[var(--text-dark)] placeholder:text-[var(--text-muted)] bg-transparent"
          />
          <div className="flex items-center gap-2 shrink-0">
            <button className="p-[6px] bg-transparent border-none cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-dark)] transition-colors duration-150"><IcoLink /></button>
            <button className="p-[6px] bg-transparent border-none cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-dark)] transition-colors duration-150"><IcoAttach /></button>
            <button
              className="flex items-center gap-2 px-5 py-[8px] bg-[var(--primary-color)] text-white text-[13px] font-semibold border-none rounded-[var(--radius-md)] cursor-pointer transition-[background,opacity] duration-200 hover:bg-[var(--secondary-color)] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={enviar}
              disabled={!respuesta.trim()}
            >
              <IcoSend />
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   FILA DE EMAIL
══════════════════════════════════════════ */
function EmailRow({ conv, seleccionado, destacado, onSelect, onDestacar, onClick }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-[11px] border-b border-[var(--border-color)] cursor-pointer transition-colors duration-150 ${seleccionado ? "bg-[rgba(72,127,255,0.06)]" : "bg-[var(--white-color)] hover:bg-[#f6f8fc]"}`}
      onClick={onClick}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={seleccionado}
        onClick={(e) => e.stopPropagation()}
        onChange={onSelect}
        className="w-4 h-4 shrink-0 accent-[var(--primary-color)] cursor-pointer"
      />
      {/* Estrella */}
      <button
        className={`shrink-0 bg-transparent border-none cursor-pointer p-0 flex items-center transition-colors duration-150 ${destacado ? "text-[#f59e0b]" : "text-[var(--border-color)] hover:text-[#f59e0b]"}`}
        onClick={(e) => { e.stopPropagation(); onDestacar(); }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={destacado ? "#f59e0b" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </button>
      {/* Nombre */}
      <span className={`w-[170px] shrink-0 text-[13px] truncate ${conv.sinLeer > 0 ? "font-bold text-[var(--text-dark)]" : "font-medium text-[var(--text-dark)]"}`}>
        {conv.nombre}
      </span>
      {/* Preview */}
      <span className="flex-1 text-[13px] text-[var(--text-muted)] truncate min-w-0">
        {conv.ultimoMensaje}
      </span>
      {/* Hora */}
      <span className="text-[12px] text-[var(--text-muted)] shrink-0 ml-2">{conv.hora}</span>
    </div>
  );
}

/* ══════════════════════════════════════════
   ORQUESTADOR
══════════════════════════════════════════ */
function Buzon() {
  const { modoExploracion, comenzarAutenticacion } = useSesion();
  const [carpetaActiva,  setCarpetaActiva]  = useState("inbox");
  const [busqueda,       setBusqueda]       = useState("");
  const [correoActivo,   setCorreoActivo]   = useState(null);
  const [etiquetaActiva, setEtiquetaActiva] = useState(null);
  const [seleccionados,  setSeleccionados]  = useState({});
  const [destacados,     setDestacados]     = useState({});

  const bloquear = modoExploracion ? comenzarAutenticacion : null;

  const conversacionesFiltradas = CONVERSACIONES_MOCK.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const ETIQUETAS_LISTA = ["Personal", "Social", "Promociones", "Negocios"];
  const getEtiqueta = (idx) => ETIQUETAS_LISTA[idx % ETIQUETAS_LISTA.length];

  const toggleSelect   = (id) => setSeleccionados((p) => ({ ...p, [id]: !p[id] }));
  const toggleDestacar = (id) => setDestacados((p)    => ({ ...p, [id]: !p[id] }));
  const todosSelec     = conversacionesFiltradas.length > 0 && conversacionesFiltradas.every((c) => seleccionados[c.id]);
  const toggleTodos    = () => {
    if (todosSelec) setSeleccionados({});
    else setSeleccionados(Object.fromEntries(conversacionesFiltradas.map((c) => [c.id, true])));
  };

  return (
    <div className="grid grid-cols-[220px_1fr] [@media(max-width:640px)]:grid-cols-1 h-[calc(100vh-var(--header-height,120px)-46px)] sm:h-[calc(100vh-var(--header-height,96px)-54px)] bg-[var(--white-color)] rounded-[var(--radius-lg)] border border-[var(--border-color)] shadow-[var(--shadow-md)] overflow-hidden">

      {/* ── Sidebar izquierdo ── */}
      <div className="flex flex-col border-r border-[var(--border-color)] overflow-y-auto [@media(max-width:640px)]:hidden">

        {/* Botón Redactar */}
        <div className="p-4 shrink-0">
          <button
            className="w-full flex items-center justify-center gap-2 py-[10px] px-4 text-[14px] font-semibold text-white border-none rounded-[var(--radius-md)] cursor-pointer transition-[background,transform] duration-200 hover:opacity-90 hover:-translate-y-px"
            style={{ background: "var(--gradient-primary)" }}
            onClick={bloquear ?? undefined}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Redactar
          </button>
        </div>

        {/* Carpetas */}
        <div className="flex flex-col shrink-0">
          {CARPETAS.map(({ id, label, count, Ico }) => (
            <button
              key={id}
              onClick={() => { setCarpetaActiva(id); setChatActivo(null); }}
              className={`flex items-center gap-3 px-4 py-[9px] border-none text-left cursor-pointer transition-colors duration-150 font-[inherit] ${
                carpetaActiva === id
                  ? "bg-[rgba(72,127,255,0.1)] text-[var(--primary-color)] font-semibold"
                  : "bg-transparent text-[var(--text-dark)] hover:bg-[#f6f8fc]"
              }`}
            >
              <span className={carpetaActiva === id ? "text-[var(--primary-color)]" : "text-[var(--text-muted)]"}><Ico /></span>
              <span className="flex-1 text-[13px]">{label}</span>
              <span className="text-[12px] text-[var(--text-muted)]">{count}</span>
            </button>
          ))}
        </div>

        {/* Etiquetas */}
        <div className="px-4 mt-5 shrink-0">
          <p className="text-[11px] font-bold text-[var(--text-muted)] tracking-[0.6px] mb-2">ETIQUETAS</p>
          {ETIQUETAS.map(({ id, label, color }) => (
            <button
              key={id}
              className="flex items-center gap-[10px] w-full py-[7px] text-[13px] text-[var(--text-dark)] bg-transparent border-none cursor-pointer text-left hover:text-[var(--primary-color)] transition-colors duration-150 font-[inherit]"
            >
              <span className="w-[9px] h-[9px] rounded-full shrink-0" style={{ background: color }} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Panel principal ── */}
      <div className="flex flex-col overflow-hidden">

        {correoActivo ? (
          <VistaCorreo
            correo={correoActivo}
            etiqueta={etiquetaActiva}
            onVolver={() => setCorreoActivo(null)}
            destacado={!!destacados[correoActivo.id]}
            onDestacar={() => toggleDestacar(correoActivo.id)}
          />
        ) : (
          <>
            {/* Toolbar */}
            <div className="flex items-center gap-2 px-4 py-[10px] border-b border-[var(--border-color)] shrink-0">
              {/* Checkbox select all */}
              <input
                type="checkbox"
                checked={todosSelec}
                onChange={toggleTodos}
                className="w-4 h-4 accent-[var(--primary-color)] cursor-pointer"
              />
              {/* Acciones */}
              <button className="p-[6px] bg-transparent border-none cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-dark)] hover:bg-[#f1f3f4] rounded-full transition-colors duration-150">
                <IcoRefresh />
              </button>
              <button className="p-[6px] bg-transparent border-none cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-dark)] hover:bg-[#f1f3f4] rounded-full transition-colors duration-150">
                <IcoDots />
              </button>

              {/* Búsqueda */}
              <div className="flex items-center gap-2 flex-1 mx-2 px-4 py-[7px] bg-[#f1f3f4] rounded-[var(--radius-xl)] border border-transparent focus-within:bg-white focus-within:border-[var(--border-color)] focus-within:shadow-sm transition-all duration-200">
                <span className="text-[var(--text-muted)] shrink-0"><IcoSearch /></span>
                <input
                  type="text"
                  placeholder="Buscar en mensajes"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[13px] text-[var(--text-dark)] placeholder:text-[var(--text-muted)]"
                  {...(modoExploracion ? { onClick: comenzarAutenticacion, readOnly: true, style: { cursor: "not-allowed" } } : {})}
                />
              </div>

              {/* Paginación */}
              <span className="text-[12px] text-[var(--text-muted)] shrink-0 hidden sm:block">
                1-{conversacionesFiltradas.length} de 1,253
              </span>
              <button className="p-[6px] bg-transparent border-none cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-dark)] hover:bg-[#f1f3f4] rounded-full transition-colors duration-150 shrink-0">
                <IcoChevL />
              </button>
              <button className="p-[6px] bg-transparent border-none cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-dark)] hover:bg-[#f1f3f4] rounded-full transition-colors duration-150 shrink-0">
                <IcoChevR />
              </button>
            </div>

            {/* Lista de emails */}
            <div className="flex-1 overflow-y-auto">
              {conversacionesFiltradas.map((conv) => (
                <EmailRow
                  key={conv.id}
                  conv={conv}
                  seleccionado={!!seleccionados[conv.id]}
                  destacado={!!destacados[conv.id]}
                  onSelect={() => toggleSelect(conv.id)}
                  onDestacar={() => toggleDestacar(conv.id)}
                  onClick={bloquear ?? (() => { setCorreoActivo(conv); setEtiquetaActiva(getEtiqueta(conversacionesFiltradas.indexOf(conv))); })}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Buzon;
