import '@testing-library/jest-dom/vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { reiniciarMetodosPagoDemostracion } from '../redsocial/frontend/servicios/marketplace/metodos_pago'
import { reiniciarPublicacionesDemostracion } from '../redsocial/frontend/servicios/inicio/almacen_publicaciones'
import { reiniciarEdicionesPerfilDemostracion } from '../redsocial/frontend/servicios/perfil/almacen_perfil'

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
  reiniciarEdicionesPerfilDemostracion()
})
