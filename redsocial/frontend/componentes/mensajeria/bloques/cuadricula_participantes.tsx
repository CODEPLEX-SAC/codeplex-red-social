import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { columnasPara, sinParticipante } from './logica_sala_llamada'
import { TarjetaParticipante } from './tarjeta_participante'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { CuadriculaParticipantesProps, PaginacionSalaProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const catalogo = catalogoMensajeria.videollamada
const clases = catalogo.clases.sala

function Paginacion({ pagina, totalPaginas, onPagina }: PaginacionSalaProps) {
  const posicion = catalogo.textos.sala.pagina.replace(':actual', String(pagina + 1)).replace(':total', String(totalPaginas))
  if (totalPaginas <= 1) return null

  return (
    <nav aria-label={posicion} className={clases.paginacion}>
      <BotonIcono icono="flecha-izquierda" type="button" aria-label={catalogo.textos.sala.pagina_anterior} variant="llamada" size="default" disabled={pagina === 0} onClick={() => onPagina(pagina - 1)} />
      <span>{posicion}</span>
      <BotonIcono icono="flecha-derecha" type="button" aria-label={catalogo.textos.sala.pagina_siguiente} variant="llamada" size="default" disabled={pagina >= totalPaginas - 1} onClick={() => onPagina(pagina + 1)} />
    </nav>
  )
}

function CuadriculaConFijado({ todos, flujoDe, reaccion, fijado }: CuadriculaParticipantesProps & { fijado: NonNullable<CuadriculaParticipantesProps['fijado']> }) {
  const otros = sinParticipante(todos, fijado.id)

  return (
    <div className={clases.fijado_contenedor}>
      <div className={clases.fijado_principal}>
        <TarjetaParticipante participante={fijado} flujo={flujoDe(fijado.id)} reaccion={reaccion} />
      </div>
      <div className={clases.fijado_otros}>
        {otros.map((participante) => (
          <div key={participante.id} className={clases.fijado_otro}>
            <TarjetaParticipante participante={participante} flujo={flujoDe(participante.id)} reaccion={reaccion} compacta />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CuadriculaParticipantes(props: CuadriculaParticipantesProps) {
  const { participantes, flujoDe, reaccion, fijado, pagina, totalPaginas, onPagina } = props
  if (fijado !== null) return <CuadriculaConFijado {...props} fijado={fijado} />

  const columnas = catalogo.columnas[columnasPara(participantes.length)]

  return (
    <>
      <div className={`${clases.cuadricula} ${columnas}`}>
        {participantes.map((participante) => (
          <TarjetaParticipante key={participante.id} participante={participante} flujo={flujoDe(participante.id)} reaccion={reaccion} />
        ))}
      </div>
      <Paginacion pagina={pagina} totalPaginas={totalPaginas} onPagina={onPagina} />
    </>
  )
}
