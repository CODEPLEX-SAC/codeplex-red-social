# Campo de búsqueda (`CampoBusqueda`)

## 1. Identificación

- **Componente:** `CampoBusqueda`.
- **Propósito:** campo de búsqueda con icono de lupa a la izquierda y una acción opcional a la derecha. Es también el buscador global de la barra superior.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/campo_busqueda.tsx`; tipos en `tipos/compartido/contrato_campo_busqueda.ts`.
- **Estado:** existente.
- **Consumidores:** 23 usos JSX en 21 archivos (conteo del 2026-11-10 sobre `componentes/` y `paginas/`, sin pruebas; archivos (usos): Amigos 2 (2), Colaboradores 1 (1), Empresas 3 (3), Eventos 3 (5), Grupos 1 (1), Guardados 1 (1), Marketplace 1 (1), Mensajería 6 (6), Perfil 1 (1), barra superior y panel de `SelectorBuscable` 2 (2). Conteo anterior: 20 usos en 19 archivos (2026-10-19).
- **Estado de los buscadores:** el criterio definitivo, la fuente intercambiable, las pruebas y el pendiente de Backend de cada buscador están en [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md), sección «Buscadores: estado de la Fase 3 (2026-11-10)»; ver también la sección 8 de este documento.

## 2. Origen e implementación

- **Origen:** propio de CodePlex sobre `CampoTexto` (que envuelve `CodeplexCampoTexto` de `@codeplex-sac/formularios`).
- **Implementación:** `campo_busqueda.tsx`.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Dependencias:** `CampoTexto`, `Icono`, `compartido.json › controles` (`tipo_busqueda`, `atributo_accesible`) y `campos.buscar_en_codeplex`.
- **Elemento HTML nativo:** `<input type="search">` (por MUI) dentro de un `<div>`.

## 3. Contrato y características

Props (`CampoBusquedaProps`): `className`, `icono` (predeterminado `buscar`), `aria-label`, `value`, `onChange` (recibe `{ target: { value } }`), `placeholder`, `name`, `accion` (elemento al final).
Estados: los de `CampoTexto`. Accesibilidad: `aria-label` pasa al `input`; si no se indica se usa el texto «Buscar en Codeplex».

## 4. Diseño visual

Alto exterior 48 px (medido; a 820 px la barra superior se apila). Icono de lupa de 16 × 16 px (`h-4 w-4`) en `--color-texto-icono`. Resto: igual que `CampoTexto` (texto 16 px, radio 12 px).

## 5. Integración con el sistema compartido

Hereda todo de `CampoTexto`. Ancho: lo decide el contenedor (en la barra superior `min-w-40 max-w-75 flex-1`). Sin override de alto.

## 6. Dependencias y procedencia de iconos

Icono `buscar` por `Icono` (glifo de Material Symbols Rounded de `@codeplex-sac/iconos`); ver `iconos.md`.

## 7. Historial de modificaciones

- 2026-10-16: pasa de 40 a 48 px con `CampoTexto`.
- Sin modificaciones a la librería. Impacto: 19 archivos.
- 2026-11-10: conteo de consumidores actualizado (23 usos en 21 archivos) y referencia al estado de los buscadores; sin cambios de código ni de la librería. Impacto actual: 21 archivos.
- 2026-11-10: se documenta su uso con fuentes intercambiables (sección 8) y los textos de campo de EMP-02, EMP-03 y MKT-01; el componente no cambió.

## 8. Uso como buscador con fuentes intercambiables (2026-11-10)

`CampoBusqueda` no calcula resultados: solo recibe `value` y `onChange`. Los buscadores funcionales del proyecto (todos salvo SEL-01, que usa el contrato propio de `SelectorBuscable`) lo combinan con `usarBusqueda` (`componentes/compartido/interfaz/usar_busqueda.ts`), que obtiene los resultados de una `FuenteBusqueda<T, F>`: una fuente local construida con `crearFuenteLocal` o una fuente asíncrona entregada por la prop `fuente` del componente o desde `rutas`. Los filtros independientes de cada pantalla viajan como el tercer parámetro de la fuente y no se mezclan con el texto. El texto del campo debe anunciar exactamente lo que se busca; los placeholders y los criterios definitivos están en [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md), sección «Buscadores: estado de la Fase 3 (2026-11-10)». Estados de carga, error y sin coincidencias: `MensajeEstadoBusqueda`.

Textos de campo actualizados el 2026-11-10: EMP-02 «Buscar por usuario…» (nombre accesible «Buscar por usuario en el historial»), EMP-03 «Buscar por nombre o correo…» y MKT-01 «Buscar aplicación o módulo por nombre...».

Verificado el 2026-10-19 contra el código, el catálogo y los contratos citados (la medición en navegador es la de 2026-10-16/17 y las Fases 5 y 6, salvo donde se indica otra fecha). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador. El conteo de consumidores, la referencia a los buscadores y la sección 8 se actualizaron el 2026-11-10 y se contrastaron con el código y con las pruebas ese día.
