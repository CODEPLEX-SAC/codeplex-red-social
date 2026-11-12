import { Icono } from '../../compartido/icono'
import { clasesBoton } from '../../compartido/interfaz/boton'
import { TarjetaLateralGrupos } from './tarjeta_lateral_grupos'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { LateralAdministradosGruposProps } from '@/tipos/grupos/contrato_lateral_grupos'

const textos = catalogoGrupos.lateral.administrados
const clases = catalogoGrupos.clases.pagina_lateral
const demo = catalogoGrupos.administracion.demo
const CANTIDADES: Record<string, number> = { solicitudes: 0, publicaciones: demo.pendientes.length, incidencias: demo.incidencias.length }

export function LateralAdministradosGrupos({ grupos, puerto }: LateralAdministradosGruposProps) {
  const miembros = grupos.reduce((total, grupo) => total + (puerto.detalle(grupo.id)?.totalMiembros ?? 0), 0)
  const destino = grupos[0]?.ruta

  return (
    <>
      <TarjetaLateralGrupos titulo={textos.resumen.titulo} texto={textos.resumen.texto} icono="grupos">
        <div className={clases.indicadores}>
          <div className={clases.indicador}>
            <strong className={clases.indicador_valor}>{grupos.length.toLocaleString('es')}</strong>
            <span className={clases.indicador_etiqueta}>{textos.resumen.grupos}</span>
          </div>
          <div className={clases.indicador}>
            <strong className={clases.indicador_valor}>{miembros.toLocaleString('es')}</strong>
            <span className={clases.indicador_etiqueta}>{textos.resumen.miembros}</span>
          </div>
        </div>
      </TarjetaLateralGrupos>
      <section aria-label={textos.pendientes.titulo} className={clases.tarjeta}>
        <h2 className={clases.titulo}>{textos.pendientes.titulo}</h2>
        <ul className={clases.lista}>
          {textos.pendientes.filas.map((fila) => (
            <li key={fila.clave} className={clases.fila}>
              <Icono name={fila.icono as IconName} className={clases.icono} />
              <span className={clases.fila_titulo}>
                {CANTIDADES[fila.clave]} {fila.etiqueta}
              </span>
            </li>
          ))}
        </ul>
        <p className={clases.aviso}>{textos.pendientes.demostracion}</p>
      </section>
      <TarjetaLateralGrupos titulo={textos.gestion.titulo} texto={textos.gestion.texto} icono="configuracion" variante="verde">
        {destino && (
          <a href={destino} className={clasesBoton({ variant: 'contorno', size: 'md', className: clases.boton_ancho })}>
            {textos.gestion.boton}
          </a>
        )}
      </TarjetaLateralGrupos>
    </>
  )
}
