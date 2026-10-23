import { useState } from 'react'
import { Boton, BotonIcono, CampoEtiquetado, CampoTexto, Icono, Selector } from '../../compartido'
import { Modal } from '../../compartido/interfaz/modal'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { etiquetarCampo } from './manejadores_campo_colaborador'
import { fechaValida } from './logica_colaboradores'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const textos = catalogoColaboradores.confirmar_baja

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
    <div className="flex items-start justify-between px-5 pb-3 pt-5">
      <h2 className="m-0 text-nombre-entidad text-texto">{textos.titulo}</h2>
      <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={alCerrar} variant="discreto" size="sm" />
    </div>
  )

  return (
    <Modal titulo={textos.titulo} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={alCerrar} cabecera={cabecera} suave className="max-w-125 rounded-2xl">
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
          <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-fondo-categoria-rojo text-negativo-kpi">
            <Icono name="eliminar" className="h-5 w-5" />
          </div>

          <h3 className="m-0 mb-1.5 text-cuerpo-grande text-texto">{[textos.pregunta_prefijo, colaborador.nombre + textos.pregunta_sufijo].join(' ')}</h3>
          <p className="m-0 mb-4 text-cuerpo leading-texto text-texto-suave">{textos.descripcion}</p>

          <CampoEtiquetado variante="compacta" etiqueta={textos.motivo.etiqueta} requerido className="mb-3">
            <Selector variant="colaboradores" placeholder={textos.motivo.placeholder}>
              {textos.motivo.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
          </CampoEtiquetado>

          <CampoEtiquetado variante="compacta" etiqueta={textos.fecha_baja} requerido className="mb-5">
            <CampoTexto valor={fecha} alCambiar={setFecha} inputProps={etiquetarCampo(textos.fecha_baja)} anchoCompleto iconoFin={<Icono name="calendario" className="h-4 w-4" />} />
          </CampoEtiquetado>

          <div className="grid grid-cols-2 gap-2">
            <Boton type="button" variant="secundario" onClick={alCerrar}>{textosRedSocial.CANCELAR}</Boton>
            <Boton type="button" variant="peligro" disabled={!fechaValida(fecha)} onClick={() => alConfirmar(fecha)}>
              <Icono name="eliminar" className="h-3.5 w-3.5" /> {catalogoColaboradores.botones.dar_de_baja}
            </Boton>
          </div>
      </div>
    </Modal>
  )
}
