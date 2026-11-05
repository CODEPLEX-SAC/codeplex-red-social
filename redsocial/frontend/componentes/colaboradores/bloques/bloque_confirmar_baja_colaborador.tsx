import { useState } from 'react'
import { CodeplexProveedorFechas } from '@codeplex-sac/selectores-fecha'
import { Boton, BotonIcono, CampoEtiquetado, Icono, Selector } from '../../compartido'
import { Modal } from '../../compartido/interfaz/modal'
import { SelectorFecha } from '../../compartido/interfaz/selector_fecha'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { fechaComoDayjs, fechaValida, textoDeFecha } from './logica_colaboradores'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const textos = catalogoColaboradores.confirmar_baja
const fechas = catalogoColaboradores.panel_filtros_avanzados
const clases = catalogoColaboradores.clases.confirmacion_baja

export function BloqueConfirmarBajaColaborador({
  colaborador,
  fechaEjemplo,
  alCerrar,
  alConfirmar,
}: {
  colaborador: Colaborador
  fechaEjemplo: string
  alCerrar: () => void
  alConfirmar: (fecha: string) => void
}) {
  const [fecha, setFecha] = useState(fechaEjemplo)
  const cabecera = (
    <div className={clases.cabecera}>
      <h2 className={clases.titulo}>{textos.titulo}</h2>
      <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={alCerrar} variant="discreto" size="sm" />
    </div>
  )

  return (
    <CodeplexProveedorFechas idioma={fechas.idioma}>
      <Modal titulo={textos.titulo} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={alCerrar} cabecera={cabecera} suave className={clases.dialogo}>
        <div className={clases.cuerpo}>
          <div className={clases.icono_caja}>
            <Icono name="eliminar" className={clases.icono} />
          </div>

          <h3 className={clases.pregunta}>{[textos.pregunta_prefijo, colaborador.nombre + textos.pregunta_sufijo].join(' ')}</h3>
          <p className={clases.descripcion}>{textos.descripcion}</p>

          <CampoEtiquetado variante="compacta" etiqueta={textos.motivo.etiqueta} requerido className={clases.campo_motivo}>
            <Selector variant="colaboradores" placeholder={textos.motivo.placeholder}>
              {textos.motivo.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
          </CampoEtiquetado>

          <CampoEtiquetado variante="compacta" etiqueta={textos.fecha_baja} requerido className={clases.campo_fecha}>
            <SelectorFecha nombreAccesible={textos.fecha_baja} valor={fechaComoDayjs(fecha)} alCambiar={(valor) => setFecha(textoDeFecha(valor))} marcador={fechas.marcador_fecha} formato={fechas.formato_fecha} />
          </CampoEtiquetado>

          <div className={clases.acciones}>
            <Boton type="button" variant="secundario" size="md" onClick={alCerrar}>{textosRedSocial.CANCELAR}</Boton>
            <Boton type="button" variant="peligro" size="md" disabled={!fechaValida(fecha)} onClick={() => alConfirmar(fecha)}>
              <Icono name="eliminar" className={clases.boton_glifo} /> {catalogoColaboradores.botones.dar_de_baja}
            </Boton>
          </div>
        </div>
      </Modal>
    </CodeplexProveedorFechas>
  )
}
