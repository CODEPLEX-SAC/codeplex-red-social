# Visor de historias (`VisorHistoria`)

## 1. Identificación

- **Componente:** `VisorHistoria` con `TarjetaActivaHistoria`, `VistaLateralHistoria`, `CabeceraVisorHistoria`, `PieRespuestaHistoria`, `MenuHistoria` y `usarReproduccionHistoria`.
- **Propósito:** ver las historias en un modal inmersivo: una tarjeta por autor, con segmentos, progreso, temporizador, menú y respuesta/reacción.
- **Ubicación:** `redsocial/frontend/componentes/inicio/bloques/visor_historia.tsx` y archivos vecinos; contratos `VisorHistoriaProps`, `AccionesVisorHistoria`, `TarjetaActivaHistoriaProps`, `CabeceraVisorHistoriaProps` en `redsocial/frontend/tipos/inicio/contrato_historia.ts`; `GrupoHistorias` en `modelo_historia.ts`.
- **Estado:** nuevo (octubre de 2026); la agrupación por autor se añadió después.
- **Consumidores:** `seccion_historias_inicio.tsx` (único). No se exporta por el barril de Inicio.

## 2. Origen e implementación

- **Propio de CodePlex (C)** sobre `Modal` propio (`oscuro`), `CarruselHistorias`, `LienzoHistoria`, `CampoTexto` (respuesta) y `BotonIcono`/`Boton`.

## 3. Contrato y comportamiento

- `VisorHistoriaProps`: `grupos`, `indiceGrupo`, `segmento`, `acciones`, `hayAnterior`, `haySiguiente`, `onSeleccionarGrupo`, `onAnterior`, `onSiguiente`, `onCerrar`.
- `AccionesVisorHistoria`: `reaccionDe`, `respuestasDe`, `onReaccionar`, `onResponder(historiaId, destinatarioId, texto)`, `onEliminar`.
- Navegación de dos niveles: dentro de un autor avanza el segmento sin cambiar la tarjeta central; al terminar el último segmento pasa al siguiente autor; las tarjetas laterales son los autores vecinos. Al terminar la última historia del último autor el visor se cierra.
- Temporizador de `historias.reproduccion.duracion_ms` (5000 ms) por segmento; un clic manual reinicia la cuenta; cerrar detiene el temporizador. Progreso por segmentos con `aria-current="step"`. En móvil se navega tocando los lados.
- Respuesta y reacciones: las reacciones reutilizan las tres opciones de Inicio (`me_gusta`, `me_encanta`, `asombroso`); no se ofrece responder a la historia propia. El menú de la historia propia ofrece «Copiar enlace» y «Eliminar» con confirmación.

## 4. Estados

- Historia propia (menú, sin respuesta), de contacto (respuesta y reacciones), con y sin foto; límite de 10 segmentos por autor; sin historias de nadie no hay visor.

## 5. Configuración e integración con el sistema compartido

- `redsocial/frontend/catalogos/capacidades/redsocial/inicio.json › historias` (`flujo.visor`, `flujo.clases`, `reproduccion`, `maximo_segmentos`, `carrusel`); `reacciones` para las opciones.

## 6. Dependencias

- `almacen_historias.ts` (vía `usar_historias_inicio.ts` y `rutas/inicio/rutas_inicio.ts`), `logica_grupos_historias.ts`, `logica_serie_historias.ts`, `usar_seccion_historias.ts`.

## 7. Pruebas existentes

- `pruebas/inicio/visor_historias.test.tsx` (agrupación por autor, límite de diez, avance entre autores, vecinas, temporizador, tacto, cierre) e `historias_interaccion.test.tsx` (contactos, respuestas, menú, copiar enlace con portapapeles simulado de jsdom, Pedro por defecto), en verde el 2026-10-26.

## 8. Limitaciones conocidas

- **Persistencia: ninguna.** Las respuestas y reacciones se guardan en el almacén en memoria (`estado.respuestas`, `estado.reacciones`) y **no generan mensajes** en Mensajería: decisión de producto pendiente (F2-12).
- El nombre y el avatar del visor **no abren el perfil** del autor (F2-13).
- «Copiar enlace» solo se probó con un portapapeles simulado, no en navegador real.

Verificado el 2026-10-26 contra el código, los catálogos y los contratos citados (inspección estática). Las pruebas citadas se ejecutaron ese día (Inicio y Perfil: 15 archivos, 133 pruebas en verde) o se leyeron sin ejecutar si se indica. **No verificado visualmente en navegador.** Lo marcado como INFERIDO o PENDIENTE no pudo comprobarse con la evidencia disponible.
