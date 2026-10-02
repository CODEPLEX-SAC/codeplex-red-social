import { CodeplexMenu } from '@codeplex-sac/navegacion'
import type { CodeplexMenuProps } from '@codeplex-sac/navegacion'
import { Icono } from '../icono'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import type { MenuProps } from '@/tipos/compartido/contrato_menu'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const configuracion = catalogoCompartido.menu

export function irARuta(ruta: string) {
  const enlace = document.createElement('a')
  enlace.href = ruta
  document.body.appendChild(enlace)
  enlace.click()
  enlace.remove()
}

export function Menu({ elementos, ancla, alCerrar }: MenuProps) {
  return (
    <ProveedorTemaGraficos>
      <CodeplexMenu
        {...(configuracion.contenedor as CodeplexMenuProps)}
        abierto={Boolean(ancla)}
        elementoAnclaje={ancla}
        alCerrar={alCerrar}
        elementos={elementos.map((elemento) => ({
          etiqueta: elemento.etiqueta,
          icono: elemento.icono && <Icono name={elemento.icono} className={configuracion.clase_icono} />,
          sx: elemento.peligro ? configuracion.peligro : undefined,
          divider: elemento.divisor,
          alHacerClick: () => {
            elemento.alHacerClick?.()
            if (elemento.ruta) irARuta(elemento.ruta)
            alCerrar()
          },
        }))}
      />
    </ProveedorTemaGraficos>
  )
}
