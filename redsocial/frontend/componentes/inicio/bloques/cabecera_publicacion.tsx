import { useState } from 'react'
import { imagenUsuarioPredeterminada } from '../../compartido'
import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { EnlacePerfilUsuario } from '../../compartido/interfaz/enlace_perfil_usuario'
import { Menu } from '../../compartido/interfaz/menu'
import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { CabeceraPublicacionProps } from '@/tipos/inicio/contrato_publicacion_visual'

const audiencia = catalogoInicio.publicacion.audiencia

export function CabeceraPublicacion({ autorId, nombre, tiempo, leyenda, publica, opciones }: CabeceraPublicacionProps) {
  const { usuario } = usarSesionDemostracion()
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const mostrarMenu = Boolean(opciones) && autorId === usuario?.id

  function alternarMenu(boton: HTMLElement) {
    setAncla((actual) => (actual ? null : boton))
  }

  return (
    <div className="flex items-start gap-3 px-4 pb-3 pt-4">
      <EnlacePerfilUsuario autorId={autorId} nombre={nombre} className="flex-none">
        <AvatarUsuario tamano="md" imagen={imagenUsuarioPredeterminada} />
      </EnlacePerfilUsuario>
      <div className="min-w-0 flex-1">
        <EnlacePerfilUsuario autorId={autorId} className="block truncate text-nombre-entidad text-texto">
          <strong>{nombre}</strong>
        </EnlacePerfilUsuario>
        {leyenda && <span className="mt-0.5 block text-auxiliar text-texto-suave">{leyenda}</span>}
        <span className="mt-0.5 block text-fecha-abreviada text-texto-suave">
          {tiempo}
          {publica && (
            <>
              {` ${audiencia.separador}`}
              <Icono name={audiencia.icono as IconName} className={audiencia.clase} />
              <span className="sr-only">{audiencia.etiqueta}</span>
            </>
          )}
        </span>
      </div>
      {mostrarMenu && opciones && (
        <div className="flex-none">
          <BotonIcono
            icono="puntos"
            type="button"
            aria-label={catalogoInicio.botones.mas_opciones}
            aria-haspopup="menu"
            aria-expanded={Boolean(ancla)}
            onClick={(evento) => alternarMenu(evento.currentTarget)}
            variant="sutil"
            size="default"
          />
          {ancla && <Menu ancla={ancla} alCerrar={() => setAncla(null)} elementos={opciones} />}
        </div>
      )}
    </div>
  )
}
