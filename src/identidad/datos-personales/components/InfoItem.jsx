import React from "react";

export default function InfoItem({ etiqueta, valor }) {
  if (!valor) return null;
  return (
    <div className="grid py-[6px]" style={{ gridTemplateColumns: "88px 1fr", gap: "0 10px" }}>
      <span className="text-[14px] font-semibold text-[var(--text-dark)] leading-snug">{etiqueta}</span>
      <span className="text-[14px] text-[var(--text-muted)] leading-snug break-words">: {valor}</span>
    </div>
  );
}
