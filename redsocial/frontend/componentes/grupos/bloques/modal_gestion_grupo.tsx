import { Boton } from '../../compartido/interfaz/boton'
import { GrupoRadio } from '../../compartido/interfaz/grupo_radio'
import { Modal } from '../../compartido/interfaz/modal'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { ModalGestionGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'
import type { NivelNovedades } from '@/tipos/grupos/contrato_puerto_grupos'

const gestion = catalogoGrupos.menu.gestion
const clases = catalogoGrupos.clases.gestion
const CONFIRMACIONES: Record<string, { titulo: string; texto: string; confirmar: string }> = gestion.confirmaciones
const TITULOS: Record<string, string> = gestion.titulos

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className={clases.dato}>
      <span>{etiqueta}</span>
      <strong className={clases.dato_valor}>{valor}</strong>
    </div>
  )
}

export function ModalGestionGrupo({ tipo, grupo, puerto, onConfirmar, onCerrar }: ModalGestionGrupoProps) {
  const detalle = puerto.detalle(grupo.id)
  const publicaciones = puerto.publicaciones(grupo.id).leer().feed.length
  const nivel = puerto.estado(grupo.id).novedades
  const confirmacion = CONFIRMACIONES[tipo]
  const titulo = TITULOS[tipo]

  return (
    <Modal titulo={titulo} etiquetaCerrar={gestion.cerrar} onCerrar={onCerrar} className={clases.dialogo}>
      <div className={clases.cuerpo}>
        {tipo === 'solicitudes' && <MensajeVacio texto={gestion.solicitudes.vacio} className="py-6" />}
        {tipo === 'estado' && detalle && (
          <>
            <Dato etiqueta={gestion.estado.miembros} valor={detalle.miembros} />
            <Dato etiqueta={gestion.estado.publicaciones} valor={String(publicaciones)} />
            <Dato etiqueta={gestion.estado.creado} valor={detalle.creado} />
          </>
        )}
        {tipo === 'novedades' && (
          <>
            <GrupoRadio opciones={gestion.novedades.opciones} valor={nivel} alCambiar={(_, valor) => puerto.novedades(grupo.id, valor as NivelNovedades)} aria-label={gestion.novedades.titulo} />
            <p aria-live="polite" className={clases.confirmacion}>
              {gestion.novedades.guardado}
            </p>
          </>
        )}
        {confirmacion && <p className={clases.texto}>{confirmacion.texto}</p>}
      </div>
      <div className={clases.pie}>
        {confirmacion && (
          <>
            <Boton type="button" variant="secundario" size="default" onClick={onCerrar}>
              {gestion.cancelar}
            </Boton>
            <Boton type="button" variant="peligro" size="default" onClick={onConfirmar}>
              {confirmacion.confirmar}
            </Boton>
          </>
        )}
        {!confirmacion && (
          <Boton type="button" variant="primario" size="default" onClick={onCerrar}>
            {gestion.cerrar}
          </Boton>
        )}
      </div>
    </Modal>
  )
}
