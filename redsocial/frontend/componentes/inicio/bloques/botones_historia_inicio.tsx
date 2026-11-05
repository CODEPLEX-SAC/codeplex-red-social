import { imagenPerfilPedroRedSocial, imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import { LienzoHistoria } from './lienzo_historia'
import { textoLimiteSegmentos } from './logica_grupos_historias'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { BotonCrearHistoriaProps, BotonHistoriaContactoProps, BotonHistoriaPropiaProps, HistoriaContactoProps } from '@/tipos/inicio/contrato_historia'

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

export function BotonHistoriaPropia({ historia, onVer }: BotonHistoriaPropiaProps) {
  const ver = () => onVer(historia)

  return (
    <Boton type="button" variant="fantasma" size="enlace" onClick={ver} className={clases.boton_historia}>
      <SuperficieColor as="span" degradado="primario" className={clases.miniatura_anillo}>
        <span className={clases.miniatura_circulo}>
          <span className={clases.miniatura_lienzo}>
            <LienzoHistoria borrador={historia.borrador} inmersivo miniatura />
          </span>
        </span>
      </SuperficieColor>
      <span className={`${clases.etiqueta_historia} text-texto-suave`}>{catalogoInicio.historias.flujo.etiqueta_propia}</span>
    </Boton>
  )
}

export function BotonHistoriaContacto({ nombre, historia, onVer }: BotonHistoriaContactoProps) {
  const ver = () => onVer(historia)

  return (
    <Boton type="button" variant="fantasma" size="enlace" onClick={ver} aria-label={nombre} className={clases.boton_historia}>
      <SuperficieColor as="span" degradado="primario" className={clases.miniatura_anillo}>
        <span className={clases.miniatura_circulo}>
          <span className={clases.miniatura_lienzo}>
            <LienzoHistoria borrador={historia.borrador} inmersivo miniatura />
          </span>
        </span>
      </SuperficieColor>
      <span className={`${clases.etiqueta_historia} text-texto-suave`}>{nombre}</span>
    </Boton>
  )
}

export function HistoriaContacto({ nombre }: HistoriaContactoProps) {
  return (
    <div className="flex w-27.5 flex-none flex-col items-center gap-2">
      <span className={clases.mini_sin_historia}>
        <AvatarUsuario tamano="historia" imagen={usuarioImg} className="border-3 border-white" />
      </span>
      <span className={`${clases.etiqueta_historia} text-texto-suave`}>{nombre}</span>
    </div>
  )
}
