import { useState } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Menu, irARuta } from '../../compartido/interfaz/menu'
import { Tooltip } from '../../compartido/interfaz/tooltip'
import { usarVistaMovil } from '../../compartido/interfaz/usar_vista_movil'
import { alternarPantallaCompleta } from './logica_estado_sala'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { MenuAbiertoSala } from '@/tipos/mensajeria/contrato_integracion_llamada'
import type { usarSalaLlamada } from './usar_sala_llamada'

const textos = catalogoMensajeria.videollamada.textos
const clases = catalogoMensajeria.videollamada.clases.sala

function Control({ texto, icono, variante = 'llamada', pulsado, insignia, ocultoMovil = false, onClick }: { texto: string; icono: IconName; variante?: 'llamada' | 'llamada_alerta' | 'llamada_fin'; pulsado?: boolean; insignia?: number; ocultoMovil?: boolean; onClick: (ancla: HTMLElement) => void }) {
  return (
    <Tooltip texto={texto}>
      <span className={[clases.control_contenedor, ocultoMovil ? clases.oculto_movil : String()].join(' ')}>
        <BotonIcono icono={icono} type="button" aria-label={texto} aria-pressed={pulsado} variant={variante} size="llamada" className={clases.control_boton} onClick={(evento) => onClick(evento.currentTarget)} />
        {insignia !== undefined && (
          <span aria-hidden="true" className={clases.control_insignia}>
            {insignia}
          </span>
        )}
      </span>
    </Tooltip>
  )
}

function elegir<T>(activo: boolean, siActivo: T, siInactivo: T): T {
  if (activo) return siActivo
  return siInactivo
}

export function BarraControlesSala({ sala }: { sala: ReturnType<typeof usarSalaLlamada> }) {
  const [menu, setMenu] = useState<MenuAbiertoSala>(null)
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const { micActivo, camaraActiva, presentacion } = sala
  const movil = usarVistaMovil()
  const elementosReacciones: ElementoMenu[] = textos.reacciones.map((reaccion) => ({ etiqueta: reaccion.etiqueta, icono: reaccion.icono as IconName, alHacerClick: () => sala.reaccionar(reaccion.icono as IconName) }))
  const mano: ElementoMenu = { etiqueta: elegir(sala.manoLevantada, textos.sala.bajar_mano, textos.sala.levantar_mano), icono: 'mano', alHacerClick: sala.alternarMano }
  const mensajes: ElementoMenu = { etiqueta: textos.sala.mensajes_llamada, icono: 'comentario', alHacerClick: () => sala.alternarPanel('chat') }
  const compartir: ElementoMenu = { etiqueta: elegir(presentacion !== null, textos.sala.dejar_de_compartir, textos.sala.compartir), icono: 'pantalla-compartida', alHacerClick: () => (presentacion !== null ? sala.detenerPresentacion() : void sala.iniciarPresentacion()) }
  const pantallaCompleta: ElementoMenu = { etiqueta: textos.sala.pantalla_completa, icono: 'pantalla-completa', alHacerClick: alternarPantallaCompleta }
  const informar: ElementoMenu = { etiqueta: textos.sala.informar_problema, icono: 'aviso', alHacerClick: sala.abrirInforme }
  const elementosMas: ElementoMenu[] = elegir<ElementoMenu[]>(movil, [mano, mensajes, compartir, pantallaCompleta, informar], [pantallaCompleta, mensajes, informar])

  const alternarPresentacion = elegir(presentacion !== null, sala.detenerPresentacion, () => void sala.iniciarPresentacion())
  const abrirReacciones = (elemento: HTMLElement) => abrirMenu('reacciones', elemento)
  const abrirMas = (elemento: HTMLElement) => abrirMenu('mas', elemento)
  const alternarChat = () => sala.alternarPanel('chat')
  const cerrarMenu = () => setAncla(null)
  const terminar = elegir<() => void>(sala.esOrganizador, sala.abrirSalida, salirDeLaLlamada)

  function salirDeLaLlamada() {
    irARuta(catalogoMensajeria.rutas.videollamadas)
  }

  function abrirMenu(nombre: MenuAbiertoSala, elemento: HTMLElement) {
    setAncla(ancla && menu === nombre ? null : elemento)
    setMenu(nombre)
  }

  return (
    <div role="toolbar" aria-label={textos.sala.controles} className={clases.controles}>
      <Control texto={elegir(micActivo, textos.sala.microfono_silenciar, textos.sala.microfono_activar)} icono={elegir<IconName>(micActivo, 'microfono', 'microfono-apagado')} variante={elegir<'llamada' | 'llamada_alerta'>(micActivo, 'llamada', 'llamada_alerta')} pulsado={!micActivo} onClick={sala.alternarMicrofono} />
      <Control texto={elegir(camaraActiva, textos.sala.camara_apagar, textos.sala.camara_activar)} icono={elegir<IconName>(camaraActiva, 'video', 'video-apagado')} variante={elegir<'llamada' | 'llamada_alerta'>(camaraActiva, 'llamada', 'llamada_alerta')} pulsado={!camaraActiva} onClick={sala.alternarCamara} />
      <Control texto={elegir(presentacion !== null, textos.sala.dejar_de_compartir, textos.sala.compartir)} icono="pantalla-compartida" pulsado={presentacion !== null} ocultoMovil onClick={alternarPresentacion} />
      <Control texto={textos.sala.reacciones} icono="sentimiento" onClick={abrirReacciones} />
      <Control texto={elegir(sala.manoLevantada, textos.sala.bajar_mano, textos.sala.levantar_mano)} icono="mano" pulsado={sala.manoLevantada} ocultoMovil onClick={sala.alternarMano} />
      <Control texto={textos.sala.chat} icono="comentario" pulsado={sala.panel === 'chat'} ocultoMovil onClick={alternarChat} />
      <Control texto={textos.sala.mas_opciones} icono={elegir<IconName>(movil, 'puntos-verticales', 'puntos')} onClick={abrirMas} />
      <span className={clases.control_separador}>
        <Control texto={textos.sala.finalizar} icono="llamada" variante="llamada_fin" onClick={terminar} />
      </span>
      {ancla && menu === 'reacciones' && <Menu ancla={ancla} alCerrar={cerrarMenu} elementos={elementosReacciones} arriba />}
      {ancla && menu === 'mas' && <Menu ancla={ancla} alCerrar={cerrarMenu} elementos={elementosMas} arriba />}
    </div>
  )
}
