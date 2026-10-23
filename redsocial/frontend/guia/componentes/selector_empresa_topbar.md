# Selector de empresa de la barra superior (`SelectorEmpresaTopbar`)

## 1. Identificación

- **Componente:** `SelectorEmpresaTopbar`, con el contexto de empresa activa (`ProveedorEmpresaActiva`, `ContextoEmpresaActiva`, `usarEmpresaActiva`).
- **Propósito:** cambiar la empresa activa buscando por nombre o RUC entre las empresas de la sesión.
- **Ubicación:** `redsocial/frontend/componentes/compartido/navegacion/selector_empresa_topbar.tsx`; contexto en `componentes/compartido/sesion/` (`contexto_empresa_activa.ts`, `proveedor_empresa_activa.tsx`, `usar_empresa_activa.ts`); tipos en `tipos/compartido/contrato_empresa_activa.ts`.
- **Estado:** nuevo (2026-10-15/16); versión final del 2026-10-19.
- **Consumidores:** `BarraSuperior` (selector) y la raíz de la aplicación (proveedor).

## 2. Origen e implementación

- **Origen:** propio de CodePlex; compone `SelectorBuscable` (ver [selector_buscable.md](selector_buscable.md)). El tooltip lo aporta el `Tooltip` de MUI integrado en `SelectorBuscable`; este componente no tiene lógica de tooltip propia.
- **Elemento HTML nativo:** el `<button>` de `SelectorBuscable`.

## 3. De dónde salen los datos

Nada está escrito en el componente:

| Dato | Origen |
|---|---|
| Lista de empresas | `empresas` del contexto `usarEmpresaActiva()` (proveedor `ProveedorEmpresaActiva`, que recibe la lista; en la demostración, `servicios/empresas/empresas.json`, 28 empresas) |
| Empresa seleccionada | `empresaActiva` del contexto; el proveedor la inicializa con la empresa cuyo RUC figura en `compartido.json › sesion_actual.ruc` o, si no hay coincidencia, la primera de la lista |
| Texto «RUC :ruc» | `compartido.json › selector_empresa.ruc` |
| Textos del panel | `compartido.json › selector_empresa.textos` |
| Respaldo sin empresa activa | `compartido.json › sesion_actual` (datos de demostración: «Constructora del Norte SAC», RUC 20501234567) |

La función `aOpcion` convierte cada empresa en una `OpcionBuscable`: `id` = código, `titulo` = nombre, `subtitulo` = «RUC …» y `terminos` = nombre y RUC (por eso la búsqueda funciona por ambos). Los nombres y RUC que aparecen en las pruebas y en la documentación son datos de demostración, no lógica del componente.

## 4. Comportamiento

- **Botón cerrado:** icono, nombre de la empresa y RUC en dos líneas, y flecha. El nombre accesible es su contenido (nombre y RUC).
- **Tooltip:** muestra solo el nombre completo y únicamente cuando el nombre visible está truncado; no repite el RUC. Aparece con ratón y con foco de teclado, se cierra con Escape y se oculta al abrir el menú. Detalle y limitación de MUI en [selector_buscable.md](selector_buscable.md).
- **Búsqueda:** por nombre o por RUC, sin distinguir mayúsculas ni tildes y por varias palabras (por ejemplo, escribir «2090» lista «Agroindustrias Del Sur SAC», RUC 20901234567). El selector pasa `limite = empresas.length`, así que lista todas las coincidencias (28 sin filtro); el pie «Mostrando X de Y» del panel solo aparecería si se usara un límite menor.
- **Selección:** `seleccionarEmpresa(codigo)` cambia la empresa activa y cierra el panel.

## 5. Diseño visual

Ancho 296 px (`w-74`) con reducción (`shrink`) y 48 px de alto. Oculto por debajo de 1100 px (`max-1100:hidden`) y, junto con el bloque izquierdo de la barra, por debajo de 800 px (`max-800:hidden`): no hay alternativa móvil. Medido: 48 × 296 px a 1280 px; 48 × 205 px a 1100 px (nombre truncado); panel de 360 × 391 px.

## 6. Reutilización y restricciones

- Un cambio en los datos de empresas o en `sesion_actual` cambia lo que muestra el selector sin tocar el componente.
- La barra superior no es el único lugar que muestra el RUC: la lista de Empresas y el panel de detalle lo muestran con sus propios componentes.
- El selector solo es visible a partir de 1100 px; la rama de panel para móvil de `SelectorBuscable` no está en uso (no verificado).

## 7. Historial y decisiones sustituidas

- 2026-10-15/16: creado; el RUC se mostraba solo dentro de la lista y el disparador era de 52 px.
- 2026-10-16/17: el disparador pasa a 48 px.
- 2026-10-19 (Fase 6, cierre): línea base de Empresas aprobada con el selector **sin RUC en el botón cerrado**. **Sustituida.**
- 2026-10-19 (pendiente 5): el botón vuelve a mostrar el RUC bajo el nombre. La línea base se actualizó solo en la clave `1280|/empresas` (campo `agg`, nuevo texto «RUC 20501234567»; ver [diferencias_aceptadas_linea_base.md](diferencias_aceptadas_linea_base.md)).
- 2026-10-19 (mejora del tooltip): tooltip del nombre truncado con el `Tooltip` de MUI; sustituye el `title` nativo «nombre · RUC». **Sustituida** la versión con `title`.

## 8. Verificación

- **Verificado:** pruebas de `pruebas/compartido/selector_empresa_topbar.test.tsx`; medición en navegador (altura, ancho, búsqueda por RUC, tooltip con ratón y teclado, cierre al abrir el menú); `npm run calidad` en verde, con Regresión Empresas en las seis resoluciones.
- **No verificado:** panel en pantalla pequeña (selector oculto por debajo de 1100 px).
