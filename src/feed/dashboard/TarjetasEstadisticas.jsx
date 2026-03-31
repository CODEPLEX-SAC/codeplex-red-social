import React from "react";
import Icon from "../../ui/Icon/Icon";

const STATS = [
  {
    title:    "Tus post",
    icon:     "tusPost",
    iconSize: 18,
    value:    10,
    cardStyle: {
      background: "linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%)",
      border:     "0.5px solid rgba(124, 58, 237, 0.18)",
    },
    iconBg: "#7C3AED",
    accent: "#7C3AED",
  },
  {
    title:    "Tus Videos",
    icon:     "videos",
    iconSize: 20,
    value:    10,
    cardStyle: {
      background: "linear-gradient(135deg, #e0e7ff 0%, #eef2ff 100%)",
      border:     "0.5px solid rgba(79, 70, 229, 0.18)",
    },
    iconBg: "#4F46E5",
    accent: "#4F46E5",
  },
  {
    title:    "Compartidos",
    icon:     "compartidos",
    iconSize: 18,
    value:    10,
    cardStyle: {
      background: "linear-gradient(135deg, #e8e4f8 0%, #f1effe 100%)",
      border:     "0.5px solid rgba(109, 40, 217, 0.18)",
    },
    iconBg: "#6D28D9",
    accent: "#6D28D9",
  },
];

function StatCard({ title, icon, iconSize, value, cardStyle, iconBg, accent }) {
  return (
    <div
      className="p-[25px] rounded-[var(--radius-md)] relative overflow-hidden [@media(max-width:480px)]:p-5"
      style={cardStyle}
    >
      {/* Título + ícono */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[14px] font-semibold" style={{ color: accent }}>
          {title}
        </span>
        <div
          className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          <Icon name={icon} size={iconSize} color="white" />
        </div>
      </div>

      {/* Número */}
      <div className="text-[32px] font-bold text-[var(--text-dark)] mb-3 [@media(max-width:480px)]:text-[28px]">
        {value}
      </div>

      {/* Badge de crecimiento */}
      <span className="inline-flex items-center gap-1 bg-[var(--success-bg)] text-[var(--success-color)] text-[12px] font-semibold px-[10px] py-[4px] rounded-full">
        <Icon name="flecha" size={14} />
        +5% este mes
      </span>
    </div>
  );
}

function TarjetasEstadisticas() {
  return (
    <div className="grid grid-cols-3 gap-5 min-w-0 [@media(max-width:768px)]:grid-cols-1 [@media(max-width:768px)]:gap-[15px]">
      {STATS.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

export default TarjetasEstadisticas;
