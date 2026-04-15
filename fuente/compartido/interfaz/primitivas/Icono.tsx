import IconFlecha from '@/activos/iconos/flecha.svg?react'
import IconHome from '@/activos/iconos/home.svg?react'
import IconBuzon from '@/activos/iconos/icon-buzon.svg?react'
import IconCanjeMonedas from '@/activos/iconos/icon-canje-monedas.svg?react'
import IconColaboradores from '@/activos/iconos/icon-colaboradores.svg?react'
import IconCompartidos from '@/activos/iconos/icon-compartidos.svg?react'
import IconDatosFacturacion from '@/activos/iconos/icon-datos-facturacion.svg?react'
import IconEmpresa from '@/activos/iconos/icon-empresa.svg?react'
import IconEncuesta from '@/activos/iconos/icon-encuesta.svg?react'
import IconMantenedores from '@/activos/iconos/icon-mantenedores.svg?react'
import IconMonedero from '@/activos/iconos/icon-monedero.svg?react'
import IconMonetizacion from '@/activos/iconos/icon-monetizacion.svg?react'
import IconPost from '@/activos/iconos/icon-post.svg?react'
import IconTickets from '@/activos/iconos/icon-tickets.svg?react'
import IconTusPost from '@/activos/iconos/icon-tus-post.svg?react'
import IconVideos from '@/activos/iconos/icon-videos.svg?react'
import IconInformacion from '@/activos/iconos/informacion.svg?react'
import IconLike from '@/activos/iconos/like.svg?react'
import IconMeEncanta from '@/activos/iconos/me-encanta.svg?react'
import IconAsombro from '@/activos/iconos/asombro.svg?react'
import IconComment from '@/activos/iconos/comment.svg?react'
import IconShare from '@/activos/iconos/share.svg?react'
import IconExportar from '@/activos/iconos/exportar.svg?react'
import IconLibroRanking from '@/activos/iconos/libro-ranking.svg?react'
import IconLibroDiamante from '@/activos/iconos/libro-diamante.svg?react'
import IconLibroOro from '@/activos/iconos/libro-oro.svg?react'
import IconLibroPlata from '@/activos/iconos/libro-plata.svg?react'
import IconLibroBronce from '@/activos/iconos/libro-bronce.svg?react'
import IconAyuda from '@/activos/iconos/ayuda.svg?react'
import IconNotificaciones from '@/activos/iconos/notificaciones.svg?react'
import IconArrowRigth from '@/activos/iconos/arrow-rigth.svg?react'
import IconFecha from '@/activos/iconos/fecha.svg?react'
import IconGuardar from '@/activos/iconos/guardar.svg?react'
import IconCerrar from '@/activos/iconos/cerrar.svg?react'
import IconEdit_Regular from '@/activos/iconos/edit-regular.svg?react'
import IconEdit_Solid from '@/activos/iconos/edit-solid.svg?react'
import IconEye_Solid from '@/activos/iconos/eye-solid.svg?react'
import IconEye_Slash_Solid from '@/activos/iconos/eye-slash-solid.svg?react'



const ICONS = {
  flecha: IconFlecha,
  home: IconHome,
  buzon: IconBuzon,
  canjeMonedas: IconCanjeMonedas,
  colaboradores: IconColaboradores,
  compartidos: IconCompartidos,
  datosFacturacion: IconDatosFacturacion,
  empresa: IconEmpresa,
  encuesta: IconEncuesta,
  mantenedores: IconMantenedores,
  monedero: IconMonedero,
  monetizacion: IconMonetizacion,
  post: IconPost,
  tickets: IconTickets,
  tusPost: IconTusPost,
  videos: IconVideos,
  informacion: IconInformacion,
  like: IconLike,
  me_encanta: IconMeEncanta,
  asombro: IconAsombro,
  comment: IconComment,
  share: IconShare,
  exportar: IconExportar,
  libro_ranking: IconLibroRanking,
  libro_oro: IconLibroOro,
  libro_plata: IconLibroPlata,
  libro_bronce: IconLibroBronce,
  libro_diamante: IconLibroDiamante,
  ayuda: IconAyuda,
  notificaciones: IconNotificaciones,
  arrow_right: IconArrowRigth,
  fecha: IconFecha,
  guardar: IconGuardar,
  cerrar: IconCerrar,
  edit_regular: IconEdit_Regular,
  edit_solid:   IconEdit_Solid,
  icon_eye:      IconEye_Solid,
  icon_eye_slash: IconEye_Slash_Solid,

}

function Icon({ name, size = 20, className = '', color }) {
  const SvgIcon = ICONS[name]

  if (!SvgIcon) {
    console.warn(`Icon "${name}" no existe`)
    return null
  }

  return (
    <SvgIcon
      width={size}
      height={size}
      className={`icon ${className}`}
      style={{
        display: 'block',
        flexShrink: 0,
        ...(color && { color }),
      }}
    />
  )
}

export default Icon
