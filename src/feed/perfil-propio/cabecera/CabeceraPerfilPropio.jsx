import React from "react";
import FotoPerfilSelector from "./FotoPerfilSelector";
import FormEditarIdentidad from "./FormEditarIdentidad";

const TABS = [
  { id: "red-social",  label: "Red Social"  },
  { id: "resumen",     label: "Resumen"     },
  { id: "experiencia", label: "Experiencia" },
  { id: "documentos",  label: "Documentos"  },
  { id: "metricas",    label: "Métricas"    },
];

const tabClass = (activo) =>
  `shrink-0 px-4 py-3 border-none bg-transparent text-[13px] cursor-pointer border-b-2 whitespace-nowrap transition-all duration-200 ${
    activo
      ? "text-[var(--primary-color)] border-b-[var(--primary-color)] font-semibold"
      : "font-medium text-[var(--text-muted)] border-b-transparent hover:text-[var(--text-dark)]"
  }`;

export default function CabeceraPerfilPropio(props) {
  const {
    perfilSocial, publicacionesPropias, onVolver,
    tabActiva, setTabActiva,
    modoEdicionIdentidad, setModoEdicionIdentidad,
    identidadEnEdicion, actualizarCampo, onCancelarIdentidad, onGuardarIdentidad,
    menuFotoAbierto, setMenuFotoAbierto,
    lightboxFotoAbierto, setLightboxFotoAbierto,
    fileInputRef, menuFotoRef, onElegirFoto,
    onAbrirModalVerificacion,
  } = props;

  const nombreCompleto   = perfilSocial.nombreVisible || null;
  const cargo            = perfilSocial.tituloProfesional || perfilSocial.cargo || perfilSocial.bioPública || null;
  const ubicacion        = [perfilSocial.ciudad, perfilSocial.pais].filter(Boolean).join(", ");
  const formacion        = (perfilSocial.titulos ?? []).find((t) => t.esFormacion);
  const trabajos         = perfilSocial.trabajos ?? [];
  const numPublicaciones = publicacionesPropias.length;

  const IcoShield = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );

  return (
    <div className="bg-[var(--white-color)] rounded-[var(--radius-md)] border border-[var(--border-color)] shadow-[var(--shadow-sm)] overflow-hidden">

      {/* Volver */}
      <button
        className="flex items-center gap-1 bg-transparent border-none text-[var(--text-muted)] cursor-pointer text-[13px] px-4 pt-3 pb-1 hover:text-[var(--text-dark)] transition-colors"
        onClick={onVolver}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      <div className="px-4 pb-4 pt-0 flex flex-col gap-[10px]">

        {/* ══════════════════════════════════════════════════════
            FILA 1: Avatar  +  Bloque info  (Name / Stats)
            DESKTOP: Name──🛡──[Editar perfil]  /  Stats──[✉in🌐]
            MOBILE:  Name──🛡  /  Stats  (botones van abajo)
        ══════════════════════════════════════════════════════ */}
        <div className="flex items-start gap-3">

          {/* Avatar */}
          <FotoPerfilSelector
            perfilSocial={perfilSocial}
            menuFotoAbierto={menuFotoAbierto}
            setMenuFotoAbierto={setMenuFotoAbierto}
            lightboxFotoAbierto={lightboxFotoAbierto}
            setLightboxFotoAbierto={setLightboxFotoAbierto}
            fileInputRef={fileInputRef}
            menuFotoRef={menuFotoRef}
            onElegirFoto={onElegirFoto}
          />

          {/* Bloque info — flex-1 */}
          <div className="flex-1 min-w-0 flex flex-col gap-[4px]">
            {modoEdicionIdentidad ? (
              <FormEditarIdentidad
                identidadEnEdicion={identidadEnEdicion}
                actualizarCampo={actualizarCampo}
                onCancelar={onCancelarIdentidad}
                onGuardar={onGuardarIdentidad}
              />
            ) : (
              <>
                {/* Nombre + 🛡 */}
                <div className="flex items-center gap-2 min-w-0">
                  <h2 className="text-[17px] font-bold text-[var(--text-dark)] m-0 leading-tight truncate">
                    {nombreCompleto || "+ Agregar tu nombre"}
                  </h2>
                  {/* 🛡 — MOBILE: solo ícono | DESKTOP: ícono + "Verificar cuenta" */}
                  <button
                    onClick={onAbrirModalVerificacion}
                    className="flex items-center gap-1 bg-transparent border-none cursor-pointer text-[var(--text-muted)] hover:text-[var(--primary-color)] transition-colors p-0 shrink-0"
                  >
                    <IcoShield />
                    <span className="text-[11px] font-medium [@media(max-width:859px)]:hidden">
                      Verificar cuenta
                    </span>
                  </button>
                </div>
                {/* Stats */}
                <p className="text-[12px] text-[var(--text-muted)] m-0">
                  <strong className="text-[var(--text-dark)] font-semibold">{numPublicaciones}</strong>{" "}Publicaciones
                  {" · "}
                  <strong className="text-[var(--text-dark)] font-semibold">0</strong>{" "}Seguidores
                  {" · "}
                  <strong className="text-[var(--text-dark)] font-semibold">0</strong>{" "}Seguidos
                </p>
              </>
            )}
          </div>

          {/* Columna derecha — solo DESKTOP: [Editar perfil] + [✉in🌐] */}
          {!modoEdicionIdentidad && (
            <div className="[@media(max-width:859px)]:hidden flex flex-col items-end gap-3 shrink-0">
              <button
                onClick={() => setModoEdicionIdentidad(true)}
                className="flex items-center gap-[6px] px-4 py-[9px] text-white text-[13px] font-bold border-none rounded-[var(--radius-sm)] cursor-pointer whitespace-nowrap"
                style={{ background: "var(--gradient-primary)" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Editar perfil
              </button>
              <div className="flex items-center gap-2">
                <button title="Correo" className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-transparent flex items-center justify-center cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] text-[var(--text-muted)] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2 4 12 13 22 4"/>
                  </svg>
                </button>
                <button title="LinkedIn" className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-transparent flex items-center justify-center cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] text-[var(--text-muted)] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </button>
                <button title="Sitio web" className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-transparent flex items-center justify-center cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] text-[var(--text-muted)] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {!modoEdicionIdentidad && (
          <>
            {/* ─── Cargo / Bio ─── */}
            {cargo && (
              <p className="text-[13px] text-[var(--text-dark)] m-0 leading-[1.5]">{cargo}</p>
            )}

            {/* ─── Data items inline con íconos ─── */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="flex items-center gap-1 text-[12px] text-[var(--text-muted)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--warning-text)" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                — · 0 reseñas
              </span>
              {ubicacion && (
                <span className="flex items-center gap-1 text-[12px] text-[var(--text-muted)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="10" r="3"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  </svg>
                  {ubicacion}
                </span>
              )}
              {formacion && (
                <span className="flex items-center gap-1 text-[12px] text-[var(--text-muted)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"/>
                  </svg>
                  {formacion.institucion}
                </span>
              )}
              <span className="flex items-center gap-1 text-[12px] text-[var(--text-muted)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                </svg>
                {trabajos.length > 0
                  ? `${trabajos[0].cargo ?? ""}${trabajos[0].empresa ? " · " + trabajos[0].empresa : ""}`.trim()
                  : "+ Experiencia"}
              </span>
            </div>

            {/* ─── Seguidores preview ─── */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{ marginLeft: i > 0 ? "-7px" : "0" }}
                    className="w-[26px] h-[26px] rounded-full bg-[var(--border-color)] border-2 border-[var(--white-color)] flex items-center justify-center text-[var(--text-muted)]"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    </svg>
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-[var(--text-muted)] m-0">
                Aún no tienes seguidores ·{" "}
                <button className="text-[var(--primary-color)] bg-transparent border-none p-0 cursor-pointer text-[12px] font-semibold">
                  Conectar con personas
                </button>
              </p>
            </div>

            {/* ─── [✏ Editar perfil] solo MOBILE — full width ─── */}
            <button
              onClick={() => setModoEdicionIdentidad(true)}
              className="flex [@media(min-width:860px)]:hidden items-center justify-center gap-[6px] w-full py-[9px] text-white text-[13px] font-bold border-none rounded-[var(--radius-sm)] cursor-pointer"
              style={{ background: "var(--gradient-primary)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Editar perfil
            </button>
          </>
        )}
      </div>

      {/* ─── Tabs ─── */}
      <div className="flex overflow-x-auto border-t border-[var(--border-color)] px-5 scrollbar-none">
        {TABS.map(({ id, label }) => (
          <button key={id} className={tabClass(tabActiva === id)} onClick={() => setTabActiva(id)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
