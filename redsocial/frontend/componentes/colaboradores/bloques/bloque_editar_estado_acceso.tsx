import { Selector } from '../../compartido/interfaz/selector'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { BorradorColaborador } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

const opcionesEditables = catalogoColaboradores.selectores.estado.opciones.slice(1, 4)
const opcionesConBaja = catalogoColaboradores.selectores.estado.opciones.slice(1)
const detalle = catalogoColaboradores.clases.detalle

export function BloqueEditarEstadoAcceso({ borrador, etiquetaEstado, alElegirEstado }: { borrador: BorradorColaborador; etiquetaEstado: string; alElegirEstado: (etiqueta: string) => void }) {
  const opcionesEstado = borrador.estado === 'baja' ? opcionesConBaja : opcionesEditables

  return (
    <section className={detalle.seccion}>
      <h3 className={detalle.titulo_seccion}>{catalogoColaboradores.editar.estado_de_acceso}</h3>
      <CampoEtiquetado variante="compacta" etiqueta={catalogoColaboradores.selectores.estado.etiqueta} requerido>
        <Selector variant="colaboradores" aria-label={catalogoColaboradores.selectores.estado.etiqueta} value={etiquetaEstado} onChange={(evento) => alElegirEstado(String(evento.target.value))}>
          {opcionesEstado.map((o) => <option key={o}>{o}</option>)}
        </Selector>
      </CampoEtiquetado>
    </section>
  )
}
