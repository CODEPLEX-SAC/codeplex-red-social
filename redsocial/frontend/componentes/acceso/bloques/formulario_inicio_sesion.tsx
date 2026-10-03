import { Boton } from '../../compartido/interfaz/boton'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { CampoContrasena } from './campo_contrasena'
import { usarInicioSesion } from './usar_inicio_sesion'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'
import type { FormularioInicioSesionProps } from '@/tipos/acceso/contrato_acceso'

export function FormularioInicioSesion({ onAcceder, credencialesIniciales }: FormularioInicioSesionProps) {
  const formulario = usarInicioSesion(onAcceder, credencialesIniciales)
  const { errores, cargando, exitoso } = formulario

  return (
    <form noValidate onSubmit={formulario.enviar} aria-busy={cargando} className="flex flex-col gap-3.5">
      <div>
        <label htmlFor={catalogoAcceso.ids.correo} className="mb-1.5 block text-auxiliar font-bold text-texto">
          {catalogoAcceso.campos.correo}
        </label>
        <CampoTexto
          id={catalogoAcceso.ids.correo}
          valor={formulario.correo}
          alCambiar={formulario.cambiarCorreo}
          tipo="email"
          marcador={catalogoAcceso.placeholders.correo}
          error={errores.correo !== ''}
          mensajeError={errores.correo}
          inputProps={{ autoComplete: catalogoAcceso.autocompletar.correo }}
        />
      </div>

      <CampoContrasena variante="acceso" valor={formulario.contrasena} error={errores.contrasena} onCambiar={formulario.cambiarContrasena} />

      <Boton
        type="submit"
        variant={exitoso ? 'exito' : 'primario'}
        size="md"
        disabled={cargando || exitoso}
        aria-live="polite"
        className="mt-1 w-full disabled:cursor-not-allowed disabled:opacity-80"
      >
        {cargando && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
        {cargando && <span className="sr-only">{catalogoAcceso.mensajes.validando_acceso}</span>}
        {exitoso && catalogoAcceso.mensajes.acceso_concedido}
        {!cargando && !exitoso && catalogoAcceso.botones.iniciar_sesion}
      </Boton>
    </form>
  )
}
