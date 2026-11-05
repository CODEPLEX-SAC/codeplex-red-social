# Columna de publicidad (`ColumnaPublicidad`)

## 1. Identificación

- **Componente:** `ColumnaPublicidad` y `BloqueAnuncio`.
- **Propósito:** tarjetas de anuncios de demostración en la columna central derecha.
- **Ubicación:** `redsocial/frontend/componentes/compartido/bloques/columna_publicidad.tsx` y `bloque_anuncio.tsx`.
- **Estado:** existente, adaptado (2026-10-17: botones con `clasesBoton`).
- **Consumidores:** páginas con `EstructuraTresColumnas`.

## 2. Origen e implementación

- **Origen:** propio de CodePlex.
- **Elementos HTML:** `<a>` con aspecto de botón, `<button>` de carrusel (dos botones circulares de 22 px, `h-5.5 w-5.5`) y `<ul>`.
- **Dependencias:** `clasesBoton`, `usarCarrusel` (arrastre y rueda).

## 3. Contrato y características

Sin props. Cuatro enlaces `<a>` que usan `clasesBoton` con tamaño `mini` (30 px, texto de 12 px): dos `primario`, uno `exito` y uno `secundario` con texto `--color-texto-suave`. Los dos botones circulares del carrusel son `<button>` nativos registrados como excepción.

## 4. Diseño visual

Botones de anuncio: 30 px de alto, relleno 10 px, radio 7 px; resto de estilos de tarjeta propios del componente.

## 5. Integración con el sistema compartido

Datos en `compartido.json › publicidad`; los botones consumen `boton_base`, `boton_tamanos.mini` y las variantes a través de `clasesBoton`.

## 6. Dependencias y procedencia de iconos

Sin iconos relevantes.

## 7. Historial de modificaciones

- 2026-10-17: la composición manual de clases de `mini` se sustituye por `clasesBoton`; el cuarto anuncio conserva `text-texto-suave!`.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.

## Ampliación (2026-10-26): `BloqueAnuncio`

- **`BloqueAnuncio`** (`componentes/compartido/bloques/bloque_anuncio.tsx`): tarjeta oscura con marca, título, descripción y un `Boton variant="oscuro"` «Explorar». Textos de `compartido.json › anuncio`; sin props ni estado.
- **Consumidores (10):** 7 páginas de Actividad, `pagina_colaborador_perfil.tsx`, `pagina_estadisticas_modulo.tsx` y `pagina_perfil_usuario.tsx`. Ninguna prueba lo nombra.
- **Acción:** el botón «Explorar» no tiene manejador ni destino (BS-028, pendiente de decisión); los botones anterior/siguiente de `ColumnaPublicidad` tampoco (BS-029, BS-030) y los puntos del carrusel están fijos en dos. Los enlaces `href="#"` de los anuncios están clasificados como `EXTERNO` en `pruebas/compartido/registro_enlaces.ts`.
