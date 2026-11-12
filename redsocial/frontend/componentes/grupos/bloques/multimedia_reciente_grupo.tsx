import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { VisorMedios } from '../../compartido/interfaz/visor_medios'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { MultimediaRecienteGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const textos = catalogoGrupos.detalle.recientes
const clases = catalogoGrupos.clases.detalle

export function MultimediaRecienteGrupo({ grupo, alVerTodo }: MultimediaRecienteGrupoProps) {
  const [abierta, setAbierta] = useState<number | null>(null)
  const medios = grupo.recientes.map((imagen, indice) => ({ id: String(indice), url: imagen, etiqueta: textos.imagen.replace(':n', String(indice + 1)).replace(':nombre', grupo.nombre) }))

  return (
    <section className={clases.tarjeta}>
      <h2 className={clases.titulo_tarjeta}>{textos.titulo}</h2>
      <div className={clases.recientes}>
        {medios.map((medio, indice) => (
          <Boton key={medio.id} type="button" variant="fantasma" size="default" aria-label={medio.etiqueta} className={clases.reciente_boton} onClick={() => setAbierta(indice)}>
            <img src={medio.url} alt={medio.etiqueta} className={clases.reciente_imagen} />
          </Boton>
        ))}
      </div>
      <Boton type="button" variant="secundario" size="default" className={clases.reciente_ver_todo} onClick={alVerTodo}>
        {textos.ver_todo}
      </Boton>
      {abierta !== null && <VisorMedios items={medios} indice={abierta} titulo={textos.visor.replace(':nombre', grupo.nombre)} onCambiar={setAbierta} onCerrar={() => setAbierta(null)} />}
    </section>
  )
}
