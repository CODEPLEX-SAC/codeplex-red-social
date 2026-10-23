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
