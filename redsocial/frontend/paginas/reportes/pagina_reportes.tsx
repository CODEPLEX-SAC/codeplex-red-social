import { EstructuraApp, DonaProgreso, usarCarrusel, Sparkline } from '../../componentes/compartido'
import catalogoReportes from '../../catalogos/capacidades/redsocial/reportes.json'
import type { MiniGrafico } from '@/tipos/reportes/modelo_reportes'
import { PLANTILLAS, REPORTES_RECIENTES, CLASES_ICONO_PLANTILLA, CLASES_FORMATO } from '../../rutas/reportes/rutas_reportes'
import { SeccionPlantillasDeReportes } from '../../componentes/reportes'

const CLASE_ALTO_BARRA: Record<number, string> = catalogoReportes.clases_barra_altura
const CLASE_COLOR_BARRA: Record<string, string> = catalogoReportes.clases_barra_color

const ANCHOS_MINI_LISTA = ['w-p92', 'w-p70', 'w-p84', 'w-p55']
const ANCHOS_MINI_LINEAS_DONA = ['w-full', 'w-p75', 'w-p60']


function MiniGraficoPlantilla({ grafico }: { grafico: MiniGrafico }) {
  if (grafico.tipo === 'barras') {
    return (
      <div className="mt-0.5 flex h-11.5 items-end gap-1.25">
        {grafico.barras.map((b) => (
          <div key={[b.v, b.c].join()} className={`flex-1 rounded-t-sm ${CLASE_ALTO_BARRA[b.v]} ${CLASE_COLOR_BARRA[b.c]}`} />
        ))}
      </div>
    )
  }
  if (grafico.tipo === 'linea') {
    return (
      <Sparkline puntos={grafico.puntos} color={grafico.color} ancho={120} alto={40} grosor={2.4} radioPunto={2.4} conPuntos className="mt-0.5 block h-11.5 w-full" />
    )
  }
  if (grafico.tipo === 'dona-lista') {
    return (
      <div className="mt-0.5 flex items-center gap-3">
        <div className="relative h-10.5 w-10.5 flex-none">
          <DonaProgreso segmentos={grafico.segmentos} tamano={42} grosor={10} />
          <div className="absolute inset-2.5 rounded-full bg-white" />
        </div>
        <div className="grid flex-1 gap-1.75">
          {ANCHOS_MINI_LINEAS_DONA.map((w) => (
            <span key={w} className={`block h-1.75 rounded-full bg-t-f0eef5 ${w}`} />
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="mt-1 grid gap-1.75">
      {ANCHOS_MINI_LISTA.map((w) => (
        <span key={w} className={`block h-1.75 rounded-full bg-t-f0eef5 ${w}`} />
      ))}
    </div>
  )
}

export function PaginaReportes() {
  const modulos = usarCarrusel()

  return (
    <EstructuraApp paginaActiva="reportes">
      <SeccionPlantillasDeReportes
        modulos={modulos}
        PLANTILLAS={PLANTILLAS}
        CLASES_ICONO_PLANTILLA={CLASES_ICONO_PLANTILLA}
        MiniGraficoPlantilla={MiniGraficoPlantilla}
        REPORTES_RECIENTES={REPORTES_RECIENTES}
        CLASES_FORMATO={CLASES_FORMATO}
      />
    </EstructuraApp>
  )
}
