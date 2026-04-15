/** Entidad de dominio: perfil personal del usuario SaaS */
export interface PerfilPersonal {
  nombre:          string;
  apellido:        string;
  email:           string;
  telefono:        string;
  dni:             string;
  fechaNacimiento: string;
  genero:          string;
  pais:            string;
  ciudad:          string;
  empresa:         string;
  cargo:           string;
  rubro:           string;
  bio:             string;
  avatar:          string;
}

export interface NotificacionItem {
  id:    string;
  label: string;
}
