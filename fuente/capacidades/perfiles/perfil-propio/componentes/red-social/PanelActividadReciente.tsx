import React, { useMemo, useState } from "react";
import { supabase } from "@/integraciones/persistencia/supabase-red-social";
import { useSesion } from "@/capacidades/identidad/sesion/ContextoSesion";
import { ModalPublicacion } from "@/capacidades/publicaciones/componentes/CreadorPublicacion";
import Publicacion from "@/capacidades/publicaciones/componentes/Publicacion";

interface Props {
  perfilSocial: any;
  publicacionesPropias: any[];
  alNavegar?: (tab: string) => void;
  card: string;
  onMarcarComentarioUtil?: (postId: any, datos: any) => void;
  onCambiarEstado?: (postId: any, estado: string) => void;
  onEditarPublicacion?: (postId: any, texto: string, imagenes: any[]) => void;
  onEliminarPublicacion?: (postId: any) => void;
  onAgregarComentario?: (postId: any, comentario: any) => void;
  onAgregarRespuesta?: (postId: any, parentId: any, respuesta: any) => void;
  onEditarComentario?: (postId: any, cId: any, txt: string, imgs: any[]) => void;
  onEliminarComentario?: (postId: any, cId: any) => void;
  onReaccionarComentario?: (postId: any, cId: any, reaccion: any) => void;
}

export default function PanelActividadReciente({ perfilSocial, publicacionesPropias, alNavegar, card, onMarcarComentarioUtil, onCambiarEstado, onEditarPublicacion, onEliminarPublicacion, onAgregarComentario, onAgregarRespuesta, onEditarComentario, onEliminarComentario, onReaccionarComentario }: Props) {
  const { userSocial } = useSesion() as any;
  const usuarioId = userSocial?.id as string | undefined;
  const [modalAbierto, setModalAbierto] = useState(false);
  const [publicacionesLocales, setPublicacionesLocales] = useState<any[]>([]);

  const avatarSrc = perfilSocial.avatar || `https://i.pravatar.cc/150?img=3`;
  const nombreCorto = perfilSocial.nombreVisible?.split(" ")[0] || "ti";

  const onPublicar = async (texto: string, _autor: string, _avatar: string, tipo: string, prioridad: string, imagenes: any[]) => {
    if (!usuarioId) return;
    const imgs = imagenes.filter((m: any) => m.tipo !== "video" && (typeof m === "string" ? !m.match(/\.(mp4|webm|mov)(\?|$)/i) : true)).map((m: any) => typeof m === "string" ? m : m.url);
    const vids = imagenes.filter((m: any) => m.tipo === "video" || (typeof m === "string" && m.match(/\.(mp4|webm|mov)(\?|$)/i))).map((m: any) => typeof m === "string" ? m : m.url);
    const payload = { autor_id: usuarioId, texto: texto.trim(), tipo: tipo || "post", prioridad: prioridad || "normal", imagenes: imgs, videos: vids };
    const { data, error } = await supabase.from("publicaciones").insert(payload).select("id,texto,tipo,created_at,imagenes,videos").single();
    if (error) return console.error(error);
    const nueva = {
      id: data.id, text: data.texto, tipo: data.tipo, esPropia: true,
      author: perfilSocial.nombreVisible || "", avatarImg: avatarSrc,
      time: new Date(data.created_at).toLocaleDateString("es-PE", { day: "numeric", month: "short", year: "numeric" }),
      images: (data.imagenes || []).map((url: string) => ({ url, tipo: "imagen" })),
      likeCount: 0, comentarios: [],
    };
    setPublicacionesLocales((prev) => [nueva, ...prev]);
  };

  const publicacionesRender = useMemo(() => [...publicacionesLocales, ...publicacionesPropias], [publicacionesLocales, publicacionesPropias]);

  if (publicacionesRender.length === 0) {
    return (
      <>
        <div className={`${card} flex flex-col items-center gap-3 py-10 text-center`}>
          <p className="text-[14px] font-bold text-[var(--text-dark)] m-0 mb-1">Aún no tienes publicaciones</p>
          <button onClick={() => setModalAbierto(true)} className="px-4 py-[8px] text-[13px] font-bold rounded-[var(--radius-sm)] text-white border-none cursor-pointer" style={{ background: "var(--gradient-primary)" }}>+ Nueva publicación</button>
        </div>
        {modalAbierto && (
          <ModalPublicacion usuario={{ nombre: perfilSocial.nombreVisible || "", avatar: avatarSrc }} onPublicar={onPublicar} onCerrar={() => setModalAbierto(false)} />
        )}
      </>
    );
  }

  return (
    <>
      {/* Trigger de nueva publicación */}
      <div className={card}>
        <div className="flex items-center gap-3">
          <img src={avatarSrc} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
          <button
            onClick={() => setModalAbierto(true)}
            className="flex-1 text-left px-4 py-[10px] rounded-full border border-[var(--border-color)] bg-[var(--background-color)] text-[13px] text-[var(--text-muted)] cursor-pointer hover:bg-[var(--hover-color)] transition-colors"
          >
            ¿Qué estás pensando, {nombreCorto}?
          </button>
        </div>
      </div>

      {/* Publicaciones usando el componente del feed */}
      {publicacionesRender.map((p) => (
        <Publicacion
          key={String(p.id)}
          post={p}
          alVerPerfil={() => {}}
          alNavegar={alNavegar}
          onCambiarEstado={(postId: any, estado: string) => onCambiarEstado?.(postId, estado)}
          onMarcarComentarioUtil={(postId: any, datos: any) => onMarcarComentarioUtil?.(postId, datos)}
          onFeedback={() => {}}
          onEditar={(postId: any, texto: string, imgs: any[]) => onEditarPublicacion?.(postId, texto, imgs)}
          onEliminar={(postId: any) => onEliminarPublicacion?.(postId)}
          onAgregarComentario={(postId: any, c: any) => onAgregarComentario?.(postId, c)}
          onAgregarRespuesta={(postId: any, parentId: any, r: any) => onAgregarRespuesta?.(postId, parentId, r)}
          onEditarComentario={(postId: any, cId: any, txt: string, imgs: any[]) => onEditarComentario?.(postId, cId, txt, imgs)}
          onEliminarComentario={(postId: any, cId: any) => onEliminarComentario?.(postId, cId)}
          onReaccionarComentario={(postId: any, cId: any, r: any) => onReaccionarComentario?.(postId, cId, r)}
        />
      ))}

      {modalAbierto && (
        <ModalPublicacion usuario={{ nombre: perfilSocial.nombreVisible || "", avatar: avatarSrc }} onPublicar={onPublicar} onCerrar={() => setModalAbierto(false)} />
      )}
    </>
  );
}
