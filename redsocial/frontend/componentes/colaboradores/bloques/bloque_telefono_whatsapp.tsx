import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Selector } from '../../compartido/interfaz/selector'

export function BloqueTelefonoWhatsapp({
  FORM_INFORMACION_DEFAULT,
}: {
  FORM_INFORMACION_DEFAULT: { nombres: string; apellidos: string; correo: string; telefono: string; documentoNumero: string; cargo: string; }
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-campo-formulario font-medium text-gris-texto">{catalogoColaboradores.campos_informacion.telefono_whatsapp}</label>
      <CampoTexto
        defaultValue={FORM_INFORMACION_DEFAULT.telefono}
        tipo="tel"
        iconoInicio={
          <span className="flex items-center gap-1">
            <span className="h-3.25 w-4.5 rounded-sm degradado-bandera" />
            <Selector variant="integrado" defaultValue={catalogoColaboradores.selectores.codigo_pais.opciones[0]}>
              {catalogoColaboradores.selectores.codigo_pais.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
          </span>
        }
      />
      <span className="text-auxiliar text-gris-texto-terciario">{catalogoColaboradores.campos_informacion.telefono_ayuda}</span>
    </div>
  )
}
