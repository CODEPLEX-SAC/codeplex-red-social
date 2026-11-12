import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { Interruptor } from '../../compartido/interfaz/interruptor'
import { dispositivosPorTipo, idSeleccionado } from './logica_preparacion_llamada'
import { SelectorDispositivo } from './selector_dispositivo'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { ConfiguracionLlamada, EstadoAcceso, TipoDispositivo } from '@/tipos/mensajeria/contrato_integracion_llamada'
import type { usarPreparacionLlamada } from './usar_preparacion_llamada'

const textos = catalogoMensajeria.videollamada.textos
const clases = catalogoMensajeria.videollamada.clases.dispositivos
const TIPOS = textos.dispositivos.tipos as { tipo: TipoDispositivo; icono: IconName }[]

export function SeccionDispositivos({ preparacion }: { preparacion: ReturnType<typeof usarPreparacionLlamada> }) {
  const { inventario, seleccion, resultados, probando } = preparacion
  const avisoAcceso = textos.dispositivos.avisos_acceso[inventario.acceso as EstadoAcceso]
  const avisos = [avisoAcceso, preparacion.salidaNoSoportada ? textos.dispositivos.salida_no_soportada : String(), textos.preparacion.microfono_nota].filter(Boolean)

  return (
    <div className={clases.rejilla}>
      <section className={clases.tarjeta}>
        <h2 className={clases.titulo}>{catalogoMensajeria.secciones.dispositivos}</h2>
        {TIPOS.map(({ tipo, icono }) => (
          <SelectorDispositivo key={tipo} tipo={tipo} icono={icono} dispositivos={dispositivosPorTipo(inventario, tipo)} valor={idSeleccionado(seleccion, inventario, tipo)} onElegir={(t, id) => void preparacion.elegir(t, id)} />
        ))}
        {avisos.map((aviso) => (
          <p key={aviso} aria-live="polite" className={clases.ayuda}>
            {aviso}
          </p>
        ))}
        <div className={clases.acciones}>
          <Boton type="button" variant="secundario" size="mini" disabled={probando} onClick={() => void preparacion.probar()}>
            <Icono name="actualizar" className="h-3.5 w-3.5" /> {probando ? textos.dispositivos.probando : textos.dispositivos.probar}
          </Boton>
          <Boton type="button" variant="enlace" size="enlace_accion" onClick={() => void preparacion.actualizar()}>
            {textos.dispositivos.actualizar}
          </Boton>
        </div>
        <ul aria-label={textos.dispositivos.resultados} className={clases.resultados}>
          {TIPOS.map(({ tipo }) => (
            <li key={tipo}>
              <span className={clases.resultado_nombre}>{textos.dispositivos[tipo]}:</span> {textos.dispositivos.estado[resultados[tipo]]}
            </li>
          ))}
        </ul>
      </section>

      <section className={clases.tarjeta}>
        <h2 className={clases.titulo}>{catalogoMensajeria.secciones.configuracion_llamada}</h2>
        {textos.configuracion.elementos.map((elemento) => (
          <div key={elemento.clave} className={clases.fila}>
            <Icono name={elemento.icono as IconName} className={clases.icono} />
            <div className={clases.cuerpo}>
              <strong className={clases.nombre}>{elemento.titulo}</strong>
              <span className={clases.detalle}>{elemento.detalle}</span>
            </div>
            <Interruptor seleccionado={preparacion.configuracion[elemento.clave as keyof ConfiguracionLlamada]} alCambiar={(_, valor) => preparacion.cambiarConfiguracion(elemento.clave as keyof ConfiguracionLlamada, valor)} inputProps={{ 'aria-label': elemento.titulo }} />
          </div>
        ))}
        <p className={clases.ayuda}>{textos.configuracion.nota}</p>
      </section>
    </div>
  )
}
