# Indicador de carga (`IndicadorCarga`)

## 1. Identificación

- **Componente:** `IndicadorCarga`.
- **Propósito:** indicador de espera dentro de botones y formularios.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/indicador_carga.tsx`; tipos en `redsocial/frontend/tipos/compartido/contrato_indicador_carga.ts`.
- **Estado:** existente.
- **Consumidores:** 6 archivos: Acceso (`formulario_crear_cuenta`, `formulario_inicio_sesion`) y Marketplace (`agregar_tarjeta_guardada`, `resumen_pago_planes`, `seccion_pago_tarjeta`, `visor_catalogo_planes`).

## 2. Origen e implementación

- **Oficial envuelto (B):** `CodeplexCargando` de `@codeplex-sac/ui` 0.0.25 con los valores predeterminados del catálogo.

## 3. Contrato y comportamiento

- `IndicadorCargaProps`: `tamano?` (`xs`–`xl`), `color?` (`primario`, `secundario`, `error`, `info`, `exito`, `advertencia`, `blanco`, `gris`), `tipo?` (`borde`, `anillo`, `puntos`, `pulso`, `segmentos`, `lineas`, `puntos-circulo`, `cuadricula`), `etiqueta?`, `className?`. Predeterminado: `sm`, `primario`, `borde`.

## 4. Estados

- Solo visible mientras el llamador lo monta.

## 5. Configuración e integración con el sistema compartido

- `redsocial/frontend/catalogos/capacidades/redsocial/compartido.json › carga.predeterminado`.

## 6. Dependencias

- `@codeplex-sac/ui`.

## 7. Pruebas existentes

- `pruebas/compartido/avatar_variantes_migracion.test.tsx` lo nombra (leída, no ejecutada hoy).

## 8. Limitaciones conocidas

- No hay estados de carga reales en la mayoría de pantallas: los datos son estáticos.

Verificado el 2026-10-26 contra el código, los catálogos y los contratos citados (inspección estática). Las pruebas citadas se ejecutaron ese día (Inicio y Perfil: 15 archivos, 133 pruebas en verde) o se leyeron sin ejecutar si se indica. **No verificado visualmente en navegador.** Lo marcado como INFERIDO o PENDIENTE no pudo comprobarse con la evidencia disponible.
