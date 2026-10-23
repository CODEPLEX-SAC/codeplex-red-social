import { useState } from 'react'
import type { FormEvent } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Modal } from '../../compartido/interfaz/modal'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { ModalEditarPerfilProps } from '@/tipos/perfil/contrato_perfil'
import type { RedesPerfil } from '@/tipos/perfil/modelo_perfil'

const textos = catalogoPerfil.editar
const CAMPOS_CONTACTO: { clave: keyof RedesPerfil; etiqueta: string }[] = [
  { clave: 'correo', etiqueta: textos.correo },
  { clave: 'linkedin', etiqueta: textos.linkedin },
  { clave: 'web', etiqueta: textos.web },
]

export function ModalEditarPerfil({ perfil, onGuardar, onCerrar }: ModalEditarPerfilProps) {
  const [nombres, setNombres] = useState(perfil.nombres)
  const [apellidos, setApellidos] = useState(perfil.apellidos)
  const [titular, setTitular] = useState(perfil.titular)
  const [redes, setRedes] = useState(perfil.redes)
  const valido = nombres.trim().length > 0

  function guardar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (!valido) return
    onGuardar({ nombres: nombres.trim(), apellidos: apellidos.trim(), titular: titular.trim(), redes: { correo: redes.correo.trim(), linkedin: redes.linkedin.trim(), web: redes.web.trim() } })
    onCerrar()
  }

  return (
    <Modal titulo={textos.titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCerrar} className="max-w-130 rounded-2xl max-600:h-full max-600:rounded-none">
      <form onSubmit={guardar} className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-4">
          <div className="grid grid-cols-2 gap-3 max-480:grid-cols-1">
            <CampoEtiquetado etiqueta={textos.nombres} envolver>
              <CampoTexto valor={nombres} alCambiar={setNombres} />
            </CampoEtiquetado>
            <CampoEtiquetado etiqueta={textos.apellidos} envolver>
              <CampoTexto valor={apellidos} alCambiar={setApellidos} />
            </CampoEtiquetado>
          </div>
          <p className="m-0 text-auxiliar text-texto-suave">{textos.ayuda_nombre}</p>
          <CampoEtiquetado etiqueta={textos.titular} envolver>
            <CampoTexto valor={titular} alCambiar={setTitular} />
          </CampoEtiquetado>
          <h3 className="m-0 text-nombre-entidad text-texto">{textos.contacto}</h3>
          {CAMPOS_CONTACTO.map((campo) => (
            <CampoEtiquetado key={campo.clave} etiqueta={campo.etiqueta} envolver>
              <CampoTexto valor={redes[campo.clave]} alCambiar={(valor) => setRedes((actual) => ({ ...actual, [campo.clave]: valor }))} />
            </CampoEtiquetado>
          ))}
        </div>
        <div className="flex justify-end gap-3 border-t border-borde px-5 py-4 max-600:flex-col-reverse">
          <Boton type="button" variant="secundario" size="md" onClick={onCerrar}>
            {textos.cancelar}
          </Boton>
          <Boton type="submit" variant="primario" size="md" disabled={!valido}>
            {textos.guardar}
          </Boton>
        </div>
      </form>
    </Modal>
  )
}
