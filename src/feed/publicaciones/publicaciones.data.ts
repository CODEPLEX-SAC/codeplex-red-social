/**
 * DOMINIO: Feed > Publicaciones
 * Contexto Acotado: Datos mock del feed de publicaciones.
 *
 * Lenguaje Ubicuo:
 *  - Publicacion    : contenido compartido por un usuario en el feed
 *  - Comentario     : respuesta de un usuario a una publicación
 *  - Reaccion       : expresión emocional del usuario hacia una publicación
 */

export interface PublicacionMock {
  avatarImg: number;
  author: string;
  time: string;
  text: string;
  hashtags: string[];
  videoSrc?: string;
  videoPoster?: string;
  images?: string[];
  likeCount: number;
}

export interface ComentarioMock {
  img: number;
  name: string;
  text: string;
  time: string;
}

export interface Reaccion {
  icon: string;
  label: string;
  color: string;
}

export const MOCK_POST: PublicacionMock = {
  avatarImg: 12,
  author: "Gabriel Chumpitazi",
  time: "Hace 2 Horas",
  text: "🎉 ¡Nuevo tutorial sobre cómo declarar el IGV correctamente! Espero que les sirva.",
  hashtags: ["#Contabilidad", "#SUNAT"],
  videoSrc: "https://www.pexels.com/es-es/download/video/3692634/",
  videoPoster: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800",
  likeCount: 124,
};

export const MOCK_POST_IMAGENES: PublicacionMock = {
  avatarImg: 25,
  author: "María López",
  time: "Hace 3 horas",
  text: "¡Increíble evento de networking contable del mes! Grandes conexiones y aprendizajes 🤝✨",
  hashtags: ["#Networking", "#Contabilidad", "#Evento"],
  images: [
    "https://picsum.photos/seed/evt1/800/600",
    "https://picsum.photos/seed/evt2/800/600",
    "https://picsum.photos/seed/evt3/800/600",
    "https://picsum.photos/seed/evt4/800/600",
  ],
  likeCount: 4991,
};

export const MOCK_POST_UNA_IMAGEN: PublicacionMock = {
  avatarImg: 20,
  author: "Juan Pérez",
  time: "Hace 5 horas",
  text: "Nuevo reporte de cierre de mes listo 📊 ¡Todo en orden!",
  hashtags: ["#Reportes", "#Finanzas"],
  images: [
    "https://picsum.photos/seed/report1/1200/630",
  ],
  likeCount: 210,
};

export const MOCK_COMMENTS: ComentarioMock[] = [
  {
    img: 20,
    name: "María López",
    text: "Excelente tutorial! Muy claro y preciso 🙌",
    time: "Hace 1 hora",
  },
  {
    img: 25,
    name: "Juan Pérez",
    text: "Justo lo que necesitaba para mi declaración mensual 👏",
    time: "Hace 30 min",
  },
];

export const REACTIONS: Reaccion[] = [
  { icon: "like",       label: "Me gusta",  color: "#7F0DF2" },
  { icon: "me_encanta", label: "Me encanta", color: "#ef4444" },
  { icon: "asombro",    label: "Asombro",    color: "#f59e0b" },
];
