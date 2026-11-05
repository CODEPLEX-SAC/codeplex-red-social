import { Boton } from '../../compartido/interfaz/boton'
import { IndicadorCarga } from '../../compartido/interfaz/indicador_carga'
import { Icono } from '../../compartido/icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { CampoContrasena } from './campo_contrasena'
import { CampoCorreoAcceso } from './campo_correo_acceso'
import { ConfirmacionCorreoAcceso } from './confirmacion_correo_acceso'
import { TerminosAceptacionAcceso } from './terminos_aceptacion_acceso'
import { usarCrearCuenta } from './usar_crear_cuenta'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { FormularioCrearCuentaProps } from '@/tipos/acceso/contrato_acceso'

const textos = catalogoAcceso

export function FormularioCrearCuenta({ onVolverAIniciarSesion }: FormularioCrearCuentaProps) {
  const formulario = usarCrearCuenta()
  const { errores, cargando, exitoso } = formulario

  if (formulario.correoEnviado) return <ConfirmacionCorreoAcceso correo={formulario.correo.trim()} onVolver={onVolverAIniciarSesion} />

  return (
    <form noValidate onSubmit={formulario.enviar} aria-busy={cargando} className="flex flex-col gap-3.5">
      <CampoTexto
        id={textos.ids.nombre}
        etiqueta={textos.campos.nombre}
        valor={formulario.nombre}
        alCambiar={formulario.cambiarNombre}
        iconoInicio={<Icono name={textos.iconos_campos.nombre as IconName} className={catalogoAcceso.clase_icono_campo} />}
        error={errores.nombre !== ''}
        mensajeError={errores.nombre}
        inputProps={{ autoComplete: textos.autocompletar.nombre }}
      />

      <CampoCorreoAcceso valor={formulario.correo} error={errores.correo} onCambiar={formulario.cambiarCorreo} />

      <CampoContrasena variante="nueva" valor={formulario.contrasena} error={errores.contrasena} onCambiar={formulario.cambiarContrasena} />
      <CampoContrasena variante="confirmacion" valor={formulario.confirmacion} error={errores.confirmacion} onCambiar={formulario.cambiarConfirmacion} />

      <TerminosAceptacionAcceso aceptados={formulario.terminos} error={errores.terminos} onCambiar={formulario.cambiarTerminos} />

      <Boton type="submit" variant={exitoso ? 'exito' : 'primario'} size="md" disabled={cargando || exitoso} aria-live="polite" className="w-full disabled:cursor-not-allowed disabled:opacity-80">
        {cargando && <IndicadorCarga tamano="xs" color="blanco" />}
        {cargando && <span className="sr-only">{textos.mensajes.creando_cuenta}</span>}
        {exitoso && textos.mensajes.cuenta_creada}
        {!cargando && !exitoso && textos.botones.crear_cuenta}
      </Boton>
    </form>
  )
}
