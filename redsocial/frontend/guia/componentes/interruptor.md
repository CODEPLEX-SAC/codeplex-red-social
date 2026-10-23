# Interruptor (`Interruptor`)

## 1. Identificación

- **Componente:** `Interruptor`.
- **Propósito:** conmutador de encendido y apagado.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/interruptor.tsx`.
- **Estado:** existente.
- **Consumidores:** 5 usos JSX en 5 archivos (Empresas, formularios de Eventos, Marketplace, Mensajería).

## 2. Origen e implementación

- **Origen:** envoltorio de `CodeplexInterruptor` de `@codeplex-sac/formularios` 0.1.10 (MUI `Switch`).
- **Implementación:** `interruptor.tsx`; aplica `controles.interruptor` (`color: primario`, `tamano: pequeno`).
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML nativo:** `<input type="checkbox" role="switch">` generado por MUI.

## 3. Contrato y características

Props de la librería (`CodeplexInterruptorProps`): `etiqueta`, `posicionEtiqueta`, `tamano` (`pequeno`, `mediano`), `seleccionado`, `porDefectoSeleccionado`, `alCambiar(evento, marcado)`, `color`, `deshabilitado`, `error`, `mensajeError` y `SwitchProps`. Estados: encendido, apagado, `disabled`, foco con anillo global en la envoltura. Accesibilidad: el nombre lo da `etiqueta` o `inputProps`.

## 4. Diseño visual

Caja medida de 44 × 24 px (el interruptor «Empresa activa» de Nueva empresa); etiqueta de 14 px / 400. Encendido en color primario; apagado gris del tema. Sin cambios por ancho.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › controles.interruptor`. Sin overrides locales de dimensiones.

## 6. Dependencias y procedencia de iconos

Sin iconos.

## 7. Historial de modificaciones

- Sin cambios propios documentados salvo color y tamaño predeterminados. No se modificó la librería: el contenido de `@codeplex-sac/formularios@0.1.10` coincide byte a byte con el paquete publicado y con la integridad del `package-lock.json` (comprobado el 2026-10-17).
- Impacto: 5 archivos.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
