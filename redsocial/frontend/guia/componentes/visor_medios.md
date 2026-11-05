# Visor de imágenes (`VisorMedios`)

## 1. Identificación

- **Componente:** `VisorMedios`.
- **Propósito:** ver una imagen ampliada dentro de un modal, con navegación entre las del mismo conjunto.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/visor_medios.tsx`; tipos en `redsocial/frontend/tipos/perfil/contrato_perfil.ts` (`VisorMediosProps`).
- **Estado:** existente (nacido en Perfil; usado también en Inicio).
- **Consumidores:** 4 archivos: `inicio/bloque_medios_publicacion.tsx`, `inicio/medios_comentario.tsx`, `perfil/foto_perfil_cabecera.tsx`, `perfil/paneles_red_social_perfil.tsx`.

## 2. Origen e implementación

- **Propio de CodePlex (C):** `Modal` propio + `BotonIcono` + `<img>` nativo. No usa componentes oficiales de galería.

## 3. Contrato y comportamiento

- `VisorMediosProps`: `items` (`{id, url}[]`), `indice`, `titulo`, `onCambiar(indice)`, `onCerrar()`.
- Los botones anterior y siguiente se deshabilitan en los extremos; muestra «actual de total».

## 4. Estados

- Primera, intermedia y última imagen.
- Solo imágenes: no reproduce video.

## 5. Configuración e integración con el sistema compartido

- Textos en `redsocial/frontend/catalogos/capacidades/redsocial/perfil.json › visor` y clases en `perfil.json › clases.visor` (aunque lo usa Inicio, su configuración sigue en el catálogo de Perfil).

## 6. Dependencias

- `Modal`, `BotonIcono`.

## 7. Pruebas existentes

- Ninguna prueba lo nombra; se ejerce de forma indirecta en las pruebas de Perfil y comentarios (INFERIDO).

## 8. Limitaciones conocidas

- La configuración vive en `perfil.json` aunque el componente es compartido (**H2/H1 pendiente**: moverla a `compartido.json` requiere decisión).

Verificado el 2026-10-26 contra el código, los catálogos y los contratos citados (inspección estática). Las pruebas citadas se ejecutaron ese día (Inicio y Perfil: 15 archivos, 133 pruebas en verde) o se leyeron sin ejecutar si se indica. **No verificado visualmente en navegador.** Lo marcado como INFERIDO o PENDIENTE no pudo comprobarse con la evidencia disponible.
