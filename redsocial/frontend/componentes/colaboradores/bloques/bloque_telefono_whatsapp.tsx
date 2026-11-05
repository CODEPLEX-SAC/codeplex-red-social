import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Selector } from '../../compartido/interfaz/selector'
import { etiquetarCampo } from './manejadores_campo_colaborador'
import type { CodeplexCampoTextoProps } from '@codeplex-sac/formularios'

const clases = catalogoColaboradores.clases.invitar_informacion
const CODIGOS: string[] = catalogoColaboradores.selectores.codigo_pais.opciones
const SX_NUMERO = catalogoColaboradores.campo_telefono.sx as CodeplexCampoTextoProps['sx']

export function BloqueTelefonoWhatsapp({
  etiqueta,
  ayuda,
  numero,
  codigo,
}: {
  etiqueta: string
  ayuda?: string
  numero: { valor: string; alCambiar: (texto: string) => void }
  codigo?: { valor: string; alCambiar: (codigo: string) => void }
}) {
  const propiedadesCodigo = codigo
    ? { value: codigo.valor, onChange: (evento: { target: { value: unknown } }) => codigo.alCambiar(String(evento.target.value)) }
    : { defaultValue: CODIGOS[0] }

  return (
    <CampoEtiquetado variante="compacta" etiqueta={etiqueta}>
      <div className={clases.telefono}>
        <span className={clases.telefono_pais}>
          <span className={clases.telefono_bandera} />
          <Selector variant="integrado" aria-label={catalogoColaboradores.campos_informacion.codigo_pais} {...propiedadesCodigo}>
            {CODIGOS.map((o) => <option key={o}>{o}</option>)}
          </Selector>
        </span>
        <div className={clases.telefono_numero}>
          <CampoTexto valor={numero.valor} alCambiar={numero.alCambiar} inputProps={etiquetarCampo(etiqueta)} tipo="tel" sx={SX_NUMERO} />
        </div>
      </div>
      {ayuda && <span className={clases.ayuda}>{ayuda}</span>}
    </CampoEtiquetado>
  )
}
