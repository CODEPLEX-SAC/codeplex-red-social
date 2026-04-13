import React, { useEffect, useState } from "react";

const MAX_PRESENTACION = 101;

export default function SeccionPresentacion({ perfilSocial, actualizarPerfilSocial, card, tituloLg }) {
  const [editandoPresentacion, setEditandoPresentacion] = useState(false);
  const [presentacionEnEdicion, setPresentacionEnEdicion] = useState(perfilSocial.bioPública || "");
  useEffect(() => { setPresentacionEnEdicion(perfilSocial.bioPública || ""); }, [perfilSocial.bioPública]);
  const confirmarGuardado = () => { actualizarPerfilSocial({ bioPública: presentacionEnEdicion.trim() }); setEditandoPresentacion(false); };
  const cancelarEdicion = () => { setPresentacionEnEdicion(perfilSocial.bioPública || ""); setEditandoPresentacion(false); };
  return <div className={card}><div className="flex items-center justify-between mb-3"><h4 className={tituloLg}>Presentación</h4></div>{editandoPresentacion ? <div className="flex flex-col gap-2"><textarea className="w-full px-3 py-[10px] border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[13.5px] bg-[var(--white-color)] text-[var(--text-dark)] resize-none" rows={4} maxLength={MAX_PRESENTACION} value={presentacionEnEdicion} onChange={(e) => setPresentacionEnEdicion(e.target.value)} /><div className="flex items-center justify-between"><span className="text-[12px] text-[var(--text-muted)]">{presentacionEnEdicion.length}/{MAX_PRESENTACION}</span><div className="flex gap-2"><button onClick={cancelarEdicion} className="px-4 py-[6px] text-[13px] font-semibold border border-[var(--border-color)] rounded-[var(--radius-sm)]">Cancelar</button><button onClick={confirmarGuardado} className="px-4 py-[6px] text-[13px] font-semibold text-white rounded-[var(--radius-sm)]" style={{ background: "var(--primary-color)" }}>Guardar</button></div></div></div> : perfilSocial.bioPública ? <p className="text-[13.5px] text-[var(--text-dark)] leading-[1.6] m-0">{perfilSocial.bioPública}</p> : <button onClick={() => setEditandoPresentacion(true)} className="flex items-center gap-3 w-full p-3 rounded-[var(--radius-sm)] border border-dashed border-[var(--border-color)] bg-[var(--background-color)]">Información sobre ti</button>}</div>;
}

