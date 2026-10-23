# Barra superior (`BarraSuperior`)

## 1. Identificación

- **Componente:** `BarraSuperior`, con `MenuUsuarioTopbar` y `PanelUsuarioTopbar`.
- **Propósito:** cabecera de la aplicación: buscador, selector de empresa, accesos rápidos, carrito, notificaciones y menú de usuario.
- **Ubicación:** `redsocial/frontend/componentes/compartido/navegacion/barra_superior.tsx`, `menu_usuario_topbar.tsx`, `panel_usuario_topbar.tsx`.
- **Estado:** existente, ampliado (barra de 64 px restaurada en la Fase 5; selector de empresa y carrito, 2026-10-15/17).
- **Consumidores:** `EstructuraApp` (todas las pantallas).

## 2. Origen e implementación

- **Origen:** propio de CodePlex; compone `CampoBusqueda`, `SelectorEmpresaTopbar`, `BotonIcono`, `BotonCarritoTopbar`, `PanelNotificacionesTopbar` (Avisos), `FondoPanelFlotante` y `Menu`/`irARuta`.
- **Elementos HTML nativos:** `<header>`, un `<button>` de campana (36 × 36 px) y el `<button>` de usuario.

## 3. Contrato y características

Sin props. Muestra el buscador (`CampoBusqueda`) y el selector de empresa (nombre y RUC en dos líneas; tooltip del nombre solo si está truncado; ver [selector_empresa_topbar.md](selector_empresa_topbar.md)), y a la derecha «Crear» (`BotonIcono primario`), Amigos, Mensajes, carrito, campana con contador, Módulos y el menú de usuario. Estados: panel de notificaciones y panel de usuario abiertos o cerrados; cierran con Escape y clic fuera. Accesibilidad: `aria-label` en cada botón; el botón de usuario lleva `aria-haspopup`, `aria-expanded` y `aria-controls`.

## 4. Diseño visual

Altura de 64 px (`h-barra-superior`, token `--height-barra-superior`; panel de usuario y de avisos a `top-bajo-barra`) con borde inferior; a 1280 px los controles miden: buscador 48 px, selector 48 px, `BotonIcono` 32 × 32 px, campana 36 × 36 px, usuario 40 px de alto. Por debajo de 800 px se ocultan el buscador, el selector de empresa, Amigos y Módulos; por debajo de 1100 px solo el selector. Panel de usuario de 380 px (`w-95`).

## 5. Integración con el sistema compartido

Fuente de verdad: clases del componente y `compartido.json › barra_superior`. Sin overrides locales. Las alturas heterogéneas (32, 36, 40 y 48 px) no vienen de una variante común; la campana y el usuario son botones nativos propios.

## 6. Dependencias y procedencia de iconos

Iconos con `Icono`: `mas` (glifo `add`), `mensajes` (alias `mensaje`, `chat_bubble_outline`), `carrito` (`shopping_cart`), `campana` (`notifications`) y `flecha-abajo` (`keyboard_arrow_down`) son glifos de la librería; `amigos` y `cuadricula` son SVG locales. Ver `iconos.md`.

## 7. Historial de modificaciones

- 2026-10-15/16: barra de 72 px, panel de notificaciones y panel de usuario alineados; selector de empresa y carrito añadidos. Sin librería afectada. Impacto: todas las pantallas.
- 2026-10-17 (Fase 5): la altura vuelve a 64 px (la de 72 px no estaba aprobada) y el relleno del botón de menú pasa a `max-900` (INC-03, INC-18).
- 2026-10-19: el selector de empresa muestra de nuevo el RUC y añade el tooltip del nombre truncado (ver su documento).


Verificado el 2026-10-19 contra `barra_superior.tsx`, `compartido.json` y `index.css`; medidas en navegador de las Fases 5 y 6 (64 px a 1280, 1000, 900, 820, 800, 400 y 320 px) y del 2026-10-19 para el selector de empresa. Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.

## Detalle de la Fase 5
- La altura vuelve a 64 px y se centraliza en `--height-barra-superior` (`index.css`), de la que derivan `--height-vh-navbar`, `--height-dvh-navbar` y `--inset-bajo-barra` (paneles y selector de empresa en hoja inferior). Medido: 64 px a 1280, 1000, 900, 820, 800, 400 y 320 px.
- El relleno izquierdo reservado para el botón de menú pasa de `max-800` a `max-900`, el mismo punto en que la barra lateral se colapsa: a 820 px el menú (x 4–44) ya no solapa el buscador (x 64–363).
- Diferencia respecto a la medición previa: la altura de 72 px de la Fase 2 no estaba registrada como cambio aprobado.
- **Excepciones conservadas (INC-18):** la campana (36 × 36 px) y el botón de usuario (40 px) son botones nativos registrados como excepción en `pruebas/compartido/registro_componentes_permitidos.ts`; coexisten con `BotonIcono` de 32 px y el buscador y el selector de 48 px. Excepción justificada, no una inconsistencia pendiente de corregir. «Cerrar sesión» (INC-15) y «Ver más» del panel de notificaciones (INC-26, enlace con ruta real) también se conservan; ver [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md).
