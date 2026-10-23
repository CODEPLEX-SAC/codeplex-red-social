# Ventana modal (`Modal`, `usarModal`)

## 1. Identificación

- **Componente:** `Modal` y el gancho `usarModal`.
- **Propósito:** diálogo modal centrado con cabecera, cierre por Escape y fondo, y foco atrapado.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/modal.tsx` y `usar_modal.ts`.
- **Estado:** existente.
- **Consumidores:** 19 usos JSX en 19 archivos (planes y carrito de Marketplace, pagos, Colaboradores, Empresas, Eventos, Inicio y otros).

## 2. Origen e implementación

- **Origen:** propio de CodePlex. Usa únicamente `Box` de `@mui/material` para el `zIndex` del tema (`theme.zIndex.modal`); la librería `@codeplex-sac/*` no ofrece diálogo.
- **Implementación:** `modal.tsx` renderiza un `<div role="dialog" aria-modal="true" aria-label>`; `usar_modal.ts` gestiona foco y teclado.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Dependencias:** `ProveedorTemaGraficos`, `BotonIcono` (cierre) y `compartido.json › modal`.

## 3. Contrato y características

**Props de `Modal`:** `titulo` (nombre accesible), `etiquetaCerrar`, `onCerrar`, `children`, `className`, `cabecera` (sustituye la cabecera estándar), `suave` (fondo `--color-fondo` en lugar de blanco).

**`usarModal(onCerrar)`:** bloquea el scroll de `body`, enfoca el primer elemento con `[data-foco-inicial]` (o el diálogo), cierra con Escape, mantiene el foco dentro (Tab y Mayús+Tab) y devuelve el foco al elemento previo al cerrar.

**Accesibilidad:** `role="dialog"`, `aria-modal`, `aria-label`, trampa de foco y restauración. Cierre al pulsar fuera (clic en el fondo).

## 4. Diseño visual

Fondo `bg-black/45` con relleno de 16 px (0 en móvil); diálogo `max-h-full w-full` con `overflow-hidden`, sombra `shadow-t13`; el ancho lo fija el consumidor por clase. Cabecera: rejilla `2rem 1fr 2rem`, borde inferior `--color-borde`, relleno 20 × 14 px, título centrado `text-titulo-banner`. Botón de cierre: `BotonIcono` `discreto` `default` (32 px; 28 px en móvil).

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › modal` (clases, teclas y selectores enfocables). Overrides locales: `className` con ancho y alto máximo por módulo (por ejemplo los modales de planes, con anchos acordados por grupo en Marketplace).

## 6. Dependencias y procedencia de iconos

Cierre: `BotonIcono` con icono `cerrar` (ver `iconos.md`).

## 7. Historial de modificaciones

- Sin cambios propios documentados distintos de los de configuración y de los consumidores. No hay librería que modificar.
- Impacto: 19 archivos; cualquier cambio del foco o de las teclas afecta a todos los diálogos y a `FondoPanelFlotante`, que reutiliza `selectores_enfocables`.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.

## Escape con modales apilados (2026-10-20)

`usarModal` solo cierra con Escape el diálogo superior (último `[role="dialog"][aria-modal="true"]` del documento; selector en `compartido.json › modal.selector_dialogo`). Antes, un modal abierto sobre otro (p. ej. «Mejorar plan» sobre «Editar empresa») se cerraba junto con el de debajo. Cubierto por `planes_asignados_edicion.test.tsx`.
