export const COLORES_TIPOGRAFICOS_HEREDADOS: Record<string, number> = {
}

export const COLORES_DE_SUPERFICIE_HEREDADOS: Record<string, number> = {
  '/catalogos/capacidades/redsocial/reportes.json': 3,
  '/componentes/dashboard/bloques/seccion_top_productos.tsx': 1,
  '/componentes/estadisticas/bloques/seccion_proyeccion_ventas.tsx': 1,
  '/servicios/amigos/estilos_listas.json': 1,
  '/servicios/marketplace/estilos_marketplace.json': 9,
}

export const EXCEPCIONES_TIPOGRAFICAS: { ruta: string; regla: string; clase: string; motivo: string }[] = [
  { ruta: '/componentes/colaboradores/bloques/bloque_vista_previa_correo.tsx', regla: 'interlineado', clase: 'leading-6', motivo: 'cifra centrada en una caja de alto fijo de 24 px' },
  { ruta: '/componentes/compartido/icono.tsx', regla: 'estilo-js', clase: 'fontSize', motivo: 'mecanismo de tamano de glifos, no es texto' },
  { ruta: '/componentes/compartido/fuente_iconos.ts', regla: 'estilo-js', clase: 'fontSize', motivo: 'mecanismo de tamano de glifos, no es texto' },
  { ruta: '/catalogos/capacidades/redsocial/compartido.json', regla: 'estilo-js', clase: 'fontSize', motivo: 'tema MUI: navegacion lateral apuntando al rol navegacion' },
  { ruta: '/catalogos/capacidades/redsocial/compartido.json', regla: 'estilo-js', clase: 'fontWeight', motivo: 'tema MUI: peso de las pestanas segun el rol' },
  { ruta: '/catalogos/capacidades/redsocial/compartido.json', regla: 'estilo-js', clase: 'fontFamily', motivo: 'tema MUI: herencia de la familia y tamano de navegacion' },
  { ruta: '/catalogos/capacidades/redsocial/compartido.json', regla: 'estilo-js', clase: 'lineHeight', motivo: 'sx de CodeplexEstadoBadge: devuelve el interlineado a las clases tipograficas de CodePlex' },
  { ruta: '/catalogos/capacidades/redsocial/empresas.json', regla: 'estilo-js', clase: 'fontSize', motivo: 'migas de pan: sx de la libreria apuntando al rol auxiliar' },
]
