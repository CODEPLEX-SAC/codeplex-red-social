# Acordeón (`Acordeon`)

## 1. Identificación

- **Componente:** `Acordeon`.
- **Propósito:** lista de filas expandibles (una o varias abiertas) con icono opcional a la izquierda.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/acordeon.tsx`; tipos en `tipos/compartido/contrato_acordeon.ts`.
- **Estado:** **nuevo** (2026-10-16).
- **Consumidores:** 2 usos: `componentes/marketplace/bloques/seccion_pago_metodo.tsx` (método de pago: **Tarjeta** y **Billeteras digitales**; la opción «Transferencia bancaria» se eliminó el 2026-10-19) y `modal_detalle_compra.tsx` (variante `bordeado`).

## 2. Origen e implementación

- **Origen:** envoltorio de `CodeplexAcordeon` de `@codeplex-sac/diseno` 0.0.20, que se apoya en MUI; el icono `ExpandMore` del chevron está definido dentro del paquete de la librería.
- **Implementación:** `acordeon.tsx`: un tema MUI anidado (`temaAcordeon`) quita la sombra de elevación 1 y mapea `Typography body2` a `div`; el icono de la fila se compone con `Icono`.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML nativo:** cabecera `<button id="acordeon-cabecera-…">` con `aria-expanded` y `aria-controls`; el contenido va en un elemento con `role="region"`.

## 3. Contrato y características

**Props** (`AcordeonProps` = `CodeplexAcordeonProps` con `elementos` propios):

| Prop | Valores |
|---|---|
| `elementos` | `{ id, titulo, subtitulo?, contenido, deshabilitado?, icono? }` (`icono` es un `IconName`; sustituye a `iconoIzquierda`) |
| `variante` | `simple`, `bordeado`, `separado` (predeterminada del proyecto: `separado`) |
| `multiple` | permite varias filas abiertas |
| `idsAbiertosInicialmente` | ids abiertos al montar (por defecto ninguno; el método de pago empieza cerrado) |
| `alCambiar` | recibe los ids abiertos |

**Estados:** cerrado, abierto, `disabled`, foco global. **Accesibilidad:** teclado y ARIA de la librería (Enter y Espacio alternan; `aria-expanded`, `aria-controls`). No hay modo controlado.

## 4. Diseño visual

- Fila cerrada: 48 px exteriores, con y sin icono (cabecera 46 px más el borde); en `bordeado`, la fila mide 46 px y el contenedor 48 px. Medido el 2026-10-16/17 a 1280 y 400 px.
- Cabecera: relleno horizontal 14 px y vertical 9 px (`px-3.5`, `py-2.25`), `min-height` calculado a partir de `--height-control`; chevron alineado al final (`justify-between`), hueco entre filas de 12 px (`[&>div]:gap-3`).
- Icono de fila: caja de 28 × 28 px (`selector_buscable.icono_caja`) con fondo `--color-primario-suave` y glifo de 16 × 16 px.
- Contenido: relleno horizontal 14 px e inferior 14 px.
- Tipografía heredada (tema MUI con `fontFamily: inherit`).

## 5. Integración con el sistema compartido

- Fuente de verdad: `compartido.json › acordeon` (sombra, variante, mapeo de tipografía y las clases con `!` que sobrescriben a MUI).
- El alto de 48 px deriva de `--height-control`; cambiarlo mueve el acordeón.
- Overrides locales: ninguno en los consumidores; el componente no admite `className` ni `sx` en la librería.

## 6. Dependencias y procedencia de iconos

Icono de la fila: `Icono` (glifo de Material Symbols Rounded de `@codeplex-sac/iconos`, por ejemplo `tarjeta-pago`); ver `iconos.md`. El chevron lo pone la librería (icono `ExpandMore`, definido en su propio paquete).

## 7. Historial de modificaciones

- 2026-10-16: creado para el método de pago de la pasarela; reemplaza las tres tarjetas seleccionables anteriores.
- 2026-10-16/17: filas de 48 px exteriores (antes 50 px con icono y 42 px sin icono) y chevron alineado a la derecha.
- No se modificó la librería: `@codeplex-sac/diseno@0.0.20` coincide byte a byte con el paquete publicado (2026-10-17). Las diferencias visuales son de este proyecto (tema anidado y clases con `!`).
- Impacto: 2 archivos de Marketplace.


Verificado el 2026-10-19 contra el código, el catálogo y los contratos citados (la medición en navegador es la de 2026-10-16/17 y las Fases 5 y 6, salvo donde se indica otra fecha). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
