# Pasos (`StepperInvitarColaborador`)

## 1. Identificación

- **Componente:** `StepperInvitarColaborador`.
- **Propósito:** indicador de pasos del asistente «Invitar colaborador» (Información, Rol y permisos, Vigencia, Resumen).
- **Ubicación:** `redsocial/frontend/componentes/colaboradores/bloques/stepper_invitar_colaborador.tsx`; tipos en `tipos/colaboradores/contrato_invitar_colaborador.ts`.
- **Estado:** existente.
- **Consumidores:** el modal de invitar colaborador.

## 2. Origen e implementación

- **Origen:** usa directamente `CodeplexPasos` de `@codeplex-sac/navegacion` 0.0.16 dentro de `ProveedorTemaGraficos` (sin envoltorio compartido; el proyecto no tiene un `Stepper` genérico).
- **Elemento HTML nativo:** `<nav aria-label>` propio alrededor de la librería.

## 3. Contrato y características

Props del componente: `pasoActivo` (1 a 4). Entrega a la librería `pasos` (`etiqueta`, `completado`), `pasoActivo` (base 0) y `etiquetasAlternativas`. Accesibilidad: `<nav>` con etiqueta; el resto lo aporta la librería (no verificado).

## 4. Diseño visual

Barra con borde inferior y relleno de 24 × 16 px (8 px de lado en móvil). Tamaños y colores los dan la librería y el tema MUI; no se midieron.

## 5. Integración con el sistema compartido

Fuente de verdad: `colaboradores.json › stepper_invitar` y `asistente_invitacion`. No hay configuración central de pasos compartida.

## 6. Dependencias y procedencia de iconos

Los iconos de los pasos los dibuja la librería; no se usa `Icono`.

## 7. Historial de modificaciones

- Sin cambios propios documentados. `@codeplex-sac/navegacion@0.0.16` coincide byte a byte con el paquete publicado (2026-10-17).


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
