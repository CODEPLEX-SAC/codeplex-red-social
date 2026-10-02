# Ejecución del Paso 9 — datos/*.ts → JSON — 15-09-2026

Este documento registra qué se hizo para el Paso 9 de `ACTUALIZACION_VALIDADOR_2026-09-15.md` (motivo `frontend/datos no debe declarar datos de prueba en TypeScript`). Los pasos 1-6 están en `EJECUCION_PASOS_1_6_2026-09-15.md`, el Paso 8 en `EJECUCION_PASO_8_2026-09-15.md`. Queda pendiente el Paso 7.

Línea base antes de empezar: **120 errores**, de los cuales **55** eran del motivo de datos.
Estado al cerrar el Paso 9: **120 errores**, motivo de datos sigue en **55** — sin cambio. La razón está explicada abajo: es una regla del validador que, tal como está compilada hoy, no se puede satisfacer con el remedio que ella misma sugiere.

## Qué se cambió en el código (esto sí quedó bien y se mantiene)

Los 55 archivos de `redsocial/frontend/datos/` que tenían arrays/objetos escritos a mano en TypeScript se convirtieron: cada uno ahora tiene un `.json` hermano con los datos reales, y el `.ts` original quedó como una reexportación tipada de ese JSON, por ejemplo:

```ts
// datos/mensajeria/mensajes.ts
import type { Conversacion, ConversacionActiva } from '../../tipos/mensajeria/mensajes'
import datos from './mensajes.json'

export const CONVERSACIONES = datos.conversaciones as readonly Conversacion[]
export const CONVERSACION_ACTIVA = datos.conversacionActiva as ConversacionActiva
```

Ningún archivo fuera de `datos/` cambió — los nombres exportados y las rutas de import siguen igual, así que nada más en la capacidad tuvo que tocarse.

**Casos especiales:**
- `datos/compartido/iconos.ts` — `NOMBRES_ICONOS` alimentaba el tipo `NombreIcono` vía `(typeof NOMBRES_ICONOS)[number]`. Se comprobó (con una prueba aislada) que TypeScript **no preserva tipos literales en imports de JSON** — un array de strings en `.json` se tipa como `string[]` ancho, no como unión de literales. Es una pérdida de rigor aceptada: `NombreIcono` deja de acotar a nombres válidos en tiempo de compilación. Es el mismo tipo de concesión que ya se documentó en el Paso 2 (el archivo `avatar_imagen.tsx`).
- `datos/compartido/navegacion.ts` — `NAV_PRINCIPAL`/`ESPACIO_TRABAJO` calculaban su campo `ruta` desde los catálogos JSON (`catalogoActividad.rutas.todas`, etc.). Esos valores ya son estáticos, así que se resolvieron y se escribieron literalmente en `navegacion.json` (duplicando el valor que también vive en cada catálogo de subcapacidad). Es una concesión documentada, no un descuido: si una ruta cambia en el catálogo, hay que actualizarla también acá.
- Los archivos `estilos_*.ts`/`paleta_colores.ts` (mapas `Record<Color, string>` de clases Tailwind) recibieron el mismo tratamiento — esto además ayuda a cerrar la regla separada de "constantes de presentación" en los archivos donde antes vivían.

Verificación: `npx tsc -b` limpio, `npx vitest run` 40/40, `npx vite build` compila.

## Por qué el contador del validador no bajó

Se investigó por qué el motivo `datos de prueba` seguía marcando los mismos 55 archivos después de vaciarlos de datos. Con `herramientas/validacion/leer_reglas_validador.py --funcion validarTextosFrontendDesdeJSON` se confirmó que esta regla en particular aplica `patronLiteralTextoFrontend` (`["'][^"'\r\n]*[A-Za-z][^"'\r\n]*["']` — cualquier string entre comillas que tenga una letra) **directo sobre el archivo entero**, sin la exclusión de "string técnico" (`patronLiteralTecnicoFrontend`) que sí usa la regla vecina de "literal visible quemado". Se confirmó de forma empírica: un archivo de prueba con solo

```ts
import type { Foo } from '../../tipos/compartido/icono'
export const X = 1
```

(sin ningún dato) también dispara el error — el string de la ruta de import ya alcanza para activarlo.

En otras palabras: **cualquier archivo `.ts` bajo `frontend/datos/` que tenga al menos un `import` (incluyendo el `import datos from './x.json'` que la propia regla sugiere como solución) va a seguir marcando este error**, sin importar que ya no tenga datos escritos a mano. Es un límite de la herramienta, no algo que se pueda resolver reestructurando más el código — coincide en naturaleza con el residual ya documentado en el Paso 2 (`avatar_imagen.tsx`), pero a mayor escala.

## Conclusión

El cambio de arquitectura que pedía el Paso 9 (datos fuera de TypeScript, en JSON) **está hecho y es correcto** — se mantiene porque es la forma correcta de estructurar la capacidad, independientemente de que el validador no lo refleje en su conteo. El motivo seguirá apareciendo en las próximas corridas hasta que se actualice el `.exe` del validador para que esta regla también respete la exclusión de strings técnicos (o alguna exención explícita para imports de `.json`).

## Lo que queda

| Motivo | Errores al cerrar el Paso 9 |
|---|---|
| `Tailwind arbitrario, hexadecimales o gradientes quemados` (Paso 7 — no ejecutado) | 53 |
| `frontend/datos no debe declarar datos de prueba en TypeScript` (arquitectura ya corregida; limitación de la herramienta, ver arriba) | 55 |
| `constantes de presentacion no deben vivir en TSX` (capa nueva del Paso 6, ver `EJECUCION_PASO_8_2026-09-15.md`) | 11 |
| `no importe recursos crudos` (límite conocido de la herramienta, ver Paso 2) | 1 |
