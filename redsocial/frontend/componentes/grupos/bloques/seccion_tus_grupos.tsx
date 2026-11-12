import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { Paginacion } from '../../compartido/interfaz/paginacion'
import { Selector } from '../../compartido/interfaz/selector'
import { filtrarYOrdenar, paginar, totalPaginas } from './logica_tus_grupos'
import { TarjetaTuGrupo } from './tarjeta_tu_grupo'
import { usarTusGrupos } from './usar_tus_grupos'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { PuertoGrupos } from '@/tipos/grupos/contrato_puerto_grupos'
import type { TuGrupo } from '@/tipos/grupos/contrato_tus_grupos'

const textos = catalogoGrupos.tus_grupos
const clases = catalogoGrupos.clases.tus_grupos

function textosDe(administrados: boolean) {
  if (administrados) return { buscar: textos.buscar_administrados, titulo: textos.titulo_administrados }
  return { buscar: textos.buscar, titulo: textos.titulo }
}

export function SeccionTusGrupos({ grupos, puerto, administrados = false }: { grupos: readonly TuGrupo[]; puerto: PuertoGrupos; administrados?: boolean }) {
  const consulta = usarTusGrupos()
  const coincidentes = filtrarYOrdenar(grupos, consulta.texto, consulta.orden)
  const paginas = totalPaginas(coincidentes.length, textos.tamano_pagina)
  const visibles = paginar(coincidentes, Math.min(consulta.pagina, paginas), textos.tamano_pagina)
  const sinGrupos = grupos.length === 0
  const { buscar, titulo } = textosDe(administrados)

  return (
    <section className={clases.pagina}>
      <div className={clases.filtros}>
        <CampoBusqueda className={clases.buscador} placeholder={buscar} aria-label={buscar} value={consulta.texto} onChange={(evento) => consulta.cambiarTexto(evento.target.value)} />
        <Selector variant="default" className={clases.orden} aria-label={textos.orden} value={consulta.orden} onChange={(evento) => consulta.cambiarOrden(String(evento.target.value))}>
          {textos.ordenes.map((orden) => (
            <option key={orden.valor} value={orden.valor}>
              {orden.etiqueta}
            </option>
          ))}
        </Selector>
      </div>
      <div className={clases.titulo_fila}>
        <h2 className={clases.titulo}>{titulo.replace(':n', String(coincidentes.length))}</h2>
      </div>
      <div className={clases.rejilla}>
        {sinGrupos && <MensajeVacio texto={catalogoGrupos.mensajes.sin_grupos} className={clases.vacio} />}
        {!sinGrupos && coincidentes.length === 0 && <MensajeVacio texto={textos.sin_resultados} className={clases.vacio} />}
        {visibles.map((grupo) => (
          <TarjetaTuGrupo key={grupo.id} grupo={grupo} puerto={puerto} />
        ))}
      </div>
      {paginas > 1 && (
        <nav aria-label={textos.paginacion} className={clases.paginacion}>
          <Paginacion total={paginas} pagina={Math.min(consulta.pagina, paginas)} alCambiar={consulta.cambiarPagina} />
        </nav>
      )}
    </section>
  )
}
