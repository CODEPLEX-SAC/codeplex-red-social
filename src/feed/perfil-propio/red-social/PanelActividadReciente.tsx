import React, { useMemo, useRef, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useSesion } from "../../../identidad/sesion/SesionContext";

interface PublicacionPropia {
  id: string | number;
  text?: string;
  tipo?: string;
  time?: string;
  likes?: number;
  comentarios?: any[];
  imagenes?: string[];
  videos?: string[];
}

interface Props {
  perfilSocial: any;
  publicacionesPropias: PublicacionPropia[];
  alNavegar?: (tab: string) => void;
  card: string;
}

export default function PanelActividadReciente({ perfilSocial, publicacionesPropias, alNavegar, card }: Props) {
  const { userSocial } = useSesion() as any;
  const usuarioId = userSocial?.id as string | undefined;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropZoneRef = useRef<HTMLDivElement | null>(null);
  const [textoPublicacion, setTextoPublicacion] = useState("");
  const [mediosSubidos, setMediosSubidos] = useState<string[]>([]);
  const [publicacionesLocales, setPublicacionesLocales] = useState<PublicacionPropia[]>([]);
  const [subiendo, setSubiendo] = useState(false);

  const tipoBadge = (tipo?: string) => ({ pregunta: { label: "Pregunta", color: "var(--secondary-color)", bg: "rgba(139,92,246,0.1)" }, caso: { label: "Caso", color: "var(--success-color)", bg: "rgba(16,185,129,0.1)" }, novedad: { label: "Novedad", color: "var(--primary-color)", bg: "rgba(72,127,255,0.1)" } }[tipo || ""] ?? null);

  const publicarMedios = async (file: File) => {
    if (!usuarioId) return null;
    const path = `perfil-propio/${usuarioId}/publicaciones/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(path, file, { upsert: false });
    if (error) { console.error(error); return null; }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    return data.publicUrl;
  };

  const procesarArchivos = async (files: FileList | File[]) => {
    setSubiendo(true);
    const entradas = Array.from(files);
    const urls: string[] = [];
    for (const file of entradas) {
      const url = await publicarMedios(file);
      if (url) urls.push(url);
    }
    setMediosSubidos((prev) => [...prev, ...urls]);
    setSubiendo(false);
  };

  const manejarInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    await procesarArchivos(files);
    e.target.value = "";
  };

  const manejarPaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const files = Array.from(e.clipboardData.files || []);
    if (!files.length) return;
    e.preventDefault();
    await procesarArchivos(files);
  };

  const manejarDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) await procesarArchivos(e.dataTransfer.files);
  };

  const crearPublicacion = async () => {
    if (!usuarioId) return;
    if (!textoPublicacion.trim() && mediosSubidos.length === 0) return;

    const imagenes = mediosSubidos.filter((url) => !url.match(/\.(mp4|webm|mov)(\?|$)/i));
    const videos = mediosSubidos.filter((url) => url.match(/\.(mp4|webm|mov)(\?|$)/i));

    const payload = {
      autor_id: usuarioId,
      texto: textoPublicacion.trim(),
      tipo: "post",
      prioridad: "normal",
      imagenes,
      videos,
    };

    const { data, error } = await supabase.from("publicaciones").insert(payload).select("id,texto,tipo,created_at,imagenes,videos").single();
    if (error) return console.error(error);

    const nueva: PublicacionPropia = {
      id: data.id,
      text: data.texto,
      tipo: data.tipo,
      time: new Date(data.created_at).toLocaleDateString("es-PE", { day: "numeric", month: "short", year: "numeric" }),
      imagenes: data.imagenes || [],
      videos: data.videos || [],
    };

    setPublicacionesLocales((prev) => [nueva, ...prev]);
    setTextoPublicacion("");
    setMediosSubidos([]);
  };

  const publicacionesRender = useMemo(() => [...publicacionesLocales, ...publicacionesPropias], [publicacionesLocales, publicacionesPropias]);

  if (publicacionesRender.length === 0 && !textoPublicacion && mediosSubidos.length === 0) {
    return (
      <div className={`${card} flex flex-col items-center gap-3 py-10 text-center`}>
        <p className="text-[14px] font-bold text-[var(--text-dark)] m-0 mb-1">Aún no tienes publicaciones</p>
        <button onClick={() => alNavegar?.("red-social")} className="px-4 py-[8px] text-[13px] font-bold rounded-[var(--radius-sm)] text-white border-none" style={{ background: "var(--gradient-primary)" }}>+ Nueva publicación</button>
      </div>
    );
  }

  return (
    <>
      <div ref={dropZoneRef} onDragOver={(e) => e.preventDefault()} onDrop={manejarDrop} className={card}>
        <textarea
          className="w-full min-h-[80px] border border-[var(--border-color)] rounded-[var(--radius-sm)] p-3 text-[13px]"
          placeholder={`¿Qué estás pensando, ${perfilSocial.nombreVisible?.split(" ")[0] || "tú"}?`}
          value={textoPublicacion}
          onChange={(e) => setTextoPublicacion(e.target.value)}
          onPaste={manejarPaste}
        />
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2 flex-wrap">
            {mediosSubidos.map((url) => <a key={url} href={url} target="_blank" rel="noreferrer" className="text-[12px] text-[var(--primary-color)]">Adjunto</a>)}
          </div>
          <div className="flex gap-2">
            <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={manejarInputFile} />
            <button onClick={() => fileInputRef.current?.click()} className="px-3 py-[6px] text-[12px] border border-[var(--border-color)] rounded-[var(--radius-sm)]">Adjuntar</button>
            <button disabled={subiendo} onClick={crearPublicacion} className="px-3 py-[6px] text-[12px] text-white rounded-[var(--radius-sm)]" style={{ background: "var(--primary-color)" }}>{subiendo ? "Subiendo..." : "Publicar"}</button>
          </div>
        </div>
      </div>

      {publicacionesRender.map((p) => {
        const badge = tipoBadge(p.tipo);
        return (
          <div key={String(p.id)} className={card}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-[13px] font-bold text-[var(--text-dark)] m-0 leading-none">{perfilSocial.nombreVisible}</p>
              {badge && <span className="text-[11px] font-semibold px-2 py-[3px] rounded-full" style={{ background: badge.bg, color: badge.color }}>{badge.label}</span>}
            </div>
            <p className="text-[13.5px] text-[var(--text-dark)] leading-[1.6] m-0 line-clamp-4">{p.text}</p>
            {Array.isArray(p.imagenes) && p.imagenes.length > 0 && <div className="mt-2 text-[12px] text-[var(--text-muted)]">{p.imagenes.length} imagen(es)</div>}
            {Array.isArray(p.videos) && p.videos.length > 0 && <div className="mt-1 text-[12px] text-[var(--text-muted)]">{p.videos.length} video(s)</div>}
          </div>
        );
      })}
    </>
  );
}
