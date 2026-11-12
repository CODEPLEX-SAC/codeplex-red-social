import { clasesBoton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { CLASE_ENLACE_ACCION_SECUNDARIO } from '../../compartido/clases_enlace'
import { subtituloPreparacion, tituloPreparacion } from './logica_preparacion_llamada'
import { SeccionDispositivos } from './seccion_dispositivos'
import { VistaPreviaLlamada } from './vista_previa_llamada'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { SeccionVideollamadaIniciarProps } from '@/tipos/mensajeria/contrato_preparacion_llamada'

const clases = catalogoMensajeria.videollamada.clases.preparacion

export function SeccionVideollamadaIniciar({ usuario, contacto, esReunion, preparacion, enlaceInicio }: SeccionVideollamadaIniciarProps) {
  return (
    <section className="min-w-0">
      <div className={clases.cabecera}>
        <div>
          <h1 className={clases.titulo}>{tituloPreparacion(esReunion)}</h1>
          <p className={clases.subtitulo}>{subtituloPreparacion(contacto, esReunion)}</p>
        </div>
      </div>

      <VistaPreviaLlamada nombre={usuario} preparacion={preparacion} />

      <SeccionDispositivos preparacion={preparacion} />

      <a href={enlaceInicio} className={clasesBoton({ variant: 'primario', size: 'cta', className: clases.accion_principal })}>
        <Icono name="video" className="h-4 w-4" /> {catalogoMensajeria.botones.iniciar_videollamada}
      </a>
      <a href={catalogoMensajeria.rutas.videollamadas} className={[CLASE_ENLACE_ACCION_SECUNDARIO, clases.accion_cancelar].join(' ')}>
        {catalogoMensajeria.botones.cancelar}
      </a>
    </section>
  )
}
