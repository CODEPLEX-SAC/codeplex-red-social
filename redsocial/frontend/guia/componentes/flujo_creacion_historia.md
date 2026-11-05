# Creación de historias: flujo, editores y almacenamiento

## 1. Identificación

- **Componente:** `ModalCrearHistoria`, `SelectorTipoHistoria`, `EditorTextoHistoria`, `EditorMedioHistoria`, `ControlesFondoHistoria`, `ControlesEstiloHistoria`, `ControlesElementosHistoria`, `HerramientaTextoHistoria`, `AjusteMedioHistoria`, `VistaPreviaHistoria`, `PieEditorHistoria` y los hooks `usarFlujoHistoria`, `usarArchivoHistoria`, `usarHistoriasInicio`.
- **Propósito:** crear y publicar una historia de texto o de foto/video, y mantener el estado de las historias, respuestas y reacciones.
- **Ubicación:** `redsocial/frontend/componentes/inicio/bloques/` (archivos `*_historia*`, `usar_flujo_historia.ts`, `usar_archivo_historia.ts`, `usar_historias_inicio.ts`, `logica_*`); almacén en `redsocial/frontend/servicios/inicio/almacen_historias.ts`; contratos `FlujoHistoria`, `EstadoHistorias`, `AlmacenHistorias` en `redsocial/frontend/tipos/inicio/`.
- **Estado:** nuevo (octubre de 2026).
- **Consumidores:** `seccion_historias_inicio.tsx` (acceso «Crear historia» / «Tu historia») dentro de `PaginaInicio`.

## 2. Origen e implementación

- **Propio (C)** con envoltorios oficiales: `Pestanas` (herramientas y tipos de fondo), `CampoTexto` y **`CodeplexDeslizador` usado directamente** en `ajuste_medio_historia.tsx` (A; propuesta de envoltorio `Deslizador` pendiente). El archivo se elige con el selector nativo del sistema (`<input type="file" hidden>`), sin zona de arrastre.

## 3. Contrato y comportamiento

- Pasos `tipo` → `editor` → `vista_previa` (`PasoCreacionHistoria`). `FlujoHistoria` expone acciones: `elegirTipo`, `continuar`, `volverATipo`, `irAVistaPrevia`, `volverAEditar`, `publicar`, `pedirCerrar`, `seguirEditando`, `confirmarDescarte`, `cambiarFondo`, `cambiarTexto`, `cambiarEstilo`, `cambiarAjusteMedio`, `agregarEmoji`, `elegirMedio`, `agregarElemento`, `quitarElemento`, `cambiarElemento`, `moverElemento`.
- Texto: máximo 150 caracteres con contador; foto o video: ajuste por niveles, texto superpuesto desde la herramienta Texto. Salir con contenido pide confirmación de descarte.
- Publicar: `conHistoria` (límite `maximo_segmentos` = 10 por autor) sobre `almacen_historias`. Las historias de contactos vienen de `servicios/inicio/inicio.json › historiasContactos`; las propias iniciales (dos de Pedro) de `historiasPropias` (`historias_demostracion.ts`).

## 4. Estados

- Selector de tipo, editor de texto, editor de medio, vista previa, confirmación de descarte, error de archivo, límite de segmentos alcanzado (acceso deshabilitado).

## 5. Configuración e integración con el sistema compartido

- `redsocial/frontend/catalogos/capacidades/redsocial/inicio.json › historias` (`flujo`, `tipos_fondo`, `fondos`, `estilos_texto`, `posiciones`, `texto_adaptable`, `ajuste_medio`, `maximo_segmentos`, `reproduccion`, `borrador`, `lienzo`).
- Duración: `duracion_ms` (código) y `clase_duracion` (clase CSS) son el mismo dato en dos formatos, igualados por una prueba.

## 6. Dependencias

- `@codeplex-sac/formularios` (deslizador), `LienzoHistoria`, `Modal`, `imagenes_historia.ts`.

## 7. Pruebas existentes

- `pruebas/inicio/flujo_historia.test.tsx` (selector de tipo, texto, foto o video con texto superpuesto, descarte, límite de 150 caracteres, regulador de tamaño, «Crear historia»/«Tu historia», miniaturas) y `visor_historias.test.tsx`, en verde el 2026-10-26.

## 8. Limitaciones conocidas

- **Almacenamiento en memoria:** `almacen_historias.ts` es una variable de módulo con suscripción; sobrevive a la navegación dentro de la sesión y se pierde al recargar. Nada llega a un servicio.
- Las fotos y videos son URL de objeto del navegador y no persisten.
- Valores en `montaje_local/index.css` con hexadecimales (degradados, fondos decorativos y degradados de legibilidad): hallazgo H2-1 pendiente.

Verificado el 2026-10-26 contra el código, los catálogos y los contratos citados (inspección estática). Las pruebas citadas se ejecutaron ese día (Inicio y Perfil: 15 archivos, 133 pruebas en verde) o se leyeron sin ejecutar si se indica. **No verificado visualmente en navegador.** Lo marcado como INFERIDO o PENDIENTE no pudo comprobarse con la evidencia disponible.
