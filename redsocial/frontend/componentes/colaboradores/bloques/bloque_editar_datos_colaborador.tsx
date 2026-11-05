import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { BloqueTelefonoWhatsapp } from './bloque_telefono_whatsapp'
import { componerTelefono, separarTelefono } from './logica_telefono_colaborador'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { etiquetarCampo } from './manejadores_campo_colaborador'
import type { BorradorColaborador, CambiarBorrador } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

const textos = catalogoColaboradores.editar
const clases = catalogoColaboradores.clases.edicion
const detalle = catalogoColaboradores.clases.detalle

export function BloqueEditarDatosColaborador({ borrador, alCambiar }: { borrador: BorradorColaborador; alCambiar: CambiarBorrador }) {
  const telefono = separarTelefono(borrador.telefono)

  return (
    <section>
      <h3 className={detalle.titulo_seccion}>{catalogoColaboradores.secciones.datos_del_colaborador}</h3>
      <div className={clases.foto_fila}>
        <AvatarUsuario tamano="lg" imagen={usuarioImg} />
        <Boton type="button" variant="enlace" size="enlace">{textos.cambiar_foto}</Boton>
      </div>
      <div className={clases.campos_columna}>
        <CampoEtiquetado variante="compacta" etiqueta={textos.nombre_completo} requerido>
          <CampoTexto valor={borrador.nombre} alCambiar={(texto) => alCambiar('nombre', texto)} inputProps={etiquetarCampo(textos.nombre_completo)} anchoCompleto />
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" etiqueta={catalogoColaboradores.campos.correo_electronico} requerido>
          <CampoTexto valor={borrador.correo} alCambiar={(texto) => alCambiar('correo', texto)} inputProps={etiquetarCampo(catalogoColaboradores.campos.correo_electronico)} tipo="email" anchoCompleto />
        </CampoEtiquetado>
        <BloqueTelefonoWhatsapp
          etiqueta={textos.telefono}
          numero={{ valor: telefono.numero, alCambiar: (texto) => alCambiar('telefono', componerTelefono(telefono.codigo, texto)) }}
          codigo={{ valor: telefono.codigo, alCambiar: (codigo) => alCambiar('telefono', componerTelefono(codigo, telefono.numero)) }}
        />
      </div>
    </section>
  )
}
