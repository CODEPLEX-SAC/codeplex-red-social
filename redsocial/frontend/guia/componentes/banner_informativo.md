# BannerInformativo

- **Propósito:** aviso informativo con icono, título opcional, descripción y cierre opcional. Sustituye cuatro copias (INC-07).
- **Origen:** propio (Fase 5). **Estado:** nuevo. **Archivos:** `componentes/compartido/interfaz/banner_informativo.tsx`, `tipos/compartido/contrato_banner_informativo.ts`, `compartido.json › banner_informativo`.

## Contrato
`icono`, `descripcion`, `titulo?`, `variante` (`destacado` por defecto o `nota`), `iconoCuadrado?`, `etiquetaCerrar?` (si se indica, aparece un `BotonIcono discreto sm` de 24 px que oculta el banner) y `className?` (margen).

## Medidas (1280 px)
`destacado`: 653 × 99,4 px en una línea de título + dos de texto, padding 14 px, radio 12 px, icono de 36 px (circular o cuadrado). `nota`: relleno 14/10 px, radio 8 px, icono 16 px, sin cierre ni título.

## Consumidores
Notificaciones > Solicitudes, Menciones y Eventos (iconos `campana`, `comentario`, `calendario`), Grupos > Mis grupos y Descubrir (icono `grupo`) y Colaboradores > Invitar (variante `nota`). El banner aparece en las pestañas de Notificaciones que describen un tipo concreto; no aparece en «Todas», «No leídas» ni «Sistema» por ser vistas agregadas o sin contenido propio.

## Diferencias visuales intencionales (Fase 5)
Los banners de Grupos pasan de padding 20 px / radio 10 px / icono 44 px a 14 px / 12 px / 36 px (patrón de Notificaciones) y su botón de cierre ahora oculta el banner.

## Reutilización
Usar `BannerInformativo` para cualquier aviso informativo con icono (variante `destacado`) o nota breve (variante `nota`); no volver a escribir el contenedor a mano. Hallazgo INC-07 resuelto en la Fase 5: sustituye cuatro copias con medidas distintas.

## Verificación
- **Verificado (código, 2026-10-19):** consumidores `pagina_avisos_eventos.tsx`, `pagina_avisos_menciones.tsx`, `pagina_avisos_solicitudes.tsx`, `pagina_grupos_mis_grupos.tsx`, `seccion_descubrir.tsx` (Grupos) y `seccion_datos_del_colaborador2.tsx` (variante `nota`); configuración `compartido.json › banner_informativo`.
- **Verificado (navegador, Fase 5 y 6):** padding 14 px, radio 12 px e icono de 36 px en Notificaciones y Grupos; cierre `BotonIcono discreto sm`.
- **No verificado:** que el banner conserve el estado «cerrado» al navegar (es estado local; se muestra de nuevo al volver a montar la página).

## Uso en Empresas (2026-10-20)

`AvisosLimitePlan` usa la variante `destacado` con título para el aviso «¿Necesitas más capacidad?»; no lleva botón propio (la acción es «Mejorar plan» de la fila) para no duplicar destinos. El modal de mejora usa la variante `nota` para indicar que el pago es demostrativo.
