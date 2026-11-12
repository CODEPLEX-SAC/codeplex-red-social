import { Boton } from '../../compartido/interfaz/boton'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { PanelDatosPersonalesPerfilProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.red_social

const clases = catalogoPerfil.clases.red_social

export function PanelDatosPersonalesPerfil({ perfil, propio, onIrA }: PanelDatosPersonalesPerfilProps) {
  const irAResumen = () => onIrA('resumen')
  const irAExperiencia = () => onIrA('experiencia')
  const lineas = [perfil.ubicacion, [perfil.titular, perfil.empresa].filter(Boolean).join(' · '), perfil.estudios].filter(Boolean)

  return (
    <section className={clases.tarjeta}>
      <h2 className={clases.titulo}>{textos.datos_personales}</h2>
      <ul className={clases.lista_datos}>
        {lineas.map((linea) => (
          <li key={linea}>{linea}</li>
        ))}
      </ul>
      <ul className={catalogoPerfil.clases.habilidades}>
        {perfil.habilidades.map((habilidad) => (
          <li key={habilidad} className={catalogoPerfil.clases.habilidad}>
            {habilidad}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {propio && (
          <Boton type="button" variant="enlace" size="enlace_accion" onClick={irAResumen}>
            {textos.editar_datos}
          </Boton>
        )}
        <Boton type="button" variant="enlace" size="enlace_accion" onClick={irAExperiencia}>
          {textos.ver_experiencia}
        </Boton>
      </div>
    </section>
  )
}
