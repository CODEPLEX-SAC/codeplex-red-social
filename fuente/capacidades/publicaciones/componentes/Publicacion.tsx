import React, { useState, useRef, useEffect } from "react";
import AccionesPublicacion from "@/capacidades/publicaciones/componentes/AccionesPublicacion";
import Comentarios from "@/capacidades/publicaciones/componentes/Comentarios";
import ModalConfirmar from "@/compartido/interfaz/retroalimentacion/ModalConfirmar/ModalConfirmar";
import { ModalPublicacion } from "@/capacidades/publicaciones/componentes/CreadorPublicacion";
import Lightbox from "@/compartido/interfaz/visualizacion-datos/Lightbox/Lightbox";
import LinkPreview, { extraerPrimeraUrl } from "@/compartido/interfaz/primitivas/VistaPrevia";
import { PRIORIDADES, ESTADOS_PREGUNTA } from "@/capacidades/publicaciones/contratos/publicaciones.contratos";

function BadgePrioridad({ prioridad }) {
  const cfg = PRIORIDADES.find((p) => p.id === prioridad);
  if (!cfg) return null;
  return (
    <span className="px-[10px] py-[3px] rounded-full text-[11px] font-bold"
      style={{ background: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  );
}

function BadgeEstado({ estado }) {
  const cfg = ESTADOS_PREGUNTA.find((e) => e.id === estado) ?? ESTADOS_PREGUNTA[1];
  return (
    <span className="px-[10px] py-[3px] rounded-full text-[11px] font-semibold"
      style={{ background: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  );
}

/* ── Menú ⋯ del post (Editar / Eliminar) — solo posts propios ── */
function PostMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        className="bg-transparent border-none cursor-pointer text-[var(--text-muted)] text-[24px] p-1 px-2 transition-colors duration-300 hover:text-[var(--text-dark)]"
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
      >&#x22EF;</button>

      {open && (
        <div className="comment-menu-dropdown">
          <button className="comment-menu-item" onClick={() => { onEdit(); setOpen(false); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Editar
          </button>
          <button className="comment-menu-item comment-menu-item--danger" onClick={() => { onDelete(); setOpen(false); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

function Publicacion({ post, alVerPerfil, alNavegar, onCambiarEstado, onMarcarComentarioUtil, onFeedback, onEditar, onEliminar, onAgregarComentario, onAgregarRespuesta, onEditarComentario, onEliminarComentario, onReaccionarComentario }) {
  const [showComments,        setShowComments]        = useState(false);
  const [modalEditar,         setModalEditar]         = useState(false);
  const [confirmarEliminar,   setConfirmarEliminar]   = useState(false);
  const [lightbox,            setLightbox]            = useState(null);
  const [previewDismissed,    setPreviewDismissed]    = useState(false);
  /* datos = { id, autor, texto } al marcar; null al desmarcar */
  const handleAceptarRespuesta = (datos) => {
    onMarcarComentarioUtil?.(post.id, datos);
  };

  const toggleComments = () => setShowComments((prev) => !prev);

  const avatarSrc = typeof post.avatarImg === "string" && post.avatarImg.length > 0
    ? post.avatarImg
    : `https://i.pravatar.cc/150?img=${post.avatarImg}`;
  const handleVerAutor = () => {
    if (post.esPropia) { alNavegar?.("perfil-propio"); }
    else { alVerPerfil?.({ nombre: post.author, avatar: avatarSrc, tituloProfesional: post.tituloProfesional }); }
  };


  return (
    <div className="bg-[var(--white-color)] px-8 py-7 rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] mb-5 [@media(max-width:480px)]:px-[15px] [@media(max-width:480px)]:py-5">

      {/* Cabecera: avatar + nombre + tiempo */}
      <div className="flex justify-between items-center mb-[18px]">
        <div className="flex items-center gap-[14px]">
          <img src={avatarSrc} alt={post.author}
            className="w-12 h-12 rounded-full object-cover cursor-pointer"
            onClick={handleVerAutor} />
          <div>
            <div className="font-semibold text-[15px] text-[var(--text-dark)] mb-1 cursor-pointer" onClick={handleVerAutor}>{post.author}</div>
            <div className="text-[13px] text-[var(--text-gray)]">{post.time}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {post.tipo === "pregunta" && post.prioridad && <BadgePrioridad prioridad={post.prioridad} />}
          {post.tipo === "pregunta" && post.estado    && <BadgeEstado estado={post.estado} />}
          {post.esPropia
            ? <PostMenu onEdit={() => setModalEditar(true)} onDelete={() => setConfirmarEliminar(true)} />
            : <button className="bg-transparent border-none cursor-pointer text-[var(--text-muted)] text-[24px] p-1 px-2 transition-colors duration-300 hover:text-[var(--text-dark)]">&#x22EF;</button>
          }
          {confirmarEliminar && (
            <ModalConfirmar
              titulo="¿Eliminar publicación?"
              mensaje="¿Seguro que quieres eliminar esta publicación? Esta acción no se puede deshacer."
              labelOk="Eliminar"
              labelNo="Cancelar"
              variante="danger"
              onConfirm={() => onEliminar?.(post.id)}
              onCerrar={() => setConfirmarEliminar(false)}
            />
          )}
        </div>
      </div>

      {/* Modal de edición */}
      {modalEditar && (
        <ModalPublicacion
          usuario={{ nombre: post.author, avatar: avatarSrc }}
          textoInicial={post.text}
          imagenesIniciales={(post.images || []).map((item) =>
            typeof item === "string" ? { url: item, tipo: "imagen" } : item
          )}
          modoEditar
          onPublicar={(nuevoTexto, _autor, _avatar, _tipo, _prioridad, nuevasImagenes) => {
            onEditar?.(post.id, nuevoTexto, nuevasImagenes);
            setModalEditar(false);
          }}
          onCerrar={() => setModalEditar(false)}
        />
      )}

      {/* Texto + hashtags */}
      <div className="mb-[18px]">
        <p className="text-[var(--text-dark)] leading-[1.6] text-[15px] mb-3">{post.text}</p>
        {!previewDismissed && extraerPrimeraUrl(post.text) && (
          <div className="mb-3">
            <LinkPreview
              url={extraerPrimeraUrl(post.text)}
              onDismiss={() => setPreviewDismissed(true)}
            />
          </div>
        )}
        {post.hashtags?.length > 0 && (
          <div className="flex gap-[10px] flex-wrap">
            {post.hashtags.map((tag) => (
              <span key={tag} className="text-[var(--primary-color)] font-semibold text-[14px] cursor-pointer transition-opacity duration-300 hover:opacity-80">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox items={lightbox.items} indice={lightbox.indice} onCerrar={() => setLightbox(null)} />
      )}

      {/* Video (campo videoSrc legacy) */}
      {post.videoSrc && (
        <div className="-mx-8 [@media(max-width:480px)]:-mx-[15px] my-[18px] overflow-hidden relative"
          style={{ background: "var(--video-bg)" }}>
          <video className="w-full block aspect-video object-contain"
            style={{ background: "var(--video-bg)" }}
            src={post.videoSrc} controls preload="metadata" poster={post.videoPoster} />
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox({ items: [{ src: post.videoSrc, tipo: "video", poster: post.videoPoster }], indice: 0 }); }}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full border-none cursor-pointer"
            style={{ background: "var(--overlay-media)", color: "var(--white-color)" }}
            title="Ver en grande">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
          </button>
        </div>
      )}

      {/* Medios (imágenes y videos) */}
      {post.images && post.images.length > 0 && (() => {
        // Normaliza: acepta strings legacy del mock y objetos {url,tipo} de nuevas publicaciones
        const media = post.images.map((item) =>
          typeof item === "string"
            ? { url: item, tipo: /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(item) ? "video" : "imagen" }
            : item
        );
        const lbItems = media.map((m) => ({ src: m.url, tipo: m.tipo }));
        const abrirEn = (i) => setLightbox({ items: lbItems, indice: i });

        // Videos: inline con controles + botón expandir para lightbox
        // Imágenes: clic abre lightbox
        const renderMedio = (m, i, className, style) => {
          if (m.tipo === "video") {
            return (
              <div key={i} className={`relative overflow-hidden ${className || ""}`}
                style={{ ...style, background: "var(--video-bg)" }}>
                <video src={m.url} className="w-full h-full object-contain block"
                  style={{ ...style, background: "var(--video-bg)" }} controls preload="metadata" />
                <button
                  onClick={(e) => { e.stopPropagation(); abrirEn(i); }}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full border-none cursor-pointer"
                  style={{ background: "var(--overlay-media)", color: "var(--white-color)" }}
                  title="Ver en grande">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                  </svg>
                </button>
              </div>
            );
          }
          return (
            <div key={i} className={`relative cursor-pointer overflow-hidden ${className || ""}`} style={style}
              onClick={() => abrirEn(i)}>
              <img src={m.url} alt="" className="w-full h-full object-cover block hover:brightness-95 transition-[filter] duration-200" />
            </div>
          );
        };

        return (
          <div className="-mx-8 [@media(max-width:480px)]:-mx-[15px] my-[18px] overflow-hidden">
            {media.length === 1 && renderMedio(media[0], 0, "max-h-[420px]", { maxHeight: "420px" })}
            {media.length === 2 && (
              <div className="grid grid-cols-2 gap-[2px]" style={{ maxHeight: "300px" }}>
                {media.map((m, i) => renderMedio(m, i, "w-full h-full", { maxHeight: "300px" }))}
              </div>
            )}
            {media.length === 3 && (
              <div className="grid grid-cols-2 gap-[2px] h-[300px]">
                {media.map((m, i) => renderMedio(m, i, `w-full h-full ${i === 0 ? "row-span-2" : ""}`, {}))}
              </div>
            )}
            {media.length >= 4 && (
              <div className="grid grid-cols-2 gap-[2px]">
                {media.slice(0, 4).map((m, i) => (
                  <div key={i} className={`relative overflow-hidden ${m.tipo === "imagen" ? "aspect-square cursor-pointer" : ""}`}
                    onClick={m.tipo === "imagen" ? () => abrirEn(i) : undefined}>
                    {m.tipo === "video" ? (
                      <video src={m.url} className="w-full object-contain" style={{ background: "var(--video-bg)" }} controls preload="metadata" />
                    ) : (
                      <img src={m.url} alt="" className="w-full h-full object-cover block hover:brightness-95 transition-[filter] duration-200" />
                    )}
                    {i === 3 && media.length > 4 && m.tipo === "imagen" && (
                      <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                        <span className="text-white text-[28px] font-bold">+{media.length - 4}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-[var(--border-color)]">
        <AccionesPublicacion initialLikeCount={post.likeCount} onToggleComments={toggleComments} commentCount={post.comentarios?.length ?? 0} />
        <div className="h-px bg-[var(--border-color)] my-1"></div>
        <Comentarios
          visible={showComments}
          alVerPerfil={alVerPerfil}
          comentariosIniciales={post.comentarios}
          esPregunta={post.tipo === "pregunta"}
          esAutorPost={post.esPropia === true}
          respuestaAceptadaId={post.comentarioUtil?.id ?? null}
          onAceptarRespuesta={handleAceptarRespuesta}
          onAgregarComentario={(c) => onAgregarComentario?.(post.id, c)}
          onAgregarRespuesta={(parentId, r) => onAgregarRespuesta?.(post.id, parentId, r)}
          onEditarComentario={(cId, txt, imgs) => onEditarComentario?.(post.id, cId, txt, imgs)}
          onEliminarComentario={(cId) => onEliminarComentario?.(post.id, cId)}
          onReaccionarComentario={(cId, r) => onReaccionarComentario?.(post.id, cId, r)}
        />

      </div>
    </div>
  );
}

export default Publicacion;
