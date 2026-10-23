import { useRef, useState } from 'react'
import { imagenUsuarioPredeterminada } from '../../compartido'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { Menu } from '../../compartido/interfaz/menu'
import { VisorMedios } from '../../compartido/interfaz/visor_medios'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { FotoPerfilCabeceraProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.foto

export function FotoPerfilCabecera({ perfil, propio, onElegirFoto }: FotoPerfilCabeceraProps) {
  const entrada = useRef<HTMLInputElement>(null)
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const [visor, setVisor] = useState(false)
  const tieneFoto = perfil.avatar.length > 0
  const acciones: Record<string, () => void> = { ver: () => setVisor(true), elegir: () => entrada.current?.click() }
  const elementos: ElementoMenu[] = textos.menu.filter((opcion) => tieneFoto || opcion.clave !== 'ver').map((opcion) => ({ etiqueta: opcion.etiqueta, icono: opcion.icono as IconName, alHacerClick: acciones[opcion.clave] }))

  function alPulsar(boton: HTMLElement) {
    if (propio) setAncla((actual) => (actual ? null : boton))
    else if (tieneFoto) setVisor(true)
  }

  return (
    <div className="relative flex-none">
      <Boton type="button" variant="fantasma" size="enlace" aria-haspopup={propio ? 'menu' : undefined} aria-label={textos.cambiar_aria.replace(':nombre', perfil.nombre)} onClick={(evento) => alPulsar(evento.currentTarget)} className="rounded-full p-0">
        <AvatarUsuario tamano="xxl" imagen={tieneFoto ? perfil.avatar : imagenUsuarioPredeterminada} className={catalogoPerfil.clases.avatar} />
      </Boton>
      {propio && <input ref={entrada} type="file" accept={textos.tipos_aceptados} aria-label={textos.etiqueta_entrada} className={catalogoPerfil.clases.editor.oculto} onChange={(evento) => { const archivo = evento.target.files?.[0]; evento.target.value = ''; if (archivo) onElegirFoto(archivo) }} />}
      {ancla && <Menu ancla={ancla} alCerrar={() => setAncla(null)} elementos={elementos} />}
      {visor && tieneFoto && <VisorMedios items={[{ id: perfil.id, url: perfil.avatar }]} indice={0} titulo={textos.visor_titulo.replace(':nombre', perfil.nombre)} onCambiar={() => undefined} onCerrar={() => setVisor(false)} />}
    </div>
  )
}
