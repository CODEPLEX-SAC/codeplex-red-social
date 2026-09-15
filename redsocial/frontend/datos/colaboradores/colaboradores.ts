import type { Colaborador } from '@/tipos/colaboradores/pagina_colaboradores'

export const COLABORADORES: Colaborador[] = [
  {
    nombre: 'Carlos Mendoza',
    correo: 'carlos.mendoza@gmail.com',
    telefono: '+51 987 654 321',
    rol: 'Administrador',
    rolClase: 'administrador',
    descripcionRol: 'Acceso total',
    aplicaciones: [
      { icono: 'calendario', clase: 'bg-[#6c3ce0]' },
      { icono: 'mensaje', clase: 'bg-azul-categoria' },
      { icono: 'actividad', clase: 'bg-verde-categoria' },
    ],
    masApps: 5,
    estado: 'activo',
    vigencia: { tipo: 'rango', desde: '01/06/2026', hasta: '01/06/2027' },
    acciones: 'menu',
  },
  {
    nombre: 'María López',
    correo: 'maria.lopez@gmail.com',
    telefono: '+51 954 123 456',
    rol: 'Contador',
    rolClase: 'contador',
    descripcionRol: 'Contabilidad',
    aplicaciones: [
      { icono: 'estadisticas', clase: 'bg-[#06b6d4]' },
      { icono: 'marketplace', clase: 'bg-naranja-categoria' },
      { icono: 'reportes-barra', clase: 'bg-[#8b5cf6]' },
    ],
    masApps: 3,
    estado: 'activo',
    vigencia: { tipo: 'rango', desde: '15/05/2026', hasta: '15/05/2027' },
    acciones: 'menu',
  },
  {
    nombre: 'Jorge Ramírez',
    correo: 'jorge.ramirez@gmail.com',
    telefono: '+51 912 345 678',
    rol: 'Vendedor',
    rolClase: 'vendedor',
    descripcionRol: 'Ventas',
    aplicaciones: [
      { icono: 'mensaje', clase: 'bg-azul-categoria' },
      { icono: 'marketplace', clase: 'bg-naranja-categoria' },
      { icono: 'actividad', clase: 'bg-verde-categoria' },
    ],
    estado: 'activo',
    vigencia: { tipo: 'rango', desde: '10/04/2026', hasta: '10/04/2027' },
    acciones: 'menu',
  },
  {
    nombre: 'Ana Torres',
    correo: 'ana.torres@gmail.com',
    telefono: '+51 944 556 789',
    rol: 'Almacenero',
    rolClase: 'almacenero',
    descripcionRol: 'Inventario',
    aplicaciones: [
      { icono: 'calendario', clase: 'bg-[#6c3ce0]' },
      { icono: 'marketplace', clase: 'bg-naranja-categoria' },
      { icono: 'actividad', clase: 'bg-verde-categoria' },
    ],
    estado: 'invitado',
    vigencia: { tipo: 'simple', etiqueta: 'Invitación enviada', fecha: '20/05/2026' },
    acciones: 'reenviar',
  },
  {
    nombre: 'Luis Fernández',
    correo: 'luis.fernandez@gmail.com',
    telefono: '+51 933 221 144',
    rol: 'Analista',
    rolClase: 'analista',
    descripcionRol: 'Reportes',
    aplicaciones: [
      { icono: 'estadisticas', clase: 'bg-[#06b6d4]' },
      { icono: 'reportes-barra', clase: 'bg-[#8b5cf6]' },
    ],
    estado: 'inactivo',
    vigencia: { tipo: 'rango', desde: '01/03/2026', hasta: '01/03/2027' },
    acciones: 'menu',
  },
  {
    nombre: 'Rosa Jiménez',
    correo: 'rosa.jimenez@gmail.com',
    telefono: '+51 987 111 222',
    rol: 'Asistente',
    rolClase: 'asistente',
    descripcionRol: 'Soporte',
    aplicaciones: [
      { icono: 'estadisticas', clase: 'bg-[#06b6d4]' },
      { icono: 'marketplace', clase: 'bg-naranja-categoria' },
    ],
    estado: 'baja',
    vigencia: { tipo: 'simple', etiqueta: 'Dado de baja', fecha: '05/05/2026' },
    acciones: 'menu',
  },
]

export const FILTROS_ESTADO_COLABORADORES = [
  { etiqueta: 'Todos', total: 24, activa: true },
  { etiqueta: 'Activos', total: 18, activa: false },
  { etiqueta: 'Invitados', total: 3, activa: false },
  { etiqueta: 'Inactivos', total: 3, activa: false },
  { etiqueta: 'Baja', total: 2, activa: false },
] as const

export const PASOS_FUNCIONA_COLABORADORES = [
  { icono: 'correo', clase: 'bg-[#dbeafe] text-azul-categoria', numero: '1. Invitas', descripcion: 'Invita a una persona por correo electrónico o WhatsApp.' },
  { icono: 'nuevo-usuario', clase: 'bg-[#dcfce7] text-verde-categoria', numero: '2. Se registra', descripcion: 'Si no está en la red, se registra y acepta la invitación.' },
  { icono: 'escudo', clase: 'bg-[#e0e7ff] text-[#6366f1]', numero: '3. Asignas', descripcion: 'Asigna un rol / perfil y las aplicaciones que podrá usar.' },
  { icono: 'usuarios', clase: 'bg-[#f5f3ff] text-morado-categoria', numero: '4. Colabora', descripcion: 'Ya forma parte de tu equipo y puede usar los sistemas.' },
] as const

export const DETALLE_COLABORADOR_EJEMPLO = {
  nombre: 'Carlos Mendoza',
  rol: 'Administrador',
  correo: 'carlos.mendoza@gmail.com',
  telefono: '+51 987 654 321',
  estado: 'Activo',
  descripcionRol: 'Acceso total a los sistemas y configuración.',
  vigencia: '01/06/2026 al 01/06/2027',
  fechaInvitacion: '28/05/2026',
  ultimoAcceso: 'Hoy, 10:24 AM',
}

export const HISTORIAL_ACTIVIDAD_COLABORADOR_EJEMPLO = [
  { texto: 'Invitación aceptada', hora: '28/05/2026 09:15 AM' },
  { texto: 'Rol asignado: Administrador', hora: '28/05/2026 09:16 AM' },
  { texto: 'Acceso activado', hora: '28/05/2026 09:16 AM' },
] as const
