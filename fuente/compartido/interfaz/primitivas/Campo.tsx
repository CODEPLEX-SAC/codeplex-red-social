import React from "react";

const labelCls = "block text-[12px] font-semibold text-[var(--text-dark)] mb-[6px]";

export default function Field({ label, children, className = "" }) {
  return (
    <div className={className}>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}
