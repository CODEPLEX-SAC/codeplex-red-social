# Campo de búsqueda (`CampoBusqueda`)

## 1. Identificación

- **Componente:** `CampoBusqueda`.
- **Propósito:** campo de búsqueda con icono de lupa a la izquierda y una acción opcional a la derecha. Es también el buscador global de la barra superior.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/campo_busqueda.tsx`; tipos en `tipos/compartido/contrato_campo_busqueda.ts`.
- **Estado:** existente.
- **Consumidores:** 20 usos JSX en 19 archivos (conteo del 2026-10-19: Amigos, Colaboradores, Empresas, Eventos, Grupos, Guardados, Marketplace, Mensajería, barra superior y el panel de `SelectorBuscable`).

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


Verificado el 2026-10-19 contra el código, el catálogo y los contratos citados (la medición en navegador es la de 2026-10-16/17 y las Fases 5 y 6, salvo donde se indica otra fecha). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
