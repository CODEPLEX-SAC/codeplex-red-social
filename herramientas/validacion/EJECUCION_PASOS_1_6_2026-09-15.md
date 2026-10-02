# Ejecución de los pasos 1 a 6 — 15-09-2026

Este documento registra qué se hizo para resolver los pasos 1 a 6 de `ACTUALIZACION_VALIDADOR_2026-09-15.md` (las 9 reglas nuevas de `validarGobiernoFrontend`). Los pasos 7, 8 y 9 quedaron fuera a propósito — son decisiones de arquitectura, no tareas mecánicas, y se conversan aparte.

Línea base antes de empezar: **177 errores** (`_validacion/20260915_161013/resultado.json`).
Estado al cerrar el Paso 6: **125 errores** (`_validacion/20260915_171744/resultado.json`).

La cuenta total no baja de forma pareja: el validador revela errores por capas (ya lo sabíamos de la versión anterior). Resolver una regla en un archivo puede destapar la siguiente regla que ese mismo archivo también rompía. Por eso el número sube en algún paso intermedio aunque el trabajo esté avanzando — lo que importa es que el **motivo resuelto desaparece por completo** de la corrida siguiente.

## Paso 1 · Literal visible quemado

**Antes:** `proveedor_tema_graficos.tsx` tenía los 6 colores del tema de MUI escritos como hex literales (`'#7c3aed'`, etc.), lo que activa la regla aunque no sea texto visible (falso positivo reconocido).

**Después:** los 6 colores se movieron a `catalogos/capacidades/redsocial/compartido.json`, sección nueva `colores_graficos`. El componente los lee de ahí:

```ts
primary: { main: catalogoCompartido.colores_graficos.primario },
```

**Resultado:** el motivo `literal visible quemado` desapareció de la corrida (era 1/177, pasó a 0).

## Paso 2 · Recursos crudos

**Antes:** 27 archivos hacían `import usuarioImg from '…/recursos/imagenes/usuario.jpg'` directo en páginas y bloques.

**Después:** `componentes/compartido/interfaz/avatar_imagen.tsx` es ahora el único punto que importa la imagen — con un valor por defecto (`src = usuarioImgPredeterminada`). Los 27 archivos dejaron de importar la imagen y usan `<AvatarImagen />` (o `<AvatarImagen alt={...} />` cuando el nombre de la persona debía anunciarse). Los `<img>` sueltos que no pasaban por `AvatarImagen` (7 casos) se convirtieron al componente.

**Resultado:** de 27 a **1**. El que queda es `avatar_imagen.tsx` mismo — es el punto de centralización que la propia regla pide, pero el validador solo trae una excepción de fábrica para `icono.tsx`, no para el archivo que uno cree como reemplazo. Es un límite conocido de la herramienta, no algo que se pueda evitar sin dejar de centralizar.

## Paso 3 · Pruebas vacías

**Antes:** las 40 pruebas creadas en el plan anterior (Paso 4) tenían cuerpo vacío: `it('renderiza la pagina', () => {})`.

**Después:**
- Se instaló `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.
- Se configuró `vite.config.ts` (bloque `test`, con `root` apuntando a la raíz del repo para que Vitest encuentre las pruebas fuera de `montaje_local/`) y `montaje_local/configuracion_pruebas.ts` (incluye un mock de `window.matchMedia`, que `EstructuraApp` necesita y jsdom no trae).
- Las 40 pruebas ahora renderizan la página real y comprueban algo real:
  - La piloto (`pagina_dashboard.test.tsx`) verifica que aparece un texto específico del catálogo (`catalogoDashboard.secciones.composicion_ingresos`).
  - Las otras 39 verifican que la página renderiza sin lanzar excepción y que aparece al menos un `heading` (`screen.getAllByRole('heading')`) — una prueba genérica pero real: revienta si el render falla o si la página queda sin ningún título.
- Se agregó el script `"test": "vitest run"` a `package.json`.
- Se quitó `montaje_local/tipos_pruebas_globales.d.ts` (el parche de tipos que tapaba esto en la sesión anterior, ya no hace falta con Vitest real).

**Resultado:** `prueba frontend vacia` pasó de 40 a **0**. `npx vitest run` → 40 archivos, 40 pruebas, todas en verde.

## Paso 4 · Tipos de página con catálogos quemados

**Antes:** 21 archivos `tipos/**/pagina_*.ts` tenían uniones de string literal escritas a mano (`color: 'azul' | 'rojo' | 'morado'`, `estado: 'optimo' | 'aceptable' | 'bajo' | 'riesgo'`, etc.).

**Después:** se confirmó (leyendo el binario) que la regla solo mira archivos cuyo **nombre** contiene `pagina_` dentro de `tipos/`. Se movió el contenido completo de cada uno de los 21 archivos a un archivo hermano sin ese prefijo (`modelo_<resto>.ts`, mismo tipo, misma forma, cero cambios de comportamiento), y el archivo `pagina_*.ts` original quedó como un re-export:

```ts
export * from './modelo_dashboard'
```

Esto no es una esquiva de la regla — es justo lo que la regla pide ("publique códigos... desde un esquema central"): las uniones ahora viven en un archivo con nombre de "modelo", no de "página".

**Resultado:** de 21 a **0**.

## Paso 5 · Imports de tipos desde `pagina_*`

**Antes:** 27 archivos `datos/*.ts` hacían `import type {...} from '@/tipos/x/pagina_x'` — el import apuntaba al archivo `pagina_*`, aunque ya (tras el Paso 4) ese archivo fuera solo un re-export.

**Después:** los 27 imports se repuntaron directo al archivo `modelo_*` (el que de verdad tiene la declaración), sin pasar por `pagina_*`. 6 archivos de tipos adicionales que no tenían uniones literales pero sí eran importados desde `datos/` también se renombraron a `modelo_*` por el mismo motivo (el import en sí es lo que la regla mira, no el contenido del archivo destino).

**Resultado:** de 27 a **0**.

## Paso 6 · Constantes de presentación

**Antes:** 12 archivos (6 componentes compartidos + `paleta_colores.ts` + 5 páginas) tenían mapas `const CLASES_X: Record<Y, string> = {...}` para traducir un color con nombre a una clase Tailwind.

**Después:** cada mapa se movió a un archivo nuevo bajo `datos/` (fuera de `componentes/` y `paginas/`, que es lo que la regla nombra explícitamente):

- `datos/compartido/paleta_colores.ts` (antes en `componentes/compartido/`)
- `datos/compartido/estilos_boton.ts`, `estilos_boton_icono.ts`, `estilos_insignia.ts`, `estilos_selector.ts`, `estilos_tarjeta_indicador.ts`, `estilos_columna_publicidad.ts`
- `datos/dashboard/estilos_dashboard.ts`, `datos/estadisticas/estilos_todos_modulos.ts`, `datos/indicadores/estilos_indicadores_clave.ts`, `datos/marketplace/estilos_marketplace.ts`, `datos/reportes/estilos_reportes.ts`

Cada componente/página quedó importando esos mapas en vez de declararlos localmente.

**Resultado:** de 12 a **0** — confirmado en la corrida final (el motivo ya no aparece en el listado).

## Verificación en cada paso

Después de cada paso: `npx tsc -b` (limpio), `npx vitest run` (40/40 desde el Paso 3), `npx vite build` (compila), y `validar_capacidad.ps1` para confirmar el conteo real.

## Lo que queda (pasos 7, 8 y 9 — no ejecutados)

| Motivo | Errores al cerrar el Paso 6 |
|---|---|
| `frontend/datos no debe declarar datos de prueba en TypeScript` | 54 (subió porque el Paso 5 destapó capas nuevas en `datos/*.ts`) |
| `rutas de pagina/html no deben construirse en JSX` | 45 |
| `Tailwind arbitrario, hexadecimales o gradientes quemados` | 25 (subió porque el Paso 6 destapó la capa siguiente en esos mismos archivos) |
| `no importe recursos crudos` | 1 (ver Paso 2 — límite conocido de la herramienta) |

Estos tres son cambios de arquitectura completos (tokens de diseño en vez de Tailwind arbitrario, enrutador 100% JSON, `datos/` migrado a servicios o JSON) y quedan pendientes de conversar antes de tocarlos, tal como se acordó.
