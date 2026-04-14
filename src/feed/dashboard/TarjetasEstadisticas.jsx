import React from "react";
import Icon from "../../ui/Icon/Icon";

const STATS = [
  {
    title:    "Tus post",
    icon:     "tusPost",
    iconSize: 18,
    value:    "10",
    stat:     "+5",
    statLabel:"este mes",
    cardStyle: {
      background: "linear-gradient(to right, var(--primary-bg, rgba(72,127,255,0.08)), var(--white-color))",
      border:     "1px solid var(--border-color)",
    },
    iconBg: "var(--primary-color)",
    accent: "var(--primary-color)",
  },
  {
    title:    "Tus Videos",
    icon:     "videos",
    iconSize: 20,
    value:    "10",
    stat:     "+5",
    statLabel:"este mes",
    cardStyle: {
      background: "linear-gradient(to right, var(--error-bg, rgba(239,68,68,0.08)), var(--white-color))",
      border:     "1px solid var(--border-color)",
    },
    iconBg: "var(--error-color)",
    accent: "var(--error-color)",
  },
  {
    title:    "Compartidos",
    icon:     "compartidos",
    iconSize: 18,
    value:    "10",
    stat:     "+5",
    statLabel:"este mes",
    cardStyle: {
      background: "linear-gradient(to right, var(--secondary-bg, rgba(139,92,246,0.08)), var(--white-color))",
      border:     "1px solid var(--border-color)",
    },
    iconBg: "var(--secondary-color)",
    accent: "var(--secondary-color)",
  },
];

function StatCard({ title, icon, iconSize, value, stat, statLabel, cardStyle, iconBg, accent }) {
  return (
    <div
      className="p-[20px] rounded-[var(--radius-md)] flex flex-col gap-3"
      style={cardStyle}
    >
      {/* Fila principal: texto izquierda + círculo derecha */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[13px] font-medium text-[var(--text-muted)] leading-none">{title}</span>
          <span className="text-[28px] font-bold text-[var(--text-dark)] leading-tight">{value}</span>
        </div>
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          <Icon name={icon} size={iconSize} color="white" />
        </div>
      </div>

      {/* Stat inferior */}
      <div className="flex items-center gap-[5px]">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <polyline points="1,9 5,3 8,6 11,2" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[12px] font-semibold" style={{ color: accent }}>{stat}</span>
        <span className="text-[12px] text-[var(--text-muted)]">{statLabel}</span>
      </div>
    </div>
  );
}

function TarjetasEstadisticas() {
  return (
    <div className="grid grid-cols-3 gap-5 min-w-0 items-start [@media(max-width:768px)]:grid-cols-1 [@media(max-width:768px)]:gap-[15px]">
      {STATS.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

export default TarjetasEstadisticas;
