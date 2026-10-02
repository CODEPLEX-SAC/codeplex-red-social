import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { IconName } from '../../../tipos/compartido/contrato_icono'
import { Icono } from '../../compartido/icono'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const textos = catalogoColaboradores.perfil

export function BloqueInformacionGeneral({ colaborador }: { colaborador: Colaborador }) {
  const { vigencia } = colaborador
  const filas: { icono: IconName; etiqueta: string; valor: string }[] = [
    ...(vigencia.tipo === 'rango'
      ? [
          { icono: 'calendario' as IconName, etiqueta: textos.vigencia_acceso.inicio, valor: vigencia.desde },
          { icono: 'calendario' as IconName, etiqueta: textos.vigencia_acceso.fin, valor: vigencia.hasta },
        ]
      : [{ icono: 'calendario' as IconName, etiqueta: vigencia.etiqueta, valor: vigencia.fecha }]),
    ...(colaborador.fechaInvitacion ? [{ icono: 'enviar' as IconName, etiqueta: textos.informacion_general.fecha_invitacion, valor: colaborador.fechaInvitacion }] : []),
    ...(colaborador.ultimoAcceso ? [{ icono: 'reloj' as IconName, etiqueta: textos.informacion_general.ultimo_acceso, valor: colaborador.ultimoAcceso }] : []),
  ]

  return (
    <section className="mt-4 border-t border-t-f3f4f6 pt-4">
      <h4 className="m-0 mb-2.5 text-nombre-entidad font-semibold text-gris-oscuro-texto">{catalogoColaboradores.secciones.vigencia_y_acceso}</h4>
      <ul className="m-0 grid list-none gap-3 p-0">
        {filas.map((item) => (
          <li key={item.etiqueta} className="flex items-start gap-2.5">
            <Icono name={item.icono} className="mt-0.5 w-4 h-4 flex-none text-gris-categoria" />
            <div>
              <span className="block text-auxiliar text-gris-texto-secundario">{item.etiqueta}</span>
              <strong className="mt-px block text-campo-formulario font-medium text-gris-oscuro-texto">{item.valor}</strong>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
