import type { DatosEditablesPerfil, EdicionPerfil, PerfilBase, PerfilUsuario } from '@/tipos/perfil/modelo_perfil'

const VACIO = String()

function datosBase(base: PerfilBase, separador: string): DatosEditablesPerfil {
  const [nombres = VACIO, ...apellidos] = base.nombre.split(String.fromCharCode(32))
  const [ciudad = VACIO, pais = VACIO] = base.ubicacion.split(separador)
  return {
    nombres,
    apellidos: apellidos.join(String.fromCharCode(32)),
    titular: base.titular,
    acerca: base.acerca,
    ciudad,
    pais,
    fechaNacimiento: VACIO,
    genero: VACIO,
    situacionSentimental: VACIO,
    habilidades: base.habilidades,
    detallesFijados: { ubicacion: true, trabajo: true, educacion: true },
    empleos: base.empresa ? [{ id: `${base.id}-empleo`, empresa: base.empresa, cargo: base.titular, inicio: VACIO, fin: VACIO, actual: true, ciudad: VACIO, descripcion: VACIO }] : [],
    formaciones: base.estudios ? [{ id: `${base.id}-formacion`, tipo: VACIO, institucion: base.estudios, carrera: VACIO, inicio: VACIO, fin: VACIO }] : [],
    documentos: [],
    redes: { correo: VACIO, linkedin: VACIO, web: VACIO },
    avatar: VACIO,
  }
}

export function completarPerfil(base: PerfilBase, separador: string, edicion?: EdicionPerfil): PerfilUsuario {
  const datos = { ...datosBase(base, separador), ...edicion }
  return {
    ...datos,
    id: base.id,
    desde: base.desde,
    amigos: base.amigos,
    publicaciones: base.publicaciones,
    nombre: [datos.nombres, datos.apellidos].filter(Boolean).join(' '),
    ubicacion: [datos.ciudad, datos.pais].filter(Boolean).join(separador),
    empresa: (datos.empleos.find((empleo) => empleo.actual) ?? datos.empleos[0])?.empresa ?? '',
    estudios: datos.formaciones[0]?.institucion ?? '',
  }
}
