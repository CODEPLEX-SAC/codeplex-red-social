import catalogoGestionBase from '../../catalogos/capacidades/redsocial/gestion_base.json';

export async function listarEntidadesBase() {
  return fetch(catalogoGestionBase.rutas.listado);
}
