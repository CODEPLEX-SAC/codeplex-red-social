import React from "react";
import Field from "@/capacidades/identidad/datos-personales/componentes/Campo";
import SelectField, { CLASE_CAMPO_TEXTO_DATOS_PERSONALES } from "@/capacidades/identidad/datos-personales/componentes/SelectorCampo";
import TabPassword from "@/capacidades/identidad/datos-personales/componentes/TabContrasena";
import TabNotificaciones from "@/capacidades/identidad/datos-personales/componentes/TabNotificaciones";
import InfoItem from "@/capacidades/identidad/datos-personales/componentes/InfoItem";
import { useDatosPersonales } from "@/capacidades/identidad/datos-personales/ganchos/usarDatosPersonales";

export default function DatosPersonales() {
  const {
    perfil,
    perfilUsuario,
    textoNombreCompletoEdicion,
    indiceTabPerfilActivo,
    perfilMarcadoGuardado,
    modoExploracion,
    comenzarAutenticacion,
    solicitudGuardadoPerfilEnCurso,
    mensajeErrorGuardadoPerfil,
    ciudadesDisponiblesPerfil,
    nombreCompletoPerfil,
    inicialNombrePerfil,
    fechaMaximaNacimientoPermitida,
    propsCampoDeshabilitadoExploracion,
    establecerCampoPerfilUsuario,
    alCambiarPaisPerfilUsuario,
    alCambiarTextoNombreCompletoUsuario,
    alCambiarArchivoAvatarUsuario,
    guardarPerfilUsuario,
    cancelarEdicionPerfilUsuario,
    alSeleccionarIndiceTabPerfil,
    contrasenaActualUsuario,
    nuevaContrasenaUsuario,
    confirmacionNuevaContrasenaUsuario,
    establecerContrasenaActualUsuario,
    establecerNuevaContrasenaUsuario,
    establecerConfirmacionNuevaContrasenaUsuario,
    mensajeErrorCambioContrasena,
    cambioContrasenaExitoso,
    solicitudCambioContrasenaEnCurso,
    cambiarPasswordUsuario,
    elementosNotificacionDisponibles,
    mapaPreferenciasNotificacionActivas,
    alAlternarPreferenciaNotificacion,
    paisesDisponiblesPerfil,
    cargosDisponiblesPerfil,
    generosDisponiblesPerfil,
    titulosTabsPerfil,
    fechaNacimientoFormateadaResumen,
    textoUbicacionResumenPerfil,
  } = useDatosPersonales();

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-[1fr_2fr] gap-5 [@media(max-width:768px)]:grid-cols-1 items-stretch">
        <div className="bg-[var(--white-color)] rounded-[var(--radius-md)] border border-[var(--border-color)] shadow-[var(--shadow-sm)]">
          <div className="h-[120px] w-full rounded-t-[var(--radius-md)]" style={{ background: "var(--gradient-primary)" }} />

          <div className="flex flex-col items-center px-6 pb-6 -mt-[60px]">
            <div className="relative">
              {perfil.avatar ? (
                <img
                  src={perfil.avatar}
                  alt={nombreCompletoPerfil}
                  className="w-[130px] h-[130px] rounded-full object-cover border-4 border-[var(--white-color)] shadow-[var(--shadow-sm)]"
                />
              ) : (
                <div
                  className="w-[130px] h-[130px] rounded-full border-4 border-[var(--white-color)] shadow-[var(--shadow-sm)] flex items-center justify-center text-[52px] font-bold text-white"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {inicialNombrePerfil}
                </div>
              )}
            </div>

            <h3 className="text-[18px] font-bold text-[var(--text-dark)] mt-3 mb-[2px] text-center">
              {nombreCompletoPerfil || "Tu nombre completo"}
            </h3>
            <p className="text-[12px] text-[var(--primary-color)] font-semibold m-0 text-center">{perfil.cargo || "Sin cargo"}</p>
            {perfil.email && <p className="text-[12px] text-[var(--text-muted)] m-0 mt-1 text-center">{perfil.email}</p>}

            {perfilMarcadoGuardado && (
              <span className="mt-3 flex items-center gap-[6px] bg-[var(--success-bg)] text-[var(--success-color)] text-[12px] font-semibold px-3 py-[5px] rounded-full">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Guardado
              </span>
            )}
          </div>

          <div className="px-6 pb-6 border-t border-[var(--border-color)]">
            <p className="text-[15px] font-bold text-[var(--text-dark)] mt-5 mb-2">Información personal</p>
            <InfoItem etiqueta="Nombre completo" valor={nombreCompletoPerfil} />
            <InfoItem etiqueta="Correo electrónico" valor={perfil.email} />
            <InfoItem etiqueta="Teléfono" valor={perfil.telefono} />
            <InfoItem etiqueta="DNI / RUC" valor={perfil.dni} />
            <InfoItem etiqueta="Cargo / Rol" valor={perfil.cargo} />
            <InfoItem etiqueta="Empresa" valor={perfil.empresa} />
            <InfoItem etiqueta="Rubro" valor={perfil.rubro} />
            <InfoItem etiqueta="Ubicación" valor={textoUbicacionResumenPerfil} />
            <InfoItem etiqueta="Fecha nacimiento" valor={fechaNacimientoFormateadaResumen} />
            <InfoItem etiqueta="Género" valor={perfil.genero} />
            <InfoItem etiqueta="Biografía" valor={perfil.bio} />
          </div>
        </div>

        <div
          className="datos-panel-right bg-[var(--white-color)] rounded-[var(--radius-md)] border border-[var(--border-color)] shadow-[var(--shadow-sm)] flex flex-col overflow-hidden"
          style={{ minHeight: "580px" }}
        >
          <div className="datos-tabs-bar flex border-b border-[var(--border-color)] shrink-0">
            {titulosTabsPerfil.map((tituloTab, indiceTab) => (
              <button
                key={tituloTab}
                type="button"
                onClick={() => alSeleccionarIndiceTabPerfil(indiceTab)}
                data-active={indiceTabPerfilActivo === indiceTab ? "true" : undefined}
                className={`datos-tab-btn py-4 text-[13px] font-semibold border-b-2 transition-all duration-200 bg-transparent border-x-0 border-t-0 cursor-pointer font-[inherit] whitespace-nowrap shrink-0 ${
                  indiceTabPerfilActivo === indiceTab
                    ? "text-[var(--primary-color)] border-b-[var(--primary-color)]"
                    : "text-[var(--text-muted)] border-b-transparent hover:text-[var(--text-dark)]"
                }`}
                style={{ paddingLeft: indiceTab === 0 ? "24px" : "0", paddingRight: "24px" }}
              >
                {tituloTab}
              </button>
            ))}
          </div>

          <div className="datos-form-content flex-1 flex flex-col overflow-y-auto" style={{ minHeight: "480px" }}>
            {indiceTabPerfilActivo === 0 && (
              <form onSubmit={guardarPerfilUsuario} className="flex flex-col p-6 gap-5 flex-1">
                <div>
                  <label className="block text-[13px] font-semibold text-[var(--text-dark)] mb-3">Imagen de Perfil</label>
                  <div className="relative inline-block">
                    {perfilUsuario.avatar ? (
                      <img
                        src={perfilUsuario.avatar}
                        alt="avatar"
                        className="w-[90px] h-[90px] rounded-full object-cover border-2 border-[var(--border-color)]"
                      />
                    ) : (
                      <div
                        className="w-[90px] h-[90px] rounded-full border-2 border-[var(--primary-color)] flex items-center justify-center text-[32px] font-bold text-white"
                        style={{ background: "var(--gradient-primary)" }}
                      >
                        {inicialNombrePerfil}
                      </div>
                    )}
                    {modoExploracion ? (
                      <button
                        type="button"
                        onClick={comenzarAutenticacion}
                        title="Inicia sesión para cambiar tu foto"
                        className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[var(--primary-color)] border-2 border-[var(--white-color)] flex items-center justify-center cursor-pointer shadow-md"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                      </button>
                    ) : (
                      <label className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[var(--primary-color)] border-2 border-[var(--white-color)] flex items-center justify-center cursor-pointer shadow-md">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const archivo = e.target.files?.[0];
                            alCambiarArchivoAvatarUsuario(archivo);
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 [@media(max-width:560px)]:grid-cols-1">
                  <Field etiqueta="Nombre completo">
                    <input
                      type="text"
                      className={CLASE_CAMPO_TEXTO_DATOS_PERSONALES}
                      placeholder="Tu nombre completo"
                      value={textoNombreCompletoEdicion}
                      onChange={(e) => alCambiarTextoNombreCompletoUsuario(e.target.value)}
                      {...propsCampoDeshabilitadoExploracion}
                    />
                  </Field>
                  <Field etiqueta="Correo electrónico">
                    <input
                      type="email"
                      className={CLASE_CAMPO_TEXTO_DATOS_PERSONALES}
                      placeholder="correo@ejemplo.com"
                      value={perfilUsuario.email}
                      onChange={(e) => establecerCampoPerfilUsuario("email", e.target.value)}
                      {...propsCampoDeshabilitadoExploracion}
                    />
                  </Field>
                  <Field etiqueta="Teléfono">
                    <input
                      type="tel"
                      className={CLASE_CAMPO_TEXTO_DATOS_PERSONALES}
                      placeholder="+51 999 999 999"
                      value={perfilUsuario.telefono}
                      onChange={(e) => establecerCampoPerfilUsuario("telefono", e.target.value)}
                      {...propsCampoDeshabilitadoExploracion}
                    />
                  </Field>
                  <Field etiqueta="DNI / RUC">
                    <input
                      type="text"
                      className={CLASE_CAMPO_TEXTO_DATOS_PERSONALES}
                      placeholder="12345678"
                      value={perfilUsuario.dni}
                      onChange={(e) => establecerCampoPerfilUsuario("dni", e.target.value)}
                      {...propsCampoDeshabilitadoExploracion}
                    />
                  </Field>
                  <Field etiqueta="Género">
                    <SelectField
                      valor={perfilUsuario.genero}
                      alCambiar={(v) => establecerCampoPerfilUsuario("genero", v)}
                      textoPlaceholder="Selecciona"
                      deshabilitado={modoExploracion}
                    >
                      {generosDisponiblesPerfil.map((opcion) => (
                        <option key={opcion} value={opcion}>
                          {opcion}
                        </option>
                      ))}
                    </SelectField>
                  </Field>
                  <Field etiqueta="Fecha de nacimiento">
                    <input
                      type="date"
                      className={CLASE_CAMPO_TEXTO_DATOS_PERSONALES}
                      value={perfilUsuario.fechaNacimiento || ""}
                      onChange={(e) => establecerCampoPerfilUsuario("fechaNacimiento", e.target.value)}
                      max={fechaMaximaNacimientoPermitida}
                      {...propsCampoDeshabilitadoExploracion}
                    />
                  </Field>
                  <Field etiqueta="País">
                    <SelectField
                      valor={perfilUsuario.pais}
                      alCambiar={alCambiarPaisPerfilUsuario}
                      textoPlaceholder="Selecciona tu país"
                      deshabilitado={modoExploracion}
                    >
                      {paisesDisponiblesPerfil.map((pais) => (
                        <option key={pais} value={pais}>
                          {pais}
                        </option>
                      ))}
                    </SelectField>
                  </Field>
                  <Field etiqueta="Ciudad">
                    {ciudadesDisponiblesPerfil.length > 0 ? (
                      <SelectField
                        valor={perfilUsuario.ciudad}
                        alCambiar={(v) => establecerCampoPerfilUsuario("ciudad", v)}
                        textoPlaceholder="Selecciona tu ciudad"
                        deshabilitado={modoExploracion}
                      >
                        {ciudadesDisponiblesPerfil.map((ciudad) => (
                          <option key={ciudad} value={ciudad}>
                            {ciudad}
                          </option>
                        ))}
                      </SelectField>
                    ) : (
                      <input
                        type="text"
                        className={CLASE_CAMPO_TEXTO_DATOS_PERSONALES}
                        placeholder="Selecciona un país primero"
                        disabled
                      />
                    )}
                  </Field>
                  <Field etiqueta="Empresa / Negocio">
                    <input
                      type="text"
                      className={CLASE_CAMPO_TEXTO_DATOS_PERSONALES}
                      placeholder="Nombre de tu empresa"
                      value={perfilUsuario.empresa}
                      onChange={(e) => establecerCampoPerfilUsuario("empresa", e.target.value)}
                      {...propsCampoDeshabilitadoExploracion}
                    />
                  </Field>
                  <Field etiqueta="Cargo / Rol">
                    <SelectField
                      valor={perfilUsuario.cargo}
                      alCambiar={(v) => establecerCampoPerfilUsuario("cargo", v)}
                      textoPlaceholder="Selecciona tu cargo"
                      deshabilitado={modoExploracion}
                    >
                      {cargosDisponiblesPerfil.map((cargo) => (
                        <option key={cargo} value={cargo}>
                          {cargo}
                        </option>
                      ))}
                    </SelectField>
                  </Field>
                  <Field etiqueta="Biografía" ocuparDosColumnas>
                    <textarea
                      className={`${CLASE_CAMPO_TEXTO_DATOS_PERSONALES} resize-none`}
                      rows={3}
                      placeholder="Cuéntanos un poco sobre ti..."
                      value={perfilUsuario.bio}
                      onChange={(e) => establecerCampoPerfilUsuario("bio", e.target.value)}
                      {...propsCampoDeshabilitadoExploracion}
                    />
                  </Field>
                </div>

                {!modoExploracion && (
                  <div className="flex flex-col items-stretch gap-2 pt-2 mt-auto">
                    {mensajeErrorGuardadoPerfil && (
                      <p className="text-[13px] text-[var(--error-color)] m-0 text-right">{mensajeErrorGuardadoPerfil}</p>
                    )}
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={cancelarEdicionPerfilUsuario}
                        disabled={solicitudGuardadoPerfilEnCurso}
                        className="px-6 py-[9px] rounded-[var(--radius-xl)] text-[13px] font-semibold border border-[var(--border-color)] text-[var(--text-muted)] bg-transparent cursor-pointer transition-all duration-200 hover:border-[var(--text-muted)] hover:text-[var(--text-dark)] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={solicitudGuardadoPerfilEnCurso}
                        className="flex items-center gap-2 px-7 py-[9px] rounded-[var(--radius-xl)] text-[13px] font-semibold text-white border-none cursor-pointer transition-[opacity,transform] duration-200 hover:opacity-90 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ background: "var(--gradient-primary)" }}
                      >
                        {solicitudGuardadoPerfilEnCurso ? (
                          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                        {solicitudGuardadoPerfilEnCurso ? "Guardando…" : "Guardar cambios"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}

            {indiceTabPerfilActivo === 1 && (
              <div className="p-6">
                <TabPassword
                  deshabilitado={modoExploracion}
                  contrasenaActualUsuario={contrasenaActualUsuario}
                  nuevaContrasenaUsuario={nuevaContrasenaUsuario}
                  confirmacionNuevaContrasenaUsuario={confirmacionNuevaContrasenaUsuario}
                  alCambiarContrasenaActualUsuario={establecerContrasenaActualUsuario}
                  alCambiarNuevaContrasenaUsuario={establecerNuevaContrasenaUsuario}
                  alCambiarConfirmacionNuevaContrasenaUsuario={establecerConfirmacionNuevaContrasenaUsuario}
                  mensajeErrorCambioContrasena={mensajeErrorCambioContrasena}
                  cambioContrasenaExitoso={cambioContrasenaExitoso}
                  solicitudCambioContrasenaEnCurso={solicitudCambioContrasenaEnCurso}
                  alEnviarCambioContrasena={cambiarPasswordUsuario}
                />
              </div>
            )}

            {indiceTabPerfilActivo === 2 && (
              <div className="p-6">
                <TabNotificaciones
                  elementosNotificacion={elementosNotificacionDisponibles}
                  mapaPreferenciasActivas={mapaPreferenciasNotificacionActivas}
                  alAlternarPreferencia={alAlternarPreferenciaNotificacion}
                  deshabilitado={modoExploracion}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
