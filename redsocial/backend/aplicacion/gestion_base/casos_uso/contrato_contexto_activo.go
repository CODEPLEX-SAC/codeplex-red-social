package casos_uso

type ContextoActivo interface {
	EmpresaID() string
	SucursalID() string
	PeriodoID() string
}
