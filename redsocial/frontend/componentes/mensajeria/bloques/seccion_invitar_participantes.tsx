import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { Icono } from '../../compartido/icono'
import { usarBusquedaInvitados } from './usar_busqueda_invitados'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ContactoInvitable } from '@/tipos/mensajeria/contrato_integracion_llamada'
import type { SeccionInvitarParticipantesProps } from '@/tipos/mensajeria/contrato_programar_reunion'

const programar = catalogoMensajeria.videollamada.programar
const textos = programar.textos.invitar
const clases = programar.clases

function ResultadoBusqueda({ contacto, fotografia, onAgregar }: { contacto: ContactoInvitable; fotografia: string; onAgregar: (nombre: string) => void }) {
  const invitar = () => onAgregar(contacto.nombre)

  return (
    <li className={clases.fila}>
      <AvatarUsuario tamano="sm" imagen={fotografia} />
      <div className={clases.cuerpo}>
        <strong className={clases.nombre}>{contacto.nombre}</strong>
        <span className={clases.rol}>{contacto.detalle}</span>
      </div>
      <Boton type="button" variant="secundario" size="default" className={clases.boton_invitar} aria-label={textos.invitar_a.replace(':nombre', contacto.nombre)} onClick={invitar}>
        {textos.invitar}
      </Boton>
    </li>
  )
}

function FilaInvitado({ nombre, detalle, fotografia, onQuitar }: { nombre: string; detalle: string; fotografia: string; onQuitar: (nombre: string) => void }) {
  const quitar = () => onQuitar(nombre)

  return (
    <li className={clases.fila}>
      <AvatarUsuario tamano="md" imagen={fotografia} estado="conectado" />
      <div className={clases.cuerpo}>
        <strong className={clases.nombre}>{nombre}</strong>
        <span className={clases.rol}>{detalle}</span>
      </div>
      <BotonIcono icono="cerrar" type="button" aria-label={textos.quitar.replace(':nombre', nombre)} variant="discreto" size="default" onClick={quitar} />
    </li>
  )
}

export function SeccionInvitarParticipantes({ candidatos, invitados, disponibles, fotografiaDe, onAgregar, onQuitar }: SeccionInvitarParticipantesProps) {
  const [listaAbierta, setListaAbierta] = useState(true)
  const { texto, consulta, opciones, agregar, limpiar, cambiarConsulta, invitarTexto } = usarBusquedaInvitados({ disponibles, onAgregar })
  const detalles = new Map(candidatos.map((candidato) => [candidato.nombre, candidato.detalle]))
  const alternarLista = () => setListaAbierta((actual) => !actual)
  const botonLimpiar = consulta !== String() ? <BotonIcono icono="cerrar" type="button" aria-label={textos.limpiar} variant="discreto" size="sm" onClick={limpiar} /> : undefined

  return (
    <section className={clases.tarjeta}>
      <h2 className={clases.titulo_tarjeta}>{textos.titulo}</h2>
      <p className={clases.subtitulo_tarjeta}>{textos.subtitulo}</p>
      <CampoBusqueda
        placeholder={textos.buscar}
        aria-label={textos.etiqueta_busqueda}
        value={texto}
        onChange={cambiarConsulta}
        accion={botonLimpiar}
      />
      {consulta !== String() && (
        <ul aria-label={textos.etiqueta_busqueda} className={clases.resultados}>
          {opciones.map((contacto) => (
            <ResultadoBusqueda key={contacto.id} contacto={contacto} fotografia={fotografiaDe(contacto.nombre)} onAgregar={agregar} />
          ))}
          {opciones.length === 0 && (
            <li className={clases.sin_resultados_accion}>
              <p className={clases.vacio}>{textos.sin_resultados}</p>
              <Boton type="button" variant="secundario" size="default" onClick={invitarTexto}>
                {textos.invitar_texto.replace(':nombre', consulta)}
              </Boton>
            </li>
          )}
        </ul>
      )}
      <Boton type="button" variant="fantasma" size="default" className={clases.alternar_lista} aria-expanded={listaAbierta} onClick={alternarLista}>
        {textos.invitados.replace(':n', String(invitados.length))}
        <Icono name={listaAbierta ? 'flecha-arriba' : 'flecha-abajo'} className="h-4 w-4" />
      </Boton>
      {listaAbierta && (
        <ul aria-label={textos.lista} className={clases.lista}>
          {invitados.map((nombre) => (
            <FilaInvitado key={nombre} nombre={nombre} detalle={detalles.get(nombre) ?? textos.invitado} fotografia={fotografiaDe(nombre)} onQuitar={onQuitar} />
          ))}
        </ul>
      )}
    </section>
  )
}
