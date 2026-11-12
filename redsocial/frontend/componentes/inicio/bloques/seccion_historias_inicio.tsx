import { CarruselHistoriasInicio } from './carrusel_historias_inicio'
import { ModalCrearHistoria } from './modal_crear_historia'
import { usarSeccionHistorias } from './usar_seccion_historias'
import { VisorHistoria } from './visor_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { SeccionHistoriasInicioProps } from '@/tipos/inicio/contrato_historia'

export function SeccionHistoriasInicio({ historias, publicadas, deContactos, acciones, onPublicar }: SeccionHistoriasInicioProps) {
  const seccion = usarSeccionHistorias(historias, publicadas, deContactos)

  return (
    <section className="relative mb-4 rounded-xl border border-borde bg-white pt-4">
      <h2 className="m-0 mb-3 px-4 text-titulo-seccion text-texto">{catalogoInicio.secciones.historias}</h2>
      <CarruselHistoriasInicio
        historias={historias}
        publicadas={publicadas}
        deContactos={deContactos}
        autoresConHistorias={seccion.autoresConHistorias}
        onCrear={seccion.abrirCreador}
        onVer={seccion.abrirVisor}
      />
      {seccion.creando && <ModalCrearHistoria onPublicar={onPublicar} onCerrar={seccion.cerrarCreador} />}
      {seccion.abierto && (
        <VisorHistoria
          grupos={seccion.grupos}
          indiceGrupo={seccion.indiceGrupo}
          segmento={seccion.segmento}
          acciones={acciones}
          hayAnterior={seccion.hayAnterior}
          haySiguiente={seccion.haySiguiente}
          onSeleccionarGrupo={seccion.seleccionarGrupo}
          onAnterior={seccion.retroceder}
          onSiguiente={seccion.avanzar}
          onCerrar={seccion.cerrarVisor}
        />
      )}
    </section>
  )
}
