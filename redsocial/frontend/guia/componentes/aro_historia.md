# Aro de historia (`AroHistoria`)

## 1. Identificación

- **Componente:** `AroHistoria`.
- **Propósito:** envolver un avatar con un anillo que indica historias (`nueva` o `vista`) y hacerlo un botón que las abre.
- **Ubicación:** `componentes/compartido/interfaz/aro_historia.tsx`; contrato en `tipos/compartido/contrato_aro_historia.ts`; clases en `compartido.json › aro_historia`.
- **Estado:** nuevo (2026-10-29).
- **Consumidores:** `FilaConversacion` (Mensajería). Ver [fila_conversacion.md](fila_conversacion.md).

## 2. Contrato

Propiedades: `estado` (`nueva` | `vista`), `etiqueta` (nombre accesible, obligatorio), `onAbrir` y los hijos (el avatar). Atributo `data-estado-historia` para pruebas y sondas. «Sin historias» no usa este componente: el avatar va sin anillo.

## 3. Diseño

`boton` (`inline-flex rounded-full border-0 bg-transparent p-0`) más el anillo del estado: `nueva` usa el color primario (`ring-primario`); `vista`, un anillo neutro; ambos con separación blanca (`ring-offset-2`). El foco visible lo aporta el botón nativo. No cambia el tamaño del avatar ni la posición del texto.

## 4. Estado de «vista»

El estado `vista` sale de `ALMACEN_HISTORIAS_VISTAS` (`servicios/inicio/almacen_historias_vistas.ts`, contrato `AlmacenHistoriasVistas`): `leer`, `suscribir`, `modificar` (igual que los demás almacenes; marcar una historia vista es añadir su `storyId` al conjunto). Una persona está `vista` cuando todas sus historias están vistas. Es independiente del estado de lectura de mensajes. Es estado de frontend (memoria); una persistencia real requiere el contrato descrito en el informe maestro (Ronda 13).

Verificado el 2026-10-29.
