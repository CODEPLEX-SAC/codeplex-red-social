import { useState } from 'react'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import type { DatosAsistenteInvitacion, EstadoVigenciaInvitacion } from '@/tipos/colaboradores/contrato_invitar_colaborador'

export function usarVigenciaInvitacion(datos: DatosAsistenteInvitacion): EstadoVigenciaInvitacion {
  const [inicio, setInicio] = useState<Dayjs | null>(() => dayjs(datos.vigencia.fechaInicio))
  const [vencimiento, setVencimiento] = useState<Dayjs | null>(() => dayjs(datos.vigencia.fechaVencimiento))

  return { inicio, vencimiento, asignarInicio: setInicio, asignarVencimiento: setVencimiento }
}
