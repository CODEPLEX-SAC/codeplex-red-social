import { Tab } from '@mui/material'
import type { TabProps } from '@mui/material'
import { CodeplexPestanas } from '@codeplex-sac/navegacion'
import type { CodeplexPestanasProps } from '@codeplex-sac/navegacion'
import { Icono } from '../icono'
import { Insignia } from './insignia'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import type { PestanasProps } from '@/tipos/compartido/contrato_pestanas'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const configuracion = catalogoCompartido.pestanas

export function Pestanas({ elementos, activa, alCambiar, className }: PestanasProps) {
  return (
    <div className={className}>
      <ProveedorTemaGraficos>
        <CodeplexPestanas
          {...(configuracion.contenedor as CodeplexPestanasProps)}
          valor={activa}
          alCambiar={(_, valor) => alCambiar?.(valor as string)}
          hijos={elementos.map((elemento) => (
            <Tab
              key={elemento.clave}
              value={elemento.clave}
              {...(configuracion.pestana as TabProps)}
              {...((elemento.ruta ? { ...configuracion.enlace, href: elemento.ruta } : {}) as TabProps)}
              icon={elemento.icono && <Icono name={elemento.icono} className={configuracion.clase_icono} />}
              label={
                <span className={configuracion.clase_etiqueta}>
                  {elemento.etiqueta}
                  {elemento.insignia !== undefined && <Insignia variant="counter">{elemento.insignia}</Insignia>}
                </span>
              }
            />
          ))}
        />
      </ProveedorTemaGraficos>
    </div>
  )
}
