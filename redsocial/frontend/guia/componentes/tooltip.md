# Tooltip (`Tooltip`)

## 1. Identificación

- **Componente:** `Tooltip` y las variantes `llamada`, `llamada_alerta`, `llamada_fin` (tamaño `llamada`) de `BotonIcono`.
- **Propósito:** texto breve contextual sobre un control; usado por los controles de la sala de videollamada («Silenciar micrófono», «Activar cámara», «Compartir pantalla»…).
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/tooltip.tsx`; contrato en `tipos/compartido/contrato_tooltip.ts`; configuración en `compartido.json › tooltip`.
- **Estado:** **nuevo** (noviembre de 2026).

## 2. Origen e implementación

- **Librería con envoltorio:** `CodeplexTooltip` de `@codeplex-sac/feedback`, dentro de `ProveedorTemaGraficos`; envuelve al hijo en un `span` para admitir controles deshabilitados.

## 3. Contrato

- `TooltipProps`: `texto`, `children`. Los tiempos táctiles salen de `compartido.json › tooltip`.

## 4. Limitaciones

- No se modificó el estilo del tooltip de la librería (el tema ya lo define en `proveedor_tema_graficos.md`).

Verificado el 2026-11-11 contra el código; sin pruebas propias (se ejerce a través de las de la sala de videollamada).
