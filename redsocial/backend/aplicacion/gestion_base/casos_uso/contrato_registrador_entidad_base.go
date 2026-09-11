package casos_uso

type RegistradorEntidadBase interface {
	Registrar(ContextoActivo, map[string]any) error
}
