import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Modal } from '../../compartido/interfaz/modal'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ModalInformarProblemaProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const informe = catalogoMensajeria.videollamada.textos.informe
const clases = catalogoMensajeria.videollamada.clases.sala
const MENSAJES = { inicial: String(), preparado: informe.preparado, enviado: informe.enviado }

export function ModalInformarProblema({ onEnviar, onCerrar }: ModalInformarProblemaProps) {
  const [texto, setTexto] = useState(String())
  const [estado, setEstado] = useState<keyof typeof MENSAJES>('inicial')

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault()
    const resultado = await onEnviar(texto.trim())
    setEstado(resultado.exito ? 'enviado' : 'preparado')
  }

  return (
    <Modal titulo={informe.titulo} etiquetaCerrar={informe.cerrar} onCerrar={onCerrar} className="max-w-120 rounded-2xl max-600:max-w-full">
      <form onSubmit={enviar}>
        <div className={clases.informe_cuerpo}>
          <p className={clases.panel_manos}>{informe.descripcion}</p>
          <CampoTexto valor={texto} alCambiar={setTexto} marcador={informe.placeholder} inputProps={{ 'aria-label': informe.etiqueta_campo }} multilinea anchoCompleto />
        </div>
        <p aria-live="polite" className={clases.informe_aviso}>
          {MENSAJES[estado]}
        </p>
        <div className={clases.informe_pie}>
          <Boton type="button" variant="secundario" size="default" onClick={onCerrar}>
            {informe.cancelar}
          </Boton>
          <Boton type="submit" variant="primario" size="default" disabled={texto.trim() === String()}>
            {informe.enviar}
          </Boton>
        </div>
      </form>
    </Modal>
  )
}
