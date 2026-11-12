import { Icono } from '../../compartido/icono'
import { AccionesCabeceraPerfil } from './acciones_cabecera_perfil'
import { DetallesCabeceraPerfil } from './detalles_cabecera_perfil'
import { EstadisticasCabeceraPerfil } from './estadisticas_cabecera_perfil'
import { FotoPerfilCabecera } from './foto_perfil_cabecera'
import { estadisticasDe } from './logica_cabecera_perfil'
import { MenuOpcionesPerfil } from './menu_opciones_perfil'
import { RedesCabeceraPerfil } from './redes_cabecera_perfil'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { CabeceraPerfilProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.cabecera
const botones = catalogoPerfil.botones
const clases = catalogoPerfil.clases

export function CabeceraPerfil({ perfil, relacion, totalPublicaciones, amigosEnComun, onAlternarSolicitud, onEditar, onGuardar }: CabeceraPerfilProps) {
  const propio = relacion === 'propio'
  const estadisticas = estadisticasDe(textos.estadisticas_items, { publicaciones: totalPublicaciones, amigos: perfil.amigos.length, en_comun: amigosEnComun }, propio)

  return (
    <article className={clases.tarjeta}>
      <div className={clases.cabecera.barra}>
        <a href={catalogoInicio.rutas.principal} aria-label={botones.volver_a_inicio} className={clases.volver}>
          <Icono name="flecha-izquierda" className="h-4 w-4" />
        </a>
        {propio && <MenuOpcionesPerfil onEditar={onEditar} />}
      </div>
      <div className={clases.cabecera.rejilla}>
        <div className={clases.cabecera.foto}>
          <FotoPerfilCabecera perfil={perfil} propio={propio} onElegirFoto={(archivo) => onGuardar({ avatar: URL.createObjectURL(archivo) })} />
        </div>
        <div className={clases.cabecera.identidad}>
          <h1 className={clases.cabecera.nombre}>{perfil.nombre}</h1>
          <p className={clases.cabecera.titular}>{perfil.titular}</p>
          <EstadisticasCabeceraPerfil estadisticas={estadisticas} />
        </div>
        <div className={clases.cabecera.redes}>
          <RedesCabeceraPerfil redes={perfil.redes} propio={propio} onAgregar={onEditar} />
        </div>
        <DetallesCabeceraPerfil perfil={perfil} />
        <AccionesCabeceraPerfil relacion={relacion} onAlternarSolicitud={onAlternarSolicitud} onEditar={onEditar} />
      </div>
    </article>
  )
}
