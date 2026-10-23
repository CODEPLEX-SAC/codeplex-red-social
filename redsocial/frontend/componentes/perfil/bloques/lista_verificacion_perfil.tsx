import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { pasosCumplidos } from './logica_edicion_perfil'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { ListaVerificacionPerfilProps } from '@/tipos/perfil/contrato_perfil'
import type { PestanaPerfil } from '@/tipos/perfil/modelo_perfil'

const textos = catalogoPerfil.secciones.verificacion

export function ListaVerificacionPerfil({ perfil, onIrA }: ListaVerificacionPerfilProps) {
  const cumplidos = pasosCumplidos(perfil)
  const pendientes = textos.pasos.filter((paso) => !cumplidos[paso.clave])
  if (pendientes.length === 0) return null

  return (
    <section className={catalogoPerfil.clases.seccion}>
      <h2 className="m-0 mb-3 text-titulo-banner text-texto">{textos.titulo}</h2>
      <ul className={catalogoPerfil.clases.editor.verificacion}>
        {pendientes.map((paso) => (
          <li key={paso.clave} className={catalogoPerfil.clases.editor.paso}>
            <Icono name="marca-pequena" className="h-4 w-4 flex-none text-texto-suave" />
            <Boton type="button" variant="enlace" size="enlace_accion" onClick={() => onIrA(paso.pestana as PestanaPerfil)}>
              {paso.etiqueta}
            </Boton>
          </li>
        ))}
      </ul>
    </section>
  )
}
