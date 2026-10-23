import { useState } from 'react'
import { CampoPerfil } from './campo_perfil'
import { MarcoSeccionPerfil } from './marco_seccion_perfil'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { SeccionDetallesFijadosPerfilProps } from '@/tipos/perfil/contrato_perfil'
import type { DetallesFijadosPerfil } from '@/tipos/perfil/modelo_perfil'

const textos = catalogoPerfil.secciones.detalles_fijados
const opciones = textos.opciones as { clave: keyof DetallesFijadosPerfil; etiqueta: string }[]

export function SeccionDetallesFijadosPerfil({ detalles, onGuardar }: SeccionDetallesFijadosPerfilProps) {
  const [editando, setEditando] = useState(false)
  const [borrador, setBorrador] = useState(detalles)
  const fijados = opciones.filter((opcion) => detalles[opcion.clave])

  function abrir() {
    setBorrador(detalles)
    setEditando(true)
  }

  function guardar() {
    onGuardar(borrador)
    setEditando(false)
  }

  return (
    <MarcoSeccionPerfil titulo={textos.titulo} puedeEditar editando={editando} onEditar={abrir} onCancelar={() => setEditando(false)} onGuardar={guardar}>
      {editando ? (
        <div className={catalogoPerfil.clases.editor.formulario}>
          {opciones.map((opcion) => (
            <CampoPerfil key={opcion.clave} campo={{ clave: opcion.clave, etiqueta: opcion.etiqueta, tipo: 'casilla' }} valor={borrador[opcion.clave]} onCambiar={(valor) => setBorrador((actual) => ({ ...actual, [opcion.clave]: valor === true }))} />
          ))}
        </div>
      ) : (
        <ul className={catalogoPerfil.clases.habilidades}>
          {fijados.map((opcion) => (
            <li key={opcion.clave} className={catalogoPerfil.clases.habilidad}>
              {opcion.etiqueta}
            </li>
          ))}
        </ul>
      )}
    </MarcoSeccionPerfil>
  )
}
