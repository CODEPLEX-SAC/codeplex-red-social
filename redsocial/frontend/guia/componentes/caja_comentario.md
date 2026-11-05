# Caja de comentario (`CajaComentario`)

## 1. Identificación

- **Componente:** `CajaComentario` (con `PanelEmojisComentario`, `MiniaturasMediosComentario`, `MediosComentario` y el hook `usarCajaComentario`).
- **Propósito:** caja única para escribir un comentario, una respuesta o editar un comentario propio en Inicio. Estructura tomada de la red social anterior (`InputComentario` / `ItemComentario`); el diseño visual es el de CodePlex.
- **Ubicación:** `redsocial/frontend/componentes/inicio/bloques/caja_comentario.tsx` y archivos vecinos (`usar_caja_comentario.ts`, `logica_caja_comentario.ts`, `panel_emojis_comentario.tsx`, `miniaturas_medios_comentario.tsx`, `medios_comentario.tsx`).
- **Estado:** nuevo (2026-10-23).
- **Consumidores:** `SeccionComentariosPublicacion` (comentar), `FormularioRespuestaComentario` (responder) y `FormularioEdicionComentario` (editar).

## 2. Origen e implementación

- **Origen:** envuelve `CampoTexto` (`CodeplexCampoTexto` de `@codeplex-sac/formularios`) con la configuración sin borde `controles.campo_texto_editor`; el borde, el radio y el foco los pone la caja contenedora (`inicio.json › publicacion.comentarios.clases.caja`).
- **Estructura (de arriba abajo):** fila de texto (con `@Nombre` en la misma fila al responder) → miniaturas de los archivos adjuntos → fila inferior con emoji y «Foto / Video» a la izquierda y enviar a la derecha → panel de emojis (se abre bajo la fila).
- **Comportamiento:** Enter envía y Mayús+Enter baja de línea; Esc cancela (respuesta y edición); Ctrl+V pega imágenes o videos del portapapeles; un único selector de archivos acepta `image/*,video/*` (máximo y tamaño de `modal_crear_publicacion.medios`).
- **Edición:** conserva los archivos del comentario, permite quitarlos o añadir otros y muestra «Pulsa Esc para cancelar» con el enlace «cancelar».
- **Dependencias:** `CampoTexto`, `BotonIcono`, `Boton`, `VisorMedios` (imágenes publicadas) y los textos y clases de `inicio.json › publicacion.comentarios`.
- **Elementos HTML nativos:** `<form>`, `<input type="file" hidden>`, `<video>`.

## 3. Contrato

`CajaComentarioProps`: `marcador`, `etiqueta`, `etiquetaEnviar`, `textoInicial?`, `mediosIniciales?` (si se pasa, la caja entrega siempre la lista de archivos, también vacía), `autoFoco?`, `mencion?`, `onEnviar(texto, medios?)`, `onCancelar?`.

## 4. Diseño visual

- Caja: borde 1 px `borde`, radio 18 px (`rounded-18`, token `--radius-18`), fondo de tarjeta, relleno 14 px horizontal / 8 px arriba / 6 px abajo; el borde pasa a `primario` con el foco dentro.
- Miniaturas de 72 px de alto con botón × de 24 px en la esquina; en el comentario publicado los archivos miden como máximo 280 × 180 px y las imágenes se abren en el visor.
- Burbuja en modo edición: transparente y a todo el ancho, como en la red social anterior.
- Valores calculados del código fuente anterior; no se midieron en el navegador.

## 5. Integración con el sistema compartido

- Fuente de verdad de textos y clases: `inicio.json › publicacion.comentarios`.
- Los emojis salen de `comentarios.emojis` (lista fija, sin librería nueva).
- Iconos: `sentimiento` (emoji), `imagen` (Foto / Video), `enviar`, `cerrar`.

## 6. Historial de modificaciones

- 2026-10-23: creación; reemplaza al campo de una línea con botón «Publicar» y a los formularios de respuesta y edición anteriores.
- 2026-10-23: el `@Nombre` pasa a la misma fila del texto; se elimina el icono de video adicional; se añade pegado con Ctrl+V y edición con archivos.

Verificado el 2026-10-23 contra el código y los catálogos citados; no verificado en navegador.
