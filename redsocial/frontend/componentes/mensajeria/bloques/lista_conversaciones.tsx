import { useMemo } from 'react'
import { Boton, BotonIcono, Icono, Menu, CampoBusqueda, clasesChip, MensajeEstadoBusqueda } from '../../compartido'
import { FilaConversacion } from './fila_conversacion'
import { ModalCrearGrupo } from './modal_crear_grupo'
import { usarListaConversaciones } from './usar_lista_conversaciones'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { DatosNuevoGrupo, FiltroConversaciones, ListaConversacionesProps } from '@/tipos/mensajeria/contrato_lista_conversaciones'

const clases = catalogoMensajeria.clases.lista
const textosGrupos = catalogoMensajeria.grupos

export function ListaConversaciones(props: ListaConversacionesProps) {
  const { conversaciones, activa, oculta, contadorNoLeidos, acciones, historias, participantes, onCrearGrupo } = props
  const { pistaRef, ultimaTocada, setUltimaTocada, filtro, setFiltro, verGrupos, setVerGrupos, anclaMenu, setAnclaMenu, creandoGrupo, setCreandoGrupo, busqueda, visibles, buscando, alSeleccionar } = usarListaConversaciones(props)
  const chips: [FiltroConversaciones, string][] = [['todos', catalogoMensajeria.titulos_pestanas.todos], ['no_leidos', catalogoMensajeria.titulos_pestanas.no_leidos], ['favoritos', catalogoMensajeria.titulos_pestanas.favoritos]]

  const nombresDeGrupos = useMemo(() => conversaciones.filter((c) => c.esGrupo).map((c) => c.nombre), [conversaciones])

  function alCambiarTexto(evento: { target: { value: string } }) {
    busqueda.cambiarTexto(evento.target.value)
  }

  function abrirMenu(evento: { currentTarget: HTMLElement }) {
    setAnclaMenu(evento.currentTarget)
  }

  function cerrarMenu() {
    setAnclaMenu(null)
  }

  function mostrarGrupos() {
    setVerGrupos(true)
  }

  function ocultarGrupos() {
    setVerGrupos(false)
  }

  function abrirCreacionGrupo() {
    setCreandoGrupo(true)
  }

  function cerrarCreacionGrupo() {
    setCreandoGrupo(false)
  }

  function crearGrupo(datos: DatosNuevoGrupo) {
    alSeleccionar(onCrearGrupo(datos))
    setCreandoGrupo(false)
  }

  return (
    <aside data-zona="lista-conversaciones" className={`${clases.contenedor} ${oculta ? clases.oculta : ''}`}>
      <CampoBusqueda placeholder={catalogoMensajeria.placeholders.buscar_mensajes} aria-label={catalogoMensajeria.placeholders.buscar_mensajes} className={clases.buscador} value={busqueda.texto} onChange={alCambiarTexto} />

      {verGrupos ? (
        <div className={clases.cabecera_grupos}>
          <BotonIcono icono="flecha-izquierda" type="button" variant="discreto" size="default" aria-label={textosGrupos.volver} onClick={ocultarGrupos} />
          <h2 className={clases.cabecera_grupos_titulo}>{textosGrupos.titulo}</h2>
          <Boton type="button" variant="contorno" size="default" className={clases.boton_crear_grupo} onClick={abrirCreacionGrupo}>
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
          <BotonIcono icono="puntos-verticales" type="button" variant="discreto" size="default" className={clases.filtros_menu} aria-label={textosGrupos.menu} aria-haspopup="menu" aria-expanded={Boolean(anclaMenu)} onClick={abrirMenu} />
          <Menu ancla={anclaMenu} alCerrar={cerrarMenu} elementos={[{ icono: 'grupo', etiqueta: textosGrupos.opcion, alHacerClick: mostrarGrupos }]} />
        </div>
      )}

      <div ref={pistaRef} className={clases.pista}>
        <MensajeEstadoBusqueda estado={busqueda.estado} error={busqueda.error} sinCoincidencias={false} />
        {busqueda.estado === 'sin_coincidencias' && <p className={clases.vacia}>{catalogoMensajeria.acciones_conversacion.sin_resultados_busqueda}</p>}
        {!buscando && verGrupos && visibles.length === 0 && <p className={clases.vacia}>{textosGrupos.vacia}</p>}
        {!buscando && !verGrupos && filtro !== 'todos' && visibles.length === 0 && <p className={clases.vacia}>{catalogoMensajeria.acciones_conversacion.lista_vacia[filtro]}</p>}
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
          nombresExistentes={nombresDeGrupos}
          onCerrar={cerrarCreacionGrupo}
          onCrear={crearGrupo}
        />
      )}
    </aside>
  )
}
