import { AlertaEstado } from '../../compartido/interfaz/alerta_estado'
import { Casilla } from '../../compartido/interfaz/casilla'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'
import { partesDeAceptacion } from './logica_terminos_aceptacion'

function fragmentoDeAceptacion(parte: { texto: string; enfasis: boolean }) {
  if (!parte.enfasis) return parte.texto
  return <strong key={parte.texto} className="text-primario">{parte.texto}</strong>
}

export function TerminosAceptacionAcceso({ aceptados, error, onCambiar }: { aceptados: boolean; error: string; onCambiar: (valor: boolean) => void }) {
  const partes = partesDeAceptacion()
  const hayError = error !== String()

  return (
    <div className="flex flex-col gap-1">
      <Casilla
        id={catalogoAcceso.ids.terminos}
        seleccionado={aceptados}
        alCambiar={(_, marcado) => onCambiar(marcado)}
        error={hayError}
        inputProps={{ 'aria-invalid': hayError, 'aria-describedby': hayError ? `${catalogoAcceso.ids.terminos}-error` : undefined }}
        etiqueta={partes.map(fragmentoDeAceptacion)}
      />
      {hayError && <AlertaEstado id={`${catalogoAcceso.ids.terminos}-error`} className="m-0 text-auxiliar text-peligro-texto">{error}</AlertaEstado>}
    </div>
  )
}
