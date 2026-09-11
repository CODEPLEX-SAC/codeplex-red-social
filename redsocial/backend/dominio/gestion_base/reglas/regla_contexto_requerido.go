package reglas

func ContextoRequerido(empresaID string, sucursalID string, periodoID string) bool {
	return empresaID != "" && sucursalID != "" && periodoID != ""
}
