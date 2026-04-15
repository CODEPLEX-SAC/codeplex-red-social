import React, { useState, useRef, useEffect } from "react";
import { REACTIONS } from "@/capacidades/publicaciones/contratos/publicaciones.contratos";
import { useSesion } from "@/capacidades/identidad/sesion/ContextoSesion";
import { usePerfilSocial } from "@/capacidades/perfiles/perfil-propio/ganchos/usarContextoPerfilSocial";
import Icon from "@/compartido/interfaz/primitivas/Icono";
import ModalConfirmar from "@/compartido/interfaz/retroalimentacion/ModalConfirmar/ModalConfirmar";
import Lightbox from "@/compartido/interfaz/visualizacion-datos/Lightbox/Lightbox";
import { subirMedio, subirMedios } from "@/integraciones/medios/subida-medios";
import LinkPreview, { extraerPrimeraUrl } from "@/compartido/interfaz/primitivas/VistaPrevia";

/* ── Render text with clickable links ── */
function RenderText({ text }) {
  if (!text) return null;
  const parts = [];
  let last = 0;
  const regex = /https?:\/\/[^\s<>"{}|\\^[\]`]+/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(<span key={last}>{text.slice(last, match.index)}</span>);
    parts.push(
      <a key={match.index} href={match[0]} target="_blank" rel="noopener noreferrer"
        style={{ color: "var(--primary-color)", wordBreak: "break-all", textDecoration: "underline" }}>
        {match[0]}
      </a>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(<span key={last}>{text.slice(last)}</span>);
  return <>{parts}</>;
}

/* ── Mini Reaction Popup ── */
function MiniReactionPopup({ onSelect, onMouseEnter, onMouseLeave }) {
  return (
    <div className="comment-reactions-popup" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {REACTIONS.map((reaction) => (
        <button
          key={reaction.label}
          className="comment-reaction-option"
          onClick={(e) => { e.stopPropagation(); onSelect(reaction); }}
          title={reaction.label}
        >
          <Icon name={reaction.icon} size={18} color={reaction.color} className="icon" />
        </button>
      ))}
    </div>
  );
}

/* ── Comment Menu (Edit/Delete) ── */
function CommentMenu({ onEdit, onDelete }) {
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
        className="bg-transparent border-none cursor-pointer text-[var(--text-muted)] p-1 leading-none rounded-full transition-colors duration-200 opacity-50 flex items-center justify-center w-7 h-7 hover:bg-[var(--hover-color)] hover:text-[var(--text-dark)] hover:opacity-100"
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        title="Editar o eliminar"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="2.5" /><circle cx="12" cy="12" r="2.5" /><circle cx="19" cy="12" r="2.5" />
        </svg>
      </button>
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

/* ── Íconos de acción (foto/video) ── */
function CommentMediaIcons({ onMedia, fileInputRef }) {
  const handleChange = async (e) => {
    const urls = await subirMedios(e.target.files);
    urls.forEach((url) => onMedia?.(url));
    e.target.value = "";
  };
  return (
    <div className="flex gap-[2px]">
      <button className="bg-transparent border-none cursor-not-allowed text-[var(--text-muted)] p-1 rounded-full flex items-center justify-center opacity-70" title="Emoji" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round"/><line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round"/></svg>
      </button>
      <button
        className="bg-transparent border-none cursor-pointer text-[var(--text-muted)] p-1 rounded-full flex items-center justify-center transition-colors duration-200 hover:text-[var(--primary-color)] hover:bg-[var(--hover-color)]"
        title="Foto / Video" onClick={() => fileInputRef?.current?.click()}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      </button>
      <button className="bg-transparent border-none cursor-not-allowed text-[var(--text-muted)] p-1 rounded-full flex items-center justify-center opacity-70" title="GIF" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="3"/><text x="12" y="15" textAnchor="middle" fill="currentColor" stroke="none" fontSize="8" fontWeight="700">GIF</text></svg>
      </button>
      <button className="bg-transparent border-none cursor-not-allowed text-[var(--text-muted)] p-1 rounded-full flex items-center justify-center opacity-70" title="Sticker" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a10 10 0 1 0 10 10h-10V2z"/><path d="M12 2v10h10"/></svg>
      </button>
      <input ref={fileInputRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleChange} />
    </div>
  );
}

/* ── Preview de medio en input (con X para quitar) ── */
function MediaPreview({ medio, onQuitar }) {
  const esVideo = medio.tipo === "video";
  return (
    <div className="relative inline-block mt-2 mx-1">
      {esVideo ? (
        <video src={medio.url} className="h-[72px] w-auto rounded-[var(--radius-sm)] object-cover border border-[var(--border-color)]"
          muted preload="metadata" />
      ) : (
        <img src={medio.url} alt="" className="h-[72px] w-auto rounded-[var(--radius-sm)] object-cover border border-[var(--border-color)]" />
      )}
      {esVideo && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "var(--overlay-media)" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--white-color)"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      )}
      <button onClick={onQuitar}
        className="absolute -top-1 -right-1 w-5 h-5 border-none rounded-full cursor-pointer flex items-center justify-center"
        style={{ background: "var(--text-dark)", color: "var(--white-color)" }}>
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  );
}

/* ── Medios en burbuja de comentario ── */
/* Imágenes: clic abre lightbox                                              */
/* Videos: se reproducen inline con controles + botón expandir para lightbox */
function CommentMediaBubble({ media, onOpen }) {
  if (!media || media.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1 mt-2 mb-1">
      {media.map((medio, i) => (
        <div key={i} className="relative rounded-[var(--radius-sm)] overflow-hidden border border-[var(--border-color)]"
          style={{ maxWidth: "280px" }}>
          {medio.tipo === "video" ? (
            <>
              <video src={medio.url} className="w-full block"
                style={{ maxHeight: "180px", background: "var(--video-bg)" }} controls preload="metadata" />
              {/* botón expandir — no interfiere con los controles del video */}
              <button
                onClick={(e) => { e.stopPropagation(); onOpen(i); }}
                className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full border-none cursor-pointer transition-opacity duration-200"
                style={{ background: "var(--overlay-media)", color: "var(--white-color)" }}
                title="Ver en grande">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                  <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              </button>
            </>
          ) : (
            <div className="cursor-pointer hover:opacity-90 transition-opacity" onClick={() => onOpen(i)}>
              <img src={medio.url} alt="" className="w-full block object-cover"
                style={{ maxHeight: "180px" }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Single Comment ── */
function Comment({ comment, currentUser, modoExploracion, comenzarAutenticacion, onReply, onEdit, onDelete, onReaction, alVerPerfil, esPregunta, esAutorPost, respuestaAceptadaId, onAceptarRespuesta }) {
  const { id, img, name, text, time, avatarUrl, replies = [], reaction: activeReaction, reactionCount = 0, mentionedUser } = comment;
  const esRespuestaAceptada = respuestaAceptadaId === id;

  const [showReactions,     setShowReactions]     = useState(false);
  const [replyText,         setReplyText]         = useState("");
  const [replyMedia,        setReplyMedia]        = useState([]);
  const [showReplyInput,    setShowReplyInput]    = useState(false);
  const [isEditing,         setIsEditing]         = useState(false);
  const [editText,          setEditText]          = useState(text);
  const [editMedia,         setEditMedia]         = useState([]);
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [lightboxIndex,     setLightboxIndex]     = useState(null);
  const [previewDismissed,  setPreviewDismissed]  = useState(false);

  const fileInputRefReply = useRef(null);
  const fileInputRefEdit  = useRef(null);
  const closeTimeoutRef   = useRef(null);

  const isOwner = !modoExploracion && (comment.esPropio === true || (currentUser && currentUser.nombre === name));
  const media   = comment.images || [];

  /* reactions */
  const handleMouseEnterLike  = () => { if (modoExploracion) return; if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); setShowReactions(true); };
  const handleMouseLeaveLike  = () => { closeTimeoutRef.current = setTimeout(() => setShowReactions(false), 200); };
  const handleMouseEnterPopup = () => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); };
  const handleMouseLeavePopup = () => { closeTimeoutRef.current = setTimeout(() => setShowReactions(false), 150); };
  const handleSelectReaction  = (reaction) => { onReaction(id, reaction); setShowReactions(false); };
  const handleLikeClick       = () => {
    if (modoExploracion) { comenzarAutenticacion(); return; }
    if (activeReaction) { onReaction(id, null); } else { onReaction(id, REACTIONS[0]); }
  };

  /* reply */
  const handleReplySubmit = () => {
    const trimmed = replyText.trim();
    if (!trimmed && replyMedia.length === 0) return;
    onReply(id, trimmed, replyMedia.length > 0 ? replyMedia : undefined);
    setReplyText(""); setReplyMedia([]); setShowReplyInput(false);
  };
  const handleReplyKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleReplySubmit(); }
    if (e.key === "Escape") { setShowReplyInput(false); setReplyText(""); setReplyMedia([]); }
  };
  const handleReplyPaste = async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith("image/") || item.type.startsWith("video/")) {
        e.preventDefault();
        const medio = await subirMedio(item.getAsFile());
        setReplyMedia((p) => [...p, medio]);
      }
    }
  };

  /* edit */
  const openEdit = () => {
    setEditText(text);
    setEditMedia(comment.images ? [...comment.images] : []);
    setIsEditing(true);
  };
  const handleEditSave = () => {
    const trimmed = editText.trim();
    if (!trimmed && editMedia.length === 0) return;
    onEdit(id, trimmed, editMedia);
    setIsEditing(false);
  };
  const handleEditCancel = () => { setEditText(text); setEditMedia([]); setIsEditing(false); };
  const handleEditKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleEditSave(); }
    if (e.key === "Escape") { handleEditCancel(); }
  };
  const handleEditPaste = async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith("image/") || item.type.startsWith("video/")) {
        e.preventDefault();
        const medio = await subirMedio(item.getAsFile());
        setEditMedia((p) => [...p, medio]);
      }
    }
  };

  const avatarSrc    = avatarUrl || `https://i.pravatar.cc/150?img=${img}`;
  const lightboxItems = media.map((m) => ({ src: m.url, tipo: m.tipo }));

  return (
    <div className="flex flex-col">
      <div className="flex gap-[10px] items-start">
        <img src={avatarSrc} alt={name}
          className="w-9 h-9 rounded-full shrink-0 object-cover cursor-pointer"
          onClick={() => alVerPerfil?.({ nombre: name, avatar: avatarSrc })} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            {/* comment-bubble: borde primario si está marcado como útil */}
            <div className="comment-bubble" style={esRespuestaAceptada ? { borderLeft: "3px solid var(--primary-color)" } : undefined}>
              <div
                className="text-[13px] font-bold text-[var(--text-dark)] mb-1 cursor-pointer"
                onClick={() => alVerPerfil?.({ nombre: name, avatar: avatarSrc })}
              >{name}</div>

              {isEditing ? (
                <div className="comment-edit-form">
                  <div className="comment-edit-container">
                    <textarea
                      className="comment-edit-textarea"
                      value={editText}
                      onChange={(e) => { setEditText(e.target.value); e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; }}
                      onKeyDown={handleEditKeyDown}
                      onPaste={handleEditPaste}
                      autoFocus
                      ref={(el) => { if (el) { el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; el.selectionStart = el.value.length; el.selectionEnd = el.value.length; } }}
                      rows={1}
                    />
                    {editMedia.length > 0 && (
                      <div className="flex flex-wrap px-2 pb-1">
                        {editMedia.map((src, i) => (
                          <MediaPreview key={i} medio={src} onQuitar={() => setEditMedia((p) => p.filter((_, j) => j !== i))} />
                        ))}
                      </div>
                    )}
                    <div className="comment-edit-bottom">
                      <CommentMediaIcons fileInputRef={fileInputRefEdit} onMedia={(src) => setEditMedia((p) => [...p, src])} />
                      <button className="comment-edit-send" onClick={handleEditSave}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <span className="comment-edit-hint">
                    Pulsa "Esc" para{" "}
                    <button className="comment-edit-cancel" onClick={handleEditCancel}>cancelar</button>.
                  </span>
                </div>
              ) : (
                <div>
                  <div className="text-[14px] text-[var(--text-dark)] leading-[1.5]">
                    {mentionedUser && <span className="text-[var(--primary-color)] font-semibold">{mentionedUser} </span>}
                    <RenderText text={text} />
                  </div>
                  {!previewDismissed && extraerPrimeraUrl(text) && (
                    <LinkPreview
                      url={extraerPrimeraUrl(text)}
                      onDismiss={() => setPreviewDismissed(true)}
                    />
                  )}
                  <CommentMediaBubble media={media} onOpen={(i) => setLightboxIndex(i)} />
                  {/* Badge de respuesta útil */}
                  {esRespuestaAceptada && (
                    <div className="flex items-center gap-[5px] mt-2 pt-2 border-t border-[var(--border-color)]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span className="text-[12px] font-semibold" style={{ color: "var(--primary-color)" }}>Marcado como útil</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {isOwner && <CommentMenu onEdit={openEdit} onDelete={() => setConfirmarEliminar(true)} />}
            {confirmarEliminar && (
              <ModalConfirmar
                titulo="¿Eliminar comentario?"
                mensaje="¿Seguro que quieres eliminar este comentario? Esta acción no se puede deshacer."
                labelOk="Eliminar" labelNo="Cancelar" variante="danger"
                onConfirm={() => onDelete(id)}
                onCerrar={() => setConfirmarEliminar(false)}
              />
            )}
          </div>

          <div className="flex gap-[14px] items-center">
            <span className="text-[12px] text-[var(--text-muted)]">{time}</span>
            <div className="relative inline-flex items-center gap-1"
              onMouseEnter={handleMouseEnterLike} onMouseLeave={handleMouseLeaveLike}>
              <button
                className="text-[12px] font-semibold text-[var(--text-muted)] bg-transparent border-none cursor-pointer p-0 transition-colors duration-300 hover:text-[var(--primary-color)]"
                onClick={handleLikeClick}
                style={activeReaction ? { color: activeReaction.color } : undefined}
              >
                {activeReaction ? activeReaction.label : "Me gusta"}
              </button>
              {reactionCount > 0 && (
                <span className="text-[11px] font-bold" style={{ color: activeReaction?.color || "var(--primary-color)" }}>
                  {reactionCount}
                </span>
              )}
              {!modoExploracion && showReactions && (
                <MiniReactionPopup onSelect={handleSelectReaction} onMouseEnter={handleMouseEnterPopup} onMouseLeave={handleMouseLeavePopup} />
              )}
            </div>
            <button
              className="text-[12px] font-semibold text-[var(--text-muted)] bg-transparent border-none cursor-pointer p-0 transition-colors duration-300 hover:text-[var(--primary-color)]"
              onClick={() => { if (modoExploracion) { comenzarAutenticacion(); return; } setShowReplyInput(!showReplyInput); setReplyText(""); }}
            >
              Responder
            </button>

            {/* Marcar como útil — solo visible al autor del post en preguntas */}
            {esPregunta && esAutorPost && !isOwner && (
              <button
                onClick={() => onAceptarRespuesta?.(
                  esRespuestaAceptada ? null : { id, autor: name, texto: text }
                )}
                className="flex items-center gap-[4px] text-[12px] font-semibold bg-transparent border-none cursor-pointer p-0 transition-colors duration-200"
                style={{ color: esRespuestaAceptada ? "var(--primary-color)" : "var(--text-muted)" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={esRespuestaAceptada ? 3 : 2} strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {esRespuestaAceptada ? "Útil" : "Marcar como útil"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Nested replies */}
      {replies.length > 0 && (
        <div className="ml-[46px] pl-4 border-l-2 border-[var(--border-color)] flex flex-col gap-3 mt-2 [@media(max-width:480px)]:ml-[30px] [@media(max-width:480px)]:pl-3">
          {replies.map((reply) => (
            <Comment key={reply.id} comment={reply} currentUser={currentUser}
              modoExploracion={modoExploracion} comenzarAutenticacion={comenzarAutenticacion}
              onReply={onReply} onEdit={onEdit} onDelete={onDelete} onReaction={onReaction} alVerPerfil={alVerPerfil}
              esPregunta={esPregunta} esAutorPost={esAutorPost}
              respuestaAceptadaId={respuestaAceptadaId} onAceptarRespuesta={onAceptarRespuesta} />
          ))}
        </div>
      )}

      {/* Reply input */}
      {showReplyInput && !modoExploracion && (
        <div className="flex gap-[10px] items-start mt-2 ml-[46px] pl-4 [@media(max-width:480px)]:ml-[30px] [@media(max-width:480px)]:pl-3">
          <img src={currentUser?.avatar || "https://i.pravatar.cc/150?img=12"} alt={currentUser?.nombre || "Tu"}
            className="w-7 h-7 rounded-full shrink-0 object-cover mt-2" />
          <div className="comment-input-container flex-1">
            <input type="text" className="comment-input"
              placeholder={`Responder a ${name}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={handleReplyKeyDown}
              onPaste={handleReplyPaste}
              autoFocus />
            {replyMedia.length > 0 && (
              <div className="flex flex-wrap px-2 pb-1">
                {replyMedia.map((src, i) => (
                  <MediaPreview key={i} medio={src} onQuitar={() => setReplyMedia((p) => p.filter((_, j) => j !== i))} />
                ))}
              </div>
            )}
            <div className="comment-input-bottom">
              <CommentMediaIcons fileInputRef={fileInputRefReply} onMedia={(src) => setReplyMedia((p) => [...p, src])} />
              <button className="comment-send-btn" onClick={handleReplySubmit}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && lightboxItems.length > 0 && (
        <Lightbox items={lightboxItems} indice={lightboxIndex} onCerrar={() => setLightboxIndex(null)} />
      )}
    </div>
  );
}

/* ── Comment input (nuevo comentario) ── */
function CommentInput({ onSend, modoExploracion, comenzarAutenticacion, currentUser }) {
  const [texto,  setTexto]  = useState("");
  const [media,  setMedia]  = useState([]);
  const fileInputRef = useRef(null);

  const handlePaste = async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith("image/") || item.type.startsWith("video/")) {
        e.preventDefault();
        const medio = await subirMedio(item.getAsFile());
        setMedia((p) => [...p, medio]);
      }
    }
  };

  const handleSend = () => {
    if (modoExploracion) { comenzarAutenticacion(); return; }
    const trimmed = texto.trim();
    if (!trimmed && media.length === 0) return;
    onSend(trimmed, media.length > 0 ? media : undefined);
    setTexto(""); setMedia([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="flex gap-3 items-start mt-2">
      <img src={currentUser?.avatar || "https://i.pravatar.cc/150?img=12"} alt=""
        className="w-9 h-9 rounded-full shrink-0 object-cover" />
      <div className="comment-input-container flex-1">
        <input type="text"
          placeholder={modoExploracion ? "Inicia sesion para comentar..." : "Escribe un comentario..."}
          className="comment-input"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={modoExploracion ? undefined : handlePaste}
          readOnly={modoExploracion}
          onClick={modoExploracion ? comenzarAutenticacion : undefined}
          style={modoExploracion ? { cursor: "not-allowed" } : undefined} />
        {media.length > 0 && (
          <div className="flex flex-wrap px-2 pb-1">
            {media.map((src, i) => <MediaPreview key={i} medio={src} onQuitar={() => setMedia((p) => p.filter((_, j) => j !== i))} />)}
          </div>
        )}
        <div className="comment-input-bottom">
          <CommentMediaIcons fileInputRef={fileInputRef} onMedia={(src) => setMedia((p) => [...p, src])} />
          <button className="comment-send-btn" onClick={handleSend}
            style={modoExploracion ? { cursor: "not-allowed", opacity: 0.6 } : undefined}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Comentarios ── */
function Comentarios({ visible, alVerPerfil, comentariosIniciales, esPregunta, esAutorPost, respuestaAceptadaId, onAceptarRespuesta, onAgregarComentario, onAgregarRespuesta, onEditarComentario, onEliminarComentario, onReaccionarComentario }) {
  const { modoExploracion, comenzarAutenticacionSocial: comenzarAutenticacion, userSocial, usuario } = useSesion();
  const { perfilSocial, tienePerfil } = usePerfilSocial();
  const onboardingSocialPendiente = Boolean(userSocial && tienePerfil === false);
  const requiereLoginRedSocial      = modoExploracion || !userSocial;
  const bloqueado                   = requiereLoginRedSocial || onboardingSocialPendiente;
  const alPedirAuth                 = requiereLoginRedSocial ? comenzarAutenticacion : () => {};

  // Los comentarios vienen del padre (persistentes) — ya no hay estado local
  const comentarios = comentariosIniciales ?? [];

  const findName = (comments, id) => {
    for (const c of comments) {
      if (c.id === id) return c.name;
      if (c.replies?.length) { const found = findName(c.replies, id); if (found) return found; }
    }
    return null;
  };

  const handleSend = (texto, media) => {
    onAgregarComentario?.({
      name: perfilSocial.nombreVisible,
      text: texto, time: "Ahora", avatarUrl: perfilSocial.avatar || "",
      replies: [], reaction: null, reactionCount: 0, esPropio: true,
      ...(media && media.length > 0 ? { images: media } : {}),
    });
  };

  const handleReply = (parentId, texto, media) => {
    if (!texto.trim() && (!media || media.length === 0)) return;
    onAgregarRespuesta?.(parentId, {
      name: perfilSocial.nombreVisible,
      text: texto.trim(), time: "Ahora", avatarUrl: perfilSocial.avatar || "",
      replies: [], reaction: null, reactionCount: 0, esPropio: true,
      mentionedUser: findName(comentarios, parentId),
      ...(media && media.length > 0 ? { images: media } : {}),
    });
  };

  const handleEdit    = (id, newText, newMedia) => onEditarComentario?.(id, newText, newMedia ?? []);
  const handleDelete  = (id) => onEliminarComentario?.(id);
  const handleReaction = (commentId, reaction) => onReaccionarComentario?.(commentId, reaction);

  if (!visible) return null;

  return (
    <div className="pt-4 flex flex-col gap-4">
      {comentarios.map((c) => (
        <Comment key={c.id} comment={c} currentUser={usuario}
          modoExploracion={bloqueado} comenzarAutenticacion={alPedirAuth}
          onReply={handleReply} onEdit={handleEdit} onDelete={handleDelete}
          onReaction={handleReaction} alVerPerfil={alVerPerfil}
          esPregunta={esPregunta} esAutorPost={esAutorPost}
          respuestaAceptadaId={respuestaAceptadaId} onAceptarRespuesta={onAceptarRespuesta} />
      ))}
      <CommentInput onSend={handleSend} modoExploracion={bloqueado}
        comenzarAutenticacion={alPedirAuth} currentUser={usuario} />
    </div>
  );
}

export default Comentarios;
