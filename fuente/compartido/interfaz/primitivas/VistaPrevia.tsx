import React, { useState, useEffect } from "react";

/**
 * ═══════════════════════════════════════════════════════════════════
 *  COMPONENTE: LinkPreview
 *  Contexto acotado: Publicaciones · Comentarios · Respuestas
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Estrategia de fetch de metadatos Open Graph:
 *    1. YouTube / YouTube Shorts → oEmbed nativo (sin CORS, sin API key)
 *    2. Vimeo                    → oEmbed nativo
 *    3. Cualquier otro dominio   → api.microlink.io (proxy gratuito)
 *
 * ───────────────────────────────────────────────────────────────────
 *  PARA EL EQUIPO BACKEND
 * ───────────────────────────────────────────────────────────────────
 *  Reemplazar `fetchMeta` por vuestro propio scraper:
 *    GET /api/og?url=<url_encoded>
 *    Respuesta: { title, description, image, publisher }
 * ───────────────────────────────────────────────────────────────────
 */

/* ── Cache en memoria (por sesión, máx 100 entradas — LRU simple) ── */
const _cache    = {};
const _cacheKeys = [];
const CACHE_MAX  = 100;

function guardarEnCache(url, data) {
  if (_cacheKeys.length >= CACHE_MAX) {
    const oldest = _cacheKeys.shift();
    delete _cache[oldest];
  }
  _cache[url] = data;
  _cacheKeys.push(url);
}

/* ── Helpers de detección ── */
const esYoutube = (url) => /youtube\.com|youtu\.be/.test(url);
const esVimeo   = (url) => /vimeo\.com/.test(url);

function youtubeVideoId(url) {
  const m = url.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

/* ── Fetch de metadatos según dominio ── */
async function fetchMeta(url) {
  if (esYoutube(url)) {
    const res  = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
    if (!res.ok) throw new Error("oembed failed");
    const data = await res.json();
    const id   = youtubeVideoId(url);
    return {
      title:       data.title,
      description: data.author_name ? `Canal: ${data.author_name}` : undefined,
      image:       id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : data.thumbnail_url,
      publisher:   "YouTube",
    };
  }

  if (esVimeo(url)) {
    const res  = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`);
    if (!res.ok) throw new Error("oembed failed");
    const data = await res.json();
    return {
      title:       data.title,
      description: data.author_name ? `Por: ${data.author_name}` : undefined,
      image:       data.thumbnail_url,
      publisher:   "Vimeo",
    };
  }

  /* Fallback genérico — microlink.io (proxy público gratuito) */
  const res  = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error("microlink failed");
  const json = await res.json();
  if (json.status !== "success") throw new Error("no data");
  const d = json.data;
  return {
    title:       d.title,
    description: d.description,
    image:       d.image?.url,
    publisher:   d.publisher,
  };
}

/* ── Extrae la primera URL de un texto ── */
export function extraerPrimeraUrl(text) {
  if (!text) return null;
  const m = /https?:\/\/[^\s<>"{}|\\^[\]`]+/.exec(text);
  return m ? m[0] : null;
}

/* ── Componente ── */
function LinkPreview({ url, onDismiss }) {
  const [meta,     setMeta]     = useState(_cache[url] ?? null);
  const [cargando, setCargando] = useState(_cache[url] === undefined);

  useEffect(() => {
    if (!url || _cache[url] !== undefined) return;
    let activo = true;
    setCargando(true);
    fetchMeta(url)
      .then((data) => {
        guardarEnCache(url, data);
        if (activo) { setMeta(data); setCargando(false); }
      })
      .catch(() => {
        guardarEnCache(url, false);
        if (activo) setCargando(false);
      });
    return () => { activo = false; };
  }, [url]);

  const dominio = (() => {
    try { return new URL(url).hostname.replace(/^www\./, ""); }
    catch { return url; }
  })();

  /* Skeleton mientras carga */
  if (cargando) {
    return (
      <div className="mt-2 rounded-[var(--radius-sm)] overflow-hidden border border-[var(--border-color)] animate-pulse"
        style={{ maxWidth: "460px" }}>
        <div className="w-full bg-[var(--hover-color)]" style={{ height: "140px" }} />
        <div className="px-3 py-[10px] flex flex-col gap-2">
          <div className="h-[10px] bg-[var(--hover-color)] rounded w-1/4" />
          <div className="h-[13px] bg-[var(--hover-color)] rounded w-4/5" />
          <div className="h-[11px] bg-[var(--hover-color)] rounded w-3/5" />
        </div>
      </div>
    );
  }

  if (!meta) return null;

  return (
    <div className="mt-2" style={{ maxWidth: "460px" }}>
      <a href={url} target="_blank" rel="noopener noreferrer" className="block no-underline">
        <div className="rounded-[var(--radius-sm)] overflow-hidden border border-[var(--border-color)] transition-colors duration-150 hover:bg-[var(--hover-color)]">
          {meta.image && (
            <img src={meta.image} alt=""
              className="w-full block object-cover"
              style={{ maxHeight: "220px" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          )}
          <div className="px-3 py-[10px]">
            <p className="text-[11px] text-[var(--text-muted)] m-0 uppercase tracking-wide leading-none">
              {meta.publisher || dominio}
            </p>
            {meta.title && (
              <p className="text-[13px] font-semibold text-[var(--text-dark)] m-0 mt-1 leading-[1.35]"
                style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {meta.title}
              </p>
            )}
            {meta.description && (
              <p className="text-[12px] text-[var(--text-muted)] m-0 mt-[3px] leading-[1.4]"
                style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {meta.description}
              </p>
            )}
          </div>
        </div>
      </a>
      {onDismiss && (
        <button onClick={onDismiss}
          className="text-[12px] text-[var(--text-muted)] bg-transparent border-none cursor-pointer p-0 mt-[6px] transition-colors duration-150 hover:text-[var(--text-dark)] hover:underline">
          Suprimir vista previa
        </button>
      )}
    </div>
  );
}

export default LinkPreview;
