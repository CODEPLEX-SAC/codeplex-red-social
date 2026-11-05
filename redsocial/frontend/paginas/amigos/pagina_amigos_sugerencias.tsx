import { PanelLateral, BannerInformativo, BotonPieLista, MensajeVacio, Boton, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, AvatarUsuario, imagenUsuarioPredeterminada as usuarioImg, GrupoAvatares, CLASE_ENLACE_ACCION } from '../../componentes/compartido'
import { EncabezadoAmigos, PestanasAmigos, insigniaDePendientes, FilaPersonaConocer, FilaListaLateral, FilaActividadReciente } from '../../componentes/amigos'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { RECIBIDAS, PERSONAS_CONOCER, TUS_LISTAS_LATERAL as TUS_LISTAS, ACTIVIDAD_RECIENTE_AMIGOS as ACTIVIDAD_RECIENTE, SUGERENCIAS } from '../../rutas/amigos/rutas_amigos'

const clases = catalogoAmigos.clases
const sugerencia = clases.sugerencia

export function PaginaAmigosSugerencias() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <section className={clases.tarjeta_pagina}>
            <EncabezadoAmigos textoBoton={catalogoAmigos.botones.agregar_amigos} />
            <PestanasAmigos activa="sugerencias" insigniaSolicitudes={insigniaDePendientes(RECIBIDAS.length)} />

            <BannerInformativo variante="suave" iconoCuadrado icono="grupo" titulo={catalogoAmigos.secciones.amplia_tu_red_titulo} descripcion={catalogoAmigos.secciones.amplia_tu_red_desc} etiquetaCerrar={textosRedSocial.CERRAR} className={clases.banner} />

            <h2 className={clases.titulo_seccion_amplio}>{catalogoAmigos.secciones.personas_conocer}</h2>
            <div className={sugerencia.rejilla}>
              {SUGERENCIAS.length === 0 && <MensajeVacio texto={catalogoAmigos.mensajes.sin_sugerencias} className={sugerencia.vacio} />}
              {SUGERENCIAS.map((s) => (
                <article key={s.nombre} className={sugerencia.tarjeta}>
                  <AvatarUsuario tamano="lg" imagen={usuarioImg} className={sugerencia.avatar} />
                  <div className={sugerencia.cuerpo}>
                    <strong className={sugerencia.nombre}>{s.nombre}</strong>
                    <p className={sugerencia.descripcion}>{s.descripcion}</p>
                  </div>
                  <div className={sugerencia.comunes_fila}>
                    <span className={sugerencia.comunes_texto}>{s.comunes}</span>
                  </div>
                  <GrupoAvatares avatares={4} tamano="xs" tono="neutro" resto={s.masAvatares} className={sugerencia.grupo} />
                  <div className={sugerencia.acciones}>
                    <Boton type="button" variant="secundario" size="default" className={sugerencia.boton}>{catalogoAmigos.botones.agregar}</Boton>
                    <a href="#" className={CLASE_ENLACE_ACCION}>{catalogoAmigos.botones.ver_perfil}</a>
                  </div>
                </article>
              ))}
            </div>
            <BotonPieLista>{catalogoAmigos.botones.ver_mas_sugerencias}</BotonPieLista>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <PanelLateral titulo={catalogoAmigos.secciones.personas_conocer} enlace={textosRedSocial.VER_TODAS} ruta={catalogoAmigos.rutas.sugerencias}>
              {PERSONAS_CONOCER.map((p) => (
                <FilaPersonaConocer key={p.nombre} nombre={p.nombre} comunes={p.comunes} />
              ))}
            </PanelLateral>
            <PanelLateral titulo={catalogoAmigos.secciones.tus_listas} enlace={textosRedSocial.VER_TODAS} ruta={catalogoAmigos.rutas.listas}>
              {TUS_LISTAS.map((l) => (
                <FilaListaLateral key={l.nombre} icono={l.icono} color={l.color} nombre={l.nombre} miembros={l.miembros} />
              ))}
            </PanelLateral>
            <PanelLateral titulo={catalogoAmigos.secciones.actividad_reciente} enlace={textosRedSocial.VER_TODAS}>
              {ACTIVIDAD_RECIENTE.map((a) => (
                <FilaActividadReciente key={a.nombre} nombre={a.nombre} accion={a.accion} tiempo={a.tiempo} />
              ))}
            </PanelLateral>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
