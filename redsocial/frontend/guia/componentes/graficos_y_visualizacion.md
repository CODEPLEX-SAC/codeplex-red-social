# Gráficos y visualización de datos (Dashboard, Estadísticas, Indicadores, Reportes)

## 1. Inventario y clasificación

| Componente | Dónde (`redsocial/frontend/`) | Origen | Categoría |
|---|---|---|---|
| `CodeplexGraficoLineas` | `componentes/dashboard/bloques/seccion_evolucion_ventas.tsx`, `seccion_top_productos.tsx`; `componentes/estadisticas/bloques/seccion_evolucion_ventas2.tsx`, `seccion_proyeccion_ventas.tsx`; `componentes/indicadores/bloques/seccion_evolucion_utilidad_neta.tsx` | `@codeplex-sac/graficos` 0.0.24, **uso directo** dentro de `<ProveedorTemaGraficos>` | **A** (con el tema de CodePlex alrededor) |
| `CodeplexGraficoBarras` | `seccion_top_productos.tsx`, `seccion_proyeccion_ventas.tsx` | idem | **A** |
| `CodeplexGraficoBarraLinea` | `indicadores/bloques/seccion_evolucion_utilidad_neta.tsx` | idem | **A** |
| `CodeplexCaja` | `indicadores/bloques/seccion_evolucion_utilidad_neta.tsx` (`variante="bordeado" redondeado={4} relleno={0} sx={{ boxShadow: 1 }}`) | `@codeplex-sac/diseno` 0.0.20, uso directo | **A** |
| `DonaProgreso` | `componentes/compartido/interfaz/dona_progreso.tsx`; usado en `paginas/reportes/pagina_reportes.tsx` | SVG propio (`<circle>` con `stroke-dasharray`) | **C** |
| `Sparkline` | `componentes/compartido/interfaz/sparkline.tsx`; usado en `dashboard`, `estadisticas`, `indicadores`, `reportes` | SVG propio; parámetros en `compartido.json › sparkline` | **C** |
| `MedidaDinamica` | `.../interfaz/medida_dinamica.tsx`; usado en `seccion_top_productos.tsx` y `seccion_top_clientes.tsx` | Contenedor de anchura/altura dinámicas (evita estilos en línea) | **C** |
| `SuperficieColor`/`TextoColor` | ver [superficie_color.md](superficie_color.md) y [texto_color.md](texto_color.md) | propios | **C** |

La librería `@codeplex-sac/graficos` exporta además `Area`, `BarrasApiladas`, `BarrasDivergentes`, `BarrasMultiples`, `Burbujas`, `Comparativa`, `Desglose`, `Dispersion`, `Embudo`, `MapaCalor`, `Medidor`, `Pastel`, `PuntosConectados`, `Radar`, `Treemap`, `Velas` y `Tooltip`; **el proyecto no los usa**. En particular `CodeplexGraficoPastel`/`CodeplexGraficoMedidor` podrían cubrir el rol de `DonaProgreso`.

## 2. Procedencia y capas

- Librería: renderizado del gráfico (series, ejes, tooltip). Los datos y colores (`colores_graficos`, `paleta_*`) los pasa CodePlex desde `servicios/*` y `compartido.json`.
- Tema: `ProveedorTemaGraficos` (`componentes/compartido/proveedor_tema_graficos.tsx`) crea el tema MUI con la paleta `colores_graficos` (semánticos; desde la Fase 5 el primario del tema es `tema_mui.primario` `#5a43f4` y `#7c3aed` queda solo en los gráficos). **Ese es el motivo del nombre:** nació para los gráficos y hoy rodea casi todos los envoltorios.
- `DonaProgreso` y `MedidaDinamica` importan `compartido.json` pero no leen ninguna clave (`void catalogoCompartido`); los valores por defecto de la dona están en el propio componente (tamaño 130 px, grosor 16 px). `Sparkline` sí lee `compartido.json › sparkline`.

## 3. Modificaciones

Sin librería que modificar **[CONFIRMADO]**. Personalización: tema, colores por catálogo y envoltura del gráfico en tarjetas propias (`seccion_*`).

## 4. Posible incorporación a la librería compartida

- Gráficos oficiales: **utilizar directamente** (ya es así). Considerar un envoltorio que incluya `ProveedorTemaGraficos` para no repetirlo en cada sección.
- `DonaProgreso`: **refactorizar** hacia `CodeplexGraficoPastel`/`Medidor` tras evaluar su aspecto (**investigar más**). `Sparkline`: **mantener** o extraer si la librería no lo ofrece (no hay componente equivalente en las exportaciones revisadas).
- `MedidaDinamica`: específico de la regla «sin estilos en línea» del validador 3DD; **mantener en CodePlex**.

## 5. Verificación

Pruebas existentes: `pruebas/dashboard/*`, `pruebas/estadisticas/*`, `pruebas/indicadores/*`, `pruebas/reportes/*`. **[PENDIENTE]** No se ejecutó una revisión visual de gráficos en esta investigación; el último `npm run calidad` (2026-10-16, código de salida 0) incluyó sus pruebas.
