import { ListaVerificacionPerfil } from './lista_verificacion_perfil'
import { edicionDeValores } from './logica_edicion_perfil'
import { SeccionCamposPerfil } from './seccion_campos_perfil'
import { SeccionDetallesFijadosPerfil } from './seccion_detalles_fijados_perfil'
import { SeccionHabilidadesPerfil } from './seccion_habilidades_perfil'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { PestanaResumenPerfilProps } from '@/tipos/perfil/contrato_perfil'
import type { DefinicionSeccionPerfil } from '@/tipos/perfil/modelo_perfil'

const secciones = catalogoPerfil.secciones
const PRESENTACION = secciones.presentacion as DefinicionSeccionPerfil
const DATOS_PERSONALES = secciones.datos_personales as DefinicionSeccionPerfil

export function PestanaResumenPerfil({ perfil, propio, onGuardar, onIrA }: PestanaResumenPerfilProps) {
  return (
    <>
      {propio && <ListaVerificacionPerfil perfil={perfil} onIrA={onIrA} />}
      <SeccionCamposPerfil definicion={PRESENTACION} valores={{ acerca: perfil.acerca }} propio={propio} onGuardar={(valores) => onGuardar(edicionDeValores(valores))} />
      <SeccionCamposPerfil
        definicion={DATOS_PERSONALES}
        valores={{ ciudad: perfil.ciudad, pais: perfil.pais, fechaNacimiento: perfil.fechaNacimiento, genero: perfil.genero, situacionSentimental: perfil.situacionSentimental }}
        propio={propio}
        onGuardar={(valores) => onGuardar(edicionDeValores(valores))}
      />
      <SeccionHabilidadesPerfil habilidades={perfil.habilidades} propio={propio} onGuardar={(habilidades) => onGuardar({ habilidades })} />
      {propio && <SeccionDetallesFijadosPerfil detalles={perfil.detallesFijados} onGuardar={(detallesFijados) => onGuardar({ detallesFijados })} />}
    </>
  )
}
