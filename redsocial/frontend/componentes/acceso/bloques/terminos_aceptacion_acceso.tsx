import { Casilla } from '../../compartido/interfaz/casilla'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'

const aceptacion = catalogoAcceso.terminos_aceptacion
const MARCADORES = new RegExp(`(${aceptacion.marcadores})`)
const REEMPLAZOS: Record<string, string> = { ':uso': aceptacion.uso, ':privacidad': aceptacion.privacidad }

export function TerminosAceptacionAcceso({ aceptados, error, onCambiar }: { aceptados: boolean; error: string; onCambiar: (valor: boolean) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <Casilla
        id={catalogoAcceso.ids.terminos}
        seleccionado={aceptados}
        alCambiar={(_, marcado) => onCambiar(marcado)}
        error={error !== ''}
        inputProps={{ 'aria-invalid': error !== '', 'aria-describedby': error === '' ? undefined : `${catalogoAcceso.ids.terminos}-error` }}
        etiqueta={aceptacion.texto.split(MARCADORES).map((parte) => (REEMPLAZOS[parte] ? <strong key={parte} className="text-primario">{REEMPLAZOS[parte]}</strong> : parte))}
      />
      {error !== '' && <p id={`${catalogoAcceso.ids.terminos}-error`} role="alert" className="m-0 text-auxiliar text-peligro-texto">{error}</p>}
    </div>
  )
}
