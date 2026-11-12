import { EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import { EncabezadoAmigos, PestanasAmigos, SeccionSolicitudes, insigniaDePendientes, ColumnaLateralAmigos } from '../../componentes/amigos'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import { RECIBIDAS, ENVIADAS, PERSONAS_CONOCER_SOLICITUDES as PERSONAS_CONOCER, TUS_LISTAS_SOLICITUDES as TUS_LISTAS, ACTIVIDAD_RECIENTE_SOLICITUDES as ACTIVIDAD_RECIENTE } from '../../rutas/amigos/rutas_amigos'

const clases = catalogoAmigos.clases

export function PaginaAmigosSolicitudes() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <section className={clases.tarjeta_pagina}>
            <EncabezadoAmigos />
            <PestanasAmigos activa="solicitudes" insigniaSolicitudes={insigniaDePendientes(RECIBIDAS.length)} />

            <h2 className={clases.titulo_seccion_con_aire}>{catalogoAmigos.secciones.solicitudes_amistad}</h2>

            <SeccionSolicitudes recibidas={RECIBIDAS} enviadas={ENVIADAS} />
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
