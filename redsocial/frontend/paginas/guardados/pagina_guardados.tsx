import { BotonIcono, Boton, EstructuraApp, EstructuraTresColumnas, ColumnaPublicidad, CampoBusqueda, Selector } from '../../componentes/compartido'
import { useState } from 'react'
import catalogoGuardados from '../../catalogos/capacidades/redsocial/guardados.json'
import { PestanasGuardados, TarjetaGrupoGuardado, PanelLateralGuardados } from '../../componentes/guardados'
import { GRUPOS_GUARDADOS, COLECCIONES_GUARDADAS, GRUPOS_RECOMENDADOS_GUARDADOS } from '../../rutas/guardados/rutas_guardados'

const FILTROS = ['todos', 'mis_grupos', 'tecnologia', 'diseno', 'negocios', 'desarrollo_profesional', 'mas'] as const

export function PaginaGuardados() {
  const [filtroActivo, setFiltroActivo] = useState<(typeof FILTROS)[number]>('todos')
  const [vista, setVista] = useState<'cuadricula' | 'listas'>('cuadricula')

  return (
    <EstructuraApp paginaActiva="guardados">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5 flex items-start justify-between gap-5 max-600:flex-col max-600:items-stretch">
              <div>
                <h1 className="m-0 mb-1 text-titulo-pagina font-extrabold text-texto">{catalogoGuardados.titulos.principal}</h1>
                <p className="m-0 text-subtitulo text-texto-suave">{catalogoGuardados.subtitulos.principal}</p>
              </div>
              <CampoBusqueda
                placeholder={catalogoGuardados.placeholders.buscar_guardados}
                aria-label={catalogoGuardados.campos.buscar_guardados}
                className="w-70 max-600:w-auto"
              />
            </div>

            <PestanasGuardados activa="grupos" />

            <div className="mb-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-oculto">
                {FILTROS.map((f) => (
                  <Boton key={f} type="button" onClick={() => setFiltroActivo(f)} variant="filtro" size="filtro" activo={f === filtroActivo} className="flex-none">
                    {catalogoGuardados.filtros[f]}
                    {f === 'todos' ? ` (${GRUPOS_GUARDADOS.length})` : ''}
                  </Boton>
                ))}
              </div>
              <div className="flex flex-none items-center justify-end gap-2">
                <div className="flex items-center gap-1 rounded-lg border border-borde bg-white p-0.5">
                  <BotonIcono icono="cuadricula" type="button" aria-label={catalogoGuardados.titulos_pestanas.grupos} onClick={() => setVista('cuadricula')} variant={vista === 'cuadricula' ? 'primario' : 'sutil'} size="md" />
                  <BotonIcono icono="listas" type="button" aria-label={catalogoGuardados.titulos_pestanas.grupos} onClick={() => setVista('listas')} variant={vista === 'listas' ? 'primario' : 'sutil'} size="md" />
                </div>
                <Selector variant="mini" defaultValue="mas_recientes" aria-label={catalogoGuardados.botones.mas_recientes}>
                  <option value="mas_recientes">{catalogoGuardados.botones.mas_recientes}</option>
                </Selector>
              </div>
            </div>

            <div className={vista === 'cuadricula' ? 'grid grid-cols-2 gap-4 max-1000:grid-cols-1' : 'grid gap-3'}>
              {GRUPOS_GUARDADOS.map((g) => (
                <TarjetaGrupoGuardado key={g.id} grupo={g} />
              ))}
            </div>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={<PanelLateralGuardados colecciones={COLECCIONES_GUARDADAS} recomendados={GRUPOS_RECOMENDADOS_GUARDADOS} />}
      />
    </EstructuraApp>
  )
}
