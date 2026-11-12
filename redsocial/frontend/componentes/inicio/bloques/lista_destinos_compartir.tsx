import { useState } from 'react'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { contieneTexto } from '../../compartido/interfaz/fuente_busqueda_local'
import { Icono } from '../../compartido/icono'
import { usarDestinosCompartir } from './usar_destinos_compartir'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { ListaDestinosCompartirProps } from '@/tipos/inicio/contrato_compartir_publicacion'

const textos = catalogoInicio.publicacion.compartir

function elementosDe(tipo: ListaDestinosCompartirProps['tipo'], destinos: ReturnType<typeof usarDestinosCompartir>) {
  if (tipo === 'grupo') return destinos.grupos.map((grupo) => ({ id: grupo.id, nombre: grupo.nombre, imagen: grupo.imagen, detalle: grupo.detalle }))
  return destinos.amigos.map((amigo) => ({ id: amigo.id, nombre: amigo.nombre, imagen: amigo.imagen, detalle: String() }))
}

export function ListaDestinosCompartir({ tipo, alElegir }: ListaDestinosCompartirProps) {
  const destinos = usarDestinosCompartir()
  const [consulta, setConsulta] = useState(String())
  const copia = tipo === 'grupo' ? textos.grupos : textos.amigos
  const visibles = elementosDe(tipo, destinos).filter((elemento) => contieneTexto(elemento.nombre, consulta))

  return (
    <div className="flex h-96 max-h-full min-h-0 flex-col gap-3 overflow-y-auto px-4 py-3">
      <CampoBusqueda placeholder={copia.buscar} aria-label={copia.buscar} value={consulta} onChange={(evento) => setConsulta(evento.target.value)} />
      <h3 className="m-0 text-nombre-entidad text-texto">{copia.lista}</h3>
      {visibles.length === 0 && <MensajeVacio texto={copia.vacio} className="py-6" />}
      <ul className="m-0 grid list-none gap-1 p-0">
        {visibles.map((elemento) => (
          <li key={elemento.id}>
            <Boton type="button" variant="fantasma" size="default" className="w-full justify-start gap-3 py-2 text-left" onClick={() => alElegir({ tipo, id: elemento.id, nombre: elemento.nombre })}>
              <AvatarUsuario tamano="md" imagen={elemento.imagen} />
              <span className="grid min-w-0 flex-1">
                <strong className="truncate text-nombre-entidad text-texto">{elemento.nombre}</strong>
                {elemento.detalle !== String() && <span className="text-auxiliar text-texto-suave">{elemento.detalle}</span>}
              </span>
              <Icono name="flecha-derecha" className="h-4 w-4 text-texto-suave" />
            </Boton>
          </li>
        ))}
      </ul>
    </div>
  )
}
