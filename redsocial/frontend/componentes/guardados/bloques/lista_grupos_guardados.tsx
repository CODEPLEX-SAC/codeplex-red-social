import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { Selector } from '../../compartido/interfaz/selector'
import { limitarGrupos } from './logica_colecciones_guardados'
import { etiquetaExpandir, mensajeListaVacia } from './menus_guardados'
import { TarjetaGrupoGuardado } from './tarjeta_grupo_guardado'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { ListaGruposGuardadosProps } from '@/tipos/guardados/contrato_guardados'

const clases = catalogoGuardados.clases
const LIMITE = catalogoGuardados.limite_inicial

export function ListaGruposGuardados({ control, accionesDe }: ListaGruposGuardadosProps) {
  const { navegacion, movil, grupos, acciones, coleccionAbierta } = control
  const enCuadricula = navegacion.vista === 'cuadricula'
  const visibles = limitarGrupos(grupos, LIMITE, movil && !navegacion.expandido)
  const hayMas = movil && grupos.length > LIMITE

  return (
    <section className={clases.columna}>
      <div className={clases.lista_cabecera}>
        <h2 className={clases.lista_titulo}>{catalogoGuardados.secciones.grupos_guardados.replace(':n', String(grupos.length))}</h2>
        {hayMas && (
          <Boton type="button" variant="enlace" size="enlace_accion" className={clases.lista_ver_todos} aria-expanded={navegacion.expandido} onClick={navegacion.alternarExpandido}>
            {etiquetaExpandir(navegacion.expandido)}
          </Boton>
        )}
        <div className={clases.lista_controles}>
          <div className={clases.vista}>
            <BotonIcono icono="vista-lista" type="button" aria-label={catalogoGuardados.botones.vista_lista} aria-pressed={!enCuadricula} variant={enCuadricula ? 'sutil' : 'primario'} size="md" onClick={() => navegacion.cambiarVista('listas')} />
            <BotonIcono icono="cuadricula-oficial" type="button" aria-label={catalogoGuardados.botones.vista_cuadricula} aria-pressed={enCuadricula} variant={enCuadricula ? 'primario' : 'sutil'} size="md" onClick={() => navegacion.cambiarVista('cuadricula')} />
          </div>
          <Selector variant="mini" value={navegacion.orden} onChange={(evento) => navegacion.cambiarOrden(evento.target.value)} aria-label={catalogoGuardados.botones.mas_recientes}>
            <option value="mas_recientes">{catalogoGuardados.botones.mas_recientes}</option>
            <option value="mas_antiguas">{catalogoGuardados.botones.mas_antiguas}</option>
          </Selector>
        </div>
      </div>
      {grupos.length === 0 && <MensajeVacio texto={mensajeListaVacia(coleccionAbierta !== undefined)} className={clases.vacio} />}
      <div className={enCuadricula && !movil ? clases.lista_cuadricula : clases.lista}>
        {visibles.map((grupo) => (
          <TarjetaGrupoGuardado key={grupo.id} grupo={grupo} acciones={accionesDe(grupo)} alQuitar={() => acciones.abrir({ tipo: 'quitar', grupoId: grupo.id })} />
        ))}
      </div>
    </section>
  )
}
