/* ═══════════════════════════════════════════════════════════
   ModalOnboardingSocial — primer acceso a la red social.
   Obligatorio: no se puede cerrar sin completar.
   El usuario elige su @username y nombre público.
═══════════════════════════════════════════════════════════ */
import React, { useState, useEffect, useRef } from "react";
import { usePerfilSocial } from "@/capacidades/perfiles/perfil-propio/ganchos/usarContextoPerfilSocial";

/* Regex: solo letras minúsculas, números y guiones bajos, 3-20 chars */
const RE_USERNAME = /^[a-z0-9_]{3,20}$/;

function validarFormatoUsername(u) {
  if (!u) return "El username no puede estar vacío.";
  if (u.length < 3) return "Mínimo 3 caracteres.";
  if (u.length > 20) return "Máximo 20 caracteres.";
  if (!/^[a-z0-9_]+$/.test(u)) return "Solo letras minúsculas, números y guiones bajos.";
  return null; // OK
}

const inputCls =
  "input-codeplex w-full py-[10px] px-[14px] bg-[var(--background-color)] border-[1.5px] border-[var(--border-color)] rounded-[var(--radius-sm)] text-[var(--text-dark)] font-[inherit] text-[13.5px] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--primary-color)] focus:bg-[var(--white-color)]";

export function ModalOnboardingSocial() {
  const { completarOnboarding, verificarUsername } = usePerfilSocial();

  const [nombrePublico,       setNombrePublico]       = useState("");
  const [username,            setUsername]            = useState("");
  const [errorNombre,         setErrorNombre]         = useState("");
  const [errorUsername,       setErrorUsername]       = useState("");
  const [estadoUsername,      setEstadoUsername]      = useState("idle"); // idle | verificando | disponible | ocupado
  const [enviando,            setEnviando]            = useState(false);
  const [errorGlobal,         setErrorGlobal]         = useState("");

  const debounceRef = useRef(null);

  /* ── Verificar disponibilidad con debounce ── */
  useEffect(() => {
    const valorNorm = username.trim().toLowerCase();

    const errorFormato = validarFormatoUsername(valorNorm);
    if (errorFormato) {
      setEstadoUsername("idle");
      setErrorUsername(valorNorm.length > 0 ? errorFormato : "");
      return;
    }

    setEstadoUsername("verificando");
    setErrorUsername("");

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const { disponible } = await verificarUsername(valorNorm);
      if (disponible) {
        setEstadoUsername("disponible");
        setErrorUsername("");
      } else {
        setEstadoUsername("ocupado");
        setErrorUsername("Este username ya está en uso.");
      }
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [username, verificarUsername]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGlobal("");

    /* Validar nombre */
    if (!nombrePublico.trim()) {
      setErrorNombre("Ingresa tu nombre público.");
      return;
    }
    if (nombrePublico.trim().length < 2) {
      setErrorNombre("Mínimo 2 caracteres.");
      return;
    }
    setErrorNombre("");

    /* Validar username */
    const valorNorm = username.trim().toLowerCase();
    const errorFormato = validarFormatoUsername(valorNorm);
    if (errorFormato) { setErrorUsername(errorFormato); return; }
    if (estadoUsername === "verificando") return; // esperar
    if (estadoUsername === "ocupado") { setErrorUsername("Elige otro username."); return; }

    setEnviando(true);
    const { error } = await completarOnboarding(valorNorm, nombrePublico.trim());
    setEnviando(false);

    if (error) {
      setErrorGlobal("No se pudo crear tu perfil. Intenta de nuevo.");
    }
  };

  /* Estado visual del username */
  const badgeUsername = () => {
    if (estadoUsername === "verificando") return (
      <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
        <span className="inline-block w-3 h-3 border-[1.5px] border-[var(--border-color)] border-t-[var(--primary-color)] rounded-full animate-spin" />
        Verificando...
      </span>
    );
    if (estadoUsername === "disponible") return (
      <span className="flex items-center gap-1 text-[11px] text-[var(--success-text)] font-semibold">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Disponible
      </span>
    );
    if (estadoUsername === "ocupado") return (
      <span className="flex items-center gap-1 text-[11px] text-[var(--error-color)]">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
        No disponible
      </span>
    );
    return null;
  };

  return (
    /* Overlay — no tiene botón de cierre, es obligatorio */
    <div className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/60 backdrop-blur-[2px] p-4">
      <div className="bg-[var(--white-color)] rounded-[var(--radius-lg)] shadow-[0_24px_60px_rgba(0,0,0,0.18)] w-full max-w-[420px] overflow-hidden">

        {/* Header */}
        <div className="px-7 pt-7 pb-5 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "var(--gradient-primary)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-[var(--text-dark)] m-0 leading-tight">
                Crea tu identidad social
              </h2>
              <p className="text-[12px] text-[var(--text-muted)] m-0 mt-[2px]">
                Así te verán el resto de la comunidad
              </p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-5">

          {/* Nombre público */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-[12px] font-semibold text-[var(--text-dark)]">
              Nombre público
            </label>
            <input
              type="text"
              className={inputCls}
              placeholder="Ej: María García"
              value={nombrePublico}
              onChange={e => { setNombrePublico(e.target.value); setErrorNombre(""); }}
              maxLength={60}
              autoFocus
            />
            {errorNombre && (
              <p className="text-[11px] text-[var(--error-color)] m-0">{errorNombre}</p>
            )}
            <p className="text-[11px] text-[var(--text-muted)] m-0">
              Es tu nombre visible en publicaciones y comentarios.
            </p>
          </div>

          {/* Username */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-[12px] font-semibold text-[var(--text-dark)]">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[13.5px] select-none">
                @
              </span>
              <input
                type="text"
                className={`${inputCls} pl-[28px]`}
                placeholder="tu_username"
                value={username}
                onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                maxLength={20}
              />
            </div>
            <div className="flex items-center justify-between">
              {errorUsername
                ? <p className="text-[11px] text-[var(--error-color)] m-0">{errorUsername}</p>
                : <p className="text-[11px] text-[var(--text-muted)] m-0">3-20 caracteres · solo letras, números y _</p>
              }
              {badgeUsername()}
            </div>
          </div>

          {/* Error global */}
          {errorGlobal && (
            <div className="flex items-center gap-2 px-3 py-[9px] rounded-[var(--radius-sm)] bg-[var(--error-bg)] border border-[var(--error-color)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--error-color)" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-[12px] text-[var(--error-color)] m-0">{errorGlobal}</p>
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={enviando || estadoUsername === "verificando" || estadoUsername === "ocupado"}
            className="flex items-center justify-center gap-2 w-full py-[11px] rounded-[var(--radius-xl)] text-[13.5px] font-semibold text-white border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-opacity mt-1"
            style={{ background: "var(--gradient-primary)" }}
          >
            {enviando ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creando perfil...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Entrar a la red social
              </>
            )}
          </button>

          <p className="text-[11px] text-[var(--text-muted)] text-center m-0">
            Tu username no afecta ni comparte datos con tu cuenta empresarial.
          </p>
        </form>
      </div>
    </div>
  );
}
