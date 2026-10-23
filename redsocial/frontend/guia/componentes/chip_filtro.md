# Chips de filtro (`clasesChip` y `clasesConteoChip`)

## 1. Identificación

- **Componente:** no es un componente React; son dos funciones que devuelven clases (`clasesChip`, `clasesConteoChip`) para chips que son enlaces o botones de selección de filtro.
- **Propósito:** centralizar el aspecto de los chips de filtro redondeados con contador, distinto del `Boton` de variante `filtro`.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/chip_filtro.ts`; tipos en `tipos/compartido/contrato_chip_filtro.ts`; configuración en `compartido.json › chip_filtro`.
- **Estado:** **nuevo** (2026-10-17).
- **Consumidores:** `componentes/grupos/bloques/seccion_invitaciones.tsx`, `componentes/mensajeria/bloques/lista_conversaciones.tsx` y `paginas/amigos/pagina_amigos_solicitudes.tsx`.

## 2. Origen e implementación

- **Origen:** propio de CodePlex. No usa librerías.
- **Exportación e importación:** barrel `componentes/compartido/index.ts` (`export * from './interfaz/chip_filtro'`); los componentes de módulo importan la ruta directa `.../compartido/interfaz/chip_filtro`.
- **Elemento HTML:** los consumidores usan enlaces `<a href="#">`; el helper no impone el elemento.
- **Resuelve:** tres implementaciones duplicadas de chips con alto y radio distintos (32/28/28 px).

## 3. Contrato y características

- `clasesChip({ activo, className })`: base + variante `activo` o `inactivo` + clases locales.
- `clasesConteoChip({ activo, destacado })`: insignia de contador (`conteo_activo`, `conteo_inactivo` o `conteo_destacado`).
- **Estados:** inactivo con `hover`; activo (fondo primario); `aria-disabled` (`opacity-40`, `cursor-not-allowed`); foco global.
- **Accesibilidad:** el helper no añade atributos; los consumidores conservan los suyos. No se añadió `aria-current` ni `aria-pressed` (no verificado que los chips lo necesiten).

## 4. Diseño visual

- Alto 32 px (`h-8`), radio 20 px (`rounded-20`), relleno horizontal 14 px, hueco de 5 px entre texto y contador, texto de 14 px (`text-navegacion`, peso 400).
- Inactivo: fondo blanco, borde `--color-borde`, texto `--color-texto-suave`, `hover` `--color-fondo-hover-discreto`. Activo: fondo y borde `--color-primario`, texto blanco.
- Contador: 16 px de alto (`h-4`), mínimo 16 px de ancho, texto `text-conteo` (14 px / 700 en escritorio; el token baja a 13 px y a 12 px en pantallas pequeñas), fondo `--color-fondo-insignia-neutra` (blanco con texto primario si el chip está activo; `bg-primario` y texto blanco en `destacado`).
- Excepción de ancho: la lista de conversaciones de Mensajería usa `flex-1 justify-center px-2!` porque su columna es estrecha (con 14 px el tercer chip se recortaba a 1280 px).

## 5. Integración con el sistema compartido

- Fuente de verdad: `compartido.json › chip_filtro`. Un cambio ahí actualiza los tres consumidores.
- Distinto de `Boton variant="filtro"` (32 px, radio 8, texto 14 px / 500), que se usa en Guardados, Marketplace e Indicadores; ambos patrones siguen existiendo (decisión de diseño pendiente de unificarlos).
- Override local: `px-2!` en Mensajería.

## 6. Dependencias y procedencia de iconos

Sin iconos. Los contadores son texto.

## 7. Historial de modificaciones

- 2026-10-17: creado al unificar los chips de Grupos > Invitaciones (antes 32 px), Amigos > Solicitudes (28 px) y Mensajes (28 px, texto 500) en 32 px y radio 20; el texto de Mensajería pasa de peso 500 a 400.
- Sin librería afectada.
- Impacto de cambiarlo: 3 pantallas; la medición de la línea base visual no incluye los chips porque son enlaces.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
