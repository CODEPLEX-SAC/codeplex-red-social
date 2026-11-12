import { useMemo, useState } from 'react'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { CampoBusqueda, Boton, Icono, AvatarUsuario, imagenUsuarioPredeterminada as usuarioImg, BotonIcono, Menu, irARuta, usarBusqueda, MensajeEstadoBusqueda, crearFuenteLocal } from '../../compartido'
import { TextoTruncable } from '../../compartido/interfaz/texto_truncable'
import { FilaReunionProgramada } from './fila_reunion_programada'
import { coincidePorNombre } from './logica_busqueda_mensajeria'
import { rutaDeVideollamadaA } from './logica_videollamadas'
import type { FuenteBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { LlamadaReciente } from '@/tipos/mensajeria/contrato_videollamadas'
import type { ReunionProgramada } from '@/tipos/mensajeria/contrato_reunion'
import type { FiltroLlamadas, FiltrosLlamadas } from '@/tipos/mensajeria/contrato_videollamadas'

const clases = catalogoMensajeria.clases.lista
const limite = catalogoMensajeria.limites_listas.llamadas
const filtros = catalogoMensajeria.filtros

const CHIPS: readonly [FiltroLlamadas, string][] = [['recientes', filtros.recientes], ['contactos', filtros.contactos], ['grupos', filtros.grupos]]

function pasaFiltro(llamada: LlamadaReciente, { tipo }: FiltrosLlamadas): boolean {
  if (tipo === 'contactos') return !llamada.esGrupo
  return tipo === 'grupos' ? llamada.esGrupo === true : true
}

export function BloqueRecientes({
  LLAMADAS_RECIENTES,
  REUNIONES_PROGRAMADAS,
  fuente,
}: {
  LLAMADAS_RECIENTES: readonly LlamadaReciente[]
  fuente?: FuenteBusqueda<LlamadaReciente, FiltrosLlamadas>
  REUNIONES_PROGRAMADAS: readonly ReunionProgramada[]
}) {
  const [filtro, setFiltro] = useState<FiltroLlamadas>('recientes')
  const [verReuniones, setVerReuniones] = useState(false)
  const [todas, setTodas] = useState(false)
  const [anclaMenu, setAnclaMenu] = useState<HTMLElement | null>(null)
  const filtrosLlamadas = useMemo<FiltrosLlamadas>(() => ({ tipo: filtro }), [filtro])
  const fuenteLocal = useMemo(() => crearFuenteLocal(LLAMADAS_RECIENTES, coincidePorNombre, pasaFiltro), [LLAMADAS_RECIENTES])
  const busqueda = usarBusqueda(fuente ?? fuenteLocal, { modo: fuente ? 'remota' : 'local', filtros: filtrosLlamadas })
  const coincidentes = busqueda.resultado.elementos
  const visibles = todas ? coincidentes : coincidentes.slice(0, limite)

  function volverALlamadas() {
    setVerReuniones(false)
  }

  function abrirReuniones() {
    setVerReuniones(true)
  }

  function abrirMenu(evento: { currentTarget: HTMLElement }) {
    setAnclaMenu(evento.currentTarget)
  }

  function cerrarMenu() {
    setAnclaMenu(null)
  }

  function alternarTodas() {
    setTodas((actual) => !actual)
  }

  if (verReuniones) {
    return (
      <section className={clases.videollamadas_contenedor}>
        <div className={clases.videollamadas_cabecera}>
          <BotonIcono icono="flecha-izquierda" type="button" variant="discreto" size="default" aria-label={catalogoMensajeria.botones.volver_a_llamadas} onClick={volverALlamadas} />
          <h2 className={clases.videollamadas_cabecera_titulo}>{filtros.reuniones_programadas}</h2>
        </div>
        <div className={clases.videollamadas_reuniones}>
          {REUNIONES_PROGRAMADAS.map((r) => <FilaReunionProgramada key={r.id} reunion={r} />)}
        </div>
      </section>
    )
  }

  return (
    <section className={clases.videollamadas_contenedor}>
      <CampoBusqueda placeholder={catalogoMensajeria.placeholders.buscar_videollamadas} aria-label={catalogoMensajeria.placeholders.buscar_videollamadas} className={clases.buscador} value={busqueda.texto} onChange={(evento) => busqueda.cambiarTexto(evento.target.value)} />

      <div className={clases.videollamadas_filtros}>
        <div className={clases.videollamadas_chips}>
          {CHIPS.map(([clave, titulo]) => (
            <Boton key={clave} type="button" variant="filtro" size="filtro" activo={filtro === clave} aria-pressed={filtro === clave} className="flex-none" onClick={() => setFiltro(clave)}>{titulo}</Boton>
          ))}
        </div>
        <BotonIcono icono="puntos-verticales" type="button" variant="discreto" size="default" className={clases.videollamadas_menu} aria-label={catalogoMensajeria.botones.menu_videollamadas} aria-haspopup="menu" aria-expanded={Boolean(anclaMenu)} onClick={abrirMenu} />
        <Menu ancla={anclaMenu} alCerrar={cerrarMenu} elementos={[{ icono: 'calendario', etiqueta: filtros.reuniones_programadas, alHacerClick: abrirReuniones }]} />
      </div>

      <div className={clases.videollamadas_lista}>
        <MensajeEstadoBusqueda estado={busqueda.estado} error={busqueda.error} sinCoincidencias={false} />
        {coincidentes.length === 0 && (busqueda.estado === 'inicial' || busqueda.estado === 'sin_coincidencias') && <p className={clases.vacia}>{catalogoMensajeria.leyendas.sin_llamadas}</p>}
        {visibles.map((c) => (
          <article key={c.id} className="flex items-center gap-2.5 rounded-lg px-2 py-2.5">
            {c.esGrupo ? (
              <AvatarUsuario tamano="md" icono="grupo" tono="solido" />
            ) : (
              <AvatarUsuario tamano="md" imagen={usuarioImg} />
            )}
            <span className="min-w-0 flex-1">
              <TextoTruncable texto={c.nombre} className="text-nombre-entidad text-texto" />
              <small className="mt-0.5 flex items-center gap-1 truncate text-auxiliar text-texto-suave">
                {c.direccion && (
                  <>
                    <Icono name={c.direccion === 'entrante' ? 'flecha-abajo-izquierda' : 'flecha-arriba-derecha'} className="h-3 w-3" />
                    {c.direccion === 'entrante' ? catalogoMensajeria.leyendas.videollamada_entrante : catalogoMensajeria.leyendas.videollamada_saliente}
                  </>
                )}
                {c.miembros}
              </small>
            </span>
            <span className="flex-none text-fecha-abreviada text-texto-suave">{c.hora}</span>
            <BotonIcono icono="video" type="button" aria-label={catalogoMensajeria.botones.videollamar_a.replace(':nombre', c.nombre)} variant="contorno" size="default" className="flex-none" onClick={() => irARuta(rutaDeVideollamadaA(c.nombre))} />
          </article>
        ))}
      </div>

      {coincidentes.length > limite && (
        <div className={clases.videollamadas_pie}>
          <Boton type="button" variant="enlace" size="enlace_accion" aria-expanded={todas} onClick={alternarTodas}>
            {todas ? catalogoMensajeria.botones.ver_menos_llamadas : catalogoMensajeria.botones.ver_mas_llamadas}
          </Boton>
        </div>
      )}
    </section>
  )
}
