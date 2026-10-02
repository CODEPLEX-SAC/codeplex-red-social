import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'

const STEPPER_INVITAR = catalogoColaboradores.stepper_invitar

export function BloqueInvitarColaboradorRolPermisos1() {
  return (
    <nav className="flex items-center gap-0 px-7 pt-5 max-960:overflow-x-auto max-960:scrollbar-oculto max-768:px-4 max-768:pt-3.5 max-480:px-3 max-480:pt-2.5">
      {STEPPER_INVITAR.map((paso, i) => (
        <span key={paso} className="contents">
          <span className="flex flex-none items-center gap-2">
            <span
              className={
                'flex h-7 w-7 flex-none items-center justify-center rounded-full text-contador font-bold transition-all max-480:h-6 max-480:w-6 ' +
                (i === 0 ? 'bg-t-d1fae5 text-t-059669' : i === 1 ? 'bg-primario text-white' : '')
              }
            >
              {i + 1}
            </span>
            <span
              className={
                'whitespace-nowrap text-navegacion ' +
                (i === 1 ? 'font-semibold text-gris-oscuro-texto' : i === 0 ? 'font-medium text-gris-texto-secundario' : 'font-medium text-gris-categoria')
              }
            >
              {paso}
            </span>
          </span>
          {i < 3 && <span className={'mx-3 h-0.5 flex-1 max-480:mx-2 ' + (i === 0 ? 'bg-primario' : 'bg-gris-borde')} />}
        </span>
      ))}
    </nav>
  )
}
