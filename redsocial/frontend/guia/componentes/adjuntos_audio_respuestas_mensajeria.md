# Adjuntos, audio, respuestas y reenvío de Mensajería

Componentes propios de `componentes/mensajeria/bloques/`. No existen equivalentes en `@codeplex-sac/*`; se componen con `BotonIcono`, `Menu`, `Modal`, `CampoBusqueda`, `AvatarUsuario` e `Icono` compartidos. Toda clase, texto y formato sale de `mensajeria.json` (`conversacion.adjuntos`, `conversacion.grabacion`, `conversacion.respuesta`, `conversacion.reenviar_modal`, `clases.chat`).

## Adjuntos

| Pieza | Responsabilidad | Propiedades |
|---|---|---|
| `logica_adjuntos.ts` | Clasificación centralizada por extensión o MIME, validación (tipo y tamaño) y construcción del adjunto. `ACEPTA_IMAGENES` y `ACEPTA_DOCUMENTOS` salen de la misma lista. | `clasificarArchivo`, `errorDeArchivo`, `prepararAdjuntos`, `formatoDeAdjunto`, `pesoLegible`, `duracionLegible` |
| `botones_adjuntar.tsx` | Micrófono, clip (documentos) e imagen, con sus selectores ocultos. Selección cancelada: no hace nada. | `onAdjuntar`, `onAviso`, `onGrabar` |
| `adjunto_mensaje.tsx` | Elige la presentación por `tipo`. | `adjunto`, `propio` |
| `tarjeta_documento.tsx` | Tarjeta de PDF, Word, Excel, zip u otro: icono y tono del formato a la izquierda (sin encoger), nombre a su derecha alineado a la izquierda (máximo dos líneas con «…» y tooltip de `TextoTruncable` solo si hay recorte) y debajo extensión y tamaño; `gap-2.5`, ancho al contenido con tope `max-w-80`. **Es un enlace de descarga directa** (`<a download>`): un clic descarga, sin menú ni flecha. | `adjunto` |

**Configuración reutilizable** (`conversacion.adjuntos`): `formatos` (`pdf`, `word`, `excel`, `otro`, cada uno con `etiqueta`, `icono`, `tono`, `extensiones`, `mimes`), `tipos_imagen`, `tamano_maximo_bytes` (hoy `null`: **sin límite hasta acordarlo con backend**), `errores`, `etiquetas`. Para admitir otro formato basta añadirlo a `formatos`. Los iconos son alias oficiales (`archivo-pdf`, `archivo-word`→`article`, `archivo-excel`→`grid_on`, `archivo-generico`→`insert_drive_file`).

**Descarga.** Un archivo subido en esta sesión se descarga al hacer clic (el navegador guarda el objeto en memoria con su nombre original). Un documento de demostración sin archivo (por ejemplo el PDF de los datos iniciales) no es un enlace y lo indica con su título. La descarga desde un servidor sigue pendiente de backend.

## Audio (diseño único compartido, tres estados)

Vive en `componentes/compartido/interfaz/` para reutilizarlo fuera de Mensajería. Toda su configuración está en `compartido.json › audio` (número de barras, clases de altura, tonos, reloj y clases de cada estado); los textos accesibles los recibe por propiedades (en Mensajería salen de `mensajeria.json`). Contratos en `tipos/compartido/contrato_audio.ts`.

1. **Grabando** — `audio_grabando.tsx` (`segundos`, `picos`, `etiquetas`, `onCancelar`, `onDetener`, `onEnviar`): cancelar (X), punto rojo pulsante, temporizador, onda en vivo, detener (rojo suave) y enviar. **Detener lleva a la vista previa y no envía**; el botón de enviar detiene y envía por decisión explícita.
2. **Vista previa** — `audio_vista_previa.tsx` (`url`, `duracion`, `picos`, `semilla`, `etiquetas`, `onDescartar`, `onEnviar`): descartar, reproducir con botón redondo, onda con cursor, duración y enviar.
3. **Enviado o recibido** — `reproductor_audio.tsx` (`url`, `duracion`, `picos`, `semilla`, `propio`, `etiquetas`) con `usar_reproductor_audio.ts`: burbuja lavanda propia o blanca ajena, reproducir o pausar, onda con avance, salto por clic (control `range` invisible con `aria-valuetext`) y duración.

`onda_audio.tsx` dibuja la onda (`barrasDeOnda` en `logica_audio.ts`). Las alturas son clases del catálogo, sin estilos en línea. **Origen de la forma de onda:** en las notas grabadas son los niveles reales del micrófono (`usar_niveles_audio.ts`, AnalyserNode, resumidos a 32 barras y guardados en `AdjuntoMensaje.picos`); en audios sin niveles (archivos subidos, datos de demostración) es un patrón decorativo estable por semilla que **no representa la amplitud real**.

**Hooks genéricos** (también en `compartido/interfaz/`): `usar_grabacion_audio(mensajes)` gestiona permiso, errores (`sinSoporte`, `sinPermiso`, que le pasa el consumidor), borrador y limpieza (al descartar o desmontar detiene el micrófono y el medidor y revoca la URL), y devuelve un `GrabacionAudio { url, duracion, picos, bytes, tipo }` sin conocer el modelo de Mensajería; `usar_niveles_audio` mide el micrófono. Mensajería solo adapta ese resultado a su adjunto (`adjuntoDeGrabacion`). Configuración en `compartido.json › audio` (`grabacion`, `animacion`, `clases`, `alturas`, `barras`).

**Animación y responsive.** El punto rojo pulsa (`audio.animacion.pulso`) mientras dure la grabación y la onda muestra siempre los últimos 32 niveles (ventana deslizante), sin cursor decorativo; el cursor de progreso existe solo en la reproducción y avanza con el tiempo real del audio. Las barras comparten el ancho disponible (`flex-1`, entre 1 y 2 px) y los gaps se reducen bajo el punto de ruptura `max-600`; el temporizador y los botones no se encogen. Para llevarlo a `@codeplex-sac` basta mover estos archivos y la sección `audio` del catálogo: ningún componente importa tipos de Mensajería.

## Responder

`Mensaje.respuestaA: { mensajeId, autorId }` (contrato `RespuestaMensaje`). El menú del mensaje incluye «Responder» (icono `responder`→`reply`). `usar_contexto_composicion.ts` guarda el estado de edición y respuesta; `zona_composicion.tsx` muestra `banner_contexto.tsx` con «Respondiendo a <autor real>» y el resumen del original. La burbuja muestra la cita (`citaDeRespuesta`); si el original ya no existe, «Mensaje no disponible». Una respuesta con adjunto conserva la referencia en el primer mensaje.

## Reenviar

`modal_reenviar_mensaje.tsx` (`destinos`, `onConfirmar(ids) → boolean | void`, `onCancelar`): título «Reenviar», buscador, secciones «Recientes» y «Grupos» y una fila por destino con su botón «Enviar» (pasa a «Enviado» o muestra el error de ese destino); se cierra con la X. `reenviarMensaje` conserva contenido, adjunto (tipo, formato, URL) y marca `reenviado`; no copia la referencia de respuesta.

## Pendiente de backend (nada de esto está implementado)
Persistencia de mensajes; subida de archivos y audio; URL firmadas; descarga; límite de tamaño y tipos admitidos de producción; permisos del micrófono ligados a la sesión; endpoint de respuestas y de reenvío múltiple. Hoy todo vive en memoria del navegador y se pierde al recargar.

## Contrato listo para Backend (adjuntos, audio, respuestas, reenvíos)

El frontend ya produce y consume los datos que el servidor necesita; Backend solo implementa el almacenamiento y el servicio. No se inventó ningún endpoint.

**Qué genera el frontend por adjunto** (`AdjuntoMensaje`, `tipos/mensajeria/contrato_mensajes.ts`):

| Campo | Ejemplo | Significado |
|---|---|---|
| `nombre` | `informe_final.docx` | Nombre original del archivo |
| `mime` | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` | Tipo real informado por el navegador (en audio, el que usó `MediaRecorder`: `audio/webm` en Chrome, `audio/mp4` en Safari) |
| `bytes` | `37478` | Peso numérico exacto; `peso` (`36.6 KB`) es solo el texto para mostrar |
| `tipo` / `formato` / `extension` | `documento` / `word` / `docx` | Clasificación centralizada (`conversacion.adjuntos.formatos`) |
| `duracion` | `14` | Segundos (solo audio) |
| `picos` | `[0.1, 0.8, …]` (32 valores) | Forma de onda real de las notas grabadas, para dibujarla sin descargar el audio |
| `url` | `blob:…` | **Solo local.** Se sustituye por el `enlace` que entregue el servidor |

**Formas de datos del servidor** (`tipos/mensajeria/contrato_servidor_mensajeria.ts`): `AdjuntoServidor { id, nombre, mime, bytes, tipo, formato?, extension?, duracion?, picos?, enlace? }` y `MensajeServidor { id, conversacionId, autorId, creadoEn, contenido?, adjunto?, respuestaA?, reenviadoDe? }`. Funciones de conversión ya hechas y probadas (`logica_servidor_mensajeria.ts`): `mensajeDeServidor`, `adjuntoDeServidor` (enlace → url, bytes → peso legible) y `adjuntoParaServidor` (quita `url` local; no envía `id` ni `enlace`).

**Reglas configurables, pendientes de acuerdo con Backend** (hoy `null`, sin límite):
- `conversacion.adjuntos.tamano_maximo_bytes` en `mensajeria.json`: peso máximo por archivo. Ya se valida y avisa al elegir el archivo.
- `audio.grabacion.duracion_maxima_segundos` en `compartido.json`: al alcanzarlo la grabación se detiene sola, pasa a la vista previa y muestra «Se alcanzó la duración máxima…».
- Tipos admitidos: `conversacion.adjuntos.formatos` y `tipos_imagen`. Para aceptar un formato nuevo basta añadirlo.

**Qué debe resolver Backend:** guardar los archivos y devolver un `enlace` de descarga (idealmente firmado y temporal); persistir el mensaje con `respuestaA` y `reenviadoDe`; aceptar o convertir los formatos de audio (`webm`, `mp4`); validar tipo y peso también en el servidor; y devolver el historial con el mismo formato para que el frontend lo pinte sin cambios. Mientras tanto todo sigue en memoria del navegador.
