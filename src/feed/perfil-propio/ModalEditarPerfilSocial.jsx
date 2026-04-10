/* ═══════════════════════════════════════════════════════════
   ModalEditarPerfilSocial — diseño de página completa con
   sidebar izquierdo y contenido por sección.
═══════════════════════════════════════════════════════════ */
import React, { useState, useRef } from "react";
import { usePerfilSocial } from "./PerfilSocialContext";
import { PAISES, CIUDADES_POR_PAIS, CIUDADES_DEFAULT } from "../../identidad/datos-personales/datosPersonalesData";

const inputCls = "w-full px-[14px] py-[10px] border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[13.5px] bg-[var(--white-color)] text-[var(--text-dark)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] font-[inherit] focus:border-[var(--primary-color)] focus:shadow-[0_0_0_3px_rgba(72,127,255,0.1)]";
const labelCls = "block text-[12px] font-semibold text-[var(--text-dark)] mb-[6px]";
const cardCls  = "bg-[var(--white-color)] rounded-[var(--radius-md)] border border-[var(--border-color)] p-6 flex flex-col gap-5";
const tituloCard = "text-[15px] font-bold text-[var(--text-dark)] m-0";

/* ── Secciones del sidebar ── */
const SECCIONES = [
  { id: "datos-basicos",          label: "Datos básicos",           requerido: true  },
  { id: "resumen",                label: "Resumen profesional",     requerido: true  },
  { id: "experiencia",            label: "Experiencia laboral",     requerido: true  },
  { id: "formacion",              label: "Formación académica",     requerido: false },
  { id: "titulos",                label: "Títulos y certificaciones", requerido: true },
  { id: "habilidades",            label: "Habilidades",             requerido: false },
  { id: "contacto",               label: "Contacto",                requerido: false },
  { id: "documentos",             label: "Documentos",              requerido: true  },
];

const ICONOS_SECCION = {
  "datos-basicos":  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  "resumen":        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/></svg>,
  "experiencia":    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  "formacion":      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  "titulos":        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  "habilidades":    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  "contacto":       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>,
  "documentos":     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
};

/* ── Campo con label ── */
function Field({ label, children, className = "" }) {
  return (
    <div className={className}>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

/* ── Select estilizado ── */
function SelectField({ value, onChange, placeholder, children, disabled }) {
  return (
    <div className="relative">
      <select className={`${inputCls} cursor-pointer appearance-none`} value={value}
        onChange={e => onChange(e.target.value)} disabled={disabled}>
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </div>
  );
}

/* ════════════ SECCIÓN: Datos básicos ════════════ */
function SecDatosBasicos({ form, setForm, onCancelar, onGuardar, guardado }) {
  const fileRef = useRef(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const ciudades = CIUDADES_POR_PAIS[form.pais] ?? (form.pais ? CIUDADES_DEFAULT : []);

  /* Dividir nombreVisible en nombre + apellido al editar */
  const partes = (form.nombreVisible || "").split(" ");
  const nombreInicial   = partes[0] || "";
  const apellidoInicial = partes.slice(1).join(" ") || "";
  const [nombre,   setNombre]   = useState(nombreInicial);
  const [apellido, setApellido] = useState(apellidoInicial);

  const handleNombreChange = (n, a) => {
    const nv = [n, a].filter(Boolean).join(" ").trim();
    set("nombreVisible", nv);
  };

  return (
    <>
      {/* Foto de perfil */}
      <div className={cardCls}>
        <h4 className={tituloCard}>Foto de perfil</h4>
        {form.avatar
          ? <div className="flex items-center gap-4">
              <img src={form.avatar} alt="" className="w-20 h-20 rounded-full object-cover border-2 border-[var(--border-color)]" />
              <div className="flex flex-col gap-2">
                <button type="button" onClick={() => fileRef.current?.click()}
                  className="px-4 py-[7px] text-[13px] font-semibold rounded-[var(--radius-sm)] border border-[var(--primary-color)] text-[var(--primary-color)] bg-transparent cursor-pointer hover:bg-[var(--primary-color)] hover:text-white transition-colors">
                  Cambiar foto
                </button>
                <button type="button" onClick={() => set("avatar", "")}
                  className="text-[12px] text-[var(--error-color)] bg-transparent border-none cursor-pointer text-left p-0">
                  Quitar foto
                </button>
              </div>
            </div>
          : <div onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-[var(--border-color)] rounded-[var(--radius-md)] py-8 flex flex-col items-center gap-2 cursor-pointer hover:border-[var(--primary-color)] hover:bg-[var(--background-color)] transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
              <p className="text-[13px] text-[var(--text-muted)] m-0 font-medium">Subir foto de perfil</p>
              <p className="text-[11px] text-[var(--text-muted)] m-0">JPG, PNG — máx. 5MB</p>
            </div>
        }
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={e => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = ev => set("avatar", ev.target.result);
            reader.readAsDataURL(file);
          }} />
      </div>

      {/* Datos personales */}
      <div className={cardCls}>
        <h4 className={tituloCard}>Datos personales</h4>
        {/* Aviso obligatorio */}
        <div className="flex items-center gap-2 -mt-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--error-color)" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p className="text-[12px] text-[var(--error-color)] m-0 font-medium">Campos obligatorios para operar</p>
        </div>

        <div className="grid grid-cols-2 gap-4 [@media(max-width:500px)]:grid-cols-1">
          <Field label="Nombre">
            <input type="text" className={inputCls} placeholder="Tu nombre"
              value={nombre} onChange={e => { setNombre(e.target.value); handleNombreChange(e.target.value, apellido); }} />
          </Field>
          <Field label="Apellido">
            <input type="text" className={inputCls} placeholder="Tu apellido"
              value={apellido} onChange={e => { setApellido(e.target.value); handleNombreChange(nombre, e.target.value); }} />
          </Field>
          <Field label="Cargo profesional" className="col-span-2 [@media(max-width:500px)]:col-span-1">
            <input type="text" className={inputCls} placeholder="Ej: Asesor Tributario · CPA"
              value={form.tituloProfesional} onChange={e => set("tituloProfesional", e.target.value)} />
          </Field>
          <Field label="Ubicación">
            {CIUDADES_POR_PAIS[form.pais]
              ? <SelectField value={form.ciudad} onChange={v => set("ciudad", v)} placeholder="Ciudad, País">
                  {(CIUDADES_POR_PAIS[form.pais] ?? []).map(c => <option key={c} value={c}>{c}</option>)}
                </SelectField>
              : <input type="text" className={inputCls} placeholder="Ciudad, País"
                  value={[form.ciudad, form.pais].filter(Boolean).join(", ")}
                  onChange={e => set("ciudad", e.target.value)} />
            }
          </Field>
          <Field label="Años de experiencia">
            <input type="number" className={inputCls} placeholder="Ej: 8" min="0" max="60"
              value={form.anosExperiencia || ""} onChange={e => set("anosExperiencia", e.target.value)} />
          </Field>
        </div>

        <BotonesGuardar onCancelar={onCancelar} onGuardar={onGuardar} guardado={guardado} />
      </div>
    </>
  );
}

/* ════════════ SECCIÓN: Resumen profesional ════════════ */
function SecResumen({ form, setForm, onCancelar, onGuardar, guardado }) {
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className={cardCls}>
      <h4 className={tituloCard}>Resumen profesional</h4>
      <Field label="Bio pública">
        <textarea className={`${inputCls} resize-none`} rows={5}
          placeholder="Cuéntale a la comunidad quién eres, qué haces y qué te apasiona..."
          value={form.bioPública} onChange={e => set("bioPública", e.target.value)} />
      </Field>
      <BotonesGuardar onCancelar={onCancelar} onGuardar={onGuardar} guardado={guardado} />
    </div>
  );
}

/* ════════════ SECCIÓN: Experiencia laboral ════════════ */
const TRABAJO_VACIO = { id: null, cargo: "", empresa: "", periodo: "", desc: "" };

function SecExperiencia({ form, setForm, onCancelar, onGuardar, guardado }) {
  const [editando, setEditando] = useState(null);
  const [draft, setDraft] = useState(TRABAJO_VACIO);
  const trabajos = form.trabajos ?? [];
  const setD = (k, v) => setDraft(d => ({ ...d, [k]: v }));

  const abrirNuevo  = () => { setDraft({ ...TRABAJO_VACIO, id: Date.now() }); setEditando("nuevo"); };
  const abrirEditar = (i) => { setDraft({ ...trabajos[i] }); setEditando(i); };
  const guardar = () => {
    if (!draft.cargo && !draft.empresa) return;
    const nuevos = editando === "nuevo"
      ? [...trabajos, draft]
      : trabajos.map((t, i) => i === editando ? draft : t);
    setForm(f => ({ ...f, trabajos: nuevos }));
    setEditando(null);
  };
  const eliminar = (i) => setForm(f => ({ ...f, trabajos: trabajos.filter((_, idx) => idx !== i) }));

  return (
    <div className={cardCls}>
      <h4 className={tituloCard}>Experiencia laboral</h4>

      {trabajos.length === 0 && editando === null && (
        <p className="text-[13px] text-[var(--text-muted)] text-center py-4 m-0">
          No has agregado experiencia laboral todavía.
        </p>
      )}

      {trabajos.map((t, i) => (
        editando === i
          ? <FormTrabajo key={i} draft={draft} setD={setD} onGuardar={guardar} onCancelar={() => setEditando(null)} />
          : <div key={i} className="flex gap-3 p-4 border border-[var(--border-color)] rounded-[var(--radius-sm)]">
              <div className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center shrink-0 bg-[var(--primary-color)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[14px] font-bold text-[var(--text-dark)]">{t.cargo || "Sin cargo"}</span>
                  <span className="text-[12px] text-[var(--text-muted)] shrink-0">{t.periodo}</span>
                </div>
                <span className="text-[12px] font-semibold" style={{ color: "var(--primary-color)" }}>{t.empresa}</span>
                {t.desc && <p className="text-[13px] text-[var(--text-muted)] mt-1 m-0 leading-[1.5]">{t.desc}</p>}
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => abrirEditar(i)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--text-muted)] hover:bg-[var(--background-color)] transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button onClick={() => eliminar(i)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--error-color)] hover:bg-[#fef2f2] transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </div>
      ))}

      {editando === "nuevo" && (
        <FormTrabajo draft={draft} setD={setD} onGuardar={guardar} onCancelar={() => setEditando(null)} />
      )}

      {editando === null && (
        <button onClick={abrirNuevo}
          className="w-full py-[10px] border border-dashed border-[var(--border-color)] rounded-[var(--radius-sm)] text-[13px] font-semibold text-[var(--text-muted)] bg-transparent cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors">
          + Agregar experiencia
        </button>
      )}

      <BotonesGuardar onCancelar={onCancelar} onGuardar={onGuardar} guardado={guardado} />
    </div>
  );
}

function FormTrabajo({ draft, setD, onGuardar, onCancelar }) {
  return (
    <div className="border border-[var(--primary-color)] rounded-[var(--radius-sm)] p-4 flex flex-col gap-3 bg-[var(--background-color)]">
      <div className="grid grid-cols-2 gap-3 [@media(max-width:500px)]:grid-cols-1">
        <Field label="Cargo">
          <input type="text" className={inputCls} placeholder="Ej: Contador Senior"
            value={draft.cargo} onChange={e => setD("cargo", e.target.value)} />
        </Field>
        <Field label="Empresa">
          <input type="text" className={inputCls} placeholder="Nombre de la empresa"
            value={draft.empresa} onChange={e => setD("empresa", e.target.value)} />
        </Field>
        <Field label="Período" className="col-span-2 [@media(max-width:500px)]:col-span-1">
          <input type="text" className={inputCls} placeholder="Ej: 2022–Actualidad"
            value={draft.periodo} onChange={e => setD("periodo", e.target.value)} />
        </Field>
        <Field label="Descripción" className="col-span-2 [@media(max-width:500px)]:col-span-1">
          <textarea className={`${inputCls} resize-none`} rows={3}
            placeholder="Describe tus responsabilidades..."
            value={draft.desc} onChange={e => setD("desc", e.target.value)} />
        </Field>
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={onCancelar}
          className="px-4 py-[7px] text-[13px] font-semibold border border-[var(--border-color)] text-[var(--text-muted)] bg-transparent rounded-[var(--radius-sm)] cursor-pointer">
          Cancelar
        </button>
        <button onClick={onGuardar}
          className="px-5 py-[7px] text-[13px] font-semibold text-white rounded-[var(--radius-sm)] border-none cursor-pointer"
          style={{ background: "var(--primary-color)" }}>
          Guardar
        </button>
      </div>
    </div>
  );
}

/* ════════════ SECCIÓN: Formación académica ════════════ */
function SecFormacion({ form, setForm, onCancelar, onGuardar, guardado }) {
  const [instInput, setInstInput] = useState("");
  const [gradoInput, setGradoInput] = useState("");
  const titulos = (form.titulos ?? []).filter(t => t.esFormacion);

  const agregar = () => {
    if (!instInput.trim()) return;
    const nuevo = { id: Date.now(), titulo: gradoInput.trim(), institucion: instInput.trim(), verificado: false, esFormacion: true };
    setForm(f => ({ ...f, titulos: [...(f.titulos ?? []), nuevo] }));
    setInstInput(""); setGradoInput("");
  };
  const quitar = (id) => setForm(f => ({ ...f, titulos: (f.titulos ?? []).filter(t => t.id !== id) }));

  return (
    <div className={cardCls}>
      <h4 className={tituloCard}>Formación académica</h4>
      <div className="grid grid-cols-2 gap-3 [@media(max-width:500px)]:grid-cols-1">
        <Field label="Universidad / Institución" className="col-span-2 [@media(max-width:500px)]:col-span-1">
          <input type="text" className={inputCls} placeholder="Ej: Universidad Nacional Mayor de San Marcos"
            value={instInput} onChange={e => setInstInput(e.target.value)} />
        </Field>
        <Field label="Grado / Carrera">
          <input type="text" className={inputCls} placeholder="Ej: Contabilidad"
            value={gradoInput} onChange={e => setGradoInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); agregar(); } }} />
        </Field>
        <div className="flex items-end">
          <button onClick={agregar}
            className="w-full py-[10px] rounded-[var(--radius-sm)] text-[13px] font-semibold text-white border-none cursor-pointer"
            style={{ background: "var(--primary-color)" }}>
            + Agregar
          </button>
        </div>
      </div>
      {titulos.map(t => (
        <div key={t.id} className="flex items-center gap-3 p-3 border border-[var(--border-color)] rounded-[var(--radius-sm)]">
          <div className="w-9 h-9 bg-[var(--primary-color)] rounded-[var(--radius-sm)] flex items-center justify-center shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[var(--text-dark)] m-0">{t.titulo}</p>
            <p className="text-[12px] text-[var(--text-muted)] m-0">{t.institucion}</p>
          </div>
          <button onClick={() => quitar(t.id)}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--error-color)] hover:bg-[#fef2f2] transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      ))}
      <BotonesGuardar onCancelar={onCancelar} onGuardar={onGuardar} guardado={guardado} />
    </div>
  );
}

/* ════════════ SECCIÓN: Títulos y certificaciones ════════════ */
function SecTitulos({ form, setForm, onCancelar, onGuardar, guardado }) {
  const [tituloInput, setTituloInput] = useState("");
  const [instInput,   setInstInput]   = useState("");
  const titulos = (form.titulos ?? []).filter(t => !t.esFormacion);

  const agregar = () => {
    if (!tituloInput.trim()) return;
    const nuevo = { id: Date.now(), titulo: tituloInput.trim(), institucion: instInput.trim(), verificado: false };
    setForm(f => ({ ...f, titulos: [...(f.titulos ?? []), nuevo] }));
    setTituloInput(""); setInstInput("");
  };
  const quitar = (id) => setForm(f => ({ ...f, titulos: (f.titulos ?? []).filter(t => t.id !== id) }));

  return (
    <div className={cardCls}>
      <h4 className={tituloCard}>Títulos y certificaciones</h4>
      <div className="grid grid-cols-2 gap-3 [@media(max-width:500px)]:grid-cols-1">
        <Field label="Título / Certificación">
          <input type="text" className={inputCls} placeholder="Ej: Licenciatura en Contabilidad"
            value={tituloInput} onChange={e => setTituloInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); agregar(); } }} />
        </Field>
        <Field label="Institución">
          <input type="text" className={inputCls} placeholder="Ej: UNMSM"
            value={instInput} onChange={e => setInstInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); agregar(); } }} />
        </Field>
      </div>
      <button onClick={agregar}
        className="w-full py-[10px] border border-dashed border-[var(--primary-color)] rounded-[var(--radius-sm)] text-[13px] font-semibold text-[var(--primary-color)] bg-transparent cursor-pointer hover:bg-[var(--primary-bg)] transition-colors">
        + Agregar título
      </button>
      {titulos.map(t => (
        <div key={t.id} className="flex items-center gap-3 p-3 border border-[var(--border-color)] rounded-[var(--radius-sm)]">
          <div className="w-9 h-9 bg-[var(--primary-color)] rounded-[var(--radius-sm)] flex items-center justify-center shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[var(--text-dark)] m-0 truncate">{t.titulo}</p>
            {t.institucion && <p className="text-[12px] text-[var(--text-muted)] m-0">{t.institucion}</p>}
          </div>
          <button onClick={() => quitar(t.id)}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--error-color)] hover:bg-[#fef2f2] transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      ))}
      <BotonesGuardar onCancelar={onCancelar} onGuardar={onGuardar} guardado={guardado} />
    </div>
  );
}

/* ════════════ SECCIÓN: Habilidades ════════════ */
function SecHabilidades({ form, setForm, onCancelar, onGuardar, guardado }) {
  const [input, setInput] = useState("");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const agregar = () => {
    const h = input.trim();
    if (!h || form.habilidades.includes(h)) return;
    set("habilidades", [...form.habilidades, h]);
    setInput("");
  };

  return (
    <div className={cardCls}>
      <h4 className={tituloCard}>Habilidades</h4>
      <div className="flex gap-2">
        <input type="text" className={`${inputCls} flex-1`} placeholder="Ej: Tributación SUNAT, Excel avanzado..."
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); agregar(); } }} />
        <button onClick={agregar}
          className="px-4 py-[10px] rounded-[var(--radius-sm)] text-[13px] font-semibold text-white border-none cursor-pointer shrink-0"
          style={{ background: "var(--primary-color)" }}>
          + Añadir
        </button>
      </div>
      {form.habilidades.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {form.habilidades.map(h => (
            <span key={h} className="flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold border"
              style={{ background: "var(--primary-bg,#eff6ff)", color: "var(--primary-color)", borderColor: "var(--primary-color)" }}>
              {h}
              <button onClick={() => set("habilidades", form.habilidades.filter(x => x !== h))}
                className="bg-transparent border-none cursor-pointer p-0 text-[14px] leading-none ml-[2px] hover:text-[var(--error-color)]">×</button>
            </span>
          ))}
        </div>
      )}
      <BotonesGuardar onCancelar={onCancelar} onGuardar={onGuardar} guardado={guardado} />
    </div>
  );
}

/* ════════════ SECCIÓN: Contacto ════════════ */
function SecContacto({ form, setForm, onCancelar, onGuardar, guardado }) {
  const set    = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setRed = (k, v) => setForm(f => ({ ...f, redesSociales: { ...f.redesSociales, [k]: v } }));

  return (
    <div className={cardCls}>
      <h4 className={tituloCard}>Contacto y redes sociales</h4>
      <div className="flex flex-col gap-3">
        {[
          { key: "linkedin", label: "LinkedIn",    placeholder: "linkedin.com/in/tu-perfil", icon: "in" },
          { key: "twitter",  label: "Twitter / X", placeholder: "@tuusuario",                icon: "𝕏" },
          { key: "website",  label: "Sitio web",   placeholder: "https://tuweb.com",         icon: "🌐" },
        ].map(({ key, label, placeholder, icon }) => (
          <div key={key} className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-[var(--background-color)] flex items-center justify-center text-[12px] font-bold text-[var(--text-muted)] shrink-0">
              {icon}
            </span>
            <div className="flex-1">
              <label className="block text-[11px] font-semibold text-[var(--text-muted)] mb-[4px]">{label}</label>
              <input type="text" className={inputCls} placeholder={placeholder}
                value={form.redesSociales?.[key] || ""} onChange={e => setRed(key, e.target.value)} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between p-4 border border-[var(--border-color)] rounded-[var(--radius-sm)]">
        <div>
          <p className="text-[13px] font-semibold text-[var(--text-dark)] m-0">Disponible para oportunidades</p>
          <p className="text-[12px] text-[var(--text-muted)] m-0 mt-[2px]">Aparecerás en búsquedas de la comunidad</p>
        </div>
        <label className="toggle-switch shrink-0">
          <input type="checkbox" checked={!!form.disponible} onChange={e => set("disponible", e.target.checked)} />
          <span className="toggle-slider" />
        </label>
      </div>
      <BotonesGuardar onCancelar={onCancelar} onGuardar={onGuardar} guardado={guardado} />
    </div>
  );
}

/* ════════════ SECCIÓN: Documentos ════════════ */
function SecDocumentos({ form, setForm, onCancelar, onGuardar, guardado }) {
  const fileRef = useRef(null);
  const docs = form.documentos ?? [];

  const agregar = (e) => {
    const archivos = Array.from(e.target.files ?? []);
    if (!archivos.length) return;
    const nuevos = archivos.map(f => ({
      id: Date.now() + Math.random(),
      nombre: f.name,
      tipo: f.name.endsWith(".pdf") ? "PDF" : f.type.split("/")[1]?.toUpperCase() || "DOC",
      fecha: new Date().toLocaleDateString("es-PE"),
    }));
    setForm(f => ({ ...f, documentos: [...docs, ...nuevos] }));
    e.target.value = "";
  };

  const eliminar = (id) => setForm(f => ({ ...f, documentos: docs.filter(d => d.id !== id) }));

  return (
    <div className={cardCls}>
      <h4 className={tituloCard}>Documentos</h4>
      {docs.length === 0 && (
        <p className="text-[13px] text-[var(--text-muted)] text-center py-4 m-0">No has subido documentos todavía.</p>
      )}
      {docs.map(doc => (
        <div key={doc.id} className="flex items-center gap-3 p-3 border border-[var(--border-color)] rounded-[var(--radius-sm)]">
          <div className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, var(--primary-color), #7c3aed)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold text-[var(--text-dark)] m-0 truncate">{doc.nombre}</p>
            <p className="text-[12px] text-[var(--text-muted)] m-0">{doc.tipo} · Subido el {doc.fecha}</p>
          </div>
          <button onClick={() => eliminar(doc.id)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--error-color)] hover:bg-[#fef2f2] transition-colors shrink-0">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      ))}
      <button onClick={() => fileRef.current?.click()}
        className="w-full py-[10px] border border-dashed border-[var(--border-color)] rounded-[var(--radius-sm)] text-[13px] font-semibold text-[var(--text-muted)] bg-transparent cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors">
        + Subir documento
      </button>
      <input ref={fileRef} type="file" multiple accept=".pdf,.doc,.docx,.jpg,.png" className="hidden" onChange={agregar} />
      <BotonesGuardar onCancelar={onCancelar} onGuardar={onGuardar} guardado={guardado} />
    </div>
  );
}

/* ── Botones Cancelar / Guardar reutilizables ── */
function BotonesGuardar({ onCancelar, onGuardar, guardado }) {
  return (
    <div className="flex justify-end gap-3 pt-2 border-t border-[var(--border-color)]">
      <button onClick={onCancelar}
        className="px-6 py-[9px] rounded-[var(--radius-sm)] text-[13px] font-semibold border border-[var(--border-color)] text-[var(--text-muted)] bg-transparent cursor-pointer hover:text-[var(--text-dark)] transition-colors">
        Cancelar
      </button>
      <button onClick={onGuardar}
        className="flex items-center gap-2 px-6 py-[9px] rounded-[var(--radius-sm)] text-[13px] font-semibold text-white border-none cursor-pointer transition-all"
        style={{ background: guardado ? "var(--success-color,#22c55e)" : "var(--gradient-primary)" }}>
        {guardado
          ? <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>Guardado</>
          : "Guardar cambios"
        }
      </button>
    </div>
  );
}

/* Determina si una sección tiene datos (para el punto rojo) */
function tieneIncompleto(secId, form) {
  switch (secId) {
    case "datos-basicos":  return !form.nombreVisible || !form.tituloProfesional;
    case "resumen":        return !form.bioPública;
    case "experiencia":    return (form.trabajos?.length ?? 0) === 0;
    case "titulos":        return (form.titulos?.filter(t => !t.esFormacion)?.length ?? 0) === 0;
    case "documentos":     return (form.documentos?.length ?? 0) === 0;
    default:               return false;
  }
}

/* Mapea aliases legados → ID de sección real */
const TAB_ALIAS = { "info": "datos-basicos" };

/* ════════════ Modal principal ════════════ */
export function ModalEditarPerfilSocial({ onCerrar, initialTab = "datos-basicos" }) {
  const { perfilSocial, actualizarPerfilSocial } = usePerfilSocial();
  const [form,       setForm]       = useState({ trabajos: [], documentos: [], titulos: [], habilidades: [], ...perfilSocial });
  const [secActiva,  setSecActiva]  = useState(TAB_ALIAS[initialTab] ?? initialTab ?? "datos-basicos");
  const [guardado,   setGuardado]   = useState(false);

  const handleGuardar = () => {
    actualizarPerfilSocial(form);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  const props = { form, setForm, onCancelar: onCerrar, onGuardar: handleGuardar, guardado };

  return (
    <div className="w-full flex flex-col bg-[var(--background-color)]">

      {/* ── Topbar sticky — queda justo debajo del Header del dashboard ── */}
      <div className="flex items-center gap-3 px-4 py-[10px] bg-[var(--white-color)] border border-[var(--border-color)] rounded-[var(--radius-md)] mb-4 sticky z-10"
        style={{ top: "var(--header-height)" }}>
        <button onClick={onCerrar}
          className="flex items-center gap-[6px] text-[13px] font-semibold text-[var(--text-muted)] bg-transparent border border-[var(--border-color)] rounded-[var(--radius-sm)] px-3 py-[5px] cursor-pointer hover:text-[var(--text-dark)] hover:border-[var(--text-muted)] transition-colors shrink-0">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Volver
        </button>
        <span className="text-[15px] font-bold text-[var(--text-dark)]">Editar perfil</span>
      </div>

      {/* ── Cuerpo: sidebar izquierdo + contenido ── */}
      <div className="flex gap-0 [@media(max-width:768px)]:flex-col">

        {/* Sidebar de secciones — sticky bajo el topbar */}
        <div className="w-[220px] shrink-0 bg-[var(--white-color)] border border-[var(--border-color)] rounded-[var(--radius-md)] self-start sticky py-4 px-2
          [@media(max-width:768px)]:w-full [@media(max-width:768px)]:flex [@media(max-width:768px)]:overflow-x-auto [@media(max-width:768px)]:py-2 [@media(max-width:768px)]:sticky"
          style={{ top: "calc(var(--header-height) + 52px)" }}>
          <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-[0.8px] uppercase px-3 mb-2 [@media(max-width:768px)]:hidden">
            Información
          </p>
          {SECCIONES.map(({ id, label, requerido }) => {
            const activo     = secActiva === id;
            const incompleto = requerido && tieneIncompleto(id, form);
            return (
              <button key={id} onClick={() => setSecActiva(id)}
                className={`w-full flex items-center gap-[10px] px-3 py-[9px] rounded-[var(--radius-sm)] text-[13px] font-medium text-left border-none cursor-pointer transition-all duration-150 whitespace-nowrap
                  [@media(max-width:768px)]:w-auto [@media(max-width:768px)]:shrink-0 ${
                  activo
                    ? "bg-[var(--primary-bg,#eff6ff)] text-[var(--primary-color)] font-semibold"
                    : "bg-transparent text-[var(--text-dark)] hover:bg-[var(--hover-color)]"
                }`}>
                <span className={`[@media(max-width:768px)]:hidden ${activo ? "text-[var(--primary-color)]" : "text-[var(--text-muted)]"}`}>
                  {ICONOS_SECCION[id]}
                </span>
                <span className="flex-1 [@media(max-width:768px)]:flex-none">{label}</span>
                {incompleto && (
                  <span className="w-[6px] h-[6px] rounded-full bg-[var(--error-color)] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Contenido de la sección activa */}
        <div className="flex-1 min-w-0 pl-4 pb-6 [@media(max-width:768px)]:pl-0 [@media(max-width:768px)]:pt-4">
          {secActiva === "datos-basicos" && <SecDatosBasicos   {...props} />}
          {secActiva === "resumen"       && <SecResumen        {...props} />}
          {secActiva === "experiencia"   && <SecExperiencia    {...props} />}
          {secActiva === "formacion"     && <SecFormacion      {...props} />}
          {secActiva === "titulos"       && <SecTitulos        {...props} />}
          {secActiva === "habilidades"   && <SecHabilidades    {...props} />}
          {secActiva === "contacto"      && <SecContacto       {...props} />}
          {secActiva === "documentos"    && <SecDocumentos     {...props} />}
        </div>
      </div>
    </div>
  );
}
