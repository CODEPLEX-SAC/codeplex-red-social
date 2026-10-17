import { ThemeProvider, createTheme } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'
import { CodeplexAcordeon } from '@codeplex-sac/diseno'
import type { CodeplexAcordeonProps } from '@codeplex-sac/diseno'
import { Icono } from '../icono'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import type { AcordeonProps } from '@/tipos/compartido/contrato_acordeon'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const configuracion = catalogoCompartido.acordeon

function temaAcordeon(externo: Theme) {
  const sombras = [...externo.shadows] as Theme['shadows']
  sombras[1] = configuracion.sombra
  return createTheme(externo, {
    shadows: sombras,
    components: {
      MuiTypography: {
        defaultProps: { variantMapping: configuracion.mapeo_tipografia },
      },
    },
  })
}

export function Acordeon({ elementos, ...resto }: AcordeonProps) {
  const elementosLibreria = elementos.map(({ icono, ...elemento }) => ({
    ...elemento,
    iconoIzquierda: icono ? (
      <span className={catalogoCompartido.selector_buscable.icono_caja}>
        <Icono name={icono} className={configuracion.clases.glifo} />
      </span>
    ) : undefined,
  }))

  return (
    <div className={configuracion.clases.contenedor}>
      <ProveedorTemaGraficos>
        <ThemeProvider theme={temaAcordeon}>
          <CodeplexAcordeon {...(configuracion.predeterminado as Partial<CodeplexAcordeonProps>)} {...resto} elementos={elementosLibreria} />
        </ThemeProvider>
      </ProveedorTemaGraficos>
    </div>
  )
}
