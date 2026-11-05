import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'
import { Acordeon } from '../../compartido/interfaz/acordeon'
import { TextoColor } from '../../compartido/interfaz/texto_color'
import type { ClavePermiso } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'
import type { IconName } from '@/tipos/compartido/contrato_icono'

const COLUMNAS = catalogoColaboradores.columnas_permisos as { clave: ClavePermiso; icono: IconName; color: string; etiqueta: string }[]
const clases = catalogoColaboradores.clases.invitar_permisos
const textos = catalogoColaboradores.campos_rol_permisos
const ID_SIGNIFICADO = 'significado-permisos'

export function AcordeonSignificadoPermisos() {
  const contenido = (
    <ul className={clases.significado_lista}>
      {COLUMNAS.map((c) => (
        <li key={c.clave} className={clases.significado_fila}>
          <TextoColor as="span" variante={c.color}><Icono name={c.icono} className={clases.significado_glifo} /></TextoColor>
          <span className={clases.significado_textos}>
            <span className={clases.significado_nombre}>{c.etiqueta}</span>
            <span className={clases.significado_texto}>{textos.significados[c.clave]}</span>
          </span>
        </li>
      ))}
      <li className={clases.significado_fila}>
        <span className={`${clases.significado_glifo} ${clases.matriz_no_disponible}`}>{textos.simbolo_no_disponible}</span>
        <span className={clases.significado_textos}>
          <span className={clases.significado_nombre}>{textos.no_disponible}</span>
          <span className={clases.significado_texto}>{textos.no_disponible_detalle}</span>
        </span>
      </li>
    </ul>
  )

  return (
    <div className={clases.significado}>
      <Acordeon elementos={[{ id: ID_SIGNIFICADO, titulo: textos.significado_titulo, icono: 'aviso', contenido }]} />
    </div>
  )
}
