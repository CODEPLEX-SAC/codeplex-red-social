import React from "react";

export default function Field({ etiqueta, ocuparDosColumnas, children }) {
  return (
    <div className={ocuparDosColumnas ? "col-span-2 [@media(max-width:560px)]:col-span-1" : ""}>
      <label className="block text-[13px] font-semibold text-[var(--text-dark)] mb-[6px]">{etiqueta}</label>
      {children}
    </div>
  );
}
