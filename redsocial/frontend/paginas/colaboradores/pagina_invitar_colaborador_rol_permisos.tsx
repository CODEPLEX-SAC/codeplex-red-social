import { BotonIcono, Boton, EstructuraApp } from '../../componentes/compartido'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import { navegar } from '../../rutas/compartido/navegacion'
import type { IconName } from '../../tipos/compartido/contrato_icono'
import type { ClavePermiso } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { MODULOS, FILAS, PERFILES_NIVEL_RAPIDO, PERFIL_APLICADO } from '../../rutas/colaboradores/rutas_colaboradores'
import { BloqueInvitarColaboradorRolPermisos1, SeccionSeleccionarNivelTitulo } from '../../componentes/colaboradores'

const COLUMNAS: { clave: ClavePermiso; icono: IconName; color: string; etiqueta: string }[] = catalogoColaboradores.columnas_permisos as { clave: ClavePermiso; icono: IconName; color: string; etiqueta: string }[]

const CLASES_RADIO: Record<ClavePermiso, { bg: string; punto: string }> = {
  'sin-acceso': { bg: 'bg-t-fef2f2 border-rojo-categoria', punto: 'bg-rojo-categoria' },
  ver: { bg: 'bg-t-eff6ff border-azul-categoria', punto: 'bg-azul-categoria' },
  crear: { bg: 'bg-t-ecfdf5 border-t-10b981', punto: 'bg-t-10b981' },
  editar: { bg: 'bg-t-fff7ed border-naranja-categoria', punto: 'bg-naranja-categoria' },
  eliminar: { bg: 'bg-t-fef2f2 border-rojo-categoria', punto: 'bg-rojo-categoria' },
  imprimir: { bg: 'bg-t-f5f3ff border-violeta-categoria', punto: 'bg-violeta-categoria' },
  exportar: { bg: 'bg-t-ecfdf5 border-t-10b981', punto: 'bg-t-10b981' },
}

function RadioPermiso({ activo }: { activo: boolean }) {
  if (!activo) {
    return <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-t-d1d5db bg-white" />
  }
  return null
}

function CeldaPermiso({ columna, activa }: { columna: (typeof COLUMNAS)[number]; activa: boolean }) {
  if (!activa) return <RadioPermiso activo={false} />
  const clases = CLASES_RADIO[columna.clave]
  return (
    <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full border-2 ${clases.bg}`}>
      <span className={`h-2.5 w-2.5 rounded-full ${clases.punto}`} />
    </span>
  )
}

const NAVEGAR_A = navegar

export function PaginaInvitarColaboradorRolPermisos() {
  return (
    <EstructuraApp paginaActiva="colaboradores">
      <div className="mx-auto my-5 max-w-240 overflow-hidden rounded-2xl bg-white shadow-t13 max-960:m-3 max-960:rounded-xl max-480:m-1">
        <div className="flex items-start justify-between px-7 pt-6 max-768:px-4 max-768:pt-4 max-480:px-3 max-480:pt-3">
          <div>
            <h1 className="m-0 mb-1 text-titulo-pagina font-bold text-gris-oscuro-texto">{catalogoColaboradores.titulos.invitar_rol_permisos}</h1>
            <p className="m-0 max-w-125 text-subtitulo leading-snug text-gris-texto-secundario">
              {catalogoColaboradores.subtitulos.invitar_asistente}
            </p>
          </div>
          <div className="flex flex-none items-center gap-2 max-768:gap-1">
            <BotonIcono icono="ajustes-sistema" type="button" title={textosRedSocial.CONFIGURACION} aria-label={textosRedSocial.CONFIGURACION} variant="sutil" size="default" />
            <BotonIcono icono={'aplicaciones' as IconName} type="button" title={textosRedSocial.APLICACIONES} aria-label={textosRedSocial.APLICACIONES} variant="sutil" size="default" />
            <BotonIcono icono="campana" type="button" title={textosRedSocial.AVISO_CAMPANA} aria-label={textosRedSocial.AVISO_CAMPANA} variant="sutil" size="default" />
            <BotonIcono icono="cerrar" type="button" title={textosRedSocial.CERRAR} onClick={() => NAVEGAR_A(catalogoColaboradores.rutas.listado)} aria-label={textosRedSocial.CERRAR} variant="sutil" size="default" />
          </div>
        </div>

        <BloqueInvitarColaboradorRolPermisos1 />

        <div className="px-7 pt-5 max-768:px-4">
          <h2 className="m-0 mb-1 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoColaboradores.pasos_invitar.rol_permisos.titulo}</h2>
          <p className="m-0 text-subtitulo leading-snug text-gris-texto-secundario">{catalogoColaboradores.pasos_invitar.rol_permisos.subtitulo}</p>
        </div>

        <SeccionSeleccionarNivelTitulo
          MODULOS={MODULOS}
          PERFIL_APLICADO={PERFIL_APLICADO}
          PERFILES_NIVEL_RAPIDO={PERFILES_NIVEL_RAPIDO}
          FILAS={FILAS}
          CeldaPermiso={CeldaPermiso}
        />

        <div className="flex items-center justify-end gap-3 border-t border-gris-borde px-7 py-4 max-768:flex-col-reverse max-480:px-3 max-480:py-2.5">
          <Boton type="button" onClick={() => NAVEGAR_A(catalogoColaboradores.rutas.listado)} variant="secundario" size="md" className="max-768:w-full max-768:justify-center max-480:px-3 max-480:py-2.25">
            {textosRedSocial.CANCELAR}
          </Boton>
          <Boton type="button" onClick={() => NAVEGAR_A(catalogoColaboradores.rutas.invitar)} variant="secundario" size="md" className="max-768:w-full max-768:justify-center max-480:px-3 max-480:py-2.25">
            <span>‹</span> {catalogoColaboradores.campos_rol_permisos.anterior}
          </Boton>
          <Boton type="button" onClick={() => NAVEGAR_A(catalogoColaboradores.rutas.invitar_vigencia)} variant="primario" size="md" className="max-768:w-full max-768:justify-center max-480:px-3 max-480:py-2.25">
            {textosRedSocial.SIGUIENTE} <span>›</span>
          </Boton>
        </div>
      </div>
    </EstructuraApp>
  )
}
