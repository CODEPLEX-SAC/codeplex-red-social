# Botón de pie de lista (`BotonPieLista`)

## 1. Identificación

- **Componente:** `BotonPieLista`.
- **Propósito:** botón de ancho completo al final de una lista («Ver más», «Cargar más») con flecha hacia abajo.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/boton_pie_lista.tsx`; tipo `tipos/compartido/contrato_boton_pie_lista.ts`.
- **Estado:** existente.
- **Consumidores:** 9 usos JSX en 8 archivos (conteo del 2026-10-19): Actividad (Colaboradores, Grupos, Módulos y Sistema), Amigos (`SeccionTusAmigos`, Solicitudes ×2 y Sugerencias) y Grupos (`SeccionAceptadas`).

## 2. Origen e implementación

- **Origen:** propio de CodePlex; compone `Boton` (`variant="enlace" size="pie_lista"`) e `Icono`.
- **Implementación:** `boton_pie_lista.tsx`; el elemento nativo `<button>` lo renderiza `Boton`.
- **Exportación:** barrel `componentes/compartido/index.ts`.

## 3. Contrato y características

- **Props:** `BotonPieListaProps = ButtonHTMLAttributes<HTMLButtonElement>`; los hijos son el texto.
- **Estados:** los de `Boton` (`hover` con fondo `--color-fondo` y sin subrayado, foco global, `disabled`).
- **Accesibilidad:** botón nativo; el icono es decorativo (no se añadió `aria-label`).

## 4. Diseño visual

Contenedor con borde superior `--color-borde-suave`; botón de ancho completo, ≈ 49 px de alto (`p-3.5`), radio 0, texto 14 px / 600 en color primario, hueco de 6 px (`gap-1.5`) hasta la flecha de 16 × 16 px. Sin cambios por ancho.

## 5. Integración con el sistema compartido

Configuración en `compartido.json › boton_pie_lista` (`contenedor`, `boton`, `icono`, `clase_icono`). Hereda de `boton.md` el alto, el relleno y la tipografía de `pie_lista`.

## 6. Dependencias y procedencia de iconos

Icono `flecha-abajo`, resuelto por `Icono` (catálogo `iconos`); ver `iconos.md`. Procedencia en `iconos.md`.

## 7. Historial de modificaciones

- Sin modificaciones de contrato; en la Fase 6 (INC-12) se adoptó en Amigos y Grupos > Invitaciones en lugar de enlaces `<a href="#">` escritos a mano (alturas de 43, 46 y 47 px que pasan a 49 px) y se retiraron 5 entradas de `registro_enlaces.ts` que ya no existen.
- Impacto: 8 archivos.


Verificado el 2026-10-19 contra el código, el catálogo y los contratos citados (la medición en navegador es la de 2026-10-16/17 y las Fases 5 y 6, salvo donde se indica otra fecha). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.

## Cuándo no usarlo (excepciones conservadas, INC-12)
- Los pies con flecha hacia la derecha de Eventos (`SeccionCalendario13`, `SeccionProximos2`) son navegación («ir a»), no expansión de lista.
- «Cargar más notificaciones» de Notificaciones > Menciones es un `Boton secundario md` fuera de la tarjeta de la lista.
- «Ver más» del panel de notificaciones de la barra superior es un enlace con ruta real (se conserva como enlace).

Estado: **excepciones justificadas y documentadas**; ver [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md).
