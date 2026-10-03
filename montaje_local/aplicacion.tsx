import { AplicacionRedSocial } from '@/rutas/compartido/aplicacion_red_social'

function Aplicacion() {
  return (
    <>
      <AplicacionRedSocial />
      <div className="pointer-events-none fixed bottom-2 left-2 z-50 rounded bg-black/60 px-2 py-1 text-xs text-white">
        Última actualización: {__FECHA_ACTUALIZACION__}
      </div>
    </>
  )
}

export default Aplicacion
