import React from "react";
import PasswordField from "./PasswordField";

export default function TabPassword({
  deshabilitado,
  contrasenaActualUsuario,
  nuevaContrasenaUsuario,
  confirmacionNuevaContrasenaUsuario,
  alCambiarContrasenaActualUsuario,
  alCambiarNuevaContrasenaUsuario,
  alCambiarConfirmacionNuevaContrasenaUsuario,
  mensajeErrorCambioContrasena,
  cambioContrasenaExitoso,
  solicitudCambioContrasenaEnCurso,
  alEnviarCambioContrasena,
}) {
  return (
    <form onSubmit={alEnviarCambioContrasena} className="flex flex-col gap-4">
      <PasswordField
        etiqueta="Contraseña actual"
        textoPlaceholder="Tu contraseña actual"
        valor={contrasenaActualUsuario}
        alCambiarValor={alCambiarContrasenaActualUsuario}
        deshabilitado={deshabilitado}
      />
      <PasswordField
        etiqueta="Nueva contraseña"
        textoPlaceholder="Mínimo 8 caracteres"
        valor={nuevaContrasenaUsuario}
        alCambiarValor={alCambiarNuevaContrasenaUsuario}
        deshabilitado={deshabilitado}
      />
      <PasswordField
        etiqueta="Confirmar contraseña"
        textoPlaceholder="Repite la nueva contraseña"
        valor={confirmacionNuevaContrasenaUsuario}
        alCambiarValor={alCambiarConfirmacionNuevaContrasenaUsuario}
        deshabilitado={deshabilitado}
      />

      {mensajeErrorCambioContrasena && (
        <div className="flex items-center gap-2 px-4 py-[10px] rounded-[var(--radius-sm)] bg-[var(--error-bg)] border border-[var(--error-color)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--error-color)" strokeWidth="2" strokeLinecap="round" className="shrink-0">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-[13px] text-[var(--error-color)] m-0">{mensajeErrorCambioContrasena}</p>
        </div>
      )}

      {cambioContrasenaExitoso && (
        <div className="flex items-center gap-2 px-4 py-[10px] rounded-[var(--radius-sm)] bg-[var(--success-bg)] border border-[var(--success-border)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success-color)" strokeWidth="2.5" strokeLinecap="round" className="shrink-0">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <p className="text-[13px] text-[var(--success-color)] font-semibold m-0">Contraseña actualizada. Cerrando sesión...</p>
        </div>
      )}

      <div className="flex justify-end mt-auto pt-2">
        <button
          type="submit"
          disabled={deshabilitado || solicitudCambioContrasenaEnCurso}
          className="flex items-center gap-2 px-7 py-[9px] rounded-[var(--radius-xl)] text-[13px] font-semibold text-white border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          style={{ background: "var(--gradient-primary)" }}
        >
          {solicitudCambioContrasenaEnCurso ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Verificando...
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Cambiar contraseña
            </>
          )}
        </button>
      </div>
    </form>
  );
}
