import { useState } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Boton } from '../../compartido/interfaz/boton'
import { Insignia } from '../../compartido/interfaz/insignia'
import { contarPreguntas, filtrarPreguntas } from './logica_red_social_perfil'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { PanelMisPreguntasPerfilProps } from '@/tipos/perfil/contrato_perfil'
import type { FiltroPreguntas } from '@/tipos/perfil/modelo_perfil'

const textos = catalogoPerfil.red_social.preguntas
const clases = catalogoPerfil.clases.red_social
const PRIORIDADES = catalogoInicio.modal_crear_publicacion.prioridad.opciones
const CLASES_PRIORIDAD: Record<string, string> = catalogoInicio.publicacion.clases_prioridad

export function PanelMisPreguntasPerfil({ preguntas, acciones, propio }: PanelMisPreguntasPerfilProps) {
  const [filtro, setFiltro] = useState<FiltroPreguntas>('todas')
  const { total, resueltas, pendientes } = contarPreguntas(preguntas)
  const visibles = filtrarPreguntas(preguntas, filtro)
  const vacio = total === 0 ? textos.vacio_propio : filtro === 'resuelta' ? textos.vacio_resueltas : textos.vacio_pendientes

  return (
    <section className={catalogoPerfil.clases.vacio}>
      <div className={clases.resumen_preguntas}>
        <span className="text-subtitulo text-texto">{`${total} ${total === 1 ? textos.total_singular : textos.total_plural} · ${resueltas} ${textos.resueltas} · ${pendientes} ${textos.pendientes}`}</span>
        <div role="group" aria-label={textos.etiqueta_filtros} className="flex gap-1">
          {textos.filtros.map((opcion) => (
            <Boton key={opcion.clave} type="button" variant="filtro" size="filtro" activo={filtro === opcion.clave} aria-pressed={filtro === opcion.clave} onClick={() => setFiltro(opcion.clave as FiltroPreguntas)}>
              {opcion.etiqueta}
            </Boton>
          ))}
        </div>
      </div>
      {visibles.length === 0 && <p className="m-0 px-5 py-8 text-center text-subtitulo text-texto-suave">{vacio}</p>}
      {visibles.map((pregunta) => {
        if (pregunta.clase !== 'texto') return null
        const prioridad = PRIORIDADES.find((candidata) => candidata.valor === pregunta.prioridad)
        const util = pregunta.comentarioUtil
        return (
          <article key={pregunta.id} className={clases.fila_pregunta}>
            <div className="flex flex-wrap items-center gap-2">
              {prioridad && <Insignia variant="status" className={CLASES_PRIORIDAD[prioridad.valor]}>{prioridad.etiqueta}</Insignia>}
              <Insignia variant="status" className={(util ? catalogoInicio.pregunta_estado.resuelta : catalogoInicio.pregunta_estado.sin_resolver).clase}>{(util ? catalogoInicio.pregunta_estado.resuelta : catalogoInicio.pregunta_estado.sin_resolver).etiqueta}</Insignia>
              <span className="ml-auto text-auxiliar text-texto-suave">{pregunta.tiempo}</span>
            </div>
            <p className="m-0 text-cuerpo text-texto">{pregunta.texto}</p>
            {!util && propio && <p className="m-0 text-auxiliar italic text-texto-suave">{textos.aviso_pendiente}</p>}
            {util && (
              <div className={clases.respuesta_util}>
                <div className="min-w-0 flex-1">
                  <strong className="block text-auxiliar text-primario">{textos.respuesta_util.replace(':autor', util.autor)}</strong>
                  <span className="text-subtitulo text-texto">{util.texto}</span>
                </div>
                {propio && <BotonIcono icono="cerrar" type="button" aria-label={textos.desmarcar} onClick={() => acciones.onMarcarUtil(pregunta.id, null)} variant="discreto" size="sm" />}
              </div>
            )}
          </article>
        )
      })}
    </section>
  )
}
