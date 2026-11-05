import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'

export function BloqueAccesoAlternativo() {
  return (
    <div className="flex flex-col gap-2.5">
      {catalogoAcceso.proveedores.map((proveedor) => (
        <Boton key={proveedor.clave} type="button" variant="secundario" size="md" disabled title={catalogoAcceso.mensajes.proveedor_proximamente.replace(':proveedor', proveedor.nombre)} className="w-full disabled:cursor-not-allowed disabled:opacity-60">
          <Icono name={proveedor.icono} className="h-4 w-4" /> {proveedor.etiqueta}
        </Boton>
      ))}
      <div className="mt-1 flex items-center gap-2.5 text-texto-suave">
        <div className="h-px flex-1 bg-borde" />
        <span className="text-badge uppercase">{catalogoAcceso.separador}</span>
        <div className="h-px flex-1 bg-borde" />
      </div>
    </div>
  )
}
