# Campo con etiqueta (`CampoEtiquetado`)

## 1. Identificación

- **Componente:** `CampoEtiquetado`.
- **Propósito:** coloca una etiqueta visible encima de cualquier control del formulario.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/campo_etiquetado.tsx`; tipo en `tipos/compartido/contrato_campo_etiquetado.ts`.
- **Estado:** **nuevo** (2026-10-16), creado para la pasarela de pagos; adoptado después por Acceso, Colaboradores, Empresas y los formularios de Eventos.
- **Consumidores:** 75 usos JSX en 23 archivos (conteo del 2026-10-19): Acceso (3), Colaboradores (10), Empresas (5), Marketplace (2) y formularios de Eventos (3). Puede haber patrones equivalentes locales que no lo usan.

## 2. Origen e implementación

- **Origen:** propio de CodePlex; no usa librerías.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML nativo:** `<div>` y `<span>`; no es un `<label>`.
- **Resuelve:** un patrón repetido de «rótulo encima del control» que las librerías no ofrecen como etiqueta externa.

## 3. Contrato y características

Props (`CampoEtiquetadoProps`): `etiqueta` (texto), `requerido` (añade «*» en `--color-peligro-texto`), `className`, `children`, `variante` (`normal` por defecto o `compacta`), `tono` (`normal` o `suave`, color de la etiqueta), `ayuda` (texto de ayuda alineado a la derecha), `envolver` (si es verdadero, la raíz es un `<label>` que envuelve el control) y `para` (id del control: la etiqueta pasa a ser un `<label htmlFor>`). Sin estados propios. **Accesibilidad:** por defecto la etiqueta no está asociada al control (es un `<span>`); para asociarla hay que usar `para` o `envolver`, o dar al control su propio `aria-label` o `inputProps`.

## 4. Diseño visual

Etiqueta de 12 px / 500 (`text-etiqueta`) en `--color-texto` (`--color-texto-suave` con `tono="suave"`). `variante="normal"`: contenedor `min-w-0` y 6 px de separación hasta el control (`mb-1.5`). `variante="compacta"`: contenedor en columna (`flex flex-col gap-1`), 4 px entre etiqueta y control; es la que usan los formularios de Colaboradores.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › campo_etiquetado` (`normal`, `compacta`, `requerido`, `simbolo_requerido`, `ayuda`). Un cambio ahí afecta a los 23 archivos consumidores.

## 6. Dependencias y procedencia de iconos

Sin iconos.

## 7. Historial de modificaciones

- 2026-10-16: creado y adoptado en `seccion_pago_facturacion` y `seccion_pago_tarjeta`.
- Sin librería afectada. Impacto: 23 archivos. Los formularios que no lo usan conservan su propia etiqueta; no se auditó cuántos (no verificado).


Verificado el 2026-10-19 contra el código, el catálogo y los contratos citados (la medición en navegador es la de 2026-10-16/17 y las Fases 5 y 6, salvo donde se indica otra fecha). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
