# Tema MUI del proyecto (`ProveedorTemaGraficos`)

## 1. Identificación

- **Componente:** `ProveedorTemaGraficos`.
- **Propósito:** `ThemeProvider` de MUI con el tema único del proyecto. Todos los envoltorios de componentes de librería y el `Tooltip` del selector de empresa lo usan.
- **Ubicación:** `redsocial/frontend/componentes/compartido/proveedor_tema_graficos.tsx`; datos en `catalogos/capacidades/redsocial/compartido.json`.
- **Estado:** existente, ampliado el 2026-10-16/17 (Fase 5) y el 2026-10-19 (`MuiTooltip`).
- **Consumidores:** 27 usos JSX en 24 archivos (conteo del 2026-10-19): `CampoTexto`, `CampoNumero`, `Selector`, `Casilla`, `Radio`, `Interruptor`, `SelectorFecha`, `SelectorHora`, `Menu`, `Paginacion`, `Pestanas`, `Modal`, `Acordeon` (con un tema anidado), `SelectorBuscable` (tooltip) y los gráficos de Dashboard, Estadísticas e Indicadores.

## 2. Origen e implementación

- **Origen:** propio de CodePlex sobre `@mui/material/styles` (`createTheme`, `ThemeProvider`) 7.3.11 y `@mui/x-date-pickers` 8.29.3.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **No es un envoltorio de un componente de librería:** configura el tema que consumen los componentes de `@codeplex-sac/*` (construidos sobre MUI) y los componentes de MUI que el proyecto usa directamente (`Tab`, `Tooltip`).

## 3. Qué define el tema

| Clave del tema | Fuente en `compartido.json` | Efecto |
|---|---|---|
| `typography` | `fuente_heredada` (`fontFamily: inherit`) | Todos los controles de MUI usan la pila global `--fuente-base`; ya no se pinta Roboto/Arial |
| `MuiOutlinedInput.root` | `foco_campo` (`grosor` 2, `halo` `0 0 0 4px`, `opacidad_halo` 0,1) | Borde normal `palette.divider`; foco: borde de 2 px en el primario y halo de 4 px al 10 %; error: color de error. `CampoTexto`, `CampoBusqueda`, `CampoNumero` y `Selector` comparten este estado |
| `MuiPickersOutlinedInput.root` | `radio_campos` (`12px`) y `foco_campo` | Mismo tratamiento para `SelectorFecha` y `SelectorHora`; `hover` con borde primario |
| `MuiInputBase.input` | `placeholder_tema` | Marcador en `--color-texto-suave`, opacidad 1 |
| `MuiMenuItem.root` | `elemento_menu_tema` | `fontSize: var(--text-cuerpo)`; `hover` y foco con `--color-fondo-hover-neutro` |
| `MuiTab.root` | `pestanas_tema` | Sin mayúsculas, `minHeight: 2.5rem`, `fontSize: var(--text-navegacion)`, peso 500 |
| `MuiTooltip.tooltip` (**nuevo, 2026-10-19**) | `tooltip_tema` | Texto `var(--text-auxiliar)`, fondo `var(--color-texto)`, radio `var(--radius-control)` |
| `palette.text` | `texto_tema` | `primary #26243a`, `secondary #6c6a80` |
| `palette.primary.main` | `tema_mui.primario` | **`#5a43f4`**, el mismo valor que `--color-primario` (alineado en la Fase 5) |
| `palette.secondary/success/error/warning/info` | `colores_graficos` | `#06b6d4`, `#22c55e`, `#ef4444`, `#eab308`, `#3b82f6` |

**Decisión vigente sobre el primario.** Hasta la Fase 4 el primario de MUI era `#7c3aed` (tomado de la paleta de gráficos), distinto del primario del sistema; se detectó como hallazgo INC-17 y se corrigió en la Fase 5. `colores_graficos.primario` (`#7c3aed`) sigue existiendo en el catálogo solo para los gráficos; no es el primario del tema. No usarlo para controles.

## 4. Diseño visual

Define radio, tipografía y colores de los controles de MUI. La tipografía heredada hace que usen `--fuente-base`: `Inter` con respaldo del sistema. `Inter` se declara pero **no se entrega** en el proyecto (sin `@font-face`, `<link>` ni paquete), por lo que el navegador usa la primera fuente disponible de la lista (por ejemplo `Segoe UI` en Windows). Está documentado como decisión pendiente en `montaje_local/index.css`.

## 5. Reutilización y restricciones

- Un cambio en este tema afecta a todos los componentes de MUI del proyecto. Cualquier ajuste de foco, borde, tooltip o tipografía se hace aquí y en `compartido.json`, no con `sx` local.
- Los campos que declaran su propio `sx` conservan esa personalización (por ejemplo el editor de publicación, `controles.campo_texto_editor`).
- El `Acordeon` crea un tema anidado propio encima de este (sombra `none` y `Typography body2` como `div`).
- Para un tooltip nuevo, usar `Tooltip` de `@mui/material` dentro de este proveedor: hereda el estilo. No crear estilos de tooltip locales.
- No modificar el código de MUI ni de `@codeplex-sac/*`.

## 6. Historial

- 2026-10-16/17 (Fase 2.6): `typography.fontFamily: inherit`; se retiraron los overrides redundantes de `MuiPaginationItem`, `MuiListItemText` y `MuiTypography` del acordeón.
- 2026-10-17 (Fase 5): `palette.primary.main` ← `tema_mui.primario`; estado de foco, error y borde normal comunes (`foco_campo`) para `MuiOutlinedInput` y `MuiPickersOutlinedInput` (INC-04, INC-17).
- 2026-10-19: `MuiTooltip.styleOverrides.tooltip` ← `tooltip_tema`, para el tooltip del selector de empresa.

## 7. Verificación

- **Verificado (código, 2026-10-19):** `proveedor_tema_graficos.tsx` y `compartido.json`.
- **Verificado (navegador):** foco de 2 px `rgb(90,67,244)` y halo `rgba(90,67,244,0.1) 0 0 0 4px` en campo de texto, multilínea, selector, fecha/hora y `CampoNumero` habilitado (Fases 5 y 6); estilo del tooltip visible en el selector de empresa (2026-10-19).
- **No verificado:** foco y error de `Casilla`, `Radio` e `Interruptor`; estados de error de formularios (no se reprodujo ningún `aria-invalid`).
- Impacto: 24 archivos; los gráficos de `@codeplex-sac/graficos` también heredan la tipografía.
