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

## Ampliación (2026-10-26): componentes y acciones de la barra superior

- **`BotonAvisosTopbar`** (`componentes/compartido/navegacion/boton_avisos_topbar.tsx`; consumidor: `barra_superior.tsx`). Botón nativo de 36 × 36 px (excepción INC-18) con `Insignia` superpuesta; el contador sale de `compartido.json › navegacion.navPrincipal` (elemento `avisos`, propiedad `insignia`). Al pulsarlo alterna `PanelNotificacionesTopbar` (módulo Avisos) y `FondoPanelFlotante`; el contenedor detiene la propagación del clic. Estado: `useState` local. Sin prueba que lo nombre.
- **`MenuUsuarioTopbar`** (`menu_usuario_topbar.tsx`; consumidor: `barra_superior.tsx`). Botón de usuario con `AvatarUsuario`, nombre y chevron; devuelve `null` si no hay sesión (`usarSesionDemostracion`). `aria-haspopup="dialog"`, `aria-expanded` y `aria-controls`; al cerrar devuelve el foco al botón. «Cerrar sesión» llama a `cerrarSesion()` y navega a la ruta de Acceso con `irARuta`. La imagen del avatar es la del catálogo de imágenes (`imagenPerfilPedroSas`), no la de la sesión.
- **`PanelUsuarioTopbar`** (`panel_usuario_topbar.tsx`; consumidor: `menu_usuario_topbar.tsx`). `role="dialog"` con cabecera (avatar `xxl`, nombre, empresa, rol), tres opciones de `acceso.json › panel_usuario.opciones` y «Cerrar sesión». Cierra con Escape (`compartido.json › modal.tecla_cerrar`) y con el botón ×. **Solo «Mi perfil» navega** (`<a href=perfil.json › rutas.principal>`); «Información de la empresa» y «Configuración» son `<button aria-disabled="true">` con la descripción «Disponible próximamente.» y sin manejador (control deshabilitado declarado; quedó fuera del recuento de los 180 controles porque contiene `disabled`). Prueba que lo nombra: `pruebas/compartido/avatar_variantes_migracion.test.tsx` (leída, no ejecutada hoy).
- **Acciones sin efecto (COMPROBADO EN CÓDIGO, 2026-10-26):** «Crear» (BS-033), «Amigos» (BS-034), «Mensajes» (BS-035) y «Módulos» (BS-037) son `BotonIcono` sin manejador. «Amigos» y «Mensajes» tienen destino en el catálogo y están registrados como defecto F2-01 en `INFORME_SISTEMA_VISUAL_GLOBAL_2026.md`; «Crear» y «Módulos» esperan decisión de producto. El buscador de la barra no tiene estado ni lógica de búsqueda.

## Ajuste (2026-10-28): contador de Mensajes y nombres accesibles

- **`BotonMensajesTopbar`** (`boton_mensajes_topbar.tsx`; consumidor: `barra_superior.tsx`) envuelve el `BotonIcono` de Mensajes en `Insignia variant="superpuesta"` con `ContextoInsigniasNavegacion['mensajes']`: la cantidad de conversaciones con mensajes sin leer, la misma fuente del menú lateral y del chip «No leídos». Con 0 o sin proveedor la insignia queda invisible.
- **Nombre accesible:** campana, carrito y Mensajes usan `nombreAccesibleConConteo` («Mensajes, 5 pendientes»); sin cantidad queda solo el nombre. El texto sale de `textos.json › NOMBRE_CON_PENDIENTES`.


## Ajuste (2026-10-28): altura y botones alineados

- La barra pasa de 64 a 72 px (--height-barra-superior: 4.5rem en index.css, de la que derivan los paneles) para dar aire a las insignias, que sobresalen del botón. Es una decisión pedida por la usuaria el 2026-10-28; sustituye a la de 64 px de la Fase 5.
- La campana ya no es un botón nativo de 36 px (excepción INC-18 retirada del registro): usa BotonIcono (sutil, default, 32 px; 28 px bajo 600 px) como Mensajes y Carrito. Los tres botones comparten tamaño, eje vertical y posición de la insignia (medido a 1280 y 390 px).

## Ajuste (2026-10-28): insignias de Mensajes y Notificaciones sin captura de puntero

Medido a 1280 y 390 px: la insignia de Mensajes (5) invade 2,4 × 10 px (1280) y 4 × 10 px (390) la esquina superior del botón Carrito y capturaba el clic (pulsar ahí no hacía nada); la de Notificaciones (3) invade 2,5 × 10 px del botón Módulos (1280) y 4 × 16 px del botón de cuenta (390) sin capturar el clic (el vecino es posterior en el DOM). Ninguna toca el glifo de un botón vecino. Corrección: el badge de `Insignia variant="superpuesta"` lleva `pointer-events-none` (`insignia_superpuesta.inerte`), de modo que el clic llega al botón que hay debajo. No se cambiaron el espacio entre botones (8 px; 6 px a ≤800 px), la altura (72 px) ni los tamaños de la insignia.

