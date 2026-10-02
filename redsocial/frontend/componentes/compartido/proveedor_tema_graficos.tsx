import { ThemeProvider, createTheme } from '@mui/material/styles'
import type {} from '@mui/x-date-pickers/themeAugmentation'
import { pickersOutlinedInputClasses } from '@mui/x-date-pickers/PickersTextField'
import type { ReactNode } from 'react'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

const temaGraficos = createTheme({
  components: {
    MuiPaginationItem: { styleOverrides: { root: catalogoCompartido.fuente_heredada } },
    MuiListItemText: { styleOverrides: { primary: catalogoCompartido.fuente_heredada } },
    MuiTab: { styleOverrides: { root: catalogoCompartido.pestanas_tema } },
    MuiPickersOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: catalogoCompartido.radio_campos,
          [`& .${pickersOutlinedInputClasses.notchedOutline}`]: { borderColor: theme.palette.divider },
          [`&:hover .${pickersOutlinedInputClasses.notchedOutline}`]: { borderColor: theme.palette.primary.main },
        }),
      },
    },
  },
  palette: {
    primary: { main: catalogoCompartido.colores_graficos.primario },
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
