# Imagen de avatar (`AvatarImagen`)

## 1. Identificación

- **Componente:** `AvatarImagen`.
- **Propósito:** `<img>` con `object-cover` para avatares y miniaturas de personas, grupos y empresas.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/avatar_imagen.tsx`.
- **Estado:** existente.
- **Consumidores:** 80 usos JSX en 65 archivos.

## 2. Origen e implementación

- **Origen:** propio de CodePlex; no usa librerías.
- **Exportación:** barrel `componentes/compartido/index.ts`; las imágenes predeterminadas (`usuario.jpg`, `concierto.jpg`, `logo-empresa.jpg`) se exportan desde `icono.tsx` (`imagenUsuarioPredeterminada`, `imagenEventoPredeterminada`, `imagenEmpresaPredeterminada`).
- **Elemento HTML nativo:** `<img>`.

## 3. Contrato y características

Props: `src`, `alt` (predeterminado `campos.alt_decorativo`, texto vacío de `compartido.json`) y `className`. Sin estados. Accesibilidad: `alt` vacío por defecto (imagen decorativa); el consumidor lo informa cuando la imagen transmite significado.

## 4. Diseño visual

Sin tamaño propio; clases `object-cover object-center` y el tamaño y radio que añade cada consumidor.

## 5. Integración con el sistema compartido

Sin configuración central de tamaños; cada consumidor decide.

## 6. Dependencias y procedencia de iconos

Imágenes de `redsocial/recursos/imagenes/`.

## 7. Historial de modificaciones

Sin cambios documentados. Impacto: 65 archivos.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
