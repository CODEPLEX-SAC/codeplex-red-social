import { Casilla } from '../../compartido/interfaz/casilla'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Selector } from '../../compartido/interfaz/selector'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { CampoPerfilProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.secciones
const FILAS_MULTILINEA = 3

export function CampoPerfil({ campo, valor, onCambiar }: CampoPerfilProps) {
  if (campo.tipo === 'casilla') {
    return (
      <label className={catalogoPerfil.clases.editor.fila}>
        <Casilla seleccionado={valor === true} alCambiar={(_, marcado) => onCambiar(marcado)} inputProps={{ 'aria-label': campo.etiqueta }} />
        {campo.etiqueta}
      </label>
    )
  }
  if (campo.tipo === 'seleccion') {
    return (
      <Selector label={campo.etiqueta} value={String(valor)} onChange={(evento) => onCambiar(evento.target.value)}>
        <option value="">{textos.sin_especificar}</option>
        {(campo.opciones ?? []).map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </Selector>
    )
  }
  return (
    <CampoEtiquetado etiqueta={campo.etiqueta} envolver>
      <CampoTexto multilinea={campo.tipo === 'multilinea'} filasMinimas={campo.tipo === 'multilinea' ? FILAS_MULTILINEA : undefined} valor={String(valor)} alCambiar={onCambiar} marcador={campo.marcador} />
    </CampoEtiquetado>
  )
}
