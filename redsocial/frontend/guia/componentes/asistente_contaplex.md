# Asistente de planes («Asistente de ContaPlex» y sus equivalentes)

## 1. Identificación y uso actual

| Dato | Valor |
|---|---|
| Nombre en CodePlex | Asistente de ContaPlex (en la práctica, **un asistente por producto**) |
| Nombres técnicos | `AsistenteFlotante`, `PanelAsistentePlanes`, `RespuestasRapidasPlanes`, `VisorCatalogoPlanes` |
| Archivos (`redsocial/frontend/componentes/marketplace/bloques/`) | `asistente_flotante.tsx`, `panel_asistente_planes.tsx`, `respuestas_rapidas_planes.tsx`, `visor_catalogo_planes.tsx`; estado en `usar_selector_planes.ts` (`mensajes`, `preguntar`, `asistenteAbierto`, `alternarAsistente`, `visorAbierto`) |
| Datos | `servicios/marketplace/planes_aplicaciones.json`: cada uno de los **seis productos** tiene su bloque `asistente` (`titulo`, `saludo`, `rapidas` ×5, `respuestas` ×5) y su `catalogo` (`nombre`, `url` de un PDF) |
| Textos y clases | `catalogos/capacidades/redsocial/marketplace.json › planes.asistente` (`abrir`, `cerrar`, `demostracion`, `en_linea`, `placeholder`, `por_defecto`, `catalogo_*`, `formato_hora`) |
| Categoría | **C** (propio), compuesto con `Boton`, `BotonIcono`, `CampoTexto`, `Icono`, `Insignia` y `Modal` (visor) |
| Estado | Utilizado como **demostración** (la insignia «Demostración» se muestra en el panel) |
| Dónde aparece | Dentro del modal «Ver planes» de cada producto: botón flotante (`BotonIcono variant="flotante"`) y enlace «¿Tienes dudas sobre los planes?» |

## 2. Cómo funciona

- Al abrirse muestra el saludo del producto. `preguntar(texto)` agrega el mensaje propio y una respuesta **preescrita**: `configuracion.asistente.respuestas[pregunta]` o, si no existe, `planes.asistente.por_defecto`. No hay modelo de lenguaje, API ni red. **[CONFIRMADO]**
- Las respuestas rápidas (`rapidas`) disparan `preguntar` con ese texto.
- El visor del catálogo abre un `Modal` con un `<iframe>` del PDF (`/catalogos/*.pdf`, servidos desde `montaje_local/public/catalogos/`; en `dist/` también). **[CONFIRMADO]** `montaje_local/public/catalogos/` contiene los 7 PDF (los seis de `catalogo.url` más `contaplex-empresariales-2026.pdf`). No se abrió su contenido.

## 3. Diseño e implementación

Panel `absolute right-4 top-1/2 z-30 h-9/10 max-h-140 w-90 -translate-y-1/2` (en ≤768 px pasa a `fixed`), cabecera `bg-fondo-boton-oscuro` con avatar circular, título, estado «En línea» y botón de cierre; burbujas `rounded-xl` (propias `bg-primario text-white`, del asistente `bg-white shadow-t8`), hora `text-fecha-abreviada`; entrada de texto con `CampoTexto` y envío con `BotonIcono` `enviar`. Tokens y colores del proyecto; sin librería.

## 4. Procedencia y modificaciones

Sin dependencias de librerías (`@codeplex-sac/*`, MUI) salvo las de los envoltorios compartidos. Las librerías no exportan un componente de chat. Sin modificaciones de librería.

## 5. Posible incorporación a la librería compartida

- **Extraer** (cuando se decida) una pieza genérica de chat: lista de burbujas + entrada + respuestas rápidas, desacoplada de Marketplace (`MensajeAsistente { propio, texto, hora }`). Antes: **investigar** si Mensajería (`componentes/mensajeria/bloques/panel_conversacion.tsx`) tiene un patrón equivalente para unificar.
- **Mantener en CodePlex:** guion de respuestas, textos y catálogos PDF por producto.

## 6. Verificación

Pruebas existentes: `pruebas/marketplace/planes_marketplace.test.tsx` incluye casos del asistente (responde con la respuesta registrada y la hora; abre el asistente desde el modal, líneas ~363–375). **[PENDIENTE]** No se verificó visualmente el panel en esta investigación. Última ejecución del módulo: 2026-10-16 (68 pruebas en verde).
