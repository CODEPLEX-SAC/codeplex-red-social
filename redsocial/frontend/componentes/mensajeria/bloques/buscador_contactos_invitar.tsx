import { useMemo } from 'react'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { contieneTexto, crearFuenteLocal } from '../../compartido/interfaz/fuente_busqueda_local'
import { usarBusqueda } from '../../compartido/interfaz/usar_busqueda'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ContactoInvitable, EstadoInvitacion } from '@/tipos/mensajeria/contrato_integracion_llamada'
import type { usarInvitaciones } from './usar_invitaciones'

const textos = catalogoMensajeria.videollamada.textos.invitaciones
const clases = catalogoMensajeria.videollamada.clases.invitaciones

function EstadoDeInvitacion({ estado, contacto, onInvitar }: { estado: EstadoInvitacion; contacto: ContactoInvitable; onInvitar: (id: string) => void }) {
  if (estado === 'enviada') return <span className={clases.estado}>{textos.enviada}</span>
  if (estado === 'preparada') return <span className={clases.estado_preparada}>{textos.preparada}</span>
  return (
    <Boton type="button" variant="secundario" size="mini" className="flex-none" aria-label={`${textos.invitar} ${contacto.nombre}`} onClick={() => onInvitar(contacto.id)}>
      {textos.invitar}
    </Boton>
  )
}

export function BuscadorContactosInvitar({ contactos, invitaciones }: { contactos: readonly ContactoInvitable[]; invitaciones: ReturnType<typeof usarInvitaciones> }) {
  const fuente = useMemo(() => crearFuenteLocal(contactos, (contacto, consulta) => contieneTexto(contacto.nombre, consulta)), [contactos])
  const busqueda = usarBusqueda(fuente)
  const visibles = busqueda.resultado.elementos.slice(0, textos.maximo_resultados)
  const hayPreparadas = Object.values(invitaciones.estados).includes('preparada')

  return (
    <div>
      <CampoBusqueda placeholder={textos.buscar} aria-label={textos.etiqueta_busqueda} value={busqueda.texto} onChange={(evento) => busqueda.cambiarTexto(evento.target.value)} className={clases.buscador} />
      <div className={clases.lista}>
        {visibles.length === 0 && <p className={clases.vacio}>{textos.sin_resultados}</p>}
        {visibles.map((contacto) => (
          <article key={contacto.id} className={clases.fila}>
            <AvatarUsuario tamano="sm" imagen={usuarioImg} />
            <div className={clases.cuerpo}>
              <strong className={clases.nombre}>{contacto.nombre}</strong>
              <span className={clases.detalle}>{contacto.detalle}</span>
            </div>
            <EstadoDeInvitacion estado={invitaciones.estados[contacto.id] ?? 'ninguna'} contacto={contacto} onInvitar={(id) => void invitaciones.invitar(id)} />
          </article>
        ))}
      </div>
      {hayPreparadas && (
        <p aria-live="polite" className={clases.aviso}>
          {textos.preparada_nota}
        </p>
      )}
    </div>
  )
}
