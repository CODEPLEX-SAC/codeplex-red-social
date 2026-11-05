# Cabecera del perfil (`CabeceraPerfil`)

## 1. Identificación

- **Componente:** `CabeceraPerfil` con `FotoPerfilCabecera`, `RedesCabeceraPerfil` y `estadisticasDe`.
- **Propósito:** tarjeta superior del perfil: foto, nombre, titular, estadísticas, valoración, datos fijados, acciones de relación y redes.
- **Ubicación:** `redsocial/frontend/componentes/perfil/bloques/cabecera_perfil.tsx`, `foto_perfil_cabecera.tsx`, `redes_cabecera_perfil.tsx`, `logica_cabecera_perfil.ts`; contrato `CabeceraPerfilProps` en `redsocial/frontend/tipos/perfil/contrato_perfil.ts`.
- **Estado:** existente; rediseñada en octubre de 2026 (avatar de 80 px, línea de estadísticas con «·», valoración de la librería, icono de cámara de la librería).
- **Consumidores:** `paginas/perfil/pagina_perfil_usuario.tsx` (único).

## 2. Origen e implementación

- **Propio de CodePlex (C)**; usa `Valoracion` (oficial envuelto), `AvatarUsuario`, `Boton`, `clasesBoton`, `Menu` y `VisorMedios`.

## 3. Contrato y comportamiento

- `CabeceraPerfilProps`: `perfil`, `relacion`, `totalPublicaciones`, `amigosEnComun`, `onAlternarSolicitud`, `onEditar`, `onGuardar`.
- Estadísticas: publicaciones, amigos y, en perfil ajeno, amigos en común (`estadisticasDe`). Datos fijados (ubicación, trabajo, estudios) visibles según `perfil.detallesFijados`.
- Acciones: propio → «Editar perfil»; amigos → etiqueta «Ya son amigos»; ninguna/solicitud enviada → botón alternable; ajeno → enlace «Enviar mensaje» (`mensajeria.json › rutas.todos`). Foto propia: menú ver/elegir y selector de archivo (`foto.menu`), que guarda `avatar: URL.createObjectURL(archivo)`.

## 4. Estados

- Propio, ajeno con y sin amistad, solicitud enviada; con y sin redes (correo, LinkedIn, web; en el propio se ofrece añadir).

## 5. Configuración e integración con el sistema compartido

- `redsocial/frontend/catalogos/capacidades/redsocial/perfil.json › cabecera`, `botones`, `clases`, `foto`, `redes`.
- Iconos: `editar-oficial`, `verificado`, `marca-pequena`, `nuevo-usuario`, `mensaje`, `flecha-izquierda`, `camara`, `imagen`, `correo`, `linkedin`, `web` (ver `AUDITORIA_ICONOS_LIBRERIA_2026.md`).

## 6. Dependencias

- `Valoracion`, `VisorMedios`, `AvatarUsuario`, `Menu`, `Icono`.

## 7. Pruebas existentes

- `pagina_perfil_usuario.test.tsx` cubre las acciones por relación y el cambio de foto (en verde el 2026-10-26).

## 8. Limitaciones conocidas

- La valoración es una constante; la foto elegida no persiste; el enlace «Enviar mensaje» no abre conversación; aspecto no verificado en navegador.

Verificado el 2026-10-26 contra el código, los catálogos y los contratos citados (inspección estática). Las pruebas citadas se ejecutaron ese día (Inicio y Perfil: 15 archivos, 133 pruebas en verde) o se leyeron sin ejecutar si se indica. **No verificado visualmente en navegador.** Lo marcado como INFERIDO o PENDIENTE no pudo comprobarse con la evidencia disponible.
