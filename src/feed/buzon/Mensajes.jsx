import React, { useState, useRef, useEffect } from "react";
import { CONVERSACIONES_MOCK } from "./mensajes.data";
import { useSesion } from "../../identidad/sesion/SesionContext";
import PerfilPublico from "../perfil-publico/PerfilPublico";

const TABS = [
  { id: "todos",     label: "Todos"     },
  { id: "noleidos", label: "No leídos" },
  { id: "grupos",   label: "Grupos"    },
];

const COMUNIDADES_MOCK = [
  { id: "c1", nombre: "Contadores del Perú",    avatar: "https://i.pravatar.cc/150?img=11", ultimoMensaje: "Nuevo reglamento tributario", hora: "10:20", miembros: 128 },
  { id: "c2", nombre: "EmprendePlex 2026",      avatar: "https://i.pravatar.cc/150?img=22", ultimoMensaje: "¿Alguien va al webinar?",      hora: "Ayer",   miembros: 75  },
  { id: "c3", nombre: "Facturación Electrónica", avatar: "https://i.pravatar.cc/150?img=33", ultimoMensaje: "Error en SUNAT resuelto ✅",   hora: "Lun",    miembros: 210 },
  { id: "c4", nombre: "Gestión Empresarial",     avatar: "https://i.pravatar.cc/150?img=44", ultimoMensaje: "Plantilla de flujo de caja",   hora: "Dom",    miembros: 54  },
];

const tabClass = (activo) =>
  `px-4 py-[7px] border-none text-[12.5px] font-semibold cursor-pointer rounded-[var(--radius-xl)] transition-all duration-200 font-[inherit] whitespace-nowrap ${
    activo
      ? "bg-[var(--primary-color)] text-white shadow-[0_2px_8px_rgba(72,127,255,0.35)]"
      : "bg-transparent text-[var(--text-muted)] hover:text-[var(--primary-color)] hover:bg-[rgba(72,127,255,0.07)]"
  }`;

function ConversacionItem({ conversacion, activa, onClick }) {
  const { nombre, avatar, ultimoMensaje, hora, sinLeer } = conversacion;
  return (
    <button
      className={`group flex items-center gap-3 w-full px-4 py-[10px] mx-2 border-none cursor-pointer text-left transition-all duration-200 rounded-[var(--radius-md)] ${
        activa
          ? "bg-[rgba(72,127,255,0.08)] border border-[rgba(72,127,255,0.18)]"
          : "bg-transparent border border-transparent hover:bg-[var(--hover-color)] hover:border-[var(--border-color)]"
      }`}
      style={{ width: "calc(100% - 16px)" }}
      onClick={() => onClick(conversacion)}
    >
      <div className="relative shrink-0">
        <img src={avatar} alt={nombre}
          className={`w-11 h-11 rounded-full object-cover ring-2 transition-all duration-200 ${activa ? "ring-[var(--primary-color)]" : "ring-transparent group-hover:ring-[var(--border-color)]"}`} />
        <span className="absolute bottom-0 right-0 w-[11px] h-[11px] bg-[#22c55e] border-2 border-[var(--white-color)] rounded-full" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
        <span className={`text-[13.5px] font-semibold truncate ${activa ? "text-[var(--primary-color)]" : "text-[var(--text-dark)]"}`}>{nombre}</span>
        <span className={`text-[12px] truncate ${sinLeer > 0 ? "text-[var(--text-dark)] font-medium" : "text-[var(--text-muted)]"}`}>{ultimoMensaje}</span>
      </div>
      <div className="flex flex-col items-end gap-[5px] shrink-0">
        <span className="text-[11px] text-[var(--text-muted)]">{hora}</span>
        {sinLeer > 0 ? (
          <span className="min-w-[20px] h-5 px-1 bg-[var(--primary-color)] text-white text-[11px] font-bold rounded-full flex items-center justify-center leading-none">{sinLeer}</span>
        ) : (
          <span className="w-5 h-5" />
        )}
      </div>
    </button>
  );
}

function ComunidadItem({ comunidad, activa, onClick }) {
  const { nombre, avatar, ultimoMensaje, hora, miembros } = comunidad;
  return (
    <button
      className={`group flex items-center gap-3 w-full px-4 py-[10px] mx-2 border-none cursor-pointer text-left transition-all duration-200 rounded-[var(--radius-md)] ${
        activa
          ? "bg-[rgba(72,127,255,0.08)] border border-[rgba(72,127,255,0.18)]"
          : "bg-transparent border border-transparent hover:bg-[var(--hover-color)] hover:border-[var(--border-color)]"
      }`}
      style={{ width: "calc(100% - 16px)" }}
      onClick={() => onClick(comunidad)}
    >
      <div className="relative shrink-0">
        <img src={avatar} alt={nombre}
          className={`w-11 h-11 rounded-[var(--radius-sm)] object-cover ring-2 transition-all duration-200 ${activa ? "ring-[var(--primary-color)]" : "ring-transparent group-hover:ring-[var(--border-color)]"}`} />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
        <span className={`text-[13.5px] font-semibold truncate ${activa ? "text-[var(--primary-color)]" : "text-[var(--text-dark)]"}`}>{nombre}</span>
        <span className="text-[12px] text-[var(--text-muted)] truncate">{ultimoMensaje}</span>
      </div>
      <div className="flex flex-col items-end gap-[5px] shrink-0">
        <span className="text-[11px] text-[var(--text-muted)]">{hora}</span>
        <span className="text-[10px] text-[var(--text-muted)]">{miembros} miembros</span>
      </div>
    </button>
  );
}

function PanelVacio({ bloquearDemo }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-10 text-center bg-[var(--white-color)]">
      <div className="w-20 h-20 flex items-center justify-center">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-[var(--text-dark)] m-0">Tus Mensajes</h2>
      <p className="text-[14px] text-[var(--text-muted)] max-w-[320px] leading-[1.5] m-0">
        Conecta con otros profesionales de tu red. Haz preguntas, comparte conocimiento y colabora.
      </p>
      <button
        className="px-7 py-3 bg-[var(--primary-color)] text-white border-none rounded-[var(--radius-xl)] text-[14px] font-semibold cursor-pointer mt-2 transition-[background,transform] duration-200 hover:bg-[var(--secondary-color)] hover:-translate-y-px"
        {...bloquearDemo}
      >
        Iniciar Conversación
      </button>
    </div>
  );
}

function PanelChat({ conversacion, onVolver, onVerPerfil }) {
  const [mensaje,  setMensaje]  = useState("");
  const [mensajes, setMensajes] = useState(conversacion.mensajes);
  const chatRef = useRef(null);

  useEffect(() => { setMensajes(conversacion.mensajes); }, [conversacion]);
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [mensajes]);

  const enviarMensaje = () => {
    if (!mensaje.trim()) return;
    setMensajes([...mensajes, {
      id: `m-${Date.now()}`,
      texto: mensaje,
      hora: new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" }),
      esPropio: true,
    }]);
    setMensaje("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviarMensaje(); }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-6 py-[14px] border-b border-[var(--border-color)] bg-[var(--white-color)]">
        <div className="flex items-center gap-3">
          <button className="flex sm:hidden items-center bg-transparent border-none text-[var(--text-dark)] cursor-pointer p-1" onClick={onVolver}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <img src={conversacion.avatar} alt={conversacion.nombre} className="w-10 h-10 rounded-full object-cover" />
          <div className="flex flex-col gap-[2px]">
            <span className="text-[15px] font-semibold text-[var(--text-dark)]">{conversacion.nombre}</span>
            <span className="text-[12px] text-[var(--primary-color)]">{conversacion.ultimaActividad}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-[10px]" ref={chatRef}>
        <div className="flex flex-col items-center px-6 py-6 gap-2">
          <img src={conversacion.avatar} alt={conversacion.nombre} className="w-20 h-20 rounded-full object-cover" />
          <h3 className="text-[18px] font-bold text-[var(--text-dark)] m-0">{conversacion.nombre}</h3>
          <span className="text-[12px] text-[var(--text-muted)]">{conversacion.especialidad}</span>
          <button
            className="px-5 py-2 bg-[var(--primary-color)] text-white border-none rounded-[var(--radius-lg)] text-[13px] font-semibold cursor-pointer mt-1 transition-[background] duration-200 hover:bg-[var(--secondary-color)]"
            onClick={onVerPerfil}>
            Ver Perfil
          </button>
        </div>

        {mensajes.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 max-w-[65%] ${msg.esPropio ? "self-end flex-row-reverse" : "self-start"}`}>
            {!msg.esPropio && (
              <img src={conversacion.avatar} alt="" className="w-[30px] h-[30px] rounded-full object-cover shrink-0" />
            )}
            <div className={`py-[10px] px-4 rounded-[var(--radius-lg)] text-[14px] leading-[1.45] ${msg.esPropio ? "bg-[var(--primary-color)] text-white rounded-br-[4px]" : "bg-[var(--surface-color)] text-[var(--text-dark)] rounded-bl-[4px]"}`}>
              <p>{msg.texto}</p>
            </div>
          </div>
        ))}

        <span className="text-center text-[11px] text-[var(--text-muted)] my-1">{mensajes[mensajes.length - 1]?.hora}</span>

        <div className="flex items-end gap-2 max-w-[65%] self-start">
          <img src={conversacion.avatar} alt="" className="w-[30px] h-[30px] rounded-full object-cover shrink-0" />
          <div className="msj-burbuja-contenido msj-escribiendo py-3 px-4 rounded-[var(--radius-lg)] bg-[var(--surface-color)] text-[var(--text-dark)] rounded-bl-[4px] flex items-center gap-1">
            <span className="dot w-2 h-2 bg-[var(--primary-color)] rounded-full" />
            <span className="dot w-2 h-2 bg-[var(--primary-color)] rounded-full" />
            <span className="dot w-2 h-2 bg-[var(--primary-color)] rounded-full" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[10px] px-6 py-[14px]">
        <input
          type="text"
          placeholder="Escribe tu mensaje.."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 py-3 px-[18px] border border-[var(--border-color)] rounded-[var(--radius-xl)] text-[14px] bg-[var(--input-bg)] text-[var(--input-text)] outline-none transition-[border-color] duration-200 focus:border-[var(--primary-color)] placeholder:text-[var(--text-muted)]"
        />
        <button
          className="w-[42px] h-[42px] rounded-full border-none bg-[var(--primary-color)] text-white cursor-pointer flex items-center justify-center shrink-0 transition-[background] duration-200 hover:bg-[var(--secondary-color)] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={enviarMensaje}
          disabled={!mensaje.trim()}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Mensajes({ usuarioOrigen = null, origenDesdePerfilPublico = false, onVolverAlPerfil }) {
  const { modoExploracion, comenzarAutenticacion } = useSesion();
  const [tabActivo,      setTabActivo]      = useState("todos");
  const [busqueda,       setBusqueda]       = useState("");
  const [chatActivo,     setChatActivo]     = useState(null);
  const [perfilContacto, setPerfilContacto] = useState(null);
  const [vistaLista,     setVistaLista]     = useState("mensajes");
  const [menuAbierto,    setMenuAbierto]    = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuAbierto(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const bloquearDemo = modoExploracion
    ? { onClick: comenzarAutenticacion, title: "Inicia sesión para usar esta función", style: { cursor: "not-allowed", opacity: 0.6 } }
    : {};

  const conversacionesFiltradas = CONVERSACIONES_MOCK.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (perfilContacto) {
    return (
      <PerfilPublico
        usuario={perfilContacto}
        onVolver={() => setPerfilContacto(null)}
        onEnviarMensaje={() => { setChatActivo(perfilContacto); setPerfilContacto(null); }}
        textoAmistad="Amigos"
      />
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-[320px_1fr] [@media(min-width:900px)]:grid-cols-[380px_1fr] h-[calc(100vh-var(--header-height,120px)-46px)] sm:h-[calc(100vh-var(--header-height,96px)-54px)] bg-[var(--white-color)] rounded-[var(--radius-lg)] border border-[var(--border-color)] shadow-[var(--shadow-md)] overflow-hidden`}>

      <div className={`flex-col border-r border-[var(--border-color)] overflow-hidden ${chatActivo ? "hidden sm:flex" : "flex"}`}>

        <div className="flex items-center gap-2 px-5 py-4 min-h-[56px] font-semibold text-[16px] text-white" style={{ background: "var(--gradient-primary)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>{vistaLista === "comunidades" ? "Comunidades" : "Mensajes"}</span>
        </div>

        <div className="px-4 pt-[14px] pb-[10px]">
          <input
            type="text"
            placeholder={modoExploracion ? "Inicia sesión para buscar..." : "Buscar conversación .."}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            readOnly={modoExploracion}
            className="w-full py-[10px] px-4 border border-[var(--border-color)] rounded-[var(--radius-xl)] text-[13px] bg-[var(--input-bg)] text-[var(--input-text)] outline-none transition-[border-color] duration-200 focus:border-[var(--primary-color)] placeholder:text-[var(--text-muted)]"
            {...(modoExploracion ? { onClick: comenzarAutenticacion, style: { cursor: "not-allowed" } } : {})}
          />
        </div>

        {/* Banda "Volver al perfil" — solo cuando se llegó desde un PerfilPublico */}
        {origenDesdePerfilPublico && usuarioOrigen && (
          <button
            className="flex items-center gap-[7px] w-full px-3 py-2 bg-[var(--background-color)] border-b border-[var(--border-color)] text-[12px] cursor-pointer transition-opacity duration-150 hover:opacity-75"
            style={{ borderTop: "none", outline: "none" }}
            onClick={() => onVolverAlPerfil?.(usuarioOrigen)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="text-[var(--text-muted)]">Volver al perfil de</span>
            <span className="font-semibold" style={{ color: "var(--primary-color)" }}>{usuarioOrigen.nombre}</span>
          </button>
        )}

        <div className="flex items-center gap-1 px-4 pb-[10px]">
          {vistaLista === "mensajes" ? (
            TABS.map((tab) => (
              <button key={tab.id} className={tabClass(tabActivo === tab.id)} onClick={() => setTabActivo(tab.id)}>
                {tab.label}
              </button>
            ))
          ) : (
            <button className={tabClass(true)} onClick={() => { setVistaLista("mensajes"); setMenuAbierto(false); }}>
              ← Mensajes
            </button>
          )}

          <div className="relative ml-auto" ref={menuRef}>
            <button
              className={`px-3 py-[7px] border-none text-[13px] font-bold cursor-pointer rounded-[var(--radius-xl)] transition-all duration-200 leading-none ${
                vistaLista === "comunidades" || menuAbierto
                  ? "bg-[var(--primary-color)] text-white"
                  : "bg-transparent text-[var(--text-muted)] hover:text-[var(--primary-color)] hover:bg-[rgba(72,127,255,0.07)]"
              }`}
              onClick={() => setMenuAbierto((v) => !v)}
            >
              ···
            </button>
            {menuAbierto && (
              <div className="absolute right-0 top-[calc(100%+6px)] bg-[var(--white-color)] border border-[var(--border-color)] rounded-[var(--radius-md)] shadow-[var(--shadow-md)] z-[100] min-w-[180px] py-1 overflow-hidden">
                <button
                  className={`flex items-center gap-3 w-full px-4 py-[10px] border-none bg-transparent cursor-pointer text-[13.5px] font-medium text-left transition-[background] duration-150 hover:bg-[var(--hover-color)] ${vistaLista === "comunidades" ? "text-[var(--primary-color)] font-semibold" : "text-[var(--text-dark)]"}`}
                  onClick={() => { setVistaLista("comunidades"); setMenuAbierto(false); }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  Comunidades
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {vistaLista === "comunidades" ? (
            <>
              <div className="px-5 pt-3 pb-[6px] text-[11px] font-bold text-[var(--text-muted)] tracking-[0.5px]">TUS COMUNIDADES</div>
              <div className="flex flex-col gap-[3px] px-[2px]">
                {COMUNIDADES_MOCK.map((com) => (
                  <ComunidadItem key={com.id} comunidad={com} activa={chatActivo?.id === com.id} onClick={modoExploracion ? comenzarAutenticacion : setChatActivo} />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="px-5 pt-3 pb-[6px] text-[11px] font-bold text-[var(--text-muted)] tracking-[0.5px]">RECIENTES</div>
              <div className="flex flex-col gap-[3px] px-[2px]">
                {conversacionesFiltradas.map((conv) => (
                  <ConversacionItem key={conv.id} conversacion={conv} activa={chatActivo?.id === conv.id} onClick={modoExploracion ? comenzarAutenticacion : setChatActivo} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className={`flex-col overflow-hidden bg-[var(--background-color)] ${chatActivo ? "flex" : "hidden sm:flex"}`}>
        {chatActivo ? (
          <PanelChat conversacion={chatActivo} onVolver={() => setChatActivo(null)} onVerPerfil={() => setPerfilContacto(chatActivo)} />
        ) : (
          <PanelVacio bloquearDemo={bloquearDemo} />
        )}
      </div>
    </div>
  );
}

export default Mensajes;
