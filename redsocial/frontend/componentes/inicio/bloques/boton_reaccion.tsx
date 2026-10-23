import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { PanelReacciones } from './panel_reacciones'
import { usarPanelReacciones } from './usar_panel_reacciones'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { BotonReaccionProps, ClaveReaccion, OpcionReaccion } from '@/tipos/inicio/contrato_reacciones'

const configuracion = catalogoInicio.reacciones
const OPCIONES = configuracion.opciones as readonly OpcionReaccion[]
const REACCION_PREDETERMINADA: ClaveReaccion = 'me_gusta'

export function BotonReaccion({ reaccion, variante, onReaccionar }: BotonReaccionProps) {
  const panel = usarPanelReacciones()
  const opcion = OPCIONES.find((candidata) => candidata.clave === reaccion)
  const etiqueta = opcion?.etiqueta ?? catalogoInicio.botones.me_gusta
  const esPublicacion = variante === 'publicacion'

  function alPulsar() {
    if (panel.consumirPulsacionLarga()) return
    panel.cerrar()
    onReaccionar(reaccion ?? REACCION_PREDETERMINADA)
  }

  function alElegir(clave: ClaveReaccion) {
    panel.cerrar()
    onReaccionar(clave)
  }

  return (
    <div {...panel.propsContenedor} className={esPublicacion ? configuracion.clases.contenedor_publicacion : configuracion.clases.contenedor_comentario}>
      {esPublicacion ? (
        <Boton
          type="button"
          variant="fantasma"
          size="default"
          activo={reaccion !== null}
          aria-pressed={reaccion !== null}
          onClick={alPulsar}
          {...panel.propsBoton}
          className={`min-w-0 flex-1 ${opcion?.clase_color ?? ''}`}
        >
          <Icono name={(opcion?.icono ?? configuracion.icono_predeterminado) as IconName} className="h-4 w-4" />
          <span className="max-380:sr-only">{etiqueta}</span>
        </Boton>
      ) : (
        <Boton
          type="button"
          variant="fantasma"
          size="enlace_accion"
          aria-pressed={reaccion !== null}
          onClick={alPulsar}
          {...panel.propsBoton}
          className={`rounded-md px-1 py-0.5 ${opcion?.clase_color ?? ''}`}
        >
          {etiqueta}
        </Boton>
      )}
      {panel.abierto && <PanelReacciones opciones={OPCIONES} onElegir={alElegir} />}
    </div>
  )
}
