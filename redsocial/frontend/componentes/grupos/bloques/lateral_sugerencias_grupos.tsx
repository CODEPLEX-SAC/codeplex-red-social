import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { TarjetaLateralGrupos } from './tarjeta_lateral_grupos'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { LateralSugerenciasGruposProps } from '@/tipos/grupos/contrato_lateral_grupos'

const textos = catalogoGrupos.lateral.sugerencias
const clases = catalogoGrupos.clases.pagina_lateral
const ICONOS: Record<string, string> = textos.categorias.iconos

export function LateralSugerenciasGrupos({ categorias, categoriaActiva, alElegirCategoria, crear }: LateralSugerenciasGruposProps) {
  return (
    <>
      <TarjetaLateralGrupos titulo={textos.categorias.titulo} texto={textos.categorias.texto} icono="categoria-evento">
        <ul className={clases.lista}>
          {categorias.map((categoria) => (
            <li key={categoria}>
              <Boton type="button" variant="fantasma" size="default" aria-pressed={categoriaActiva === categoria} aria-label={textos.categorias.etiqueta.replace(':categoria', categoria)} className="w-full justify-start gap-3 px-1 text-left" onClick={() => alElegirCategoria(categoriaActiva === categoria ? String() : categoria)}>
                <span className={[clases.fila_icono, clases.icono_caja].join(' ')}>
                  <Icono name={(ICONOS[categoria] ?? 'grupos') as IconName} className={clases.icono} />
                </span>
                <span className={clases.fila_titulo}>{categoria}</span>
              </Boton>
            </li>
          ))}
        </ul>
      </TarjetaLateralGrupos>
      <TarjetaLateralGrupos titulo={textos.motivo.titulo} texto={textos.motivo.texto} icono="informacion" variante="suave" />
      <TarjetaLateralGrupos titulo={textos.crear.titulo} texto={textos.crear.texto} icono="grupos" variante="verde">
        {crear}
      </TarjetaLateralGrupos>
    </>
  )
}
