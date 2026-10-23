import { Boton } from '../../compartido/interfaz/boton'
import { Insignia } from '../../compartido/interfaz/insignia'
import { perfilIncompleto } from './logica_edicion_perfil'
import { contarPreguntas, preguntasDe } from './logica_red_social_perfil'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { PestanaMetricasPerfilProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.metricas
const clases = catalogoPerfil.clases.metricas
const TONOS_ESTADO: Record<string, string> = clases.estado

function Tarjeta({ etiqueta, valor, estado }: { etiqueta: string; valor: string | number; estado?: 'optimo' | 'estable' }) {
  return (
    <li className={clases.tarjeta}>
      <span className={clases.etiqueta}>{etiqueta}</span>
      <strong className={clases.valor}>{valor}</strong>
      {estado && <Insignia variant="status" className={TONOS_ESTADO[estado]}>{textos.estados[estado]}</Insignia>}
    </li>
  )
}

export function PestanaMetricasPerfil({ perfil, propio, publicaciones, metricas, onIrA }: PestanaMetricasPerfilProps) {
  if (propio) {
    const { total: preguntas, resueltas } = contarPreguntas(preguntasDe(publicaciones))
    if (perfilIncompleto(perfil, publicaciones.length)) {
      return (
        <section className={catalogoPerfil.clases.seccion}>
          <div className={catalogoPerfil.clases.editor.bloqueo}>
            <h2 className="m-0 text-titulo-banner text-texto">{textos.bloqueadas_titulo}</h2>
            <p className="m-0 max-w-80 text-subtitulo text-texto-suave">{textos.bloqueadas_texto}</p>
            <Boton type="button" variant="primario" size="md" onClick={() => onIrA('resumen')}>
              {textos.completar}
            </Boton>
          </div>
        </section>
      )
    }
    return (
      <section className={catalogoPerfil.clases.seccion}>
        <h2 className="m-0 mb-2.5 text-titulo-banner text-texto">{textos.resumen_actividad}</h2>
        <ul className={clases.rejilla}>
          <Tarjeta etiqueta={textos.publicaciones} valor={publicaciones.length} />
          <Tarjeta etiqueta={textos.preguntas} valor={preguntas} />
          <Tarjeta etiqueta={textos.resueltas} valor={resueltas} />
          <Tarjeta etiqueta={textos.amigos} valor={perfil.amigos.length} />
        </ul>
      </section>
    )
  }

  return (
    <>
      <section className={catalogoPerfil.clases.seccion}>
        <h2 className="m-0 mb-1 text-titulo-banner text-texto">{textos.comportamiento}</h2>
        <p className="m-0 mb-3 text-auxiliar text-texto-suave">{textos.nota_demostracion}</p>
        <ul className={clases.rejilla}>
          {metricas.comportamiento.map((metrica) => (
            <Tarjeta key={metrica.clave} etiqueta={metrica.etiqueta} valor={metrica.valor} estado={metrica.estado} />
          ))}
        </ul>
      </section>
      <section className={catalogoPerfil.clases.seccion}>
        <h2 className="m-0 mb-3 text-titulo-banner text-texto">{textos.profesionales}</h2>
        <ul className={clases.rejilla}>
          {metricas.profesionales.map((metrica) => (
            <li key={metrica.clave} className={clases.tarjeta}>
              <strong className={clases.titulo}>{metrica.titulo}</strong>
              {metrica.datos.map((dato) => (
                <span key={dato.etiqueta} className={clases.etiqueta}>
                  {dato.etiqueta}: <strong className="text-texto">{dato.valor}</strong>
                </span>
              ))}
              <progress value={metrica.precision} max={textos.precision_maxima} aria-label={`${textos.precision} ${metrica.titulo}`} className={clases.barra} />
              <span className={clases.etiqueta}>{`${textos.precision}: ${metrica.precision}%`}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
