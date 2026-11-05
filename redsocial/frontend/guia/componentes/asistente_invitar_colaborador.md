# Asistente «Invitar colaborador» (`ModalInvitarColaborador`)

## 1. Identificación

- **Componente:** `ModalInvitarColaborador` y sus bloques.
- **Propósito:** asistente de cuatro pasos (Información, Rol y permisos, Vigencia, Resumen) para invitar a un colaborador.
- **Ubicación:** `redsocial/frontend/componentes/colaboradores/bloques/` (`modal_invitar_colaborador.tsx` y bloques de cada paso); estado en `usar_asistente_invitacion.ts` y `usar_permisos_invitacion.ts`; tipos en `tipos/colaboradores/`.
- **Condición:** **patrón de interfaz propio de CodePlex**, compuesto con componentes compartidos, y **potencialmente reutilizable** en otros módulos y proyectos (modal con pasos, matriz de permisos con perfiles y personalización). No existe un asistente genérico en la librería `@codeplex-sac/*`.
- **Acceso:** `/colaboradores` → «Invitar colaborador».

## 2. Estructura de los cuatro pasos

1. **Información:** datos del colaborador, método de invitación y panel «¿Cómo funciona?» (bajo 960 px pasa debajo del formulario).
2. **Rol y permisos:** módulos, perfil rápido por módulo y matriz de permisos (ver sección 6).
3. **Vigencia:** periodo (fecha de inicio y de vencimiento con el `SelectorFecha` compartido dentro de `CodeplexProveedorFechas`, con calendario desplegable; la duración se calcula con ambas fechas y el vencimiento no puede ser anterior al inicio), qué ocurre al vencer, renovación, recordatorios y zona horaria. Las fechas viven en `usar_vigencia_invitacion.ts` y alimentan el resumen y la vista previa del correo.
4. **Resumen:** tarjetas del colaborador, rol y vigencia, y vista previa del correo. El número de módulos con permisos se calcula con los permisos aplicados.

Navegación: Cancelar, Anterior (secundarios) y Siguiente / Enviar invitación (primario), agrupados a la derecha; en móvil, el primario ocupa la fila superior.

## 3. Componentes compartidos utilizados

`Modal`, `CodeplexPasos` (`@codeplex-sac/navegacion`), `CampoTexto`, `CampoEtiquetado`, `Selector`, `Radio`, `Casilla`, `Interruptor`, `Acordeon`, `Boton`, `BotonIcono`, `BannerInformativo`, `AvatarUsuario`, `TextoColor`, `Icono`, `AyudaContextual` (nuevo, ver `ayuda_contextual.md`) y las clases de tabla compartidas (`CLASES_TABLA`, `claseEncabezadoTabla`). Composiciones propias: tarjeta de módulo móvil, vista previa del correo y consulta de perfiles.

## 4. Tipografía

Todo el texto usa los roles tipográficos globales de `montaje_local/index.css` (`text-nombre-entidad`, `text-titulo-subseccion`, `text-campo-formulario`, `text-subtitulo`, `text-auxiliar`, etc.); no hay tamaños propios, fuentes nuevas ni estilos embebidos. Regla aplicada: **un texto descriptivo nunca supera en tamaño al título que lo contiene**. Correcciones de 2026-10-30: la descripción de «¿Cómo funciona?» pasó de `text-cuerpo` (16 px) a `text-auxiliar` (12 px) bajo su título de 14 px; los nombres de módulo de la lista lateral, de 16 a 14 px (`text-nombre-fila`) bajo «Seleccionar módulo» (14 px); y el texto del correo, de 16 a 14 px (`text-subtitulo`) bajo el título de su tarjeta.

## 5. Configuración centralizada

- **Clases:** `colaboradores.json › clases` (`invitar_comun`, `invitar_informacion`, `invitar_permisos`, `invitar_vigencia`, `invitar_resumen`, `invitar_dialogos`); los componentes solo consumen nombres.
- **Textos:** `campos_rol_permisos`, `dialogos_permisos`, `perfiles_permisos`, `perfil_personalizado`, `columnas_permisos`, `colores_casilla_permiso`.
- **Datos (contrato para Backend):** `servicios/colaboradores/permisos.json` (`recursosModulos`, `perfilesModulos`, `perfilInicialModulos`, `perfilesValidados`).
- **Responsive:** breakpoints globales (`max-960`, `max-768`, `max-600`, `max-480`); a 768 px o menos la matriz se sustituye por tarjetas de módulo.

## 6. Perfiles y personalización de permisos

- **Perfiles predefinidos** (Administrador, Supervisor, Operador, Consulta, Sin acceso): al elegirlos se aplican los permisos de ese módulo, sin confirmación. La matriz queda de **solo lectura**. Los demás módulos no cambian.
- **Personalizado** es una opción explícita del selector. Al elegirla la primera vez se presenta la matriz **sin selecciones**; solo en este modo las casillas (escritorio) e interruptores (móvil) son editables. «Sin acceso» es excluyente por recurso y solo se ofrecen las operaciones que admite cada recurso.
- **Guardado y navegación:** no hay un botón de guardado bajo la matriz. Al pulsar **Siguiente** en el paso 2 con cambios personalizados pendientes en cualquier módulo, se abre una confirmación con los módulos afectados: «Guardar y continuar» guarda todos y avanza al paso 3; «Seguir editando» la cierra sin guardar ni avanzar. Sin cambios pendientes (por ejemplo, tras cambiar entre perfiles predefinidos) Siguiente avanza directamente. «Restablecer permisos» descarta el borrador del módulo y vuelve a la última configuración guardada (o a la matriz vacía).
- **Borradores e independencia:** cada módulo tiene su propio borrador y su propia configuración guardada. Cambiar de módulo o de perfil (incluidos los predefinidos) no pierde el borrador ni la configuración guardada; varios módulos con cambios pendientes se guardan juntos al continuar. Sin historial de versiones ni perfiles reutilizables: la personalización pertenece a la invitación y al módulo.
- **Qué se invita:** lo aplicado (perfil predefinido o configuración personalizada **guardada**); un borrador sin guardar no cuenta y no se puede dejar atrás sin confirmar.
- **Representación de los permisos:** casilla vacía = operación disponible y no concedida; casilla marcada con el color del permiso = concedida (en un perfil predefinido, en solo lectura, sin perder el color porque no se usa el estado «deshabilitado»; en Personalizado, editable); guion «—» = operación **no disponible para ese recurso** (no es una casilla deshabilitada). En móvil las operaciones no disponibles no se listan. La explicación «No disponible para este recurso» está en la leyenda de escritorio y en «Significado de los permisos» (también en móvil).
- **Estado único:** `usar_permisos_invitacion.ts` (hook aprobado) alimenta la tabla de escritorio y las tarjetas móviles.

## 7. Ayudas y consulta de perfiles

- **Alcance de los permisos:** ayuda contextual (`AyudaContextual`) junto al selector; ya no hay un recuadro permanente.
- **«Ver perfiles»:** ventana informativa con los perfiles del módulo actual y sus facultades por recurso, tomadas de `perfilesModulos`. No modifica permisos ni crea perfiles. Mientras `perfilesValidados` sea `false` muestra un aviso de referencia provisional.

## 8. Pendientes

- Los recursos, operaciones y perfiles de todos los módulos son **datos de ejemplo**: solo las 6 filas de Planillas (perfil Supervisor) tenían respaldo previo. Requieren validación del dominio o del Backend (`perfilesValidados`).
- Radios, recordatorios y zona horaria del paso 3 aún no pasan por el estado del asistente (las fechas sí). La opción «Vigencia indefinida» tampoco oculta las fechas ni cambia el resumen.
- Revisión visual responsive a cargo de Angie (390 y 768 px).

Verificado el 2026-10-30 con pruebas de Colaboradores y el validador oficial (0 errores); la apariencia en navegador **no se ha comprobado**.
