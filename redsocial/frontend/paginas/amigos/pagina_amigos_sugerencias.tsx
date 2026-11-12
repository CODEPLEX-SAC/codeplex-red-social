import { BannerInformativo, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import { EncabezadoAmigos, PestanasAmigos, insigniaDePendientes, ColumnaLateralAmigos, SeccionSugerencias } from '../../componentes/amigos'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { RECIBIDAS, PERSONAS_CONOCER, TUS_LISTAS_LATERAL as TUS_LISTAS, ACTIVIDAD_RECIENTE_AMIGOS as ACTIVIDAD_RECIENTE, SUGERENCIAS } from '../../rutas/amigos/rutas_amigos'

const clases = catalogoAmigos.clases

export function PaginaAmigosSugerencias() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <section className={clases.tarjeta_pagina}>
            <EncabezadoAmigos />
            <PestanasAmigos activa="sugerencias" insigniaSolicitudes={insigniaDePendientes(RECIBIDAS.length)} />

            <BannerInformativo variante="suave" iconoCuadrado icono="grupo" titulo={catalogoAmigos.secciones.amplia_tu_red_titulo} descripcion={catalogoAmigos.secciones.amplia_tu_red_desc} etiquetaCerrar={textosRedSocial.CERRAR} className={clases.banner} />

            <SeccionSugerencias sugerencias={SUGERENCIAS} />
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <ColumnaLateralAmigos personas={PERSONAS_CONOCER} listas={TUS_LISTAS} actividad={ACTIVIDAD_RECIENTE} />
        }
      />
    </EstructuraApp>
  )
}
