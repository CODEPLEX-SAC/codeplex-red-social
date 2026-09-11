# Decisiones de arquitectura — SPA de redsocial

Regla del proyecto: cero comentarios en el código (lenguaje ubicuo DDD, regla de 3). Este archivo reemplaza los comentarios que existían en el código migrado desde `CodePlex_RedSocial_HTML_nativo/app`, para no perder el porqué de decisiones que no son obvias leyendo el código solo.

## Imports estáticos de las 40 páginas (sin `React.lazy`)

`frontend/enrutamiento/rutas.tsx` importa las 40 páginas de forma estática, no perezosa. Fue una decisión probada, no un descuido:

Cada una de las 40 páginas renderiza su propio `EstructuraApp` (BarraLateral + BarraSuperior) internamente. Con `React.lazy()` + un único `Suspense` en `arranque/App.tsx`, al cambiar de ruta React desmonta el árbol completo (`EstructuraApp` incluido, por vivir dentro del componente perezoso) y muestra el fallback en blanco mientras se descarga el chunk de la página destino. Esto se confirmó visualmente con un screenshot durante una carga retrasada artificialmente: pantalla completamente blanca, sin BarraLateral ni BarraSuperior — el "flash blanco" reportado. Se confirmó con Playwright que no hay ninguna request tipo "document" durante la navegación (o sea, no es una recarga real, es el propio Suspense).

Con las 40 páginas ya en el bundle principal, cambiar de ruta es un simple swap síncrono de elementos React: cero espera, cero fallback, `EstructuraApp` nunca se desmonta. El costo aceptado es un bundle único de ~690 kB (~135 kB gzip); por eso `frontend/vite.config.ts` sube `chunkSizeWarningLimit` a 800 en vez de reintroducir carga perezosa.

## Router propio sin librería externa

El sitio original era multi-página estático: cada `<a href="archivo.html">` hacía un salto real de navegador entre 40 archivos `.html` independientes, sin JS de enrutamiento. No hubo una "arquitectura de rutas" que migrar 1:1.

`frontend/enrutamiento/navegacion.ts` es la capa mínima que faltaba para que las 40 páginas React sean alcanzables sin recargar el documento, usando solo `history.pushState`/`popstate` (APIs nativas del navegador) y `useSyncExternalStore` (parte de React, no una dependencia nueva) — no se agregó React Router ni ninguna librería de enrutamiento.

Los segmentos de ruta (`/actividad/publicaciones`, `/estadisticas/ventas`, etc.) no existían como URLs en el original. Se derivaron de datos que ya existían en el proyecto: la `clave` de cada item en `datos/compartido/navigation.ts` para el segmento raíz de cada familia, y el nombre descriptivo que cada `.html` ya usaba en su propio nombre de archivo para las subpáginas (p. ej. `03-02-actividad-02-publicaciones.html` → `publicaciones`). Nada inventado desde cero.

## Interceptor de clics en `arranque/App.tsx`

Las 40 páginas y el BarraLateral contienen `<a href="archivo-original.html">` reales — el mismo href literal que usaban en el sitio multi-página original; no se tocó ningún archivo de `paginas/` para esto. Un único listener de clic a nivel de documento reconoce esos hrefs contra `ARCHIVO_A_RUTA` (la misma fuente de rutas que usa el resolver de `enrutamiento/rutas.tsx`) y navega dentro de la SPA en vez de dejar que el navegador intente cargar el `.html`, que ya no existe en este servidor.

Un href que NO está en el mapa (los "#" decorativos: "Ver más", "Notificaciones", "Guardados", botones de publicidad, etc.) sigue exactamente igual que en el original: no navega a ninguna parte.

Hallazgo real, confirmado con prueba funcional en Playwright: no todos los componentes usan el mismo formato de href. `PestanasActividad`, `PestanasAmigos`, `PestanasGrupos` y `PaginaGruposMisGrupos` escriben `../paginas/archivo.html`; BarraLateral, `PestanasEventos` y `PestanasMensajes` escriben el nombre pelado. En vez de normalizar esos 6 archivos, el interceptor extrae solo el segmento final del href (después de la última `/`) antes de buscar en `ARCHIVO_A_RUTA` — cubre ambos formatos sin tocar ninguna página.

`resolverRuta` puede no encontrar coincidencia (ruta desconocida): ahí se retorna `PaginaNoEncontrada` (404), caso real y esperado, no relacionado con el punto anterior.

## `datos/mensajeria/mensajes.ts` — un solo archivo para dos listas

`CONVERSACIONES` y `CONVERSACION_ACTIVA` viven en el mismo archivo (no separados en `conversaciones.ts` + `mensajes.ts`) porque ambas pertenecen a la misma pantalla y al mismo momento de la migración — mismo criterio que `datos/compartido/navigation.ts`, que agrupa varias listas de una misma capacidad (`NAV_PRINCIPAL`, `ESPACIO_TRABAJO`, `MODULOS_DISPONIBLES`, `ALERTAS_SIDEBAR`) en un único archivo en vez de fragmentar por forma de dato.

Si mensajería crece (No leídos/Favoritos/Videollamadas con datos propios), se reevalúa la separación con esa evidencia — no antes.

Solo existe una `ConversacionActiva` con hilo completo: alcanza para demostrar que "conversación seleccionada → `PanelConversacion` → datos correspondientes" funciona. No hay hilos reales para las otras 8 conversaciones (el original tampoco los tenía). Con datos reales de backend, cada `Conversacion` de la lista tendría su propio `ConversacionActiva` sin tocar `PanelConversacion` ni `ListaConversaciones`.

## `datos/compartido/icons.ts` y `datos/compartido/navigation.ts` — transcripción 1:1

Ambos son transcripción literal de `scripts/componentes.js` del sitio original (`ICONOS`/`MAPA_ICONOS` en un caso, `NAV_PRINCIPAL`/`ESPACIO_TRABAJO`/`MODULOS_DISPONIBLES`/`ALERTAS_SIDEBAR` en el otro). Mismas entradas, mismo orden, mismas etiquetas, mismos iconos, mismos archivos, mismas insignias, mismos colores — nada se corrigió, normalizó ni tokenizó.

Los iconos vienen de Lucide v1.34.0 (ISC). Existen 3 nombres rotos en el `MAPA_ICONOS` original (`aplicaciones`, `proyectos`, `rechazar`) que no resuelven a ninguna clave real — se conservan así a propósito, igual que en el original, para no introducir una divergencia de comportamiento no pedida. `respetado` existe en `ICONOS` sin ningún alias que apunte a él, igual que en el original.

## Capas nuevas introducidas durante la migración

La convención capa→subcapacidad de este proyecto (`paginas/`, `componentes/`, `mensajes/`, `rutas/`, `servicios/`, etc.) nació con una sola subcapacidad de plantilla (`gestion_base`) y sin código real de UI. Al migrar esta SPA se agregaron capas que la convención original no cubría:

- `ganchos/` — hooks de React reutilizables (`useCarrusel`).
- `tipos/` — tipos TypeScript compartidos o por subcapacidad.
- `datos/` — contenido mock/estático que alimenta las páginas mientras no hay `servicios/` reales pidiendo al backend.
- `arranque/` — bootstrap de React (`main.tsx`, `App.tsx`, `index.css`), la capa que monta la aplicación.
- `enrutamiento/` — el motor de navegación SPA real (historial, click-interceptor, tabla de rutas). Es distinto de `rutas/`, que sigue siendo el contrato de rutas por subcapacidad tipo catálogo (como `rutas/gestion_base/rutas_gestion_base.ts`); `enrutamiento/` no es por subcapacidad, es transversal a toda la app.

## `ganchos/compartido/useCarrusel.ts` — por qué no hay flechas ni autoplay

`scripts/historias.js` del original registraba 10 carruseles (Historias, contactos frecuentes, pestañas/filtros de Eventos, módulos de Estadísticas/Reportes/Indicadores, pestañas de Actividad/Marketplace) con un único mecanismo: flecha izquierda/derecha → `pista.scrollBy(±260px)`, más un listener de scroll/resize que oculta la flecha en cada extremo. Es control visual sobre una pista con overflow-x, nada más — ni autoplay, ni drag, ni snap.

Decisión de migración: el patrón React para estas filas horizontales es scroll nativo limpio (`overflow-x-auto` + scrollbar oculto vía clases utilitarias en cada sitio de uso), sin reproducir las flechas del legacy — son controles auxiliares del JS antiguo, no parte del comportamiento que debe migrarse. Sin flechas no queda ningún estado que calcular (no hay "puede ir a la izquierda/derecha" que mostrar), así que el hook se reduce a lo único que sigue siendo comportamiento real: la referencia a la pista desplazable. Track + scroll nativo ya cubren mouse, trackpad y touch/swipe sin JS adicional.

## `tipos/compartido/icon.ts` — `IconName` no es solo `keyof typeof MAPA_ICONOS`

Hallazgo real (página Colaboradores usa `data-icono="mensaje"` y `data-icono="colaborador"`): el `crearIcono()` original resuelve `MAPA_ICONOS[nombre] || nombre`, es decir, un nombre SIN alias que coincide directamente con una clave de `ICONOS` es válido hoy en producción (`"colaborador"`, `"guardado"`, `"imagen"`, `"mensaje"`, `"panel"`, `"tienda"` funcionan así). Un tipo `keyof typeof MAPA_ICONOS` a secas no contempla esta vía y rechazaría nombres que sí son válidos en el sistema real — por eso `IconName` es la unión `keyof typeof MAPA_ICONOS | keyof typeof ICONOS`, para reflejar fielmente el fallback existente, no para agregar ninguna capacidad nueva. Los 3 nombres rotos (`aplicaciones`, `proyectos`, `rechazar` — sin alias y sin clave directa en `ICONOS`) siguen siendo, correctamente, un error de compilación en código React nuevo.

## `tipos/mensajeria/mensajes.ts` — `propio` y `confirmado` no siempre coinciden

En el hilo real de referencia (María Fernández, `datos/mensajeria/mensajes.ts`), el mensaje del adjunto se ve alineado a la izquierda como recibido (`propio:false`) pero sí muestra "✓✓" (`confirmado:true`). Es una inconsistencia real del mockup estático original (no hay `scripts/mensajes.js` que la explique) — se preserva tal cual en `Mensaje` (campos independientes) en vez de forzar que ambos coincidan.

## paginas/amigos/PaginaAmigosListas.tsx — `insignia-pestana` sin regla CSS real

Hallazgo real: la pestaña "Solicitudes" en el HTML original incluye `<span class="insignia-pestana">3</span>`, pero ninguna de las 4 páginas de Amigos (Todos/Sugerencias/Solicitudes/Listas) más define esa clase, y no existe ninguna regla `.insignia-pestana` en el CSS del proyecto. En el original se renderiza como texto plano "3" pegado al nombre de la pestaña, no como badge visual. Se preserva ese comportamiento (texto plano, no badge) vía la prop `insigniaSolicitudes` de `PestanasAmigos`, usada solo desde `PaginaAmigosListas`.

## paginas/amigos/PaginaAmigosTodos.tsx — apilado móvil de la barra de búsqueda y ancho faltante en `.datos-amigo`

La fila buscador+selector (`.barra-busqueda-amigos`/`.selector-filtro`) nunca se apila en el original: `amigos.css` no define ningún `@media` para esas clases, se queda en una sola fila apretada a cualquier ancho. Se decidió a propósito apilarla en `max-[800px]:flex-col` (buscador y selector cada uno en su propia fila, a ancho completo) en vez de replicar la fila estrecha — 800px porque es el mismo umbral de "modo móvil" que ya usa `EstructuraApp`/`BarraSuperior` en el resto de la app, no un valor inventado para esta página.

Hallazgo real de auditoría de overflow en móvil: `amigos.css` baja `.datos-amigo` de 170px a 130px bajo `@media max-width:900px`, una regla que faltaba en la migración inicial y se agregó (`max-[900px]:w-[130px]`) al revisar el CSS original completo.

## `actividad/bloques/TarjetaActividad.tsx` — `children` como slot libre

El original tiene 6 variantes reales de contenido dentro de `.tarjeta-actividad` (texto solo, texto+adjunto-imagen, badge-estado, lista de archivos, tarjeta de grupo unido) que no comparten una forma de datos común. Forzarlas a una única interfaz habría inventado una abstracción que el CSS/HTML real no sostiene — por eso el cuerpo es un `children: ReactNode` deliberadamente libre en vez de una prop tipada por variante.

Hallazgo real de CSS: `.tarjeta-actividad:last-child{border-bottom:none}` sí existe en el original — a diferencia de `.tarjeta-persona`/`.lista-resumen li`, que no la tienen — por eso aquí `last:border-b-0` es correcto (no es un patrón que se pueda asumir en cualquier lista con borde inferior).

## `compartido/bloques/ColumnaPublicidad.tsx` — placeholder vacío y hallazgos de auditoría de layout

`data-componente="columna-publicidad"` es un placeholder VACÍO en el HTML estático de las 29 páginas que lo usan; `scripts/componentes.js` (`crearColumnaPublicidad()`) lo reemplazaba en runtime vía `outerHTML`. La auditoría de layout global encontró que las páginas ya migradas habían dejado ese placeholder tal cual, sin clase ni contenido — visualmente indistinguible de "columna ausente" aunque el carril del grid sí existiera. Este componente reproduce el HTML que `crearColumnaPublicidad()` inyectaba, carril por carril.

Grep en `scripts/*.js` confirma cero listeners para `.controles-carrusel`/`.puntos-carrusel`/`.tarjeta-anuncio`: los botones "Anterior"/"Siguiente" y los puntos son decorativos. Se preserva `.controles-carrusel button{background:rgba(255,255,255,.12)}` tal cual — un botón de bajo contraste sobre fondo claro que es un rasgo del original, no un error de esta migración. Los `.boton.boton-primario/.boton-exito/.boton-secundario.boton-mini` de esta pieza son `<a href="#">` en el original, no `<button>`: se replican las clases exactas de `Boton` (mini) sobre `<a>`.

## `compartido/bloques/ContactosPanel.tsx` — botón vacío que usa el chrome nativo del navegador

El botón `.boton.boton-mini` sin modificador de color es una plantilla vacía sin texto en el original; su fondo `#f0f0f0` es el chrome nativo del propio `<button>`, que `.boton` no sobreescribe (mismo hallazgo de píxel confirmado en `PaginaEstadisticasModulo`, fuera de `componentes/`).

## `compartido/estructura/EstructuraApp.tsx` y `EstructuraTresColumnas.tsx` — `alturaCompleta`: por qué `align-items:stretch`/`flex-1` no bastan

Hallazgo real (confirmado con Playwright en 3 intentos distintos, documentados en tareas de Mensajes): un elemento de alto `auto` que además recibe un tamaño por estiramiento (`align-self:stretch`) usa ese estiramiento como un MÍNIMO, no un máximo — si su contenido pide más, el elemento igual crece para acomodarlo. Por eso ningún `align-items:stretch`/`flex-1`/`min-height:0` más abajo en la cadena puede convertir ese mínimo en un tope real: para cuando esas reglas actúan, `<main>` ya se dejó crecer por su propio contenido. La solución (prop `alturaCompleta`, opt-in, usada por Mensajes) le da a `<main>` una altura EXPLÍCITA (`calc(100dvh - 64px)`, 64px = alto real y fijo de `BarraSuperior`) más `overflow-hidden`: con un alto explícito el contenido que exceda se recorta en vez de crecer la caja, y recién ahí `align-items:stretch` en `EstructuraTresColumnas` (que debe recibir la misma prop para completar la cadena) puede repartir esa altura de forma predecible. Sin `alturaCompleta` (default), cero cambios de comportamiento — cada columna sigue midiendo su propio contenido.

Otros hallazgos reales de `EstructuraApp.tsx`: (1) a `<main>` (`.contenido-principal`) le faltaba `max-width:1680px` + `margin:0 auto` — sin eso, en viewports anchos (>1680px + sidebar) el contenido se pegaba al sidebar en vez de centrarse con márgenes iguales; es la única página universal de las 40, así que el arreglo va una sola vez aquí. (2) El padding original bajo 800px es asimétrico a propósito en el diseño (`18px 12px 30px`, y en escritorio 25px/42px) pero deja más aire abajo que arriba; se simetriza a `18px` arriba/abajo SOLO en móvil como mejora de UX deliberada — el valor de escritorio no se toca porque `PaginaMensajesVideollamadaEnCurso.tsx` depende del valor exacto (lo cancela con márgenes negativos) y no se pidió tocarlo. (3) El estado de colapso/móvil del sidebar vive en `EstructuraApp` (no en cada una de las 40 páginas) para no tocar ningún archivo de `paginas/`; en escritorio se persiste en `localStorage` bajo `codeplex-sidebar-colapsado`, en móvil arranca siempre cerrado y nunca se persiste, y cruzar el breakpoint de 800px fuerza el cierre del panel móvil (`matchMedia('change')`), igual que el original.

## `compartido/navegacion/ElementoNavegacion.tsx` — insignia superpuesta cuando el sidebar está colapsado

Hallazgo real: el CSS original nunca resuelve la insignia (Notificaciones/Mensajes) cuando el sidebar colapsa — `.sidebar-colapsado .elemento-menu span{display:none}` solo oculta la etiqueta de texto, así que la insignia seguía como segundo hijo del `flex` junto al ícono, generando una fila de 2 columnas dentro de los ~76px del sidebar colapsado (bug heredado del original, no introducido por la migración). El propio proyecto ya resuelve "insignia flotando sobre un ícono" en otro lugar (`.insignia-flotante`, usada en el botón de notificaciones del BarraSuperior); aquí se reutiliza ese mismo patrón (ícono envuelto en `relative` propio, insignia `absolute` en su esquina superior derecha), activo solo cuando `colapsado && tieneInsignia`. Con texto visible el marcado no cambia.

## `compartido/navegacion/BarraSuperior.tsx` — bug real de overflow horizontal en móvil

Tres hallazgos de la auditoría de navegación/responsive: (1) la marca "CODEPLEX" sí tenía navegación real en el original (`href` a la página de inicio) pero se había dejado como `href="#"` por error — se restaura el href literal. (2) El botón de menú (hamburguesa) sí tenía comportamiento real que no se había migrado (`onAlternarSidebar`); el resto de controles (buscador, selector de empresa, perfil, acciones de la derecha) sigue sin `onClick` porque grep confirma cero listeners reales para ellos en el original. (3) El bug grande: bajo 800px el header nunca reproducía sus propios breakpoints (ocultar buscador/selector de empresa, ocultar 2 de 6 botones de acciones, ocultar nombre+flecha del perfil), así que siempre renderizaba su contenido completo con un ancho mínimo de ~869px que desbordaba cualquier viewport menor. Como el header es hijo directo del contenedor raíz sin `min-width:0`, ese overflow se propagaba a todo el documento (confirmado con Playwright vía `document.documentElement.scrollWidth`) — la causa real del "espacio vacío"/"contenido comprimido" reportado en móvil, no un problema del BarraLateral ni de `EstructuraTresColumnas` (ambos ya reproducían sus breakpoints correctamente). El buscador y el selector de empresa además necesitan compartir un contenedor `min-width:0` (para competir por el espacio disponible como grupo) — sin ese wrapper, confirmado con Playwright, el botón de selector de empresa no reducía su ancho al estrecharse la ventana antes del breakpoint móvil.

## `compartido/interfaz/Insignia.tsx` — 4 familias de badge estructuralmente distintas

Auditoría real: existen 4 familias de badge con forma/tamaño/paleta propios (`counter` = `.insignia`, pill redondo, siempre color primario sin variantes; `status` = `.estado-*`, con color SIEMPRE explícito por prop porque el mismo estado usa colores distintos entre páginas — ej. "bajo" es naranja en Estadísticas/Dashboard y rojo en Indicadores; `privacy` = `.badge-privacidad`, rectangular, 2 tonos con colores propios sin tokenizar; `privateTag` = `.etiqueta-privado`, pill morado, distinto en forma y color de `privacy` pese al nombre parecido). No se modelan como un único `variant` con lista de colores intercambiables porque no son la misma cosa con distinto color. `.badge-overlay` (círculo sobre un avatar que contiene un ícono) queda deliberadamente excluido: estructuralmente es otra cosa, no una etiqueta de texto.

## `compartido/interfaz/Selector.tsx` — bugs reales de ancho no migrados

Auditoría real de 3 variantes NO intercambiables (`default`, `colaboradores`, `mini`, cada una con su propia receta de CSS). Dos bugs de migración encontrados y corregidos: (1) Reportes/Indicadores — faltaba `@media(max-width:900px){...flex:1; select{width:100%}}`, la misma regla que en el original solo aplica bajo 900px (no siempre); sin ella el `<select>` quedaba del tamaño de su contenido en vez de repartirse el ancho de su fila junto al botón "Filtros avanzados". (2) Colaboradores — `.campo-select-colab select{width:100%}` faltaba en la migración; `PaginaColaboradores` usa el select dentro de un grid de 4 columnas esperando que cada uno llene su columna, y sin el ancho completo cada caja se encogía a su propio contenido (ej. "Todos" ~90px).

## `mensajeria/bloques/ListaConversaciones.tsx` y `PanelConversacion.tsx` — `display:none` reinicia `scrollTop` y dispara su propio evento `scroll`

Hallazgo real de comportamiento del navegador, confirmado con Playwright: en el layout móvil de una columna, `ListaConversaciones` nunca se desmonta al alternar con `PanelConversacion` — se oculta con `max-[900px]:hidden`. Pero `display:none` sí reinicia a 0 el `scrollTop` del propio nodo, y ese reinicio dispara su PROPIO evento `scroll` con `scrollTop=0`; un `onScroll` pasivo que sincronizara continuamente terminaría guardando ese 0 y perdiendo la posición real (confirmado: sin este cuidado, el scroll se pierde igual aunque el componente nunca se desmonte). Por eso el `scrollTop` se captura una sola vez, de forma síncrona, en el propio clic que selecciona la conversación — justo antes de que la lista se oculte — y se restaura recién al dejar de estar oculta (`useLayoutEffect`).

Bug de altura compartido entre ambos componentes: a `ListaConversaciones` (`<aside>`) y a `PanelConversacion` (grid con fila `1fr`) les faltaba el equivalente de `min-height:0` que sí tiene el original junto a `min-width:0`. Sin él, el alto intrínseco de `PanelConversacion` (cabecera + fijado + TODO el hilo sin recortar + redactor) se propagaba hacia arriba y desbordaba el contenedor padre, cortando el redactor — y como ambos comparten fila de grid en `PaginaMensajesTodos.tsx`, ese alto excesivo también arrastraba a `ListaConversaciones`. `min-h-0` en ambos corrige la causa raíz; el antiguo `max-[900px]:h-full` ya no hace falta.

Mejora de UX deliberada, pedida explícitamente: se retira el pie "Ver más mensajes" (`.enlace-ver-mas-mensajes`, que sí existía en el original) para que la lista de conversaciones sea continua y llegue hasta el final real del contenedor incluso con pocas conversaciones. También, solo bajo `max-[900px]`, se retira la apariencia de "tarjeta" (`border`/`rounded`/`bg-white`) del `<aside>` de `ListaConversaciones` — en escritorio, con dos columnas visibles a la vez, la tarjeta separa visualmente; en móvil, con una sola vista de pantalla completa, la misma tarjeta se leía como una caja pequeña flotando sobre el fondo general en vez de comportarse como la superficie de la pantalla.

## `mensajeria/bloques/PestanasMensajes.tsx` — misma clase CSS, contenido distinto por página

`.pestanas-mensajes`/`.pestana-mensaje` se reutiliza en 4 páginas pero NO con el mismo contenido: 09/12 muestran "Mensajes / Videollamadas"; 10/11 la reutilizan para "Todos / No leídos / Favoritos" (13/14 no la tienen). Por eso el componente recibe la lista de pestañas por prop (`tabs`) en vez de asumir un contenido fijo — hallazgo real al leer las 4 páginas, no una generalización anticipada.

## Pestañas desplazables (`PestanasActividad`, `PestanasEventos`, `PestanasAmigos`, `PestanasGrupos`, `PestanasMensajes`) — memoria de scroll a través de remounts

Cada pestaña navega a una página distinta (un componente de página por pestaña) — el router hace un swap síncrono de elementos, así que el componente de pestañas se DESMONTA y VUELVE A MONTAR en cada cambio: la pista horizontal es un nodo DOM nuevo, con `scrollLeft:0` por defecto, sin memoria de la posición que el usuario había dejado en la pista anterior.

En `PestanasActividad.tsx` y `PestanasEventos.tsx`, `ultimaPosicionScroll` vive a nivel de MÓDULO (no como estado de React, que se perdería en el desmontaje) y guarda esa posición real, restaurándola al montar antes de decidir si hace falta revelar la pestaña activa. Sin esto, calcular "¿la pestaña activa es visible?" siempre partía de 0, así que una pestaña visible a mitad de una pista ya desplazada terminaba "visible" solo empujándola al extremo derecho — la posición manual del usuario se perdía en cada clic. Solo si, restaurada esa posición, la pestaña activa NO queda completamente visible (p. ej. entrar a una subpágina de forma directa) se desplaza lo mínimo para revelarla — cálculo manual contra la pista, no `scrollIntoView`, para no arriesgar que el scroll se propague a un ancestro.

`useLayoutEffect` (no `useEffect`) + asignación directa de `scrollLeft` (no `scrollBy`/`scrollIntoView` con `behavior:'smooth'`): con `useEffect` el navegador ya pintaba un frame en `scrollLeft:0` (recién montado) antes de que el efecto corriera, y la animación smooth desde ahí hasta la pestaña se veía como "vuelve al inicio y luego corrige". `useLayoutEffect` corre síncrono después de mutar el DOM pero ANTES de pintar, y asignar `scrollLeft` directamente siempre es instantáneo — así la pestaña ya aparece en su posición final en el primer frame, sin animación. En `PestanasActividad.tsx`, `carrusel` (objeto nuevo en cada render de `useCarrusel`) queda fuera del array de dependencias del efecto a propósito: por el mismo remount, el efecto ya corre una vez por montaje con `activa` fijo — agregarlo dispararía el cálculo en cada render sin necesidad.

`PestanasEventos.tsx` usa su propia variable de módulo independiente de la de `PestanasActividad` (son pistas distintas). `PestanasAmigos.tsx` y `PestanasGrupos.tsx` no reproducen este mecanismo — sus 4 pestañas caben siempre sin overflow real, así que no hace falta.

Insignias inconsistentes entre páginas hermanas (halladas leyendo el HTML original, se preservan tal cual): en Amigos, solo `18-05-amigos-04-web-listas.html` incluía `<span class="insignia-pestana">3</span>` junto a "Solicitudes" — esa clase no tiene ninguna regla CSS en todo el proyecto, así que el "3" se ve como texto plano pegado al nombre, no como badge; las otras 3 páginas de Amigos no muestran ningún número. En Eventos, la insignia de "Invitaciones" tampoco es constante entre las 6 páginas ("7" en Para ti; "2" en Próximos/Populares/Invitaciones/Calendario) y en Mis eventos usa esa misma clase rota `insignia-pestana`, con el mismo efecto de texto plano. Ninguna de las dos se unifica — se preserva la inconsistencia real del original vía props (`insigniaSolicitudes`, `insigniaInvitaciones`).

## paginas/colaboradores/PaginaColaboradores.tsx — orden visual controlado por `grid-template-areas`, no por orden del DOM ni `order`

Este grid de 2-3 columnas (Colaboradores / Detalle opcional / Publicidad / "¿Cómo funciona?") tuvo dos bugs reales de posicionamiento con `grid-template-columns` a secas (sin filas explícitas), ambos resueltos con `grid-template-areas` en vez de `order`/`grid-column`/`grid-row` manuales:

- Hueco vertical antes de "¿Cómo funciona?": con auto-placement, esa sección caía en una fila implícita nueva que no podía empezar hasta terminar la fila anterior — cuya altura la marcaba Publicidad (casi siempre más alta que la tabla de Colaboradores). Se resolvió con 2 filas de áreas explícitas: Detalle/Publicidad repiten su nombre en ambas filas (equivalente a `grid-row:span 2`), mientras Colaboradores y "¿Cómo funciona?" son cada uno su propia fila en esa misma columna, así que su altura combinada deja de depender de Publicidad.
- Orden real Tabla → Detalle → Publicidad: el `<aside>` de Detalle vivía después de la columna de Publicidad en el JSX, así que el auto-placement lo colocaba en la última pista del grid sin importar el ancho asignado. Con áreas nombradas, la posición la decide el nombre del área, no el orden del documento — se pudo dejar el JSX en su orden natural.

Relacionado: "¿Cómo funciona?" vivía antes dentro del `<section>` principal (como último hijo del flex-col de la tabla), lo que lo ataba a Colaboradores — al colapsar a 1 columna en mobile terminaba apareciendo antes que "Detalle del colaborador" en vez de después. Se convirtió en un cuarto hijo directo del grid (con su propia área `comofunciona`); el `mt-8` que tenía como hijo del flex-col se quitó a propósito porque, como hijo independiente del grid, el `gap-lg` del contenedor ya provee esa separación.

## paginas/eventos/PaginaEventosParaTi.tsx — buscador y ubicación reutilizan `CampoBusqueda`, apilado móvil con `flex-basis` real

Bajo `@media max-width:900px`, `eventos.css` pasaba esta fila (buscador + ubicación + botón) a columna con cada elemento a ancho completo — comportamiento nunca reproducido antes de esta página (hallazgo real de auditoría de overflow móvil). Aprovechando el apilado, "Buscar eventos"/"Ubicación" se migraron para reutilizar la receta visual de `CampoBusqueda` (la misma de Amigos) en vez de mantener su propia receta de 44px/`rounded-[10px]` — mejora de consistencia entre páginas pedida explícitamente, no restauración de fidelidad al original.

Confirmado con Playwright: sin `max-[900px]:flex-none`, al apilarse la fila en columna, `flex-1` (flex-basis:0% en el nuevo eje vertical) fijaba la ALTURA del campo en vez del ancho, aplastándolo a 21.5px en vez de los 34/44px esperados — mismo mecanismo de flex-basis-gana-en-el-eje-principal ya encontrado en `PaginaAmigosTodos`. `max-[900px]:w-full` cubre el ancho completo que antes daba `flex-1` en la fila horizontal.

## paginas/inicio/PaginaInicio.tsx — `nowrap`+ellipsis del padre no fuerza una sola línea en el hijo anidado

En "Contactos en línea", `.datos-persona strong` declara `white-space:nowrap` + ellipsis en `sistema.css`, pero el `"(COLABORADOR)"` anidado dentro de ese `<strong>` sí pasa a una segunda línea en el navegador real (verificado con captura de pantalla) en vez de truncarse en la misma línea, como sugeriría leer la hoja de estilos por sí sola. Se preserva ese comportamiento observado (el hijo puede envolver aunque el padre declare `nowrap`) en vez del truncado estricto de una sola línea.

## Deuda pendiente, no cubierta por esta migración

Los 12 dominios reales (actividad, mensajeria, amigos, grupos, marketplace, eventos, colaboradores, dashboard, estadisticas, reportes, indicadores, inicio) no tienen todavía `catalogos/` (JSON de rutas/títulos como sí tiene `gestion_base`), ni `servicios/` (todo el contenido hoy es `datos/` hardcodeado), ni `mensajes/` (textos hardcodeados en JSX en vez de i18n). Es fiel al HTML original migrado; conectar backend real es el siguiente paso, dominio por dominio.
