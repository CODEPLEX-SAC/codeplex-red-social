import { useState } from 'react'
import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import { CabeceraPublicacion } from './cabecera_publicacion'
import { CuerpoPublicacion } from './cuerpo_publicacion'
import { DialogoEliminarPublicacion } from './dialogo_eliminar_publicacion'
import { InteraccionesPublicacion } from './interacciones_publicacion'
import { MarcoPublicacion } from './marco_publicacion'
import { ModalCrearPublicacion } from './modal_crear_publicacion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { ContenidoPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'
import type { DialogoPublicacion, OpcionMenuPublicacion } from '@/tipos/inicio/contrato_publicacion_visual'
import type { TarjetaPublicacionProps } from '@/tipos/inicio/contrato_tarjeta_publicacion'

const opcionesMenu = catalogoInicio.publicacion.menu as OpcionMenuPublicacion[]
const LEYENDAS_TIPO: Record<string, string> = catalogoInicio.leyendas.por_tipo

export function TarjetaPublicacion({ publicacion, compartidos, interaccion, onEditar, onEliminar, onCompartir, onVotar }: TarjetaPublicacionProps) {
  const { usuario } = usarSesionDemostracion()
  const [dialogo, setDialogo] = useState<DialogoPublicacion | null>(null)
  const opciones = opcionesMenu.map((opcion) => ({ etiqueta: opcion.etiqueta, icono: opcion.icono, peligro: opcion.peligro, alHacerClick: () => setDialogo(opcion.clave) }))

  function guardarEdicion(contenido: ContenidoPublicacion) {
    onEditar(publicacion.id, contenido.texto, contenido.medios ?? [])
  }

  return (
    <>
      <MarcoPublicacion>
        <CabeceraPublicacion autorId={publicacion.autorId} nombre={publicacion.nombre} tiempo={publicacion.tiempo} leyenda={LEYENDAS_TIPO[publicacion.tipo]} opciones={opciones} />
        <CuerpoPublicacion publicacion={publicacion} onVotar={onVotar} />
        <InteraccionesPublicacion
          nombre={publicacion.nombre}
          texto={publicacion.texto}
          interaccion={interaccion}
          compartidos={compartidos}
          puedeCompartir={publicacion.autorId !== usuario?.id}
          onCompartir={onCompartir}
        />
      </MarcoPublicacion>
      {dialogo === 'editar' && (
        <ModalCrearPublicacion modo="editar" textoInicial={publicacion.texto} mediosIniciales={publicacion.medios} onPublicar={guardarEdicion} onCerrar={() => setDialogo(null)} />
      )}
      {dialogo === 'eliminar' && <DialogoEliminarPublicacion onConfirmar={() => onEliminar(publicacion.id)} onCerrar={() => setDialogo(null)} />}
    </>
  )
}
