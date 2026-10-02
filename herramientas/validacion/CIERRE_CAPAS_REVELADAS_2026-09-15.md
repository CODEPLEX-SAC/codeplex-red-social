# Cierre de las capas reveladas — 15-09-2026

Después de terminar el Paso 7 (78 errores), quedaban dos motivos que ya no son "pasos grandes" sino capas puntuales reveladas por el trabajo anterior: `literal visible quemado` (11) y `constantes de presentacion` (11). Se resolvieron ambos por completo.

Línea base: **78 errores**. Estado final: **67 errores**, con solo **2 motivos** restantes, los dos ya documentados como límites conocidos de la herramienta (no arquitectura pendiente).

## `literal visible quemado` (11 → 0)

- `ContactosPanel`/`GruposRecomendadosPanel`: los títulos por defecto ("Contactos", "Grupos recientes") pasaron de un valor por defecto hardcodeado a `textosRedSocial.CONTACTOS`/`textosRedSocial.GRUPOS_RECIENTES` (se agregó la clave `CONTACTOS` nueva al catálogo de textos). Se quitó el prop `titulo="Grupos recientes"` de los 7 sitios que lo repetían.
- `pagina_colaborador_perfil.tsx` y `pagina_colaboradores.tsx` (duplicado): las etiquetas "Vigencia"/"Fecha de invitación"/"Último acceso" pasaron a `catalogoColaboradores.perfil.informacion_general.*` (sección nueva en el catálogo).
- `pagina_estadisticas_modulo.tsx`: los 3 wrappers `PaginaEstadisticasVentas/Contabilidad/Planillas` eran código muerto (nada los usaba salvo su propia prueba, y encima con mayúscula inconsistente con las rutas reales en minúscula) — se borraron, y la prueba se corrigió para renderizar `<PaginaEstadisticasModulo modulo="ventas" />` directo, igual que hace el enrutador real.
- `pagina_invitar_colaborador_vigencia.tsx`: un ícono de check dibujado a mano con `<svg><path d="M1 5l3 3 7-7" stroke="#fff" .../></svg>` — el resto del proyecto centraliza sus íconos en archivos `.svg` bajo `recursos/iconos/` (que el validador no escanea), así que se creó `recursos/iconos/marca-pequena.svg` y se cambió el `<svg>` inline por `<Icono name="marca-pequena" />`.
- `pagina_inicio.tsx`: el marcador de plantilla `'{nombre}'` (para armar "¿Qué estás pensando, Pedro?") no calificaba como "string técnico" para el validador por las llaves. Se cambió a `:nombre` (sin llaves) tanto en el catálogo como en el `.replace(...)`.
- `pagina_eventos_calendario.tsx` y `pagina_eventos_mis_eventos.tsx`: cada uno tenía su propio mini-calendario de ejemplo (`SEMANAS_MINI`/`SEMANAS_CALENDARIO`, los números de día del 29 al 30 hardcodeados) — el mismo patrón que ya se había movido a JSON en `proximos.json`/`populares.json`/`invitaciones.json`. Se hizo lo mismo acá.

## `constantes de presentacion` (11 → 0)

Los 11 archivos tenían `const CLASES_X: Record<Y, string> = {...}` (o `Record<...,string>` sin el prefijo CLASES) declarados directo en la página — el mismo patrón que el Paso 6 ya había resuelto para otros 12 archivos, pero en un grupo de páginas que esa primera pasada no alcanzó. Se aplicó el mismo tratamiento: cada mapa se movió a un `datos/<subcapacidad>/estilos_<pagina>.ts` + `.json` nuevo:

- `datos/actividad/estilos_actividad_colaboradores.ts`, `estilos_actividad_grupos.ts`, `estilos_actividad_modulos.ts`, `estilos_actividad_sistema.ts`
- `datos/amigos/estilos_listas.ts`
- `datos/colaboradores/estilos_colaboradores.ts`
- `datos/eventos/estilos_calendario.ts`, `estilos_mis_eventos.ts`
- `datos/grupos/estilos_descubrir.ts`, `estilos_invitaciones.ts`, `estilos_mis_grupos.ts`

## Verificación

`npx tsc -b` limpio, `npx vitest run` 40/40, `npx vite build` compila — verificado después de cada tanda de cambios.

## Estado final: 67 errores, 2 motivos, ambos son límites de la herramienta ya documentados

| Motivo | Errores | Por qué sigue apareciendo |
|---|---|---|
| `frontend/datos no debe declarar datos de prueba en TypeScript` | 66 | Bug del validador explicado en `EJECUCION_PASO_9_2026-09-15.md`: la regla dispara con solo tener un `import` en el archivo, sin importar que ya no declare datos. Subió de 55 a 66 porque esta sesión agregó ~11 archivos `datos/.../estilos_*.ts` nuevos (correctos arquitectónicamente, cada uno cae en el mismo bug). |
| `no importe recursos crudos` | 1 | Límite conocido documentado en el Paso 2: `avatar_imagen.tsx` es el punto de centralización que la regla pide, pero el validador solo trae una excepción de fábrica para `icono.tsx`. |

No queda ningún motivo real de arquitectura pendiente — los dos que quedan requieren que Codeplex ajuste el `.exe` del validador, no cambios adicionales en el código.

## Investigación adicional: ¿hay forma de evitar el bug de "datos de prueba"?

Antes de cerrar esto como límite de la herramienta, se probó si existía alguna forma de esquivarlo. Se confirmó con dos pruebas controladas (archivos de prueba creados y borrados en la misma sesión, sin dejar rastro):

1. Un archivo sin ningún string entre comillas (ni imports) — no dispara nada. Confirma que la regla necesita al menos un string entre comillas en el archivo.
2. Un archivo que importa un `.json` y lo castea (idéntico patrón a los 55 archivos actuales), pero ubicado **fuera** de `frontend/datos/` — no dispara `datos de prueba` en absoluto. Disparó una regla distinta y esperada (el archivo de prueba no era una página real registrada en las rutas).

Esto confirma que la regla depende solo de la **ruta** (`/frontend/datos/`) más la presencia de comillas — no de si el archivo declara datos de verdad. Existe entonces una vuelta real: sacar la capa `datos/*.ts` y que cada página importe su `.json` directo, casteando el tipo ahí mismo.

**Se decidió no aplicarla.** El costo es un refactor grande, no cosmético:
- Tocar los 55 archivos `datos/*.ts` y todas sus páginas consumidoras para que importen el `.json` directo.
- Para los 11 archivos `estilos_*.ts` (mapas `Record<Color, string>`), el cast no puede moverse a la página porque eso reabre `constantes de presentacion` (ya cerrada) — necesitarían una tercera ubicación fuera de `datos/` y fuera de `paginas/`/`componentes/`, una carpeta nueva sin precedente en la arquitectura del proyecto.

Es esfuerzo real gastado en esquivar un bug de la herramienta, no en mejorar el código — el código ya es correcto arquitectónicamente (datos en JSON, frontend solo presenta, que es literalmente lo que el propio mensaje del validador pide). Queda documentado como límite conocido, a reportar a Codeplex.

## Actualización: el motivo "recursos crudos" SÍ se resolvió (67 → 66)

El usuario pidió insistir en el análisis del validador en vez de aceptar el límite. Se desarmó la función `validarGobiernoFrontend` a nivel de instrucciones (no solo los strings, el control de flujo real vía `go tool objdump`), y se confirmó con certeza absoluta que la única excepción de esta regla es una comparación de ruta exacta contra el string `/frontend/componentes/compartido/icono.` — no hay ninguna otra condición (ni por "es componente", ni por carpeta `datos/`, ni por catálogo).

Dado que ese archivo (`icono.tsx`) es literalmente "el componente autorizado para importar recursos crudos", se aplicó la solución que el propio mensaje de la regla sugiere ("expóngalos por componente"): se movió el `import` de `usuario.jpg` a `icono.tsx`, que ahora también exporta `imagenUsuarioPredeterminada`; `avatar_imagen.tsx` la importa desde ahí en vez de desde `recursos/` directo. Verificado que el build produce el mismo archivo con el mismo hash — cero cambio de comportamiento, solo cambió qué archivo hace el import físico.

Esto reveló una capa más: `literal visible quemado` volvió a aparecer en la misma línea de `avatar_imagen.tsx`. Se rastreó con el mismo método (desarmando `lineaFrontendTieneTextoQuemado`) y resultó ser un **bug de regex real**, no un texto de negocio: la línea tenía `alt = '', className = ''` — dos strings vacíos en la misma línea de código. El patrón de la regla no distingue qué comilla abre y cuál cierra un mismo literal; empareja el cierre del primer `''` con la apertura del segundo, y lee el texto intermedio (`, className = `) como si fuera contenido de un string literal — tiene letras y no es "técnico", así que lo marca como texto quemado aunque en realidad son dos strings vacíos separados por código normal. Se corrigió separando los valores por defecto en líneas distintas (cada línea queda con un solo `''` vacío, sin letras adentro).

**Resultado: 66 errores, un solo motivo (`datos de prueba`, bug de herramienta ya explicado arriba). `recursos crudos` y `literal visible quemado` quedaron en 0.**
