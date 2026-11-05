import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Boton } from '../interfaz/boton'
import { Icono } from '../icono'
import { Modal } from '../interfaz/modal'
import { CLASES_FLUJO_PAGO as clases } from './clases_flujo_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { PerfilPago } from '@/tipos/compartido/contrato_flujo_pago'

export function ModalPerfilesPago({ perfiles, seleccionadoId, aviso, alSeleccionar, alAgregar, alCerrar }: { perfiles: PerfilPago[]; seleccionadoId: string | null; aviso?: string; alSeleccionar: (id: string) => void; alAgregar: () => void; alCerrar: () => void }) {
  const { guardados } = usarTextosPago()
  return (
    <Modal titulo={guardados.titulo_perfiles} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={alCerrar} className={clases.modal_perfiles}>
      <div className={clases.modal_perfiles_cuerpo}>
        {perfiles.map((perfil) => (
          <Boton key={perfil.id} type="button" variant={perfil.id === seleccionadoId ? 'contorno' : 'secundario'} size="md" aria-pressed={perfil.id === seleccionadoId} className={clases.perfil_opcion} onClick={() => alSeleccionar(perfil.id)}>
            <span className={clases.perfil_opcion_texto}>
              <span className={clases.perfil_opcion_titulo}>{perfil.razon}</span>
              <span className={clases.perfil_opcion_detalle}>{[guardados.documento.replace(':documento', perfil.documento), perfil.correo].join(guardados.separador)}</span>
            </span>
            {perfil.id === seleccionadoId && <Icono name="verificado" className={clases.perfil_opcion_marca} />}
          </Boton>
        ))}
        <Boton type="button" variant="enlace" size="enlace" onClick={alAgregar}>{guardados.nuevo_perfil}</Boton>
        {aviso && <p className={clases.texto_suave}>{aviso}</p>}
      </div>
    </Modal>
  )
}
