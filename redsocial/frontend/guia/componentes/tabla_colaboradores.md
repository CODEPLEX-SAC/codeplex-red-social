# Tabla de colaboradores (`TablaColaboradores`)

## 1. Identificación

- **Componente:** `TablaColaboradores`.
- **Propósito:** tabla del listado de Colaboradores con selección, estados, aplicaciones asignadas, vigencia y acciones.
- **Ubicación:** `redsocial/frontend/componentes/colaboradores/bloques/tabla_colaboradores.tsx`; tipos en `tipos/colaboradores/contrato_listado_colaboradores.ts`.
- **Estado:** **nuevo** (2026-10-16).
- **Consumidores:** la sección de listado de Colaboradores.

## 2. Origen e implementación

- **Origen:** propio de CodePlex; recibe una tabla de `@tanstack/react-table` 9.2.4 ya construida por `usar_tabla_colaboradores.ts`.
- **Elementos HTML nativos:** `<table>`, `<thead>`, `<tbody>`, `<th>`.
- **Dependencias:** `Casilla`, `CLASES_TABLA`, `BloqueReenviar` (fila) y el catálogo `colaboradores.json`.

## 3. Contrato y características

Props (`TablaColaboradoresProps`): `datos` (clases de estado y rol, menús, acciones), `tabla` (instancia TanStack) y `filas`. Estados: sin colaboradores, selección de página y total (casilla de cabecera con indeterminado), menú de acciones por fila, reenvío de invitación.

## 4. Diseño visual

Presentación de `CLASES_TABLA`; casilla de cabecera de 40 px de ancho, encabezados en mayúsculas con relleno de 14 px.

## 5. Integración con el sistema compartido

Consume `tabla_datos` de `compartido.json` y `clases_tabla` de `colaboradores.json`. Sin overrides locales.

## 6. Dependencias y procedencia de iconos

Iconos con `Icono`/`BotonIcono` y los de aplicaciones del módulo (`iconos_aplicaciones_colaboradores`).

## 7. Historial de modificaciones

- 2026-10-16: creado al separar la tabla del listado. Sin librería modificada.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.

## Actualización 2026-10-30: pestañas sin contador y matriz de permisos de «Invitar colaborador»

- **Pestañas.** Las pestañas de estado (Todos, Activos, Invitados, Inactivos, Baja) ya no muestran cantidad: `usar_tabla_colaboradores.ts` construye cada elemento solo con `clave` y `etiqueta`.
- **Modal «Invitar colaborador».** Ancho de escritorio de 960 a 1120 px (`max-w-280`) y pantalla completa bajo 600 px (`max-600:h-full`), definidos en `colaboradores.json › clases.invitar_permisos.modal`.
- **Paso 2, «Rol y permisos» (diseño único).** Toda su presentación está en `colaboradores.json › clases.invitar_permisos` (módulos laterales, nivel rápido, perfil aplicado, matriz, leyenda) y la rejilla en el token `--grid-template-columns-matriz-permisos` de `index.css`. Los textos accesibles están en `campos_rol_permisos` (`permiso_concedido`, `permiso_no_concedido`).
  - **Escritorio y tableta ancha (> 768 px):** tabla de 8 columnas (permiso + 7 acciones) sin desplazamiento horizontal; cabecera con icono y nombre de cada acción.
  - **Móvil (≤ 768 px):** la matriz y la lista lateral se ocultan y se muestran tarjetas de módulo expandibles con interruptores (ver «Asistente responsivo» abajo).
  - **Módulos:** a escritorio, lista lateral de 240 px; bajo 960 px, una tira horizontal desplazable encima de la matriz.
  - La matriz de escritorio sigue siendo de solo lectura (filas por subárea de Planillas, celda compartida `CeldaPermisoInvitacion`); los permisos editables por módulo están en la vista móvil.


## Asistente «Invitar colaborador» responsivo (2026-10-30)

- **Catálogo.** Clases en `colaboradores.json › clases`: `invitar_comun` (cuerpo, pie, stepper, tarjetas, opciones, notas), `invitar_informacion`, `invitar_permisos`, `invitar_vigencia` e `invitar_resumen`. Los componentes de los cuatro pasos ya no llevan clases escritas a mano.
- **Paso 2 en móvil (≤ 768 px).** Tarjetas de módulo (`tarjeta_modulo_permisos.tsx`): icono, nombre, descripción, siete iconos con la unión de permisos del módulo y chevron. Al abrir una (una a la vez; es el mismo «módulo activo» de la lista lateral de escritorio) muestra su selector de perfil, por cada recurso solo los permisos disponibles como `Interruptor` compartido, la nota y «Restablecer permisos».
- **Estado único.** `usar_permisos_invitacion.ts` (registrado como hook aprobado) guarda los permisos por módulo y recurso (`porModulo`), el último perfil aplicado por módulo y el módulo activo; lo usan la tabla de escritorio (`Casilla`) y las tarjetas móviles (`Interruptor`). Reglas puras en `logica_permisos_invitacion.ts` y `logica_perfiles_permisos.ts`.
- **Significado de los permisos.** `Acordeon` compartido con los siete significados (`campos_rol_permisos.significados`); sustituye a la leyenda de puntos bajo 768 px.
- **Pasos 1, 3 y 4.** Método de invitación en columna bajo 600 px; fechas de vigencia en columna bajo 480 px y tarjetas con relleno reducido; en el resumen, la rejilla de vigencia pasa a una columna bajo 480 px y las filas del correo apilan etiqueta y valor.

### Perfiles rápidos, Personalizado y Restablecer (2026-10-30)

- **Contrato de datos** (`servicios/colaboradores/permisos.json`, tipos en `modelo_invitar_colaborador_rol_permisos.ts`): `recursosModulos` (recursos de cada módulo y las operaciones que admiten; «Sin acceso» siempre está disponible), `perfilesModulos` (permisos de cada perfil por módulo y recurso) y `perfilInicialModulos`. Los nombres de perfil y sus claves están en `colaboradores.json › perfiles_permisos`. **Los datos actuales son de ejemplo**: solo las 6 filas de Planillas (perfil Supervisor) y los nombres de perfil tenían respaldo previo; el resto debe validarlo el dominio o llegar del Backend.
- **Perfiles predefinidos y Personalizado (versión vigente desde 2026-10-30).** Personalizado es una opción explícita del selector, con guardado confirmado y configuración independiente por módulo; la matriz es de solo lectura con un perfil predefinido. Detalle en [asistente_invitar_colaborador.md](asistente_invitar_colaborador.md) (sección 6).
- (Sustituido) El estado «Personalizado» ya no se deriva automáticamente al tocar una casilla.
- **Restablecer permisos** descarta los cambios pendientes de la configuración personalizada del módulo actual y vuelve a la última guardada.
- **Matriz de escritorio.** Usa `CLASES_TABLA` (contenedor, tabla y fila) con `Casilla` por permiso (color tomado de `colores_casilla_permiso`); una casilla activa o desactiva un permiso y «Sin acceso» es excluyente por fila; las operaciones no disponibles se muestran como «—».
- **Resumen.** El texto «N módulos con permisos asignados» (resumen y vista previa del correo) se calcula con los permisos reales.
- **Pendiente (Backend/Datos):** validar los recursos, operaciones y perfiles de cada módulo; el selector «Ver perfiles» sigue sin destino; los valores del paso 3 no pasan por el estado del asistente; el cambio de módulo activo entre escritorio y móvil comparte estado pero su apariencia debe revisarse visualmente.

## Tabla del listado alineada con el diseño compartido (2026-10-30)

- **Anchos.** Las celdas del listado ya no usan los porcentajes de `CLASES_TABLA.columnas`; el ancho de cada columna sale del contenido, como en Empresas (se conserva `columnaAjustada` en la primera columna y `celdaFija` en acciones).
- **Rol / Perfil.** Usa el componente compartido `Insignia` (variante `status`) con las clases de `estilos_colaboradores.json`, y la descripción usa `CLASES_TABLA.identidad.secundario`. Antes era una píldora hecha a mano que se estiraba a todo el ancho de la columna.
- **Aplicaciones y vigencia.** Sus clases de presentación pasaron de los componentes a `colaboradores.json › clases.tabla_aplicaciones` y `clases.tabla_vigencia`.
- **Tamaño de página.** 6, definido en `colaboradores.json › paginacion.tamano` (antes 3 escrito en `colaboradores_tabla_config.ts`). Cada módulo define el suyo en su catálogo (Empresas 10, historial de empresa 6); no forma parte del diseño compartido de la tabla.
- **Pruebas.** Las que verifican la mecánica de paginación fijan el tamaño en 3 con `vi.mock`; `tamano_pagina_colaboradores.test.tsx` comprueba el valor real del catálogo.
- **Sin decidir.** Los textos de celda siguen en 12 px (`text-auxiliar`, `text-badge`, `text-estado`); Empresas usa `text-subtitulo` (14 px) en algunas celdas propias.
