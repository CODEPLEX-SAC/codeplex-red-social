import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Icono } from '../../compartido/icono'
import { Menu } from '../../compartido/interfaz/menu'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { clasesChip } from '../../compartido/interfaz/chip_filtro'
import { useLayoutEffect, useRef, useState } from 'react'
import { FilaConversacion } from './fila_conversacion'
import { ModalCrearGrupo } from './modal_crear_grupo'
import { estaSinLeer } from './logica_acciones_conversacion'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { FiltroConversaciones, ListaConversacionesProps } from '@/tipos/mensajeria/contrato_lista_conversaciones'

const clases = catalogoMensajeria.clases.lista
const textosGrupos = catalogoMensajeria.grupos

export function ListaConversaciones({ conversaciones, activa, onSeleccionar, oculta, contadorNoLeidos, acciones, historias, participantes, onCrearGrupo }: ListaConversacionesProps) {
  const pistaRef = useRef<HTMLDivElement>(null)
  const scrollGuardado = useRef(0)
  const [ultimaTocada, setUltimaTocada] = useState<string | null>(null)
  const [filtro, setFiltro] = useState<FiltroConversaciones>('todos')
  const [verGrupos, setVerGrupos] = useState(false)
  const [anclaMenu, setAnclaMenu] = useState<HTMLElement | null>(null)
  const [creandoGrupo, setCreandoGrupo] = useState(false)
  const visibles = verGrupos
    ? conversaciones.filter((c) => c.esGrupo)
    : conversaciones.filter((c) => (filtro === 'no_leidos' ? estaSinLeer(c) : filtro === 'favoritos' ? c.favorita : true))
  const chips: [FiltroConversaciones, string][] = [['todos', catalogoMensajeria.titulos_pestanas.todos], ['no_leidos', catalogoMensajeria.titulos_pestanas.no_leidos], ['favoritos', catalogoMensajeria.titulos_pestanas.favoritos]]

  useLayoutEffect(() => {
    if (!oculta && pistaRef.current) {
      pistaRef.current.scrollTop = scrollGuardado.current
    }
  }, [oculta])

  function alSeleccionar(id: string) {
    if (pistaRef.current) scrollGuardado.current = pistaRef.current.scrollTop
    onSeleccionar(id)
  }

  return (
    <aside data-zona="lista-conversaciones" className={`${clases.contenedor} ${oculta ? clases.oculta : ''}`}>
      <CampoBusqueda placeholder={catalogoMensajeria.placeholders.buscar_mensajes} aria-label={catalogoMensajeria.placeholders.buscar_mensajes} className={clases.buscador} />

      {verGrupos ? (
        <div className={clases.cabecera_grupos}>
          <BotonIcono icono="flecha-izquierda" type="button" variant="discreto" size="default" aria-label={textosGrupos.volver} onClick={() => setVerGrupos(false)} />
          <h2 className={clases.cabecera_grupos_titulo}>{textosGrupos.titulo}</h2>
          <Boton type="button" variant="contorno" size="default" className={clases.boton_crear_grupo} onClick={() => setCreandoGrupo(true)}>
            <Icono name="mas" className="h-4 w-4" />
            {textosGrupos.crear}
          </Boton>
        </div>
      ) : (
        <div className={clases.filtros}>
          {chips.map(([clave, titulo]) => (
            <button key={clave} type="button" aria-pressed={filtro === clave} onClick={() => setFiltro(clave)} className={clasesChip({ activo: filtro === clave, className: clases.chip })}>
              {titulo}
              {clave === 'no_leidos' && contadorNoLeidos > 0 && <span className={clases.chip_conteo}>{contadorNoLeidos}</span>}
            </button>
          ))}
          <BotonIcono icono="puntos-verticales" type="button" variant="discreto" size="default" className={clases.filtros_menu} aria-label={textosGrupos.menu} aria-haspopup="menu" aria-expanded={Boolean(anclaMenu)} onClick={(evento) => setAnclaMenu(evento.currentTarget)} />
          <Menu ancla={anclaMenu} alCerrar={() => setAnclaMenu(null)} elementos={[{ icono: 'grupo', etiqueta: textosGrupos.opcion, alHacerClick: () => setVerGrupos(true) }]} />
        </div>
      )}

      <div ref={pistaRef} className={clases.pista}>
        {verGrupos && visibles.length === 0 && <p className={clases.vacia}>{textosGrupos.vacia}</p>}
        {!verGrupos && filtro !== 'todos' && visibles.length === 0 && <p className={clases.vacia}>{catalogoMensajeria.acciones_conversacion.lista_vacia[filtro]}</p>}
        {visibles.map((c) => (
          <FilaConversacion
            key={c.id}
            conversacion={c}
            activa={c.id === activa}
            tactil={c.id === ultimaTocada}
            estadoHistorias={(c.identificadores.participantId && historias?.porParticipante[c.identificadores.participantId]?.estado) || 'ninguna'}
            acciones={acciones}
            onSeleccionar={alSeleccionar}
            onTocar={setUltimaTocada}
            onAbrirHistorias={(participantId) => historias?.abrir(participantId)}
          />
        ))}
      </div>
      {creandoGrupo && (
        <ModalCrearGrupo
          participantes={participantes}
          nombresExistentes={conversaciones.filter((c) => c.esGrupo).map((c) => c.nombre)}
          onCerrar={() => setCreandoGrupo(false)}
          onCrear={(datos) => {
            alSeleccionar(onCrearGrupo(datos))
            setCreandoGrupo(false)
          }}
        />
      )}
    </aside>
  )
}
