import { useEffect } from 'react'
import { Box } from '@mui/material'
import { CodeplexProveedorFechas } from '@codeplex-sac/selectores-fecha'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { ProveedorTemaGraficos } from '../../compartido/proveedor_tema_graficos'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { CuerpoFormularioEvento } from '../../../formularios/eventos/cuerpo_formulario_evento'
import { usarFormularioEvento } from '../../../formularios/eventos/usar_formulario_evento'
import { VALORES_VACIOS_EVENTO } from '../../../formularios/eventos/valores_formulario_evento'
import type { ModalCrearEventoProps } from '@/tipos/eventos/contrato_crear_evento'

const textos = catalogoEventos.modal_crear_evento

export function ModalCrearEvento({ onCerrar }: ModalCrearEventoProps) {
  const { valores, asignar } = usarFormularioEvento(VALORES_VACIOS_EVENTO)

  useEffect(() => {
    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflowAnterior
    }
  }, [])

  useEffect(() => {
    function alPresionarTecla(evento: KeyboardEvent) {
      if (evento.key === textos.tecla_cerrar) onCerrar()
    }
    document.addEventListener('keydown', alPresionarTecla)
    return () => document.removeEventListener('keydown', alPresionarTecla)
  }, [onCerrar])

  return (
    <ProveedorTemaGraficos>
      <CodeplexProveedorFechas idioma={textos.idioma}>
        <Box sx={{ zIndex: (tema) => tema.zIndex.modal }} className="fixed inset-0 flex items-center justify-center bg-black/45 p-4 max-600:p-0" onClick={onCerrar}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={textos.titulo}
            onClick={(evento) => evento.stopPropagation()}
            className="@container flex max-h-full w-full max-w-275 flex-col overflow-hidden rounded-2xl bg-fondo shadow-t13 max-600:h-full max-600:rounded-none"
          >
            <div className="flex items-start justify-between gap-3 px-6 pb-3 pt-5 max-600:px-4">
              <div className="flex items-center gap-3.5">
                <div className="grid h-12 w-12 flex-none place-items-center rounded-14 bg-primario-suave text-primario">
                  <Icono name="crear-evento" className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="m-0 text-titulo-pagina font-extrabold text-texto">{textos.titulo}</h2>
                  <p className="m-0 mt-0.5 text-subtitulo text-texto-suave">{textos.subtitulo}</p>
                </div>
              </div>
              <BotonIcono icono="cerrar" type="button" aria-label={textos.cerrar} onClick={onCerrar} variant="discreto" size="default" className="flex-none" />
            </div>

            <CuerpoFormularioEvento
              valores={valores}
              asignar={asignar}
              conImagenActual={false}
              className="grid min-h-0 flex-1 grid-cols-1 items-start gap-4 overflow-y-auto px-4 pb-4 pt-1 @3xl:grid-cols-[minmax(0,1fr)_22rem]"
            />

            <div className="flex items-center justify-end gap-3 px-6 py-4 max-600:flex-col-reverse max-600:items-stretch max-600:px-4">
              <Boton type="button" variant="secundario" size="md" onClick={onCerrar}>{textos.cancelar}</Boton>
              <Boton type="button" variant="secundario" size="md" onClick={onCerrar} className="border-primario text-primario">{textos.borrador}</Boton>
              <Boton type="button" variant="primario" size="md" onClick={onCerrar}>{textos.publicar}</Boton>
            </div>
          </div>
        </Box>
      </CodeplexProveedorFechas>
    </ProveedorTemaGraficos>
  )
}
