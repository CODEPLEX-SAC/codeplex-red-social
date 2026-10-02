import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function AvatarImagen({ src, alt = catalogoCompartido.campos.alt_decorativo, className = '' }: { src: string; alt?: string; className?: string }) {
  return <img src={src} alt={alt} className={`object-cover object-center ${className}`} />
}
