# Avatar de usuario (`AvatarUsuario`)

## 1. Identificación

- **Componente:** `AvatarUsuario`.
- **Propósito:** único punto para pintar la foto, las iniciales o un icono de una persona o entidad, con presencia o insignia opcionales.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/avatar_usuario.tsx`; tipos en `redsocial/frontend/tipos/compartido/contrato_avatar.ts`.
- **Estado:** existente; migrado a `@codeplex-sac/ui` (ver `AUDITORIA_ICONOS_LIBRERIA_2026.md › Normalización de avatares, presencia, insignias y grupos de avatares`).
- **Consumidores:** 52 archivos de `componentes/` y `paginas/` (todos los módulos con personas: Actividad, Amigos, Avisos, Colaboradores, Eventos, Grupos, Inicio, Mensajería, Perfil…). Conteo estático del 2026-10-26.

## 2. Origen e implementación

- **Oficial envuelto (B):** `CodeplexAvatarUsuario` y `avatarCadena` de `@codeplex-sac/ui` 0.0.25; el envoltorio traduce el tamaño del catálogo a píxeles, aplica el tono (`sx`), la presencia y la insignia.
- Si recibe `nombre`, genera las iniciales y el color con `avatarCadena`; con `imagen` muestra la foto; con `icono` renderiza `Icono`.
- Elemento HTML adicional: un `<span>` contenedor para la presencia (`data-estado`) o la insignia; sin imagen ni etiqueta es decorativo (texto alternativo `campos.alt_decorativo`).

## 3. Contrato y comportamiento

- `AvatarUsuarioProps`: `tamano?` (`xs` 24, `sm` 32, `md` 40, `lg` 48, `xl` 64, `xxl` 80, `historia` 104 px), `imagen?`, `iniciales?`, `nombre?`, `icono?`, `tono?` (`suave`, `fondo`, `neutro`, `solido`), `etiqueta?`, `estado?` (`conectado`, `desconectado`, `ocupado`, `ausente`, `invisible`), `etiquetaEstado?`, `insignia?`, `colorInsignia?` (`primario`, `secundario`, `error`, `info`, `advertencia`, `exito`), `claseInsignia?`, `className?`.
- Valores predeterminados desde el catálogo: tamaño `md`, tono `suave`.
- Una insignia sustituye a la presencia (cuando hay `insignia` no se pasa `estado` al componente oficial).

## 4. Estados

- Con foto, con iniciales, con icono, con presencia (punto y texto opcional) y con insignia: leído del código. El aspecto de cada estado no se verificó en esta tarea.

## 5. Configuración e integración con el sistema compartido

- Fuente de verdad: `redsocial/frontend/catalogos/capacidades/redsocial/compartido.json › avatar` (`predeterminado`, `tamanos`, `tonos`, `estados`, `colores_insignia`, `clases`).
- Sin estilos en línea ni colores en el componente.

## 6. Dependencias

- `@codeplex-sac/ui`, `Icono`, `compartido.json`.

## 7. Pruebas existentes

- `pruebas/compartido/avatar_presencia_grupos.test.tsx` y `avatar_variantes_migracion.test.tsx` nombran el componente (tamaños, foto e iniciales, presencia, insignia). Se leyeron los nombres; no se ejecutaron en esta tarea.

## 8. Limitaciones conocidas

- Las fotos de demostración proceden de `imagenes_red_social.ts` y de `imagenUsuarioPredeterminada`; varias pantallas muestran la misma imagen para personas distintas (datos de demostración).
- No hay ficha del contrato de `CodeplexAvatarUsuario`; el comportamiento oficial no se documenta aquí más allá de lo usado.

Verificado el 2026-10-26 contra el código, los catálogos y los contratos citados (inspección estática). Las pruebas citadas se ejecutaron ese día (Inicio y Perfil: 15 archivos, 133 pruebas en verde) o se leyeron sin ejecutar si se indica. **No verificado visualmente en navegador.** Lo marcado como INFERIDO o PENDIENTE no pudo comprobarse con la evidencia disponible.
