package gestion_base

func ActualizarEntidadBase(entidadID string) map[string]string {
	return map[string]string{
		"operacion":  "actualizar_entidad_base",
		"entidad_id": entidadID,
	}
}
