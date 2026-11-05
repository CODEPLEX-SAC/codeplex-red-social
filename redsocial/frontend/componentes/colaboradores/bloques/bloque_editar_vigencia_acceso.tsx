import { CodeplexProveedorFechas } from '@codeplex-sac/selectores-fecha'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { SelectorFecha } from '../../compartido/interfaz/selector_fecha'
import { SelectorHora } from '../../compartido/interfaz/selector_hora'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { fechaComoDayjs, textoDeFecha } from './logica_colaboradores'
import { componerAcceso, horaDeAcceso } from './logica_hora_acceso'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import type { BorradorColaborador, CambiarBorrador } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

const textos = catalogoColaboradores.editar
const fechas = catalogoColaboradores.panel_filtros_avanzados
const clases = catalogoColaboradores.clases.edicion
const detalle = catalogoColaboradores.clases.detalle
const CLAVES = textos.clave_borrador as Record<string, keyof BorradorColaborador>

export function BloqueEditarVigenciaAcceso({ colaborador, borrador, alCambiar }: { colaborador: Colaborador; borrador: BorradorColaborador; alCambiar: CambiarBorrador }) {
  return (
    <section className={detalle.seccion}>
      <h3 className={detalle.titulo_seccion}>{catalogoColaboradores.secciones.vigencia_y_acceso}</h3>
      <CodeplexProveedorFechas idioma={fechas.idioma}>
        <div className={clases.campos_rejilla}>
          <CampoEtiquetado variante="compacta" etiqueta={textos.fecha_inicio} requerido>
            <SelectorFecha nombreAccesible={textos.fecha_inicio} valor={fechaComoDayjs(borrador.fechaInicio)} alCambiar={(valor) => alCambiar(CLAVES.fecha_inicio, textoDeFecha(valor))} marcador={fechas.marcador_fecha} formato={fechas.formato_fecha} />
          </CampoEtiquetado>
          <CampoEtiquetado variante="compacta" etiqueta={textos.fecha_fin} requerido>
            <SelectorFecha
              nombreAccesible={textos.fecha_fin}
              valor={fechaComoDayjs(borrador.fechaFin)}
              alCambiar={(valor) => alCambiar(CLAVES.fecha_fin, textoDeFecha(valor))}
              minFecha={fechaComoDayjs(borrador.fechaInicio) ?? undefined}
              marcador={fechas.marcador_fecha}
              formato={fechas.formato_fecha}
            />
          </CampoEtiquetado>
          {colaborador.fechaInvitacion && (
            <CampoEtiquetado variante="compacta" etiqueta={catalogoColaboradores.perfil.informacion_general.fecha_invitacion}>
              <SelectorFecha lecturaSola nombreAccesible={catalogoColaboradores.perfil.informacion_general.fecha_invitacion} valor={fechaComoDayjs(colaborador.fechaInvitacion)} marcador={fechas.marcador_fecha} formato={fechas.formato_fecha} />
            </CampoEtiquetado>
          )}
          {colaborador.ultimoAcceso && (
            <CampoEtiquetado variante="compacta" etiqueta={catalogoColaboradores.perfil.informacion_general.ultimo_acceso}>
              <SelectorHora
                nombreAccesible={catalogoColaboradores.perfil.informacion_general.ultimo_acceso}
                valor={horaDeAcceso(borrador.ultimoAcceso)}
                alCambiar={(hora) => alCambiar(CLAVES.ultimo_acceso, componerAcceso(borrador.ultimoAcceso, hora))}
                formato={textos.hora_acceso.formato}
              />
            </CampoEtiquetado>
          )}
        </div>
      </CodeplexProveedorFechas>
    </section>
  )
}
