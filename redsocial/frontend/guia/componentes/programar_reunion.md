# Programar reunión (`FormularioProgramarReunion`)

## 1. Identificación

- **Componente:** `FormularioProgramarReunion` con `SeccionInformacionReunion`, `SeccionFechaHorario`, `SeccionInvitarParticipantes`, `SeccionAccesoReunion` y `ConfirmacionReunionProgramada`; estado en `usar_programar_reunion.ts`; reglas en `logica_programar_reunion.ts`.
- **Propósito:** programar una videollamada para una fecha futura, invitar colaboradores y obtener un enlace para unirse.
- **Ubicación:** `redsocial/frontend/componentes/mensajeria/bloques/` (`BotonProgramarReunion` → `ModalProgramarReunion` → `FormularioProgramarReunion`). Ya no existe la página ni la ruta `/mensajes/videollamadas/programar`: se abre como ventana desde el panel de videollamadas.
- **Estado:** **nuevo** (noviembre de 2026); desde 2026-11-11 es una ventana (modal) en la misma página, no una ruta. Se abre con «Programar reunión» en Mensajes > Videollamadas.

## 2. Origen e implementación

- **Propio de CodePlex** sobre componentes de la librería envueltos: `SelectorFecha` y `SelectorHora` (con `CodeplexProveedorFechas`), `Selector` (zona horaria), `Casilla`, `CampoTexto` (nombre y descripción de hasta 500 caracteres), `CampoEtiquetado`, `CampoBusqueda`, `AyudaContextual`, `AvatarUsuario`, `Boton`, `BotonIcono`.
- Textos, clases, zonas horarias y límites en `mensajeria.json › videollamada.programar`.

## 3. Comportamiento

- **Validación** (`validarBorrador`): nombre obligatorio, fecha y horas obligatorias, hora de fin posterior a la de inicio y fecha/hora de inicio futuras. Al cambiar la hora de inicio, si la de fin deja de ser posterior se ajusta a una hora después. La duración se calcula y se redacta («1 hora», «1 h 30 min»).
- **Invitados:** el buscador usa a los **colaboradores** de la red (`contactosInvitables`, con su cargo); cada resultado tiene el botón «Invitar» y quien ya está invitado no vuelve a aparecer. Si no hay coincidencias se ofrece «Invitar a «texto»». La lista «Colaboradores invitados (n)» es plegable y permite quitar. Las fotografías salen del perfil.
- **Programar:** `programarReunion` guarda la reunión **en memoria** (se pierde al recargar la página), genera su identificador y un enlace `…/mensajes/videollamadas/en-curso?reunion=<id>`, y la reunión aparece de inmediato en «Reuniones programadas». «Copiar enlace» usa el portapapeles del navegador.
- **Unirse con el enlace:** `resolverReunionEnSala(id)` reconoce las reuniones creadas (organizador más invitados) y abre la sala con su título y horario.

## 4. Pendiente de backend

- La persistencia de la reunión, la generación del enlace en el servidor, el envío de invitaciones y la admisión de participantes (opción «Solicitar admisión»): hoy solo se guardan las preferencias; no hay servicio que las aplique.
- La zona horaria se guarda como dato; la hora no se convierte entre zonas.

## 5. Pruebas

- `pruebas/mensajeria/programar_reunion.test.tsx` (lógica, almacén y enlace, formulario, validación, buscador de amigos, confirmación con copia del enlace, entrada a la reunión y botón del panel).

Verificado el 2026-11-11 contra el código y en navegador (escritorio y móvil, incluido el selector de fecha de la librería).


## 6. Cambios de 2026-11-11

- Ventana en lugar de página; sin el recuadro de enlace en «Configuración de acceso» (el enlace se muestra al programar).
- Fecha y zona horaria comparten fila con los controles alineados por su base; hora de inicio, de fin y duración, en la siguiente.
- Al programar o crear una reunión, la lista de reuniones se actualiza (`usarVersionReuniones` sobre `suscribirReuniones`).
