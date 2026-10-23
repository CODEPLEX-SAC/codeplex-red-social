# Panel del selector con búsqueda (`PanelSelectorBuscable`)

## 1. Identificación

- **Componente:** `PanelSelectorBuscable`.
- **Propósito:** ventana flotante con campo de búsqueda, lista de resultados y resumen.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/panel_selector_buscable.tsx`; tipos en `contrato_selector_buscable.ts`.
- **Estado:** **nuevo** (2026-10-15/16).
- **Consumidores:** `SelectorBuscable`.

## 2. Origen e implementación

- **Origen:** propio de CodePlex; compone `CampoBusqueda`, `BotonIcono` y `ListaOpcionesBuscables`.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML nativo:** `<div role="dialog">`, `<p role="status">`.

## 3. Contrato y características

Props: `seleccionadaId`, `resultado` (`opciones` y `total`), `texto`, `textos`, `alCambiarTexto`, `alLimpiar`, `alElegir`. Muestra «sin resultados» o el pie con «Mostrando X de Y» si hay más resultados que opciones. Teclado: flechas arriba y abajo mueven el foco entre buscador, botón de limpiar y opciones. Los avisos usan `role="status"`.

## 4. Diseño visual

Panel de 360 px, borde `--color-borde-suave` en divisiones, buscador de 48 px con relleno de 10 px, botón «limpiar» `BotonIcono discreto default` (32 px), texto de pie `text-auxiliar`.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › selector_buscable` (`panel`, `buscador`, `lista`, `pie`, `vacio`, `tecla_abajo`, `tecla_arriba`, `enfocables`, `id_panel`).

## 6. Dependencias y procedencia de iconos

`cerrar` (botón de limpiar) mediante `BotonIcono`; ver `iconos.md`.

## 7. Historial de modificaciones

- 2026-10-15/16: creado. Sin librería afectada. Impacto: 1 consumidor.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
