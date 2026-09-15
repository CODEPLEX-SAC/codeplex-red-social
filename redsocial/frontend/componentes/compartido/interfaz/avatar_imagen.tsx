import { useEstiloDinamico } from '../usar_estilo_dinamico'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

void catalogoCompartido

export function AvatarImagen({ src, className = '' }: { src: string; className?: string }) {
  const ref = useEstiloDinamico<HTMLDivElement>({ 'background-image': `url(${src})` })
  return <div ref={ref} className={`bg-cover bg-center bg-no-repeat ${className}`} />
}
