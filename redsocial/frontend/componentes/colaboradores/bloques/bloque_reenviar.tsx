import { Icono, imagenUsuarioPredeterminada as usuarioImg, AvatarUsuario, Insignia, Boton, BotonIcono, Menu } from '../../compartido'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { BloqueColaboradores3 } from './bloque_colaboradores3'
import { CLASES_TABLA } from '../../compartido/clases_tabla'
import { TextoTruncable } from '../../compartido/interfaz/texto_truncable'
import { opcionesMenuFila } from './reglas_estado_colaboradores'
import { resumirAplicaciones } from './logica_colaboradores'
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
    alReenviar: (colaborador: Colaborador) => void
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
    alReenviar,
  } = datos
  const aplicaciones = resumirAplicaciones(c, catalogoColaboradores.celda_aplicaciones.max_iconos)
  return (
    <tr className={CLASES_TABLA.fila}>
      <td className={`${CLASES_TABLA.celda} ${CLASES_TABLA.columnaAjustada}`}>
        <div className={CLASES_TABLA.identidad.contenedor}>
          <AvatarUsuario tamano="md" imagen={usuarioImg} etiqueta={c.nombre} />
          <div className={CLASES_TABLA.identidad.texto}>
            <TextoTruncable texto={c.nombre} className={CLASES_TABLA.identidad.principal} />
            <TextoTruncable texto={c.correo} className={CLASES_TABLA.identidad.secundario} />
            <TextoTruncable texto={c.telefono} className={CLASES_TABLA.identidad.secundario} />
          </div>
        </div>
      </td>
      <td className={`${CLASES_TABLA.celda} ${CLASES_TABLA.columnas.etiquetas}`}>
        <div className="flex flex-col gap-0.5">
          <span className={`inline-block whitespace-nowrap rounded-md px-2.5 py-0.75 text-badge ${ROL_CLASES[c.rolClase] ?? ROL_CLASES.predeterminado}`}>
            {c.rol}
          </span>
          <span className="text-auxiliar text-texto-suave">{c.descripcionRol}</span>
        </div>
      </td>
      <td className={`${CLASES_TABLA.celda} ${CLASES_TABLA.columnas.iconos}`}>
        <div className="flex items-center gap-1">
          {aplicaciones.visibles.map((app) => (
            <span key={app.nombre} title={app.nombre} className={`flex h-7 w-7 flex-none items-center justify-center rounded-md ${app.clase}`}>
              <Icono name={app.icono} className="w-3.5 h-3.5 text-white" />
            </span>
          ))}
          {aplicaciones.ocultas > 0 && <span className="ml-0.5 text-conteo text-primario">+{aplicaciones.ocultas}</span>}
        </div>
      </td>
      <td className={`${CLASES_TABLA.celda} ${CLASES_TABLA.columnas.estado}`}>
        <Insignia variant="status" className={`inline-flex items-center gap-1.25 whitespace-nowrap text-estado ${estado.texto}`} punto={estado.punto}>
          {estado.etiqueta}
        </Insignia>
      </td>
      <BloqueColaboradores3 c={c} />
      <td className={`${CLASES_TABLA.celda} ${CLASES_TABLA.celdaFija} text-center`}>
        {c.acciones === 'reenviar' ? (
          <Boton type="button" variant="secundario" size="mini" onClick={() => alReenviar(c)}>
            {catalogoColaboradores.botones.reenviar}
          </Boton>
        ) : (
          <>
            <BotonIcono icono="puntos" type="button" aria-label={catalogoColaboradores.botones.mas_opciones} onClick={(evento) => { evento.stopPropagation(); setMenuAbierto(i); setAnclaMenu(evento.currentTarget) }} variant="sutil" size="default" />
            {menuAbierto === i && (
              <Menu
                ancla={anclaMenu}
                alCerrar={cerrarMenus}
                elementos={opcionesMenuFila(c, { alVer: () => alVerColaborador(c), alEditar: () => alEditarColaborador(c), alDarDeBaja: () => alConfirmarBaja(c) })}
              />
            )}
          </>
        )}
      </td>
    </tr>
  )
}
