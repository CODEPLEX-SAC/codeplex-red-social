# Plan para que la Red Social pase el Centro de Capacidades

Documento de trabajo para la capacidad `redsocial` (rama `codeplexMaster`, commit `e255400` del 15-09-2026),
contrastado contra el Centro de Capacidades del **12-09-2026** instalado en `C:\Codeplex\ValidadorCapacidades`.

Tiene tres partes y un anexo:

1. **Guía para el agente**: requisitos, dónde vive cada carpeta y reglas de trabajo.
2. **El validador por dentro**: cómo se usa, cómo se leen sus errores, qué mide exactamente y cómo se
   investiga una regla nueva, con las herramientas incluidas.
3. **Plan paso a paso**: qué se cambia, por qué, en qué archivo y línea, y cómo se comprueba.
4. **Fuera de este plan**: decisiones que conviene tomar con quien lidera.
5. **Anexo de evidencia**: cada afirmación de este documento se comprobó con el validador real o
   compilando una copia; aquí están las pruebas.

Todo número de línea se refiere al estado del commit `e255400`. Si el código cambió, se vuelve a buscar
el texto citado antes de editar.

---

## 1. Guía para el agente

### 1.1 Qué se espera de la sesión

La sesión corrige la capacidad **y** deja a la desarrolladora entendiendo cada cambio. Por eso, en
cada paso de la sección 3:

- se lee primero la parte del archivo que se va a tocar;
- se explica en una o dos frases **qué** se cambia y **por qué** antes de hacerlo;
- se aplica el cambio mínimo que describe el paso, sin refactorizar lo que no se pide;
- se valida con el script (sección 2.5) y se muestra el resultado;
- no se avanza al paso siguiente mientras el actual no dé el resultado esperado.

### 1.2 Requisitos de la máquina

| Requisito | Para qué | Cómo se comprueba |
|---|---|---|
| Centro de Capacidades del 12-09-2026 en `C:\Codeplex\ValidadorCapacidades` | Validar y empaquetar | Existe `centro_capacidades.exe` con fecha 12-09-2026 |
| Windows PowerShell 5.1 o superior | Ejecutar `validar_capacidad.ps1` | `$PSVersionTable.PSVersion` |
| Node 20.19 o superior y npm | Montaje local de desarrollo (paso 1) | `node --version` |
| Python 3.10 o superior **y** Go 1.26 (opcional) | Leer reglas del binario (sección 2.8) | `python --version`, `go version` |

Si PowerShell bloquea el script por política de ejecución, se ejecuta con
`powershell -ExecutionPolicy Bypass -File herramientas\validacion\validar_capacidad.ps1`.

### 1.3 Dónde vive cada carpeta

La raíz del repositorio **no** es la capacidad. La capacidad es solo `redsocial/`: es lo único que el
Centro valida y empaqueta. Todo lo demás vive al lado, fuera de ella.

```
codeplex-red-social/                     raíz del repositorio
├── PLAN_VALIDADOR_REDSOCIAL.md          este documento
├── .gitignore                           ignora node_modules, dist y _validacion
├── herramientas/
│   └── validacion/
│       ├── validar_capacidad.ps1        copia limpia + validar o empaquetar + resumen
│       └── leer_reglas_validador.py     lee del binario qué mide cada regla (opcional)
├── _validacion/                         lo crea el script: copias validadas y sus resultados
├── montaje_local/                       (paso 1) arranque de Vite para desarrollar la capacidad
│   ├── index.html · main.tsx · aplicacion.tsx · index.css · public/
├── package.json · package-lock.json     (paso 1) dependencias del montaje local
├── tsconfig.json · tsconfig.app.json · tsconfig.node.json · vite.config.ts · .oxlintrc.json
├── node_modules/ · dist/                (paso 1) quedan fuera de la capacidad y el Centro no los ve
└── redsocial/                           LA CAPACIDAD: solo lo que se entrega
    ├── manifiesto-capacidad.json
    ├── docs/ · recursos/
    └── frontend/  catalogos · componentes · formularios · guia · mensajes · paginas
                   pruebas · rutas · servicios · tablas   (+ datos y tipos, ver sección 4)
```

| Carpeta | Propósito | ¿Se versiona? | ¿Viaja en el paquete? |
|---|---|---|---|
| `redsocial/` | La capacidad | Sí | Sí |
| `herramientas/validacion/` | Scripts de validación | Sí | No |
| `_validacion/` | Copias temporales y resultados | No (`.gitignore`) | No |
| `montaje_local/` y archivos de configuración de la raíz | Levantar la app en desarrollo | Sí | No |
| `node_modules/`, `dist/` | Dependencias y compilado | No (`.gitignore`) | No |
| `C:\Codeplex\ValidadorCapacidades\ejemplos\guia_estructura_capacidad` | Referencia oficial | No aplica | No: **jamás se edita** |

### 1.4 Reglas de trabajo para el agente

1. **Nunca se valida la carpeta de trabajo.** Se valida siempre una copia; el script lo hace solo.
2. **Nunca se edita el ejemplo oficial.** Para probar una regla se copia (sección 2.7).
3. **No se esquiva una regla.** Importar un JSON y anularlo con `void`, aplicar estilos con
   `style.setProperty` o partir un texto para que la expresión regular no lo vea hace pasar la
   herramienta y falla la revisión: Codeplex revisa el código, no solo el resultado del validador.
4. **Un paso, una validación.** El Centro revela errores por capas (sección 2.4): corregir un error
   puede destapar otro que estaba debajo. Eso es normal y no significa que el paso anterior falló.
5. **No se agregan comentarios al código**: es regla del proyecto; lo que haya que explicar va a
   `redsocial/frontend/guia/decisiones_arquitectura_spa.md`.
6. **No se hace commit ni push** sin que la desarrolladora lo indique.
7. **Si no se sabe dónde va un archivo, se pregunta.** No se inventa una carpeta para acomodarlo.

### 1.5 Arranque rápido

```powershell
cd "C:\ruta\a\codeplex-red-social"
powershell -ExecutionPolicy Bypass -File herramientas\validacion\validar_capacidad.ps1
```

Salida esperada hoy, antes de corregir: `Correcto: False`, `Errores: 11` y código de salida 1.

---

## 2. El validador por dentro

### 2.1 Qué es y qué autoridad tiene

El Centro de Capacidades genera, valida y empaqueta capacidades. Codeplex lo declaró **autoridad de
forma**: lo que mide, no se discute, y al revisar miran el código y los cuellos de botella.

- **Empaquetar es más estricto que validar.** Que valide no garantiza que empaquete.
- **Cada versión del Centro puede traer reglas nuevas en el binario**, no solo en el ejemplo. La del
  12-09 agregó, entre otras, las reglas de frontend de la sección 2.6 y las ocho secciones
  obligatorias de los catálogos. Por eso algo que "pasaba" antes puede dejar de pasar.

### 2.2 Cómo se usa

**Con interfaz gráfica**: `centro_capacidades_gui.exe`, opción *Validar capacidad*, eligiendo una
**copia** de la carpeta.

**Por consola**: `centro_capacidades.exe` muestra un menú y lee las respuestas de la entrada estándar.

| Opción | Respuestas, en orden | Nota |
|---|---|---|
| 2 · Validar | `2` · ruta de la capacidad · `n` (sin asesoría IA) · ENTER · `7` | 5 líneas |
| 4 · Empaquetar | `4` · ruta · ENTER (zip automático) · `n` · ENTER · `7` | 6 líneas; el zip queda junto a la carpeta |

Tres trampas comprobadas:

1. **Siempre termina con código 0**, también cuando la capacidad falla. El veredicto está en el JSON:
   `"correcto": true` o `false`.
2. **Si faltan respuestas, entra en bucle** reimprimiendo el menú. Hay que dar exactamente las líneas
   de la tabla.
3. **Una marca BOM al inicio de la entrada rompe la primera respuesta** ("Opción no reconocida"). Pasa
   al redirigir desde .NET en PowerShell; el script usa un archivo sin BOM por eso.

### 2.3 Por qué siempre sobre una copia

La carpeta local de la desarrolladora dio **1188 observaciones**. La misma capacidad, copiada sin
`node_modules` ni `dist`, da **11**. El Centro recorre todo lo que encuentra: a cada archivo de terceros
le aplica nombres en snake_case, comentarios, complejidad y tipos mezclados, y además marca
`artefacto no entregable dentro de la capacidad: dist` o `node_modules`.

Validar una copia limpia:

- quita ese ruido;
- evita que una corrección apresurada se mezcle con el trabajo en curso;
- deja cada ejecución guardada con su entrada y su salida para comparar.

El paso 1 del plan resuelve el problema de raíz: con el andamiaje fuera de `redsocial/`,
`node_modules` y `dist` nacen en la raíz del repositorio y el Centro ni siquiera los ve.

### 2.4 Cómo leer un error

```
ERROR_FRONTERA_3DD_VIOLADA                                ← código
Se encontro una ruptura de frontera entre API, ...        ← motivo: genérico, a veces engañoso
.../manifiesto-capacidad.json | .../frontend/x/y.tsx | texto visible no debe vivir en codigo
                                 └ archivo                └ causa real: esta es la parte que importa
```

- El **motivo** es el mismo para reglas distintas. `ERROR_CONTEXTO_ACTIVO_EXPUESTO`, por ejemplo, dice
  "contexto activo declarado como dato de entrada" también cuando lo que encontró es `localStorage`.
- Las **sugerencias** son genéricas por código; no describen el caso.
- El JSON repite el primer error en `"error"` y en `"errores"`: se cuentan solo los de `"errores"`.

**El Centro revela los errores por capas.** Hay que saberlo para no desanimarse:

| Comportamiento | Consecuencia | Visto en esta capacidad |
|---|---|---|
| Mientras falta la estructura, no revisa el contenido de los catálogos | Al completar carpetas aparecen errores de catálogo nuevos | Tras el paso 2 aparece `falta seccion JSON obligatoria: acciones` |
| En las reglas de frontera informa **una causa por archivo** | Al corregir una, aparece la siguiente del mismo archivo | En `icono.tsx`, tras quitar el HTML inyectado aparece "texto visible" y luego "debe leer desde JSON" |
| Algunos recorridos se detienen en el primer fallo | Un error puede esconder a muchos iguales | "falta ruta frontend" muestra una sola página de 40 |
| Los catálogos se recorren en orden aleatorio | El mismo error cae en un catálogo distinto en cada corrida | `acciones` apareció en `marketplace.json`, `reportes.json` e `indicadores.json` |

### 2.5 El script `validar_capacidad.ps1`

Ubicación: `herramientas/validacion/validar_capacidad.ps1`.

| Parámetro | Valor por defecto | Para qué |
|---|---|---|
| `-Operacion` | `validar` | `validar` o `empaquetar` |
| `-Capacidad` | `..\..\redsocial` | Carpeta raíz de la capacidad (la que tiene el manifiesto) |
| `-Destino` | `..\..\_validacion` | Dónde crea las copias y los resultados |
| `-Centro` | `C:\Codeplex\ValidadorCapacidades\centro_capacidades.exe` | Ejecutable de consola |
| `-MinutosLimite` | `5` | Corta si el Centro no termina |
| `-ConservarAnteriores` | apagado | Sin este interruptor borra las ejecuciones previas de `_validacion` |

Qué hace, en orden:

1. Copia la capacidad a `_validacion\<fecha_hora>\redsocial` con `robocopy`, **sin** `node_modules`,
   `dist`, `.vite` ni `.git`.
2. Escribe `entrada.txt` sin BOM con las respuestas exactas del menú y ejecuta el Centro.
3. Extrae el JSON de la salida y guarda `resultado.json`, `salida_completa.txt` y `resumen.txt`.
4. Agrupa los errores por código, por motivo y en detalle, con la ruta relativa a la capacidad.
5. Termina con **código 0 si `correcto` es verdadero, 1 si no, 2 si no encontró el JSON**: sirve para
   que un agente o un script decidan sin leer la pantalla.

Ejemplos:

```powershell
.\herramientas\validacion\validar_capacidad.ps1
.\herramientas\validacion\validar_capacidad.ps1 -Operacion empaquetar
.\herramientas\validacion\validar_capacidad.ps1 -Capacidad "C:\Codeplex\ValidadorCapacidades\ejemplos\guia_estructura_capacidad"
```

El tercer ejemplo valida una copia del ejemplo oficial: debe dar `Correcto: True`. Sirve para
comprobar que la herramienta y el Centro funcionan antes de culpar al código.

### 2.6 Qué mide cada regla del frontend (Centro del 12-09-2026)

Estas reglas se leyeron del binario y se confirmaron con pruebas (anexo). Casi todas son **búsquedas de
texto con expresiones regulares**, no análisis del código: detectan palabras, no intenciones. Por eso
tienen falsos positivos, y por eso esquivarlas es fácil pero inútil.

**Archivos a los que se aplican:** las reglas de código miran `.ts`, `.tsx`, `.js` y `.jsx` en
cualquier carpeta de la capacidad, **incluidas las pruebas**; los `.md` y `.txt` no se revisan.

| Detalle del error | Qué dispara la regla | Falsos positivos conocidos | Cómo se cumple de verdad |
|---|---|---|---|
| `frontend no debe fabricar sesion/contexto local` | El texto `localStorage` o `sessionStorage` en cualquier parte del archivo | Una preferencia visual (barra colapsada) | Estado de React; Codeplex habilitará una excepción acotada para preferencias de interfaz |
| `componente frontend debe leer textos, rutas y acciones desde JSON` | Un `.tsx` bajo `frontend/` (fuera de `catalogos/` y `mensajes/`) sin una línea `import nombre from '….json'` | Componentes sin texto (un ícono decorativo) | Importar el catálogo y **usar** sus claves |
| `clave JSON inexistente: a.b.c` | Una referencia `alias.seccion.clave` que no existe en el JSON importado | — | Corregir la clave; esta regla atrapa errores de tipeo |
| `texto visible no debe vivir en codigo` | En una misma línea, `>` seguido de letras y luego `<`; o `aria-label`, `title`, `placeholder` o `alt` con texto literal entre comillas | Genéricos de TypeScript (`<T extends X>(p: Record<`) y expresiones regulares con `>…<` | Llevar el texto al catálogo o a los mensajes |
| `frontend no debe declarar estilos embebidos` | `style=`, `<style`, `styled.`, `styled(` o `` css` `` | — | Clases y tokens; variantes finitas en lugar de valores sueltos |
| `frontend no debe inyectar HTML ni leer cookies` | `dangerouslySetInnerHTML`, `.innerHTML` o `document.cookie` | SVG propios de la capacidad | Construir elementos React (paso 7) |
| `alertas y notificaciones deben salir de mensajes globales reutilizables` | Las palabras `toast`, `notificacion(es)` o `alerta(s)` fuera de `frontend/mensajes/` | Un ícono o una entrada de menú llamados "notificaciones" | Textos al catálogo; nombrar íconos por lo que dibujan (`campana`) |
| `boton sin texto o etiqueta reutilizable desde JSON` | Un archivo con `<button` que no contiene `aria-label={…}` ni las palabras `catalogo` o `mensajes` | Una prop llamada `mensajes` lo satisface sin serlo | `aria-label={…}` con un texto que venga del catálogo |
| `campo de formulario sin label reutilizable desde JSON` | `<input`, `<select` o `<textarea` sin `<label` ni `aria-label={` en el archivo | — | Etiqueta con texto del catálogo |
| `componente visual no debe conocer servicios, rutas, paginas ni backend` | Un archivo de `componentes/`, `formularios/` o `tablas/` que importa algo con `servicios/`, `rutas/`, `paginas/` o `backend/` en la ruta | — | La página pasa rutas y acciones por props |
| `pagina no debe consumir servicios directo` | Una página que importa `servicios/` | — | La página compone componentes; el acceso a datos va por la capa que corresponda |
| `llamadas de datos solo deben vivir en frontend/servicios` | `fetch`, `axios` o `XMLHttpRequest` fuera de `servicios/` | — | Mover la llamada al servicio |
| `frontend no debe quemar URL` | `http://`, `https://`, `localhost` o `127.0.0.1` | — | Configuración del caparazón |
| `no use any` | `: any`, `as any` o `<any>` | — | Tipos del contrato |
| `quite salidas de depuracion` | `console.log/debug/warn/error`, `debugger` o `alert(` | — | Quitar |
| `frontend productivo no debe contener datos falsos ni mocks` | Las palabras `mock`, `dummy`, `fake`, `fixture`, `lorem`, `ipsum` o `hardcoded` | — | Ver `datos/` en la sección 4 |
| `funcion generica fuera del lenguaje ubicuo: export function X` | Un nombre de función que contiene `handle`, `fetch`, `load`, `save`, `submit`, `data`, `manager`, `service`, `controller`, `helper`, `util`, `request`, `response`, `tenant` o `user`, sin distinguir mayúsculas | `useRutaActual`, porque "**useR**uta" contiene "user" | Nombres en español: `usarRutaActual` |
| `nombre de archivo fuera de snake_case` | Un archivo de código cuyo nombre no cumple `^[a-z0-9_]+(\.test)?\.[a-z0-9]+$` | — | Renombrar, o sacarlo de la capacidad si no le pertenece |
| `falta ruta frontend con la misma intencion` | Una página `paginas/<sub>/pagina_x.tsx` sin ningún `.ts` o `.tsx` en `rutas/<sub>/` | — | Paso 3 |
| `falta prueba frontend con la misma intencion` | Una página sin una prueba en `pruebas/<sub>/` **cuyo nombre contenga el de la página** | — | Paso 4 |
| `falta prueba frontend` | Ningún `.ts` ni `.tsx` en `frontend/pruebas/` | — | Paso 4 |
| `falta contrato JSON reutilizable` (en `mensajes/capacidades/<cap>/textos.json`) | Falta el archivo | — | Paso 2 |
| `falta contrato JSON reutilizable` (en `catalogos/.../<sub>.json`) | Una carpeta de subcapacidad sin su catálogo del mismo nombre | — | Crear el catálogo |
| `falta seccion JSON obligatoria: X` | El catálogo de una subcapacidad no tiene, o tiene vacía, alguna de: `acciones`, `alertas`, `campos`, `errores`, `mensajes`, `rutas`, `titulos`, `toast` | — | Paso 5 |

Reglas de estructura que conviene conocer:

- Las carpetas oficiales deben existir, aunque estén vacías. **Un `.gitkeep` basta** (comprobado).
- Si se usa una subcarpeta como `rutas/compartido/`, el Centro exige `catalogos/capacidades/<cap>/compartido.json`.
- El Centro **no** marca carpetas fuera de la guía como `datos/` o `tipos/` (comprobado), pero la guía
  oficial no las trae. Ver sección 4.

### 2.7 Cómo investigar una regla: la sonda mínima

Cuando un error no se entiende, no se adivina por el mensaje. Se reproduce con el cambio más pequeño
posible sobre una **copia del ejemplo oficial**, que valida sin errores:

Ejemplo real: averiguar por qué se marca `useRutaActual` y no `useCarrusel`.

```powershell
$sondas = "C:\ruta\a\codeplex-red-social\_validacion\sondas"
$sonda = Join-Path $sondas "nombres_de_hooks"
Remove-Item -Recurse -Force $sonda -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force $sonda | Out-Null
Copy-Item -Recurse "C:\Codeplex\ValidadorCapacidades\ejemplos\guia_estructura_capacidad" $sonda

$archivo = Join-Path $sonda "guia_estructura_capacidad\frontend\rutas\gestion_base\navegacion_gestion_base.ts"
$contenido = @'
export function useRutaActual(): string {
  return window.location.pathname
}

export function useCarrusel(): number {
  return 0
}
'@
[System.IO.File]::WriteAllText($archivo, $contenido, (New-Object System.Text.UTF8Encoding($false)))

.\herramientas\validacion\validar_capacidad.ps1 -Capacidad (Join-Path $sonda "guia_estructura_capacidad") -Destino (Join-Path $sondas "resultados")
```

Resultado: solo `useRutaActual`. La explicación está en la expresión regular de la tabla 2.6.

- Se cambia **una sola cosa** por sonda y se compara con el ejemplo sin cambios.
- El archivo se escribe **sin BOM**: `Set-Content -Encoding utf8` de PowerShell 5.1 agrega BOM.
- Así se obtuvieron todas las filas de la tabla 2.6 y las pruebas del anexo.

### 2.8 Leer la regla directamente del binario (opcional)

`herramientas/validacion/leer_reglas_validador.py` desensambla el paquete de reglas del Centro con
`go tool objdump` y muestra los textos y las expresiones regulares que usa cada función. Requiere
Python y Go en el `PATH`.

```powershell
python herramientas\validacion\leer_reglas_validador.py --patrones
python herramientas\validacion\leer_reglas_validador.py --buscar "falta seccion JSON obligatoria"
python herramientas\validacion\leer_reglas_validador.py --funcion validarCatalogosYMensajesPorModulo
```

- `--patrones` lista cada expresión regular con su nombre (`patronTextoJSXQuemado`, `patronBotonFrontend`…).
- `--buscar` encuentra la función que emite un mensaje y lista, por línea de origen, los textos que
  carga y las funciones que llama.
- `--funcion` hace lo mismo por nombre de función.

Cuando un texto se arma en la pila, el programa puede mostrar dos lecturas posibles ("lectura
alterna"). La correcta es la que forma una palabra; si hay duda, se confirma con una sonda (2.7).
**Lo que dice el binario es una hipótesis; lo que confirma la sonda es un hecho.**

### 2.9 Qué no mide la herramienta y sí mira la revisión

- Importar un JSON y anularlo con `void` hace pasar "debe leer desde JSON" (comprobado).
- Un hook que aplica estilos con `style.setProperty` no dispara "estilos embebidos" (comprobado).
- Carpetas fuera de la guía (`datos/`, `tipos/`) y subcarpetas anidadas (`bloques/`, `interfaz/`).
- `href` a archivos `.html` del prototipo original, interceptados por un enrutador propio.
- Una prueba vacía cumple la regla de pruebas, pero no prueba nada.

---

## 3. Plan paso a paso

Orden recomendado, del que depende que los errores aparezcan de forma predecible:

| Paso | Qué resuelve | Estado de la comprobación |
|---|---|---|
| 0 | Línea base | Script probado |
| 1 | Andamiaje de Vite fuera de la capacidad | Compilación probada: mismos archivos con hash |
| 2 | Estructura oficial y mensajes de la capacidad | Probado con el validador |
| 3 | Rutas por subcapacidad | Probado con el validador |
| 4 | Pruebas por página | Probado con el validador |
| 5 | Ocho secciones de los catálogos | Probado con el validador |
| 6 | Hooks con nombre en español | Probado con el validador |
| 7 | Íconos sin HTML inyectado | Probado con el validador y compilando |
| 8 | Estilos dinámicos sin esquiva | Requiere diseño; se indica cómo comprobarlo |
| 9 | Lectura real de catálogos en lugar de `void` | Requiere diseño; se sabe qué errores aparecerán |
| 10 | Validación final, empaquetado y documentación | — |

Tras los pasos 1 a 7 aplicados sobre una copia, **al validador le quedó un solo error**:
`usar_estilo_dinamico.ts`, que resuelve el paso 8. El paso 9 no cambia el resultado del validador,
porque hoy lo esconden los `void`, pero es el que hace real el cumplimiento.

---

### Paso 0 · Línea base

**Qué.** Validar el estado actual con el script y guardar el resultado.

**Por qué.** Sin línea base no se puede demostrar que un paso mejoró algo ni detectar que empeoró otra
cosa. Además comprueba que la herramienta funciona antes de tocar el código.

**Cómo.**

```powershell
.\herramientas\validacion\validar_capacidad.ps1 -ConservarAnteriores
.\herramientas\validacion\validar_capacidad.ps1 -Capacidad "C:\Codeplex\ValidadorCapacidades\ejemplos\guia_estructura_capacidad" -ConservarAnteriores
```

**Resultado esperado.** La capacidad da 11 errores: 6 de estructura, 3 de frontera y 2 de lenguaje. El
ejemplo da `Correcto: True`.

**Qué se aprende.** Que el número real de errores era 11 y no 1188, y que el ejemplo oficial sirve de
control.

---

### Paso 1 · Sacar el andamiaje de Vite de la capacidad

**Qué.** Mover a la raíz del repositorio todo lo que sirve para **arrancar** la aplicación en desarrollo
y dejar en `redsocial/frontend/` solo el código de la capacidad.

**Por qué.**

- El arranque de React (`main.tsx`, `aplicacion.tsx`, `index.html`) es del **proyecto web de
  integración**, que es de la Plataforma. La capacidad no arranca: el caparazón la monta.
- `vite.config.ts` es el error 8 (`nombre de archivo fuera de snake_case`). Es solo el síntoma visible:
  `package.json`, `tsconfig*.json` e `index.html` no se marcan por su nombre, pero tampoco pertenecen a
  la capacidad.
- Con `package.json` dentro de `frontend/`, `npm install` crea `frontend/node_modules`, que es de donde
  salieron las 1188 observaciones. Con el andamiaje en la raíz, `node_modules` y `dist` quedan fuera y
  el Centro no los ve nunca más.
- Hoy **`npm run build` falla**: `tsconfig.node.json` apunta a `../../vite.config.ts`, un archivo que
  ya no está ahí. El paso lo corrige.
- De paso desaparecen dos de los 19 `void catalogo`: los de `main.tsx` y `aplicacion.tsx`.

**Dónde.**

| Archivo actual | Destino | Cambio de contenido |
|---|---|---|
| `redsocial/frontend/package.json` | `package.json` | Ninguno |
| `redsocial/frontend/package-lock.json` | `package-lock.json` | Ninguno |
| `redsocial/frontend/tsconfig.json` | `tsconfig.json` | Ninguno |
| `redsocial/frontend/tsconfig.app.json` | `tsconfig.app.json` | L19 `paths` y L29 `include` |
| `redsocial/frontend/tsconfig.node.json` | `tsconfig.node.json` | L25 `include` |
| `redsocial/frontend/vite.config.ts` | `vite.config.ts` | Reescrito (abajo) |
| `redsocial/frontend/.oxlintrc.json` | `.oxlintrc.json` | Ninguno |
| `redsocial/frontend/index.html` | `montaje_local/index.html` | Ninguno (L11 ya carga `/main.tsx`) |
| `redsocial/frontend/main.tsx` | `montaje_local/main.tsx` | Quitar L5 (import del catálogo) y L7 (`void`) |
| `redsocial/frontend/aplicacion.tsx` | `montaje_local/aplicacion.tsx` | L1-L2 a alias `@/`; quitar L4 y L6 |
| `redsocial/frontend/index.css` | `montaje_local/index.css` | Tras L1, agregar `@source` |
| `redsocial/frontend/public/` | `montaje_local/public/` | Ninguno |
| `redsocial/frontend/README.md` | `montaje_local/README.md` | Ninguno |

**Cómo.**

1. Borrar `redsocial/frontend/node_modules` si existe; se reinstala en la raíz.
2. Mover los archivos según la tabla.
3. `vite.config.ts` en la raíz queda así: la raíz de Vite pasa a `montaje_local`, el alias `@` apunta
   a la capacidad y `server.fs.allow` permite servir archivos fuera de `montaje_local`.

```ts
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const raiz = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: path.resolve(raiz, 'montaje_local'),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(raiz, 'redsocial/frontend'),
    },
  },
  cacheDir: path.resolve(raiz, 'node_modules/.vite'),
  server: {
    port: 5173,
    fs: { allow: [raiz] },
  },
  build: {
    outDir: path.resolve(raiz, 'dist'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 800,
  },
})
```

4. `tsconfig.app.json`: `"paths": { "@/*": ["./redsocial/frontend/*"] }` y
   `"include": ["montaje_local", "redsocial/frontend"]`.
5. `tsconfig.node.json`: `"include": ["vite.config.ts"]`.
6. `montaje_local/aplicacion.tsx`: las líneas 1 y 2 importan desde
   `@/rutas/compartido/usar_interceptar_enlaces` y `@/rutas/compartido/usar_pagina_actual`; se borran la
   importación del catálogo (L4) y el `void` (L6).
7. `montaje_local/main.tsx`: se borran la importación del catálogo (L5) y el `void` (L7).
8. `montaje_local/index.css`: debajo de `@import "tailwindcss";` se agrega `@source "../redsocial/frontend";`.
   Sin esa línea, Tailwind solo buscaría clases dentro de `montaje_local` y la app quedaría sin estilos.
9. En la raíz: `npm ci`, luego `npm run build` y `npm run dev` para comprobar a ojo.

**Por qué el enrutador se queda.** `rutas/compartido/` **no** se mueve: siete páginas importan de ahí
`navegar`, `ARCHIVO_A_RUTA` o `RUTA_INICIAL`:

- `paginas/actividad/pagina_actividad_colaboradores.tsx:17`
- `paginas/colaboradores/pagina_invitar_colaborador_informacion.tsx:5-6`
- `paginas/colaboradores/pagina_invitar_colaborador_resumen.tsx:4-5`
- `paginas/colaboradores/pagina_invitar_colaborador_rol_permisos.tsx:5-6`
- `paginas/colaboradores/pagina_invitar_colaborador_vigencia.tsx:4-5`
- `paginas/compartido/pagina_no_encontrada.tsx:2-3`

Sacarlo exigiría tocar esas páginas; queda en la sección 4.

**Verificación.**

- `npx tsc -b` sin errores (antes fallaba) y `npx vite build` genera exactamente los mismos archivos
  que antes del cambio (mismos nombres con hash, 74,27 kB de CSS y 739,68 kB de JS). **Comprobado.**
- El script ya no muestra el error de `vite.config.ts`.
- `redsocial/frontend/` queda solo con carpetas.

**Qué se aprende.** La capacidad es un módulo que otro monta; lo que la arranca vive fuera. Cuando la
herramienta marca un solo archivo, conviene preguntar qué familia de archivos representa.

---

### Paso 2 · Restituir la estructura oficial y los mensajes de la capacidad

**Qué.**

- Crear `redsocial/frontend/formularios/.gitkeep`, `redsocial/frontend/servicios/.gitkeep` y
  `redsocial/frontend/tablas/.gitkeep`.
- Crear `redsocial/frontend/mensajes/capacidades/redsocial/textos.json` y `errores.json` con los textos
  **de la red social**.
- Dejar `redsocial/frontend/mensajes/globales/` como en el ejemplo oficial: esos mensajes son de la
  Plataforma.

**Por qué.**

- El commit `e255400` borró los archivos genéricos del ejemplo que había en esas carpetas:
  `formulario_entidad_base.tsx`, `tabla_entidades_base.tsx`, `servicio_entidades_base.ts`,
  `rutas_gestion_base.ts`, dos pruebas y los mensajes de capacidad. **Borrarlos estaba bien**: Codeplex
  prohíbe frontend genérico y archivos idénticos al ejemplo. Pero **git no guarda carpetas vacías**, y
  así desaparecieron del repositorio. Son los errores 1, 3 y 4.
- `mensajes/capacidades/redsocial/` no existe: son los errores 2 y 9 (`falta contrato JSON reutilizable`).
- Los 36 textos de la red social están hoy en `mensajes/globales/textos.json`, que es de la Plataforma.
  El ejemplo oficial deja ahí solo `TITULO_CAPACIDAD`.

**Dónde.**

- `redsocial/frontend/mensajes/globales/textos.json`: 36 claves (`VER_TODOS`, `CERRAR`,
  `CONTACTOS_EN_LINEA`, `AMIGOS`, `MENSAJES`…) que pasan a `mensajes/capacidades/redsocial/textos.json`.
- 36 archivos importan `mensajes/globales/textos.json` y cambian la ruta de esa importación:

```
componentes/actividad/bloques/tarjeta_actividad.tsx         componentes/amigos/bloques/encabezado_amigos.tsx
componentes/amigos/bloques/panel_lateral_amigos.tsx         componentes/compartido/bloques/columna_publicidad.tsx
componentes/compartido/bloques/contactos_panel.tsx          componentes/compartido/bloques/eventos_proximos_panel.tsx
componentes/compartido/bloques/grupos_recomendados_panel.tsx componentes/compartido/navegacion/barra_lateral.tsx
componentes/compartido/navegacion/barra_superior.tsx        componentes/mensajeria/bloques/panel_conversacion.tsx
componentes/mensajeria/bloques/panel_lateral_mensajeria.tsx datos/compartido/navegacion.ts
paginas/actividad/pagina_actividad_colaboradores.tsx        paginas/actividad/pagina_actividad_modulos.tsx
paginas/actividad/pagina_actividad_sistema.tsx              paginas/amigos/pagina_amigos_listas.tsx
paginas/amigos/pagina_amigos_sugerencias.tsx                paginas/amigos/pagina_amigos_todos.tsx
paginas/colaboradores/pagina_colaboradores.tsx              paginas/colaboradores/pagina_invitar_colaborador_informacion.tsx
paginas/colaboradores/pagina_invitar_colaborador_resumen.tsx paginas/colaboradores/pagina_invitar_colaborador_rol_permisos.tsx
paginas/colaboradores/pagina_invitar_colaborador_vigencia.tsx paginas/compartido/pagina_no_encontrada.tsx
paginas/dashboard/pagina_dashboard.tsx                      paginas/estadisticas/pagina_estadisticas_todos_modulos.tsx
paginas/eventos/pagina_eventos_calendario.tsx               paginas/eventos/pagina_eventos_invitaciones.tsx
paginas/eventos/pagina_eventos_mis_eventos.tsx              paginas/eventos/pagina_eventos_para_ti.tsx
paginas/eventos/pagina_eventos_populares.tsx                paginas/eventos/pagina_eventos_proximos.tsx
paginas/grupos/pagina_grupos_descubrir.tsx                  paginas/grupos/pagina_grupos_mis_grupos.tsx
paginas/inicio/pagina_inicio.tsx                            paginas/marketplace/pagina_marketplace.tsx
```

**Cómo.**

1. Crear los tres `.gitkeep` (archivos vacíos).
2. Copiar `mensajes/globales/textos.json` a `mensajes/capacidades/redsocial/textos.json`.
3. Crear `mensajes/capacidades/redsocial/errores.json` con los errores propios de la red social (al
   menos uno; por ejemplo, `ERROR_CARGA_RED_SOCIAL`).
4. Dejar `mensajes/globales/textos.json` y `errores.json` iguales a los del ejemplo oficial. Es la única
   excepción legítima a "ningún archivo idéntico al ejemplo".
5. En los 36 archivos, cambiar `mensajes/globales/textos.json` por
   `mensajes/capacidades/redsocial/textos.json`. Conviene renombrar también el alias `mensajesGlobales`
   a `textosRedSocial`, porque el nombre debe decir la verdad.
6. `npx tsc -b` para confirmar que no quedó ninguna importación rota.

**Verificación.** Desaparecen los errores 1 a 4 y 9. Comprobado sobre una copia: carpetas con solo
`.gitkeep` validan, y la falta de `textos.json` produce exactamente el error 9.

**Qué se aprende.** Git no versiona carpetas vacías: una carpeta obligatoria sin archivos se pierde al
clonar. Y los mensajes globales son de la Plataforma, no de la capacidad.

---

### Paso 3 · Rutas por subcapacidad

**Qué.** Crear un archivo de rutas en cada subcapacidad que tiene páginas.

**Por qué.** Es el error 11. El Centro recorre `paginas/` y exige, para cada `paginas/<sub>/`, al menos
un `.ts` o `.tsx` en `rutas/<sub>/`. Hoy todas las rutas están en `rutas/compartido/rutas.tsx`. El
recorrido se corta en la primera página que falla, así que el error muestra una página, pero afecta a
las 13 subcapacidades.

Comprobado con sondas: el Centro **no** mira el nombre ni el contenido del archivo de rutas, basta que
exista. Aun así, la guía oficial le da un contenido con sentido: exporta las rutas del catálogo de su
subcapacidad. Un archivo vacío pasaría la herramienta y no serviría a nadie.

**Dónde.** Trece archivos nuevos:

| Subcapacidad | Archivo nuevo | Catálogo que exporta |
|---|---|---|
| actividad | `rutas/actividad/rutas_actividad.ts` | `catalogos/capacidades/redsocial/actividad.json` |
| amigos | `rutas/amigos/rutas_amigos.ts` | `amigos.json` |
| colaboradores | `rutas/colaboradores/rutas_colaboradores.ts` | `colaboradores.json` |
| compartido | `rutas/compartido/rutas_compartido.ts` | `compartido.json` |
| dashboard | `rutas/dashboard/rutas_dashboard.ts` | `dashboard.json` |
| estadisticas | `rutas/estadisticas/rutas_estadisticas.ts` | `estadisticas.json` |
| eventos | `rutas/eventos/rutas_eventos.ts` | `eventos.json` |
| grupos | `rutas/grupos/rutas_grupos.ts` | `grupos.json` |
| indicadores | `rutas/indicadores/rutas_indicadores.ts` | `indicadores.json` |
| inicio | `rutas/inicio/rutas_inicio.ts` | `inicio.json` |
| marketplace | `rutas/marketplace/rutas_marketplace.ts` | `marketplace.json` |
| mensajeria | `rutas/mensajeria/rutas_mensajeria.ts` | `mensajeria.json` |
| reportes | `rutas/reportes/rutas_reportes.ts` | `reportes.json` |

`rutas/compartido/` ya existe (contiene el enrutador); ahí se agrega `rutas_compartido.ts`.

**Cómo.** Mismo patrón que el ejemplo oficial (`rutas/gestion_base/rutas_gestion_base.ts`):

```ts
import catalogoActividad from '../../catalogos/capacidades/redsocial/actividad.json'

export const rutasActividad = catalogoActividad.rutas
```

`rutas/compartido/rutas.tsx` (L56-L108, la tabla `RUTAS`) puede seguir como está en este paso. Si más
adelante se reparte por subcapacidad, cada `rutas_<sub>.ts` pasaría a exportar sus entradas y
`rutas.tsx` las uniría.

**Verificación.** El script deja de mostrar `falta ruta frontend con la misma intencion`. Comprobado.

**Qué se aprende.** Cuando un error menciona un solo archivo, hay que preguntarse si el recorrido se
detuvo ahí. Y cumplir la forma no basta: el archivo debe servir.

---

### Paso 4 · Una prueba por página

**Qué.** Crear en `pruebas/<sub>/` una prueba por cada página, con el mismo nombre de la página más
`.test.tsx`.

**Por qué.**

- Es el error 10 (`falta prueba frontend`): `pruebas/` no tiene ningún archivo de prueba. El commit
  `e255400` borró las dos que había (eran del ejemplo genérico).
- Después aparecería `falta prueba frontend con la misma intencion`: el Centro exige, por página, una
  prueba en `pruebas/<sub>/` **cuyo nombre contenga el de la página**. Comprobado: al renombrar la
  prueba del ejemplo sin el nombre de la página, el error aparece.

**Dónde.** 40 archivos nuevos, uno por página:

| Carpeta | Pruebas a crear |
|---|---|
| `pruebas/actividad/` | `pagina_actividad_colaboradores` · `_grupos` · `_menciones` · `_modulos` · `_publicaciones` · `_sistema` · `_todas` |
| `pruebas/amigos/` | `pagina_amigos_listas` · `_solicitudes` · `_sugerencias` · `_todos` |
| `pruebas/colaboradores/` | `pagina_colaborador_perfil` · `pagina_colaboradores` · `pagina_invitar_colaborador_informacion` · `_resumen` · `_rol_permisos` · `_vigencia` |
| `pruebas/compartido/` | `pagina_no_encontrada` |
| `pruebas/dashboard/` | `pagina_dashboard` |
| `pruebas/estadisticas/` | `pagina_estadisticas_modulo` · `pagina_estadisticas_todos_modulos` |
| `pruebas/eventos/` | `pagina_eventos_calendario` · `_invitaciones` · `_mis_eventos` · `_para_ti` · `_populares` · `_proximos` |
| `pruebas/grupos/` | `pagina_grupos_descubrir` · `_invitaciones` · `_mis_grupos` |
| `pruebas/indicadores/` | `pagina_indicadores_clave` |
| `pruebas/inicio/` | `pagina_inicio` |
| `pruebas/marketplace/` | `pagina_marketplace` |
| `pruebas/mensajeria/` | `pagina_mensajes_favoritos` · `_no_leidos` · `_todos` · `_videollamada_en_curso` · `_videollamada_iniciar` · `_videollamadas` |
| `pruebas/reportes/` | `pagina_reportes` |

Cada nombre lleva `.test.tsx`: por ejemplo, `pruebas/actividad/pagina_actividad_colaboradores.test.tsx`.

**Cómo.** Forma mínima, igual a la del ejemplo oficial:

```tsx
describe('PaginaActividadColaboradores', () => {
  it('renderiza la pagina', () => {})
})
```

Esa forma cumple la regla, pero **no prueba nada**. Lo recomendable es instalar Vitest y Testing Library
en el montaje local (paso 1) y hacer que cada prueba renderice la página y compruebe al menos un título
que venga del catálogo. Queda en la sección 4 para decidirlo; la estructura de este paso sirve para ambos
casos.

**Verificación.** Desaparece el error 10 y no aparece "con la misma intención". Comprobado con las 40
pruebas generadas en una copia.

**Qué se aprende.** La regla ata cada página a su prueba por el nombre del archivo; por eso el nombre
del archivo probado forma parte del nombre de la prueba.

---

### Paso 5 · Las ocho secciones de cada catálogo

**Qué.** Completar en los 13 catálogos de `redsocial/frontend/catalogos/capacidades/redsocial/` las
secciones que exige el Centro del 12-09, con contenido real de cada subcapacidad.

**Por qué.** Este error **no aparece hoy** porque lo tapan los errores de estructura (sección 2.4). Al
terminar los pasos 2 a 4 aparece `falta seccion JSON obligatoria: acciones` en un catálogo distinto en
cada corrida. El Centro exige que existan y **no estén vacías** estas ocho secciones: `acciones`,
`alertas`, `campos`, `errores`, `mensajes`, `rutas`, `titulos` y `toast`. Se leyó del binario y se
confirmó: quitar `toast` del catálogo del ejemplo produce `falta seccion JSON obligatoria: toast`.

**Dónde.** Estado actual de cada catálogo (`acciones` está en la línea 2 de todos):

| Catálogo | acciones | alertas | campos | errores | mensajes | rutas | titulos | toast |
|---|---|---|---|---|---|---|---|---|
| actividad | vacía | falta | falta | falta | falta | ok | ok | falta |
| amigos | vacía | falta | falta | falta | falta | ok | ok | falta |
| colaboradores | vacía | falta | falta | falta | falta | ok | ok | falta |
| compartido | vacía | falta | falta | falta | falta | **vacía** | **vacía** | falta |
| dashboard | vacía | falta | falta | falta | falta | ok | ok | falta |
| estadisticas | vacía | falta | falta | falta | falta | ok | ok | falta |
| eventos | vacía | falta | falta | falta | falta | ok | ok | falta |
| grupos | vacía | falta | falta | falta | falta | ok | ok | falta |
| indicadores | vacía | falta | falta | falta | falta | ok | ok | falta |
| inicio | vacía | falta | falta | falta | falta | ok | ok | falta |
| marketplace | vacía | falta | falta | falta | falta | ok | ok | falta |
| mensajeria | vacía | falta | falta | falta | falta | ok | ok | falta |
| reportes | vacía | falta | falta | falta | falta | ok | ok | falta |

Además, `redsocial/docs/arquitectura/menu_redsocial.json` (L4-L15) declara las 12 entradas del menú sin
`acciones`. En el ejemplo oficial, el menú y el catálogo declaran las mismas acciones de la subcapacidad.

**Cómo.** Forma del ejemplo oficial del 12-09 (`gestion_base.json`), que sirve de referencia de
**forma**, no de contenido:

```json
{
  "acciones": ["listar", "registrar", "ver_detalle", "actualizar"],
  "alertas": { "confirmar_registro": "Revise los datos antes de registrar." },
  "campos": { "nombre": "Nombre" },
  "contexto_requerido": ["empresa_id", "sucursal_id", "periodo_id", "usuario_id"],
  "errores": { "carga_listado": "No fue posible cargar el listado." },
  "mensajes": { "sin_datos": "No hay entidades para mostrar." },
  "rutas": { "listado": "/guia_estructura_capacidad" },
  "titulo_menu": "Guia Estructura Capacidad",
  "titulos": { "listado": "Listado de entidades base" },
  "toast": { "registrado": "Entidad registrada." }
}
```

Para cada subcapacidad:

1. `acciones`: lo que el usuario puede hacer ahí, en verbos del negocio (en actividad: `listar`,
   `filtrar`, `ver_detalle`…). Las mismas acciones se agregan a su entrada en `menu_redsocial.json`.
2. `alertas`, `errores`, `mensajes` y `toast`: los textos de confirmación, error, estado vacío y aviso
   que la pantalla ya muestra. Conviene buscarlos hoy en el código antes de inventarlos.
3. `campos`: las etiquetas de los campos de búsqueda, filtros y formularios de esa pantalla.
4. En `compartido.json`, llenar `rutas` (por ejemplo, la ruta de la página no encontrada) y `titulos`.

**Verificación.** Comprobado sobre una copia: con las ocho secciones llenas, el error de catálogos
desaparece. Como el orden es aleatorio, se valida hasta que ningún catálogo aparezca.

**Qué se aprende.** Un error puede estar escondido detrás de otro. Y una sección vacía cuenta como
faltante.

---

### Paso 6 · Hooks con nombre en español

**Qué.** Renombrar `useRutaActual` a `usarRutaActual`, `useCarrusel` a `usarCarrusel` y
`useEstiloDinamico` a `usarEstiloDinamico` (este último desaparece en el paso 8).

**Por qué.**

- Es el error 7. La regla busca `user` sin distinguir mayúsculas, y "**useR**utaActual" lo contiene:
  es un falso positivo de la expresión regular. Comprobado: `useCarrusel` y `usarRutaVigente` no se marcan.
- Aun así, el cambio es correcto: el código de la capacidad va en español, y el nombre del archivo ya
  lo dice (`usar_carrusel.ts`). La guía de Codeplex usa `usar…`.
- Efecto que conviene saber: la regla `react/rules-of-hooks` de oxlint reconoce hooks por el prefijo
  `use`. Con `usar…` deja de vigilarlos; el cuidado de llamar hooks siempre en el cuerpo del componente
  queda en quien escribe.

**Dónde.**

| Nombre | Definición | Usos |
|---|---|---|
| `useRutaActual` | `rutas/compartido/navegacion.ts:35` | `rutas/compartido/usar_pagina_actual.ts:2` y `:7` |
| `useCarrusel` | `componentes/compartido/usar_carrusel.ts:3` | `componentes/actividad/bloques/pestanas_actividad.tsx:2, 18` · `paginas/estadisticas/pagina_estadisticas_todos_modulos.tsx:9, 81` · `paginas/eventos/pagina_eventos_invitaciones.tsx:6, 45` · `paginas/indicadores/pagina_indicadores_clave.tsx:8, 89` · `paginas/inicio/pagina_inicio.tsx:6, 18` · `paginas/marketplace/pagina_marketplace.tsx:8, 24` · `paginas/mensajeria/pagina_mensajes_videollamadas.tsx:7, 14` · `paginas/reportes/pagina_reportes.tsx:7, 79` |

**Cómo.** Reemplazo exacto del identificador en esos archivos y `npx tsc -b`.

**Verificación.** Desaparece el error 7. Comprobado.

**Qué se aprende.** Un falso positivo no se discute con la herramienta: si la corrección además es
buena práctica, se hace.

---

### Paso 7 · Íconos sin HTML inyectado

**Qué.** Reescribir `componentes/compartido/icono.tsx` para que construya elementos React a partir del
SVG en lugar de inyectar el marcado, y llevar los alias de íconos al catálogo.

**Por qué.**

- Es el error 5: `icono.tsx:31` usa `dangerouslySetInnerHTML={{ __html: contenido ?? '' }}`.
- Al quitarlo aparece el siguiente error del mismo archivo: "texto visible" por la expresión regular de
  `icono.tsx:14`, `/<svg[^>]*>([\s\S]*)<\/svg>/`, que contiene `>…<` con letras.
- Al quitar también esa línea aparece el tercero: "debe leer desde JSON", porque el componente no
  importa ningún JSON.
- La solución honesta a los tres: leer el SVG con `DOMParser`, crear solo etiquetas permitidas con
  `createElement` y tomar los alias de íconos del catálogo. Los alias (`campana`, `mensajes → mensaje`…)
  son **datos**, no lógica: pertenecen al catálogo tanto como los títulos.

**Dónde.**

| Archivo | Líneas | Cambio |
|---|---|---|
| `componentes/compartido/icono.tsx` | L1 (import de `MAPA_ICONOS`), L11-L16 (lectura con regex), L23 (uso del mapa), L31 (inyección) | Reescrito |
| `datos/compartido/iconos.ts` | L20-L139 (`MAPA_ICONOS`, 107 alias) | Se retira el mapa; `NOMBRES_ICONOS` (L1-L18) queda |
| `catalogos/capacidades/redsocial/compartido.json` | nueva sección `iconos` | Recibe los 107 alias |
| `tipos/compartido/icono.ts` | L1 y L4 | `IconName` se deriva del catálogo |

**Cómo.**

`componentes/compartido/icono.tsx`:

```tsx
import { createElement } from 'react'
import type { ReactNode } from 'react'
import { NOMBRES_ICONOS } from '../../datos/compartido/iconos'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import type { IconProps } from '@/tipos/compartido/icono_props'
import type { NombreIcono } from '@/tipos/compartido/icono'

const ARCHIVOS_SVG = import.meta.glob('../../../recursos/iconos/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const ETIQUETAS_PERMITIDAS = new Set(['path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse', 'g'])

const LECTOR_SVG = new DOMParser()

function nombreDePropiedad(atributo: string): string {
  return atributo.replace(/-([a-z])/g, (_coincidencia, letra: string) => letra.toUpperCase())
}

function convertirNodo(nodo: Element, indice: number): ReactNode {
  if (!ETIQUETAS_PERMITIDAS.has(nodo.tagName)) return null
  const propiedades = Object.fromEntries(
    Array.from(nodo.attributes).map((atributo) => [nombreDePropiedad(atributo.name), atributo.value]),
  )
  return createElement(nodo.tagName, { ...propiedades, key: indice }, ...Array.from(nodo.children).map(convertirNodo))
}

function elementosDelArchivo(nombre: NombreIcono): ReactNode[] {
  const entrada = Object.entries(ARCHIVOS_SVG).find(([ruta]) => ruta.endsWith(`/${nombre}.svg`))
  const documento = LECTOR_SVG.parseFromString(entrada?.[1] ?? '<svg/>', 'image/svg+xml')
  return Array.from(documento.documentElement.children).map(convertirNodo)
}

const ICONOS = Object.fromEntries(
  NOMBRES_ICONOS.map((nombre) => [nombre, elementosDelArchivo(nombre)]),
)

export function Icono({ name, className }: IconProps) {
  const clave = (catalogoCompartido.iconos as Record<string, string>)[name] ?? name
  const elementos = ICONOS[clave]

  return (
    <svg className={className ? `icono ${className}` : 'icono'} viewBox="0 0 24 24" aria-hidden="true">
      {elementos}
    </svg>
  )
}
```

Por qué es seguro: solo se crean etiquetas de dibujo de una lista cerrada; un `<script>` o un
`<foreignObject>` dentro de un SVG se ignoran. El resultado visual es el mismo que hoy: igual que antes,
se descartan los atributos de la raíz del SVG (`fill`, `stroke`) y los aporta la clase `.icono`
(`index.css:85`, que tras el paso 1 vive en `montaje_local/index.css`).

`tipos/compartido/icono.ts`:

```ts
import type { NOMBRES_ICONOS } from '../../datos/compartido/iconos'
import type catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

export type NombreIcono = (typeof NOMBRES_ICONOS)[number]
export type IconName = keyof typeof catalogoCompartido.iconos | NombreIcono
```

En `compartido.json` se agrega la sección `"iconos"` con los mismos 107 pares de `MAPA_ICONOS`, en el
mismo orden, y se borra `MAPA_ICONOS` de `datos/compartido/iconos.ts`.

Cuidado con la expresión regular de "texto visible": no conviene escribir en una sola línea algo como
`Record<A, B> = Object.fromEntries(...) as Record<A, B>`. Por eso `ICONOS` está partido en tres líneas.

**Verificación.**

- `npx tsc -b` y `npx vite build` pasan. **Comprobado.**
- El script ya no muestra errores en `icono.tsx`. **Comprobado.**
- Revisar a ojo en `npm run dev` que los íconos se vean igual (barra lateral, pestañas, botones). **Pendiente
  de hacer en la máquina de desarrollo.**

**Qué se aprende.** Una regla de seguridad no se esquiva: se reemplaza lo inseguro por algo seguro. Y la
cadena de errores de un mismo archivo se recorre hasta el final.

---

### Paso 8 · Estilos dinámicos sin esquiva

**Qué.** Eliminar `componentes/compartido/usar_estilo_dinamico.ts` y resolver sus cinco usos con clases.

**Por qué.**

- Es el error 6, y es un **falso positivo**: `usar_estilo_dinamico.ts:6`,
  `<T extends HTMLElement>(propiedades: Record<string, string | undefined>)`, calza con la expresión de
  "texto visible".
- Pero el archivo tiene un problema real que el Centro no ve: aplica estilos con
  `elemento.style.setProperty` (L14). La regla de estilos embebidos busca `style=`, así que este hook
  la rodea. Comprobado: `style=` en un componente se marca; `style.setProperty` en un hook, no.
- Además importa el catálogo solo para anularlo (L2 y L4).
- Codeplex pide variantes finitas con clases, no valores sueltos en tiempo de ejecución.

**Dónde.**

| Componente | Hook en | Qué fija hoy | Usos |
|---|---|---|---|
| `componentes/compartido/interfaz/avatar_imagen.tsx` | L1, L7 | `background-image: url(src)` | 43 usos en 20 archivos |
| `componentes/compartido/interfaz/superficie_color.tsx` | L2, L18 | `background: color` | 30 usos en 15 archivos |
| `componentes/compartido/interfaz/texto_color.tsx` | L2, L18 | `color` | 6 usos en 5 archivos |
| `componentes/compartido/interfaz/insignia.tsx` | L1, L13 | colores de la insignia | `pagina_actividad_grupos.tsx:74` · `pagina_dashboard.tsx:59` · `pagina_estadisticas_todos_modulos.tsx:54` · `pagina_indicadores_clave.tsx:47` |
| `componentes/compartido/interfaz/medida_dinamica.tsx` | L2, L22 | `width`, `height`, `background` | `pagina_dashboard.tsx:250, 268` · `pagina_estadisticas_todos_modulos.tsx:227, 321` · `pagina_indicadores_clave.tsx:202` · `pagina_reportes.tsx:39, 63, 72` |

Para ver todos los usos: `grep -rn "<AvatarImagen" redsocial/frontend` (y lo mismo con los otros nombres).

**Cómo.** Estos cambios necesitan decisión de diseño; se proponen patrones, no un reemplazo mecánico:

1. **`AvatarImagen`** → `<img src={src} alt="" className="object-cover …" />`. Un `<img>` hace lo mismo
   que el fondo, sin estilos. `alt=""` es correcto solo si la imagen es decorativa; si no lo es, el
   texto alternativo viene del catálogo (`alt={catalogo…}`), porque la regla marca `alt="texto"`.
2. **`SuperficieColor`, `TextoColor`, `Insignia`** → los datos dejan de traer colores hexadecimales
   y traen un **nombre de variante** (`azul`, `verde`, `morado`, `naranja`…). El componente traduce la
   variante a una clase fija con los tokens que `index.css` ya define (`--color-azul-categoria`,
   `--color-verde-categoria`…). Las clases deben escribirse completas en el código
   (`'bg-azul-categoria'`) para que Tailwind las genere.
3. **`MedidaDinamica`** → para barras de progreso, `<progress value={…} max={100} />` o `<meter>` con
   estilo en CSS; para anchos, un mapa de pasos fijos (`'w-[10%]'`, `'w-[20%]'`…).
4. Borrar `usar_estilo_dinamico.ts`.

**Verificación.** El script no muestra errores de estilos; `npx tsc -b` pasa; comparación visual de
dashboard, estadísticas, indicadores, reportes, eventos y amigos en `npm run dev`.

**Qué se aprende.** Un error puede ser un falso positivo **y**, a la vez, señalar un archivo que esconde
un problema real. La pregunta no es "¿cómo hago que pase?", sino "¿qué intenta impedir la regla?".

---

### Paso 9 · Leer de verdad los catálogos

**Qué.** Quitar los `void catalogo…` que quedan y hacer que cada componente lea los textos que muestra.

**Por qué.** Hoy estos archivos importan un JSON solo para satisfacer "debe leer desde JSON" y lo anulan
en la línea siguiente. Pasa la herramienta, pero Codeplex revisa el código, y es justo lo que la regla
quiere impedir. Comprobado sobre una copia: al quitar los `void`, el Centro marca estos 16 archivos.
Esa es la deuda real que estaba escondida.

**Dónde.** Después del paso 1 quedan 17 `void` dentro de la capacidad; uno se va con el paso 8. Estos 16:

| Archivo | Import | `void` | Regla que aparecerá |
|---|---|---|---|
| `componentes/actividad/bloques/fila_actividad_grupo.tsx` | L4 | L6 | debe leer desde JSON |
| `componentes/compartido/bloques/bloque_anuncio.tsx` | L3 | L5 | debe leer desde JSON |
| `componentes/compartido/estructura/estructura_app.tsx` | L5 | L7 | debe leer desde JSON |
| `componentes/compartido/estructura/estructura_tres_columnas.tsx` | L2 | L4 | debe leer desde JSON |
| `componentes/compartido/interfaz/avatar_imagen.tsx` | L2 | L4 | debe leer desde JSON |
| `componentes/compartido/interfaz/boton.tsx` | L2 | L4 | botón sin texto o etiqueta |
| `componentes/compartido/interfaz/boton_icono.tsx` | L3 | L5 | botón sin texto o etiqueta |
| `componentes/compartido/interfaz/campo_busqueda.tsx` | L3 | L5 | debe leer desde JSON |
| `componentes/compartido/interfaz/insignia.tsx` | L3 | L5 | debe leer desde JSON |
| `componentes/compartido/interfaz/medida_dinamica.tsx` | L3 | L5 | debe leer desde JSON |
| `componentes/compartido/interfaz/selector.tsx` | L3 | L5 | debe leer desde JSON |
| `componentes/compartido/interfaz/superficie_color.tsx` | L3 | L5 | debe leer desde JSON |
| `componentes/compartido/interfaz/tarjeta_indicador.tsx` | L3 | L5 | debe leer desde JSON |
| `componentes/compartido/interfaz/texto_color.tsx` | L3 | L5 | debe leer desde JSON |
| `componentes/compartido/navegacion/elemento_navegacion.tsx` | L3 | L5 | debe leer desde JSON |
| `componentes/mensajeria/bloques/pestanas_mensajes.tsx` | L2 | L4 | debe leer desde JSON |

Los números de línea de la tabla son los de antes de los pasos 7 y 8; si esos pasos tocaron el archivo,
se busca el texto `void catalogo`.

**Cómo.** Dos casos:

1. **Piezas con texto propio** (`fila_actividad_grupo`, `bloque_anuncio`, `estructura_app`,
   `estructura_tres_columnas`, `elemento_navegacion`, `pestanas_mensajes`, `tarjeta_indicador`): se
   buscan los textos, etiquetas `aria-label`, `title` y `placeholder` que muestran, se llevan al catálogo
   de su subcapacidad y se leen como `catalogoX.seccion.clave`. La regla "clave JSON inexistente"
   comprueba esas referencias de tres partes y atrapa errores de tipeo.
2. **Primitivas de interfaz** (`boton`, `boton_icono`, `campo_busqueda`, `selector`, `insignia`,
   `avatar_imagen`, `medida_dinamica`, `superficie_color`, `texto_color`): no tienen texto propio;
   reciben el texto de quien las usa. Hay dos caminos, y se decide con quien lidera:
   - **Usar la librería `@codeplex-sac`** en lugar de primitivas propias (botón, selector, campo). Es
     lo que pide el estándar de Codeplex y hace que el `<button>` viva en la librería.
   - **Conservarlas** y hacer obligatoria la etiqueta accesible, con un texto por defecto del catálogo
     compartido. Por ejemplo, en `boton_icono.tsx`, una prop `etiqueta` y
     `aria-label={etiqueta ?? catalogoCompartido.campos.accion}`.

Reglas de accesibilidad comprobadas, útiles para este paso:

- Un archivo con `<button` pasa si tiene `aria-label={…}`, o si contiene la palabra `catalogo` o
  `mensajes`. Lo honesto es la primera.
- Un archivo con `<input`, `<select` o `<textarea` pasa si tiene `<label` o `aria-label={…}`.

**Verificación.** El script no muestra errores y **no queda ningún** `void catalogo`:

```powershell
Get-ChildItem -Recurse redsocial\frontend -Include *.ts,*.tsx | Select-String -Pattern '^void catalogo'
```

**Qué se aprende.** Pasar el validador no es el objetivo. El objetivo es que el código haga lo que la
regla describe; el validador solo lo aproxima.

---

### Paso 10 · Validación final, empaquetado y documentación

**Qué.**

1. Validar y empaquetar con el script:

   ```powershell
   .\herramientas\validacion\validar_capacidad.ps1
   .\herramientas\validacion\validar_capacidad.ps1 -Operacion empaquetar
   ```

2. Comprobar la app en `npm run dev`: navegación, íconos, colores y barras.
3. Actualizar `redsocial/frontend/guia/decisiones_arquitectura_spa.md`, que cita rutas que ya no existen:

| Línea | Dice | Hoy es |
|---|---|---|
| L7, L17 | `frontend/enrutamiento/rutas.tsx`, `frontend/enrutamiento/navegacion.ts` | `rutas/compartido/rutas.tsx`, `rutas/compartido/navegacion.ts` |
| L21, L52 | `arranque/App.tsx`, capa `arranque/` | `montaje_local/aplicacion.tsx`, fuera de la capacidad |
| L39 | `datos/compartido/icons.ts` y `navigation.ts` | `datos/compartido/iconos.ts` y `navegacion.ts` |
| L49, L55 | `ganchos/`, `ganchos/compartido/useCarrusel.ts` | `componentes/compartido/usar_carrusel.ts`, `usarCarrusel` |
| L53 | capa `enrutamiento/` | `rutas/compartido/` |
| L61 | `tipos/compartido/icon.ts` y `MAPA_ICONOS` | `tipos/compartido/icono.ts` y la sección `iconos` del catálogo |
| L95, L99 | `EstructuraApp.tsx` | `estructura_app.tsx` |

   Y agregar las decisiones nuevas: montaje local fuera de la capacidad (paso 1), íconos construidos
   desde el SVG con alias en el catálogo (paso 7) y variantes de color en lugar de estilos en tiempo de
   ejecución (paso 8).
4. Commit según el flujo del equipo, cuando la desarrolladora lo indique.

**Verificación.** `Correcto: True` al validar **y** al empaquetar, código de salida 0.

---

## 4. Fuera de este plan: decisiones para conversar

El Centro no las marca hoy, pero la revisión puede hacerlo:

1. **`datos/` (13 subcarpetas) y `tipos/` (55 archivos).** La guía oficial no trae esas carpetas y el
   estándar dice que una carpeta que la guía no trae es de más; el Centro del 12-09, en cambio, no las
   marca (comprobado). `datos/` es contenido estático del prototipo que alimenta 39 páginas y 7
   componentes: cuando haya servicios reales, pasa a `servicios/`. Mientras tanto, conviene decidir con
   quien lidera dónde vive, y tener presente que la regla de datos falsos solo detecta palabras como
   `mock` o `lorem`.
2. **Enrutador propio y `href` a archivos `.html`.** `rutas/compartido/` intercepta clics a los nombres
   de archivo del prototipo HTML (`ARCHIVO_A_RUTA`). En la Plataforma, la navegación es del caparazón y
   la capacidad declara sus rutas en el catálogo. Migrar a rutas del catálogo exige tocar las siete
   páginas del paso 1 y los `href` de páginas y componentes.
3. **`EstructuraApp` en cada página.** La barra superior y la lateral son del caparazón. Dentro de la
   capacidad son una simulación válida para desarrollar, que no debería viajar como parte del producto.
4. **Subcarpetas anidadas** (`bloques/`, `interfaz/`, `estructura/`, `navegacion/`). El Centro las
   acepta; la guía ubica los archivos directamente en `<capa>/<subcapacidad>/`.
5. **Librería `@codeplex-sac`.** La capacidad no la usa. Adoptarla simplifica los pasos 8 y 9.
6. **Pruebas reales.** Vitest y Testing Library en el montaje local, para que las 40 pruebas del paso 4
   comprueben algo.
7. **El tema de la capacidad.** `index.css` no es solo arranque: define los tokens de color de la red
   social (`@theme`) y clases que usan los componentes, como `.icono` (L85). El paso 1 lo lleva al montaje
   local, lo que es correcto para desarrollar, pero en la integración el tema lo aplica el caparazón o el
   proyecto web de la Plataforma. Hay que acordar con quien lidera cómo viaja el tema de la red social.

---

## 5. Anexo de evidencia

Cada fila se ejecutó con el Centro del 12-09-2026 sobre una copia. "Ejemplo" es
`ejemplos/guia_estructura_capacidad`.

### 5.1 Sondas sobre el ejemplo oficial

| Cambio | Resultado |
|---|---|
| Ninguno | `correcto: true` |
| Archivo de rutas renombrado sin el nombre de la subcapacidad | `correcto: true` |
| Archivo de rutas vacío | `correcto: true` |
| Prueba renombrada sin el nombre de la página | `falta prueba frontend con la misma intencion` |
| Rutas solo en `rutas/compartido/` | `catalogos/.../compartido.json | falta contrato JSON reutilizable` |
| `formularios`, `tablas` y `servicios` solo con `.gitkeep` | `correcto: true` |
| Sin carpeta `formularios` | `ERROR_ESTRUCTURA_CAPACIDAD_INCOMPLETA | frontend/formularios` |
| Sin `mensajes/capacidades/<cap>/textos.json` | `falta contrato JSON reutilizable` |
| Componente que importa el catálogo y lo anula con `void` | `correcto: true` |
| `style=` en un componente y `style.setProperty` en un hook | Solo se marca el `style=` |
| `package.json`, `index.html`, `tsconfig.json`, `index.css` y `vite.config.ts` en `frontend/` | Solo se marca `vite.config.ts` |
| `useRutaActual`, `usarRutaVigente` y `useCarrusel` | Solo se marca `useRutaActual` |
| Carpetas `datos/` y `tipos/` | `correcto: true` |
| `<button aria-label={etiqueta}>` sin las palabras `catalogo` ni `mensajes` | `correcto: true` |
| `<button>` sin `aria-label` ni esas palabras | `boton sin texto o etiqueta reutilizable desde JSON` |
| `<button>` con una prop llamada `mensajes` | `correcto: true` |
| `<input>` sin etiqueta | `campo de formulario sin label reutilizable desde JSON` |
| `<input aria-label={catalogo…}>` | `correcto: true` |
| `acciones: []` en el catálogo | `falta seccion JSON obligatoria: acciones` |
| Catálogo sin `toast` | `falta seccion JSON obligatoria: toast` |

### 5.2 Pruebas sobre copias de esta capacidad

| Estado de la copia | Resultado |
|---|---|
| Repositorio sin cambios | 11 errores |
| Pasos 1 a 4, `useRutaActual` renombrado y `dangerouslySetInnerHTML` quitado de `icono.tsx` | 3 errores: `icono.tsx` (texto visible por la regex de L14), `usar_estilo_dinamico.ts`, catálogo sin `acciones` |
| Lo anterior + quitar todos los `void` | 19 errores: los 16 archivos del paso 9, dos falsos positivos y un catálogo |
| Lo anterior sin quitar `void`, con `icono.tsx` del paso 7 pero sin alias en el catálogo | `icono.tsx` pasa a "debe leer desde JSON" |
| Pasos 1 a 7 completos salvo el 8, con los catálogos llenados de forma provisional | 1 error: `usar_estilo_dinamico.ts` |

### 5.3 Compilación

| Estado | `tsc -b` | `vite build` |
|---|---|---|
| Repositorio sin cambios (`npm run build`) | Falla: `tsconfig.node.json` no encuentra `../../vite.config.ts` | Pasa por separado: CSS 74,27 kB · JS 739,68 kB |
| Paso 1 aplicado | Pasa | Pasa, con los mismos archivos con hash |
| Paso 1 + paso 7 | Pasa | Pasa: JS 740,21 kB |

Las pruebas usaron las versiones del `package-lock.json` de la capacidad (Vite 8.2.2, TypeScript 6.0.3,
Tailwind 4.3.3) instaladas con `npm ci`.
