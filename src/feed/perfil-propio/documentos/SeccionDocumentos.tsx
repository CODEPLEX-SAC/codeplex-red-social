import React, { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useSesion } from "../../../identidad/sesion/SesionContext";
import BtnEditar from "../../../compartido/ui/BtnEditar";
import FilaVacia from "../../../compartido/ui/FilaVacia";

interface DocumentoPerfil {
  id: number;
  user_id: string;
  nombre: string;
  tipo: string;
  fecha: string;
  url: string;
}

interface Props {
  perfilSocial: any;
  actualizarPerfilSocial: (payload: any) => void;
  card: string;
  tituloLg: string;
}

export default function SeccionDocumentos({ perfilSocial, actualizarPerfilSocial, card, tituloLg }: Props) {
  const { userSocial } = useSesion() as any;
  const usuarioId = userSocial?.id as string | undefined;
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [documentosCargados, setDocumentosCargados] = useState<DocumentoPerfil[]>([]);

  useEffect(() => {
    if (!usuarioId) return;
    const cargarDocumentos = async () => {
      const { data, error } = await supabase.from("documentos").select("id,user_id,nombre,tipo,fecha,url").eq("user_id", usuarioId).order("id", { ascending: false });
      if (error) return console.error(error);
      const docs = (data ?? []) as DocumentoPerfil[];
      setDocumentosCargados(docs);
      actualizarPerfilSocial({ documentos: docs.map(({ id, nombre, tipo, fecha, url }) => ({ id, nombre, tipo, fecha, url })) });
    };
    cargarDocumentos();
  }, [usuarioId]);

  const subirDocumento = async (file: File) => {
    if (!usuarioId) return;
    const path = `perfil-propio/${usuarioId}/documentos/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("media").upload(path, file, { upsert: false });
    if (uploadError) return console.error(uploadError);

    const { data: publicData } = supabase.storage.from("media").getPublicUrl(path);
    const url = publicData.publicUrl;
    const tipo = file.name.toLowerCase().includes("cv") ? "CV" : "Documento";
    const fecha = new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });

    const { data, error } = await supabase
      .from("documentos")
      .insert([{ user_id: usuarioId, nombre: file.name, tipo, fecha, url }])
      .select("id,user_id,nombre,tipo,fecha,url")
      .single();

    if (error) return console.error(error);

    const nuevo = data as DocumentoPerfil;
    const nuevos = [nuevo, ...documentosCargados];
    setDocumentosCargados(nuevos);
    actualizarPerfilSocial({ documentos: nuevos.map(({ id, nombre, tipo: t, fecha: f, url: u }) => ({ id, nombre, tipo: t, fecha: f, url: u })) });
  };

  const agregarDocumento = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await subirDocumento(file);
    e.target.value = "";
  };

  const eliminarDocumento = async (id: number) => {
    const doc = documentosCargados.find((d) => d.id === id);
    const { error } = await supabase.from("documentos").delete().eq("id", id);
    if (error) return console.error(error);

    if (doc?.url?.includes("/storage/v1/object/public/media/")) {
      const storagePath = doc.url.split("/storage/v1/object/public/media/")[1];
      if (storagePath) await supabase.storage.from("media").remove([storagePath]);
    }

    const nuevos = documentosCargados.filter((d) => d.id !== id);
    setDocumentosCargados(nuevos);
    actualizarPerfilSocial({ documentos: nuevos.map(({ id: did, nombre, tipo, fecha, url }) => ({ id: did, nombre, tipo, fecha, url })) });
  };

  const tieneCV = useMemo(() => documentosCargados.some((d) => d.tipo?.toLowerCase().includes("cv") || d.nombre?.toLowerCase().includes("cv")), [documentosCargados]);
  const tieneTitulo = useMemo(() => documentosCargados.some((d) => d.tipo?.toLowerCase().includes("título") || d.nombre?.toLowerCase().includes("título")), [documentosCargados]);
  const mostrarAviso = !tieneCV || !tieneTitulo;

  return (
    <div className={card}>
      <div className="flex items-center justify-between mb-4">
        <h4 className={tituloLg}>Documentos</h4>
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.png,.jpg" className="hidden" onChange={agregarDocumento} />
        <BtnEditar onClick={() => fileRef.current?.click()} />
      </div>

      <div className="flex flex-col gap-2">
        {documentosCargados.length ? documentosCargados.map((doc) => (
          <div key={doc.id} className="flex items-center gap-[14px] py-3 border-b border-[var(--border-color)] last:border-b-0">
            <div className="flex-1 min-w-0">
              <a href={doc.url} target="_blank" rel="noreferrer" className="text-[14px] font-semibold text-[var(--text-dark)] truncate block">{doc.nombre}</a>
              <span className="text-[12px] text-[var(--text-muted)] block">{doc.tipo} · Subido el {doc.fecha}</span>
            </div>
            <button onClick={() => eliminarDocumento(doc.id)} className="text-[var(--text-muted)] hover:text-red-500 bg-transparent border-none">×</button>
          </div>
        )) : (
          <>
            <FilaVacia icono={<span>+</span>} label="+ Subir CV actualizado" sublabel="PDF recomendado" onClick={() => fileRef.current?.click()} />
            <FilaVacia icono={<span>+</span>} label="+ Subir título profesional" sublabel="Será verificado por Codeplex" onClick={() => fileRef.current?.click()} />
          </>
        )}
      </div>

      {mostrarAviso && (
        <div className="flex items-center gap-2 mt-3 p-3 rounded-[var(--radius-sm)] border border-[#f59e0b] bg-[#fffbeb]">
          <p className="text-[12px] text-[#92400e] m-0">Debes subir al menos el CV y un título verificado para aparecer en búsquedas.</p>
        </div>
      )}
    </div>
  );
}
