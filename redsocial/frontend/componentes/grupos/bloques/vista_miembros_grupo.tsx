import { useState } from 'react'
import { ContenidoMiembrosGrupo } from './contenido_miembros_grupo'
import { FilaMiembroGrupo } from './fila_miembro_grupo'
import { EncabezadoVistaAdministracion } from './encabezado_vista_administracion'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { VistaMiembrosGrupoProps } from '@/tipos/grupos/contrato_administracion_grupo'

const vista = catalogoGrupos.administracion.vistas.administradores
const clases = catalogoGrupos.clases.administracion

export function VistaMiembrosGrupo({ grupo, soloAdministradores }: VistaMiembrosGrupoProps) {
  const [aviso, setAviso] = useState(String())
  const administradores = grupo.miembrosLista.filter((miembro) => miembro.rol === 'administrador')

  return (
    <div className={clases.vista_miembros}>
      {soloAdministradores && (
        <section className={clases.vista}>
          <EncabezadoVistaAdministracion titulo={vista.titulo} descripcion={catalogoGrupos.detalle.miembros.administradores.replace(':n', String(administradores.length))} />
          {administradores.length === 0 && <MensajeVacio texto={vista.vacio} className={clases.vacio} />}
          {administradores.map((miembro) => (
            <FilaMiembroGrupo key={miembro.id} miembro={miembro} grupo={grupo} alAccion={setAviso} />
          ))}
        </section>
      )}
      {!soloAdministradores && <ContenidoMiembrosGrupo grupo={grupo} alAccion={setAviso} />}
      {aviso !== String() && (
        <p aria-live="polite" className={clases.aviso}>
          {aviso}
        </p>
      )}
    </div>
  )
}
