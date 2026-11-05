# Ayuda contextual (`AyudaContextual`)

## 1. Identificación

- **Componente:** `AyudaContextual`.
- **Propósito:** botón con icono informativo que muestra un texto de ayuda breve, sin ocupar espacio fijo en la pantalla.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/ayuda_contextual.tsx`; tipos en `tipos/compartido/contrato_ayuda_contextual.ts`.
- **Estado:** **nuevo** (2026-10-30).
- **Consumidores:** 1 archivo: `colaboradores/bloques/control_perfil_modulo.tsx` (alcance de los permisos del asistente de invitación).

## 2. Origen e implementación

- **Origen:** propio de CodePlex. Compone `BotonIcono` (variante `discreto`, tamaño `sm`) con el `Tooltip` de `@mui/material` dentro de `ProveedorTemaGraficos`, que aplica el estilo del tooltip (`compartido.json › tooltip_tema`).
- **Accesibilidad:** el botón tiene nombre accesible (`etiqueta`); el texto se asocia con `describeChild`.

## 3. Contrato y comportamiento

- Props: `texto` (contenido de la ayuda) y `etiqueta` (nombre accesible del botón).
- Se muestra al pasar el ratón o con el foco y, en pantallas táctiles, al tocar (sin retardo; permanece 5 s).

## 4. Configuración

`compartido.json › ayuda_contextual` (`icono`, `clase`, `demora_toque`, `permanencia_toque`).

## 5. Historial

- 2026-10-30: creado; no existía un patrón de ayuda contextual reutilizable (solo `TextoTruncable`, que muestra el texto recortado).

Verificado el 2026-10-30 con una prueba de comportamiento (aparece el texto al pasar el ratón); aspecto visual no comprobado en navegador.
