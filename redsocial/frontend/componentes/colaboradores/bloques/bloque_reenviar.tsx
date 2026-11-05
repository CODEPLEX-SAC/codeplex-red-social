import { imagenUsuarioPredeterminada as usuarioImg, AccionesFilaTabla, AvatarUsuario, Boton } from '../../compartido'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { VigenciaColaborador } from './vigencia_colaborador'
import { CLASES_TABLA } from '../../compartido/clases_tabla'
import { TextoTruncable } from '../../compartido/interfaz/texto_truncable'
import { EstadoColaborador } from './estado_colaborador'
import { IconosAplicaciones } from './iconos_aplicaciones'
import { RolColaborador } from './rol_colaborador'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { puedeDarDeBaja } from './reglas_estado_colaboradores'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const clases = catalogoColaboradores.clases.listado
const botones = catalogoColaboradores.botones
const acciones = catalogoCompartido.acciones_tabla

export function BloqueReenviar({ datos }: {
  datos: {
    c: Colaborador
    alVerColaborador: (colaborador: Colaborador) => void
    alEditarColaborador: (colaborador: Colaborador) => void
    alConfirmarBaja: (colaborador: Colaborador) => void
    alReenviar: (colaborador: Colaborador) => void
  }
}) {
  const { c, alVerColaborador, alEditarColaborador, alConfirmarBaja, alReenviar } = datos
  const etiquetaVer = botones.accion_ver.replace(':nombre', c.nombre)
  const etiquetaEditar = botones.accion_editar.replace(':nombre', c.nombre)
  const etiquetaBaja = botones.accion_baja.replace(':nombre', c.nombre)

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
      <td className={CLASES_TABLA.celda}>
        <RolColaborador c={c} />
      </td>
      <td className={CLASES_TABLA.celda}>
        <IconosAplicaciones aplicaciones={c.aplicaciones} />
      </td>
      <td className={CLASES_TABLA.celda}>
        <EstadoColaborador estado={c.estado} />
      </td>
      <td className={CLASES_TABLA.celda}>
        <VigenciaColaborador c={c} />
      </td>
      <td className={`${CLASES_TABLA.celda} ${CLASES_TABLA.celdaFija}`}>
        {c.acciones === 'reenviar' ? (
          <Boton type="button" variant="contorno" size="mini" onClick={() => alReenviar(c)}>
            {botones.reenviar}
          </Boton>
        ) : (
          <AccionesFilaTabla
            nombre={c.nombre}
            claseContenedor={clases.acciones_fila}
            claseBoton={clases.objetivo_tactil}
            acciones={[
              { icono: 'ver', etiqueta: etiquetaVer, etiquetaMenu: acciones.ver_detalle, alHacerClick: () => alVerColaborador(c) },
              { icono: 'editar-oficial', etiqueta: etiquetaEditar, etiquetaMenu: acciones.editar, clase: clases.accion_editar, alHacerClick: () => alEditarColaborador(c) },
              ...(puedeDarDeBaja(c) ? [{ icono: 'persona-menos' as const, etiqueta: etiquetaBaja, etiquetaMenu: acciones.dar_de_baja, clase: clases.accion_peligro, peligro: true, alHacerClick: () => alConfirmarBaja(c) }] : []),
            ]}
          />
        )}
      </td>
    </tr>
  )
}
