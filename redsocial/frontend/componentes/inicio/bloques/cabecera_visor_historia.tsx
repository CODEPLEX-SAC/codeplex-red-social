import { imagenRedSocialDe } from '../../compartido'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { MenuHistoria } from './menu_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { CabeceraVisorHistoriaProps } from '@/tipos/inicio/contrato_historia'
import type { EstadoSegmentoHistoria } from '@/tipos/inicio/modelo_historia'

const textos = catalogoInicio.historias.flujo.visor
const clases = catalogoInicio.historias.flujo.clases
const duracion = catalogoInicio.historias.reproduccion.clase_duracion

function RellenoProgreso() {
  return <span className={`${clases.segmento_relleno} ${duracion}`} />
}

function SegmentoProgreso({ estado, clave }: { estado: EstadoSegmentoHistoria; clave: string }) {
  return (
    <li aria-current={estado === 'actual' ? 'step' : undefined} className={`${clases.segmento} ${estado === 'visto' ? clases.segmento_activo : clases.segmento_inactivo}`}>
      {estado === 'actual' && <RellenoProgreso key={clave} />}
    </li>
  )
}

export function CabeceraVisorHistoria({ historia, segmentos, propia, onEliminar }: CabeceraVisorHistoriaProps) {
  return (
    <div className={clases.cabecera_visor}>
      <ul aria-label={textos.etiqueta_progreso} className={clases.progreso}>
        {segmentos.map((estado, posicion) => (
          <SegmentoProgreso key={posicion} estado={estado} clave={historia.id} />
        ))}
      </ul>
      <div className={clases.autor_visor}>
        <AvatarUsuario tamano="md" imagen={imagenRedSocialDe(historia.autorId)} />
        <div className={clases.datos_autor}>
          <strong className={clases.nombre_autor}>{historia.nombre}</strong>
          <span className={clases.tiempo_autor}>{historia.tiempo}</span>
        </div>
        {propia && <MenuHistoria historia={historia} onEliminar={onEliminar} />}
      </div>
    </div>
  )
}
