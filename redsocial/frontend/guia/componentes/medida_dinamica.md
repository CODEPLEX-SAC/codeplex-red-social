# Medida dinámica (`MedidaDinamica`)

## 1. Identificación

- **Componente:** `MedidaDinamica`.
- **Propósito:** contenedor al que se le pasan clases de ancho, alto y color ya calculadas (por ejemplo porcentajes de barras).
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/medida_dinamica.tsx`.
- **Estado:** existente.
- **Consumidores:** 3 archivos de Dashboard y Estadísticas.

## 2. Origen e implementación

- **Origen:** propio de CodePlex.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML:** configurable con `as` (predeterminado `<span>`).

## 3. Contrato y características

Props: `ancho`, `alto`, `color` (cadenas de clases o `null`), `className`, `as`, `children`. Concatena las clases recibidas; no calcula nada.

## 4. Diseño visual

Sin estilo propio; depende de las clases que recibe.

## 5. Integración con el sistema compartido

Sin configuración central. Existe para evitar `style` en línea (el validador 3DD rechaza `style=`).

## 6. Dependencias y procedencia de iconos

Sin iconos.

## 7. Historial de modificaciones

Sin cambios documentados. Impacto: 3 archivos.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
