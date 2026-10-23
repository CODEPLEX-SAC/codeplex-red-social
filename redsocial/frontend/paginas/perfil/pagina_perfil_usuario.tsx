import { useState, useSyncExternalStore } from 'react'
import { BloqueAnuncio, ColumnaPublicidad, ContactosPanel, EstructuraApp, EstructuraTresColumnas, MensajeVacio, clasesBoton, usarSesionDemostracion } from '../../componentes/compartido'
import { usarPublicacionesInicio } from '../../componentes/inicio'
import { CabeceraPerfil, ModalEditarPerfil, PestanaAmigosPerfil, PestanaDocumentosPerfil, PestanaExperienciaPerfil, PestanaMetricasPerfil, PestanaRedSocialPerfil, PestanaResumenPerfil, PestanasPerfil, usarRelacionPerfil } from '../../componentes/perfil'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'
import catalogoPerfil from '../../catalogos/capacidades/redsocial/perfil.json'
import { usarParametroDeRuta } from '../../rutas/compartido/navegacion'
import { ALMACEN_PUBLICACIONES } from '../../rutas/inicio/rutas_inicio'
import { ALMACEN_PERFIL, METRICAS_DEMOSTRACION, amigosDe, buscarPerfil, contarAmigosEnComun, sonAmigos } from '../../rutas/perfil/rutas_perfil'
import type { EdicionPerfil, PerfilUsuario, PestanaPerfil } from '@/tipos/perfil/modelo_perfil'

const MAXIMO_AMIGOS_LATERAL = catalogoPerfil.amigos.maximo_lateral
const CONSULTAS_RELACION = { contarAmigosEnComun, sonAmigos }

function ContenidoPerfil({ perfil, propioId }: { perfil: PerfilUsuario; propioId?: string }) {
  const [pestana, setPestana] = useState<PestanaPerfil>('red_social')
  const [editando, setEditando] = useState(false)
  const { feed, publicar, renombrar, acciones } = usarPublicacionesInicio(ALMACEN_PUBLICACIONES)
  const publicaciones = feed.filter((elemento) => elemento.autorId === perfil.id)
  const { esPropio, relacion, amigosEnComun, alternarSolicitud } = usarRelacionPerfil(perfil, buscarPerfil(propioId), CONSULTAS_RELACION)
  function guardarEdicion(edicion: EdicionPerfil) {
    ALMACEN_PERFIL.guardar(perfil.id, edicion)
    if (edicion.nombres !== undefined || edicion.apellidos !== undefined) renombrar(perfil.id, [edicion.nombres ?? perfil.nombres, edicion.apellidos ?? perfil.apellidos].filter(Boolean).join(' '))
  }

  const amigos = amigosDe(perfil)

  return (
    <section aria-label={catalogoPerfil.titulos.principal}>
      <CabeceraPerfil
        perfil={perfil}
        relacion={relacion}
        totalPublicaciones={publicaciones.length}
        amigosEnComun={amigosEnComun}
        onAlternarSolicitud={alternarSolicitud}
        onEditar={() => setEditando(true)}
        onGuardar={guardarEdicion}
      />
      {editando && <ModalEditarPerfil perfil={perfil} onGuardar={guardarEdicion} onCerrar={() => setEditando(false)} />}
      <PestanasPerfil activa={pestana} onCambiar={setPestana} />
      <div role="tabpanel">
        {pestana === 'red_social' && (
          <PestanaRedSocialPerfil perfil={perfil} amigos={amigos} publicaciones={publicaciones} acciones={acciones} propio={esPropio} onPublicar={publicar} onVerAmigos={() => setPestana('amigos')} onIrA={setPestana} onGuardar={guardarEdicion} />
        )}
        {pestana === 'resumen' && <PestanaResumenPerfil perfil={perfil} propio={esPropio} onGuardar={guardarEdicion} onIrA={setPestana} />}
        {pestana === 'experiencia' && <PestanaExperienciaPerfil perfil={perfil} propio={esPropio} onGuardar={guardarEdicion} />}
        {pestana === 'documentos' && <PestanaDocumentosPerfil perfil={perfil} propio={esPropio} onGuardar={guardarEdicion} />}
        {pestana === 'metricas' && <PestanaMetricasPerfil perfil={perfil} propio={esPropio} publicaciones={publicaciones} metricas={METRICAS_DEMOSTRACION} onIrA={setPestana} />}
        {pestana === 'amigos' && <PestanaAmigosPerfil amigos={amigos} />}
      </div>
    </section>
  )
}

function PerfilNoEncontrado() {
  return (
    <section className={`${catalogoPerfil.clases.vacio} flex flex-col items-center gap-4`}>
      <MensajeVacio titulo={catalogoPerfil.mensajes.perfil_no_encontrado_titulo} texto={catalogoPerfil.mensajes.perfil_no_encontrado} />
      <a href={catalogoInicio.rutas.principal} className={clasesBoton({ variant: 'primario', size: 'md' })}>
        {catalogoPerfil.botones.volver_a_inicio}
      </a>
    </section>
  )
}

export function PaginaPerfilUsuario() {
  const { usuario } = usarSesionDemostracion()
  const solicitado = usarParametroDeRuta(catalogoPerfil.parametros_ruta.usuario) ?? usuario?.id
  useSyncExternalStore(ALMACEN_PERFIL.suscribir, ALMACEN_PERFIL.leer, ALMACEN_PERFIL.leer)
  const perfil = buscarPerfil(solicitado)
  const amigos = amigosDe(perfil)
  const contactos = amigos.slice(0, MAXIMO_AMIGOS_LATERAL).map((amigo) => ({ nombre: amigo.nombre, subtitulo: amigo.titular }))

  return (
    <EstructuraApp paginaActiva="perfil">
      <EstructuraTresColumnas
        distribucion="social"
        principal={perfil ? <ContenidoPerfil key={perfil.id} perfil={perfil} propioId={usuario?.id} /> : <PerfilNoEncontrado />}
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            {contactos.length !== 0 && <ContactosPanel titulo={catalogoPerfil.amigos.titulo} contactos={contactos} />}
            <BloqueAnuncio />
          </aside>
        }
      />
    </EstructuraApp>
  )
}
