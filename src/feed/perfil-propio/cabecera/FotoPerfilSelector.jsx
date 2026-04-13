import React from "react";

export default function FotoPerfilSelector({ perfilSocial, menuFotoAbierto, setMenuFotoAbierto, lightboxFotoAbierto, setLightboxFotoAbierto, fileInputRef, menuFotoRef, onElegirFoto }) {
  return (
    <div className="relative shrink-0" ref={menuFotoRef}>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onElegirFoto} />
      <button onClick={() => setMenuFotoAbierto((v) => !v)} className="block rounded-full cursor-pointer border-0 bg-transparent p-0 focus:outline-none">
        {perfilSocial.avatar ? <img src={perfilSocial.avatar} alt="Avatar" className="w-[72px] h-[72px] rounded-full object-cover border-2 border-[var(--border-color)] hover:opacity-90 transition-opacity" /> : <div className="w-[72px] h-[72px] rounded-full border-2 border-dashed border-[var(--border-color)] bg-[var(--background-color)] flex items-center justify-center text-[var(--text-muted)]">+</div>}
      </button>
      {menuFotoAbierto && <div className="absolute top-[80px] left-0 z-50 bg-[var(--white-color)] border border-[var(--border-color)] rounded-[var(--radius-md)] shadow-[var(--shadow-md)] overflow-hidden min-w-[190px]">{perfilSocial.avatar && <button onClick={() => { setLightboxFotoAbierto(true); setMenuFotoAbierto(false); }} className="w-full px-4 py-[10px] text-[13px] text-left bg-transparent border-none cursor-pointer hover:bg-[var(--hover-color)]">Ver foto del perfil</button>}<button onClick={() => { fileInputRef.current?.click(); setMenuFotoAbierto(false); }} className="w-full px-4 py-[10px] text-[13px] text-left bg-transparent border-none cursor-pointer hover:bg-[var(--hover-color)]">Elegir foto del perfil</button></div>}
      {lightboxFotoAbierto && perfilSocial.avatar && <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80" onClick={() => setLightboxFotoAbierto(false)}><img src={perfilSocial.avatar} alt="Foto de perfil" className="max-w-[90vw] max-h-[85vh] rounded-[var(--radius-md)] object-contain shadow-2xl" /></div>}
    </div>
  );
}

