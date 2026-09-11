package gestion_base

func RegistrarEntidadBase(solicitud SolicitudRegistrarEntidadBase) map[string]string {
	return map[string]string{
		"operacion": "registrar_entidad_base",
		"solicitud": solicitud.Nombre,
	}
}
