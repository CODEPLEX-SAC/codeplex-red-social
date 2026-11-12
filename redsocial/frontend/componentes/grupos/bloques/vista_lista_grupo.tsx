import { Boton } from '../../compartido/interfaz/boton'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { EncabezadoVistaAdministracion } from './encabezado_vista_administracion'
import { usarElementosDemostracion } from './usar_elementos_demostracion'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { VistaListaGrupoProps } from '@/tipos/grupos/contrato_administracion_grupo'

const administracion = catalogoGrupos.administracion
const clases = catalogoGrupos.clases.administracion

export function VistaListaGrupo({ clave, grupo }: VistaListaGrupoProps) {
  const vista = administracion.vistas[clave]
  const inicial = clave === 'registro' ? [{ id: 'creacion', titulo: administracion.demo.creacion, detalle: grupo.creado }, ...administracion.demo.registro] : administracion.demo[clave]
  const lista = usarElementosDemostracion(inicial)

  return (
    <section className={clases.vista}>
      <EncabezadoVistaAdministracion titulo={vista.titulo} descripcion={vista.descripcion} />
      {lista.elementos.length === 0 && <MensajeVacio texto={vista.vacio} className={clases.vacio} />}
      <ul aria-label={vista.titulo} className={clases.lista}>
        {lista.elementos.map((elemento) => (
          <li key={elemento.id} className={clases.fila_lista}>
            <div className={clases.fila_textos}>
              <strong className={clases.fila_titulo}>{elemento.titulo}</strong>
              <span className={clases.fila_detalle}>{elemento.detalle}</span>
            </div>
            <div className={clases.fila_acciones}>
              {vista.acciones.map((accion) => (
                <Boton key={accion} type="button" variant="secundario" size="default" onClick={() => lista.quitar(elemento.id, vista.resultado.replace(':accion', accion).replace(':titulo', elemento.titulo))}>
                  {accion}
                </Boton>
              ))}
            </div>
          </li>
        ))}
      </ul>
      {lista.resultado !== String() && (
        <p aria-live="polite" className={clases.aviso}>
          {lista.resultado}
        </p>
      )}
    </section>
  )
}
