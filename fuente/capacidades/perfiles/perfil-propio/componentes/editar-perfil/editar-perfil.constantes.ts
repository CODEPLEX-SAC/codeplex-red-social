import React from "react";

export const SECCIONES = [
  { id: "detalles", label: "Detalles", requerido: true },
  { id: "datos-personales", label: "Datos personales", requerido: false },
  { id: "empleo", label: "Empleo", requerido: false },
  { id: "experiencia", label: "Experiencia laboral", requerido: false },
  { id: "formacion", label: "Formación académica", requerido: false },
  { id: "titulos", label: "Títulos y certificaciones", requerido: true },
  { id: "habilidades", label: "Habilidades", requerido: false },
  { id: "contacto", label: "Contacto", requerido: false },
  { id: "documentos", label: "Documentos", requerido: true }
];

export const TAB_ALIAS = { info: "detalles", "datos-basicos": "detalles" };

export const ICONOS_SECCION = {
  detalles: <span>•</span>,
  "datos-personales": <span>•</span>,
  empleo: <span>•</span>,
  experiencia: <span>•</span>,
  formacion: <span>•</span>,
  titulos: <span>•</span>,
  habilidades: <span>•</span>,
  contacto: <span>•</span>,
  documentos: <span>•</span>
};

