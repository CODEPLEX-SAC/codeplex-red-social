import { useState } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Menu } from '../../compartido/interfaz/menu'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { MenuOpcionesPerfilProps } from '@/tipos/perfil/contrato_perfil'

const botones = catalogoPerfil.botones
const clases = catalogoPerfil.clases.cabecera

export function MenuOpcionesPerfil({ onEditar }: MenuOpcionesPerfilProps) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)

  function editar() {
    setAncla(null)
    onEditar()
  }

  return (
    <div className={clases.opciones}>
      <BotonIcono icono="puntos" type="button" aria-haspopup="menu" aria-label={botones.opciones_perfil} variant="discreto" size="default" onClick={(evento) => setAncla(ancla ? null : evento.currentTarget)} />
      {ancla && <Menu ancla={ancla} alCerrar={() => setAncla(null)} elementos={[{ etiqueta: botones.editar_perfil, icono: 'editar-oficial', alHacerClick: editar }]} />}
    </div>
  )
}
