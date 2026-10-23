# Pestañas (`Pestanas`)

## 1. Identificación

- **Componente:** `Pestanas`.
- **Propósito:** barra de pestañas con icono, contador y enlace opcionales.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/pestanas.tsx`; tipos en `tipos/compartido/contrato_pestanas.ts`.
- **Estado:** existente.
- **Consumidores:** 13 usos JSX en 13 archivos (Actividad, Amigos, Avisos, Colaboradores, Empresas, Mensajería, Grupos y otros).

## 2. Origen e implementación

- **Origen:** envoltorio de `CodeplexPestanas` de `@codeplex-sac/navegacion` 0.0.16 con `Tab` de `@mui/material` 7.3.11 para cada pestaña.
- **Implementación:** `pestanas.tsx`; usa `Icono` e `Insignia` dentro de la etiqueta.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML nativo:** `<button role="tab">` o `<a role="tab">` (si hay `ruta`) generados por MUI.

## 3. Contrato y características

Props (`PestanasProps`): `elementos` (`{ clave, etiqueta, ruta?, icono?, insignia? }`), `activa`, `alCambiar(clave)`, `className`. Estados: activa, inactiva, `hover`, foco (anillo global en la envoltura), desplazable con botones de scroll automáticos. Accesibilidad: roles `tab`/`tablist` de MUI; las pestañas con `ruta` son enlaces.

## 4. Diseño visual

Alto medido ≈ 41,5 a 42 px (el tema define `minHeight: 2.5rem`), texto 14 px / 500 sin mayúsculas, ancho mínimo 90 px (0 en móvil), relleno horizontal 16 px (8 px en móvil), icono de 14 × 14 px a la izquierda, contador con `Insignia variant="counter"`.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › pestanas` y `pestanas_tema`. Un cambio ahí afecta a todas las pestañas. Overrides locales: solo `className` del contenedor.

## 6. Dependencias y procedencia de iconos

Iconos de pestaña: `Icono` (ver `iconos.md`).

## 7. Historial de modificaciones

- Sin cambios propios documentados salvo configuración y tema. No se modificó la librería: el contenido de `@codeplex-sac/navegacion@0.0.16` coincide byte a byte con el paquete publicado y con la integridad del `package-lock.json` (comprobado el 2026-10-17).
- Impacto: 13 archivos. Los chips de filtro no son pestañas; ver `chip_filtro.md`.


## Excepciones y casos que no son pestañas
- **INC-11 (excepción justificada):** `ModalDetalleEmpresa` y `CuerpoEditarEmpresa` pasan `className` con `px-6 max-480:px-4` a `Pestanas` porque no existe una variante para modal.
- **INC-27:** `TabsTipoPlanes` (Marketplace) es un selector de plan hecho con `Boton md`, no una navegación por pestañas; no migrarlo a `Pestanas` sin una decisión de diseño.
- **Pestañas con ruta `#`:** en Guardados cuatro de las cinco pestañas usan `#` (solo «Grupos» tiene ruta); ver [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md).
- **Fase 5 (INC-28):** Notificaciones > Sistema tiene ruta y página propias.
- El color activo y el foco heredan el primario `#5a43f4` del tema MUI (Fase 5).

---
Verificado el 2026-10-19 contra `pestanas.tsx` y `compartido.json › pestanas`/`pestanas_tema`; consumidores recontados (13 usos en 13 archivos). Alto, relleno y tipografía medidos el 2026-10-16/17. Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
