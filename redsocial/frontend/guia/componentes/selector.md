# Selector (`Selector`)

## 1. Identificación

- **Componente:** `Selector`.
- **Propósito:** lista desplegable de una opción, con API de elementos `<option>` y cinco variantes de presentación.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/selector.tsx`; tipos en `tipos/compartido/contrato_selector.ts`.
- **Estado:** existente, adaptado (alto de 40 a 48 px el 2026-10-16; variante `compacto` añadida el 2026-10-19).
- **Consumidores:** 57 usos JSX en 36 archivos (conteo del 2026-10-19: Colaboradores, Empresas, Dashboard, Estadísticas, Indicadores, Reportes, Guardados, Notificaciones, Actividad, Amigos, Grupos, Marketplace y formularios de Eventos).

## 2. Origen e implementación

- **Origen:** envoltorio de `CodeplexSelector` de `@codeplex-sac/formularios` 0.1.10 (MUI `Select`).
- **Implementación:** `selector.tsx`: convierte los hijos `<option>` en `opciones` de la librería, calcula el valor inicial y envuelve todo en `ProveedorTemaGraficos`.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Dependencias:** `ProveedorTemaGraficos`, claves `selector_libreria`, `selector_envoltorio`, `selector_label`, `selector_atributo_accesible` y `campos` de `compartido.json`.
- **Elemento HTML nativo:** `<label>` (solo cuando recibe `label` y la variante lo permite); el control es un `div` de MUI con `role="combobox"` y un `<input>` oculto.

## 3. Contrato y características

**Props** (`SelectorProps` extiende `SelectHTMLAttributes<HTMLSelectElement>`): `variant`, `label`, `placeholder`, `value`, `defaultValue`, `onChange`, `disabled`, `name`, `className`, `aria-label` y los hijos `<option>`. Solo se propagan las anteriores.

| `variant` | Etiqueta | Ancho | Alto |
|---|---|---|---|
| `default` (predeterminada) | admite `label` | ajustado al contenido (`max-900:flex-1`) | 48 px |
| `colaboradores` | admite `label` | ancho completo | 48 px |
| `mini` | no | ajustado | 40 px |
| `integrado` | no | ajustado al contenido, sin ancho mínimo (`minWidth: 0`) | el del campo que lo contiene (sin borde) |
| `compacto` | no | ancho completo de su contenedor, sin ancho mínimo (el contenedor fija el ancho) | 48 px |

**Ancho mínimo de la librería:** `CodeplexSelector` impone `minWidth: 120` a su raíz (comprobado en `@codeplex-sac/formularios`). Las variantes `integrado` y `compacto` lo anulan con `sx: { minWidth: 0 }` en `selector_libreria`; las demás lo conservan. Esto se añadió el 2026-10-19 para que un selector de texto corto («DNI», «+51») no se estire.

**Uso como filtro o criterio de orden en cabeceras (Fase 5):** `variant="mini"` (40 px, sin altura contractual propia) con valor controlado y `aria-label` descriptivo: Actividad > Módulos («Todos los módulos»), Actividad > Sistema («Todos los eventos»), Amigos («Todos los amigos»), Grupos > Invitaciones («Más recientes / Más antiguas»), Guardados y Notificaciones > No leídas. Los valores no deben ser cadena vacía (el selector de la librería no muestra la etiqueta de una opción con valor vacío).

**Estados:** normal, `hover` y foco del tema MUI, `disabled`, menú abierto. **Accesibilidad:** el nombre accesible sale de `label`, `aria-label` o el texto «Seleccionar opción»; se aplica al elemento visible que abre la lista (`SelectDisplayProps`). **No verificado:** navegación con teclado de la lista en cada variante (es la de MUI).

## 4. Diseño visual

- Alto exterior medido: 48 px (`default`, `colaboradores`, `compacto`), 40 px (`mini`), integrado: 40 px de control (medido en «Invitar colaborador») dentro de un contenedor de 48 px, centrado. Se mantiene en móvil.
- Texto 16 px / 500 en `--color-texto`; relleno vertical 8,5 px; radio 12 px; etiqueta externa `text-etiqueta` (12 px / 500, `--color-texto-suave`).
- Lista desplegable: elementos MUI con `text-cuerpo` (`elemento_menu_tema`) y `hover` `--color-fondo-hover-neutro`.
- Tipografía heredada del tema (`typography.fontFamily: inherit`).

## 5. Integración con el sistema compartido

- Fuente de verdad: `compartido.json › selector_libreria` (propiedades y `sx` por variante), `selector_envoltorio` y `selector_label`. El alto estándar lo da `minHeight: var(--height-control)`.
- `mini` e `integrado` no llevan `minHeight`; es deliberado (el prefijo telefónico de Nueva empresa dejó de usar `mini` el 2026-10-17 porque quedaba 8 px más bajo que su campo). `compacto` sí lleva `minHeight: var(--height-control)`.
- Overrides locales: `className` de ancho (`flex-none`, `w-full`).

## 6. Dependencias y procedencia de iconos

Sin iconos propios: la flecha la dibuja la librería (`@codeplex-sac/formularios` contiene `ArrowDropDown` y `KeyboardArrowDown`; no se determinó cuál produce el chevron visible).

## 7. Historial de modificaciones

- 2026-10-16: `minHeight` de 48 px en `default` y `colaboradores`; `mini` e `integrado` conservan 40 px.
- 2026-10-17: el prefijo «+51» de Nueva empresa pasa de `mini` a `default` (48 px).
- 2026-10-19: variante `compacto` (DNI del formulario «Invitar colaborador») y `minWidth: 0` en `integrado` (prefijo «+51» de «Invitar colaborador» y del panel «Editar colaborador»). Ver «Usos de `compacto` e `integrado`».
- No se modificó la librería: el contenido de `@codeplex-sac/formularios@0.1.10` coincide byte a byte con el paquete publicado y con la integridad del `package-lock.json` (comprobado el 2026-10-17).
- Impacto de cambiarlo: 36 archivos.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.

## Contrato de `mini` (Fase 5 y 6)
`variant="mini"` mide 40 px (MUI `size="small"`); es el contrato de facto de los selectores de cabecera: Actividad > Módulos y Sistema, Amigos > Todos, Grupos > Invitaciones, Guardados y Notificaciones > No leídas. Cada uno tiene valor controlado, `aria-label` descriptivo y opciones reales que filtran u ordenan la lista (antes eran botones secundarios con chevron que no abrían nada, hallazgo INC-01). Foco con teclado verificado (Tab, 2 px `#5a43f4` + halo); ArrowDown abre, Enter elige y Escape cierra (prueba `selectores_de_filtro.test.tsx`). Cabeceras de Actividad: «Crear grupo» (`Boton cta`, 40 px) y los selectores `mini` (40 px) comparten altura; las acciones de fila («Ver perfil», «Ver grupo») usan `Boton mini` (30 px) por ser acciones de fila, no de cabecera (INC-13, resuelto por jerarquía).

También usan `mini` selectores de gráficos que no actúan sobre los datos (Dashboard «Mensual/Semanal», Estadísticas frecuencia y año; sin `value` ni `onChange`, verificado en el código).

## Usos de `compacto` e `integrado` (2026-10-19)
- **`compacto`:** tipo de documento («DNI», «RUC», «C.E.») de `SeccionDatosDelColaborador3`, dentro de un contenedor de 96 px (`w-24`) con 8 px de separación hasta el número de documento. Medido: 96 × 48 px; a 400 px el contenedor pasa a ancho completo (`max-480:w-full`).
- **`integrado`:** código de país del teléfono. En «Invitar colaborador» (`BloqueTelefonoWhatsapp`) va junto a la bandera dentro de una caja con borde de 48 px y el número es un `CampoTexto` aparte; el selector mide unos 72 px. En «Editar colaborador» (`BloqueEditarDatosColaborador`) sigue como prefijo dentro del campo de teléfono, ahora sin el ancho mínimo de 120 px.
- Verificado en el navegador a 1280, 820 y 400 px: sin desborde.
