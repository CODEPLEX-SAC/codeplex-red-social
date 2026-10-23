# Dona de progreso (`DonaProgreso`)

## 1. Identificación

- **Componente:** `DonaProgreso`.
- **Propósito:** gráfico de anillo con segmentos de color para porcentajes.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/dona_progreso.tsx`.
- **Estado:** existente.
- **Consumidores:** 5 archivos de Dashboard, Estadísticas e Indicadores.

## 2. Origen e implementación

- **Origen:** propio de CodePlex (SVG con círculos y `stroke-dasharray`); no usa `@codeplex-sac/graficos`.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML nativo:** `<svg>`.

## 3. Contrato y características

Props: `segmentos` (`{ color, porcentaje }[]`), `tamano` (130), `grosor` (16) y `className`. Sin estados ni eventos. Accesibilidad: sin `role` ni título; no verificado si los consumidores añaden texto alternativo.

## 4. Diseño visual

Anillo de 130 px de diámetro y 16 px de grosor por defecto, empezando a las 12 en punto.

## 5. Integración con el sistema compartido

Sin configuración central; los colores los entregan los consumidores.

## 6. Dependencias y procedencia de iconos

Sin iconos.

## 7. Historial de modificaciones

Sin cambios documentados. Impacto: 5 archivos.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
