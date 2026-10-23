# Estructura de tres columnas (`EstructuraTresColumnas`)

## 1. Identificación

- **Componente:** `EstructuraTresColumnas`.
- **Propósito:** rejilla principal + publicidad + lateral de las pantallas sociales.
- **Ubicación:** `redsocial/frontend/componentes/compartido/estructura/estructura_tres_columnas.tsx`; tipos en `contrato_estructura_tres_columnas.ts`.
- **Estado:** existente.
- **Consumidores:** páginas de Amigos, Grupos, Avisos, Mensajería, Marketplace, Estadísticas y otras.

## 2. Origen e implementación

- **Origen:** propio de CodePlex.
- **Elemento HTML:** `<div>`.

## 3. Contrato y características

Props: `principal`, `publicidad`, `lateral` (nodos), `alturaCompleta` y `distribucion` (`amplia` predeterminada o `social`). Las columnas se ocultan por ancho: la lateral por debajo de 1250 px y la publicidad por debajo de 2130 px (`amplia`) o 1600 px (`social`).

## 4. Diseño visual

Rejilla con separación de 40 px (`gap-10`), 24 px en los anchos intermedios (por debajo de 2130 px o 1600 px según la distribución) y 16 px por debajo de 950 px; columna principal con mínimo de 400 px y laterales entre 230 y 340 px.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › estructura_tres_columnas.distribuciones`.

## 6. Dependencias y procedencia de iconos

Sin iconos.

## 7. Historial de modificaciones

Sin cambios documentados. Impacto: las pantallas de tres columnas.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
