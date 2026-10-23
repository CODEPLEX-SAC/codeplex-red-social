import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoPerfil } from './campo_perfil'
import { MarcoSeccionPerfil } from './marco_seccion_perfil'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { SeccionCamposPerfilProps } from '@/tipos/perfil/contrato_perfil'

const clases = catalogoPerfil.clases.editor

export function SeccionCamposPerfil({ definicion, valores, propio, onGuardar }: SeccionCamposPerfilProps) {
  const [editando, setEditando] = useState(false)
  const [borrador, setBorrador] = useState(valores)
  const [completo, setCompleto] = useState(false)
  const filas = definicion.campos.filter((campo) => valores[campo.clave])
  const limite = definicion.filas_visibles ?? filas.length
  const visibles = completo ? filas : filas.slice(0, limite)

  function abrir() {
    setBorrador(valores)
    setEditando(true)
  }

  function guardar() {
    onGuardar(borrador)
    setEditando(false)
  }

  if (!propio && filas.length === 0) return null

  return (
    <MarcoSeccionPerfil titulo={definicion.titulo} puedeEditar={propio} editando={editando} onEditar={abrir} onCancelar={() => setEditando(false)} onGuardar={guardar}>
      {editando ? (
        <div className={clases.formulario}>
          {definicion.campos.map((campo) => (
            <CampoPerfil key={campo.clave} campo={campo} valor={borrador[campo.clave] ?? ''} onCambiar={(valor) => setBorrador((actual) => ({ ...actual, [campo.clave]: String(valor) }))} />
          ))}
        </div>
      ) : filas.length === 0 ? (
        <Boton type="button" variant="enlace" size="enlace_accion" onClick={abrir}>
          {definicion.agregar}
        </Boton>
      ) : (
        <>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 text-subtitulo text-texto">
            {visibles.map((campo) => (
              <li key={campo.clave} className="whitespace-pre-wrap break-words">
                {campo.prefijo ? (
                  <>
                    {campo.prefijo} <strong>{valores[campo.clave]}</strong>
                  </>
                ) : (
                  valores[campo.clave]
                )}
              </li>
            ))}
          </ul>
          {filas.length > limite && (
            <Boton type="button" variant="enlace" size="enlace_accion" aria-expanded={completo} onClick={() => setCompleto((actual) => !actual)} className="mt-2">
              {completo ? definicion.ver_menos : definicion.ver_mas}
            </Boton>
          )}
        </>
      )}
    </MarcoSeccionPerfil>
  )
}
