import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'

const clases = catalogoColaboradores.clases.listado

export function SeccionListado2({ alInvitar }: { alInvitar: () => void }) {
  return (
    <div className={clases.cabecera}>
      <div>
        <h1 className={clases.titulo_pagina}>{catalogoColaboradores.titulos.listado}</h1>
        <p className={clases.subtitulo_pagina}>
          {catalogoColaboradores.subtitulos.listado}
        </p>
      </div>
      <Boton type="button" variant="primario" size="md" onClick={alInvitar} className={clases.boton_invitar}>
        <Icono name="nuevo-usuario" className={clases.boton_invitar_glifo} />
        {catalogoColaboradores.botones.invitar_colaborador}
      </Boton>
    </div>
  )
}
