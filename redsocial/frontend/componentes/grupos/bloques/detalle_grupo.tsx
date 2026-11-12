import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { AccionesDetalleGrupo } from './acciones_detalle_grupo'
import { AccionesPestanasGrupo } from './acciones_pestanas_grupo'
import { ColumnaLateralGrupo } from './columna_lateral_grupo'
import { ContenidoPestanaGrupo } from './contenido_pestana_grupo'
import { ContenidoPropioGrupo } from './contenido_propio_grupo'
import { ModalesDetalleGrupo } from './modales_detalle_grupo'
import { PestanasDetalleGrupo } from './pestanas_detalle_grupo'
import { PortadaGrupo } from './portada_grupo'
import { usarDetalleGrupo } from './usar_detalle_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { DetalleGrupoVistaProps } from '@/tipos/grupos/contrato_gestion_grupos'

const detalle = catalogoGrupos.detalle
const clases = catalogoGrupos.clases.detalle

export function DetalleGrupoVista({ grupo, enlace, puerto, almacenInicio, candidatos, contenidoInicial }: DetalleGrupoVistaProps) {
  const { estado, medios, publicaciones, portada, hechos, verTodoMultimedia, compartirGrupo, publicar, atenderPaso } = usarDetalleGrupo({ grupo, enlace, puerto, almacenInicio, candidatos, contenidoInicial })

  if (estado.verContenido) return <ContenidoPropioGrupo grupo={grupo} feed={publicaciones.feed} alVerEnGrupo={estado.irAlGrupo} alVolver={estado.irAlGrupo} />

  const acciones = <AccionesDetalleGrupo grupo={grupo} enlace={enlace} puerto={puerto} alInvitar={() => estado.abrirModal('invitar')} alCompartir={() => estado.abrirModal('compartir')} />

  return (
    <div className={clases.pagina}>
      <input ref={portada.selector} type="file" accept={detalle.portada_tipos} hidden tabIndex={-1} aria-label={detalle.portada_selector} onChange={portada.elegir} />
      <PortadaGrupo grupo={grupo} acciones={acciones} accionesPestanas={<AccionesPestanasGrupo grupo={grupo} enlace={enlace} puerto={puerto} alBuscar={estado.alternarBusqueda} alTuContenido={estado.verTuContenido} />} alEditarPortada={portada.abrir}>
        <PestanasDetalleGrupo rol={grupo.rol} activa={estado.pestana} alCambiar={estado.cambiarPestana} />
      </PortadaGrupo>
      {estado.buscando && (
        <div className={clases.busqueda}>
          <CampoBusqueda placeholder={detalle.buscar_en_grupo} aria-label={detalle.buscar_en_grupo} value={estado.consulta} onChange={(evento) => estado.cambiarConsulta(evento.target.value)} />
        </div>
      )}
      {estado.aviso !== String() && (
        <p aria-live="polite" className={clases.aviso}>
          {estado.aviso}
        </p>
      )}
      <div className={clases.rejilla}>
        <div className={clases.columna}>
          <ContenidoPestanaGrupo pestana={estado.pestana} grupo={grupo} multimedia={estado.multimedia} alCambiarMultimedia={estado.cambiarMultimedia} medios={medios} alAviso={estado.mostrarAviso} alAbrirPublicacion={estado.abrirPublicacion} feed={publicaciones.feed} acciones={publicaciones.acciones} consulta={estado.consulta} />
        </div>
        <ColumnaLateralGrupo grupo={grupo} hechos={hechos} guiaVisible={estado.guiaVisible} alAccion={atenderPaso} alCerrarGuia={estado.cerrarGuia} alVerTodoMultimedia={verTodoMultimedia} />
      </div>
      <ModalesDetalleGrupo grupo={grupo} puerto={puerto} candidatos={candidatos} estado={estado} alPublicar={publicar} alCompartir={compartirGrupo} />
    </div>
  )
}
