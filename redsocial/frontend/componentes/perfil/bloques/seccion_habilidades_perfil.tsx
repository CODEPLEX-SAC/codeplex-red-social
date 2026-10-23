import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { agregarHabilidad, quitarHabilidad } from './logica_edicion_perfil'
import { MarcoSeccionPerfil } from './marco_seccion_perfil'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { SeccionHabilidadesPerfilProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.secciones.habilidades

export function SeccionHabilidadesPerfil({ habilidades, propio, onGuardar }: SeccionHabilidadesPerfilProps) {
  const [editando, setEditando] = useState(false)
  const [borrador, setBorrador] = useState(habilidades)
  const [nueva, setNueva] = useState('')

  function abrir() {
    setBorrador(habilidades)
    setNueva('')
    setEditando(true)
  }

  function agregar() {
    setBorrador((actual) => agregarHabilidad(actual, nueva))
    setNueva('')
  }

  function guardar() {
    onGuardar(borrador)
    setEditando(false)
  }

  if (!propio && habilidades.length === 0) return null
  const lista = editando ? borrador : habilidades

  return (
    <MarcoSeccionPerfil titulo={textos.titulo} puedeEditar={propio} editando={editando} onEditar={abrir} onCancelar={() => setEditando(false)} onGuardar={guardar}>
      {editando && (
        <form className="mb-3 flex items-start gap-2" onSubmit={(evento) => { evento.preventDefault(); agregar() }}>
          <div className="min-w-0 flex-1">
            <CampoTexto valor={nueva} alCambiar={setNueva} marcador={textos.marcador} inputProps={{ [catalogoCompartido.controles.atributo_accesible]: textos.etiqueta_campo }} />
          </div>
          <Boton type="submit" variant="secundario" size="md" disabled={!nueva}>
            {textos.agregar_boton}
          </Boton>
        </form>
      )}
      {lista.length === 0 && !editando ? (
        <Boton type="button" variant="enlace" size="enlace_accion" onClick={abrir}>
          {textos.agregar}
        </Boton>
      ) : (
        <ul className={catalogoPerfil.clases.habilidades}>
          {lista.map((habilidad) => (
            <li key={habilidad} className={catalogoPerfil.clases.habilidad}>
              {habilidad}
              {editando && <BotonIcono icono="cerrar" type="button" aria-label={textos.quitar.replace(':habilidad', habilidad)} onClick={() => setBorrador((actual) => quitarHabilidad(actual, habilidad))} variant="discreto" size="sm" />}
            </li>
          ))}
        </ul>
      )}
    </MarcoSeccionPerfil>
  )
}
