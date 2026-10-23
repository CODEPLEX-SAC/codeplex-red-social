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


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
