import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { SinEventosUbicacionProps } from '@/tipos/eventos/contrato_sin_eventos_ubicacion'

const textos = catalogoEventos.sin_eventos_ubicacion

export function SinEventosUbicacion({ ciudad, onCambiar, onVerTodos }: SinEventosUbicacionProps) {
  return (
    <section className="flex flex-col items-center px-4 py-12 text-center max-600:py-8">
      <div className="relative mb-6 grid h-40 w-56 place-items-center max-600:h-32 max-600:w-44">
        <div className="absolute inset-0 rounded-full bg-primario-suave" />
        <div className="relative grid h-20 w-20 place-items-center rounded-2xl bg-white text-primario shadow-t8 max-600:h-16 max-600:w-16">
          <Icono name="calendario" className="h-10 w-10 max-600:h-8 max-600:w-8" />
          <span className="absolute -bottom-2 -right-2 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-primario text-white">
            <Icono name="cerrar" className="h-4 w-4" />
          </span>
        </div>
      </div>
      <MensajeVacio titulo={[textos.titulo, textos.espacio, ciudad].join('')} texto={textos.texto} className="mb-6 w-full max-w-150" />
      <div className="flex items-center justify-center gap-3 max-600:w-full max-600:flex-col max-600:items-stretch">
        <Boton type="button" variant="primario" size="md" onClick={onCambiar}>{textos.cambiar}</Boton>
        <Boton type="button" variant="contorno" size="md" onClick={onVerTodos}>{textos.ver_todos}</Boton>
      </div>
    </section>
  )
}
