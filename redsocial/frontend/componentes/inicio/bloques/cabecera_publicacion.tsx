import { useState } from 'react'
import { imagenUsuarioPredeterminada } from '../../compartido'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Menu } from '../../compartido/interfaz/menu'
import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { CabeceraPublicacionProps } from '@/tipos/inicio/contrato_publicacion_visual'

export function CabeceraPublicacion({ autorId, nombre, tiempo, leyenda, opciones }: CabeceraPublicacionProps) {
  const { usuario } = usarSesionDemostracion()
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const mostrarMenu = Boolean(opciones) && autorId === usuario?.id

  return (
    <div className="flex items-start gap-3 px-4 pb-3 pt-4">
      <AvatarImagen src={imagenUsuarioPredeterminada} className="h-10 w-10 flex-none rounded-full bg-primario-suave" />
      <div className="min-w-0 flex-1">
        <strong className="block truncate text-nombre-entidad text-texto">{nombre}</strong>
        {leyenda && <span className="mt-0.5 block text-auxiliar text-texto-suave">{leyenda}</span>}
        <span className="mt-0.5 block text-fecha-abreviada text-texto-suave">{tiempo}</span>
      </div>
      {mostrarMenu && opciones && (
        <div className="flex-none">
          <BotonIcono
            icono="puntos"
            type="button"
            aria-label={catalogoInicio.botones.mas_opciones}
            aria-haspopup="menu"
            aria-expanded={Boolean(ancla)}
            onClick={(evento) => setAncla((actual) => (actual ? null : evento.currentTarget))}
            variant="sutil"
            size="default"
          />
          {ancla && <Menu ancla={ancla} alCerrar={() => setAncla(null)} elementos={opciones} />}
        </div>
      )}
    </div>
  )
}
