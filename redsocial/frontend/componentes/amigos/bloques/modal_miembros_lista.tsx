import { useMemo, useState } from 'react'
import { AvatarUsuario, Boton, CampoBusqueda, Casilla, Icono, MensajeEstadoBusqueda, coincideNombre, crearFuenteLocal, imagenUsuarioPredeterminada as usuarioImg, usarBusqueda } from '../../compartido'
import { Modal } from '../../compartido/interfaz/modal'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { ModalMiembrosListaProps } from '@/tipos/amigos/contrato_listas'

const clases = catalogoAmigos.clases.listas
const textos = catalogoAmigos.listas.miembros

export function ModalMiembrosLista({ lista, amigos, alGuardar, alCerrar }: ModalMiembrosListaProps) {
  const [elegidos, setElegidos] = useState<string[]>(lista.miembros)
  const fuenteLocal = useMemo(() => crearFuenteLocal([...amigos], coincideNombre), [amigos])
  const busqueda = usarBusqueda(fuenteLocal, { modo: 'local' })
  const marcados = new Set(elegidos)
  const visibles = busqueda.resultado.elementos

  function alternar(nombre: string, marcado: boolean) {
    setElegidos((actuales) => (marcado ? [...actuales, nombre] : actuales.filter((elegido) => elegido !== nombre)))
  }

  function quitar(nombre: string) {
    alternar(nombre, false)
  }

  return (
    <Modal titulo={textos.titulo} etiquetaCerrar={catalogoAmigos.listas.crear.cerrar} onCerrar={alCerrar} className={clases.modal}>
      <div className={clases.cuerpo}>
        <CampoBusqueda placeholder={textos.buscar} aria-label={textos.buscar} value={busqueda.texto} onChange={(evento) => busqueda.cambiarTexto(evento.target.value)} />
        <MensajeEstadoBusqueda estado={busqueda.estado} error={busqueda.error} sinCoincidencias={false} />
        <ul className={clases.lista}>
          {visibles.map((amigo) => (
            <li key={amigo.nombre} className={clases.fila}>
              <AvatarUsuario tamano="sm" imagen={usuarioImg} />
              <span className={clases.fila_nombre}>{amigo.nombre}</span>
              <Casilla seleccionado={marcados.has(amigo.nombre)} alCambiar={(_, marcado) => alternar(amigo.nombre, marcado)} inputProps={{ 'aria-label': textos.marcar.replace(':nombre', amigo.nombre) }} />
            </li>
          ))}
        </ul>
        {visibles.length === 0 && busqueda.estado === 'sin_coincidencias' && <p className={clases.texto}>{textos.sin_resultados}</p>}
      </div>
      {elegidos.length > 0 && (
        <div className={clases.seleccionados}>
          <p className={clases.seleccionados_ayuda}>{textos.ayuda}</p>
          <ul className={clases.chips}>
            {elegidos.map((nombre) => (
              <li key={nombre}>
                <Boton type="button" variant="filtro" size="filtro" aria-label={textos.quitar.replace(':nombre', nombre)} onClick={() => quitar(nombre)}>
                  {nombre}
                  <Icono name="cerrar" className={clases.chip_glifo} />
                </Boton>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={clases.pie}>
        <Boton type="button" variant="enlace" size="enlace_accion" onClick={alCerrar}>{catalogoAmigos.listas.crear.cancelar}</Boton>
        <Boton type="button" variant="primario" size="md" onClick={() => alGuardar(elegidos)}>{textos.guardar}</Boton>
      </div>
    </Modal>
  )
}
