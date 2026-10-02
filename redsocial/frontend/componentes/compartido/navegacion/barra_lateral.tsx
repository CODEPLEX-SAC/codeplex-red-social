import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CodeplexBarraLateral } from '@codeplex-sac/diseno'
import { irARuta } from '../interfaz/menu'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { BarraLateralProps } from '@/tipos/compartido/contrato_barra_lateral'
import { elementosDeLaBarra } from './elementos_barra_lateral'

const CONFIGURACION = catalogoCompartido.barra_lateral

export function BarraLateral({ paginaActiva, colapsado = false, alAlternarColapsado }: BarraLateralProps) {
  return (
    <ProveedorTemaGraficos>
      <ThemeProvider theme={(temaExterno) => createTheme(temaExterno, { breakpoints: { values: CONFIGURACION.puntos_quiebre } })}>
        <CodeplexBarraLateral
          elementos={elementosDeLaBarra(paginaActiva)}
          ancho={CONFIGURACION.ancho}
          textoLogo={textosRedSocial.MARCA}
          colapsado={colapsado}
          alAlternar={alAlternarColapsado}
          alNavegar={irARuta}
        />
      </ThemeProvider>
    </ProveedorTemaGraficos>
  )
}
