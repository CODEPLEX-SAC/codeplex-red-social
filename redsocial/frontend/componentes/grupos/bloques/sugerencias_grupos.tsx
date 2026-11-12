import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { Selector } from '../../compartido/interfaz/selector'
import { BotonCrearGrupo } from './boton_crear_grupo'
import { LateralSugerenciasGrupos } from './lateral_sugerencias_grupos'
import { PaginaConLateralGrupos } from './pagina_con_lateral_grupos'
import { SeccionSugerenciasGrupos } from './seccion_sugerencias_grupos'
import { usarSugerenciasGrupos } from './usar_sugerencias_grupos'
import { coincideGrupoSugerido } from './logica_sugerencias_grupos'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { CabeceraPaginaGrupos } from '@/tipos/grupos/contrato_lateral_grupos'
import type { GrupoSugerido } from '@/tipos/grupos/contrato_tus_grupos'

const textos = catalogoGrupos.sugerencias
const clases = catalogoGrupos.clases.sugerencias

export function SugerenciasGrupos({ cabecera, categorias }: { cabecera: CabeceraPaginaGrupos; categorias: readonly string[] }) {
  const { puerto, imagenCrear } = cabecera
  const estado = usarSugerenciasGrupos()
  const { paraTi, mas } = puerto.sugeridos()
  const filtrar = (lista: readonly GrupoSugerido[]) => lista.filter((grupo) => coincideGrupoSugerido(grupo, estado.texto, estado.categoria))
  const visiblesParaTi = filtrar(paraTi)
  const visiblesMas = filtrar(mas)

  function unirse(nombre: string) {
    puerto.unirse(nombre)
    estado.mostrarAviso(textos.unido.replace(':nombre', nombre))
  }

  const crear = <BotonCrearGrupo imagen={imagenCrear} puerto={puerto} variante="contorno" anchoCompleto />

  return (
    <PaginaConLateralGrupos cabecera={cabecera} lateral={<LateralSugerenciasGrupos categorias={categorias} categoriaActiva={estado.categoria} alElegirCategoria={estado.cambiarCategoria} crear={crear} />}>
      <div className={clases.pagina}>
        <div className={clases.filtros}>
          <CampoBusqueda className={clases.buscador} placeholder={textos.buscar} aria-label={textos.buscar} value={estado.texto} onChange={(evento) => estado.cambiarTexto(evento.target.value)} />
          <Selector variant="default" className={clases.categoria} aria-label={textos.categoria} value={estado.categoria} onChange={(evento) => estado.cambiarCategoria(String(evento.target.value))}>
            <option value={String()}>{textos.todas}</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </Selector>
        </div>
        {estado.aviso !== String() && (
          <p aria-live="polite" className={clases.aviso}>
            {estado.aviso}
          </p>
        )}
        <SeccionSugerenciasGrupos titulo={textos.para_ti} grupos={visiblesParaTi} alUnirse={unirse} />
        <SeccionSugerenciasGrupos titulo={textos.mas} grupos={visiblesMas} alUnirse={unirse} />
        {visiblesParaTi.length + visiblesMas.length === 0 && <MensajeVacio texto={textos.sin_resultados} className="py-8" />}
      </div>
    </PaginaConLateralGrupos>
  )
}
