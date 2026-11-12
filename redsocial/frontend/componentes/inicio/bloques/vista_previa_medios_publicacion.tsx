import { Icono } from '../../compartido/icono'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { disenoMosaico, mediosVisibles, restantesDe } from './logica_medios_publicacion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { VistaPreviaMediosPublicacionProps } from '@/tipos/inicio/contrato_crear_publicacion'

const textos = catalogoInicio.modal_crear_publicacion.medios

export function VistaPreviaMediosPublicacion({ medios, onQuitar }: VistaPreviaMediosPublicacionProps) {
  if (medios.length === 0) return null

  const visibles = mediosVisibles(medios)
  const restantes = restantesDe(medios)
  const unico = medios.length === 1
  const diseno = disenoMosaico(visibles.length)
  const claseMedio = unico ? textos.medio_unico_vista_previa : textos.medio_vista_previa

  return (
    <ul aria-label={textos.vista_previa} className={`${textos.contenedor_vista_previa} ${diseno.contenedor}`}>
      {visibles.map((medio, indice) => {
        const numero = String(indice + 1)
        const esUltimo = indice === visibles.length - 1
        return (
          <li key={medio.id} className={`${textos.elemento_vista_previa} ${diseno.items[indice]}`}>
            {medio.esVideo ? (
              <>
                <video src={medio.url} muted preload="metadata" aria-label={textos.texto_alternativo.replace(':numero', numero)} className={claseMedio} />
                <span className={textos.indicador_video}>
                  <Icono name="video" className="h-8 w-8" />
                </span>
              </>
            ) : (
              <img src={medio.url} alt={textos.texto_alternativo.replace(':numero', numero)} className={claseMedio} />
            )}
            {esUltimo && restantes > 0 && <span className={textos.restantes_vista_previa}>{catalogoInicio.medios.mas.replace(':cantidad', String(restantes))}</span>}
            <BotonIcono icono="cerrar" type="button" aria-label={textos.quitar.replace(':numero', numero)} onClick={() => onQuitar(medio.id)} variant="flotante" size="md" className={textos.quitar_clase} />
          </li>
        )
      })}
    </ul>
  )
}
