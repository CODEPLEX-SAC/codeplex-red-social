import { Boton } from '../../compartido/interfaz/boton'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { CampoContrasena } from './campo_contrasena'
import { ConfirmacionCorreoAcceso } from './confirmacion_correo_acceso'
import { usarCrearCuenta } from './usar_crear_cuenta'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'
import type { FormularioCrearCuentaProps } from '@/tipos/acceso/contrato_acceso'

const textos = catalogoAcceso

export function FormularioCrearCuenta({ onVolverAIniciarSesion }: FormularioCrearCuentaProps) {
  const formulario = usarCrearCuenta()
  const { errores, cargando, exitoso } = formulario

  if (formulario.correoEnviado) return <ConfirmacionCorreoAcceso correo={formulario.correo.trim()} onVolver={onVolverAIniciarSesion} />

  return (
    <form noValidate onSubmit={formulario.enviar} aria-busy={cargando} className="flex flex-col gap-3.5">
      <div>
        <label htmlFor={textos.ids.nombre} className="mb-1.5 block text-auxiliar font-bold text-texto">
          {textos.campos.nombre}
        </label>
        <CampoTexto
          id={textos.ids.nombre}
          valor={formulario.nombre}
          alCambiar={formulario.cambiarNombre}
          marcador={textos.placeholders.nombre}
          error={errores.nombre !== ''}
          mensajeError={errores.nombre}
          inputProps={{ autoComplete: textos.autocompletar.nombre }}
        />
      </div>

      <div>
        <label htmlFor={textos.ids.correo} className="mb-1.5 block text-auxiliar font-bold text-texto">
          {textos.campos.correo}
        </label>
        <CampoTexto
          id={textos.ids.correo}
          valor={formulario.correo}
          alCambiar={formulario.cambiarCorreo}
          tipo="email"
          marcador={textos.placeholders.correo}
          error={errores.correo !== ''}
          mensajeError={errores.correo}
          inputProps={{ autoComplete: textos.autocompletar.correo }}
        />
      </div>

      <CampoContrasena variante="nueva" valor={formulario.contrasena} error={errores.contrasena} onCambiar={formulario.cambiarContrasena} />
      <CampoContrasena variante="confirmacion" valor={formulario.confirmacion} error={errores.confirmacion} onCambiar={formulario.cambiarConfirmacion} />

      <p className="m-0 text-center text-auxiliar leading-1.55 text-texto-suave">{textos.mensajes.terminos}</p>

      <Boton type="submit" variant={exitoso ? 'exito' : 'primario'} size="md" disabled={cargando || exitoso} aria-live="polite" className="w-full disabled:cursor-not-allowed disabled:opacity-80">
        {cargando && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
        {cargando && <span className="sr-only">{textos.mensajes.creando_cuenta}</span>}
        {exitoso && textos.mensajes.cuenta_creada}
        {!cargando && !exitoso && textos.botones.crear_cuenta}
      </Boton>
    </form>
  )
}
