# Tabla de colaboradores (`TablaColaboradores`)

## 1. Identificación

- **Componente:** `TablaColaboradores`.
- **Propósito:** tabla del listado de Colaboradores con selección, estados, aplicaciones asignadas, vigencia y acciones.
- **Ubicación:** `redsocial/frontend/componentes/colaboradores/bloques/tabla_colaboradores.tsx`; tipos en `tipos/colaboradores/contrato_listado_colaboradores.ts`.
- **Estado:** **nuevo** (2026-10-16).
- **Consumidores:** la sección de listado de Colaboradores.

## 2. Origen e implementación

- **Origen:** propio de CodePlex; recibe una tabla de `@tanstack/react-table` 9.2.4 ya construida por `usar_tabla_colaboradores.ts`.
- **Elementos HTML nativos:** `<table>`, `<thead>`, `<tbody>`, `<th>`.
- **Dependencias:** `Casilla`, `CLASES_TABLA`, `BloqueReenviar` (fila) y el catálogo `colaboradores.json`.

## 3. Contrato y características

Props (`TablaColaboradoresProps`): `datos` (clases de estado y rol, menús, acciones), `tabla` (instancia TanStack) y `filas`. Estados: sin colaboradores, selección de página y total (casilla de cabecera con indeterminado), menú de acciones por fila, reenvío de invitación.

## 4. Diseño visual

Presentación de `CLASES_TABLA`; casilla de cabecera de 40 px de ancho, encabezados en mayúsculas con relleno de 14 px.

## 5. Integración con el sistema compartido

Consume `tabla_datos` de `compartido.json` y `clases_tabla` de `colaboradores.json`. Sin overrides locales.

## 6. Dependencias y procedencia de iconos

Iconos con `Icono`/`BotonIcono` y los de aplicaciones del módulo (`iconos_aplicaciones_colaboradores`).

## 7. Historial de modificaciones

- 2026-10-16: creado al separar la tabla del listado. Sin librería modificada.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
