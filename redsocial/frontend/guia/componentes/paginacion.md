# Paginación (`Paginacion`)

## 1. Identificación

- **Componente:** `Paginacion`.
- **Propósito:** paginador numérico de las tablas.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/paginacion.tsx`; tipos en `tipos/compartido/contrato_paginacion.ts`.
- **Estado:** existente.
- **Consumidores:** 4 usos JSX en 4 archivos (tablas de Colaboradores y Empresas).

## 2. Origen e implementación

- **Origen:** envoltorio de `CodeplexPaginacion` de `@codeplex-sac/navegacion` 0.0.16 (MUI `Pagination`).
- **Implementación:** `paginacion.tsx`; aplica `compartido.json › paginacion` (`color: primary`).
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML nativo:** `<nav>` con `<button>` generados por MUI.

## 3. Contrato y características

Props (`PaginacionProps`): `total`, `pagina`, `alCambiar(pagina)`. Estados: página actual, anterior/siguiente deshabilitados en los extremos, foco global. Accesibilidad: etiquetas en inglés de MUI («Go to next page»); no se localizaron (no verificado si hay un requisito).

## 4. Diseño visual

Botones de 32 × 32 px (medido), página actual con relleno del color primario de MUI (`#5a43f4` desde la Fase 5), texto con tipografía heredada. Sin cambios por ancho.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › paginacion` y el tema MUI. Sin overrides locales.

## 6. Dependencias y procedencia de iconos

Las flechas son los iconos de MUI de la librería.

## 7. Historial de modificaciones

- Sin cambios propios documentados salvo configuración y tipografía heredada (2026-10-17). No se modificó la librería: el contenido de `@codeplex-sac/navegacion@0.0.16` coincide byte a byte con el paquete publicado y con la integridad del `package-lock.json` (comprobado el 2026-10-17).
- Impacto: 4 archivos.

## 8. Cierre de la paginación actual (2026-11-10)

- **Estado:** cerrada para el alcance de esta fase. No se requieren cambios adicionales ahora. La iniciativa de buscadores no modificó la presentación, el tamaño de página ni el cálculo de páginas.
- **Componente visual:** `CodeplexPaginacion` de `@codeplex-sac/navegacion`, consumido mediante el wrapper compartido `componentes/compartido/interfaz/paginacion.tsx` (`Paginacion`, con las props `total` —número de páginas—, `pagina` y `alCambiar`). El wrapper solo presenta: no calcula páginas ni pagina datos.
- **Estilos y configuración:** siguen el sistema propio de CodePlex: `compartido.json › paginacion`, el tema MUI y los tokens de `index.css`. Las tablas actuales mantienen su presentación.
- **Implementaciones actuales (4), todas con paginación local** sobre todos los registros que entrega la búsqueda (comprobado el 2026-11-10):

| Pantalla | Tamaño de página (catálogo) | Cálculo de páginas y página actual |
|---|---|---|
| Colaboradores | 6 (`colaboradores.json › paginacion.tamano`) | TanStack `getPaginationRowModel`; estado `pagination` en `usar_tabla_colaboradores.ts` |
| Empresas | 10 (`empresas.json › paginacion.tamano`) | `slice` en `usar_listado_empresas.ts`; estado `pagina` |
| Usuarios de una empresa | 5 (`empresas.json › usuarios_empresa.tamano_pagina`) | `slice` en `usar_usuarios_empresa.ts`; estado `pagina` |
| Historial de una empresa | 6 (`empresas.json › historial_empresa.por_pagina`) | `slice` en `usar_historial_empresa.ts`; estado `pagina` |

- **Búsqueda desacoplada (2026-11-10):** los cuatro hooks obtienen el texto y los filtros independientes mediante `usarBusqueda` y una `FuenteBusqueda` intercambiable; el orden y la paginación se aplican después, sobre el resultado. Colaboradores ya no usa `globalFilter` ni `columnFilters` de TanStack: conserva solo el orden y la paginación.
- **Interacción con búsqueda, filtros y orden:** cualquier cambio de búsqueda, filtro u ordenamiento vuelve a la página 1.
- **Backend:** no hay integración con Backend. No existe paginación remota ni híbrida en el proyecto.
- **Pendiente exclusivamente de Backend:** la paginación remota se diseñará cuando exista integración real. En ese momento se definirán la página, el tamaño, el total de registros y el contrato de respuesta, que hoy no existen y no se asumen. La búsqueda y el filtrado ya están separados de la paginación en los hooks citados y no en el JSX de las tablas; la exportación de Colaboradores usa el conjunto completo filtrado.

Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador. La sección 8 se añadió el 2026-11-10 y se contrastó con el código ese día.
