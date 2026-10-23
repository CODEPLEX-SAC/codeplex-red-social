# Radio (`Radio`)

## 1. Identificación

- **Componente:** `Radio`.
- **Propósito:** botón de opción única.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/radio.tsx`.
- **Estado:** existente.
- **Consumidores:** 11 usos JSX en 7 archivos (Eventos, Colaboradores, formularios de Eventos).

## 2. Origen e implementación

- **Origen:** envoltorio de `CodeplexRadio` de `@codeplex-sac/formularios` 0.1.10 (MUI `Radio`).
- **Implementación:** `radio.tsx`; aplica `controles.radio` (`colorTema: primario`).
- **Exportación:** barrel `componentes/compartido/index.ts`. El proyecto no usa `CodeplexGrupoRadio`.
- **Elemento HTML nativo:** `<input type="radio">` generado por MUI.

## 3. Contrato y características

Props de la librería (`CodeplexRadioProps`): `etiqueta`, `posicionEtiqueta` (`fin`, `inicio`, `arriba`, `abajo`), `colorTema` y `RadioProps`. Estados: seleccionado, sin seleccionar, `disabled`, foco global con anillo en la envoltura. Accesibilidad: agrupar y nombrar es responsabilidad del consumidor.

## 4. Diseño visual

Caja medida de 38 × 38 px en el formulario «Crear evento». Color sin seleccionar `--color-texto-suave`; seleccionado, primario. Sin cambios por ancho.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › controles.radio` y el tema MUI. Sin overrides locales de dimensiones.

## 6. Dependencias y procedencia de iconos

Los puntos del radio los dibuja MUI; no se usa `Icono`.

## 7. Historial de modificaciones

- Sin cambios propios documentados salvo el color de tema. No se modificó la librería: el contenido de `@codeplex-sac/formularios@0.1.10` coincide byte a byte con el paquete publicado y con la integridad del `package-lock.json` (comprobado el 2026-10-17).
- Impacto: 7 archivos.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
