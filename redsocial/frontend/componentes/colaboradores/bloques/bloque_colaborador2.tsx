import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'

const clases = catalogoColaboradores.clases.invitar_resumen
const comun = catalogoColaboradores.clases.invitar_comun

export function BloqueColaborador2({
  RESUMEN_COLABORADOR,
  alEditar,
}: {
  RESUMEN_COLABORADOR: { iniciales: string; nombreCompleto: string; correo: string; telefono: string; }
  alEditar: () => void
}) {
  return (
    <div className={`${comun.tarjeta_compacta} ${comun.separacion}`}>
      <div className={clases.cabecera}>
        <div className={clases.cabecera_titulo}>
          <Icono name="nuevo-usuario" className={comun.glifo_titulo} />
          <h4 className={comun.titulo}>{catalogoColaboradores.campos_resumen.colaborador}</h4>
        </div>
        <BotonIcono icono="editar-oficial" type="button" variant="discreto" size="default" onClick={alEditar} aria-label={catalogoColaboradores.botones.editar_colaborador} />
      </div>
      <div className={clases.colaborador_fila}>
        <AvatarUsuario tamano="lg" iniciales={RESUMEN_COLABORADOR.iniciales} />
        <div className={clases.colaborador_textos}>
          <span className={clases.colaborador_nombre}>{RESUMEN_COLABORADOR.nombreCompleto}</span>
          <span className={clases.colaborador_correo}>{RESUMEN_COLABORADOR.correo}</span>
          <span className={clases.colaborador_telefono}>
            <Icono name="llamada" className={clases.colaborador_glifo_telefono} /> {RESUMEN_COLABORADOR.telefono}
          </span>
        </div>
      </div>
    </div>
  )
}
