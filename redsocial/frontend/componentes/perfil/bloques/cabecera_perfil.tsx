import { Icono } from '../../compartido/icono'
import { Boton, clasesBoton } from '../../compartido/interfaz/boton'
import { Valoracion } from '../../compartido/interfaz/valoracion'
import { FotoPerfilCabecera } from './foto_perfil_cabecera'
import { estadisticasDe } from './logica_cabecera_perfil'
import { RedesCabeceraPerfil } from './redes_cabecera_perfil'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { CabeceraPerfilProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.cabecera
const botones = catalogoPerfil.botones
const clases = catalogoPerfil.clases

export function CabeceraPerfil({ perfil, relacion, totalPublicaciones, amigosEnComun, onAlternarSolicitud, onEditar, onGuardar }: CabeceraPerfilProps) {
  const solicitudEnviada = relacion === 'solicitud_enviada'
  const propio = relacion === 'propio'
  const estadisticas = estadisticasDe(textos.estadisticas_items, { publicaciones: totalPublicaciones, amigos: perfil.amigos.length, en_comun: amigosEnComun }, propio)
  const datos = textos.datos.filter((dato) => perfil.detallesFijados[dato.fijado as keyof typeof perfil.detallesFijados] && perfil[dato.clave as 'ubicacion' | 'estudios' | 'empresa'])

  return (
    <article className={clases.tarjeta}>
      <a href={catalogoInicio.rutas.principal} aria-label={botones.volver_a_inicio} className={clases.volver}>
        <Icono name="flecha-izquierda" className="h-4 w-4" />
      </a>
      <div className={clases.cuerpo}>
        <div className={clases.identidad}>
          <FotoPerfilCabecera perfil={perfil} propio={propio} onElegirFoto={(archivo) => onGuardar({ avatar: URL.createObjectURL(archivo) })} />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <h1 className="m-0 break-words text-titulo-pagina text-texto">{perfil.nombre}</h1>
            <p className="m-0 text-subtitulo text-texto-suave">{perfil.titular}</p>
            <ul aria-label={textos.estadisticas} className={clases.estadisticas}>
              {estadisticas.map((estadistica, indice) => (
                <li key={estadistica.clave} className="flex items-baseline gap-1.5 text-auxiliar text-texto-suave">
                  <span>
                    <strong className="text-texto">{estadistica.valor}</strong> {estadistica.texto}
                  </span>
                  {indice < estadisticas.length - 1 && <span aria-hidden="true">{textos.separador}</span>}
                </li>
              ))}
            </ul>
            <ul className={clases.datos_cabecera}>
              <li className="inline-flex items-center gap-1.5 text-auxiliar text-texto-suave">
                <Valoracion valor={textos.calificacion_valor} maximo={textos.calificacion_maximo} etiqueta={textos.etiqueta_calificacion} />
                {textos.resenas}
              </li>
              {datos.map((dato) => (
                <li key={dato.clave} className="inline-flex min-w-0 items-center gap-1.5 text-subtitulo text-texto">
                  <Icono name={dato.icono as IconName} className="h-4 w-4 flex-none text-texto-suave" />
                  <strong className="truncate">{perfil[dato.clave as 'ubicacion' | 'estudios' | 'empresa']}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className={clases.acciones}>
            <div className="flex flex-wrap items-center justify-end gap-2">
              {propio && (
                <Boton type="button" variant="primario" size="md" onClick={onEditar}>
                  <Icono name="editar-oficial" className="h-4 w-4" />
                  {botones.editar_perfil}
                </Boton>
              )}
              {relacion === 'amigos' && (
                <span className="inline-flex min-h-control items-center gap-sm rounded-control border border-borde bg-fondo px-3 text-boton text-texto-suave">
                  <Icono name="verificado" className="h-4 w-4" />
                  {botones.ya_son_amigos}
                </span>
              )}
              {(relacion === 'ninguna' || solicitudEnviada) && (
                <Boton type="button" variant={solicitudEnviada ? 'secundario' : 'primario'} size="md" aria-pressed={solicitudEnviada} onClick={onAlternarSolicitud}>
                  <Icono name={solicitudEnviada ? 'marca-pequena' : 'nuevo-usuario'} className="h-4 w-4" />
                  {solicitudEnviada ? botones.solicitud_enviada : botones.agregar_amigo}
                </Boton>
              )}
              {!propio && (
                <a href={catalogoMensajeria.rutas.todos} className={clasesBoton({ variant: 'secundario', size: 'md' })}>
                  <Icono name="mensaje" className="h-4 w-4" />
                  {botones.enviar_mensaje}
                </a>
              )}
            </div>
            <RedesCabeceraPerfil redes={perfil.redes} propio={propio} onAgregar={onEditar} />
          </div>
        </div>
      </div>
    </article>
  )
}
