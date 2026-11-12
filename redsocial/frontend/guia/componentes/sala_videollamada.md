# Sala de videollamada (`SalaVideollamada`)

## 1. Identificación

- **Componente:** `SalaVideollamada` (composición) con `BarraSuperiorSala`, `CuadriculaParticipantes`, `TarjetaParticipante`, `EscenarioPresentacion`, `BarraControlesSala`, `PanelParticipantesSala` (con `ListaParticipantesSala` y `FilaParticipanteLlamada`), `PanelChatSala`, `SelectorDemostracion` y `VideoFlujo`.
- **Propósito:** sala de videollamada activa de Mensajes: reunión individual, reunión con varios participantes, pantalla compartida y paneles laterales. Sustituye a `BloqueEnLlamada`, `BloqueMicrofono`, `ControlLlamada` y `SeccionParticipantes` (eliminados).
- **Ubicación:** `redsocial/frontend/componentes/mensajeria/bloques/` (`sala_videollamada.tsx` y los archivos citados); estado en `usar_sala_llamada.ts`, `usar_invitaciones.ts` y `usar_flujo_video.ts`; lógica en `logica_sala_llamada.ts`.
- **Contratos:** `redsocial/frontend/tipos/mensajeria/contrato_sala_llamada.ts` (props) y `contrato_integracion_llamada.ts` (puertos y modelos de integración).
- **Estado:** **nuevo** (noviembre de 2026).
- **Consumidores:** `paginas/mensajeria/pagina_mensajes_videollamada_en_curso.tsx` (único hoy). La composición no depende de la página: recibe la reunión, el generador de participantes y el puerto por props.

## 2. Origen e implementación

- **Propio de CodePlex.** Reutiliza `Boton`, `BotonIcono`, `Tooltip` (envoltorio nuevo de `CodeplexTooltip`), `Menu`, `Pestanas`, `CampoBusqueda`, `CampoTexto`, `Selector`, `AvatarUsuario`, `Icono`.
- Las clases y los textos salen de `catalogos/capacidades/redsocial/mensajeria.json › videollamada` (`textos`, `clases.sala`, `columnas`, `tamano_pagina`, `cantidades_demostracion`, `modo_demostracion`).

## 3. Contrato y comportamiento

- `SalaVideollamadaProps`: `reunion`, `puerto` (`PuertoSala`), `generar(cantidad)`, `contactos`, `enlaceReunion`, `imagenPresentacion`, `maximoParticipantes`.
- **Participantes:** `ParticipanteSala` (`id`, `nombre`, `rol`, `local`, `organizador`, `enLinea`, `invitado`, `micActivo`, `camaraActiva`, `hablando`, `fotografia`). `TarjetaParticipante` recibe además `flujo: MediaStream | null`: si existe y la cámara está activa se muestra el vídeo real en el mismo espacio; si no, la fotografía del perfil.
- **Distribución:** 1 participante: una columna; 2 a 4: dos columnas; 5 o más: tres columnas (`columnasPara`); más de 9 se pagina (`tamano_pagina`). En móvil las filas tienen altura fija y la lista se desplaza.
- **Pantalla compartida real:** el botón «Compartir pantalla» llama a `PuertoSala.compartirPantalla()`, que ejecuta `navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })`. **No hay modal propio:** el selector de pestaña, ventana o pantalla completa (y el audio de pestaña cuando existe) es el del navegador. Resultados contemplados: cancelación o falta de permiso (`NotAllowedError` → `cancelado`), `SecurityError` → `sin_permiso`, `NotFoundError` → `no_disponible`, API ausente → `no_soportado`, otros → `error`; cada uno con su mensaje en `textos.sala.errores_captura`.
- **Durante la presentación:** `EscenarioPresentacion` muestra el flujo capturado (`object-contain`, sin recortes), la barra «Estás compartiendo tu pantalla» y «Dejar de compartir». El panel de participantes se abre solo en pantallas de 1100 px o más (`consulta_panel_lateral`) y se puede cerrar sin afectar la captura.
- **Detener:** `detenerPresentacion` y la detención desde los controles del navegador (evento `ended` de la pista de vídeo) llaman a `PuertoSala.detenerPantalla()` (detiene y libera todas las pistas) y devuelven la sala a la distribución anterior. Al desmontar la sala también se libera la captura.
- **Fotografías:** cada `fotografia` proviene del perfil de la Red Social: `perfil.avatar || imagenRedSocialDe(perfil.id)`, la misma lógica de `CabeceraPerfil`. No existe una segunda fuente de fotos para videollamadas. Hoy solo Pedro Lozano tiene fotografía registrada; el resto usa el avatar predeterminado (`usuario.jpg`).

### Interacciones de participantes, mano levantada y menú «Más» (2026-11-11)

- **Menú de tres puntos de cada persona (panel «Personas»):** todos los usuarios ven «Fijar en mi pantalla» y, una vez fijada la persona, «Dejar de fijar». La fijación es **local a la vista de quien la activa** (estado `fijado` en `usar_sala_llamada`, sin ningún efecto en la reunión ni en otros participantes): la persona fijada ocupa el área principal y **todas las demás** pasan a una columna lateral de miniaturas con desplazamiento (en tableta y móvil, a una tira horizontal), sin paginación ni espacios vacíos. Con una presentación activa, la presentación mantiene la prioridad; la fijación se conserva y se aplica al terminarla. El presentador no es un participante adicional, por lo que no cambia el contador.
- **Permisos de moderación:** solo el organizador (participante local con `organizador: true`) ve «Silenciar participante» y «Quitar de la llamada», y nunca sobre sí mismo. Las acciones llaman a `PuertoSala.silenciarParticipante` / `quitarParticipante`; **solo si el puerto responde `exito` se actualiza el estado** (micrófono apagado o participante retirado). Hoy el adaptador devuelve `no_disponible` y la interfaz informa «requiere el servicio de la sala, aún no conectado» sin cambiar nada.
- **Levantar la mano:** vive en el menú «Más», no en la barra. El texto alterna «Levantar la mano» / «Bajar la mano»; muestra un indicador en la tarjeta y en el panel, y el panel indica «Manos levantadas: n». Es **estado local**: para sincronizarlo entre participantes hace falta la señalización (pendiente de WebRTC/backend).
- **Menú «Más»:** exactamente tres opciones: Levantar/Bajar la mano, «Mensajes en la llamada» (abre y cierra el mismo `PanelChatSala`) e «Informar un problema» (`ModalInformarProblema`: el informe queda «preparado»; con `PuertoSala.informarProblema` conectado pasa a «enviado»).
- **Finalizar:** el organizador ve un menú con «Salir de la llamada» (abandonar) y «Finalizar para todos» (`PuertoSala.finalizarParaTodos`; sin servicio informa el motivo y no cierra la reunión). Los demás solo abandonan.
- **Panel «Personas» (como Meet):** título «Personas (n)», buscador «Buscar contactos», etiqueta «En la reunión» y secciones plegables (`Acordeon` compartido, todas cerradas al abrir): «Levantaron la mano» (solo si hay), «Colaboradores» y «También invitados», cada una con su conteo. Quien tiene la mano levantada aparece solo en su sección. Sustituye a las pestañas Todos / En línea / Invitados.
- **Participantes de prueba:** la sala predeterminada (`/en-curso`) inicia con 20 (`cantidad_predeterminada`): los 15 del modelo más personas existentes de la red (`participantesDesdePerfiles`), siempre con su fotografía de perfil; no se inventan nombres. Las reuniones con identificador, la llamada directa y «Nueva reunión» conservan su tamaño. El selector admite hasta 20.
- **Estado inicial de micrófono y cámara:** la preparación enlaza a la sala con `?microfono=0|1&camara=0|1` (`parametros_ruta.microfono` y `camara`; valores en `videollamada.estado_activo` y `estado_inactivo`) y la sala (`microfonoInicial`, `camaraInicial`) inicia en ese estado. Sin parámetros inicia con ambos activos.
- **Salida (2026-11-11):** el organizador que pulsa «Salir de la llamada» (barra superior o inferior) ve la ventana «¿Quieres finalizar la llamada o solo abandonarla?» (`ModalSalirLlamada`) con «Solo abandonar la llamada» y «Finalizar la llamada para todos». Finalizar para todos usa `PuertoSala.finalizarParaTodos`; sin servicio informa el motivo y no cierra la reunión. Quien no es organizador abandona directamente.
- **Responsive:** la barra conserva los ocho controles en escritorio, tableta y móvil (por debajo de 600 px los botones se compactan y la barra ocupa todo el ancho, sin desplazamiento horizontal). Por debajo de 1100 px el panel «Personas» es una superficie sobre el área de contenido que deja visible la barra inferior y se desplaza por dentro.
- **Icono nuevo:** `mano` → `pan_tool` de `CodeplexIcono` (registrado en `compartido.json › iconos`, `nombres_iconos` e `iconos_libreria`).

### Reunión instantánea con un solo participante (2026-11-11)

- Cuando la sala solo tiene al organizador (`modo=reunion`), el escenario es `TarjetaSolitaria`: fondo `degradado-nocturno-profundo` con su fotografía de perfil difuminada (el mismo fondo y la misma imagen de la tarjeta de participante), foto circular grande, nombre, insignia «Organizador», el aviso «Estás solo en la reunión…», botón de pantalla completa y píldoras de «Micrófono/Cámara desactivada» (en rojo cuando están apagados). Con cámara activa y flujo disponible se muestra el vídeo.
- Cabecera oscura: marca, título «Reunión instantánea» con icono de información (el horario va en su tooltip) y temporizador. La página usa `bg-fondo-escenario`.
- Barra inferior: «Detalles de la reunión» (`DetallesReunionSala`, desplegable con título, horario, participantes y enlace) a la izquierda y los 8 controles, con insignia de conteo en «Participantes».
- Panel «Personas»: abierto al entrar solo en pantallas anchas, botón «Agregar personas», buscador «Buscar contactos de la red…», sección «En la reunión» y cuadro «Enlace de la reunión» con botón para copiar (reemplaza a «Invitar por enlace»).
- Nuevo icono `pantalla-completa` (`fullscreen`). El título del servicio `reunionNueva` pasa a «Reunión instantánea».

### Crear reunión para más tarde y ventana de salida (2026-11-11)

- En «Videollamadas», «Nueva reunión» fue reemplazada por «Crear reunión para más tarde» (`BotonReunionMasTarde`, hook `usar_reunion_mas_tarde.ts`). Al pulsarla se crea una reunión en el almacén en memoria (`crearReunionParaMasTarde`) y se abre `ModalEnlaceReunion` con el enlace para copiar; ese enlace abre la sala de esa reunión.
- `ModalSalirLlamada` se rediseñó: título alineado a la izquierda con la X, texto y dos botones a ancho completo («Finalizar la llamada para todos» y «Solo abandonar la llamada»).
- «Finalizar para todos» llama a `PuertoSala.finalizarParaTodos`; el adaptador del navegador no tiene servicio de sala y responde `no_disponible`, así que la sala muestra el aviso y no sale. No se simula el éxito.

## 4. Estados

| Estado | Cómo se obtiene |
|---|---|
| Reunión individual | `/mensajes/videollamadas/en-curso?modo=reunion` (solo el organizador) o selector de demostración en 1 |
| Reunión con varios participantes | `/en-curso` (15), `?reunion=<id>` o `?contacto=<nombre>` (2) |
| Compartir pantalla | botón «Compartir pantalla» (captura real) |
| Pantalla compartida con panel de participantes | tras iniciar, en pantallas de 1100 px o más; o el botón «Participantes» |
| Cámara desactivada | control de cámara: fotografía de perfil protagonista y texto «Cámara desactivada» |
| Micrófono desactivado | control de micrófono: icono `microfono-apagado` (`mic_off` de `CodeplexIcono`), fondo de advertencia e indicador en el participante |

## 5. Integración con el sistema compartido

- **Iconos:** `microfono-apagado` se resuelve a `mic_off` de `CodeplexIcono` por `Icono`; `video-apagado` es el SVG existente de `recursos/iconos/video-apagado.svg`. No se descargó ningún icono nuevo ni se instaló una librería.
- **Variantes añadidas a `BotonIcono`:** `llamada`, `llamada_alerta`, `llamada_fin` y tamaño `llamada` (`compartido.json › boton_icono_variantes / boton_icono_tamanos`).
- **Colores y tipografía:** solo tokens globales (`primario`, `peligro-texto`, `exito`, `overlay-*`, `degradado-nocturno-profundo`) e Inter.

## 6. Puertos de integración (WebRTC y backend)

- `PuertoSala` (`flujoDe`, `compartirPantalla`, `detenerPantalla`, `invitar`, `copiarEnlace`) y `PuertoDispositivos` (preparación). Adaptadores actuales: `servicios/mensajeria/sala_navegador.ts` (captura de pantalla y portapapeles reales; `invitar` devuelve `no_disponible`) y `servicios/mensajeria/dispositivos_navegador.ts`.
- **Para conectar WebRTC:** implementar `PuertoSala.flujoDe(idParticipante)` para devolver la pista de vídeo de cada participante; `TarjetaParticipante` la reproduce sin cambios en la distribución. Los participantes reales sustituyen a `generar` (hoy `participantesDemostracion`).
- **No se inventan** endpoints, eventos de señalización ni contratos del backend.

## 7. Modo de demostración

- `catalogos/.../mensajeria.json › videollamada.modo_demostracion` (`true`). Muestra un aviso, el selector «Participantes de prueba» (1, 2, 3, 4, 6, 9, 15; limitado a personas existentes en los datos) y simula micrófono y cámara de los participantes con sus fotografías de perfil, **sin transmisión**; la tarjeta lo indica («Sin transmisión de vídeo (demostración)»).
- La presentación simulada (`imagen` de `carrusel1.jpg`) solo aparece cuando el navegador no tiene `getDisplayMedia`; si existe, siempre se muestra la captura real.
- Para desactivarlo: `modo_demostracion: false` (no se muestran el aviso ni el selector ni la presentación simulada).

## 8. Pruebas existentes

- `pruebas/mensajeria/videollamada_interfaz.test.tsx`: distribución, paginación, fotografías de perfil, estados de micrófono y cámara, panel de participantes, captura real simulada con `getDisplayMedia` (inicio, parada desde CodePlex, parada desde el navegador, cancelación, contenido no disponible y navegador sin soporte), chat local y la pantalla de preparación.
- `reunion_seleccionada.test.tsx` y `videollamadas_listas.test.tsx` se adaptaron al panel de participantes.

## 8. Limitaciones conocidas

- No hay transmisión de vídeo ni audio entre participantes, ni señalización ni invitaciones (las invitaciones quedan «preparadas»).
- El chat es local; silenciar, quitar, finalizar para todos e informar un problema dependen de servicios aún no conectados (los puertos existen y la interfaz no simula el resultado). La mano levantada y la fijación son locales.
- El selector nativo de pantalla no puede automatizarse en las pruebas: se simula la respuesta de `getDisplayMedia`; el diálogo lo muestra el navegador.
- Solo un perfil tiene fotografía real; no se inventan fotografías para los demás.

Verificado el 2026-11-11 contra el código y en navegador (escritorio, tableta y móvil) con una captura simulada mediante `canvas.captureStream()`; **no verificado** con el selector nativo de pantalla del navegador ni con transmisión real.
