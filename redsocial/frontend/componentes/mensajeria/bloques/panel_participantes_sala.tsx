import { useState } from 'react'
import { Acordeon } from '../../compartido/interfaz/acordeon'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { Modal } from '../../compartido/interfaz/modal'
import { usarVistaMovil } from '../../compartido/interfaz/usar_vista_movil'
import { BuscadorContactosInvitar } from './buscador_contactos_invitar'
import { ListaParticipantesSala } from './lista_participantes_sala'
import { agruparParticipantes, buscarParticipantes } from './logica_sala_llamada'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { PanelParticipantesSalaProps, SeccionPersonas } from '@/tipos/mensajeria/contrato_sala_llamada'

const panel = catalogoMensajeria.videollamada.textos.panel
const clases = catalogoMensajeria.videollamada.clases.sala
const SECCIONES: SeccionPersonas[] = ['manos', 'colaboradores', 'invitados']

export function PanelParticipantesSala({ participantes, contactos, invitaciones, fijadoId, onFijar, onGestionar, onEscribir, onCerrar }: PanelParticipantesSalaProps) {
  const [consulta, setConsulta] = useState(String())
  const movil = usarVistaMovil()
  const [agregando, setAgregando] = useState(false)
  const [aviso, setAviso] = useState(String())
  const manos = participantes.filter((participante) => participante.manoLevantada).length
  const esOrganizador = participantes.some((participante) => participante.local && participante.organizador)
  const grupos = agruparParticipantes(buscarParticipantes(participantes, consulta))
  const secciones = SECCIONES.filter((seccion) => grupos[seccion].length > 0)
  const elementos = secciones.map((seccion) => ({
    id: seccion,
    titulo: `${panel.secciones[seccion]} (${grupos[seccion].length})`,
    contenido: <ListaParticipantesSala participantes={grupos[seccion]} esOrganizador={esOrganizador} fijadoId={fijadoId} onFijar={onFijar} onGestionar={onGestionar} onAviso={setAviso} onEscribir={onEscribir} />,
  }))

  return (
    <aside aria-label={panel.titulo} className={clases.panel}>
      <div className={clases.panel_cabecera}>
        <h2 className={clases.panel_titulo}>
          {panel.titulo} ({participantes.length})
        </h2>
        <BotonIcono icono="cerrar" type="button" aria-label={panel.cerrar} variant="discreto" size="default" onClick={onCerrar} />
      </div>
      {manos > 0 && (
        <p aria-live="polite" className={clases.panel_manos}>
          {panel.manos.replace(':n', String(manos))}
        </p>
      )}
      <Boton type="button" variant="primario" size="default" className={clases.panel_agregar} aria-expanded={agregando} onClick={() => setAgregando(true)}>
        {panel.agregar}
      </Boton>
      <CampoBusqueda placeholder={movil ? panel.buscar_corto : panel.buscar} aria-label={panel.etiqueta_busqueda} value={consulta} onChange={(evento) => setConsulta(evento.target.value)} />
      <div className={clases.panel_secciones}>
        <p className={clases.panel_etiqueta}>{panel.en_la_reunion}</p>
        {elementos.length === 0 && <p className={clases.panel_vacio}>{panel.sin_resultados}</p>}
        {elementos.length > 0 && <Acordeon elementos={elementos} multiple />}
        {aviso !== String() && (
          <p aria-live="polite" className={clases.panel_aviso}>
            {aviso}
          </p>
        )}
        {agregando && (
          <Modal titulo={panel.agregar} etiquetaCerrar={panel.cerrar} onCerrar={() => setAgregando(false)} className={clases.agregar_modal}>
            <div className={clases.agregar_cuerpo}>
              <BuscadorContactosInvitar contactos={contactos} invitaciones={invitaciones} />
            </div>
          </Modal>
        )}
      </div>
    </aside>
  )
}
