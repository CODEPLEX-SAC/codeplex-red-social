# Enlace al perfil de usuario (`EnlacePerfilUsuario`, `rutaPerfilUsuario`)

## 1. Identificación

- **Componente:** `EnlacePerfilUsuario` y la función `rutaPerfilUsuario`.
- **Propósito:** convertir el nombre o el avatar de una persona en un enlace a su perfil.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/enlace_perfil_usuario.tsx` y `ruta_perfil_usuario.ts`; tipos en `redsocial/frontend/tipos/compartido/contrato_enlace_perfil.ts`.
- **Estado:** existente.
- **Consumidores:** 5 archivos: `inicio/cabecera_publicacion.tsx`, `inicio/compositor_inicio.tsx`, `inicio/item_comentario.tsx`, `perfil/paneles_red_social_perfil.tsx`, `perfil/pestana_amigos_perfil.tsx`. **No lo usan** las Historias ni Amigos/Grupos/Avisos.

## 2. Origen e implementación

- **Propio de CodePlex (C):** un `<a>` con la ruta compuesta; la navegación sin recarga la resuelve el interceptor global de enlaces (`rutas/compartido/usar_interceptar_enlaces.ts`).

## 3. Contrato y comportamiento

- `EnlacePerfilUsuarioProps`: `autorId` (obligatorio), `nombre?` (para la etiqueta accesible «Ver perfil de :nombre»), `className?`, `children`.
- `rutaPerfilUsuario(autorId)` devuelve `/perfil?usuario=<id codificado>` usando `perfil.json › rutas.principal` y `parametros_ruta.usuario`.

## 4. Estados

- Sin estados propios.

## 5. Configuración e integración con el sistema compartido

- `redsocial/frontend/catalogos/capacidades/redsocial/perfil.json › rutas`, `parametros_ruta`, `enlace.ver_perfil_de`.

## 6. Dependencias

- Ninguna librería; depende del catálogo de Perfil.

## 7. Pruebas existentes

- `pruebas/perfil/pagina_perfil_usuario.test.tsx › Enlace al perfil` (compone la ruta con el parámetro del catálogo y codifica el identificador) y `pruebas/inicio/reacciones_y_comentarios_publicacion.test.tsx › el autor del comentario y de la publicacion enlazan a su perfil` (ambas en verde el 2026-10-26).

## 8. Limitaciones conocidas

- Requiere un `autorId` real: las listas de Amigos, Grupos y Avisos carecen de identificadores y por eso no lo usan (F2-05, F2-13).
- Hay ruta de perfil por identificador, pero no por nombre.

Verificado el 2026-10-26 contra el código, los catálogos y los contratos citados (inspección estática). Las pruebas citadas se ejecutaron ese día (Inicio y Perfil: 15 archivos, 133 pruebas en verde) o se leyeron sin ejecutar si se indica. **No verificado visualmente en navegador.** Lo marcado como INFERIDO o PENDIENTE no pudo comprobarse con la evidencia disponible.
