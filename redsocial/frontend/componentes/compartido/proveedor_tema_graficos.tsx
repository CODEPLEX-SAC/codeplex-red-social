import { ThemeProvider, alpha, createTheme } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'
import { outlinedInputClasses } from '@mui/material/OutlinedInput'
import type {} from '@mui/x-date-pickers/themeAugmentation'
import { pickersOutlinedInputClasses } from '@mui/x-date-pickers/PickersTextField'
import type { ReactNode } from 'react'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

const foco = catalogoCompartido.foco_campo

function haloFoco(color: string) {
  return [foco.halo, alpha(color, foco.opacidad_halo)].join(' ')
}

function estiloCampoOutlined(theme: Theme) {
  const contorno = `& .${outlinedInputClasses.notchedOutline}`
  return {
    [contorno]: { borderColor: theme.palette.divider },
    [`&.${outlinedInputClasses.focused} ${contorno}`]: { borderWidth: foco.grosor, borderColor: theme.palette.primary.main, boxShadow: haloFoco(theme.palette.primary.main) },
    [`&.${outlinedInputClasses.error} ${contorno}`]: { borderColor: theme.palette.error.main },
    [`&.${outlinedInputClasses.error}.${outlinedInputClasses.focused} ${contorno}`]: { boxShadow: haloFoco(theme.palette.error.main) },
  }
}

const temaGraficos = createTheme({
  typography: catalogoCompartido.fuente_heredada,
  components: {
    MuiOutlinedInput: { styleOverrides: { root: ({ theme }) => estiloCampoOutlined(theme) } },
    MuiInputBase: { styleOverrides: { input: catalogoCompartido.placeholder_tema } },
    MuiMenuItem: { styleOverrides: { root: catalogoCompartido.elemento_menu_tema } },
    MuiTooltip: { styleOverrides: { tooltip: catalogoCompartido.tooltip_tema } },
    MuiTab: { styleOverrides: { root: catalogoCompartido.pestanas_tema } },
    MuiPickersOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: catalogoCompartido.radio_campos,
          [`& .${pickersOutlinedInputClasses.notchedOutline}`]: { borderColor: theme.palette.divider },
          [`&:hover .${pickersOutlinedInputClasses.notchedOutline}`]: { borderColor: theme.palette.primary.main },
          [`&.${pickersOutlinedInputClasses.focused} .${pickersOutlinedInputClasses.notchedOutline}`]: { borderWidth: foco.grosor, borderColor: theme.palette.primary.main, boxShadow: haloFoco(theme.palette.primary.main) },
          [`&.${pickersOutlinedInputClasses.error} .${pickersOutlinedInputClasses.notchedOutline}`]: { borderColor: theme.palette.error.main },
        }),
      },
    },
  },
  palette: {
    text: catalogoCompartido.texto_tema,
    primary: { main: catalogoCompartido.tema_mui.primario },
    secondary: { main: catalogoCompartido.colores_graficos.secundario },
    success: { main: catalogoCompartido.colores_graficos.exito },
    error: { main: catalogoCompartido.colores_graficos.error },
    warning: { main: catalogoCompartido.colores_graficos.advertencia },
    info: { main: catalogoCompartido.colores_graficos.info },
  },
})

export function ProveedorTemaGraficos({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={temaGraficos}>{children}</ThemeProvider>
}
