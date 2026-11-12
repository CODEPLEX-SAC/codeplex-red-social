import { EncabezadoVistaAdministracion } from './encabezado_vista_administracion'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { VistaResumenGrupoProps } from '@/tipos/grupos/contrato_administracion_grupo'

const vista = catalogoGrupos.administracion.vistas.resumen
const clases = catalogoGrupos.clases.administracion

function Indicador({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className={clases.indicador}>
      <span className={clases.indicador_etiqueta}>{etiqueta}</span>
      <strong className={clases.indicador_valor}>{valor}</strong>
    </div>
  )
}

export function VistaResumenGrupo({ grupo, actividad }: VistaResumenGrupoProps) {
  return (
    <section className={clases.vista}>
      <EncabezadoVistaAdministracion titulo={vista.titulo} descripcion={vista.descripcion} />
      <div className={clases.indicadores}>
        <Indicador etiqueta={vista.indicadores.miembros} valor={grupo.totalTexto} />
        <Indicador etiqueta={vista.indicadores.publicaciones} valor={String(actividad.publicaciones)} />
        <Indicador etiqueta={vista.indicadores.comentarios} valor={String(actividad.comentarios)} />
        <Indicador etiqueta={vista.indicadores.reacciones} valor={String(actividad.reacciones)} />
      </div>
      <Indicador etiqueta={vista.solicitudes} valor={vista.sin_solicitudes} />
    </section>
  )
}
