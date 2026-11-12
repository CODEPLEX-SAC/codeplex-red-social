import { useState } from 'react'
import { BotonIcono, Boton, GrupoAvatares, Menu } from '../../compartido'
import { resumenDeAvatares, textoCantidad } from './logica_listas_amigos'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { TarjetaListaAmigosProps } from '@/tipos/amigos/contrato_listas'

const clases = catalogoAmigos.clases.listas
const textos = catalogoAmigos.listas
const botones = catalogoAmigos.botones

export function TarjetaListaAmigos({ lista, alAbrir, alEditar, alEliminar }: TarjetaListaAmigosProps) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const { visibles, resto } = resumenDeAvatares(lista.miembros.length)

  function cerrarMenu() {
    setAncla(null)
  }

  function abrirMenu(evento: { currentTarget: HTMLElement }) {
    setAncla(evento.currentTarget)
  }

  function editar() {
    cerrarMenu()
    alEditar(lista.id)
  }

  function eliminar() {
    cerrarMenu()
    alEliminar(lista.id)
  }

  return (
    <article className={clases.tarjeta}>
      <Boton type="button" variant="fantasma" size="enlace" className={clases.abrir} aria-label={textos.abrir.replace(':nombre', lista.nombre)} onClick={() => alAbrir(lista.id)}>
        <strong className={clases.nombre}>{lista.nombre}</strong>
        <span className={clases.cantidad}>{textoCantidad(lista.miembros.length)}</span>
        {visibles > 0 && (
          <span className={clases.avatares}>
            <GrupoAvatares avatares={visibles} tamano="xs" />
            <span className={clases.avatares_resto}>{resto}</span>
          </span>
        )}
        <span className={clases.descripcion}>{lista.descripcion}</span>
      </Boton>
      <BotonIcono icono="puntos" type="button" aria-label={textos.mas_opciones.replace(':nombre', lista.nombre)} variant="discreto" size="sm" className={clases.opciones} onClick={abrirMenu} />
      <Menu
        ancla={ancla}
        alCerrar={cerrarMenu}
        elementos={[
          { icono: 'editar-oficial', etiqueta: botones.editar_lista, alHacerClick: editar },
          { icono: 'eliminar', etiqueta: botones.eliminar_lista, peligro: true, alHacerClick: eliminar },
        ]}
      />
    </article>
  )
}
