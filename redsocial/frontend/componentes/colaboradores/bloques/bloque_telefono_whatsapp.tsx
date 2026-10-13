import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Selector } from '../../compartido/interfaz/selector'
import { etiquetarCampo, manejarTexto } from './manejadores_campo_colaborador'
import type { CambiarCampoColaborador, DatosColaboradorInvitado } from '@/tipos/colaboradores/contrato_invitar_colaborador'

export function BloqueTelefonoWhatsapp({
  colaborador,
  alCambiarCampo,
}: { colaborador: DatosColaboradorInvitado; alCambiarCampo: CambiarCampoColaborador }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-etiqueta text-texto">{catalogoColaboradores.campos_informacion.telefono_whatsapp}</label>
      <CampoTexto
        valor={colaborador.telefono}
        alCambiar={manejarTexto(alCambiarCampo, 'telefono')}
        inputProps={etiquetarCampo(catalogoColaboradores.campos_informacion.telefono_whatsapp)}
        tipo="tel"
        iconoInicio={
          <span className="flex items-center gap-1">
            <span className="h-3.25 w-4.5 rounded-sm degradado-bandera" />
            <Selector variant="integrado" aria-label={catalogoColaboradores.campos_informacion.codigo_pais} defaultValue={catalogoColaboradores.selectores.codigo_pais.opciones[0]}>
              {catalogoColaboradores.selectores.codigo_pais.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
          </span>
        }
      />
      <span className="text-auxiliar text-texto-suave">{catalogoColaboradores.campos_informacion.telefono_ayuda}</span>
    </div>
  )
}
