# Valoración por estrellas (`Valoracion`)

## 1. Identificación

- **Componente:** `Valoracion`.
- **Propósito:** mostrar una calificación de solo lectura con estrellas.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/valoracion.tsx`; tipos en `redsocial/frontend/tipos/compartido/contrato_valoracion.ts`.
- **Estado:** nuevo (octubre de 2026), creado para la cabecera de Perfil.
- **Consumidores:** 1 archivo: `perfil/bloques/cabecera_perfil.tsx`.

## 2. Origen e implementación

- **Oficial envuelto (B):** `CodeplexValoracion` de `@codeplex-sac/ui` 0.0.25, en modo `soloLectura`, dentro de `ProveedorTemaGraficos`.

## 3. Contrato y comportamiento

- `ValoracionProps`: `valor`, `maximo`, `etiqueta` (nombre accesible). El tamaño sale del catálogo (`valoracion.tamano = "p"`).

## 4. Estados

- Solo lectura; no hay interacción.

## 5. Configuración e integración con el sistema compartido

- `redsocial/frontend/catalogos/capacidades/redsocial/compartido.json › valoracion`.
- Los valores mostrados en Perfil proceden de `perfil.json › cabecera.calificacion_valor` (0) y `calificacion_maximo` (5): constantes de demostración, no datos del usuario.

## 6. Dependencias

- `@codeplex-sac/ui`, `ProveedorTemaGraficos`.

## 7. Pruebas existentes

- Ninguna prueba nombra el componente; se ejerce al montar `CabeceraPerfil` en `pagina_perfil_usuario.test.tsx` (INFERIDO: la prueba no comprueba las estrellas).

## 8. Limitaciones conocidas

- No existe modelo de reseñas ni calificaciones: la valoración es un marcador visual. No debe usarse como indicador real.
- No se verificó visualmente la apariencia de las estrellas.

Verificado el 2026-10-26 contra el código, los catálogos y los contratos citados (inspección estática). Las pruebas citadas se ejecutaron ese día (Inicio y Perfil: 15 archivos, 133 pruebas en verde) o se leyeron sin ejecutar si se indica. **No verificado visualmente en navegador.** Lo marcado como INFERIDO o PENDIENTE no pudo comprobarse con la evidencia disponible.
