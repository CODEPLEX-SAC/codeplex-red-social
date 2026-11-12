import { Icono } from '../../compartido/icono'
import { Boton, clasesBoton } from '../../compartido/interfaz/boton'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ConfirmacionReunionProgramadaProps } from '@/tipos/mensajeria/contrato_programar_reunion'

const textos = catalogoMensajeria.videollamada.programar.textos.confirmacion
const clases = catalogoMensajeria.videollamada.programar.clases
const MENSAJE_COPIA = { ninguna: String(), copiado: textos.copiado, error: textos.error_copia }

export function ResumenReunionProgramada({ reunion, copia, onCopiar, rutaSala, onCerrar }: ConfirmacionReunionProgramadaProps) {
  return (
    <section aria-label={textos.titulo} className={`${clases.tarjeta} ${clases.confirmacion}`}>
      <h2 className={clases.titulo_tarjeta}>{textos.titulo}</h2>
      <p className={clases.aviso}>{textos.detalle}</p>
      <div className={clases.confirmacion_datos}>
        <strong className="text-nombre-entidad text-texto">{reunion.titulo}</strong>
        <span>{textos.cuando.replace(':fecha', `${reunion.dia} ${reunion.mes}`).replace(':hora', reunion.hora)}</span>
        <span>{textos.invitados.replace(':n', String(reunion.invitados.length))}</span>
      </div>
      <CampoTexto valor={reunion.enlace} soloLectura iconoInicio={<Icono name="enlace" className="h-4 w-4" />} inputProps={{ 'aria-label': textos.etiqueta_enlace }} anchoCompleto />
      <div className={clases.confirmacion_acciones}>
        <Boton type="button" variant="secundario" size="default" onClick={onCopiar}>
          <Icono name="enlace" className="h-4 w-4" /> {textos.copiar}
        </Boton>
        <a href={rutaSala} className={clasesBoton({ variant: 'primario', size: 'default' })}>
          <Icono name="video" className="h-4 w-4" /> {textos.unirme}
        </a>
        <Boton type="button" variant="secundario" size="default" onClick={onCerrar}>
          {textos.volver}
        </Boton>
      </div>
      <p aria-live="polite" className={clases.aviso}>
        {MENSAJE_COPIA[copia]}
      </p>
    </section>
  )
}
