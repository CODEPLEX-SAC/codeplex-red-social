import { EstructuraApp, MensajeEmergente, MensajeEstadoBusqueda, usarBusqueda } from '../../componentes/compartido'
import { BannerOrganizaGuardados, BuscadorGuardados, ColumnaAccionesGuardados, ColumnaColeccionesGuardados, EncabezadoGuardados, FiltrosGuardados, ModalesGuardados, PanelCentralGuardados, PestanasGuardados, usarGuardados } from '../../componentes/guardados'
import catalogoGuardados from '../../catalogos/capacidades/redsocial/guardados.json'
import { BUSQUEDA_GRUPOS_GUARDADOS, COLECCIONES_GUARDADAS, GRUPOS_GUARDADOS } from '../../rutas/guardados/rutas_guardados'

const clases = catalogoGuardados.clases

export function PaginaGuardados() {
  const busqueda = usarBusqueda(BUSQUEDA_GRUPOS_GUARDADOS.fuente, { modo: BUSQUEDA_GRUPOS_GUARDADOS.modo })
  const control = usarGuardados({ coleccionesIniciales: COLECCIONES_GUARDADAS, todosLosGrupos: GRUPOS_GUARDADOS, busqueda })
  const { navegacion, acciones, movil } = control
  const crear = () => acciones.abrir({ tipo: 'crear' })

  return (
    <EstructuraApp paginaActiva="guardados">
      <EncabezadoGuardados alCrear={crear} />
      <PestanasGuardados activa={navegacion.pestana} alCambiar={navegacion.cambiarPestana} />
      <BuscadorGuardados texto={busqueda.texto} alBuscar={(evento) => busqueda.cambiarTexto(evento.target.value)} />
      {navegacion.pestana === 'elementos' && <FiltrosGuardados activo={navegacion.filtro} alCambiar={navegacion.cambiarFiltro} />}
      <MensajeEstadoBusqueda estado={busqueda.estado} error={busqueda.error} />
      <div className={movil ? clases.centro : clases.rejilla}>
        {!movil && <ColumnaColeccionesGuardados control={control} />}
        <PanelCentralGuardados control={control} />
        {!movil && <ColumnaAccionesGuardados control={control} />}
      </div>
      {movil && <BannerOrganizaGuardados horizontal alCrear={crear} />}
      {acciones.modal && <ModalesGuardados control={control} modal={acciones.modal} />}
      {acciones.aviso && <MensajeEmergente abierto variante="exito" mensaje={acciones.aviso} alCerrar={acciones.cerrarAviso} />}
    </EstructuraApp>
  )
}
