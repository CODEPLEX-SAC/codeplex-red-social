import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { Casilla } from '../../compartido/interfaz/casilla'
import { IndicadorCarga } from '../../compartido/interfaz/indicador_carga'
import { CampoContrasena } from './campo_contrasena'
import { CampoCorreoAcceso } from './campo_correo_acceso'
import { usarInicioSesion } from './usar_inicio_sesion'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'
import type { FormularioInicioSesionProps } from '@/tipos/acceso/contrato_acceso'

export function FormularioInicioSesion({ onAcceder }: FormularioInicioSesionProps) {
  const formulario = usarInicioSesion(onAcceder)
  const [recordar, setRecordar] = useState(false)
  const { errores, cargando, exitoso } = formulario

  return (
    <form noValidate onSubmit={formulario.enviar} aria-busy={cargando} className="flex flex-col gap-3.5">
      <CampoCorreoAcceso valor={formulario.correo} error={errores.correo} onCambiar={formulario.cambiarCorreo} />
      <CampoContrasena variante="acceso" valor={formulario.contrasena} error={errores.contrasena} onCambiar={formulario.cambiarContrasena} />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <Casilla id={catalogoAcceso.ids.recordar} seleccionado={recordar} alCambiar={(_, marcado) => setRecordar(marcado)} etiqueta={catalogoAcceso.recordar_sesion} />
        <Boton type="button" variant="enlace" size="enlace_accion" disabled title={catalogoAcceso.mensajes.olvido_proximamente} className="disabled:cursor-not-allowed disabled:opacity-60">
          {catalogoAcceso.olvido_contrasena}
        </Boton>
      </div>

      <Boton
        type="submit"
        variant={exitoso ? 'exito' : 'primario'}
        size="md"
        disabled={cargando || exitoso}
        aria-live="polite"
        className="w-full disabled:cursor-not-allowed disabled:opacity-80"
      >
        {cargando && <IndicadorCarga tamano="xs" color="blanco" />}
        {cargando && <span className="sr-only">{catalogoAcceso.mensajes.validando_acceso}</span>}
        {exitoso && catalogoAcceso.mensajes.acceso_concedido}
        {!cargando && !exitoso && catalogoAcceso.botones.iniciar_sesion}
      </Boton>
    </form>
  )
}
