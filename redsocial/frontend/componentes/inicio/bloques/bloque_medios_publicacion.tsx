import { Boton } from '../../compartido/interfaz/boton'
import { VisorMedios } from '../../compartido/interfaz/visor_medios'
import { usarMediosPublicacion } from './usar_medios_publicacion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { MedioLocalPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'
import type { MediosPublicacionProps } from '@/tipos/inicio/contrato_feed_inicio'

const textos = catalogoInicio.medios
const clases = textos.clases

function ImagenPublicacion({ medio, etiqueta, clase, onAbrir }: { medio: MedioLocalPublicacion; etiqueta: string; clase: string; onAbrir: (id: string) => void }) {
  const abrir = () => onAbrir(medio.id)

  return (
    <Boton type="button" variant="fantasma" size="default" onClick={abrir} aria-label={etiqueta} className={clases.boton}>
      <img src={medio.url} alt={etiqueta} className={clase} />
    </Boton>
  )
}

export function BloqueMediosPublicacion({ medios }: MediosPublicacionProps) {
  const estado = usarMediosPublicacion(medios)
  const { abierta, imagenes, visibles, restantes } = estado
  const unico = medios.length === 1
  const claseMedio = unico ? clases.medio_unico : clases.medio

  return (
    <>
      <div className={unico ? clases.uno : clases.varios}>
        {visibles.map((medio, indice) => {
          const etiqueta = textos.texto_alternativo.replace(':numero', String(indice + 1))
          const esUltimo = indice === visibles.length - 1
          return (
            <div key={medio.id} className={clases.item}>
              {medio.esVideo ? <video src={medio.url} controls aria-label={etiqueta} className={claseMedio} /> : <ImagenPublicacion medio={medio} etiqueta={etiqueta} clase={claseMedio} onAbrir={estado.abrirImagen} />}
              {esUltimo && restantes > 0 && <span className={clases.restantes}>{textos.mas.replace(':cantidad', String(restantes))}</span>}
            </div>
          )
        })}
      </div>
      {abierta !== null && <VisorMedios items={imagenes} indice={abierta} titulo={textos.etiqueta_visor} onCambiar={estado.setAbierta} onCerrar={estado.cerrarVisor} />}
    </>
  )
}
