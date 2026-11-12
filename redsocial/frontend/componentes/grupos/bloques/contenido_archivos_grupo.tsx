import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { usarArchivosGrupo } from './usar_archivos_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'

const textos = catalogoGrupos.detalle.archivos
const clases = catalogoGrupos.clases.detalle
const BYTES_POR_KB = 1024

export function ContenidoArchivosGrupo() {
  const estado = usarArchivosGrupo()

  return (
    <section className={clases.tarjeta}>
      <div className={clases.multimedia_cabecera}>
        <h2 className={clases.titulo_tarjeta}>{textos.titulo}</h2>
        <Boton type="button" variant="primario" size="default" onClick={estado.abrirSelector}>
          <Icono name="adjuntar" className="h-4 w-4" /> {textos.subir}
        </Boton>
        <input ref={estado.selector} type="file" multiple hidden tabIndex={-1} aria-label={textos.etiqueta_selector} onChange={estado.elegir} />
      </div>
      {estado.archivos.length === 0 && <MensajeVacio texto={textos.vacio} className={clases.vacio} />}
      {estado.archivos.length > 0 && (
        <>
          <p aria-live="polite" className={clases.aviso}>
            {textos.pendiente}
          </p>
          <ul className={clases.archivos_lista}>
            {estado.archivos.map((archivo, indice) => (
              <li key={`${archivo.name}-${indice}`} className={clases.archivo_fila}>
                <Icono name="archivo-generico" className="h-5 w-5" />
                <span className={clases.archivo_nombre}>{archivo.name}</span>
                <span className={clases.archivo_tamano}>{Math.max(1, Math.round(archivo.size / BYTES_POR_KB))} KB</span>
                <BotonIcono icono="cerrar" type="button" aria-label={textos.quitar.replace(':nombre', archivo.name)} variant="discreto" size="sm" onClick={() => estado.quitar(indice)} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
