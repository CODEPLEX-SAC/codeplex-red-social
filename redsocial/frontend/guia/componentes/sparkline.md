# Línea de tendencia (`Sparkline`)

## 1. Identificación

- **Componente:** `Sparkline`.
- **Propósito:** mini gráfico de línea para tarjetas de KPI.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/sparkline.tsx`.
- **Estado:** existente.
- **Consumidores:** 5 archivos de Dashboard, Estadísticas e Indicadores.

## 2. Origen e implementación

- **Origen:** propio de CodePlex (SVG `polyline`).
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML nativo:** `<svg>`.

## 3. Contrato y características

Props: `puntos` (cadena de coordenadas), `color`, `ancho` (100), `alto`, `grosor`, `radioPunto` (2,2), `conPuntos` y `className`. Sin estados. Accesibilidad: sin texto alternativo.

## 4. Diseño visual

Trazo redondeado (`strokeLinecap` y `strokeLinejoin` `round`), `preserveAspectRatio="none"`, sin relleno. El tamaño lo da `className`.

## 5. Integración con el sistema compartido

Configuración en `compartido.json › sparkline` (ancho, aspecto, relleno, extremos, uniones, separadores y radio de punto).

## 6. Dependencias y procedencia de iconos

Sin iconos.

## 7. Historial de modificaciones

Sin cambios documentados. Impacto: 5 archivos.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
