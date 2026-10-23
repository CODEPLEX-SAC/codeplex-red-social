# Campo de texto (`CampoTexto`)

## 1. Identificación

- **Componente:** `CampoTexto`.
- **Propósito:** caja de texto de una línea (texto, correo, teléfono, etc.) con el estilo de CodePlex.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/campo_texto.tsx`.
- **Estado:** existente, adaptado (alto de 40 a 48 px el 2026-10-16).
- **Consumidores:** 64 usos JSX en 26 archivos (conteo del 2026-10-19: Acceso, Colaboradores, Empresas, formularios de Eventos, Inicio, Marketplace, Mensajería, `CampoBusqueda`, entre otros).

## 2. Origen e implementación

- **Origen:** envoltorio de `CodeplexCampoTexto` del paquete `@codeplex-sac/formularios` 0.1.10, que a su vez es un `TextField` de `@mui/material` 7.3.11.
- **Implementación:** `campo_texto.tsx`; mantiene un estado interno de texto si no se le pasa `valor`.
- **Exportación e importación:** barrel `componentes/compartido/index.ts`; el tipo de props es `CodeplexCampoTextoProps` de la librería.
- **Dependencias:** `ProveedorTemaGraficos` (tema MUI del proyecto) y `compartido.json › controles`.
- **Elemento HTML nativo:** `<input>` generado por MUI.

## 3. Contrato y características

Props de la librería (resumen de `CodeplexCampoTextoProps`): `etiqueta`, `textoAyuda`, `valor`, `alCambiar(texto)`, `tipoEntrada`, `soloCorreo`, `soloNumeros`, `sinCaracteresEspeciales`, `longitudFija`, `longitudMaxima`, `alBuscar`, `dispararBusqueda`, `cargando`, `deshabilitado`, `soloLectura`, `error`, `mensajeError`, `multilinea`, `filas`, `marcador`, `anchoCompleto`, `tipo`, `iconoInicio`, `iconoFin`, `alEnfocar`, `alDesenfocar`, `alPresionarTecla`, `contenedorProps`, y las de `TextFieldProps` (por ejemplo `inputProps`).

- **Predeterminados del proyecto** (`controles.campo_texto`): `anchoCompleto: true`; `sx` con `minHeight: var(--height-control)` en la raíz, relleno vertical 8,5 px en el `input` y marcador en `--color-texto-suave` con opacidad 1.
- **Estados:** normal, `hover` (borde primario) y foco del tema (borde de 2 px en el primario `#5a43f4` con halo de 4 px al 10 %, común a todos los campos de MUI desde la Fase 5; ver `proveedor_tema_graficos.md`), error, `disabled`/`soloLectura`.
- **Accesibilidad:** sin etiqueta visible por defecto; los consumidores usan `CampoEtiquetado` o `inputProps={{ 'aria-label': ... }}`.

## 4. Diseño visual

- Alto exterior 48 px (medido, escritorio y móvil; antes 40 px). Relleno horizontal 14 px. Texto 16 px / 500 en `--color-texto` (el color del marcador está configurado en `--color-texto-suave`; no se midió en el navegador).
- Radio 12 px (`radio_campos` del tema `ProveedorTemaGraficos`); borde y `hover` del tema MUI (`divider` y primario).
- Tipografía heredada (`typography.fontFamily: inherit` del tema).
- Ancho: completo por defecto; el consumidor lo acota con el contenedor.
- Sin cambios por ancho; en móvil mantiene 48 px.

## 5. Integración con el sistema compartido

- Fuente de verdad: `compartido.json › controles.campo_texto` y el tema MUI en `proveedor_tema_graficos.tsx`. Un cambio ahí afecta a `CampoTexto`, `CampoBusqueda` y a los campos de los formularios.
- La altura sale del token `--control-height` (48 px) en `montaje_local/index.css`.
- No hay overrides locales de dimensiones; los consumidores solo ajustan ancho y `inputProps`.

## 6. Dependencias y procedencia de iconos

Acepta `iconoInicio` e `iconoFin` como elementos React; el proyecto pasa `Icono` (por ejemplo `buscar` en `CampoBusqueda`). Ver `iconos.md`.

## 7. Historial de modificaciones

- 2026-10-15/16: alto de 40 px (relleno 8,5 px) a 48 px con `minHeight` y el token compartido.
- No se modificó la librería: el contenido de `@codeplex-sac/formularios@0.1.10` coincide byte a byte con el paquete publicado (comprobado el 2026-10-17).
- 2026-10-17 (Fase 5): el foco pasa a borde de 2 px `#5a43f4` con halo de 4 px (antes `#7c3aed`).
- 2026-10-19: en «Invitar colaborador» el teléfono deja de usar el selector de país como prefijo interno y pasa a un `CampoTexto` independiente junto a la caja del código de país (`BloqueTelefonoWhatsapp`).
- Impacto de cambiarlo: 26 archivos y todos los formularios.


Verificado el 2026-10-19 contra el código, el catálogo y los contratos citados (la medición en navegador es la de 2026-10-16/17 y las Fases 5 y 6, salvo donde se indica otra fecha). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
