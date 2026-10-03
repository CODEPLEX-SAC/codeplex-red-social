import { useState } from 'react'
import { PanelFormularioAcceso, PanelVisualAcceso } from '../../componentes/acceso'
import { usarSesionDemostracion } from '../../componentes/compartido'
import { navegar } from '../../rutas/compartido/navegacion'
import { urlImagenCarruselAcceso } from '../../rutas/acceso/rutas_acceso'
import { rutasInicio } from '../../rutas/inicio/rutas_inicio'
import catalogoAcceso from '../../catalogos/capacidades/redsocial/acceso.json'
import type { ModoAcceso } from '@/tipos/acceso/contrato_acceso'

export function PaginaAcceso() {
  const [modo, setModo] = useState<ModoAcceso>('iniciar_sesion')
  const { iniciarSesion } = usarSesionDemostracion()

  function entrarAlDemo() {
    iniciarSesion()
    navegar(rutasInicio.principal)
  }

  return (
    <main className="grid min-h-screen place-items-center bg-fondo p-5 max-560:p-0">
      <h1 className="sr-only">{catalogoAcceso.titulos.principal}</h1>
      <div className="flex min-h-155 w-full max-w-250 overflow-hidden rounded-2xl border border-borde bg-white shadow-t13 max-560:min-h-screen max-560:rounded-none max-560:border-0">
        <PanelFormularioAcceso modo={modo} onCambiarModo={setModo} onAcceder={entrarAlDemo} />
        <PanelVisualAcceso obtenerUrlImagen={urlImagenCarruselAcceso} />
      </div>
    </main>
  )
}
