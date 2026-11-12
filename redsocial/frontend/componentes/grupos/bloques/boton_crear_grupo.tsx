import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { ModalCrearGrupoComunidad } from './modal_crear_grupo_comunidad'
import { usarVentanaCrearGrupo } from './usar_ventana_crear_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { BotonCrearGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

export function BotonCrearGrupo({ imagen, puerto, variante = 'primario', anchoCompleto = false }: BotonCrearGrupoProps) {
  const ventana = usarVentanaCrearGrupo()

  return (
    <>
      <Boton type="button" variant={variante} size="md" className={anchoCompleto ? catalogoGrupos.clases.pagina_lateral.boton_ancho : undefined} onClick={ventana.abrir}>
        <Icono name="mas" className="h-4 w-4" /> {catalogoGrupos.botones.crear_grupo}
      </Boton>
      {ventana.abierta && <ModalCrearGrupoComunidad imagen={imagen} puerto={puerto} onCerrar={ventana.cerrar} />}
    </>
  )
}
