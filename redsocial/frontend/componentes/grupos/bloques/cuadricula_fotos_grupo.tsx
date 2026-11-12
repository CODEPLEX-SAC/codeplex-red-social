import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { VisorMedios } from '../../compartido/interfaz/visor_medios'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { CuadriculaMediosGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const textos = catalogoGrupos.detalle.multimedia
const clases = catalogoGrupos.clases.detalle

export function CuadriculaFotosGrupo({ grupo, medios }: CuadriculaMediosGrupoProps) {
  const [abierta, setAbierta] = useState<number | null>(null)
  const etiqueta = (indice: number) => textos.foto.replace(':n', String(indice + 1)).replace(':nombre', grupo.nombre)

  if (medios.length === 0) return <MensajeVacio texto={textos.vacio_fotos} className={clases.vacio} />

  return (
    <>
      <div className={clases.fotos_rejilla}>
        {medios.map((medio, indice) => (
          <Boton key={medio.id} type="button" variant="fantasma" size="default" aria-label={etiqueta(indice)} className={clases.foto_boton} onClick={() => setAbierta(indice)}>
            <img src={medio.url} alt={etiqueta(indice)} className={clases.foto_imagen} />
          </Boton>
        ))}
      </div>
      {abierta !== null && <VisorMedios items={[...medios]} indice={abierta} titulo={textos.visor.replace(':nombre', grupo.nombre)} onCambiar={setAbierta} onCerrar={() => setAbierta(null)} />}
    </>
  )
}
