# Panel lateral (`PanelLateral` y paneles derivados)

## 1. Identificación

- **Componente:** `PanelLateral`; paneles que lo componen: `ContactosPanel`, `ContactosEnLineaPanel`, `GruposRecomendadosPanel`, `EventosProximosPanel`.
- **Propósito:** tarjetas de la columna lateral con título y enlace «Ver todos».
- **Ubicación:** `redsocial/frontend/componentes/compartido/bloques/` (`panel_lateral.tsx`, `contactos_panel.tsx`, `contactos_en_linea_panel.tsx`, `grupos_recomendados_panel.tsx`, `eventos_proximos_panel.tsx`); tipos en `tipos/compartido/contrato_panel_lateral.ts` y contratos asociados.
- **Estado:** existente.
- **Consumidores:** `PanelLateral` lo usan 9 archivos de Amigos, Grupos, Avisos, Mensajería y rutas compartidas.

## 2. Origen e implementación

- **Origen:** propio de CodePlex.
- **Elementos HTML:** `<section>`, `<h2>` y `<a>` para el enlace.
- **Dependencias:** `BotonIcono` (contactos y grupos), `AvatarImagen`, `Icono`.

## 3. Contrato y características

`PanelLateral`: `titulo`, `enlace` (predeterminado «Ver todos»), `ruta` (predeterminado `#`) y `children`. Sin estados propios.

## 4. Diseño visual

Tarjeta `rounded-xl` con borde `--color-borde`, fondo blanco y relleno de 16 px; título `text-titulo-banner` y enlace `text-enlace-accion` (12 px / 600) en color primario.

## 5. Integración con el sistema compartido

Sin catálogo propio (clases fijas en el componente); textos en `mensajes/capacidades/redsocial/textos.json`.

## 6. Dependencias y procedencia de iconos

Iconos con `Icono` y `BotonIcono` (mensaje, más); ver `iconos.md`.

## 7. Historial de modificaciones

Sin cambios documentados. El enlace «Ver todos» es un `<a>` con el estilo `enlace_accion`, no `Boton`.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.

## Ampliación (2026-10-26): contratos y consumidores de los paneles derivados

Contratos en `redsocial/frontend/tipos/compartido/`. Conteos estáticos del 2026-10-26.
| Panel | Contrato | Contenido | Consumidores | Pruebas que lo nombran |
|---|---|---|---|---|
| `ContactosPanel` | `ContactosPanelProps` (`titulo?`, `contactos: {nombre, subtitulo}[]`) | Avatar `sm`, nombre, subtítulo y `BotonIcono` «Enviar mensaje» (icono `mensaje`) | 10 páginas (Actividad ×7, Colaborador-perfil, Estadísticas módulo, Perfil) | `avatar_presencia_grupos.test.tsx` |
| `ContactosEnLineaPanel` | `ContactosEnLineaPanelProps` (`contactos: {nombre, colaborador?}[]`) | Avatar con presencia `conectado`, nombre y etiqueta «Colaborador» | `inicio/seccion_contactos_en_linea.tsx`, `mensajeria/panel_lateral_mensajeria.tsx` | `avatar_presencia_grupos.test.tsx`, `paneles_laterales_compartidos.test.tsx` |
| `GruposRecomendadosPanel` | `GruposRecomendadosPanelProps` (`titulo?`, `grupos: {nombre, miembros}[]`) | Marcador de color, nombre, miembros y `BotonIcono` «Unirse» (icono `mas`) | 9 (Actividad ×7, Inicio, Mensajería) | `paneles_laterales_compartidos.test.tsx` |
| `EventosProximosPanel` | `EventosProximosPanelProps` (`eventos: {dia, mes, titulo, detalle}[]`) | Fecha, título y detalle | 9 (Actividad ×7, Inicio, Mensajería) | `paneles_laterales_compartidos.test.tsx` |
- Todos componen `PanelLateral` (`titulo`, `enlace`, `ruta` predeterminada `#`), no tienen estado propio y reciben los datos por props.
- **Acciones:** el botón «Enviar mensaje» de `ContactosPanel` y el de «Unirse» de `GruposRecomendadosPanel` **no tienen manejador** (BS-031, BS-032); los datos no incluyen identificadores de persona o grupo, por lo que no puede componerse `rutaPerfilUsuario` ni una acción real. Decisión de producto pendiente (F2-05).
- Las imágenes son la predeterminada (`imagenUsuarioPredeterminada`) para todas las personas.
