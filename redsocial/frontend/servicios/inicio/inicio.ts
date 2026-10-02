import type { Historia, PublicacionInicio, PublicacionCompartidaInicio } from '@/tipos/inicio/modelo_inicio'
import datos from './inicio.json'

export const HISTORIAS = datos.historias as Historia[]
export const CONTACTOS_LINEA = datos.contactosLinea as { nombre: string; colaborador?: boolean }[]
export const PUBLICACION_INICIO = datos.publicacionInicio as PublicacionInicio
export const PUBLICACION_COMPARTIDA_INICIO = datos.publicacionCompartidaInicio as PublicacionCompartidaInicio
