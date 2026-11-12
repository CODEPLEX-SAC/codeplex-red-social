import { useState } from 'react'
import { Boton } from './boton'
import { BotonIcono } from './boton_icono'
import { Modal } from './modal'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { VisorMediosProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.visor
const clases = catalogoPerfil.clases.visor
const ULTIMO_NIVEL = clases.niveles.length - 1

export function VisorMedios({ items, indice, titulo, onCambiar, onCerrar }: VisorMediosProps) {
  const [nivel, setNivel] = useState(0)
  const actual = items[indice]
  const posicion = textos.posicion.replace(':actual', String(indice + 1)).replace(':total', String(items.length))
  const claseImagen = nivel === 0 ? clases.imagen : [clases.imagen_ampliada, clases.niveles[nivel]].join(' ')

  const alejar = () => setNivel(nivel - 1)
  const acercar = () => setNivel(nivel + 1)
  const restablecer = () => setNivel(0)

  function cambiar(destino: number) {
    setNivel(0)
    onCambiar(destino)
  }

  return (
    <Modal titulo={titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCerrar} oscuro cabecera={<></>} className={clases.dialogo}>
      <div className={clases.contenedor}>
        <div className={clases.area}>
          <img src={actual.url} alt={titulo} className={claseImagen} />
        </div>
        <BotonIcono icono="cerrar" type="button" aria-label={textos.cerrar} variant="flotante" size="md" className={clases.cerrar} onClick={onCerrar} />
        <BotonIcono icono="flecha-izquierda" type="button" aria-label={textos.anterior} variant="flotante" size="md" className={clases.anterior} disabled={indice === 0} onClick={() => cambiar(indice - 1)} />
        <BotonIcono icono="flecha-derecha" type="button" aria-label={textos.siguiente} variant="flotante" size="md" className={clases.siguiente} disabled={indice === items.length - 1} onClick={() => cambiar(indice + 1)} />
        <div className={clases.barra}>
          <Boton type="button" variant="oscuro" size="mini" aria-label={textos.alejar} className={clases.boton_zoom} disabled={nivel === 0} onClick={alejar}>
            {textos.simbolo_alejar}
          </Boton>
          <Boton type="button" variant="oscuro" size="mini" aria-label={textos.restablecer} className={clases.boton_zoom} disabled={nivel === 0} onClick={restablecer}>
            {textos.zoom.replace(':porcentaje', String(clases.porcentajes[nivel]))}
          </Boton>
          <Boton type="button" variant="oscuro" size="mini" aria-label={textos.acercar} className={clases.boton_zoom} disabled={nivel === ULTIMO_NIVEL} onClick={acercar}>
            {textos.simbolo_acercar}
          </Boton>
          <span>{posicion}</span>
        </div>
      </div>
    </Modal>
  )
}
