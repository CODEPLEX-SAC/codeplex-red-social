import { useState } from 'react'
import { AvatarUsuario, imagenUsuarioPredeterminada as usuarioImg, Boton, BotonIcono } from '../../compartido'
import { Menu } from '../../compartido/interfaz/menu'
import { TextoTruncable } from '../../compartido/interfaz/texto_truncable'
import { CLASES_TABLA } from '../../compartido/clases_tabla'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { DatosTarjetaColaborador } from './datos_tarjeta_colaborador'
import { elementosMenuColaborador } from './reglas_estado_colaboradores'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import type { AccionesColaborador } from '@/tipos/colaboradores/contrato_listado_colaboradores'

const clases = catalogoColaboradores.clases.listado
const botones = catalogoColaboradores.botones

export function TarjetaColaborador({ c, acciones }: { c: Colaborador; acciones: AccionesColaborador }) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const etiquetaMenu = botones.acciones_de.replace(':nombre', c.nombre)

  return (
    <li className={clases.tarjeta}>
      <div className={clases.tarjeta_cabecera}>
        <AvatarUsuario tamano="md" imagen={usuarioImg} etiqueta={c.nombre} />
        <div className={clases.tarjeta_texto}>
          <TextoTruncable texto={c.nombre} className={CLASES_TABLA.identidad.principal} />
          <TextoTruncable texto={c.correo} className={CLASES_TABLA.identidad.secundario} />
          <TextoTruncable texto={c.telefono} className={CLASES_TABLA.identidad.secundario} />
        </div>
        <BotonIcono
          icono="puntos-verticales"
          type="button"
          aria-label={etiquetaMenu}
          title={etiquetaMenu}
          aria-haspopup="menu"
          aria-expanded={Boolean(ancla)}
          className={clases.objetivo_tactil}
          onClick={(evento) => setAncla(evento.currentTarget)}
        />
      </div>

      <DatosTarjetaColaborador c={c} />

      {c.acciones === 'reenviar' && (
        <div className={clases.tarjeta_accion}>
          <Boton type="button" variant="contorno" size="mini" onClick={() => acciones.alReenviar(c)}>
            {botones.reenviar}
          </Boton>
        </div>
      )}

      <Menu elementos={elementosMenuColaborador(c, acciones)} ancla={ancla} alCerrar={() => setAncla(null)} />
    </li>
  )
}
