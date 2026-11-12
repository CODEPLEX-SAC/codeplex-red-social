# Grupos: creación, menú y página de la comunidad

## Alcance (2026-11-11)

- Pestañas y rutas sin cambios: Mis grupos `/grupos`, Descubrir `/grupos/descubrir`, Invitaciones `/grupos/invitaciones`.
- Nueva ruta de detalle `/grupos/detalle?grupo=<id>` (el enrutador resuelve rutas exactas, por eso el identificador va en el parámetro `grupo` y no como `/grupos/:id`). El `id` es el nombre del grupo en minúsculas, sin tildes y con guiones (`idDeGrupo`).
- Los grupos son comunidades públicas: no hay selector ni texto de privacidad o visibilidad. Se retiró el prefijo «Grupo privado/público» de los datos de demostración.

## Componentes (`componentes/grupos/bloques`)

- `BotonCrearGrupo` → `ModalCrearGrupoComunidad` (hook `usar_crear_grupo_comunidad.ts`): nombre obligatorio, casilla «Invitar a seguidores», «Crear grupo». Distinto de `ModalCrearGrupo` de Mensajería.
- `MenuGrupo` (hook `usar_menu_grupo.ts`, lógica `logica_menu_grupo.ts`): Ver solicitudes de miembros, Estado del grupo, Tu contenido, Compartir, Administrar notificaciones, Fijar grupo, Abandonar grupo (solo miembro) y Eliminar grupo (solo administrador). Sin «Pausar grupo».
- `DetalleGrupoVista`: `PortadaGrupo`, `PestanasDetalleGrupo` (Conversación, Miembros, Eventos, Archivos multimedia, Archivos), `ContenidoPestanaGrupo`, `PanelConfiguracionGrupo` (solo administrador) e `InformacionGrupo` (descripción, creación, miembros, administradores, actividad).
- Reutiliza: `Modal`, `CampoEtiquetado`, `CampoTexto`, `Casilla`, `Menu`, `Pestanas`, `Boton`, `BotonIcono`, `SuperficieColor`, `GrupoAvatares`, `MensajeVacio`.

## Pendiente de backend (no se simula)

| Operación | Estado | Punto de integración |
|---|---|---|
| Crear grupo | Valida el nombre y avisa «no disponible»; no crea nada | servicio de grupos (`crear`, permiso `GRUPOS_CREAR`) |
| Invitar a seguidores | No existe fuente de seguidores del perfil (`SEGUIDORES_DISPONIBLES = false` en `servicios/grupos/detalle_grupos.ts`) | servicio de seguidores del usuario + invitaciones de grupo |
| Invitar, portada, descripción, publicación | Aviso «no disponible» | servicio de grupos |
| Ver solicitudes, estado, tu contenido, notificaciones, fijar, abandonar, eliminar | Aviso «no disponible» | servicio de grupos |
| Compartir | Copia el enlace del grupo al portapapeles (operación real del navegador) | — |
| Miembros, eventos, archivos multimedia y archivos | Estados vacíos informativos | servicio de grupos |

## Rediseño (2026-11-11, capturas de referencia)

- Pestañas: **Todos** (`/grupos/descubrir`, contenido de Descubrir sin cambios), **Tus grupos** (`/grupos`) y **Sugerencias** (`/grupos/sugerencias`). Ya no existe la pestaña Invitaciones.
- **Tus grupos** (`SeccionTusGrupos`): buscador, orden (Más recientes, Más antiguos, Nombre), «Todos los grupos a los que te has unido (n)», tarjetas de 3 columnas con miniatura, «Última visita», «Ver grupo» y menú «⋯», y paginación (6 por página). Incluye los grupos que administras. Datos de demostración en `servicios/grupos/visitas_grupos.json`.
- **Sugerencias** (`SugerenciasGrupos`): buscador, selector de categorías, «Sugerencias para ti» y «Más sugerencias» en 5 columnas, con «Unirme al grupo» (avisa que el servicio no está disponible). Datos de demostración en `servicios/grupos/sugerencias_grupos.json`.
- **Crear grupo**: ilustración reservada (bloque vacío para la imagen futura), nombre obligatorio, descripción opcional (0/300) e interruptor «Invitar a seguidores».
- Menú de «⋯»: miembros ven Tu contenido, Compartir, Administrar notificaciones, Fijar grupo y Abandonar grupo; administradores ven además Ver solicitudes y Estado, y Eliminar en lugar de Abandonar.
- Los banners de las capturas («Grupos sugeridos para ti», «Tus grupos») no se muestran, por indicación.

## Cambios del 2026-11-11 (página del grupo y pestañas)

- Pestañas: **Tus grupos** (`/grupos`, solo grupos de los que eres miembro), **Sugerencias** (`/grupos/sugerencias`) y **Grupos que administras** (`/grupos/administras`, grupos creados por Pedro Lozano). Se eliminó «Todos». La ruta `/grupos/administras` reutiliza la clave de ruta `descubrir`.
- Grupo creado por Pedro Lozano: «Desarrollo Web con Python» (imagen `python.jpg`), primero de «Grupos que administras».
- Página del grupo (`/grupos/detalle?grupo=<id>`): portada con «Editar portada» (solo administrador), imagen, nombre, «Grupo · N miembros», Invitar, Compartir y menú «⋯», pestañas, publicador («¿Qué quieres compartir con el grupo?»), publicación de bienvenida, guía «Completa la configuración de tu grupo» (0 de 3 pasos, solo administrador, se puede cerrar) e «Información del grupo». Publicar, invitar, editar portada y los pasos de configuración avisan que el servicio no está disponible.
- Los grupos que no tienen imagen propia alternan `descargas-drive.jpg` y `data-analytics.jpg` de forma provisional.

## Ajustes de la página del grupo (2026-11-11)

- Portada contenida (ancho máximo, esquinas redondeadas y recorte centrado) con «Editar portada» y el icono de editar de la librería. Sin menú «⋯» junto a Invitar y Compartir: la lupa de búsqueda y el menú del grupo están en la misma fila que las pestañas.
- Guía «Termina de configurar tu grupo» con 4 pasos (invitar, portada, descripción, publicación). «Información del grupo» no cambia.
- La publicación reutiliza `CabeceraPublicacion` y `MarcoPublicacion` de Inicio, con menú «⋯»: Fijar en destacados, Editar, Guardar publicación y Eliminar (avisan que el servicio no está disponible).
- Pestañas: **Archivos multimedia** (Fotos, Vídeos, Álbumes; «Crear álbum» y «Añadir fotos o vídeos» para administradores), **Miembros** (lista, administradores, voces destacadas y nuevos miembros) y **Archivos** (se pueden elegir archivos del equipo; solo se listan en pantalla, no se suben porque falta el servicio).
- El número de miembros sale de la lista de miembros que se puede mostrar (no hay otra fuente): «Desarrollo Web con Python» tiene 1 miembro; los grupos de los que eres miembro tienen 2 (su administrador y tú).

## Publicar y votación (2026-11-11)

- En los grupos de los que eres miembro, el compositor dice «Escribe algo...» y solo ofrece Foto/video y Encuesta. En los grupos que administras conserva «¿Qué quieres compartir con el grupo?» con sus cuatro acciones; en ambos, el campo principal, Foto/video y Encuesta abren `ModalCrearPublicacion` de Inicio.
- Publicar desde un grupo no guarda nada: avisa que el servicio no está disponible.
- Votación (`BloqueOpcionesEncuesta`, compartido con Inicio): título «Añadir votación» (sin «mínimo 2»), botón gris «+ Añadir opción» y, a su lado, el botón de ajustes con «Permitir que las personas elijan varias respuestas» y «Permitir que cualquiera añada opciones». Esos ajustes quedan solo en el borrador: todavía no cambian cómo se vota ni se envían al guardar.

## Modo de demostración local (2026-11-11) — sustituye a los avisos de «no disponible»

Las interacciones de Grupos funcionan con un almacén **en memoria** (`servicios/grupos/almacen_grupos.ts`, expuesto como `PUERTO_GRUPOS`). Se pierde al recargar la página y **no representa datos guardados en Backend**; ningún mensaje afirma lo contrario.

| Interacción | Estado |
|---|---|
| Crear grupo (nombre obligatorio, descripción) | Demostración local: aparece en «Grupos que administras» (no en «Tus grupos») y se puede abrir su página |
| Editar grupo (menú «Editar grupo» o paso «Añadir una descripción») | Demostración local |
| Unirse (Sugerencias) / abandonar | Demostración local: pasa a «Tus grupos» y puede volver a Sugerencias |
| Fijar / dejar de fijar grupo | Demostración local (los fijados van primero) |
| Eliminar grupo (administrador) | Demostración local, con confirmación |
| Publicar, editar, eliminar, comentar, responder, reaccionar, compartir publicaciones | Demostración local con el almacén y los componentes de Inicio (`usarPublicacionesInicio`), uno por grupo |
| Tu contenido (menú) | Solo las publicaciones propias del grupo, más recientes primero, «Ver en el grupo»; estado vacío «No hay publicaciones para mostrar» (ilustración provisional) |
| Administrar notificaciones, Estado del grupo, Solicitudes de miembros | Ventanas locales (preferencia en memoria, resumen con datos del almacén, lista vacía) |
| Invitar personas | Prepara invitaciones con las personas de la red existente; **no se envían** («Invitación preparada») |
| Cambiar portada | Muestra la imagen elegida solo en esta sesión |
| Subir archivos | Se listan en pantalla; no se suben |
| Compartir grupo / copiar enlace | Real: copia al portapapeles el enlace de la aplicación |
| Seguidores del perfil | Sin fuente de datos: el interruptor muestra que todavía no hay seguidores para invitar |

Pendiente de Backend: persistir grupos, membresías, publicaciones, comentarios, invitaciones enviadas, solicitudes reales, notificaciones y archivos. Punto de conexión: sustituir `PUERTO_GRUPOS` (`PuertoGrupos`, `tipos/grupos/contrato_puerto_grupos.ts`) por un adaptador real; las páginas y componentes solo conocen el puerto.

Videollamadas: «Finalizar para todos» en modo demostración cierra solo la sala local; la expulsión y el silenciado remotos siguen sin afirmarse sin servicio.

## Portada por defecto, vista de miembro y compartir (2026-11-11)

- Crear grupo: la ventana muestra `crear-grupo.png` como vista previa y el grupo creado usa esa imagen como imagen y portada por defecto (se puede cambiar después con «Editar portada»).
- Vista de miembro (grupos que no administras): pestañas Información, Conversación, Miembros, Eventos, Archivos multimedia y Archivos; fila de avatares de miembros; botones Invitar, Compartir y «Eres miembro» (Administrar notificaciones, Seguir/Dejar de seguir el grupo, Abandonar grupo); columna derecha con «Información del grupo» y «Archivos multimedia recientes» (imágenes del proyecto). Sin guía de configuración. El seguimiento es solo local.
- Compartir el grupo (botón Compartir) abre el diálogo de compartir de Inicio en modo simple: usuario, comentario, vista previa y «Compartir» (se agrega como publicación compartida al feed de Inicio, en memoria).
- Diálogo de compartir de Inicio (`DialogoCompartirPublicacion`, usado también en Grupos): «Compartir en» con Historia, Copiar enlace, Grupo y Perfil de un amigo.
  - Historia: comparte en el feed con el comentario (comportamiento anterior).
  - Copiar enlace: copia al portapapeles la dirección actual.
  - Grupo: lista de grupos (los de `PUERTO_GRUPOS`), «Crear publicación» con etiquetar a una persona y emoji (sin imágenes) y «Publicar»; agrega la publicación compartida al grupo, en memoria.
  - Perfil de un amigo: lista de amigos y «Compartir»; no existe un almacén de perfiles de amigos, así que solo se confirma en pantalla y se aclara que no se envió ninguna notificación.
  - Los destinos llegan por `ProveedorDestinosCompartir` (Inicio y página del grupo); sin proveedor las listas quedan vacías.

## Cantidad de miembros (2026-11-11)

- Los grupos que administras ya creados tienen 20 miembros; un grupo nuevo, 1 (el creador). Los grupos a los que te unes tienen al menos 30 (los de la lista, entre 30 y 9.500, más los que te unes desde Sugerencias, con el total de la tarjeta).
- Como en Facebook, la lista muestra como máximo 30 personas (`limiteListado`) y el total se indica aparte («Miembros · 9.500», «Mostrando 30 de 9.500 miembros»); la fila de avatares se limita a 12.
- Las personas de demostración salen del conjunto existente de perfiles, amigos y colaboradores del proyecto (sin repetidos). Los totales mayores que la lista son cifras de demostración.

## Compartir publicación: sin vista previa e Historia real (2026-11-11)

- El diálogo de compartir ya no muestra la vista previa de la publicación original, ni en el paso principal ni en «Crear publicación».
- Historia: crea una historia propia (texto con el autor, el contenido y tu comentario) en el almacén de historias de Inicio; aparece en tu carrusel de historias. Si no hay almacén de historias disponible (p. ej. en Perfil), comparte en el feed como antes.
- Las listas de Grupo y Perfil de un amigo tienen la misma altura fija.

## Columna «Administrar grupo» (2026-11-12)

- Contenedor: `AdministracionGrupo` envuelve a `DetalleGrupoVista` en `pagina_grupos_detalle.tsx` (EstructuraApp, sidebar global y `DetalleGrupoVista` no cambian). La columna (`NavegacionAdministracionGrupo`) queda junto al sidebar global y antes del contenido del grupo.
- Visibilidad: solo si `PUERTO_GRUPOS.detalle(id).rol === 'administrador'` para el grupo de la ruta; miembros, grupos inexistentes y el rol general de la sesión no la activan. No hay moderadores en el modelo, por eso no se muestran.
- Contenido: identidad del grupo (imagen, nombre, «Administrador»), cuatro categorías contraíbles y 12 opciones. «Inicio de la comunidad» muestra el grupo habitual (se mantiene montado para no perder su estado). «Solicitudes de miembros» y «Configuración del grupo» reutilizan `ModalGestionGrupo` y la edición existente.
- Vistas locales de demostración (con la etiqueta «Datos de demostración», sin afirmar guardado en servidor): Resumen (miembros, publicaciones, comentarios y reacciones reales del almacén local), Preguntas para miembros (añadir y quitar), Publicaciones pendientes y programadas y Alertas de moderación (acciones locales con estado vacío), Registro de actividad, Roles y permisos (administrador y miembro, con sus cantidades), Crecimiento e Interacción (barras).
- Responsive: escritorio y tableta con columna lateral de ancho fijo (más estrecha bajo 1250px); bajo 900px la columna se oculta y el botón «Administrar grupo» la despliega como panel sobre el contenido.
