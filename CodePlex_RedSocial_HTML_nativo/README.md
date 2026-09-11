# CodePlex — Red Social — reconstrucción HTML nativa

## Regla principal
Las 40 capturas del ZIP original fueron utilizadas únicamente como referencia visual. No se distribuyen ni se cargan dentro de las páginas finales.

No se utiliza: `<img>` para las capturas, `background-image`, `<canvas>`, SVG con capturas incrustadas ni técnicas equivalentes para simular la pantalla.

## Arquitectura
- `paginas/`: 40 vistas HTML independientes.
- `estilos/sistema.css`: sistema visual común.
- `estilos/catalogo.css`: catálogo.
- `scripts/aplicacion.js`: comportamiento e interacción básica.
- `index.html`: índice.

## Interactividad
Las vistas utilizan HTML real para navegación, botones, pestañas, formularios, inputs, selects, tablas, listas, calendarios, conversaciones y modales/flujos de invitación.

## Lenguaje ubicuo
Los identificadores, textos de interfaz, clases y nombres de componentes están planteados en español y organizados por responsabilidades de la interfaz, respetando la separación de dominio/presentación como base de evolución posterior.
