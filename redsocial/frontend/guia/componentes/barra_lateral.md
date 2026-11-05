# Barra lateral (`BarraLateral`)

## 1. Identificación

- **Componente:** `BarraLateral` y `elementosDeLaBarra`.
- **Propósito:** navegación principal, espacio de trabajo y módulos disponibles, con modo colapsado.
- **Ubicación:** `redsocial/frontend/componentes/compartido/navegacion/barra_lateral.tsx` y `elementos_barra_lateral.tsx`; tipos en `tipos/compartido/contrato_barra_lateral.ts`.
- **Estado:** existente.
- **Consumidores:** `EstructuraApp`.

## 2. Origen e implementación

- **Origen:** envoltorio de `CodeplexBarraLateral` de `@codeplex-sac/diseno` 0.0.20 (MUI), con un `ThemeProvider` anidado que fija el punto de quiebre `md` en 900 px.
- **Implementación:** `barra_lateral.tsx` (tema y navegación con `irARuta`), `elementos_barra_lateral.tsx` (elementos desde catálogo).
- **Elementos HTML:** `<nav>` y botones de MUI (`ListItemButton`, `IconButton`).

## 3. Contrato y características

Props: `paginaActiva`, `colapsado` (predeterminado `false`) y `alAlternarColapsado`. Estados: expandida (240 px), colapsada (80 px de desplazamiento), ítem activo; por debajo de 900 px la barra se convierte en cajón (el contenido pierde el desplazamiento). Accesibilidad: la de la librería (botón «colapsar barra lateral» con etiqueta). No verificado: navegación con teclado en modo cajón.

## 4. Diseño visual

Ancho de 240 px (`barra_lateral.ancho`), ítems de ≈ 40,8 px de alto (módulos ≈ 55 px), botón de colapsar de 34 × 34 px, iconos y texto con el tema MUI y tipografía heredada.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › barra_lateral` (ancho, puntos de quiebre, desplazamiento, ids, clases de severidad, de punto y de módulo) y el catálogo `navegacion`.

## 6. Dependencias y procedencia de iconos

Iconos con `Icono` (nombres del catálogo); ver `iconos.md`.

## 7. Historial de modificaciones

- Sin cambios propios distintos de configuración. No se modificó la librería: `@codeplex-sac/diseno@0.0.20` es idéntico al paquete publicado (2026-10-17).
- Impacto: todas las pantallas.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.

## Ampliación (2026-10-26): `elementosDeLaBarra`

- **Función** `elementosDeLaBarra(paginaActiva?)` en `componentes/compartido/navegacion/elementos_barra_lateral.tsx` (consumidor: `barra_lateral.tsx`; ninguna prueba la nombra). Devuelve la lista de `CodeplexElementoMenuLateral` de `@codeplex-sac/diseno` desde `compartido.json › navegacion` y `barra_lateral`.
- **Insignias:** el valor del catálogo (`insignia`) sigue vigente (p. ej. Notificaciones); la de «Mensajes» ya no está en el catálogo: `BarraLateral` lee `ContextoInsigniasNavegacion` (cantidad de conversaciones con mensajes sin leer, la misma fuente y criterio que el chip «No leídos») y la oculta si es 0.
- **Orden:** `navPrincipal` (9 elementos con `href`, `activo` por `paginaActiva` e `insignia`), «Ver más», divisor, sección «Espacio de trabajo» con `espacioTrabajo` (6), divisor, sección «Módulos disponibles» (encabezado con un `BotonIcono` «Agregar módulo» que navega a la ruta de Marketplace con `irARuta`), los `modulosDisponibles` (6, con `SuperficieColor` y descripción), «Ver todos los módulos», divisor y sección de avisos con `avisosSidebar` (3, punto de color por severidad).
- **Navegación:** solo los elementos de `navPrincipal` y `espacioTrabajo` llevan `href`. «Ver más», «Ver todos los módulos», los módulos disponibles y los avisos de la barra se construyen **sin `href` ni manejador** (COMPROBADO EN CÓDIGO): no navegan. Su comportamiento deseado no está documentado (PENDIENTE DE DECISIÓN).
- Los tipos de elemento, ids, iconos y clases salen de `barra_lateral` en `compartido.json`; los datos de módulos y avisos son de demostración.

## Ajuste (2026-10-28): contador del menú con la insignia oficial

`elementosDeLaBarra` ya no usa la propiedad `insignia` de `CodeplexBarraLateral` (un `Box` de 10,4 px de `@codeplex-sac/diseno`). Cuando hay cantidad, el icono de la fila va dentro de `Insignia variant="superpuesta" compacta` (`CodeplexInsignia`); con 0 o sin valor, el icono va solo. Las fuentes y el criterio de ocultar el 0 no cambian. Ver `insignia.md`.
