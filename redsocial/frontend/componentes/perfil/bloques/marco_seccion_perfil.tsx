import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { MarcoSeccionPerfilProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.secciones
const clases = catalogoPerfil.clases.editor

export function MarcoSeccionPerfil({ titulo, puedeEditar, editando, guardarDeshabilitado = false, onEditar, onCancelar, onGuardar, children }: MarcoSeccionPerfilProps) {
  return (
    <section className={catalogoPerfil.clases.seccion}>
      <div className={clases.cabecera}>
        <h2 className="m-0 text-titulo-banner text-texto">{titulo}</h2>
        {puedeEditar && !editando && <BotonIcono icono="editar-oficial" type="button" aria-label={textos.editar_seccion.replace(':seccion', titulo)} onClick={onEditar} variant="discreto" size="default" />}
      </div>
      {children}
      {editando && (
        <div className={clases.acciones}>
          <Boton type="button" variant="secundario" size="md" onClick={onCancelar}>
            {textos.cancelar}
          </Boton>
          <Boton type="button" variant="primario" size="md" disabled={guardarDeshabilitado} onClick={onGuardar}>
            {textos.guardar}
          </Boton>
        </div>
      )}
    </section>
  )
}
