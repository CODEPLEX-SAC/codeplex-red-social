export type ModoAcceso = 'iniciar_sesion' | 'crear_cuenta'

export interface CredencialesAcceso {
  correo: string
  contrasena: string
}

export interface ErroresInicioSesion {
  correo: string
  contrasena: string
}

export interface ErroresCrearCuenta {
  nombre: string
  correo: string
  contrasena: string
  confirmacion: string
}

export type VarianteCampoContrasena = 'acceso' | 'nueva' | 'confirmacion'

export interface SelectorModoAccesoProps {
  modo: ModoAcceso
  onCambiar: (modo: ModoAcceso) => void
}

export interface CampoContrasenaProps {
  variante: VarianteCampoContrasena
  valor: string
  error: string
  onCambiar: (valor: string) => void
}

export interface FormularioInicioSesionProps {
  onAcceder: () => void
  credencialesIniciales?: CredencialesAcceso
}

export interface FormularioCrearCuentaProps {
  onVolverAIniciarSesion: () => void
}

export interface ConfirmacionCorreoAccesoProps {
  correo: string
  onVolver: () => void
}

export interface PanelFormularioAccesoProps {
  modo: ModoAcceso
  onCambiarModo: (modo: ModoAcceso) => void
  onAcceder: () => void
}

export interface PanelVisualAccesoProps {
  obtenerUrlImagen: (archivo: string) => string
}
