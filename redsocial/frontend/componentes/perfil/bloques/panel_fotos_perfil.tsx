import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { VisorMedios } from '../../compartido/interfaz/visor_medios'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { PanelFotosPerfilProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.red_social

const clases = catalogoPerfil.clases.red_social

export function PanelFotosPerfil({ fotos, nombre }: PanelFotosPerfilProps) {
  const [todas, setTodas] = useState(false)
  const [abierta, setAbierta] = useState<number | null>(null)
  const visibles = todas ? fotos : fotos.slice(0, textos.fotos_maximo)
  const alternarTodas = () => setTodas((actual) => !actual)
  const cerrarVisor = () => setAbierta(null)

  return (
    <section className={clases.tarjeta}>
      <div className={clases.cabecera_panel}>
        <h2 className={clases.titulo}>{textos.fotos}</h2>
        {fotos.length > textos.fotos_maximo && (
          <Boton type="button" variant="enlace" size="enlace_accion" aria-pressed={todas} onClick={alternarTodas}>
            {todas ? textos.ver_menos_fotos : textos.ver_todas_fotos}
          </Boton>
        )}
      </div>
      {fotos.length === 0 && <MensajeVacio texto={textos.sin_fotos} />}
      <ul className={clases.fotos}>
        {visibles.map((foto, indice) => (
          <li key={foto.id}>
            <Boton type="button" variant="fantasma" size="enlace" aria-label={textos.texto_foto.replace(':numero', String(indice + 1)).replace(':nombre', nombre)} onClick={() => setAbierta(indice)} className="block w-full p-0">
              <img src={foto.url} alt="" className={clases.foto} />
            </Boton>
          </li>
        ))}
      </ul>
      {abierta !== null && <VisorMedios items={fotos} indice={abierta} titulo={catalogoPerfil.foto.visor_titulo.replace(':nombre', nombre)} onCambiar={setAbierta} onCerrar={cerrarVisor} />}
    </section>
  )
}
