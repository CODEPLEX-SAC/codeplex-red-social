package gestion_base

func VerDetalleEntidadBase(entidadID string) map[string]string {
	return map[string]string{
		"operacion":  "ver_detalle_entidad_base",
		"entidad_id": entidadID,
	}
}
