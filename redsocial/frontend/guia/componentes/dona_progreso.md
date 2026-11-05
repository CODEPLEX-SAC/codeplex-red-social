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

## Texto central ajustado (2026-10-28)

`DonaProgreso` dibuja el anillo (SVG propio; la librería `CodeplexGraficoPastel` ofrece `valorCentral` pero no expone tipografía ni tamaño, por lo que no sirve para este rol) y ahora también el texto central: `valorCentral` y `etiquetaCentral` (`contrato_dona_progreso.ts`; clases y `variable_escala` en `compartido.json › dona_progreso`; la letra la calcula la clase `.dona-valor` de `index.css` con la escala `--escala-dona` que fija el componente al medir). La cifra conserva el rol `valor-destacado` (20/18 px, 800); si su ancho supera el hueco interior (`tamano − 2 × grosor − margen_texto`, margen de 8 px) se reduce la letra hasta que quepa, sin bajar del rol `auxiliar` (12 px; `max(var(--text-auxiliar), …)` en `index.css`). Se recalcula al cambiar el valor, al redimensionar y al cargar las fuentes. Sin `valorCentral` el componente sigue siendo el anillo desnudo (miniaturas de Reportes).

Medido a 1280 y 390 px con los datos reales: «S/ 1,250,000» pasa de 20 a 14,06 px en las donas de 130 px (15,62 px en las de 140 px); «S/ 850,000» a 15,97 px (130) o 17,74 px (140). Con importes largos: «S/ 125,000,000» llega al mínimo de 12 px y cabe en 130 px; «S/ 125,000,000,000» (15 caracteres) no cabe ni a 12 px: se compacta (ver «Protección de contenido»). Consumidores: Dashboard (Composición de ingresos), Estadísticas (Composición de ingresos y Gastos por categoría) e Indicadores (Estructura de costos).

## Protección de contenido (2026-10-29)

Capacidad: ancho disponible = `tamano − 2 × grosor − margen_texto` (8 px): 90 px en las donas de 130 px y 100 px en las de 140 px. Orden de decisión, todo en el componente y en `compartido.json › dona_progreso`:
1. **Cabe:** se conserva el rol `valor-destacado` (20 px; 18 px en móvil). Con los datos actuales ninguna cifra necesita más que la reducción proporcional.
2. **No cabe:** reducción proporcional (`--escala-dona`) con mínimo de 12 px (`max(var(--text-auxiliar), …)`).
3. **No cabe ni a 12 px y es un importe:** representación compacta (`importe_compacto.ts`, umbrales y sufijos en `dona_progreso.compacto`): `K` (mil), `M` (millones), `MM` (miles de millones) y `B` (billones), con una cifra decimal por debajo de 100 y sin decimales desde 100; el prefijo y el sufijo del texto (`S/`, `USD`, `aprox.`) se conservan. El importe completo queda como texto para lectores de pantalla (`sr-only`) y como `title` (tooltip); lo visible lleva `aria-hidden`.
4. **No cabe y no es un importe** (p. ej. «Sin datos disponibles este mes»): puntos suspensivos visibles (`text-overflow: ellipsis` con `--ancho-dona`), valor completo en el texto accesible y en `title`. Nada se corta en silencio.
Probado a 1280 y 390 px: «S/ 12,500,000» cabe a 14,1 px (140); «S/ 8,500,000» a 13,5 px (130); «S/ 125,000,000» (14 caracteres, 92,8 px a 12 px) se compacta a «S/ 125 M» en las de 130 px; «S/ 125,000,000,000» → «S/ 125 MM»; el texto no numérico de 31 caracteres se corta con puntos suspensivos. No se abrevia ningún dato actual (ninguno llega al límite) y no se cambiaron los datos de demostración ni la fuente del importe. Pruebas: `dona_progreso_texto_central.test.tsx` (8, incluidas las de `compactarImporte`).
Estructura (2026-10-29): `dona_progreso.tsx` compone `anillo_dona.tsx` (SVG) y el hook `usar_texto_central_dona.ts` (medición, escala, compactación); `importe_compacto.ts` formatea el importe compacto. Se dividió así porque el validador limita las constantes locales por componente.
