# Actualización del Centro de Capacidades — 15-09-2026

El `centro_capacidades.exe` de `C:\Codeplex\ValidadorCapacidades` se reemplazó hoy a las **15:58** (fecha de archivo comprobada), en medio de la misma sesión de trabajo. Sigue siendo la misma herramienta (mismo flujo de menú, mismo formato de JSON, el ejemplo oficial `ejemplos/guia_estructura_capacidad` sigue dando `Correcto: True` sin tocarlo — comprobado), pero trae **9 reglas nuevas** agrupadas en una sola función del binario, `validarGobiernoFrontend`, que no existía en la versión del 12-09-2026 documentada en `PLAN_VALIDADOR_REDSOCIAL.md`.

Este documento reemplaza, **solo para el frontend**, a la sección 2.6 de ese plan. Las reglas de estructura, catálogos y lenguaje ubicuo que ya conocíamos siguen igual; lo que cambió es el frontend.

Corrida de referencia: `_validacion/20260915_161013/resultado.json`, capacidad tal como quedó tras el Paso 8 y la integración de `@codeplex-sac/graficos`. **176 errores** (177 en un recuento previo con un archivo mío de esa misma tarde; el número exacto fluctúa un poco según el orden de recorrido, como ya sabíamos de la versión anterior).

## 1. Cómo se investigó

Mismo método que el plan anterior (sección 2.7-2.8): `herramientas/validacion/leer_reglas_validador.py --patrones` para sacar las expresiones regulares del binario, `--buscar`/`--funcion` para ubicar el mensaje y el orden en que se aplican, y una sonda puntual para confirmar cada regla contra un archivo real del proyecto antes de anotarla acá.

## 2. Las 9 reglas nuevas

Todas caen bajo el mismo código de error, `ERROR_FRONTERA_3DD_VIOLADA`, con el detalle en formato `ruta | motivo` de siempre.

| Motivo (texto exacto) | Expresión regular | Qué detecta de verdad | Archivos afectados hoy | Cómo se cumple de verdad |
|---|---|---|---|---|
| `prueba frontend vacia; debe validar comportamiento real de la capacidad` | `patronPruebaVaciaFrontend` = `\b(it\|test)\s*\([^,]+,\s*(?:async\s*)?\(\s*\)\s*=>\s*\{\s*\}\s*\)` | Un `it(...)`/`test(...)` cuyo cuerpo está vacío. Antes esta regla **no existía**: el plan anterior documentó como "deuda escondida" que "una prueba vacía cumple la regla de pruebas, pero no prueba nada" — ahora sí se mide. | **40** — las 40 pruebas del Paso 4, todas con cuerpo `{}` | Escribir una aserción real (render + expectativa) en cada `.test.tsx`. Requiere instalar Vitest + Testing Library (decisión ya anotada como pendiente en el plan anterior, sección 4). |
| `no importe recursos crudos directo en pantallas o bloques; centralice imagenes/iconos en recursos y expongalos por componente o catalogo` | `patronImportacionRecursosFrontend` = `^\s*import\b[^'"]*['"][^'"]*recursos/[^'"]+['"]` | Cualquier `import x from '…/recursos/…'` fuera de `componentes/compartido/icono.tsx` (ese archivo está explícitamente exceptuado en el binario, confirmado leyendo la función). | **27** — todo lo que hace `import usuarioImg from '…/recursos/imagenes/usuario.jpg'` | Crear un componente `AvatarUsuario`/`ImagenUsuario` en `componentes/compartido/` que sea el único que importe de `recursos/imagenes/`, y que el resto de páginas/bloques lo usen a él en vez de importar la imagen directo. |
| `rutas de pagina/html no deben construirse en JSX; use frontend/rutas y catalogos JSON de navegacion` | `patronRutaPaginaQuemadaFrontend` = `(href\s*=\s*["'][^"']*(?:\.\./)?paginas/\|href\s*=\s*\{[^}]*\.\./paginas\|\.html\b\|href\s*=\s*\{\s*[A-Za-z0-9_]+\.(archivo\|href)\s*\})` | El patrón `href={x.archivo}` (o `.html`, o `href="…paginas/…"`) en JSX. Apunta directo a la capa de compatibilidad con el sitio `.html` original que `decisiones_arquitectura_spa.md` documenta extensamente (`ARCHIVO_A_RUTA`, el interceptor de clics). | **26** — las 6 `Pestanas*.tsx`, `barra_superior.tsx`, `datos/compartido/navegacion.ts`, 13 páginas, `rutas/compartido/rutas.tsx` y los 4 `tipos/*/pestanas_*.ts` | Esto es un cambio de arquitectura, no un parche: las rutas tienen que salir 100% del catálogo JSON de cada subcapacidad (ya existen, ver Paso 3 del plan anterior) en vez de venir del campo `archivo`/`href` que imita el sitio `.html`. Es la sección 4 del plan anterior ("Enrutador propio y href a archivos .html"), que quedó anotada como decisión pendiente — ahora el validador la exige. |
| `tipos de pagina no deben contener catalogos de negocio quemados; publique codigos desde JSON, contrato o esquema central` | `patronUnionLiteralPaginaFrontend` = `(:\s*'[^']+'\s*\|\|=\s*'[^']+'\s*\|)`, solo en `frontend/tipos/**/pagina_*.ts` | Una unión de literales (`estado: 'optimo' \| 'aceptable' \| 'bajo'`) escrita en un archivo de tipos de página. | **21** — todos los `tipos/*/pagina_*.ts` que definen un union type para colores/estados | Esas listas de valores posibles pasan a vivir en el catálogo JSON de la subcapacidad (ya tienen `acciones`, se puede agregar algo como `estados_disponibles`), y el tipo TS se deriva de ahí (`(typeof catalogo.estados_disponibles)[number]`) en vez de escribirse a mano. |
| `frontend/datos no debe declarar datos de prueba en TypeScript; use JSON de catalogo o servicio API` | `patronDatosFalsosFrontend` aplicado a cualquier `frontend/datos/*.ts` que `descubrimiento.esCodigoProductivo` marque como contenido (no solo tipos) | Un archivo dentro de `datos/` con contenido literal en TypeScript. | **15** de ~60 archivos de `datos/` (el resto cae bajo la regla siguiente, "no importe tipos desde pagina_*", antes de llegar a esta) | Esta es la más grande de fondo: `datos/` completo tiene que dejar de ser TypeScript con arrays/objetos escritos a mano y pasar a ser JSON (consumido como catálogo) o venir de un `servicios/` real. Es exactamente la "deuda pendiente" que el plan anterior ya señalaba en su última sección ("todo el contenido hoy es datos/ hardcodeado") — antes era una observación, ahora bloquea. |
| `no importe tipos desde archivos pagina_*; publique un indice del modulo y consuma desde ahi` | `patronImportacionTipoPaginaFrontend` = `^\s*import\s+type\s+\{[^}]+\}\s+from\s+['"]@/tipos/[^'"]+/pagina_[^'"]+['"]` | Un `datos/*.ts` que hace `import type {...} from '@/tipos/x/pagina_x'`. | **27** — casi todos los `datos/*.ts` que tipan sus arrays importando el tipo directo del archivo de la página | Crear un `tipos/<subcapacidad>/index.ts` que reexporte lo necesario, e importar desde ahí en `datos/`, no directo del archivo `pagina_*.ts`. |
| `constantes de presentacion no deben vivir en TSX de componentes/paginas; use tokens del Shell, libreria Codeplex o archivo central de diseno` | `patronConstantePresentacionFrontend` = `^\s*const\s+[A-Z0-9_]*(CLASES\|BOTON\|TARJETA\|BASE\|ESTILO\|VARIANTE\|TAMANO)[A-Z0-9_]*\s*=\|Record<[^>]*,\s*string>\s*=\s*\{`, solo en archivos que `descubrimiento.componenteVisualFrontend` clasifica como componente visual | Cualquier `const CLASES_X: Record<Y, string> = {...}` (o nombre que contenga BOTON/TARJETA/BASE/ESTILO/VARIANTE/TAMANO). Es el patrón que usamos en **cada página** para mapear un color con nombre a una clase Tailwind (`CLASES_ICONO_KPI`, `CLASES_ESTADO_*`, etc.) | **11** de muchos más (se corta por capas: cada archivo aporta 1 antes de pasar al siguiente) | Estos mapas se centralizan en un archivo de diseño único (algo como `componentes/compartido/paleta_colores.ts`, que **también** cae bajo esta regla porque es un `.ts` con `Record<string,string>` — hay que revisar si un archivo puramente de tokens, sin JSX, cuenta como "componente visual" o si necesita otra ubicación) o pasan a la librería `@codeplex-sac`. |
| `Tailwind arbitrario, hexadecimales o gradientes quemados no permitidos; use tokens del diseno Codeplex y Tailwind 4 configurado` | `patronTailwindArbitrarioFrontend` = clases con `[…]` (`bg-[…]`, `h-[…]`, `w-[…]`, etc.) o `linear-gradient` literal, en archivos "componente visual" | Cualquier clase Tailwind con corchetes o gradiente CSS escrito a mano. | **9** de un número mucho mayor (el proyecto usa esto en casi cada `className`) | El cambio más grande de todos: reemplazar cada `h-[34px]`, `bg-[#hex]`, `w-[15px]`, etc. por una escala de espaciado/tamaño configurada en Tailwind (`tailwind.config`/tokens `@theme`) o por componentes de la librería Codeplex. Esto no es archivo por archivo, es una decisión de sistema de diseño completa. |
| `literal visible quemado en frontend; textos, rutas de negocio y acciones deben venir de JSON` | `patronLiteralTextoFrontend` (la misma de antes, ahora también atrapa literales que parecen hex/color) | Cualquier string con letras entre comillas — incluye colores hex como `'#7c3aed'`. | **1** — `proveedor_tema_graficos.tsx:6`, mi archivo de hoy | Ese hex tendría que salir de un catálogo/token en vez de estar escrito en el componente. Falso positivo real (no es texto visible), pero la regla no distingue. |

## 3. Lo que esto significa en conjunto

Cuatro de estas nueve reglas (`Tailwind arbitrario`, `constantes de presentación`, `rutas quemadas en JSX`, `datos de prueba en TypeScript`) no son bugs puntuales — apuntan a **decisiones de arquitectura que el plan anterior ya había dejado anotadas como pendientes** en su sección 4 ("Fuera de este plan: decisiones para conversar"):

- El enrutador propio con `href`/`.html` → ahora bloqueado, no solo "por conversar".
- `datos/` en TypeScript en vez de servicios reales → ahora bloqueado.
- Sin librería `@codeplex-sac` para primitivas visuales → ahora hace falta para tokens de diseño, no solo por consistencia.

Y dos reglas nuevas (`prueba vacía`, `constantes de presentación`) tocan directamente trabajo que hicimos en esta misma sesión (Paso 4, y los `CLASES_*` que agregué al integrar los gráficos).

## 4. Plan paso a paso propuesto

Orden por dependencia — de lo más aislado a lo que toca más archivos:

| Paso | Qué resuelve | Alcance |
|---|---|---|
| 1 | `literal visible quemado` en `proveedor_tema_graficos.tsx` | 1 archivo, trivial |
| 2 | Recursos crudos → componente `ImagenUsuario` centralizado | 27 archivos, mecánico |
| 3 | Pruebas vacías → aserciones reales (requiere decidir Vitest/Testing Library primero) | 40 archivos + una instalación nueva |
| 4 | Tipos de página con catálogos quemados → mover uniones a JSON | 21 archivos |
| 5 | Imports de tipos desde `pagina_*` en `datos/` → índices por módulo | 27 archivos |
| 6 | Constantes de presentación → archivo central de tokens | 11+ archivos (se revelan más por capas) |
| 7 | Tailwind arbitrario → sistema de tokens de tamaño/color | Todo el proyecto — el más grande |
| 8 | Rutas quemadas en JSX → enrutador 100% JSON | 26 archivos, cambio de arquitectura |
| 9 | `datos/*.ts` → JSON o servicios | ~60 archivos, cambio de arquitectura |

Los pasos 7, 8 y 9 son decisiones de diseño de sistema, no tareas mecánicas — igual que los pasos 8 y 9 del plan anterior, necesitan acordarse antes de ejecutarse, porque cambian cómo se ve y se estructura toda la capacidad.
