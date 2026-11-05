# Insignia (`Insignia`)

## 1. Identificación

- **Componente:** `Insignia`.
- **Propósito:** pequeñas etiquetas: contador, estado, privacidad y «privado».
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/insignia.tsx`; tipos en `tipos/compartido/contrato_insignia.ts`.
- **Estado:** existente.
- **Consumidores:** 27 usos JSX en 23 archivos (pestañas con contador, listas de Colaboradores, Empresas, Grupos, Marketplace).

## 2. Origen e implementación

- **Origen:** envoltorio propio sobre `@codeplex-sac/ui`: `CodeplexEstadoBadge` (variantes en línea `counter`, `status`, `privacy`, `privado`) y `CodeplexInsignia` (variante `superpuesta`, Badge de MUI anclado a un hijo). Ver «Contadores de notificación» más abajo.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML nativo:** `<span>`.

## 3. Contrato y características

Unión discriminada por `variant`: `counter` (hijos), `status` (`className` obligatorio y hijos), `privacy` (`tone`: `publico` o `privado`, con clases de `insignia_privacidad`) y `privado` (hijos). Sin estados interactivos. Accesibilidad: texto plano; no declara `role`.

## 4. Diseño visual

- `counter`: 18 × 18 px mínimo, círculo, fondo `--color-primario`, texto blanco `text-conteo` (14 px / 700).
- `status`: `rounded-xl`, relleno 8 × 2 px, `text-badge` (12 px / 700), colores por `className`.
- `privacy`: `rounded`, relleno 8 × 2 px; `publico` azul y `privado` rosa (`fondo-categoria-azul` / `fondo-categoria-rosa`).
- `privado`: `rounded-3`, fondo `--color-fondo-categoria-morado`, texto morado.

## 5. Integración con el sistema compartido

Fuente de verdad: `insignia.tsx` (clases fijas) y `compartido.json › insignia_privacidad`. No hay un catálogo único para las clases de `counter`, `status` y `privado`; los colores salen de los tokens de `index.css`.

## 6. Dependencias y procedencia de iconos

Sin iconos.

## 7. Historial de modificaciones

Sin cambios documentados distintos de los de tokens. Impacto: 23 archivos. Detalle de 2026-10-21 y 2026-10-28 en `INFORME_SISTEMA_VISUAL_GLOBAL_2026.md`.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.

## Contadores de notificación (2026-10-28, ajustado)

Todos los contadores de notificación usan `CodeplexInsignia` (`@codeplex-sac/ui`) a través de `Insignia variant="superpuesta"`; `counter` (`CodeplexEstadoBadge`) queda solo para contadores dentro de chips y pestañas («No leídos 5»).

| Contexto | Elemento al que se superpone |
|---|---|
| Barra superior: Mensajes, carrito, campana | el botón de icono |
| Menú lateral: Notificaciones, Mensajes | el icono de la fila (solo si hay cantidad) |
| Filas de conversación de la lista y de «No leídos» | **ya no**: el contador es la variante `counter` en la zona derecha de la fila (ver [fila_conversacion.md](fila_conversacion.md)) |
| Ventana flotante de Mensajes en Inicio | el avatar, en la esquina opuesta a la presencia |
| Botón flotante de Mensajes en Inicio | el botón |

- Propiedades del contrato: `compacta` (16 px, 12 px de texto; clase `insignia_superpuesta.compacta` del catálogo) y `superposicion` (`circular` en avatares). Las clases del catálogo apuntan al badge propio (`&>.MuiBadge-badge`) para no teñir el punto de presencia del avatar.
- La propiedad `insignia` del avatar de la librería desactiva la presencia (`estado`); por eso las filas no la usan.
- `CodeplexBarraLateral` (`@codeplex-sac/diseno`) trae solo su propio `Box` (`insignia: string`) y no depende de `ui`; `elementos_barra_lateral.tsx` no lo usa.
- Con 0 el menú no monta la insignia (MUI conserva el texto previo en un badge invisible).
- Nombre accesible de los botones de la barra superior: `nombreAccesibleConConteo` («Mensajes, 5 pendientes»); texto en `textos.json › NOMBRE_CON_PENDIENTES`.
- Pruebas: `pruebas/compartido/insignias_notificacion_tres_puntos.test.tsx` (lista y menú), `pruebas/compartido/insignias_notificacion_barra_superior.test.tsx`, `pruebas/mensajeria/mensajeria_insignia_menu.test.tsx`.
- Desde 100 la insignia superpuesta muestra «99+» (`maximo`, 99 por defecto; `insignia_superpuesta.maximo_predeterminado` en el catálogo) y el badge lleva `role="img"` con `aria-label` igual al valor real.
- El badge de la variante superpuesta es inerte para el puntero (`pointer-events-none`, `insignia_superpuesta.inerte`): no captura clics de botones vecinos ni del propio botón.
- **Actualización 2026-10-29 (Ronda 13):** la variante `counter` abrevia a «99+» cuando el valor numérico supera `insignia_superpuesta.maximo_predeterminado` (99) y conserva el valor real en un contenedor `role="img"` con `aria-label` (la fila además lleva un texto solo para lectores: «128 mensajes sin leer»). La variante `superpuesta` acepta `punto` (`variante: punto` de la librería) para el indicador «marcada como no leída» sobre la hora; no lleva texto ni contador. Pruebas: `insignias_notificacion_tres_puntos.test.tsx`.
- **2026-10-29 (corregido):** la numeración dentro de las insignias usa el rol propio `conteo-insignia` (misma escala que `conteo`, peso 500, definido en `index.css`). El rol `conteo` conserva su peso 700 porque lo usan cifras de texto (KPI, categorías de Eventos, ranking de Marketplace). Una primera versión bajó `conteo` a 500 para todos y alteró esos usos; se revirtió.
- **2026-10-30:** el peso de `conteo-insignia` bajó de 500 a 400 (normal); con 500 la numeración seguía viéndose pesada. Se aplica a todas las insignias que usan la definición compartida: barra superior, menú lateral, lista de Mensajes, pestañas y avatares.
