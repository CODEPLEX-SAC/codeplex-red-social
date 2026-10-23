# Insignia (`Insignia`)

## 1. Identificación

- **Componente:** `Insignia`.
- **Propósito:** pequeñas etiquetas: contador, estado, privacidad y «privado».
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/insignia.tsx`; tipos en `tipos/compartido/contrato_insignia.ts`.
- **Estado:** existente.
- **Consumidores:** 27 usos JSX en 23 archivos (pestañas con contador, listas de Colaboradores, Empresas, Grupos, Marketplace).

## 2. Origen e implementación

- **Origen:** propio de CodePlex; no usa librerías.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML nativo:** `<span>`.

## 3. Contrato y características

Unión discriminada por `variant`: `counter` (hijos), `status` (`className` obligatorio y hijos), `privacy` (`tone`: `publico` o `privado`, con clases de `insignia_privacidad`) y `privado` (hijos). Sin estados interactivos. Accesibilidad: texto plano; no declara `role`.

## 4. Diseño visual

- `counter`: 18 × 18 px mínimo, círculo, fondo `--color-primario`, texto blanco `text-conteo` (14 px / 700).
- `status`: `rounded-xl`, relleno 8 × 2 px, `text-badge` (12 px / 700), colores por `className`.
- `privacy`: `rounded`, relleno 8 × 2 px; `publico` azul y `privado` rosa (`fondo-categoria-azul` / `fondo-categoria-rosa`).
- `privado`: `rounded-3`, fondo `--color-fondo-categoria-morado`, texto morado.

## 5. Integración con el sistema compartido

Fuente de verdad: `insignia.tsx` (clases fijas) y `compartido.json › insignia_privacidad`. No hay un catálogo único para las clases de `counter`, `status` y `privado`; los colores salen de los tokens de `index.css`.

## 6. Dependencias y procedencia de iconos

Sin iconos.

## 7. Historial de modificaciones

Sin cambios documentados distintos de los de tokens. Impacto: 23 archivos.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
