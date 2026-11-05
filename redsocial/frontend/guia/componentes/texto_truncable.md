# Texto truncable con descripción (`TextoTruncable`)

## 1. Identificación

- **Componente:** `TextoTruncable` y el hook `usarTruncamiento`.
- **Propósito:** mostrar un texto en una línea con puntos suspensivos y descripción emergente solo cuando realmente está recortado.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/texto_truncable.tsx`, `usar_truncamiento.ts`; tipos en `redsocial/frontend/tipos/compartido/contrato_texto_truncable.ts`.
- **Estado:** existente.
- **Consumidores:** 2 archivos: `colaboradores/bloque_reenviar.tsx` y `empresas/fila_empresa.tsx`.

## 2. Origen e implementación

- **Oficial envuelto en parte (B):** `Tooltip` de `@mui/material` dentro de `ProveedorTemaGraficos`; la medición del recorte es propia (`scrollWidth > clientWidth`).

## 3. Contrato y comportamiento

- `TextoTruncableProps`: `texto`, `className?`.
- Mide al entrar el ratón o recibir foco (`onMouseEnter`, `onFocus`); el `<span>` es focalizable (`tabIndex=0`) para que el teclado también obtenga la descripción.

## 4. Estados

- Recortado (con descripción) y no recortado (sin descripción).

## 5. Configuración e integración con el sistema compartido

- `redsocial/frontend/catalogos/capacidades/redsocial/compartido.json › texto_truncable` («block truncate»).

## 6. Dependencias

- `@mui/material` (Tooltip), `ProveedorTemaGraficos`.

## 7. Pruebas existentes

- `pruebas/compartido/texto_truncable.test.tsx` lo nombra (leída, no ejecutada hoy).

## 8. Limitaciones conocidas

- Hay 17 `title=` nativos y otros tooltips MUI en el proyecto que no usan este componente (ver `INFORME_SISTEMA_VISUAL_GLOBAL_2026.md › Auditoría técnica integral`).

Verificado el 2026-10-26 contra el código, los catálogos y los contratos citados (inspección estática). Las pruebas citadas se ejecutaron ese día (Inicio y Perfil: 15 archivos, 133 pruebas en verde) o se leyeron sin ejecutar si se indica. **No verificado visualmente en navegador.** Lo marcado como INFERIDO o PENDIENTE no pudo comprobarse con la evidencia disponible.
