import { CodeplexMenu } from '@codeplex-sac/navegacion'
import type { CodeplexMenuProps } from '@codeplex-sac/navegacion'
import { Icono } from '../icono'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import type { MenuProps, RanurasMenu } from '@/tipos/compartido/contrato_menu'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const configuracion = catalogoCompartido.menu

export function irARuta(ruta: string) {
  const enlace = document.createElement('a')
  enlace.href = ruta
  document.body.appendChild(enlace)
  enlace.click()
  enlace.remove()
}

function ranurasDelMenu(arriba: boolean): RanurasMenu {
  return { ...configuracion.contenedor.slotProps, ...(arriba ? configuracion.separacion_arriba : {}) } as RanurasMenu
}

export function Menu({ elementos, ancla, alCerrar, arriba = false }: MenuProps) {
  return (
    <ProveedorTemaGraficos>
      <CodeplexMenu
        {...(configuracion.contenedor as CodeplexMenuProps)}
        {...(arriba ? (configuracion.contenedor_arriba as CodeplexMenuProps) : {})}
        slotProps={ranurasDelMenu(arriba)}
        abierto={Boolean(ancla)}
        elementoAnclaje={ancla}
        alCerrar={alCerrar}
        elementos={elementos.map((elemento) => ({
          etiqueta: elemento.etiqueta,
          icono: elemento.icono && <Icono name={elemento.icono} className={configuracion.clase_icono} />,
          sx: { ...configuracion.item_tactil, ...(elemento.peligro ? configuracion.peligro : {}) },
          divider: elemento.divisor,
          disabled: elemento.deshabilitado,
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
