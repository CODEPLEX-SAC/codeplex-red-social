import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { ContextoAdministracionGrupo } from './contexto_administracion_grupo'
import { ModalCrearGrupoComunidad } from './modal_crear_grupo_comunidad'
import { ModalGestionGrupo } from './modal_gestion_grupo'
import { NavegacionAdministracionGrupo } from './navegacion_administracion_grupo'
import { usarAdministracionGrupo } from './usar_administracion_grupo'
import { VistaAdministracionGrupo } from './vista_administracion_grupo'
import { referenciaDeMenu } from './logica_menu_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { AdministracionGrupoProps } from '@/tipos/grupos/contrato_administracion_grupo'

const clases = catalogoGrupos.clases.administracion

export function AdministracionGrupo({ grupo, puerto, children }: AdministracionGrupoProps) {
  const administracion = usarAdministracionGrupo()
  if (grupo.rol !== 'administrador') return <>{children}</>

  const enInicio = administracion.seccion === 'inicio'

  return (
    <ContextoAdministracionGrupo.Provider value={administracion.alternarPanel}>
    <div className={clases.fila}>
      <div className={clases.boton_movil_contenedor}>
        <Boton type="button" variant="secundario" size="md" aria-expanded={administracion.panelAbierto} className={clases.boton_movil} onClick={administracion.alternarPanel}>
          <Icono name="configuracion" className="h-4 w-4" /> {catalogoGrupos.administracion.boton_movil}
        </Boton>
      </div>
      <aside className={administracion.panelAbierto ? clases.aside_abierto : clases.aside_cerrado}>
        <NavegacionAdministracionGrupo grupo={grupo} activa={administracion.seccion} cerradas={administracion.cerradas} alElegir={administracion.elegir} alAlternarCategoria={administracion.alternarCategoria} />
      </aside>
      <div className={clases.contenido}>
        <div hidden={!enInicio}>{children}</div>
        {!enInicio && <VistaAdministracionGrupo seccion={administracion.seccion} grupo={grupo} puerto={puerto} />}
      </div>
      {(administracion.modal === 'solicitudes' || administracion.modal === 'estado') && <ModalGestionGrupo tipo={administracion.modal} grupo={referenciaDeMenu(grupo, String())} puerto={puerto} onConfirmar={administracion.cerrarModal} onCerrar={administracion.cerrarModal} />}
      {administracion.modal === 'editar' && <ModalCrearGrupoComunidad imagen={String()} puerto={puerto} grupo={{ id: grupo.id, nombre: grupo.nombre, descripcion: grupo.descripcion }} onCerrar={administracion.cerrarModal} />}
    </div>
    </ContextoAdministracionGrupo.Provider>
  )
}
