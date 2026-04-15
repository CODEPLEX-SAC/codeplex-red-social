import React from "react";
import Icon from "@/compartido/interfaz/primitivas/Icono";
import { REACTIONS } from "@/capacidades/publicaciones/contratos/publicaciones.contratos";

function PanelReacciones({ onSelect, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className="reactions-popup"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {REACTIONS.map((reaction) => (
        <button
          key={reaction.label}
          className="reaction-option"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(reaction);
          }}
        >
          <Icon name={reaction.icon} size={28} color={reaction.color} />
          <span
            className="reaction-label"
            style={{ color: reaction.color, boxShadow: `0 4px 12px ${reaction.color}33` }}
          >
            {reaction.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default PanelReacciones;
