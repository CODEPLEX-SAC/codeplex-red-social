import type { CodeplexElementoMenuLateral } from '@codeplex-sac/diseno'
import { BotonIcono } from '../interfaz/boton_icono'
import { SuperficieColor } from '../interfaz/superficie_color'
import { Icono } from '../icono'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { AvisoBarraLateral, ModuloDisponible, ElementoNavegacion } from '@/tipos/compartido/contrato_navegacion'

const NAV_PRINCIPAL = catalogoCompartido.navegacion.navPrincipal as readonly ElementoNavegacion[]
const ESPACIO_TRABAJO = catalogoCompartido.navegacion.espacioTrabajo as readonly ElementoNavegacion[]
const MODULOS_DISPONIBLES = catalogoCompartido.navegacion.modulosDisponibles as readonly ModuloDisponible[]
const AVISOS_SIDEBAR = catalogoCompartido.navegacion.avisosSidebar as readonly AvisoBarraLateral[]
const CONFIGURACION = catalogoCompartido.barra_lateral
const TIPOS = CONFIGURACION.tipos as Record<string, CodeplexElementoMenuLateral['tipo']>
const PUNTO_POR_SEVERIDAD = CONFIGURACION.clases_severidad as Record<string, string>
const ICONO_POR_ACCION = CONFIGURACION.iconos as Record<string, IconName>

function elementoDeNavegacion(item: ElementoNavegacion, paginaActiva?: string): CodeplexElementoMenuLateral {
  return {
    id: item.clave,
    etiqueta: item.etiqueta,
    icono: <Icono name={item.icono} />,
    href: item.ruta ?? undefined,
    activo: item.clave === paginaActiva,
    insignia: item.insignia === undefined ? undefined : String(item.insignia),
  }
}

export function elementosDeLaBarra(paginaActiva?: string): CodeplexElementoMenuLateral[] {
  return [
    ...NAV_PRINCIPAL.map((item) => elementoDeNavegacion(item, paginaActiva)),
    { id: CONFIGURACION.ids.ver_mas, etiqueta: textosRedSocial.VER_MAS, icono: <Icono name={ICONO_POR_ACCION.ver_mas} /> },
    { id: CONFIGURACION.ids.divisor_principal, tipo: TIPOS.divisor },
    { id: CONFIGURACION.ids.seccion_trabajo, tipo: TIPOS.seccion, etiqueta: textosRedSocial.ESPACIO_DE_TRABAJO },
    ...ESPACIO_TRABAJO.map((item) => elementoDeNavegacion(item, paginaActiva)),
    { id: CONFIGURACION.ids.divisor_trabajo, tipo: TIPOS.divisor },
    {
      id: CONFIGURACION.ids.seccion_modulos,
      tipo: TIPOS.seccion,
      etiqueta: (
        <span className={CONFIGURACION.clase_encabezado_seccion}>
          {textosRedSocial.MODULOS_DISPONIBLES}
          <BotonIcono icono="mas" type="button" aria-label={textosRedSocial.AGREGAR_MODULO} variant="sutil" size="sm" />
        </span>
      ),
    },
    ...MODULOS_DISPONIBLES.map((modulo) => ({
      id: modulo.etiqueta,
      etiqueta: (
        <span className={CONFIGURACION.clase_modulo}>
          <span className="min-w-0 flex-1">
            <strong className="block truncate text-navegacion">{modulo.etiqueta}</strong>
            <small className="block truncate text-auxiliar text-texto-suave">{modulo.descripcion}</small>
          </span>
          <Icono name={ICONO_POR_ACCION.flecha_modulo} className="flex-none text-texto-suave w-3.25 h-3.25" />
        </span>
      ),
      icono: (
        <SuperficieColor as="span" variante={modulo.color} className={CONFIGURACION.clase_icono_modulo}>
          <Icono name={modulo.icono} />
        </SuperficieColor>
      ),
    })),
    { id: CONFIGURACION.ids.ver_modulos, etiqueta: textosRedSocial.VER_TODOS_LOS_MODULOS, icono: <Icono name={ICONO_POR_ACCION.ver_modulos} /> },
    { id: CONFIGURACION.ids.divisor_modulos, tipo: TIPOS.divisor },
    { id: CONFIGURACION.ids.seccion_alertas, tipo: TIPOS.seccion, etiqueta: textosRedSocial.SECCION_AVISOS },
    ...AVISOS_SIDEBAR.map((aviso) => ({
      id: aviso.titulo,
      icono: <i className={[CONFIGURACION.clase_punto, PUNTO_POR_SEVERIDAD[aviso.severidad]].join(' ')} />,
      etiqueta: (
        <span className="block min-w-0">
          <strong className="block truncate text-navegacion">{aviso.titulo}</strong>
          <small className="block truncate text-auxiliar text-texto-suave">{aviso.detalle}</small>
        </span>
      ),
    })),
  ]
}
