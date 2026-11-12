import { Icono } from '../../compartido/icono'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { SeccionBorradorProps } from '@/tipos/mensajeria/contrato_programar_reunion'

const programar = catalogoMensajeria.videollamada.programar
const textos = programar.textos.informacion
const clases = catalogoMensajeria.videollamada.programar.clases

export function SeccionInformacionReunion({ borrador, errores, onCambiar }: SeccionBorradorProps) {
  const contador = textos.contador.replace(':n', String(borrador.descripcion.length)).replace(':max', String(programar.maximo_descripcion))

  return (
    <section className={clases.tarjeta}>
      <h2 className={clases.titulo_tarjeta}>{textos.titulo}</h2>
      <CampoEtiquetado etiqueta={textos.nombre} requerido>
        <CampoTexto valor={borrador.nombre} alCambiar={(valor) => onCambiar('nombre', valor)} marcador={textos.placeholder_nombre} iconoInicio={<Icono name="video" className="h-4 w-4" />} error={errores.nombre !== undefined} mensajeError={errores.nombre} inputProps={{ 'aria-label': textos.nombre }} anchoCompleto />
      </CampoEtiquetado>
      <CampoEtiquetado etiqueta={`${textos.descripcion} ${textos.opcional}`}>
        <CampoTexto valor={borrador.descripcion} alCambiar={(valor) => onCambiar('descripcion', valor)} marcador={textos.placeholder_descripcion} multilinea filas={4} longitudMaxima={programar.maximo_descripcion} inputProps={{ 'aria-label': textos.descripcion }} anchoCompleto />
        <span className={clases.contador}>{contador}</span>
      </CampoEtiquetado>
    </section>
  )
}
