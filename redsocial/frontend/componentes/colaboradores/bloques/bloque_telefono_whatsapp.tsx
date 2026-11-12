import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Selector } from '../../compartido/interfaz/selector'
import { etiquetarCampo } from './manejadores_campo_colaborador'

const clases = catalogoColaboradores.clases.invitar_informacion
const CODIGOS: string[] = catalogoColaboradores.selectores.codigo_pais.opciones

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
        <Selector variant="default" className={clases.telefono_pais} aria-label={catalogoColaboradores.campos_informacion.codigo_pais} {...propiedadesCodigo}>
          {CODIGOS.map((o) => <option key={o}>{o}</option>)}
        </Selector>
        <div className={clases.telefono_numero}>
          <CampoTexto anchoCompleto valor={numero.valor} alCambiar={numero.alCambiar} inputProps={etiquetarCampo(etiqueta)} tipo="tel" />
        </div>
      </div>
      {ayuda && <span className={clases.ayuda}>{ayuda}</span>}
    </CampoEtiquetado>
  )
}
