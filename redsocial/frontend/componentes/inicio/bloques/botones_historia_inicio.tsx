import { imagenPerfilPedroRedSocial } from '../../compartido'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { textoLimiteSegmentos } from './logica_grupos_historias'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { BotonCrearHistoriaProps } from '@/tipos/inicio/contrato_historia'

const clases = catalogoInicio.historias.flujo.clases

export function BotonCrearHistoria({ nombre, limiteAlcanzado, onCrear }: BotonCrearHistoriaProps) {
  const aviso = limiteAlcanzado ? textoLimiteSegmentos(catalogoInicio.historias.flujo.crear.limite_segmentos) : undefined

  return (
    <Boton type="button" variant="fantasma" size="enlace" aria-haspopup="dialog" disabled={limiteAlcanzado} title={aviso} onClick={onCrear} className={clases.boton_historia}>
      <span className="relative grid h-26 w-26 place-items-center rounded-full bg-borde">
        <AvatarUsuario tamano="historia" imagen={imagenPerfilPedroRedSocial} className="border-3 border-white" insignia="+" colorInsignia="primario" />
      </span>
      <span className={`${clases.etiqueta_historia} font-titulo text-texto`}>{nombre}</span>
    </Boton>
  )
}
