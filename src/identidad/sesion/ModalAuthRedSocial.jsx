/* ═══════════════════════════════════════════════════════════
   ModalAuthRedSocial — modal de autenticación de la red social
   Flujo registro: datos → verificación identidad (DNI + selfie)
═══════════════════════════════════════════════════════════ */
import React, { useState, useRef } from "react";
import { supabase } from "../../lib/supabase";
import { useSesion } from "./SesionContext";

const inputCls = "w-full py-[10px] px-[14px] bg-[var(--background-color)] border-[1.5px] border-[var(--border-color)] rounded-[var(--radius-sm)] text-[var(--text-dark)] font-[inherit] text-[13.5px] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--primary-color)] focus:bg-[var(--white-color)] focus:shadow-[0_0_0_3px_rgba(72,127,255,0.12)]";

function EyeIcon({ open }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

/* ── Componente de subida de foto ── */
function UploadFoto({ label, sublabel, icono, preview, onChange }) {
  const inputRef = useRef();
  return (
    <div
      onClick={() => inputRef.current?.click()}
      className={`relative flex flex-col items-center justify-center gap-2 p-5 rounded-[var(--radius-md)] border-2 border-dashed cursor-pointer transition-all duration-200 ${
        preview
          ? "border-[var(--primary-color)] bg-[rgba(72,127,255,0.04)]"
          : "border-[var(--border-color)] hover:border-[var(--primary-color)] hover:bg-[var(--background-color)]"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture={icono === "selfie" ? "user" : undefined}
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) onChange(file);
        }}
      />

      {preview ? (
        <>
          <img src={preview} alt={label} className="w-full h-[110px] object-cover rounded-[var(--radius-sm)]" />
          <div className="flex items-center gap-1 text-[var(--primary-color)]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span className="text-[11px] font-semibold">Cargado</span>
          </div>
        </>
      ) : (
        <>
          <div className="w-10 h-10 rounded-full bg-[var(--background-color)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)]">
            {icono === "selfie" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <path d="M7 5V3h10v2"/>
              </svg>
            )}
          </div>
          <div className="text-center">
            <p className="text-[12px] font-semibold text-[var(--text-dark)] m-0">{label}</p>
            <p className="text-[11px] text-[var(--text-muted)] m-0 mt-[2px]">{sublabel}</p>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Indicador de pasos ── */
function PasoIndicador({ paso, total }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-5">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
            i + 1 < paso
              ? "bg-[var(--primary-color)] text-white"
              : i + 1 === paso
              ? "bg-[var(--primary-color)] text-white shadow-[0_0_0_3px_rgba(72,127,255,0.2)]"
              : "bg-[var(--background-color)] text-[var(--text-muted)] border border-[var(--border-color)]"
          }`}>
            {i + 1 < paso ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`w-8 h-[2px] rounded-full transition-all duration-300 ${i + 1 < paso ? "bg-[var(--primary-color)]" : "bg-[var(--border-color)]"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Tab: Verificación de identidad ── */
function TabVerificacion({ onConfirmar, onSaltar }) {
  const { userSocial } = useSesion();
  const [paso,     setPaso]     = useState(1); // 1=DNI anverso, 2=DNI reverso, 3=enviado
  const [dniFront, setDniFront] = useState(null);
  const [dniBack,  setDniBack]  = useState(null);
  const [previews, setPreviews] = useState({ front: null, back: null });
  const [loading,  setLoading]  = useState(false);

  const handleFile = (file, tipo) => {
    const url = URL.createObjectURL(file);
    if (tipo === "front") { setDniFront(file); setPreviews(p => ({ ...p, front: url })); }
    if (tipo === "back")  { setDniBack(file);  setPreviews(p => ({ ...p, back: url  })); }
  };

  const handleEnviar = async () => {
    setLoading(true);
    /* Simula el envío — cuando el backend real procese el DNI, él cambiará estos campos */
    await new Promise(r => setTimeout(r, 1200));
    /* TODO(backend): quitar este bloque cuando el backend valide y apruebe el DNI real */
    if (userSocial?.id) {
      await supabase.from("perfiles").update({
        verificado:          true,
        estado_verificacion: "verificado",
      }).eq("id", userSocial.id);
    }
    setPaso(3);
    setLoading(false);
  };

  /* Paso 3: enviado correctamente */
  if (paso === 3) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "var(--gradient-primary)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div>
          <h3 className="text-[16px] font-bold text-[var(--text-dark)] m-0 mb-1">¡Identidad verificada!</h3>
          <p className="text-[13px] text-[var(--text-muted)] m-0 leading-[1.5]">
            Tu cuenta está <strong className="text-[var(--primary-color)]">verificada</strong>.<br/>
            Ya puedes publicar, comentar y conectar con la comunidad.
          </p>
        </div>
        <div className="w-full p-3 rounded-[var(--radius-sm)] bg-[rgba(72,127,255,0.06)] border border-[rgba(72,127,255,0.15)]">
          <p className="text-[12px] text-[var(--text-dark)] m-0">
            Acceso <strong>completo</strong> a todas las funciones de la red social.
          </p>
        </div>
        <button onClick={onConfirmar}
          className="w-full py-3 border-none rounded-[var(--radius-sm)] text-white text-[14px] font-bold cursor-pointer font-[inherit]"
          style={{ background: "var(--gradient-primary)" }}>
          Entrar a la red social
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <PasoIndicador paso={paso} total={2} />

      {/* Paso 1 — DNI anverso */}
      {paso === 1 && (
        <>
          <div className="text-center mb-1">
            <h3 className="text-[14px] font-bold text-[var(--text-dark)] m-0 mb-1">Foto del DNI — Anverso</h3>
            <p className="text-[12px] text-[var(--text-muted)] m-0">Sube una foto clara de la parte <strong>frontal</strong> de tu DNI</p>
          </div>
          <UploadFoto
            label="Parte frontal del DNI"
            sublabel="JPG, PNG · máx. 5MB"
            icono="dni"
            preview={previews.front}
            onChange={f => handleFile(f, "front")}
          />
          <div className="flex items-start gap-2 p-3 bg-[var(--background-color)] rounded-[var(--radius-sm)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" className="mt-[1px] shrink-0">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-[11px] text-[var(--text-muted)] m-0 leading-[1.5]">
              Asegúrate que el documento esté bien iluminado, sin reflejos y todos los datos sean legibles.
            </p>
          </div>
          <button onClick={() => setPaso(2)} disabled={!dniFront}
            className="w-full py-3 border-none rounded-[var(--radius-sm)] text-white text-[14px] font-bold cursor-pointer font-[inherit] disabled:opacity-40"
            style={{ background: "var(--gradient-primary)" }}>
            Continuar →
          </button>
        </>
      )}

      {/* Paso 2 — DNI reverso */}
      {paso === 2 && (
        <>
          <div className="text-center mb-1">
            <h3 className="text-[14px] font-bold text-[var(--text-dark)] m-0 mb-1">Foto del DNI — Reverso</h3>
            <p className="text-[12px] text-[var(--text-muted)] m-0">Sube una foto clara de la parte <strong>trasera</strong> de tu DNI</p>
          </div>
          <UploadFoto
            label="Parte trasera del DNI"
            sublabel="JPG, PNG · máx. 5MB"
            icono="dni"
            preview={previews.back}
            onChange={f => handleFile(f, "back")}
          />
          <div className="flex gap-3">
            <button onClick={() => setPaso(1)}
              className="flex-1 py-3 border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[var(--text-dark)] text-[14px] font-bold cursor-pointer bg-transparent font-[inherit] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors">
              ← Atrás
            </button>
            <button onClick={handleEnviar} disabled={!dniBack || loading}
              className="flex-[2] py-3 border-none rounded-[var(--radius-sm)] text-white text-[14px] font-bold cursor-pointer font-[inherit] disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ background: "var(--gradient-primary)" }}>
              {loading
                ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : "Enviar verificación ✓"
              }
            </button>
          </div>
        </>
      )}

      {/* Saltar verificación */}
      <button onClick={onSaltar}
        className="text-[11px] text-[var(--text-muted)] bg-transparent border-none cursor-pointer p-0 hover:text-[var(--primary-color)] transition-colors font-[inherit] text-center">
        Verificar después (acceso limitado)
      </button>
    </div>
  );
}

/* ── Tab: Iniciar sesión ── */
function TabLogin({ onConfirmar }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || loading) return;
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Correo o contraseña incorrectos");
      setLoading(false);
      return;
    }
    setSuccess(true);
    setTimeout(onConfirmar, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <button type="button"
        className="flex items-center justify-center gap-[9px] w-full py-[10px] px-4 border-[1.5px] border-[var(--border-color)] rounded-[var(--radius-sm)] bg-[var(--white-color)] text-[var(--text-dark)] text-[13px] font-semibold cursor-pointer transition-all hover:border-[var(--primary-color)] hover:bg-[var(--background-color)] hover:-translate-y-px font-[inherit]"
        onClick={onConfirmar}>
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continuar con Google
      </button>

      <div className="flex items-center gap-2 text-[var(--text-muted)]">
        <div className="flex-1 h-px bg-[var(--border-color)]"/>
        <span className="text-[11px] font-bold tracking-[0.5px] uppercase">o con correo</span>
        <div className="flex-1 h-px bg-[var(--border-color)]"/>
      </div>

      <div>
        <label className="block text-[12px] font-bold text-[var(--text-dark)] mb-[6px]">Correo electrónico</label>
        <input type="email" className={inputCls} placeholder="tu@correo.com"
          value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div>
        <label className="block text-[12px] font-bold text-[var(--text-dark)] mb-[6px]">Contraseña</label>
        <div className="relative">
          <input type={showPwd ? "text" : "password"} className={`${inputCls} pr-10`}
            placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="button" tabIndex={-1} onClick={() => setShowPwd(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-dark)] bg-transparent border-none cursor-pointer p-0 flex items-center">
            <EyeIcon open={showPwd} />
          </button>
        </div>
      </div>

      {error && <p className="text-[12px] text-[var(--error-color)] text-center m-0 -mt-2">{error}</p>}

      <button type="submit" disabled={loading || success}
        className="w-full py-3 border-none rounded-[var(--radius-sm)] text-white text-[14px] font-bold cursor-pointer transition-all disabled:opacity-70 font-[inherit]"
        style={{ background: success ? "var(--success-color, #22c55e)" : "var(--gradient-primary)" }}>
        {loading ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          : success ? "✓  Acceso concedido" : "Iniciar sesión"}
      </button>
    </form>
  );
}

/* ── Datos para selects de fecha ── */
const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const ANIOS = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 18 - i);
const DIAS  = Array.from({ length: 31 }, (_, i) => i + 1);

const selectCls =
  "w-full min-w-0 min-h-[42px] box-border py-[10px] pl-[12px] pr-[30px] bg-[var(--background-color)] border-[1.5px] border-[var(--border-color)] rounded-[var(--radius-sm)] text-[var(--text-dark)] font-[inherit] text-[13px] outline-none transition-[border-color] duration-200 cursor-pointer focus:border-[var(--primary-color)] appearance-none bg-no-repeat bg-[right_10px_center] bg-[length:12px]";

/* ── Tab: Registrarse ── */
function TabRegistro({ onConfirmar }) {
  const [nombre,   setNombre]   = useState("");
  const [apellido, setApellido] = useState("");
  const [dia,      setDia]      = useState("");
  const [mes,      setMes]      = useState("");
  const [anio,     setAnio]     = useState("");
  const [genero,   setGenero]   = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !password.trim() || loading) return;
    setLoading(true);
    setError("");

    const nombreVisible = [nombre.trim(), apellido.trim()].filter(Boolean).join(" ");

    const { data, error: errSignUp } = await supabase.auth.signUp({
      email, password,
      options: { data: { nombre_visible: nombreVisible } },
    });
    if (errSignUp) {
      setError(errSignUp.message === "User already registered"
        ? "Ya existe una cuenta con ese correo."
        : errSignUp.message);
      setLoading(false);
      return;
    }
    if (data.user) {
      await supabase.from("perfiles").upsert({
        id:             data.user.id,
        nombre_visible: nombreVisible,
      });
    }
    setSuccess(true);
    setTimeout(onConfirmar, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">

      {/* Encabezado estilo Facebook */}
      <div className="mb-1">
        <h2 className="text-[18px] font-bold text-[var(--text-dark)] m-0 leading-tight">
          Empieza a usar Codeplex Red Social
        </h2>
        <p className="text-[12.5px] text-[var(--text-muted)] m-0 mt-1">
          Es rápido y fácil. Tu perfil social es independiente de tu cuenta empresarial.
        </p>
      </div>

      {/* Nombre + Apellido */}
      <div className="flex gap-3">
        <div className="flex-1">
          <input type="text" className={inputCls} placeholder="Nombre"
            value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>
        <div className="flex-1">
          <input type="text" className={inputCls} placeholder="Apellido"
            value={apellido} onChange={e => setApellido(e.target.value)} />
        </div>
      </div>

      {/* Fecha de nacimiento: grid a ancho completo; una columna solo en pantallas muy estrechas */}
      <div className="w-full min-w-0">
        <label className="block text-[12px] font-bold text-[var(--text-dark)] mb-[6px]">
          Fecha de nacimiento
        </label>
        <div className="grid w-full min-w-0 gap-2 [grid-template-columns:minmax(0,1fr)_minmax(0,2fr)_minmax(0,1.1fr)] max-[340px]:grid-cols-1">
          <select className={selectCls} value={dia} onChange={e => setDia(e.target.value)}
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")" }}>
            <option value="">Día</option>
            {DIAS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className={selectCls} value={mes} onChange={e => setMes(e.target.value)}
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")" }}>
            <option value="">Mes</option>
            {MESES.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
          </select>
          <select className={selectCls} value={anio} onChange={e => setAnio(e.target.value)}
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")" }}>
            <option value="">Año</option>
            {ANIOS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      {/* Género */}
      <div>
        <label className="block text-[12px] font-bold text-[var(--text-dark)] mb-[6px]">Género</label>
        <div className="relative">
          <select className={selectCls} value={genero} onChange={e => setGenero(e.target.value)}
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")" }}>
            <option value="">Selecciona tu género</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Prefiero no decirlo</option>
          </select>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-[12px] font-bold text-[var(--text-dark)] mb-[6px]">
          Número de móvil o correo electrónico
        </label>
        <input type="email" className={inputCls} placeholder="tu@correo.com"
          value={email} onChange={e => setEmail(e.target.value)} required />
        <p className="text-[10.5px] text-[var(--text-muted)] m-0 mt-[5px]">
          Es posible que recibas notificaciones nuestras.{" "}
          <span className="text-[var(--primary-color)] cursor-pointer">¿Por qué pedimos esto?</span>
        </p>
      </div>

      {/* Contraseña */}
      <div>
        <label className="block text-[12px] font-bold text-[var(--text-dark)] mb-[6px]">Contraseña</label>
        <div className="relative">
          <input type={showPwd ? "text" : "password"} className={`${inputCls} pr-10`}
            placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="button" tabIndex={-1} onClick={() => setShowPwd(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-dark)] bg-transparent border-none cursor-pointer p-0 flex items-center">
            <EyeIcon open={showPwd} />
          </button>
        </div>
      </div>

      {/* Términos */}
      <p className="text-[10.5px] text-[var(--text-muted)] m-0 leading-[1.5]">
        Al hacer clic en <strong>Enviar</strong>, aceptas los{" "}
        <span className="text-[var(--primary-color)] cursor-pointer font-semibold">Términos de uso</span>,{" "}
        la <span className="text-[var(--primary-color)] cursor-pointer font-semibold">Política de privacidad</span> y la{" "}
        <span className="text-[var(--primary-color)] cursor-pointer font-semibold">Política de cookies</span>.
      </p>

      {error && (
        <div className="flex items-center gap-2 px-3 py-[9px] rounded-[var(--radius-sm)] bg-[#fef2f2] border border-[#fecaca]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p className="text-[12px] text-[#ef4444] m-0">{error}</p>
        </div>
      )}

      <button type="submit" disabled={loading || success}
        className="w-full py-3 border-none rounded-[var(--radius-sm)] text-white text-[14px] font-bold cursor-pointer transition-all disabled:opacity-70 font-[inherit]"
        style={{ background: success ? "var(--success-color, #22c55e)" : "var(--gradient-primary)" }}>
        {loading
          ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          : success ? "✓  Cuenta creada" : "Enviar"
        }
      </button>
    </form>
  );
}

/* ══════════════════════════════════════════
   Modal principal
══════════════════════════════════════════ */
export function ModalAuthRedSocial({ onConfirmar, onCerrar, modoVerificacion = false, initialTab }) {
  const [tab, setTab] = useState(initialTab ?? (modoVerificacion ? "verificacion" : "login"));

  const tabBtn = (id, label) => (
    <button onClick={() => setTab(id)}
      className={`flex-1 py-[10px] text-[13px] font-bold border-b-2 transition-all duration-200 bg-transparent border-x-0 border-t-0 cursor-pointer font-[inherit] ${
        tab === id
          ? "text-[var(--primary-color)] border-b-[var(--primary-color)]"
          : "text-[var(--text-muted)] border-b-transparent hover:text-[var(--text-dark)]"
      }`}>
      {label}
    </button>
  );

  const esVerificacion = tab === "verificacion";

  return (
    <div
      className="fixed inset-0 z-[600] overflow-y-auto overscroll-y-contain flex items-start justify-center sm:items-center p-3 sm:p-4 py-6 sm:py-8"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={e => { if (e.target === e.currentTarget) onCerrar(); }}>

      <div
        className="bg-[var(--white-color)] rounded-[var(--radius-md)] shadow-[0_24px_64px_rgba(0,0,0,0.22)] w-full max-w-[420px] min-h-0 max-h-[calc(100dvh-3rem)] sm:max-h-[min(90vh,calc(100dvh-2rem))] flex flex-col overflow-hidden shrink-0"
        style={{ animation: "modalSlideIn 0.18s ease" }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-6 pt-5 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[#0f1e3c] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9"/>
                <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.55"/>
                <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.55"/>
                <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#93c5fd" fillOpacity="0.9"/>
              </svg>
            </div>
            <div>
              <span className="text-[15px] font-medium text-[var(--text-dark)] tracking-[-0.3px]">
                Code<strong className="font-extrabold text-[var(--primary-color)]">plex</strong> Red Social
              </span>
              {esVerificacion && (
                <p className="text-[11px] text-[var(--text-muted)] m-0 leading-none mt-[2px]">
                  Verificación de identidad
                </p>
              )}
            </div>
          </div>
          <button onClick={onCerrar}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--text-muted)] hover:bg-[var(--background-color)] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Tabs — se ocultan durante verificación */}
        {!esVerificacion && (
          <div className="shrink-0 flex border-b border-[var(--border-color)] px-6">
            {tabBtn("login",    "Iniciar sesión")}
            {tabBtn("registro", "Registrarse"   )}
          </div>
        )}

        {/* Cuerpo con scroll (móvil / teclado / formulario largo) */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-y-contain touch-pan-y">
          <div className="px-6 py-5">
            {tab === "login"        && <TabLogin       onConfirmar={onConfirmar} />}
            {tab === "registro"     && <TabRegistro    onConfirmar={onConfirmar} />}
            {tab === "verificacion" && <TabVerificacion onConfirmar={onConfirmar} onSaltar={onConfirmar} />}
          </div>

          {/* Footer — solo en login/registro; dentro del scroll para llegar a “Enviar” y al demo */}
          {!esVerificacion && (
            <div className="px-6 pb-5 pt-0 text-center">
              <p className="text-[12px] text-[var(--text-muted)] m-0">
                ¿Solo quieres explorar?{" "}
                <button onClick={onCerrar}
                  className="text-[var(--primary-color)] font-semibold bg-transparent border-none cursor-pointer p-0 text-[12px] font-[inherit]">
                  Continuar en modo demo
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
