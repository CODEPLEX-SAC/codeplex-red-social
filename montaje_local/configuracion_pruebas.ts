import '@testing-library/jest-dom/vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { reiniciarMetodosPagoDemostracion } from '../redsocial/frontend/servicios/marketplace/metodos_pago'
import { reiniciarHistoriasDemostracion } from '../redsocial/frontend/servicios/inicio/almacen_historias'
import { reiniciarHistoriasVistasDemostracion } from '../redsocial/frontend/servicios/inicio/almacen_historias_vistas'
import { reiniciarPublicacionesDemostracion } from '../redsocial/frontend/servicios/inicio/almacen_publicaciones'
import { reiniciarEdicionesPerfilDemostracion } from '../redsocial/frontend/servicios/perfil/almacen_perfil'
import { reiniciarMensajeriaDemostracion } from '../redsocial/frontend/servicios/mensajeria/almacen_mensajeria'
import { restaurarRelojMensajeria } from '../redsocial/frontend/servicios/mensajeria/reloj'

vi.mock('@mui/icons-material', async () => ({
  Close: (await import('@mui/icons-material/Close')).default,
  ArrowBack: (await import('@mui/icons-material/ArrowBack')).default,
  ArrowForward: (await import('@mui/icons-material/ArrowForward')).default,
}))

expect.extend(matchers)

if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as MediaQueryList
}

beforeEach(() => {
  reiniciarMetodosPagoDemostracion([])
  reiniciarPublicacionesDemostracion()
  reiniciarHistoriasDemostracion([])
  reiniciarHistoriasVistasDemostracion()
  reiniciarEdicionesPerfilDemostracion()
  reiniciarMensajeriaDemostracion()
  restaurarRelojMensajeria()
})
