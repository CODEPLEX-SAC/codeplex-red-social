import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import { Casilla } from '../../compartido/interfaz/casilla'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Menu } from '../../compartido/interfaz/menu'
import { BloqueColaboradores3 } from './bloque_colaboradores3'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

export function BloqueReenviar({ datos }: {
  datos: {
    c: Colaborador
    ROL_CLASES: Record<string, string>
    estado: { texto: string; punto: string; etiqueta: string; }
    setMenuAbierto: (valor: number | null | ((actual: number | null) => number | null)) => void
    i: number
    setAnclaMenu: (valor: HTMLElement | null | ((actual: HTMLElement | null) => HTMLElement | null)) => void
    menuAbierto: number | null
    anclaMenu: HTMLElement | null
    cerrarMenus: () => void
    alVerColaborador: (colaborador: Colaborador) => void
    alEditarColaborador: (colaborador: Colaborador) => void
    alConfirmarBaja: (colaborador: Colaborador) => void
    seleccionado: boolean
    alCambiarSeleccion: (_: unknown, marcado: boolean) => void
  }
}) {
  const {
    c,
    ROL_CLASES,
    estado,
    setMenuAbierto,
    i,
    setAnclaMenu,
    menuAbierto,
    anclaMenu,
    cerrarMenus,
    alVerColaborador,
    alEditarColaborador,
    alConfirmarBaja,
    seleccionado,
    alCambiarSeleccion,
  } = datos
  return (
    <tr className="border-b border-t-f3f4f6 last:border-b-0 hover:bg-t-fafafe">
      <td className="p-3.5 text-center align-middle">
        <Casilla seleccionado={seleccionado} alCambiar={alCambiarSeleccion} inputProps={{ 'aria-label': c.nombre }} />
      </td>
      <td className="p-3.5 align-middle">
        <div className="flex w-44 items-center gap-3">
          <img src={usuarioImg} alt={c.nombre} className="h-10 w-10 flex-none rounded-full bg-gris-borde object-cover" />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-nombre-entidad font-semibold text-gris-oscuro-texto">{c.nombre}</span>
            <span className="truncate text-auxiliar text-gris-texto-terciario">{c.correo}</span>
            <span className="truncate text-auxiliar text-gris-texto-terciario">{c.telefono}</span>
          </div>
        </div>
      </td>
      <td className="p-3.5 align-middle">
        <div className="flex flex-col gap-0.5">
          <span className={`inline-block whitespace-nowrap rounded-md px-2.5 py-0.75 text-etiqueta-estado font-semibold ${ROL_CLASES[c.rolClase]}`}>
            {c.rol}
          </span>
          <span className="text-auxiliar text-gris-texto-terciario">{c.descripcionRol}</span>
        </div>
      </td>
      <td className="p-3.5 align-middle">
        <div className="flex items-center gap-1">
          {c.aplicaciones.map((app) => (
            <span key={[app.icono, app.clase].join()} className={`flex h-7 w-7 flex-none items-center justify-center rounded-md ${app.clase}`}>
              <Icono name={app.icono} className="w-3.5 h-3.5 text-white" />
            </span>
          ))}
          {c.masApps && <span className="ml-0.5 text-contador font-semibold text-primario">+{c.masApps}</span>}
        </div>
      </td>
      <td className="p-3.5 align-middle">
        <span className={`inline-flex items-center gap-1.25 whitespace-nowrap text-etiqueta-estado font-medium ${estado.texto}`}>
          <span className={`h-1.75 w-1.75 flex-none rounded-full ${estado.punto}`} />
          {estado.etiqueta}
        </span>
      </td>
      <BloqueColaboradores3 c={c} />
      <td className="p-3.5 text-center align-middle">
        {c.acciones === 'reenviar' ? (
          <Boton type="button" variant="secundario" size="mini">
            {catalogoColaboradores.botones.reenviar}
          </Boton>
        ) : (
          <>
            <BotonIcono icono="puntos" type="button" aria-label={catalogoColaboradores.botones.mas_opciones} onClick={(evento) => { evento.stopPropagation(); setMenuAbierto(i); setAnclaMenu(evento.currentTarget) }} variant="sutil" size="default" />
            {menuAbierto === i && (
              <Menu
                ancla={anclaMenu}
                alCerrar={cerrarMenus}
                elementos={[
                  { etiqueta: catalogoColaboradores.botones.ver_colaborador, alHacerClick: () => alVerColaborador(c) },
                  { etiqueta: catalogoColaboradores.botones.editar_colaborador, alHacerClick: () => alEditarColaborador(c) },
                  { etiqueta: catalogoColaboradores.botones.dar_de_baja, peligro: true, alHacerClick: () => alConfirmarBaja(c) },
                ]}
              />
            )}
          </>
        )}
      </td>
    </tr>
  )
}
