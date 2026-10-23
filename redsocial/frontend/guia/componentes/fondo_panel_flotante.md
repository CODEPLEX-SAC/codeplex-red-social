# Fondo de panel flotante (`FondoPanelFlotante`)

## 1. Identificación

- **Componente:** `FondoPanelFlotante`.
- **Propósito:** capa transparente (atenuada en móvil) que cierra paneles flotantes al pulsar fuera o con Escape.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/fondo_panel_flotante.tsx`; tipo en `tipos/compartido/contrato_fondo_panel_flotante.ts`.
- **Estado:** existente.
- **Consumidores:** 6 archivos (conteo del 2026-10-19): `FiltroDesplegable` (que centraliza los filtros de Eventos), `SelectorBuscable`, `BarraSuperior` (panel de notificaciones), `MenuUsuarioTopbar` y los filtros avanzados de Colaboradores y Empresas. Antes de la Fase 5 los filtros de Eventos lo repetían en cada panel.

## 2. Origen e implementación

- **Origen:** propio de CodePlex; no usa librerías.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML nativo:** `<div>`.
- **Dependencias:** `compartido.json › fondo_panel_flotante` y `modal.selectores_enfocables`.

## 3. Contrato y características

Props: `onCerrar` y `atenuarMovil` (predeterminado `true`). Al montarse, enfoca el primer elemento visible del panel hermano siguiente y, al desmontarse, devuelve el foco. Cierra con clic y con Escape. No define `role`; el panel lo declara.

## 4. Diseño visual

`fixed inset-0 z-19`; en móvil, `bg-black/45` si `atenuarMovil`. Sin color ni borde propio en escritorio.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › fondo_panel_flotante`. Comparte los selectores enfocables con `Modal`.

## 6. Dependencias y procedencia de iconos

Sin iconos.

## 7. Historial de modificaciones

Sin cambios del componente; en la Fase 5 los filtros de Eventos dejaron de instanciarlo uno a uno al pasar a `FiltroDesplegable`. Impacto: 6 archivos. En `SelectorBuscable` se usa con `atenuarMovil={false}`.


Verificado el 2026-10-19 contra el código (consumidores y contrato). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
