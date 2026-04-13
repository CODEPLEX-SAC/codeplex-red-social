export function tieneIncompleto(secId, form) {
  switch (secId) {
    case "detalles": return !form.nombreVisible || !form.tituloProfesional;
    case "titulos": return (form.titulos?.filter((t) => !t.esFormacion)?.length ?? 0) === 0;
    case "documentos": return (form.documentos?.length ?? 0) === 0;
    default: return false;
  }
}

