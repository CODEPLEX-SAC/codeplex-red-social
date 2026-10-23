# Botón de icono (`BotonIcono`)

## 1. Identificación

- **Componente:** `BotonIcono`.
- **Propósito:** botón cuadrado o circular con un solo icono y etiqueta accesible obligatoria.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/boton_icono.tsx`; tipos en `tipos/compartido/contrato_boton_icono.ts`; configuración en `compartido.json`.
- **Estado:** existente.
- **Consumidores:** todos los módulos; 142 usos JSX en 96 archivos (conteo del 2026-10-19).

## 2. Origen e implementación

- **Origen:** propio de CodePlex; compone `Icono`. No importa librerías de terceros directamente.
- **Implementación:** `boton_icono.tsx`; elemento nativo `<button>`.
- **Exportación e importación:** barrel `componentes/compartido/index.ts` (`export * from './interfaz/boton_icono'`).
- **Dependencias:** `Icono` (`componentes/compartido/icono.tsx`), `contrato_boton_icono.ts`, claves `boton_icono_base`, `boton_icono_variantes` y `boton_icono_tamanos` de `compartido.json`.

## 3. Contrato y características

**Props** (`BotonIconoProps` extiende `ButtonHTMLAttributes<HTMLButtonElement>`):

| Prop | Valores | Predeterminado |
|---|---|---|
| `icono` | `IconName` (obligatoria) | — |
| `aria-label` | texto (obligatorio) | — |
| `variant` | `default`, `primario`, `suave`, `discreto`, `sobre_oscuro`, `contorno`, `sutil`, `flotante` | `default` |
| `size` | `default`, `sm`, `md` | `default` |
| `className` | clases locales | — |

**Estados:** `hover` por variante, foco visible global, `disabled` (`disabled:opacity-40`, `cursor-not-allowed`). **Accesibilidad:** la etiqueta es obligatoria por tipo.

## 4. Diseño visual

| Tamaño | Caja | Icono |
|---|---|---|
| `default` | 32 × 32 px (28 × 28 px por debajo de 600 px) | 18 px (16 px en móvil) |
| `sm` | 24 × 24 px | 14 px |
| `md` | 28 × 28 px | 14 px |

Nota: `md` (28 px) es más pequeño que `default` (32 px) en escritorio; el nombre no refleja el orden. Relleno 0 (`p-0`).

| Variante | Radio | Fondo y texto |
|---|---|---|
| `default` | 7 px | transparente, `--color-texto-icono`; `hover` `--color-fondo-hover-neutro` |
| `primario` | 7 px | `--color-primario`, texto blanco; `hover` `--color-primario-oscuro` |
| `suave` | 7 px | transparente, texto primario; `hover` `--color-fondo-hover-suave` |
| `discreto` | círculo | transparente, `--color-texto-icono-control`; `hover` `--color-fondo-hover-discreto` |
| `sobre_oscuro` | círculo | transparente, `--color-texto-sobre-oscuro-claro`; `hover` blanco al 15 % |
| `contorno` | 8 px | blanco con borde `--color-borde`; `hover` `--color-fondo-hover-suave` |
| `sutil` | 6 px | transparente, `--color-texto-suave`; `hover` fondo suave y texto primario |
| `flotante` | círculo | blanco, borde `--color-borde-flotante`, sombra `shadow-t8` |

Medido: 707 botones de icono visibles a 1280 px con alturas 24, 28 y 32 px. Los tamaños de icono de `BotonIcono` son independientes de `boton_icono_por_tamano` (que solo aplica a `Boton`).

## 5. Integración con el sistema compartido

- **Fuente de verdad:** `boton_icono_variantes`, `boton_icono_tamanos` y `boton_icono_base` en `compartido.json`. Un cambio ahí se propaga a todos los `BotonIcono`; no afecta a `Boton`.
- **Overrides locales:** `flex-none`, `absolute ...` (posición), `relative`, `max-800:hidden`; en Empresas, `catalogoEmpresas.clases.boton_icono_peligro` y `catalogoEmpresas.clases.editar` para tonos propios de acciones de fila.
- **Fuera del sistema:** botones de icono de MUI en la barra lateral (`IconButton` de «colapsar barra lateral», 34 × 34 px), botón de notificaciones de la barra superior (36 × 36 px) y controles de llamada de Mensajería.

## 6. Dependencias y procedencia de iconos

Renderiza `Icono` con el nombre recibido (catálogo `iconos` de `compartido.json`; ver `iconos.md`). Procedencia: glifos de Material Symbols Rounded a través de `@codeplex-sac/iconos` (versión 0.0.11) y SVG locales de `redsocial/recursos/iconos/`. No hay Lucide ni iconos de React en el código fuente.

## 7. Historial de modificaciones

- Proyecto: ninguna modificación de contrato. Usos añadidos: `variant="discreto"` en la barra superior y, en la Fase 5, como cierre del `BannerInformativo` (`discreto sm`) y como botón «quitar» de `FiltroDesplegable` (`discreto sm`, hermano del disparador). El botón de copiar datos de pago (`sutil sm`) se eliminó el 2026-10-19 junto con la transferencia bancaria.
- Fase 6 (ACC-01): en el filtro de ubicación de Eventos y en la estrella de Mensajes > No leídas, un `<span role="button">` anidado dentro de otro botón se sustituyó por un `BotonIcono` hermano; recorrido de 49 rutas sin controles interactivos anidados.
- No hay librería que modificar.
- Excepciones locales (INC-10, justificadas): colores propios sobre fondos oscuros o sobre imagen (`CabeceraModalEmpresa`, «Quitar imagen actual» de Eventos) y el tono destructivo de «Quitar logo» (`TarjetaGeneralEdicionEmpresa`): no existe una variante destructiva ni sobre imagen y añadirlas es una decisión de diseño nueva. Para un botón de icono nuevo, usar las variantes existentes; ver [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md).
- Impacto de cambiar el componente: 142 usos; los tamaños 24/28/32 px aparecen en cabeceras, tablas y paneles.


Verificado el 2026-10-19 contra el código, el catálogo y los contratos citados (la medición en navegador es la de 2026-10-16/17 y las Fases 5 y 6, salvo donde se indica otra fecha). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
