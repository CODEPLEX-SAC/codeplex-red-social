import { useState } from 'react'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Menu } from '../../compartido/interfaz/menu'
import { Selector } from '../../compartido/interfaz/selector'
import type { EstadoPermisosInvitacion } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const clases = catalogoColaboradores.clases.invitar_permisos
const textos = catalogoColaboradores.campos_rol_permisos
const dialogos = catalogoColaboradores.dialogos_rol

export function SelectorRolModulo({ modulo, PERMISOS, alCrearRol, alAdministrar }: { modulo: string; PERMISOS: EstadoPermisosInvitacion; alCrearRol: () => void; alAdministrar: () => void }) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const roles = PERMISOS.roles[modulo] ?? []
  const seleccionado = PERMISOS.perfiles[modulo]
  const cargado = PERMISOS.cargados[modulo]

  return (
    <>
      <div className={clases.nivel}>
        <div className={clases.nivel_marca}>
          <h3 className={clases.nivel_titulo}>{textos.rol_titulo}</h3>
          <p className={clases.nivel_subtitulo}>{textos.rol_subtitulo}</p>
        </div>
        <div className={clases.nivel_controles}>
          <Selector variant="colaboradores" aria-label={`${textos.rol_modulo}: ${modulo}`} value={seleccionado} onChange={(evento) => PERMISOS.aplicarPerfil(modulo, String(evento.target.value))} className={clases.nivel_selector}>
            {roles.some((rol) => rol.clave === seleccionado) ? null : <option value={seleccionado}>{dialogos.sin_rol}</option>}
            {roles.map((rol) => <option key={rol.clave} value={rol.clave}>{rol.borrador ? dialogos.etiqueta_borrador.replace(':rol', rol.etiqueta) : rol.etiqueta}</option>)}
          </Selector>
          <Boton type="button" variant="contorno" size="md" className={clases.nivel_crear} onClick={alCrearRol}>
            <Icono name="mas" className={clases.permiso_glifo} /> {textos.crear_rol}
          </Boton>
          <BotonIcono icono="puntos-verticales" type="button" variant="contorno" size="control" aria-label={dialogos.menu_rol} aria-haspopup="menu" onClick={(evento) => setAncla(evento.currentTarget)} />
          <Menu
            ancla={ancla}
            alCerrar={() => setAncla(null)}
            elementos={[
              { icono: 'configuracion', etiqueta: dialogos.opciones_rol.administrar, alHacerClick: alAdministrar },
            ]}
          />
        </div>
      </div>
      {cargado && (
        <div role="status" className={clases.rol_cargado}>
          <Icono name="verificado" className={clases.rol_cargado_glifo} />
          <span>{cargado}</span>
        </div>
      )}
    </>
  )
}
