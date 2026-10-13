import { useState } from 'react'
import { CabeceraPublicacion } from './cabecera_publicacion'
import { DialogoEliminarPublicacion } from './dialogo_eliminar_publicacion'
import { InteraccionesPublicacion } from './interacciones_publicacion'
import { MarcoPublicacion } from './marco_publicacion'
import { ModalCrearPublicacion } from './modal_crear_publicacion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { DialogoPublicacion, OpcionMenuPublicacion } from '@/tipos/inicio/contrato_publicacion_visual'
import type { TarjetaPublicacionProps } from '@/tipos/inicio/contrato_tarjeta_publicacion'

const opcionesMenu = catalogoInicio.publicacion.menu as OpcionMenuPublicacion[]

export function TarjetaPublicacion({ publicacion, onEditar, onEliminar }: TarjetaPublicacionProps) {
  const [dialogo, setDialogo] = useState<DialogoPublicacion | null>(null)
  const opciones = opcionesMenu.map((opcion) => ({ etiqueta: opcion.etiqueta, icono: opcion.icono, peligro: opcion.peligro, alHacerClick: () => setDialogo(opcion.clave) }))

  return (
    <>
      <MarcoPublicacion>
        <CabeceraPublicacion autorId={publicacion.autorId} nombre={publicacion.nombre} tiempo={publicacion.tiempo} opciones={opciones} />
        <p className="m-0 whitespace-pre-wrap break-words px-4 pb-3 text-cuerpo leading-texto text-texto">{publicacion.texto}</p>
        <InteraccionesPublicacion
          nombre={publicacion.nombre}
          texto={publicacion.texto}
          reaccionesIniciales={publicacion.reacciones}
          comentariosIniciales={publicacion.comentarios}
        />
      </MarcoPublicacion>
      {dialogo === 'editar' && (
        <ModalCrearPublicacion modo="editar" textoInicial={publicacion.texto} onPublicar={(contenido) => onEditar(publicacion.id, contenido.texto)} onCerrar={() => setDialogo(null)} />
      )}
      {dialogo === 'eliminar' && <DialogoEliminarPublicacion onConfirmar={() => onEliminar(publicacion.id)} onCerrar={() => setDialogo(null)} />}
    </>
  )
}
