import React from "react";

export default function TabNotificaciones({ elementosNotificacion, mapaPreferenciasActivas, alAlternarPreferencia, deshabilitado }) {
  return (
    <div className="flex flex-col gap-3">
      {elementosNotificacion.map(({ id, label }) => (
        <label
          key={id}
          className={`flex items-center justify-between px-4 py-[11px] bg-[var(--white-color)] border border-[var(--border-color)] rounded-[var(--radius-sm)] ${
            deshabilitado ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-[var(--primary-color)] transition-colors duration-200"
          }`}
          onClick={() => alAlternarPreferencia(id)}
        >
          <span className="text-[14px] font-medium text-[var(--text-dark)]">{label}</span>
          <label className="toggle-switch shrink-0" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={mapaPreferenciasActivas[id]}
              onChange={() => alAlternarPreferencia(id)}
              disabled={deshabilitado}
            />
            <span className="toggle-slider" />
          </label>
        </label>
      ))}
    </div>
  );
}
