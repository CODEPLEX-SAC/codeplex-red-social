import React, { useState } from "react";
import { useSesion } from "../sesion/SesionContext";
import {
  PAISES, CIUDADES_POR_PAIS, CIUDADES_DEFAULT,
  CARGOS, GENEROS, TABS_FORM, NOTIFICACIONES_ITEMS,
} from "./datosPersonalesData";

/* ── Clases compartidas ── */
const inputClass = "input-codeplex w-full px-4 py-[10px] border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[14px] bg-[var(--input-bg)] text-[var(--input-text)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] font-[inherit] disabled:opacity-50 disabled:cursor-not-allowed";
const selectClass = `${inputClass} cursor-pointer appearance-none`;

/* ── Subcomponentes ── */
function Field({ label, col2, children }) {
  return (
    <div className={col2 ? "col-span-2 [@media(max-width:560px)]:col-span-1" : ""}>
      <label className="block text-[13px] font-semibold text-[var(--text-dark)] mb-[6px]">{label}</label>
      {children}
    </div>
  );
}

function SelectField({ value, onChange, children, placeholder, disabled }) {
  return (
    <div className="relative">
      <select className={selectClass} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]"
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </div>
  );
}

function FechaNacimiento({ dia, mes, año, onChange, disabled }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <SelectField value={dia} onChange={(v) => onChange("dia", v)} placeholder="Día" disabled={disabled}>
        {DIAS.map((d) => <option key={d} value={d}>{d}</option>)}
      </SelectField>
      <SelectField value={mes} onChange={(v) => onChange("mes", v)} placeholder="Mes" disabled={disabled}>
        {MESES.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
      </SelectField>
      <SelectField value={año} onChange={(v) => onChange("año", v)} placeholder="Año" disabled={disabled}>
        {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
      </SelectField>
    </div>
  );
}

/* ── Panel izquierdo: info resumida ── */
function InfoItem({ label, value }) {
  if (!value) return null;
  return (
    <div className="grid py-[6px]" style={{ gridTemplateColumns: "88px 1fr", gap: "0 10px" }}>
      <span className="text-[14px] font-semibold text-[var(--text-dark)] leading-snug">{label}</span>
      <span className="text-[14px] text-[var(--text-muted)] leading-snug break-words">: {value}</span>
    </div>
  );
}

/* ── Ojo toggle ── */
function EyeIcon({ open }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

/* ── Campo contraseña con ojo ── */
function PasswordField({ label, placeholder, disabled }) {
  const [visible, setVisible] = React.useState(false);
  const inp = "input-codeplex w-full pl-4 pr-10 py-[10px] border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[14px] bg-[var(--input-bg)] text-[var(--input-text)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] font-[inherit] disabled:opacity-50 disabled:cursor-not-allowed";
  return (
    <div>
      <label className="block text-[13px] font-semibold text-[var(--text-dark)] mb-[6px]">{label}</label>
      <div className="relative">
        <input type={visible ? "text" : "password"} className={inp} placeholder={placeholder} disabled={disabled} />
        <button type="button" tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-dark)] bg-transparent border-none cursor-pointer p-0 flex items-center">
          <EyeIcon open={visible} />
        </button>
      </div>
    </div>
  );
}

/* ── Tab de contraseña ── */
function TabPassword({ disabled }) {
  return (
    <div className="flex flex-col gap-4">
      <PasswordField label="Contraseña actual"    placeholder="Tu contraseña actual"        disabled={disabled} />
      <PasswordField label="Nueva contraseña"     placeholder="Mínimo 8 caracteres"         disabled={disabled} />
      <PasswordField label="Confirmar contraseña" placeholder="Repite la nueva contraseña"  disabled={disabled} />
    </div>
  );
}

/* ── Tab notificaciones ── */
function TabNotificaciones({ disabled }) {
  const [activos, setActivos] = React.useState(() =>
    Object.fromEntries(NOTIFICACIONES_ITEMS.map((n) => [n.id, false]))
  );
  const toggle = (id) => {
    if (disabled) return;
    setActivos((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <div className="flex flex-col gap-3">
      {NOTIFICACIONES_ITEMS.map(({ id, label }) => (
        <label key={id}
          className={`flex items-center justify-between px-4 py-[11px] bg-[var(--white-color)] border border-[var(--border-color)] rounded-[var(--radius-sm)] ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-[var(--primary-color)] transition-colors duration-200"}`}
          onClick={() => toggle(id)}>
          <span className="text-[14px] font-medium text-[#334c6e]">{label}</span>
          <label className="toggle-switch shrink-0" onClick={(e) => e.stopPropagation()}>
            <input type="checkbox" checked={activos[id]} onChange={() => toggle(id)} disabled={disabled} />
            <span className="toggle-slider" />
          </label>
        </label>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════ */
function DatosPersonales() {
  const { perfil, actualizarPerfil, modoExploracion, comenzarAutenticacion } = useSesion();
  const [form,       setForm]       = useState(perfil);
  const [editando,   setEditando]   = useState(true);
  const [guardado,   setGuardado]   = useState(false);
  const [tabActivo,  setTabActivo]  = useState(0);
  const [nombreInput, setNombreInput] = useState([perfil.nombre, perfil.apellido].filter(Boolean).join(" "));

  React.useEffect(() => {
    setForm(perfil);
    setNombreInput([perfil.nombre, perfil.apellido].filter(Boolean).join(" "));
  }, [perfil]);

  const bloqueado = modoExploracion;
  const set = (id, val) => { if (bloqueado) return; setForm((f) => ({ ...f, [id]: val })); };
  const ro  = bloqueado ? { disabled: true } : {};

  const ciudades = CIUDADES_POR_PAIS[form.pais] ?? (form.pais ? CIUDADES_DEFAULT : []);

  const nombreCompleto = [perfil.nombre, perfil.apellido].filter(Boolean).join(" ");
  const inicial = nombreCompleto?.[0]?.toUpperCase() || "U";

  const handleGuardar = (e) => {
    e.preventDefault();
    actualizarPerfil(form);
    setEditando(false);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  const handleCancelar = () => {
    setForm(perfil);
    setNombreInput([perfil.nombre, perfil.apellido].filter(Boolean).join(" "));
    setEditando(false);
  };

  return (
    <div className="flex flex-col gap-5">

      {/* Layout 2 columnas */}
      <div className="grid grid-cols-[1fr_2fr] gap-5 [@media(max-width:768px)]:grid-cols-1 items-stretch">

        {/* ── Panel izquierdo ── */}
        <div className="bg-[var(--white-color)] rounded-[var(--radius-md)] border border-[var(--border-color)] shadow-[var(--shadow-sm)]">

          {/* Banner superior */}
          <div className="h-[120px] w-full rounded-t-[var(--radius-md)]" style={{ background: "var(--gradient-primary)" }} />

          {/* Avatar */}
          <div className="flex flex-col items-center px-6 pb-6 -mt-[60px]">
            <div className="relative">
              {perfil.avatar ? (
                <img src={perfil.avatar} alt={nombreCompleto}
                  className="w-[130px] h-[130px] rounded-full object-cover border-4 border-[var(--white-color)] shadow-[var(--shadow-sm)]" />
              ) : (
                <div className="w-[130px] h-[130px] rounded-full border-4 border-[var(--white-color)] shadow-[var(--shadow-sm)] flex items-center justify-center text-[52px] font-bold text-white"
                  style={{ background: "var(--gradient-primary)" }}>
                  {inicial}
                </div>
              )}
            </div>

            <h3 className="text-[18px] font-bold text-[var(--text-dark)] mt-3 mb-[2px] text-center">
              {nombreCompleto || "Tu nombre completo"}
            </h3>
            <p className="text-[12px] text-[var(--primary-color)] font-semibold m-0 text-center">
              {perfil.cargo || "Sin cargo"}
            </p>
            {perfil.ciudad && (
              <p className="text-[12px] text-[var(--text-muted)] m-0 mt-1 text-center">
                {[perfil.ciudad, perfil.pais].filter(Boolean).join(", ")}
              </p>
            )}

            {/* Badge guardado */}
            {guardado && (
              <span className="mt-3 flex items-center gap-[6px] bg-[var(--success-bg)] text-[var(--success-color)] text-[12px] font-semibold px-3 py-[5px] rounded-full">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                Guardado
              </span>
            )}
          </div>

          {/* Info personal resumida */}
          <div className="px-6 pb-6 border-t border-[var(--border-color)]">
            <p className="text-[15px] font-bold text-[var(--text-dark)] mt-5 mb-2">Información personal</p>
            <InfoItem label="Nombre completo" value={nombreCompleto} />
            <InfoItem label="Correo electrónico" value={perfil.email} />
            <InfoItem label="Número de teléfono" value={perfil.telefono} />
            <InfoItem label="DNI / RUC" value={perfil.dni} />
            <InfoItem label="Empresa" value={perfil.empresa} />
            <InfoItem label="Rubro" value={perfil.rubro} />
            <InfoItem label="Ubicación" value={[perfil.ciudad, perfil.pais].filter(Boolean).join(", ")} />
            {perfil.bio && (
              <InfoItem label="Biografía" value={perfil.bio} />
            )}
          </div>
        </div>

        {/* ── Panel derecho: formulario con tabs ── */}
        <div className="datos-panel-right bg-[var(--white-color)] rounded-[var(--radius-md)] border border-[var(--border-color)] shadow-[var(--shadow-sm)] flex flex-col overflow-hidden" style={{ minHeight: "580px" }}>

          {/* Tabs */}
          <div className="datos-tabs-bar flex border-b border-[var(--border-color)] shrink-0">
            {TABS_FORM.map((tab, i) => (
              <button key={tab} type="button"
                onClick={() => { setTabActivo(i); setEditando(false); }}
                data-active={tabActivo === i ? "true" : undefined}
                className={`datos-tab-btn py-4 text-[13px] font-semibold border-b-2 transition-all duration-200 bg-transparent border-x-0 border-t-0 cursor-pointer font-[inherit] whitespace-nowrap shrink-0 ${
                  tabActivo === i
                    ? "text-[var(--primary-color)] border-b-[var(--primary-color)]"
                    : "text-[var(--text-muted)] border-b-transparent hover:text-[var(--text-dark)]"
                }`}
                style={{ paddingLeft: i === 0 ? "24px" : "0", paddingRight: "24px" }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Contenido del tab */}
          <form onSubmit={handleGuardar} className="datos-form-content flex-1 flex flex-col p-6 gap-5 overflow-y-auto" style={{ minHeight: "480px" }}>

            {tabActivo === 0 && (
              <>
                {/* ── Imagen de Perfil ── */}
                <div>
                  <label className="block text-[13px] font-semibold text-[var(--text-dark)] mb-3">Imagen de Perfil</label>
                  <div className="relative inline-block">
                    {form.avatar ? (
                      <img src={form.avatar} alt="avatar"
                        className="w-[90px] h-[90px] rounded-full object-cover border-2 border-[var(--border-color)]" />
                    ) : (
                      <div className="w-[90px] h-[90px] rounded-full border-2 border-[var(--primary-color)] flex items-center justify-center text-[32px] font-bold text-white"
                        style={{ background: "var(--gradient-primary)" }}>
                        {inicial}
                      </div>
                    )}
                    {bloqueado ? (
                      <button type="button"
                        onClick={comenzarAutenticacion}
                        title="Inicia sesión para cambiar tu foto"
                        className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[var(--primary-color)] border-2 border-[var(--white-color)] flex items-center justify-center cursor-pointer shadow-md">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                          <circle cx="12" cy="13" r="4"/>
                        </svg>
                      </button>
                    ) : (
                      <label className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[var(--primary-color)] border-2 border-[var(--white-color)] flex items-center justify-center cursor-pointer shadow-md">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                          <circle cx="12" cy="13" r="4"/>
                        </svg>
                        <input type="file" accept="image/*" className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (ev) => set("avatar", ev.target.result);
                            reader.readAsDataURL(file);
                          }} />
                      </label>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 [@media(max-width:560px)]:grid-cols-1">
                  {/* Fila 1: Nombre completo + Correo */}
                  <Field label="Nombre completo">
                    <input type="text" className={inputClass} placeholder="Tu nombre completo"
                      value={nombreInput}
                      onChange={(e) => {
                        if (bloqueado) return;
                        setNombreInput(e.target.value);
                        const parts = e.target.value.trim().split(/\s+/);
                        const nombre = parts[0] || "";
                        const apellido = parts.slice(1).join(" ");
                        setForm((f) => ({ ...f, nombre, apellido }));
                      }} {...ro} />
                  </Field>
                  <Field label="Correo electrónico">
                    <input type="email" className={inputClass} placeholder="correo@ejemplo.com"
                      value={form.email} onChange={(e) => set("email", e.target.value)} {...ro} />
                  </Field>
                  {/* Fila 2: Teléfono + DNI */}
                  <Field label="Teléfono">
                    <input type="tel" className={inputClass} placeholder="+51 999 999 999"
                      value={form.telefono} onChange={(e) => set("telefono", e.target.value)} {...ro} />
                  </Field>
                  <Field label="DNI / RUC">
                    <input type="text" className={inputClass} placeholder="12345678"
                      value={form.dni} onChange={(e) => set("dni", e.target.value)} {...ro} />
                  </Field>
                  {/* Fila 3: Género + Fecha */}
                  <Field label="Género">
                    <SelectField value={form.genero} onChange={(v) => set("genero", v)} placeholder="Selecciona" disabled={bloqueado}>
                      {GENEROS.map((op) =>
                        <option key={op} value={op}>{op}</option>)}
                    </SelectField>
                  </Field>
                  <Field label="Fecha de nacimiento">
                    <input type="date" className={inputClass}
                      value={form.fechaNacimiento || ""}
                      onChange={(e) => set("fechaNacimiento", e.target.value)}
                      max={new Date().toISOString().split("T")[0]}
                      {...ro} />
                  </Field>
                  {/* Fila 4: País + Ciudad */}
                  <Field label="País">
                    <SelectField value={form.pais} onChange={(v) => { set("pais", v); set("ciudad", ""); }} placeholder="Selecciona tu país" disabled={bloqueado}>
                      {PAISES.map((p) => <option key={p} value={p}>{p}</option>)}
                    </SelectField>
                  </Field>
                  <Field label="Ciudad">
                    {ciudades.length > 0 ? (
                      <SelectField value={form.ciudad} onChange={(v) => set("ciudad", v)} placeholder="Selecciona tu ciudad" disabled={bloqueado}>
                        {ciudades.map((c) => <option key={c} value={c}>{c}</option>)}
                      </SelectField>
                    ) : (
                      <input type="text" className={inputClass} placeholder="Selecciona un país primero" disabled />
                    )}
                  </Field>
                  {/* Fila 5: Empresa + Cargo */}
                  <Field label="Empresa / Negocio">
                    <input type="text" className={inputClass} placeholder="Nombre de tu empresa"
                      value={form.empresa} onChange={(e) => set("empresa", e.target.value)} {...ro} />
                  </Field>
                  <Field label="Cargo / Rol">
                    <SelectField value={form.cargo} onChange={(v) => set("cargo", v)} placeholder="Selecciona tu cargo" disabled={bloqueado}>
                      {CARGOS.map((c) => <option key={c} value={c}>{c}</option>)}
                    </SelectField>
                  </Field>
                  {/* Fila 6: Biografía */}
                  <Field label="Biografía" col2>
                    <textarea className={`${inputClass} resize-none`} rows={3}
                      placeholder="Cuéntanos un poco sobre ti..."
                      value={form.bio} onChange={(e) => set("bio", e.target.value)} {...ro} />
                  </Field>
                </div>
              </>
            )}

            {tabActivo === 1 && <TabPassword disabled={bloqueado} />}
            {tabActivo === 2 && <TabNotificaciones disabled={bloqueado} />}

            {/* Footer */}
            {!modoExploracion && (
              <div className="flex items-center justify-end gap-3 pt-2 mt-auto">
                <button type="button" onClick={handleCancelar}
                  className="px-6 py-[9px] rounded-[var(--radius-xl)] text-[13px] font-semibold border border-[var(--border-color)] text-[var(--text-muted)] bg-transparent cursor-pointer transition-all duration-200 hover:border-[var(--text-muted)] hover:text-[var(--text-dark)]">
                  Cancelar
                </button>
                <button type="submit"
                  className="flex items-center gap-2 px-7 py-[9px] rounded-[var(--radius-xl)] text-[13px] font-semibold text-white border-none cursor-pointer transition-[opacity,transform] duration-200 hover:opacity-90 hover:-translate-y-px"
                  style={{ background: "var(--gradient-primary)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Guardar cambios
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default DatosPersonales;
