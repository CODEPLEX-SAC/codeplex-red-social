import { useState } from 'react'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type {
  CampoColaboradorInvitado,
  DatosAsistenteInvitacion,
  DatosColaboradorInvitado,
  PasoInvitacion,
  ResumenColaboradorInvitado,
} from '@/tipos/colaboradores/contrato_invitar_colaborador'

const selectores = catalogoColaboradores.selectores
const PRIMER_PASO: PasoInvitacion = 1
const ETAPAS = catalogoColaboradores.stepper_invitar
const TOTAL_PASOS = ETAPAS.length

function inicial(texto: string) {
  return texto.trim().charAt(0).toUpperCase()
}

export function resumirColaborador(colaborador: DatosColaboradorInvitado): ResumenColaboradorInvitado {
  const nombres = colaborador.nombres.trim()
  const apellidos = colaborador.apellidos.trim()
  return {
    iniciales: `${inicial(nombres)}${inicial(apellidos)}`,
    nombreCompleto: `${nombres} ${apellidos}`.trim(),
    correo: colaborador.correo,
    telefono: colaborador.telefono,
  }
}

export function usarAsistenteInvitacion(datos: DatosAsistenteInvitacion) {
  const [paso, setPaso] = useState<PasoInvitacion>(PRIMER_PASO)
  const [colaborador, setColaborador] = useState<DatosColaboradorInvitado>({
    nombres: datos.informacion.nombres,
    apellidos: datos.informacion.apellidos,
    correo: datos.informacion.correo,
    telefono: datos.informacion.telefono,
    documento_numero: datos.informacion.documentoNumero,
    cargo: datos.informacion.cargo,
    tipo_documento: selectores.tipo_documento.opciones[0],
    empresa: selectores.empresa_colaborador.opciones[0],
    area: selectores.area_departamento.opciones[0],
  })

  function cambiarCampo(campo: CampoColaboradorInvitado, valor: string) {
    setColaborador((anterior) => ({ ...anterior, [campo]: valor }))
  }

  function irAPaso(destino: PasoInvitacion) {
    setPaso(destino)
  }

  function siguiente() {
    setPaso((actual) => Math.min(actual + 1, TOTAL_PASOS) as PasoInvitacion)
  }

  function anterior() {
    setPaso((actual) => Math.max(actual - 1, PRIMER_PASO) as PasoInvitacion)
  }

  return { paso, colaborador, resumen: resumirColaborador(colaborador), cambiarCampo, irAPaso, siguiente, anterior }
}
