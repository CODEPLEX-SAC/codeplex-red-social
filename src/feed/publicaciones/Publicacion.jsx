import React, { useState } from "react";
import AccionesPublicacion from "./AccionesPublicacion";
import Comentarios from "./Comentarios";

function Publicacion({ post, alVerPerfil }) {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => setShowComments((prev) => !prev);

  const avatarSrc = `https://i.pravatar.cc/150?img=${post.avatarImg}`;
  const handleVerAutor = () => alVerPerfil?.({ nombre: post.author, avatar: avatarSrc });

  return (
    <div className="bg-[var(--white-color)] px-8 py-7 rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] mb-5 [@media(max-width:480px)]:px-[15px] [@media(max-width:480px)]:py-5">

      {/* Cabecera: avatar + nombre + tiempo */}
      <div className="flex justify-between items-center mb-[18px]">
        <div className="flex items-center gap-[14px]">
          <img
            src={avatarSrc}
            alt={post.author}
            className="w-12 h-12 rounded-full object-cover cursor-pointer"
            onClick={handleVerAutor}
          />
          <div>
            <div
              className="font-semibold text-[15px] text-[var(--text-dark)] mb-1 cursor-pointer"
              onClick={handleVerAutor}
            >{post.author}</div>
            <div className="text-[13px] text-[var(--text-gray)]">{post.time}</div>
          </div>
        </div>
        <button className="bg-transparent border-none cursor-pointer text-[var(--text-muted)] text-[24px] p-1 px-2 transition-colors duration-300 hover:text-[var(--text-dark)]">&#x22EF;</button>
      </div>

      {/* Texto + hashtags */}
      <div className="mb-[18px]">
        <p className="text-[var(--text-dark)] leading-[1.6] text-[15px] mb-3">{post.text}</p>
        {post.hashtags?.length > 0 && (
          <div className="flex gap-[10px] flex-wrap">
            {post.hashtags.map((tag) => (
              <span key={tag} className="text-[var(--primary-color)] font-semibold text-[14px] cursor-pointer transition-opacity duration-300 hover:opacity-80">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Video — full width sin padding lateral */}
      {post.videoSrc && (
        <div className="-mx-8 [@media(max-width:480px)]:-mx-[15px] my-[18px] overflow-hidden bg-black">
          <video
            className="w-full block aspect-video object-contain bg-[#0f0f0f]"
            src={post.videoSrc}
            controls
            preload="metadata"
            poster={post.videoPoster}
          />
        </div>
      )}

      {/* Imágenes — full width sin padding lateral, grid estilo Facebook */}
      {post.images && post.images.length > 0 && (
        <div className="-mx-8 [@media(max-width:480px)]:-mx-[15px] my-[18px] overflow-hidden">

          {/* 1 imagen: ancho completo */}
          {post.images.length === 1 && (
            <img
              src={post.images[0]}
              alt=""
              className="w-full block object-cover max-h-[560px]"
            />
          )}

          {/* 2 imágenes: lado a lado */}
          {post.images.length === 2 && (
            <div className="grid grid-cols-2 gap-[2px]">
              {post.images.map((src, i) => (
                <img key={i} src={src} alt="" className="w-full aspect-square object-cover block" />
              ))}
            </div>
          )}

          {/* 3 imágenes: 1 grande izquierda + 2 apiladas derecha */}
          {post.images.length === 3 && (
            <div className="grid grid-cols-2 gap-[2px] h-[400px]">
              <img src={post.images[0]} alt="" className="w-full h-full object-cover block row-span-2" />
              <img src={post.images[1]} alt="" className="w-full h-full object-cover block" />
              <img src={post.images[2]} alt="" className="w-full h-full object-cover block" />
            </div>
          )}

          {/* 4+ imágenes: grilla 2×2, overlay "+N" en la última */}
          {post.images.length >= 4 && (
            <div className="grid grid-cols-2 gap-[2px]">
              {post.images.slice(0, 4).map((src, i) => (
                <div key={i} className="relative aspect-square">
                  <img src={src} alt="" className="w-full h-full object-cover block" />
                  {i === 3 && post.images.length > 4 && (
                    <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                      <span className="text-white text-[28px] font-bold">+{post.images.length - 4}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* Footer: reacciones + comentarios */}
      <div className="mt-4 pt-3 border-t border-[var(--border-color)]">
        <AccionesPublicacion
          initialLikeCount={post.likeCount}
          onToggleComments={toggleComments}
        />
        <div className="h-px bg-[var(--border-color)] my-1"></div>
        <Comentarios visible={showComments} alVerPerfil={alVerPerfil} />
      </div>

    </div>
  );
}

export default Publicacion;
