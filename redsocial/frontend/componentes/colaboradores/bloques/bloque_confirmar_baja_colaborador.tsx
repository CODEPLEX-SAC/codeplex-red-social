import { useEffect } from 'react'
import { Box } from '@mui/material'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Selector } from '../../compartido/interfaz/selector'
import { ProveedorTemaGraficos } from '../../compartido/proveedor_tema_graficos'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const textos = catalogoColaboradores.confirmar_baja

export function BloqueConfirmarBajaColaborador({
  colaborador,
  fechaEjemplo,
  alCerrar,
}: {
  colaborador: Colaborador
  fechaEjemplo: string
  alCerrar: () => void
}) {
  useEffect(() => {
    function alPresionarTecla(evento: KeyboardEvent) {
      if (evento.key === textos.tecla_cerrar) alCerrar()
    }
    document.addEventListener('keydown', alPresionarTecla)
    return () => document.removeEventListener('keydown', alPresionarTecla)
  }, [alCerrar])

  return (
    <ProveedorTemaGraficos>
      <Box sx={{ zIndex: (tema) => tema.zIndex.modal }} className="fixed inset-0 flex items-center justify-center bg-black/45 p-4" onClick={alCerrar}>
        <div
          role="dialog"
          aria-modal="true"
          aria-label={textos.titulo}
          onClick={(evento) => evento.stopPropagation()}
          className="w-full max-w-125 rounded-2xl bg-fondo p-5 shadow-t13"
        >
          <div className="mb-3 flex items-start justify-between">
            <h2 className="m-0 text-nombre-entidad font-bold text-texto">{textos.titulo}</h2>
            <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={alCerrar} variant="discreto" size="sm" />
          </div>

          <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-t-fee2e2 text-negativo-kpi">
            <Icono name="eliminar" className="h-5 w-5" />
          </div>

          <h3 className="m-0 mb-1.5 text-cuerpo-grande font-bold text-texto">{[textos.pregunta_prefijo, colaborador.nombre + textos.pregunta_sufijo].join(' ')}</h3>
          <p className="m-0 mb-4 text-cuerpo leading-1.45 text-texto-suave">{textos.descripcion}</p>

          <div className="mb-3 flex flex-col gap-1">
            <label className="text-campo-formulario font-medium text-gris-texto">{textos.motivo.etiqueta} <span className="text-negativo-kpi">*</span></label>
            <Selector variant="colaboradores" placeholder={textos.motivo.placeholder}>
              {textos.motivo.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
          </div>

          <div className="mb-5 flex flex-col gap-1">
            <label className="text-campo-formulario font-medium text-gris-texto">{textos.fecha_baja} <span className="text-negativo-kpi">*</span></label>
            <CampoTexto defaultValue={fechaEjemplo} anchoCompleto iconoFin={<Icono name="calendario" className="h-4 w-4" />} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Boton type="button" variant="secundario" onClick={alCerrar}>{textosRedSocial.CANCELAR}</Boton>
            <Boton type="button" variant="peligro" onClick={alCerrar}>
              <Icono name="eliminar" className="h-3.5 w-3.5" /> {catalogoColaboradores.botones.dar_de_baja}
            </Boton>
          </div>
        </div>
      </Box>
    </ProveedorTemaGraficos>
  )
}
