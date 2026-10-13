import { CodeplexMigasPan } from '@codeplex-sac/navegacion'
import type { CodeplexMigasPanProps } from '@codeplex-sac/navegacion'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { ProveedorTemaGraficos } from '../../compartido/proveedor_tema_graficos'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { CabeceraEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

const migas = catalogoEmpresas.migas

export function CabeceraEmpresas({ alNuevaEmpresa }: CabeceraEmpresasProps) {
  return (
    <div className="mb-5">
      <nav aria-label={migas.etiqueta} className="mb-3 text-auxiliar">
        <ProveedorTemaGraficos>
          <CodeplexMigasPan elementos={[{ etiqueta: migas.espacio_trabajo }, { etiqueta: migas.empresas }]} sx={migas.sx as CodeplexMigasPanProps['sx']} />
        </ProveedorTemaGraficos>
      </nav>
      <div className="flex flex-wrap items-start justify-between gap-3 max-600:flex-col max-600:items-stretch">
        <div>
          <h1 className="m-0 mb-1 text-titulo-pagina text-texto">{catalogoEmpresas.titulos.listado}</h1>
          <p className={catalogoEmpresas.clases.texto_descriptivo}>{catalogoEmpresas.subtitulos.listado}</p>
        </div>
        <Boton type="button" variant="primario" size="md" onClick={alNuevaEmpresa}>
          <Icono name="mas" className="w-4 h-4" />
          {catalogoEmpresas.botones.nueva_empresa}
        </Boton>
      </div>
    </div>
  )
}
