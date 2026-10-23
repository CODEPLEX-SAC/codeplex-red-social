# Exportación de colaboradores (Excel y PDF)

## 1. Identificación

- **Componente:** módulo de exportación del listado de Colaboradores.
- **Propósito:** descargar el listado en Excel o PDF, para la vista actual o para todos los resultados filtrados.
- **Ubicación:** `redsocial/frontend/componentes/colaboradores/bloques/`: `bloque_exportar_colaboradores.tsx` (interfaz), `exportar_colaboradores.ts` (orquestación y descarga), `exportar_excel_colaboradores.ts`, `exportar_pdf_colaboradores.ts`, `reporte_colaboradores.ts`, `criterios_exportacion_colaboradores.ts`.
- **Estado:** **nuevo** (2026-10-15/16).
- **Consumidores:** el listado de Colaboradores.

## 2. Origen e implementación

- **Origen:** propio de CodePlex con librerías ajenas a `@codeplex-sac`: `exceljs` 4.4.0 (`import { Workbook } from 'exceljs'`), `jspdf` 4.2.1, `jspdf-autotable` 5.0.9 y `dayjs` 1.11.23. Los generadores se cargan con `import()` dinámico solo al exportar.
- **Dependencias nuevas en `package.json`:** `exceljs`, `jspdf`, `jspdf-autotable` y `dayjs`.

## 3. Contrato y características

Ámbitos: `vista` o `filtrados`. Columnas, anchos y textos salen de `colaboradores.json › exportacion` (`en_pdf`, `ancho`). El reporte describe los criterios activos. Accesibilidad de la interfaz: la de `Menu` y `Boton`. Pruebas: `pruebas/colaboradores/exportar_*` e `exportacion_colaboradores_ui.test.tsx`.

## 4. Diseño visual

La interfaz usa `Boton`, `Menu` e `Icono`; el archivo generado usa las columnas del catálogo.

## 5. Integración con el sistema compartido

Fuente de verdad: `colaboradores.json › exportacion`.

## 6. Dependencias y procedencia de iconos

Los iconos de aplicaciones asignadas se incluyen en el PDF (`iconos_aplicaciones_colaboradores`); el origen de esos iconos es el de `iconos.md`.

## 7. Historial de modificaciones

- 2026-10-15/16: creado. Sin librería `@codeplex-sac` afectada. Las dependencias añadidas aparecen como cambios sin confirmar en `package.json` y `package-lock.json`.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
