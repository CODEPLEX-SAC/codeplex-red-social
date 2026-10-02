import { posicionesDe } from '../../compartido/posiciones'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Casilla } from '../../compartido/interfaz/casilla'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoAvisos from '../../../catalogos/capacidades/redsocial/avisos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { FilaAvisoProps } from '@/tipos/avisos/contrato_aviso'

export function FilaAviso({ aviso: n, claseIcono, seleccionable }: FilaAvisoProps) {
  return (
    <article className="flex items-start gap-3 border-b border-t-f0eef5 p-3.5 last:border-b-0 hover:bg-t-fdfcff">
      {seleccionable && <Casilla />}

      {n.tipo === 'avatar' ? (
        <span className="relative flex-none">
          <AvatarImagen src={usuarioImg} className="h-10 w-10 rounded-full bg-primario-suave" />
          {n.conInsigniaIcono && (
            <span className={`absolute -bottom-0.5 -right-0.5 grid h-4.5 w-4.5 place-items-center rounded-full border-2 border-white ${claseIcono}`}>
              <Icono name={n.icono} className="h-2.5 w-2.5" />
            </span>
          )}
        </span>
      ) : (
        <div className={`grid h-10 w-10 flex-none place-items-center rounded-full ${claseIcono}`}>
          <Icono name={n.icono} className="h-4.5 w-4.5" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="m-0 text-cuerpo text-texto">
          <span className="font-bold text-texto">{n.nombreUsuario}</span>
          {n.nombreGrupo && <span className="font-bold text-primario"> {n.nombreGrupo}</span>}
          {n.accion && <span className="text-texto-suave"> {n.accion}</span>}
        </p>
        {n.detalle && <p className="m-0 mt-0.5 truncate text-auxiliar text-texto-suave">{n.detalle}</p>}
        <span className="mt-1 block text-fecha-abreviada text-t-aaa7b5">{n.tiempo}</span>
      </div>

      {n.avataresExtra !== undefined && (
        <div className="flex flex-none items-center">
          {posicionesDe(2).map((posicion) => (
            <AvatarImagen key={posicion.id} src={usuarioImg} className={'h-6 w-6 rounded-full border-2 border-white bg-primario-suave' + (posicion.orden > 0 ? ' -ml-1.5' : '')} />
          ))}
          <span className="-ml-1.5 grid h-6 w-6 place-items-center rounded-full border-2 border-white bg-t-ede9fe text-contador font-bold text-primario">
            +{n.avataresExtra}
          </span>
        </div>
      )}

      {n.solicitud ? (
        <div className="flex flex-none items-center gap-2">
          <Boton type="button" variant="primario" size="mini">
            {catalogoAvisos.botones.confirmar}
          </Boton>
          <Boton type="button" variant="secundario" size="mini">
            {catalogoAvisos.botones.eliminar}
          </Boton>
        </div>
      ) : (
        <>
          <span className={'mt-1.5 h-2 w-2 flex-none rounded-full ' + (n.leida ? 'bg-transparent' : 'bg-primario')} />
          <BotonIcono icono="puntos" type="button" aria-label={textosRedSocial.MAS_OPCIONES} variant="discreto" size="sm" className="flex-none" />
        </>
      )}
    </article>
  )
}
