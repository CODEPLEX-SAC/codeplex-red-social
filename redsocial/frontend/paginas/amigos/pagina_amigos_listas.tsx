import { BannerInformativo, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import { EncabezadoAmigos, PestanasAmigos, insigniaDePendientes, ColumnaLateralAmigos, SeccionMisListas, ModalesListasAmigos, usarListasAmigos } from '../../componentes/amigos'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { RECIBIDAS, PERSONAS_CONOCER, TUS_LISTAS_LATERAL, ACTIVIDAD_RECIENTE_AMIGOS as ACTIVIDAD_RECIENTE, MIS_LISTAS, AMIGOS } from '../../rutas/amigos/rutas_amigos'

const clases = catalogoAmigos.clases

export function PaginaAmigosListas() {
  const listas = usarListasAmigos(MIS_LISTAS)

  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <section className={clases.tarjeta_pagina}>
            <EncabezadoAmigos textoBoton={catalogoAmigos.botones.crear_listas} alClick={listas.abrirCrear} />
            <PestanasAmigos activa="listas" insigniaSolicitudes={insigniaDePendientes(RECIBIDAS.length)} />

            <BannerInformativo variante="suave" iconoCuadrado icono="grupo" titulo={catalogoAmigos.secciones.organiza_contactos_titulo} descripcion={catalogoAmigos.secciones.organiza_contactos_desc} etiquetaCerrar={textosRedSocial.CERRAR} className={clases.banner} />

            <h2 className={clases.titulo_seccion}>{catalogoAmigos.secciones.mis_listas.replace(":n", String(listas.listas.length))}</h2>
            <SeccionMisListas listas={listas.listas} alAbrir={listas.abrirMiembros} alEditar={listas.abrirEditar} alEliminar={listas.abrirEliminar} />
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <ColumnaLateralAmigos personas={PERSONAS_CONOCER} listas={TUS_LISTAS_LATERAL} actividad={ACTIVIDAD_RECIENTE} />
        }
      />
      <ModalesListasAmigos control={listas} amigos={AMIGOS} />
    </EstructuraApp>
  )
}
