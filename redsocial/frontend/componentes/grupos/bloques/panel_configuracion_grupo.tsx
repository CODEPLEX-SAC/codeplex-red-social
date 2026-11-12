import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { PanelConfiguracionGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const configuracion = catalogoGrupos.detalle.configuracion
const clases = catalogoGrupos.clases.detalle

export function PanelConfiguracionGrupo({ hechos, alAccion, alCerrar }: PanelConfiguracionGrupoProps) {
  const completos = new Set(hechos)
  const progreso = configuracion.progreso.replace(':n', String(hechos.length)).replace(':total', String(configuracion.elementos.length))

  return (
    <section className={clases.tarjeta}>
      <div className={clases.tarjeta_cabecera}>
        <h2 className={clases.titulo_tarjeta}>{configuracion.titulo}</h2>
        <BotonIcono icono="cerrar" type="button" aria-label={configuracion.cerrar} variant="discreto" size="sm" onClick={alCerrar} />
      </div>
      <p className={clases.progreso_texto}>{progreso}</p>
      <div aria-hidden="true" className={clases.barra}>
        <div className={[clases.barra_relleno, configuracion.barra[hechos.length]].join(' ')} />
      </div>
      <p className={clases.ayuda}>{configuracion.ayuda}</p>
      {configuracion.elementos.map((elemento) => (
        <Boton key={elemento.clave} type="button" variant="fantasma" size="default" className={clases.paso} onClick={() => alAccion(elemento.clave)}>
          <Icono name={(completos.has(elemento.clave) ? 'marcar-leido' : elemento.icono) as IconName} className={completos.has(elemento.clave) ? 'h-4 w-4 text-exito-texto' : 'h-4 w-4'} />
          <span className={clases.paso_texto}>{elemento.etiqueta}</span>
        </Boton>
      ))}
    </section>
  )
}
