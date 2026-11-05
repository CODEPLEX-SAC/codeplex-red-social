# Carrusel de historias (`CarruselHistorias`)

## 1. Identificación

- **Componente:** `CarruselHistorias` y `ventanaCarrusel`.
- **Propósito:** escenario que muestra la tarjeta seleccionada en el centro y las vecinas a ambos lados, con escala, opacidad y desplazamiento según la distancia al centro.
- **Ubicación:** `redsocial/frontend/componentes/inicio/bloques/carrusel_historias.tsx` y `logica_carrusel_historias.ts`; contrato `CarruselHistoriasProps`, `NavegacionCarrusel`, `EtiquetasCarrusel`, `TarjetaCarrusel` en `redsocial/frontend/tipos/inicio/contrato_carrusel_historias.ts`.
- **Estado:** nuevo (octubre de 2026).
- **Consumidores:** `inicio/bloques/visor_historia.tsx` (único). Exportado por el barril `componentes/inicio`. **No** está registrado como componente compartido.

## 2. Origen e implementación

- **Propio de CodePlex (C).** No existe un carrusel equivalente en las librerías oficiales instaladas (comprobado por la lectura de los `d.ts` el 2026-10-24).
- Genérico: recibe `historias: {id}[]`, un índice y `renderTarjeta(indice, distancia)`; no conoce el contenido. Transiciones CSS, sin librería de animación.

## 3. Contrato y comportamiento

- `CarruselHistoriasProps`: `historias`, `indice`, `navegacion` (`hayAnterior`, `haySiguiente`, `onAnterior`, `onSiguiente`), `etiquetas` (`anterior`, `siguiente`, `vecina(indice, distancia)`), `onCambiar(indice)`, `renderTarjeta`.
- `ventanaCarrusel(total, indice, radio)` calcula las tarjetas visibles (radio 3 por catálogo) sin salirse de la colección.
- La clase de cada tarjeta sale de `historias.carrusel.posiciones[distancia + radio]`; cada tarjeta lleva `data-posicion`. Las vecinas son botones (`max-800:hidden` en móvil) que llaman a `onCambiar`; las flechas llaman a `navegacion`.

## 4. Estados

- Vacío (no renderiza nada), un solo elemento (flechas deshabilitadas, sin vecinas), varios elementos.
- `motion-reduce:transition-none` en las tarjetas.

## 5. Configuración e integración con el sistema compartido

- `redsocial/frontend/catalogos/capacidades/redsocial/inicio.json › historias.carrusel` (`radio`, clases del escenario, de la tarjeta, de la vecina, de las flechas y las siete `posiciones` con traslación, escala y opacidad). Las clases con fracciones (`translate-x-7/25`, …) se generan en el CSS compilado (comprobado con un build temporal).

## 6. Dependencias

- `Boton`, `BotonIcono`, `Icono`.

## 7. Pruebas existentes

- `pruebas/inicio/carrusel_historias.test.tsx` (5 pruebas en verde el 2026-10-26): ventana, posiciones por distancia y `motion-reduce`, flechas y vecinas, un solo elemento, colección vacía.

## 8. Limitaciones conocidas

- Técnicamente reutilizable pero no documentado ni registrado como compartido; hoy solo lo usa el visor.
- La animación y la apariencia no se verificaron visualmente en esta tarea.

Verificado el 2026-10-26 contra el código, los catálogos y los contratos citados (inspección estática). Las pruebas citadas se ejecutaron ese día (Inicio y Perfil: 15 archivos, 133 pruebas en verde) o se leyeron sin ejecutar si se indica. **No verificado visualmente en navegador.** Lo marcado como INFERIDO o PENDIENTE no pudo comprobarse con la evidencia disponible.
