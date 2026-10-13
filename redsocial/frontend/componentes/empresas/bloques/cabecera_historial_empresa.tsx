import { EncabezadoSeccionEmpresa } from './encabezado_seccion_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'

const textos = catalogoEmpresas.historial_empresa

export function CabeceraHistorialEmpresa() {
  return <EncabezadoSeccionEmpresa icono="reloj" titulo={textos.titulo} subtitulo={textos.subtitulo} />
}
