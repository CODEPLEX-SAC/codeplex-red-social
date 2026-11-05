# Grupo de avatares (`GrupoAvatares`)

## 1. Identificación

- **Componente:** `GrupoAvatares`.
- **Propósito:** pila de avatares superpuestos con un contador opcional de personas restantes («+N»).
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/grupo_avatares.tsx`; tipos en `redsocial/frontend/tipos/compartido/contrato_avatar.ts` (`GrupoAvataresProps`).
- **Estado:** existente; migrado a `@codeplex-sac/ui`.
- **Consumidores:** 16 archivos (Amigos, Avisos, Eventos, Grupos, Guardados, Mensajería y `pagina_amigos_listas.tsx`). Conteo estático del 2026-10-26.

## 2. Origen e implementación

- **Oficial envuelto (B):** `CodeplexGrupoAvatares` y `CodeplexAvatarUsuario` de `@codeplex-sac/ui` 0.0.25; cada avatar se dibuja con el envoltorio `AvatarUsuario`.

## 3. Contrato y comportamiento

- `GrupoAvataresProps`: `avatares` (número a pintar), `imagen?`, `tamano?` (predeterminado `sm`), `resto?` (texto del contador), `tono?`, `className?`.
- El solape procede de `avatar.tamanos[tamano].solape`; las posiciones salen de `posicionesDe`.

## 4. Estados

- Con y sin contador `resto`.

## 5. Configuración e integración con el sistema compartido

- `redsocial/frontend/catalogos/capacidades/redsocial/compartido.json › avatar` (`tamanos`, `tonos`, `resto_sx`, `clases.grupo`, `clases.resto_texto`).

## 6. Dependencias

- `@codeplex-sac/ui`, `AvatarUsuario`, `posicionesDe`.

## 7. Pruebas existentes

- `pruebas/compartido/avatar_presencia_grupos.test.tsx` y `avatar_variantes_migracion.test.tsx` nombran el componente (leídas, no ejecutadas hoy).

## 8. Limitaciones conocidas

- Todos los avatares del grupo usan la misma imagen (`imagen`): es un marcador de demostración, no representa personas concretas.

Verificado el 2026-10-26 contra el código, los catálogos y los contratos citados (inspección estática). Las pruebas citadas se ejecutaron ese día (Inicio y Perfil: 15 archivos, 133 pruebas en verde) o se leyeron sin ejecutar si se indica. **No verificado visualmente en navegador.** Lo marcado como INFERIDO o PENDIENTE no pudo comprobarse con la evidencia disponible.
