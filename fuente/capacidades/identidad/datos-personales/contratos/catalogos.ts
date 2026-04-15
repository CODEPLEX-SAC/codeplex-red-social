import type { NotificacionItem } from "@/capacidades/identidad/datos-personales/contratos/PerfilPersonal";

export const PAISES: string[] = [
  "Perú", "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Ecuador",
  "México", "Paraguay", "Uruguay", "Venezuela", "España", "Estados Unidos", "Otro",
];

export const CIUDADES_POR_PAIS: Record<string, string[]> = {
  "Perú":           ["Lima", "Arequipa", "Trujillo", "Cusco", "Piura", "Chiclayo", "Iquitos", "Huancayo", "Pucallpa", "Tacna", "Otra"],
  "Argentina":      ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "Otra"],
  "Colombia":       ["Bogotá", "Medellín", "Cali", "Cartagena", "Otra"],
  "México":         ["Ciudad de México", "Guadalajara", "Monterrey", "Cancún", "Otra"],
  "Chile":          ["Santiago", "Valparaíso", "Concepción", "Antofagasta", "Otra"],
  "Bolivia":        ["La Paz", "Santa Cruz", "Cochabamba", "Sucre", "Otra"],
  "Ecuador":        ["Quito", "Guayaquil", "Cuenca", "Otra"],
  "España":         ["Madrid", "Barcelona", "Valencia", "Sevilla", "Otra"],
  "Estados Unidos": ["Nueva York", "Los Ángeles", "Miami", "Houston", "Otra"],
};

export const CIUDADES_DEFAULT: string[] = ["Mi ciudad", "Otra"];

export const CARGOS: string[] = [
  "Gerente General", "Gerente Financiero", "Gerente Comercial", "Director", "Sub-Director",
  "Jefe de Área", "Coordinador", "Supervisor", "Analista", "Asistente",
  "Contador", "Contador Senior", "Auditor", "Administrador", "Consultor",
  "Emprendedor", "Propietario", "Freelancer", "Estudiante", "Otro",
];

export const GENEROS: string[] = ["Prefiero no decirlo", "Masculino", "Femenino", "Otro"];

export const MESES: string[] = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export const TABS_PERFIL: string[] = [
  "Editar Perfil",
  "Cambiar Contraseña",
  "Notificaciones",
];

export const NOTIFICACIONES_ITEMS: NotificacionItem[] = [
  { id: "notif_empresa",   label: "Noticias de la empresa" },
  { id: "notif_push",      label: "Notificación push" },
  { id: "notif_cartas",    label: "Cartas de noticias semanales" },
  { id: "notif_reuniones", label: "Reuniones cerca de ti" },
  { id: "notif_pedidos",   label: "Notificaciones de pedidos" },
];
