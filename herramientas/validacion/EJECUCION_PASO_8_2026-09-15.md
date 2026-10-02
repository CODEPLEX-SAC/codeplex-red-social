# Ejecución del Paso 8 — rutas 100% JSON — 15-09-2026

Este documento registra qué se hizo para el Paso 8 de `ACTUALIZACION_VALIDADOR_2026-09-15.md` (motivo `rutas de pagina/html no deben construirse en JSX`). Los pasos 1-6 están en `EJECUCION_PASOS_1_6_2026-09-15.md`. Los pasos 7 y 9 siguen pendientes.

Línea base antes de empezar: **125 errores**, de los cuales **45** eran del motivo de rutas.
Estado al cerrar el Paso 8: **120 errores**, motivo de rutas en **0**.

La cuenta total no baja 45 a 45 — vuelve a pasar lo mismo que en los pasos anteriores: al tocar estos archivos aparece una capa nueva de la regla "constantes de presentación" (11 casos, en páginas que ya tenían sus propios mapas `Record<...>` de clases y que no formaban parte de los 12 archivos corregidos en el Paso 6). Esa capa queda documentada abajo como pendiente, junto con los pasos 7 y 9, no se tocó en este paso porque no es su alcance.

## Qué se cambió

El problema era que toda la navegación interna vivía en dos sistemas paralelos:
- El catálogo JSON de cada subcapacidad, con sus rutas reales (`catalogoActividad.rutas.todas` → `/actividad`).
- Un mapa de compatibilidad con el sitio HTML original (`archivo: '02-02-actividad-01-todas-web.html'`), usado en enlaces, pestañas y navegación programática.

El validador exige que la navegación salga solo del catálogo. Se eliminó por completo el segundo sistema.

**A. Motor de rutas central**
- `tipos/enrutamiento/rutas.ts`: se quitó el campo `archivo` de `RutaApp`.
- `rutas/compartido/rutas.tsx`: se quitaron los 40 literales `archivo: '...html'` del array `RUTAS` y el export `ARCHIVO_A_RUTA`.
- `rutas/compartido/obtener_archivo_del_enlace_clicado.ts` → reemplazado por `obtener_ruta_del_enlace_clicado.ts`: en vez de extraer el nombre de archivo del `href` y buscarlo en un mapa, ahora toma el `href` tal cual cuando empieza con `/` (ruta real de la app).
- `usar_interceptar_enlaces.ts`: en vez de `ARCHIVO_A_RUTA[archivo]`, valida el href directo contra `resolverRuta()`.

**B. Datos de navegación compartidos**
- `tipos/compartido/navegacion.ts` (`ElementoNavegacion`): `archivo: string | null` → `ruta: string | null`.
- `datos/compartido/navegacion.ts` (`NAV_PRINCIPAL`, `ESPACIO_TRABAJO`): los 11 valores `archivo: '...html'` pasaron a `ruta: catalogoX.rutas.y` (importando los 12 catálogos de subcapacidad); `avisos` y `guardados` quedan en `ruta: null` (no navegan).
- `componentes/compartido/navegacion/elemento_navegacion.tsx`: `item.archivo` → `item.ruta`.

**C. Componentes de pestañas (Actividad, Eventos, Grupos, Amigos, Mensajes)**
- Los 5 componentes `Pestanas*` tenían un array `TABS` con `href`/`archivo: '...html'`. Se cambiaron para llevar una `clave` (la misma clave que usa `catalogo.rutas`), y el `href` se calcula en el momento: `catalogoX.rutas[clave]`.
- Los 4 archivos `tipos/*/pestanas_*.ts` (uniones de string literal con nombres de archivo `.html`) pasaron a uniones de las claves de ruta (`'todas' | 'publicaciones' | ...`).
- `tipos/mensajeria/pestanas_mensajes.ts` (`PestanaMensajeItem`) tenía `archivo: string`; pasó a `clave: ClaveRutaMensajeria` (tipo nuevo con las 4 claves válidas).
- Los 26 usos `<PestanasX activa="NN-...html" />` en las páginas se cambiaron a `activa="clave"`. Los 4 usos de `<PestanasMensajes tabs={[...]}>` (que arman su propio array de tabs) pasaron de `{ archivo: '...' }` a `{ clave: '...' }`.

**D. Enlaces sueltos**
- `barra_superior.tsx` (1 href) y `lista_conversaciones.tsx` (3 hrefs): de `.html` literal a `catalogoX.rutas.clave`.
- 9 enlaces `<a href="...html">` sueltos en páginas de eventos, grupos, colaboradores y videollamadas de mensajería: mismo cambio.

**E. Asistente de invitar colaborador**
- Las 4 páginas del wizard (`informacion` → `rol_permisos` → `vigencia` → `resumen`) usaban un helper local `NAVEGAR_A(archivo)` que resolvía el archivo vía `ARCHIVO_A_RUTA`. Al desaparecer ese mapa, `NAVEGAR_A` pasó a ser un alias directo de `navegar` (`const NAVEGAR_A = navegar`), y los 15 sitios donde se llamaba con un `.html` ahora reciben la ruta del catálogo directo (`catalogoColaboradores.rutas.invitar_vigencia`, etc.).

## Verificación

- `npx tsc -b` → limpio.
- `npx vitest run` → 40/40 en verde (sin cambios necesarios en las pruebas: renderizan la página, no dependen de las rutas internas).
- `npx vite build` → compila.
- `validar_capacidad.ps1` → motivo `rutas de pagina/html no deben construirse en JSX`: de 45 a **0**.

## Lo que queda (pasos 7 y 9 — no ejecutados; más una capa nueva del Paso 6)

| Motivo | Errores al cerrar el Paso 8 |
|---|---|
| `frontend/datos no debe declarar datos de prueba en TypeScript` (Paso 9) | 55 |
| `Tailwind arbitrario, hexadecimales o gradientes quemados` (Paso 7) | 53 |
| `constantes de presentacion no deben vivir en TSX` (capa nueva del Paso 6, en páginas no cubiertas la primera vez) | 11 |
| `no importe recursos crudos` (límite conocido de la herramienta, ver Paso 2) | 1 |
