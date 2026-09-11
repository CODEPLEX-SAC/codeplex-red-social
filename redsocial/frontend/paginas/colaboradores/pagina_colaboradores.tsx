import { useState } from 'react'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { Icono } from '../../componentes/compartido/icono'
import { Selector } from '../../componentes/compartido/interfaz/selector'
import type { IconName } from '../../tipos/compartido/icono'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import type { Colaborador } from '@/tipos/colaboradores/pagina_colaboradores'

const APP_CALENDARIO = 'bg-[#6c3ce0]'
const APP_MENSAJES = 'bg-azul-categoria'
const APP_ACTIVIDAD = 'bg-verde-categoria'
const APP_MARKETPLACE = 'bg-naranja-categoria'
const APP_ESTADISTICAS = 'bg-[#06b6d4]'
const APP_REPORTES = 'bg-[#8b5cf6]'

const ROL_CLASES: Record<string, string> = {
  administrador: 'bg-[#ede9fe] text-[#5b21b6]',
  contador: 'bg-[#dbeafe] text-[#1d4ed8]',
  vendedor: 'bg-[#fef3c7] text-[#92400e]',
  almacenero: 'bg-[#d1fae5] text-[#065f46]',
  analista: 'bg-[#e0e7ff] text-[#3730a3]',
  asistente: 'bg-[#fce7f3] text-[#9d174d]',
}

const ESTADO_CLASES: Record<Colaborador['estado'], { texto: string; punto: string; etiqueta: string }> = {
  activo: { texto: 'text-[#16a34a]', punto: 'bg-[#22c55e]', etiqueta: 'Activo' },
  invitado: { texto: 'text-[#d97706]', punto: 'bg-[#f59e0b]', etiqueta: 'Invitado' },
  inactivo: { texto: 'text-[#6b7280]', punto: 'bg-[#9ca3af]', etiqueta: 'Inactivo' },
  baja: { texto: 'text-[#dc2626]', punto: 'bg-[#ef4444]', etiqueta: 'Baja' },
}

const COLABORADORES: Colaborador[] = [
  {
    nombre: 'Carlos Mendoza',
    correo: 'carlos.mendoza@gmail.com',
    telefono: '+51 987 654 321',
    rol: 'Administrador',
    rolClase: 'administrador',
    descripcionRol: 'Acceso total',
    aplicaciones: [
      { icono: 'calendario', clase: APP_CALENDARIO },
      { icono: 'mensaje', clase: APP_MENSAJES },
      { icono: 'actividad', clase: APP_ACTIVIDAD },
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
      { icono: 'estadisticas', clase: APP_ESTADISTICAS },
      { icono: 'marketplace', clase: APP_MARKETPLACE },
      { icono: 'reportes-barra', clase: APP_REPORTES },
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
      { icono: 'mensaje', clase: APP_MENSAJES },
      { icono: 'marketplace', clase: APP_MARKETPLACE },
      { icono: 'actividad', clase: APP_ACTIVIDAD },
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
      { icono: 'calendario', clase: APP_CALENDARIO },
      { icono: 'marketplace', clase: APP_MARKETPLACE },
      { icono: 'actividad', clase: APP_ACTIVIDAD },
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
      { icono: 'estadisticas', clase: APP_ESTADISTICAS },
      { icono: 'reportes-barra', clase: APP_REPORTES },
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
      { icono: 'estadisticas', clase: APP_ESTADISTICAS },
      { icono: 'marketplace', clase: APP_MARKETPLACE },
    ],
    estado: 'baja',
    vigencia: { tipo: 'simple', etiqueta: 'Dado de baja', fecha: '05/05/2026' },
    acciones: 'menu',
  },
]

const PASOS_FUNCIONA: { icono: IconName; clase: string; numero: string; descripcion: string }[] = [
  { icono: 'correo', clase: 'bg-[#dbeafe] text-azul-categoria', numero: '1. Invitas', descripcion: 'Invita a una persona por correo electrónico o WhatsApp.' },
  { icono: 'nuevo-usuario', clase: 'bg-[#dcfce7] text-verde-categoria', numero: '2. Se registra', descripcion: 'Si no está en la red, se registra y acepta la invitación.' },
  { icono: 'escudo', clase: 'bg-[#e0e7ff] text-[#6366f1]', numero: '3. Asignas', descripcion: 'Asigna un rol / perfil y las aplicaciones que podrá usar.' },
  { icono: 'usuarios', clase: 'bg-[#f5f3ff] text-morado-categoria', numero: '4. Colabora', descripcion: 'Ya forma parte de tu equipo y puede usar los sistemas.' },
]

function ItemMenuAcciones({ children, peligro, onClick }: { children: string; peligro?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'block w-full rounded-md px-[10px] py-2 text-left text-xs hover:bg-[#f3f4f6] ' +
        (peligro ? 'text-[#dc2626] hover:bg-[#fef2f2]' : 'text-gris-texto')
      }
    >
      {children}
    </button>
  )
}

export function PaginaColaboradores() {
  const [menuAbierto, setMenuAbierto] = useState<number | null>(null)
  const [panelAbierto, setPanelAbierto] = useState(false)

  const cerrarMenus = () => setMenuAbierto(null)

  return (
    <EstructuraApp paginaActiva="colaboradores">
      <div
        onClick={cerrarMenus}
        className={
          'grid items-start gap-lg max-[1100px]:grid-cols-1 ' +
          (panelAbierto
            ? 'max-[1100px]:[grid-template-areas:"colaboradores"_"detalle"_"comofunciona"] ' +
              'min-[1101px]:grid-cols-[minmax(0,1fr)_360px_minmax(260px,300px)] ' +
              'min-[1101px]:[grid-template-areas:"colaboradores_detalle_publicidad"_"comofunciona_detalle_publicidad"]'
            : 'max-[1100px]:[grid-template-areas:"colaboradores"_"comofunciona"] ' +
              'min-[1101px]:grid-cols-[minmax(400px,1fr)_minmax(260px,300px)] ' +
              'min-[1101px]:[grid-template-areas:"colaboradores_publicidad"_"comofunciona_publicidad"]')
        }
      >
        <section className="flex flex-col [grid-area:colaboradores]">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3 max-[900px]:flex-col max-[900px]:items-stretch">
            <div>
              <h1 className="m-0 mb-1 text-2xl font-extrabold text-gris-oscuro-texto">Colaboradores</h1>
              <p className="m-0 max-w-[480px] text-sm leading-snug text-gris-texto-secundario">
                Gestiona a las personas que forman parte de tu equipo y acceden a los sistemas.
              </p>
            </div>
            <a
              href="30-10-colaboradores-popub-invitar-colaborador-01-informacion.html"
              className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-primario px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-[#4a35d4] max-[900px]:w-full"
            >
              <Icono name="nuevo-usuario" className="w-4 h-4" />
              Invitar colaborador
            </a>
          </div>

          <div className="mb-5 flex flex-wrap gap-0 max-[600px]:flex-nowrap max-[600px]:overflow-x-auto max-[600px]:[-ms-overflow-style:none] max-[600px]:[scrollbar-width:none] max-[600px]:[&::-webkit-scrollbar]:hidden border-b-2 border-gris-borde">
            {[
              { etiqueta: 'Todos', total: 24, activa: true },
              { etiqueta: 'Activos', total: 18, activa: false },
              { etiqueta: 'Invitados', total: 3, activa: false },
              { etiqueta: 'Inactivos', total: 3, activa: false },
              { etiqueta: 'Baja', total: 2, activa: false },
            ].map((p) => (
              <a
                key={p.etiqueta}
                href="#"
                className={
                  'mb-[-2px] inline-flex flex-none items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm ' +
                  (p.activa
                    ? 'border-primario font-semibold text-primario'
                    : 'border-transparent font-medium text-gris-texto-secundario hover:text-gris-oscuro-texto')
                }
              >
                {p.etiqueta}
                <span
                  className={
                    'inline-flex h-5 min-w-[20px] items-center justify-center rounded-[10px] px-1.5 text-[0.7rem] font-bold ' +
                    (p.activa ? 'bg-primario-suave text-primario' : 'bg-[#f3f4f6] text-gris-texto-secundario')
                  }
                >
                  {p.total}
                </span>
              </a>
            ))}
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-3 max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:gap-2">
            <div className="relative min-w-[240px] flex-1 max-[900px]:min-w-full">
              <Icono name="buscar" className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="search"
                placeholder="Buscar colaborador por nombre, correo o teléfono..."
                className="w-full rounded-lg border border-[#d1d5db] py-2.5 pl-[38px] pr-3.5 text-sm text-gris-oscuro-texto outline-none focus:border-primario"
              />
            </div>
            <div className="flex flex-none gap-2 max-[900px]:w-full max-[900px]:justify-end">
              <button type="button" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#d1d5db] bg-white px-4 py-[9px] text-[0.8rem] font-medium text-gris-texto hover:bg-[#f9fafb]">
                <Icono name="filtro" className="w-[14px] h-[14px]" /> Filtros
              </button>
              <button type="button" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#d1d5db] bg-white px-4 py-[9px] text-[0.8rem] font-medium text-gris-texto hover:bg-[#f9fafb]">
                <Icono name="adjuntar" className="w-[14px] h-[14px]" /> Exportar
              </button>
            </div>
          </div>

          <div className="mb-5 grid grid-cols-4 gap-3 max-[768px]:grid-cols-1">
            <Selector variant="colaboradores" label="Estado">
              <option>Todos</option>
              <option>Activo</option>
              <option>Invitado</option>
              <option>Inactivo</option>
              <option>Baja</option>
            </Selector>
            <Selector variant="colaboradores" label="Rol / Perfil">
              <option>Todos</option>
              <option>Administrador</option>
              <option>Contador</option>
              <option>Vendedor</option>
              <option>Almacenero</option>
              <option>Analista</option>
              <option>Asistente</option>
            </Selector>
            <Selector variant="colaboradores" label="Aplicaciones">
              <option>Todas</option>
              <option>Calendario</option>
              <option>Mensajes</option>
              <option>Actividad</option>
              <option>Marketplace</option>
            </Selector>
            <Selector variant="colaboradores" label="Ordenar por">
              <option>Más recientes</option>
              <option>Más antiguos</option>
              <option>Nombre A-Z</option>
              <option>Nombre Z-A</option>
            </Selector>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gris-borde bg-white">
            <table className="w-full border-collapse text-[0.85rem]">
              <thead className="bg-[#f9fafb]">
                <tr>
                  <th className="w-10 whitespace-nowrap border-b border-gris-borde p-3.5 text-center text-[0.8rem] font-semibold uppercase text-gris-texto-secundario">
                    <input type="checkbox" className="h-4 w-4 accent-primario" />
                  </th>
                  <th className="whitespace-nowrap border-b border-gris-borde p-3.5 text-left text-[0.8rem] font-semibold uppercase text-gris-texto-secundario">Colaborador</th>
                  <th className="whitespace-nowrap border-b border-gris-borde p-3.5 text-left text-[0.8rem] font-semibold uppercase text-gris-texto-secundario">Rol / Perfil</th>
                  <th className="whitespace-nowrap border-b border-gris-borde p-3.5 text-left text-[0.8rem] font-semibold uppercase text-gris-texto-secundario">Aplicaciones</th>
                  <th className="whitespace-nowrap border-b border-gris-borde p-3.5 text-left text-[0.8rem] font-semibold uppercase text-gris-texto-secundario">Estado</th>
                  <th className="whitespace-nowrap border-b border-gris-borde p-3.5 text-left text-[0.8rem] font-semibold uppercase text-gris-texto-secundario">Vigencia</th>
                  <th className="whitespace-nowrap border-b border-gris-borde p-3.5 text-left text-[0.8rem] font-semibold uppercase text-gris-texto-secundario">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {COLABORADORES.map((c, i) => {
                  const estado = ESTADO_CLASES[c.estado]
                  return (
                    <tr key={c.nombre} className="border-b border-[#f3f4f6] last:border-b-0 hover:bg-[#fafafe]">
                      <td className="p-3.5 text-center align-middle">
                        <input type="checkbox" className="h-4 w-4 accent-primario" />
                      </td>
                      <td className="p-3.5 align-middle">
                        <div className="flex min-w-[200px] items-center gap-3">
                          <img src={usuarioImg} alt={c.nombre} className="h-10 w-10 flex-none rounded-full bg-gris-borde object-cover" />
                          <div className="flex min-w-0 flex-col">
                            <span className="truncate text-sm font-semibold text-gris-oscuro-texto">{c.nombre}</span>
                            <span className="truncate text-[0.78rem] text-gris-texto-terciario">{c.correo}</span>
                            <span className="text-[0.78rem] text-gris-texto-terciario">{c.telefono}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 align-middle">
                        <div className="flex flex-col gap-0.5">
                          <span className={`inline-block whitespace-nowrap rounded-md px-2.5 py-[3px] text-xs font-semibold ${ROL_CLASES[c.rolClase]}`}>
                            {c.rol}
                          </span>
                          <span className="text-[0.78rem] text-gris-texto-terciario">{c.descripcionRol}</span>
                        </div>
                      </td>
                      <td className="p-3.5 align-middle">
                        <div className="flex items-center gap-1">
                          {c.aplicaciones.map((app, j) => (
                            <span key={j} className={`flex h-7 w-7 flex-none items-center justify-center rounded-md ${app.clase}`}>
                              <Icono name={app.icono} className="w-[14px] h-[14px] text-white" />
                            </span>
                          ))}
                          {c.masApps && <span className="ml-0.5 text-[0.78rem] font-semibold text-primario">+{c.masApps}</span>}
                        </div>
                      </td>
                      <td className="p-3.5 align-middle">
                        <span className={`inline-flex items-center gap-[5px] whitespace-nowrap text-[0.8rem] font-medium ${estado.texto}`}>
                          <span className={`h-[7px] w-[7px] flex-none rounded-full ${estado.punto}`} />
                          {estado.etiqueta}
                        </span>
                      </td>
                      <td className="p-3.5 align-middle">
                        <div className="whitespace-nowrap text-[0.8rem] leading-snug text-gris-texto-secundario">
                          {c.vigencia.tipo === 'rango' ? (
                            <span className="block text-[0.78rem]">
                              {c.vigencia.desde}
                              <br />
                              al {c.vigencia.hasta}
                            </span>
                          ) : (
                            <>
                              <span className="block text-[0.78rem] text-gris-texto-terciario">{c.vigencia.etiqueta}</span>
                              <span className="block text-[0.78rem]">{c.vigencia.fecha}</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 text-center align-middle">
                        {c.acciones === 'reenviar' ? (
                          <button type="button" className="rounded-md border border-[#d1d5db] bg-white px-3.5 py-1.5 text-[0.78rem] font-medium text-gris-texto hover:bg-[#f9fafb]">
                            Reenviar
                          </button>
                        ) : (
                          <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              title="Más opciones"
                              onClick={() => setMenuAbierto(menuAbierto === i ? null : i)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[1.1rem] text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#374151]"
                            >
                              •••
                            </button>
                            {menuAbierto === i && (
                              <div className="absolute right-0 top-[calc(100%+4px)] z-10 grid min-w-[170px] gap-0.5 rounded-lg border border-gris-borde bg-white p-1.5 text-left shadow-[0_8px_24px_rgba(15,15,35,0.12)]">
                                <ItemMenuAcciones onClick={() => { setPanelAbierto(true); setMenuAbierto(null) }}>Ver colaborador</ItemMenuAcciones>
                                <ItemMenuAcciones>Editar colaborador</ItemMenuAcciones>
                                <ItemMenuAcciones>Cambiar rol / perfil</ItemMenuAcciones>
                                <ItemMenuAcciones peligro>Dar de baja</ItemMenuAcciones>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 py-4">
            <span className="text-[0.82rem] text-gris-texto-secundario">Mostrando 1 a 6 de 24 colaboradores</span>
            <div className="flex items-center gap-1">
              <button type="button" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d1d5db] bg-white text-base text-[#9ca3af] hover:bg-[#f3f4f6] hover:border-[#9ca3af]">‹</button>
              <button type="button" className="flex h-9 w-9 items-center justify-center rounded-lg border border-primario bg-primario text-[0.85rem] font-medium text-white">1</button>
              {[2, 3, 4].map((n) => (
                <button key={n} type="button" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d1d5db] bg-white text-[0.85rem] font-medium text-gris-texto hover:bg-[#f3f4f6] hover:border-[#9ca3af]">
                  {n}
                </button>
              ))}
              <button type="button" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d1d5db] bg-white text-base text-[#9ca3af] hover:bg-[#f3f4f6] hover:border-[#9ca3af]">›</button>
            </div>
          </div>
        </section>

      {panelAbierto && (
        <aside className="sticky top-22 max-[1100px]:static w-full rounded-xl border border-gris-borde bg-white p-5 [grid-area:detalle]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="m-0 text-base font-bold text-gris-oscuro-texto">Detalle del colaborador</h2>
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setPanelAbierto(false)}
              className="grid h-7 w-7 place-items-center rounded-md text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#374151]"
            >
              <Icono name="cerrar" className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-4 flex flex-col gap-2.5 border-b border-[#f3f4f6] pb-4">
            <div className="flex items-start gap-3">
              <span className="h-14 w-14 flex-none rounded-full bg-gris-borde" />
              <div className="flex min-w-0 flex-col gap-0.5">
                <h3 className="m-0 text-base font-bold text-gris-oscuro-texto">Carlos Mendoza</h3>
                <a href="#" className="text-[0.85rem] font-semibold text-primario no-underline">Administrador</a>
                <span className="text-[0.8rem] text-gris-texto-secundario">carlos.mendoza@gmail.com</span>
                <span className="text-[0.8rem] text-gris-texto-secundario">+51 987 654 321</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-[5px] text-[0.8rem] font-medium text-[#16a34a]">
              <span className="h-[7px] w-[7px] rounded-full bg-[#22c55e]" /> Activo
            </span>
          </div>

          <section className="mb-4">
            <div className="mb-2.5 flex items-center justify-between">
              <h4 className="m-0 text-[0.85rem] font-bold text-gris-oscuro-texto">Información general</h4>
              <a href="#" className="text-[0.78rem] font-semibold text-primario no-underline">Editar</a>
            </div>
            <ul className="m-0 grid list-none gap-3 p-0">
              {[
                { icono: 'calendario' as IconName, etiqueta: 'Vigencia', valor: '01/06/2026 al 01/06/2027' },
                { icono: 'enviar' as IconName, etiqueta: 'Fecha de invitación', valor: '28/05/2026' },
                { icono: 'reloj' as IconName, etiqueta: 'Último acceso', valor: 'Hoy, 10:24 AM' },
              ].map((item) => (
                <li key={item.etiqueta} className="flex items-start gap-2.5">
                  <Icono name={item.icono} className="mt-0.5 w-4 h-4 flex-none text-[#9ca3af]" />
                  <div>
                    <span className="block text-xs text-gris-texto-secundario">{item.etiqueta}</span>
                    <strong className="mt-px block text-[0.82rem] font-semibold text-gris-oscuro-texto">{item.valor}</strong>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-4">
            <div className="mb-2.5 flex items-center justify-between">
              <h4 className="m-0 text-[0.85rem] font-bold text-gris-oscuro-texto">Rol y permisos</h4>
              <a href="#" className="text-[0.78rem] font-semibold text-primario no-underline">Editar</a>
            </div>
            <ul className="m-0 grid list-none gap-3 p-0">
              <li className="flex items-start gap-2.5">
                <Icono name="colaborador" className="mt-0.5 w-4 h-4 flex-none text-[#9ca3af]" />
                <div>
                  <span className="block text-xs text-gris-texto-secundario">Rol / Perfil</span>
                  <strong className="mt-px block text-[0.82rem] font-semibold text-gris-oscuro-texto">Administrador</strong>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Icono name="archivo-hoja" className="mt-0.5 w-4 h-4 flex-none text-[#9ca3af]" />
                <div>
                  <span className="block text-xs text-gris-texto-secundario">Descripción</span>
                  <strong className="mt-px block text-[0.82rem] font-semibold text-gris-oscuro-texto">Acceso total a los sistemas y configuración.</strong>
                </div>
              </li>
            </ul>
          </section>

          <section className="mb-4">
            <div className="mb-2.5 flex items-center justify-between">
              <h4 className="m-0 text-[0.85rem] font-bold text-gris-oscuro-texto">Aplicaciones asignadas (7)</h4>
              <a href="#" className="text-[0.78rem] font-semibold text-primario no-underline">Editar</a>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`flex h-7 w-7 items-center justify-center rounded-md ${APP_CALENDARIO}`}><Icono name="calendario" className="w-[14px] h-[14px] text-white" /></span>
              <span className={`flex h-7 w-7 items-center justify-center rounded-md ${APP_MENSAJES}`}><Icono name="mensaje" className="w-[14px] h-[14px] text-white" /></span>
              <span className={`flex h-7 w-7 items-center justify-center rounded-md ${APP_MARKETPLACE}`}><Icono name="marketplace" className="w-[14px] h-[14px] text-white" /></span>
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#8b5cf6]"><Icono name="reportes-barra" className="w-[14px] h-[14px] text-white" /></span>
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#ec4899]"><Icono name="video" className="w-[14px] h-[14px] text-white" /></span>
              <span className={`flex h-7 w-7 items-center justify-center rounded-md ${APP_ESTADISTICAS}`}><Icono name="estadisticas" className="w-[14px] h-[14px] text-white" /></span>
              <span className="text-[0.78rem] font-semibold text-primario">+1</span>
            </div>
          </section>

          <section className="mb-4">
            <h4 className="m-0 mb-2.5 text-[0.85rem] font-bold text-gris-oscuro-texto">Acciones rápidas</h4>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="rounded-lg border border-[#d1d5db] bg-white px-2.5 py-[9px] text-[0.78rem] font-semibold text-gris-texto hover:bg-[#f9fafb]">Editar colaborador</button>
              <button type="button" className="rounded-lg border border-[#d1d5db] bg-white px-2.5 py-[9px] text-[0.78rem] font-semibold text-gris-texto hover:bg-[#f9fafb]">Cambiar rol / perfil</button>
              <button type="button" className="rounded-lg border border-[#fecaca] bg-white px-2.5 py-[9px] text-[0.78rem] font-semibold text-[#dc2626] hover:bg-[#fef2f2]">Dar de baja</button>
              <button type="button" className="rounded-lg border border-[#d1d5db] bg-white px-2.5 py-[9px] text-[0.78rem] font-semibold text-gris-texto hover:bg-[#f9fafb]">Desactivar acceso</button>
            </div>
          </section>

          <section>
            <div className="mb-2.5 flex items-center justify-between">
              <h4 className="m-0 text-[0.85rem] font-bold text-gris-oscuro-texto">Historial de actividad</h4>
              <a href="#" className="text-[0.78rem] font-semibold text-primario no-underline">Ver todo</a>
            </div>
            <ul className="m-0 grid list-none gap-3 p-0">
              {[
                { texto: 'Invitación aceptada', hora: '28/05/2026 09:15 AM' },
                { texto: 'Rol asignado: Administrador', hora: '28/05/2026 09:16 AM' },
                { texto: 'Acceso activado', hora: '28/05/2026 09:16 AM' },
              ].map((item) => (
                <li key={item.texto} className="relative pl-4 text-[0.8rem] before:absolute before:left-0 before:top-[5px] before:h-[7px] before:w-[7px] before:rounded-full before:bg-[#22c55e] before:content-['']">
                  <span className="block font-semibold text-gris-oscuro-texto">{item.texto}</span>
                  <time className="mt-px block text-xs text-gris-texto-terciario">{item.hora}</time>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      )}

        <div className="hidden min-[1101px]:block [grid-area:publicidad]">
          <ColumnaPublicidad />
        </div>

        <div className="rounded-xl border border-gris-borde bg-white p-6 [grid-area:comofunciona]">
          <h2 className="m-0 mb-5 text-[1.15rem] font-bold text-gris-oscuro-texto">¿Cómo funciona?</h2>
          <div className="grid grid-cols-4 gap-5 max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
            {PASOS_FUNCIONA.map((paso, i) => (
              <article
                key={paso.numero}
                className={
                  'flex flex-col gap-2.5 ' +
                  (i < PASOS_FUNCIONA.length - 1 ? 'border-r border-[#eee] pr-5 max-[1100px]:border-r-0 max-[1100px]:pr-0 max-[768px]:border-r-0' : '')
                }
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${paso.clase}`}>
                  <Icono name={paso.icono} className="w-[22px] h-[22px]" />
                </div>
                <span className="text-sm font-bold text-gris-oscuro-texto">{paso.numero}</span>
                <p className="text-[0.82rem] leading-relaxed text-gris-texto-secundario">{paso.descripcion}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </EstructuraApp>
  )
}
