# Perfil de usuario (`PaginaPerfilUsuario`, pestañas, edición y relación)

## 1. Identificación

- **Componente:** `PaginaPerfilUsuario` con `ContenidoPerfil`, `PestanasPerfil`, las seis pestañas (`PestanaRedSocialPerfil`, `PestanaResumenPerfil`, `PestanaExperienciaPerfil`, `PestanaDocumentosPerfil`, `PestanaMetricasPerfil`, `PestanaAmigosPerfil`), `ModalEditarPerfil` y el hook `usarRelacionPerfil`.
- **Propósito:** mostrar el perfil propio o el de otra persona, editarlo (si es propio) y gestionar la relación de amistad.
- **Ubicación:** `redsocial/frontend/paginas/perfil/pagina_perfil_usuario.tsx`; componentes en `redsocial/frontend/componentes/perfil/bloques/` (22 `.tsx`, 5 `.ts`); datos y consultas en `rutas/perfil/rutas_perfil.ts` y `servicios/perfil/`; contratos en `redsocial/frontend/tipos/perfil/`.
- **Estado:** existente; ampliado en octubre de 2026 (experiencia y documentos con filas de estado vacío, cabecera con valoración y cámara).
- **Consumidores:** ruta `/perfil` (`rutas/compartido/rutas.tsx`); enlaces desde publicaciones, comentarios y amigos mediante `EnlacePerfilUsuario`; opción «Mi perfil» del panel de usuario de la barra superior.

## 2. Origen e implementación

- **Propio de CodePlex (C)** sobre componentes compartidos (`Pestanas`, `Boton`, `BotonIcono`, `CampoTexto`, `Modal`, `Menu`, `AvatarUsuario`, `Insignia`, `MensajeVacio`) y reutilización de Inicio (`CompositorInicio`, `ElementoFeedInicio`, `ModalCrearPublicacion`, `usarPublicacionesInicio`).
- Composición: `EstructuraApp` (`paginaActiva="perfil"`) + `EstructuraTresColumnas` (`distribucion="social"`), con `ColumnaPublicidad`, `ContactosPanel` (primeros amigos, máximo `amigos.maximo_lateral`) y `BloqueAnuncio` en la columna lateral.

## 3. Contrato y comportamiento

- Ruta: `/perfil`; parámetro de ruta `usuario` (`perfil.json › parametros_ruta`). Sin parámetro se muestra el perfil de la sesión (`usarSesionDemostracion`); con un id inexistente se muestra «No encontramos este perfil» y el enlace a Inicio.
- Pestañas (estado local `useState`, **no son rutas**): `red_social` (con subpestañas `actividad` y `preguntas`), `resumen`, `experiencia`, `documentos`, `metricas`, `amigos`.
- `usarRelacionPerfil(perfil, perfilPropio, consultas)` devuelve `esPropio`, `relacion` (`propio`, `amigos`, `solicitud_enviada`, `ninguna`), `amigosEnComun` y `alternarSolicitud`.
- Edición: `guardarEdicion(edicion)` → `ALMACEN_PERFIL.guardar(id, edicion)` (`servicios/perfil/almacen_perfil.ts`) y, si cambia el nombre, `renombrar` las publicaciones del autor. Los datos editables incluyen nombres, apellidos, titular, acerca, ubicación, datos personales, redes, detalles fijados, habilidades, experiencia, formación y documentos (`tipos/perfil/modelo_perfil.ts`).

## 4. Estados

- Perfil propio (edición, compositor, subida de documentos y cambio de foto) frente a perfil ajeno (solicitud de amistad, enlace «Enviar mensaje», sin edición ni compositor).
- Perfil inexistente; estado vacío de publicaciones y de documentos; sin amigos (no se muestra el panel de contactos).
- Relación `amigos`, `ninguna` y `solicitud_enviada` (botón con `aria-pressed`).

## 5. Configuración e integración con el sistema compartido

- Textos, clases, pestañas, campos y rutas en `redsocial/frontend/catalogos/capacidades/redsocial/perfil.json`; datos de demostración en `servicios/perfil/perfiles.json` y `metricas`.

## 6. Dependencias

- `rutas/inicio/rutas_inicio.ts` (`ALMACEN_PUBLICACIONES`), `rutas/perfil/rutas_perfil.ts`, `Valoracion`, `VisorMedios`, `EnlacePerfilUsuario`.

## 7. Pruebas existentes

- `pruebas/perfil/pagina_perfil_usuario.test.tsx` (en verde el 2026-10-26): perfil propio sin acciones de amistad; perfil ajeno con relación y amigos en común; enviar y cancelar solicitud; seis pestañas; Resumen, Experiencia, Documentos, Métricas; edición completa (nombre, categoría, redes, detalles fijados); foto; preguntas marcadas como útiles; perfil inexistente; enlace al perfil.

## 8. Limitaciones conocidas

- **Persistencia: ninguna.** El almacén de edición y las publicaciones viven en memoria del módulo; las fotos y documentos son URL de objeto del navegador y se pierden al recargar.
- La solicitud de amistad vive en `useState` y se pierde al salir de la pantalla; no hay aceptación del otro lado.
- El botón «Enviar mensaje» del perfil ajeno enlaza a `/mensajes` (no abre una conversación con esa persona).
- La calificación de la cabecera es una constante de catálogo (0 de 5, «0 reseñas»).
- Las pestañas no cambian la URL: no se puede enlazar a una pestaña concreta.
- No se verificó visualmente ninguna pantalla en esta tarea.

Verificado el 2026-10-26 contra el código, los catálogos y los contratos citados (inspección estática). Las pruebas citadas se ejecutaron ese día (Inicio y Perfil: 15 archivos, 133 pruebas en verde) o se leyeron sin ejecutar si se indica. **No verificado visualmente en navegador.** Lo marcado como INFERIDO o PENDIENTE no pudo comprobarse con la evidencia disponible.
