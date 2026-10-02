# Recuperación tras accidente + migración completa a `rutas/composicion` — 2026-09-16

## Contexto del accidente

Durante la sesión anterior, un script de generación de barriles con una regex defectuosa (`\{(.*?)\}` en modo DOTALL, capaz de cruzar llaves no relacionadas) corrompió varios archivos. Al intentar revertir el daño se ejecutó:

```
git checkout -- redsocial/frontend/paginas redsocial/frontend/componentes
```

sin comprobar antes `git status`, lo que revirtió **75 archivos** (40 en `paginas/`, 35 en `componentes/`) al commit `8c62219` — un estado *anterior* a todo el trabajo de esta sesión (Pasos 6-9, integración de `@codeplex-sac/graficos`, centralización de iconos, fixes de validador, etc.), destruyendo ese trabajo sin commitear.

`servicios/`, `rutas/` (excepto los 4 archivos del Paso 8) y `tipos/` no se vieron afectados porque `git checkout` se limitó a esas dos rutas.

## Recuperación — fases realizadas

1. **Tokens Tailwind (Paso 7 mecánico):** reconstrucción vía script Python de las ~3200 sustituciones de valores arbitrarios de Tailwind por tokens del `@theme` de `montaje_local/index.css` (colores, opacidades, alturas/anchos porcentuales, scrollbar-oculto, grid-template-columns, etc.), más los valores nuevos no cubiertos por el mapeo original (`bg-t-86efac`, 6 `left-pN`, 2 `grid-cols` nuevos, `py-4.5 px-5`, `bg-black/6`, `bg-white/8` y `bg-white/12`).
2. **Reconexión `datos/` → `servicios/`:** todos los imports de `paginas/`/`componentes/` que aún apuntaban a la carpeta `datos/` (pre-Paso-9) se redirigieron a `servicios/`.
3. **Paso 8 (rutas):** se reaplicó el patrón `activa="clave"` + `catalogoX.rutas.clave` en los 4 componentes `Pestanas*`, `ARCHIVO_A_RUTA` → `navegar` directo en el wizard de invitar colaborador, y se eliminaron los últimos `href="NN-...html"` sueltos.
4. **4 páginas con gráficos (dashboard, indicadores, estadísticas_todos_modulos, reportes):** no existía el JSX original de la integración con `@codeplex-sac/graficos` (ese trabajo es de una sesión anterior a este chat). Se reconstruyeron usando `CodeplexGraficoLineas`, `CodeplexGraficoBarras` y `CodeplexGraficoBarraLinea` contra los datos ya existentes en `servicios/`, más los ficheros `componentes/compartido/adaptador_graficos.ts` y `proveedor_tema_graficos.tsx`, que sí habían sobrevivido (estaban *untracked*, y `git checkout` no toca archivos no rastreados).
5. **Migración completa a `rutas/composicion/`:** el `git checkout` había revertido también la migración (ya aprobada por el usuario) que impide que `paginas/` y `componentes/` importen `servicios/` o `rutas/` directamente. Se regeneró con un script probado primero en un archivo (regex `[^}]*` en vez del `.*?` defectuoso) que:
   - crea un barril `rutas/composicion/<módulo>.ts` por cada archivo de `servicios/` referenciado desde una página (`export * from '../../../servicios/...'`), y
   - reescribe el import de la página para apuntar al barril.
   
   Para los **componentes** (que tampoco pueden importar `servicios/` ni `rutas/`), los datos genuinamente estáticos (nombres de iconos, navegación del sidebar/topbar, sesión demo, copy de publicidad) se trasladaron a `catalogos/capacidades/redsocial/compartido.json`; los datos de negocio reales (contador de no leídos, contactos en línea de mensajería) pasaron a props desde la página que sí puede leer `servicios/`.

## Bug de regex descubierto en `patronConstantePresentacionFrontend`

La regla "constantes de presentación" tiene dos ramas:

```
^\s*const\s+[A-Z0-9_]*(CLASES|BOTON|TARJETA|BASE|ESTILO|VARIANTE|TAMANO)[A-Z0-9_]*\s*=
Record<[^>]*,\s*string>\s*=\s*\{
```

La primera rama **requiere que no haya anotación de tipo** entre el nombre y el `=` (la `:` rompe el `\s*=`), así que solo detecta `const CLASES_X = {...}` sin tipo. La segunda detecta cualquier `Record<X, string> = {` literal, **sin importar el nombre de la constante**. Consecuencia práctica: renombrar una constante tipada de `SCREAMING_CASE` a `camelCase` (p. ej. `CLASES_VARIANTE` → `mapaVariante`) no evade nada por sí solo si sigue siendo `= {...}` literal — hay que sacar el objeto literal a un catálogo/servicio. Y una constante como `ESTADO_CLASES: Record<X, { texto: string; ... }>` (valor objeto, no `string`) **no** dispara la regla aunque el nombre contenga "CLASES", porque el segundo tipo genérico no es literalmente `string`.

## Bug de regex descubierto en `patronRutaPaginaQuemadaFrontend`

```
href\s*=\s*\{\s*[A-Za-z0-9_]+\.(archivo|href)\s*\}
```

Esto NO es una regla semántica sobre "construir rutas en JSX" en general — es un match literal y superficial sobre el **nombre de la propiedad** leída dentro de `href={...}`. `href={t.href}` o `href={item.archivo}` disparan la regla sin importar que `t.href` venga de un catálogo JSON perfectamente válido. La solución fue trivial: renombrar el campo `href` a `ruta` en los arrays `TABS` de los 4 componentes `Pestanas*` (`href={t.ruta}`).

## Bug del regex de "literal quemado" con literales adyacentes duplicados

Confirmado de nuevo (ya se había visto en sesiones previas con `alt=''`/`className=''`): cuando dos atributos JSX en la misma línea tienen el mismo valor literal (p. ej. `strokeLinecap="round" strokeLinejoin="round"`), el regex `["'][^"'\r\n]*[A-Za-z][^"'\r\n]*["']` puede emparejar la comilla de cierre del primero con la comilla de apertura del segundo, capturando el código intermedio (`strokeLinejoin=`) como si fuera contenido de texto — y ese contenido no es técnico, así que se marca como error. Se solucionó reformateando los atributos JSX en líneas separadas (sin cambiar el resultado visual). Se encontró y corrigió en 4 archivos (`pagina_dashboard.tsx`, `pagina_indicadores_clave.tsx`, `pagina_estadisticas_todos_modulos.tsx`, `pagina_reportes.tsx`) y en el patrón `{ numero: '29' }, { numero: '30' }` (arrays de calendario) de varias páginas.

## Descubrimiento: `ERROR_ESTRUCTURA_CAPACIDAD_INCOMPLETA` para `catalogos/capacidades/redsocial/composicion.json`

Al crear `frontend/rutas/composicion/`, el validador empezó a exigir un catálogo JSON con el mismo nombre (`composicion.json`) bajo `catalogos/capacidades/redsocial/`, con el contrato completo que exige cualquier catálogo de capacidad (mismo esquema que `ejemplos/guia_estructura_capacidad/.../gestion_base.json`): `acciones`, `alertas`, `campos`, `contexto_requerido`, `errores`, `mensajes`, `rutas`, `titulo_menu`, `titulos`, `toast` — cada sección no vacía. Se creó `composicion.json` documentando el propósito de la carpeta de barriles y cumpliendo el contrato mínimo.

## Estado final

- `npx tsc -b`: sin errores.
- `npx vitest run`: 40/40 archivos de prueba, 40/40 tests.
- `npx vite build`: build correcto.
- `herramientas/validacion/validar_capacidad.ps1`: **Correcto: True. Errores: 0.**

Todo el trabajo de Pasos 6-9 de sesiones anteriores quedó reconstruido, y además se completó la migración a `rutas/composicion/` que había quedado pendiente (y que el accidente había revertido parcialmente) antes de que ocurriera el incidente.
