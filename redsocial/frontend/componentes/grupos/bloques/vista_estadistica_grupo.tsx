import { EncabezadoVistaAdministracion } from './encabezado_vista_administracion'
import { cubetaDeBarra } from './logica_actividad_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { VistaEstadisticaGrupoProps } from '@/tipos/grupos/contrato_administracion_grupo'

const administracion = catalogoGrupos.administracion
const clases = catalogoGrupos.clases.administracion

export function VistaEstadisticaGrupo({ clave, actividad }: VistaEstadisticaGrupoProps) {
  const vista = administracion.vistas[clave]
  const maximo = Math.max(...vista.serie.map((punto) => punto.valor))

  return (
    <section className={clases.vista}>
      <EncabezadoVistaAdministracion titulo={vista.titulo} descripcion={vista.descripcion} />
      {clave === 'interaccion' && (
        <div className={clases.indicadores}>
          <div className={clases.indicador}>
            <span className={clases.indicador_etiqueta}>{administracion.vistas.interaccion.indicadores.publicaciones}</span>
            <strong className={clases.indicador_valor}>{actividad.publicaciones}</strong>
          </div>
          <div className={clases.indicador}>
            <span className={clases.indicador_etiqueta}>{administracion.vistas.interaccion.indicadores.comentarios}</span>
            <strong className={clases.indicador_valor}>{actividad.comentarios}</strong>
          </div>
          <div className={clases.indicador}>
            <span className={clases.indicador_etiqueta}>{administracion.vistas.interaccion.indicadores.reacciones}</span>
            <strong className={clases.indicador_valor}>{actividad.reacciones}</strong>
          </div>
        </div>
      )}
      <ul aria-label={vista.titulo} className={clases.lista}>
        {vista.serie.map((punto) => (
          <li key={punto.etiqueta} className={clases.barra_fila}>
            <span className={clases.fila_detalle}>{punto.etiqueta}</span>
            <div className={clases.barra_pista}>
              <div className={[clases.barra, clases.barras[cubetaDeBarra(punto.valor, maximo, clases.barras.length)]].join(' ')} />
            </div>
            <span className={clases.barra_valor}>{punto.valor}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
