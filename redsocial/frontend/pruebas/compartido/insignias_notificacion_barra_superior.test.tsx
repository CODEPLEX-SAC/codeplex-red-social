import { render, screen } from '@testing-library/react'
import { BarraSuperior } from '@/componentes/compartido/navegacion/barra_superior'
import { BotonAvisosTopbar } from '@/componentes/compartido/navegacion/boton_avisos_topbar'
import { BotonCarritoTopbar } from '@/componentes/compartido/navegacion/boton_carrito_topbar'
import { ContextoAccesoCarrito } from '@/componentes/compartido/carrito/contexto_acceso_carrito'
import { ContextoInsigniasNavegacion } from '@/componentes/compartido/navegacion/contexto_insignias_navegacion'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'

describe('Insignias de notificación en la barra superior', () => {
    it('la campana usa la insignia oficial superpuesta al icono con el conteo del catálogo', () => {
      const { container } = render(<BotonAvisosTopbar />)
      const boton = screen.getByRole('button', { name: `${textosRedSocial.AVISO_CAMPANA}, 3 pendientes` })
      const insignia = container.querySelector('.MuiBadge-root') as HTMLElement
      expect(insignia).toContainElement(boton)
      expect(insignia.querySelector('.MuiBadge-badge')).toBeInTheDocument()
      expect(container.querySelector('.MuiBadge-badge')).toHaveTextContent('3')
      expect(container.querySelector('.MuiBadge-badge')).not.toHaveClass('MuiBadge-dot')
    })

    it('las insignias de la barra superior no capturan el puntero del botón vecino', () => {
      const { container } = render(<ContextoInsigniasNavegacion.Provider value={{ mensajes: 5 }}><BarraSuperior /></ContextoInsigniasNavegacion.Provider>)
      const visibles = container.querySelectorAll('.MuiBadge-badge:not(.MuiBadge-invisible)')
      expect(visibles.length).toBe(2)
      for (const insignia of Array.from(visibles)) expect(insignia).toHaveClass('pointer-events-none')
    })

    it('el carrito oculta la insignia en cero y la muestra con cantidad', () => {
      const acceso = (cantidad: number) => ({ cantidad, etiqueta: 'Carrito', abrir: () => undefined })
      const vacio = render(<ContextoAccesoCarrito.Provider value={acceso(0)}><BotonCarritoTopbar /></ContextoAccesoCarrito.Provider>)
      expect(vacio.container.querySelector('.MuiBadge-badge')).toHaveClass('MuiBadge-invisible')
      vacio.unmount()
      const lleno = render(<ContextoAccesoCarrito.Provider value={acceso(7)}><BotonCarritoTopbar /></ContextoAccesoCarrito.Provider>)
      const badge = lleno.container.querySelector('.MuiBadge-badge') as HTMLElement
      expect(badge).toHaveTextContent('7')
      expect(badge).not.toHaveClass('MuiBadge-invisible')
    })

    it('Mensajes reutiliza el conteo de conversaciones sin leer del contexto con la insignia superpuesta', () => {
      const { container } = render(<ContextoInsigniasNavegacion.Provider value={{ mensajes: 5 }}><BarraSuperior /></ContextoInsigniasNavegacion.Provider>)
      const boton = screen.getByRole('button', { name: 'Mensajes, 5 pendientes' })
      expect(boton.closest('.MuiBadge-root')).not.toBeNull()
      expect(boton.closest('.MuiBadge-root')?.querySelector('.MuiBadge-badge')).toHaveTextContent('5')
      expect(container.querySelectorAll('.MuiBadge-badge:not(.MuiBadge-invisible)').length).toBe(2)
    })

    it('sin conteo de mensajes no inventa contador y conserva el nombre accesible', () => {
      const { container } = render(<ContextoInsigniasNavegacion.Provider value={{ mensajes: 0 }}><BarraSuperior /></ContextoInsigniasNavegacion.Provider>)
      const mensajes = screen.getByRole('button', { name: textosRedSocial.MENSAJES })
      expect(mensajes.closest('.MuiBadge-root')?.querySelector('.MuiBadge-badge')).toHaveClass('MuiBadge-invisible')
      expect(container.querySelectorAll('.MuiBadge-badge:not(.MuiBadge-invisible)').length).toBe(1)
    })

    it('los nombres accesibles de campana y carrito comunican la cantidad pendiente', () => {
      render(<ContextoAccesoCarrito.Provider value={{ cantidad: 2, etiqueta: 'Carrito', abrir: () => undefined }}><BotonCarritoTopbar /><BotonAvisosTopbar /></ContextoAccesoCarrito.Provider>)
      expect(screen.getByRole('button', { name: 'Carrito, 2 pendientes' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Notificaciones, 3 pendientes' })).toBeInTheDocument()
    })

    it('con carrito vacío el nombre accesible no incluye cifras', () => {
      render(<ContextoAccesoCarrito.Provider value={{ cantidad: 0, etiqueta: 'Carrito', abrir: () => undefined }}><BotonCarritoTopbar /></ContextoAccesoCarrito.Provider>)
      expect(screen.getByRole('button', { name: 'Carrito' })).toBeInTheDocument()
    })

    it('la barra superior no contiene indicadores puntuales con apariencia de contador', () => {
      const { container } = render(<BarraSuperior />)
      expect(container.querySelector('.MuiBadge-dot')).toBeNull()
    })
})
