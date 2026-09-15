import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

void catalogoCompartido

export function AvatarImagen({ src, className = '' }: { src: string; className?: string }) {
  return <img src={src} alt="" className={`object-cover object-center ${className}`} />
}
