import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integraciones/persistencia/supabase-red-social";
import { useSesion } from "@/capacidades/identidad/sesion/ContextoSesion";
import {
  MOCK_POST, MOCK_POST_IMAGENES, MOCK_POST_UNA_IMAGEN, MOCK_COMMENTS,
  PublicacionMock, TipoPublicacion, Prioridad, EstadoPregunta, Feedback,
} from "@/capacidades/publicaciones/contratos/publicaciones.contratos";
import type { Medio } from "@/capacidades/publicaciones/contratos/publicaciones.contratos";

/**
 * DOMINIO: Feed > Publicaciones
 * Hook que gestiona publicaciones con Supabase como fuente de verdad.
 * Posts propios → persisten en BD.
 * Posts de muestra → solo locales (comunidad demo).
 */

export interface ComentarioUtil {
  id:    number;
  autor: string;
  texto: string;
}

export interface Comentario {
  id:           number;
  img:          number;
  name:         string;
  text:         string;
  time:         string;
  avatarUrl?:   string;
  esPropio?:    boolean;
  mentionedUser?: string;
  images?:      Medio[];
  replies:      Comentario[];
  reaction:     { label: string; color: string; icon: string } | null;
  reactionCount: number;
}

interface Publicacion extends PublicacionMock {
  id:             string;
  tipo:           TipoPublicacion;
  prioridad:      Prioridad;
  estado:         EstadoPregunta;
  feedback:       Feedback;
  esPropia:       boolean;
  comentarioUtil: ComentarioUtil | null;
  comentarios:    Comentario[];
}

const AVATARES_ALEATORIOS: number[] = [12, 15, 18, 20, 22, 25, 30, 33, 35, 40];

function crearIdUnico(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

let _nextCommentId = 100;
function genCommentId(): number { return _nextCommentId++; }

function comentariosMockIniciales(): Comentario[] {
  return MOCK_COMMENTS.map((c) => ({
    ...c, id: genCommentId(), replies: [], reaction: null, reactionCount: 0,
  }));
}

function updateCommentById(comments: Comentario[], id: number, updater: (c: Comentario) => Comentario): Comentario[] {
  return comments.map((c) => {
    if (c.id === id) return updater(c);
    if (c.replies.length > 0) return { ...c, replies: updateCommentById(c.replies, id, updater) };
    return c;
  });
}

function removeCommentById(comments: Comentario[], id: number): Comentario[] {
  return comments
    .filter((c) => c.id !== id)
    .map((c) => ({ ...c, replies: removeCommentById(c.replies, id) }));
}

function obtenerTiempoRelativo(): string {
  return "Justo ahora";
}

function extraerHashtags(texto: string): string[] {
  return texto.match(/#\w+/g) ?? [];
}

/* Posts de comunidad (mock) — siempre visibles en el feed como demo */
const POSTS_MOCK: Publicacion[] = [
  { id: "mock-1", ...MOCK_POST,            tipo: "post", prioridad: "normal",  estado: "sin-resolver", feedback: null, esPropia: false, comentarioUtil: null, comentarios: comentariosMockIniciales() },
  { id: "mock-2", ...MOCK_POST_IMAGENES,   tipo: "post", prioridad: "urgente", estado: "sin-resolver", feedback: null, esPropia: false, comentarioUtil: null, comentarios: comentariosMockIniciales() },
  { id: "mock-3", ...MOCK_POST_UNA_IMAGEN, tipo: "post", prioridad: "normal",  estado: "sin-resolver", feedback: null, esPropia: false, comentarioUtil: null, comentarios: comentariosMockIniciales() },
];

/* Convierte fila de Supabase → Publicacion local */
function desdeSupabase(row: any, miId: string): Publicacion {
  const perfil = row.perfiles ?? {};

  /* Medios: intenta leer columna 'medios' (jsonb con {url,tipo}[]),
     si no existe, construye desde la columna legacy 'imagenes' (string[]) */
  let medios: Medio[] = [];
  if (Array.isArray(row.medios) && row.medios.length > 0) {
    medios = row.medios as Medio[];
  } else if (Array.isArray(row.imagenes) && row.imagenes.length > 0) {
    medios = (row.imagenes as string[]).map((url) => ({ url, tipo: "imagen" as const }));
  }

  return {
    id:             String(row.id),
    avatarImg:      perfil.avatar_url  || null,
    author:         perfil.nombre_visible || "Usuario",
    time:           row.created_at
                      ? new Date(row.created_at).toLocaleDateString("es-PE", { day: "numeric", month: "short", year: "numeric" })
                      : "Hace un momento",
    text:           row.texto ?? "",
    hashtags:       extraerHashtags(row.texto ?? ""),
    likeCount:      0,
    tipo:           (row.tipo as TipoPublicacion) ?? "post",
    prioridad:      (row.prioridad as Prioridad) ?? "normal",
    estado:         (row.estado as EstadoPregunta) ?? "sin-resolver",
    feedback:       null,
    esPropia:       row.autor_id === miId,
    comentarioUtil: null,
    comentarios:    row.tipo === "pregunta" ? comentariosMockIniciales() : [],
    ...(medios.length > 0 ? { images: medios } : {}),
  };
}

export default function usePublicaciones() {
  const { userSocial, estadoSesion } = useSesion() as any;
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>(POSTS_MOCK);

  /* ── Cargar posts públicos desde Supabase — con sesión o sin ella ──
     Sin sesión: todos los posts con esPropia = false
     Con sesión: los posts propios se marcan esPropia = true            */
  useEffect(() => {
    const miId = userSocial?.id ?? "";

    supabase
      .from("publicaciones")
      .select("*, medios, perfiles(nombre_visible, avatar_url)")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error || !data || data.length === 0) {
          /* Si Supabase falla o no hay posts aún, mostrar solo mocks */
          setPublicaciones(POSTS_MOCK);
          return;
        }
        const postsReales = data.map((row: any) => desdeSupabase(row, miId));
        setPublicaciones([...postsReales, ...POSTS_MOCK]);
      });
  }, [userSocial?.id]); /* Se re-ejecuta al iniciar/cerrar sesión para actualizar esPropia */

  /* ── Crear publicación ── */
  const crearPublicacion = useCallback(
    async (
      texto: string,
      autor?: string,
      avatar?: number | string,
      tipo: TipoPublicacion = "post",
      prioridad: Prioridad = "normal",
      mediosNuevos?: Medio[]   // ← ahora acepta {url, tipo}[] (imágenes Y videos)
    ): Promise<boolean> => {
      if (!texto.trim() && (!mediosNuevos || mediosNuevos.length === 0)) return false;

      /* Usuario autenticado → guardar en Supabase */
      if (estadoSesion === "autenticado" && userSocial?.id) {
        const { data, error } = await supabase
          .from("publicaciones")
          .insert({
            autor_id: userSocial.id,
            texto:    texto.trim(),
            tipo,
            prioridad,
            medios:   mediosNuevos ?? [],   // columna jsonb [{url, tipo}]
            imagenes: (mediosNuevos ?? [])  // columna legacy — solo URLs para retrocompat
                        .filter((m) => m.tipo === "imagen")
                        .map((m) => m.url),
          })
          .select("*, perfiles(nombre_visible, avatar_url)")
          .single();

        if (!error && data) {
          const nueva = desdeSupabase(data, userSocial.id);
          setPublicaciones((prev) => [nueva, ...prev]);
          return true;
        }
        /* Si hay error en Supabase, igual guardamos localmente como fallback */
      }

      /* Demo o fallback local */
      const nueva: Publicacion = {
        id:             crearIdUnico(),
        avatarImg:      avatar ?? AVATARES_ALEATORIOS[Math.floor(Math.random() * AVATARES_ALEATORIOS.length)],
        author:         autor ?? "Usuario",
        time:           obtenerTiempoRelativo(),
        text:           texto.trim(),
        hashtags:       extraerHashtags(texto),
        likeCount:      0,
        tipo,
        prioridad,
        estado:         "sin-resolver",
        feedback:       null,
        esPropia:       estadoSesion === "autenticado",
        comentarioUtil: null,
        comentarios:    tipo === "pregunta" ? comentariosMockIniciales() : [],
        ...(mediosNuevos && mediosNuevos.length > 0 ? { images: mediosNuevos } : {}),
      };
      setPublicaciones((prev) => [nueva, ...prev]);
      return true;
    },
    [estadoSesion, userSocial]
  );

  const cambiarEstado = useCallback((id: string, estado: EstadoPregunta) => {
    setPublicaciones((prev) => prev.map((p) => p.id === id ? { ...p, estado } : p));
  }, []);

  const marcarComentarioUtil = useCallback((id: string, datos: ComentarioUtil | null) => {
    setPublicaciones((prev) => prev.map((p) =>
      p.id === id
        ? { ...p, comentarioUtil: datos, estado: datos ? "resuelto" : "sin-resolver" }
        : p
    ));
  }, []);

  const registrarFeedback = useCallback((id: string, feedback: Feedback) => {
    setPublicaciones((prev) => prev.map((p) => p.id === id ? { ...p, feedback } : p));
  }, []);

  /* ── Editar publicación ── */
  const editarPublicacion = useCallback(async (id: string, nuevoTexto: string, nuevasImagenes?: string[]) => {
    /* Optimistic update */
    setPublicaciones((prev) => prev.map((p) =>
      p.id === id ? {
        ...p,
        text:     nuevoTexto,
        hashtags: nuevoTexto.match(/#\w+/g) ?? [],
        ...(nuevasImagenes !== undefined ? { images: nuevasImagenes } : {}),
      } : p
    ));

    /* Persistir en Supabase si es un post real (id no empieza con "mock-") */
    if (!id.startsWith("mock-") && estadoSesion === "autenticado") {
      await supabase
        .from("publicaciones")
        .update({
          texto:    nuevoTexto,
          imagenes: nuevasImagenes ?? [],
        })
        .eq("id", id);
    }
  }, [estadoSesion]);

  /* ── Eliminar publicación ── */
  const eliminarPublicacion = useCallback(async (id: string) => {
    setPublicaciones((prev) => prev.filter((p) => p.id !== id));

    if (!id.startsWith("mock-") && estadoSesion === "autenticado") {
      await supabase.from("publicaciones").delete().eq("id", id);
    }
  }, [estadoSesion]);

  /* ── Comentarios (locales por ahora — Paso 5 los conecta a Supabase) ── */
  const actualizarComentarios = useCallback((postId: string, updater: (prev: Comentario[]) => Comentario[]) => {
    setPublicaciones((prev) => prev.map((p) => p.id === postId ? { ...p, comentarios: updater(p.comentarios) } : p));
  }, []);

  const agregarComentario = useCallback((postId: string, comentario: Omit<Comentario, "id">) => {
    actualizarComentarios(postId, (prev) => [...prev, { ...comentario, id: genCommentId() }]);
  }, [actualizarComentarios]);

  const agregarRespuesta = useCallback((postId: string, parentId: number, respuesta: Omit<Comentario, "id">) => {
    actualizarComentarios(postId, (prev) =>
      updateCommentById(prev, parentId, (c) => ({ ...c, replies: [...c.replies, { ...respuesta, id: genCommentId() }] }))
    );
  }, [actualizarComentarios]);

  const editarComentario = useCallback((postId: string, commentId: number, texto: string, imagenes: Medio[]) => {
    actualizarComentarios(postId, (prev) =>
      updateCommentById(prev, commentId, (c) => ({ ...c, text: texto, images: imagenes }))
    );
  }, [actualizarComentarios]);

  const eliminarComentario = useCallback((postId: string, commentId: number) => {
    actualizarComentarios(postId, (prev) => removeCommentById(prev, commentId));
  }, [actualizarComentarios]);

  const reaccionarComentario = useCallback((postId: string, commentId: number, reaction: Comentario["reaction"]) => {
    actualizarComentarios(postId, (prev) =>
      updateCommentById(prev, commentId, (c) => {
        if (reaction === null) return { ...c, reaction: null, reactionCount: Math.max(0, c.reactionCount - 1) };
        if (c.reaction?.label === reaction.label) return { ...c, reaction: null, reactionCount: Math.max(0, c.reactionCount - 1) };
        return { ...c, reaction, reactionCount: c.reaction ? c.reactionCount : c.reactionCount + 1 };
      })
    );
  }, [actualizarComentarios]);

  const obtenerPorTipo = useCallback(
    (tipo: TipoPublicacion): Publicacion[] => {
      if (tipo === "post") return publicaciones;
      return publicaciones.filter((p) => p.tipo === tipo);
    },
    [publicaciones]
  );

  const misPreguntas = publicaciones.filter((p) => p.esPropia && p.tipo === "pregunta");

  return {
    publicaciones, crearPublicacion, obtenerPorTipo,
    cambiarEstado, marcarComentarioUtil, registrarFeedback,
    editarPublicacion, eliminarPublicacion,
    agregarComentario, agregarRespuesta, editarComentario, eliminarComentario, reaccionarComentario,
    misPreguntas,
  };
}
