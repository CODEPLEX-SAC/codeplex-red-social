import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { IconName } from '../../../tipos/compartido/contrato_icono'
import { Icono } from '../../compartido/icono'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const textos = catalogoColaboradores.perfil
const clases = catalogoColaboradores.clases.detalle

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
    <section className={clases.seccion}>
      <h4 className={clases.titulo_seccion}>{catalogoColaboradores.secciones.vigencia_y_acceso}</h4>
      <ul className={clases.lista_datos}>
        {filas.map((item) => (
          <li key={item.etiqueta} className={clases.dato}>
            <Icono name={item.icono} className={clases.dato_icono} />
            <div>
              <span className={clases.dato_etiqueta}>{item.etiqueta}</span>
              <strong className={clases.dato_valor}>{item.valor}</strong>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
