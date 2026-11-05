import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { CLASES_TABLA, claseEncabezadoTabla } from '../../compartido/clases_tabla'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import { Modal } from '../../compartido/interfaz/modal'
import type { RolModulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const clases = catalogoColaboradores.clases.invitar_permisos
const textos = catalogoColaboradores.dialogos_rol
const encabezado = claseEncabezadoTabla()

export interface ModalAdministrarRolesProps {
  modulo: string
  roles: RolModulo[]
  alEditar: (rol: RolModulo) => void
  alDuplicar: (rol: RolModulo) => void
  alEliminar: (rol: RolModulo) => void
  alCerrar: () => void
}

export function ModalAdministrarRoles({ modulo, roles, alEditar, alDuplicar, alEliminar, alCerrar }: ModalAdministrarRolesProps) {
  const titulo = textos.titulos.administrar.replace(':modulo', modulo)

  return (
    <Modal titulo={titulo} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={alCerrar} className={clases.modal_rol}>
      <div className={clases.rol_cuerpo}>
        <p className={clases.ajuste_nota}>{textos.nota_administrar}</p>
        <div className={CLASES_TABLA.contenedor}>
          <table className={CLASES_TABLA.tabla} aria-label={titulo}>
            <thead>
              <tr>
                <th scope="col" className={encabezado}>{textos.columnas.rol}</th>
                <th scope="col" className={encabezado}>{textos.columnas.tipo}</th>
                <th scope="col" className={encabezado}>{textos.columnas.acciones}</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((rol) => (
                <tr key={rol.clave} className={CLASES_TABLA.fila}>
                  <td className={CLASES_TABLA.celda}>
                    <span className={clases.rol_nombre_celda}>
                      <Icono name="colaborador" className={clases.rol_nombre_glifo} />
                      <span className={CLASES_TABLA.identidad.principal}>{rol.etiqueta}</span>
                    </span>
                  </td>
                  <td className={CLASES_TABLA.celda}>
                    <Insignia variant="status" className={rol.creado ? clases.rol_tipo_editable : clases.rol_tipo_predefinido}>{rol.creado ? textos.tipos.empresa : textos.tipos.predefinido}</Insignia>
                  </td>
                  <td className={CLASES_TABLA.celda}>
                    <span className={clases.rol_acciones_celda}>
                      <BotonIcono icono="editar-oficial" type="button" variant="sutil" size="md" aria-label={textos.acciones.editar.replace(':rol', rol.etiqueta)} onClick={() => alEditar(rol)} />
                      <BotonIcono icono="copiar" type="button" variant="sutil" size="md" aria-label={textos.acciones.duplicar.replace(':rol', rol.etiqueta)} onClick={() => alDuplicar(rol)} />
                      {rol.creado && <BotonIcono icono="eliminar" type="button" variant="sutil" size="md" className={clases.rol_accion_eliminar} aria-label={textos.acciones.eliminar.replace(':rol', rol.etiqueta)} onClick={() => alEliminar(rol)} />}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={clases.rol_pie}>
        <Boton type="button" variant="secundario" size="md" onClick={alCerrar}>{textos.cerrar}</Boton>
      </div>
    </Modal>
  )
}
