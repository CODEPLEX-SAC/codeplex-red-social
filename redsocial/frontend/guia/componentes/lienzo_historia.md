# Lienzo de historia (`LienzoHistoria`)

## 1. Identificación

- **Componente:** `LienzoHistoria` con `vistaDeBorrador` (`logica_historia.ts`).
- **Propósito:** único lienzo 9:16 que dibuja una historia (fondo, medio, texto y elementos superpuestos) en el editor, la vista previa, el visor, las tarjetas vecinas y las miniaturas.
- **Ubicación:** `redsocial/frontend/componentes/inicio/bloques/lienzo_historia.tsx` y `logica_historia.ts`; contrato `LienzoHistoriaProps` y `BorradorHistoria` en `redsocial/frontend/tipos/inicio/contrato_historia.ts` y `modelo_historia.ts`.
- **Estado:** nuevo (octubre de 2026).
- **Consumidores:** `botones_historia_inicio`, `editor_medio_historia`, `editor_texto_historia`, `tarjeta_activa_historia`, `vista_lateral_historia`, `vista_previa_historia`. Exportado por el barril de Inicio. Acoplado al modelo `BorradorHistoria`: **diseño propio de Inicio**.

## 2. Origen e implementación

- **Propio de CodePlex (C).** `<div>` con capas; el texto editable es un `<textarea data-escritura-historia>` nativo (el selector global de foco lo excluye para no mostrar borde morado).

## 3. Contrato y comportamiento

- `LienzoHistoriaProps`: `borrador`, `compacto?`, `inmersivo?`, `miniatura?`, `soloFondo?`, `onEscribir?(texto)`.
- `BorradorHistoria`: `tipo` (`texto` | `media`), `fondoId`, `texto` (máximo 150 caracteres con espacios), `estiloTextoId`, `medio`, `ajusteMedio`, `elementos[]` (`id`, `contenido`, `estiloTextoId`, `posicionId`). Guarda **identificadores**, no clases.
- `vistaDeBorrador` resuelve fondo, estilo, ajuste del medio y reducción del tamaño de letra para textos largos (`texto_adaptable`) desde el catálogo.

## 4. Estados

- Texto con fondo sólido, degradado, decorativo o imagen; medio (foto/video) con ajuste en niveles configurados; elementos superpuestos en tres posiciones (`superior`, `central`, `inferior`); modos de tamaño (compacto, inmersivo, miniatura, solo fondo).

## 5. Configuración e integración con el sistema compartido

- `redsocial/frontend/catalogos/capacidades/redsocial/inicio.json › historias` (`fondos` 18: 7 sólidos, 8 degradados, 3 decorativos; `estilos_texto` 6; `posiciones` 3; `texto_adaptable`; `ajuste_medio`; `lienzo`; `borrador`). Los degradados y fondos decorativos viven en `montaje_local/index.css` con hexadecimales (hallazgo H2-1, pendiente).

## 6. Dependencias

- `imagenes_historia.ts` (imágenes por `import.meta.glob`), `Icono`.

## 7. Pruebas existentes

- `pruebas/inicio/lienzo_historia.test.tsx` (3 pruebas) y `logica_historia.test.ts` (9 pruebas), `catalogo_historias.test.ts` (4), en verde el 2026-10-26.

## 8. Limitaciones conocidas

- `texto_adaptable.reduccion` referencia nombres de clases tipográficas (F2-17).
- Sin verificación visual en esta tarea.

Verificado el 2026-10-26 contra el código, los catálogos y los contratos citados (inspección estática). Las pruebas citadas se ejecutaron ese día (Inicio y Perfil: 15 archivos, 133 pruebas en verde) o se leyeron sin ejecutar si se indica. **No verificado visualmente en navegador.** Lo marcado como INFERIDO o PENDIENTE no pudo comprobarse con la evidencia disponible.
