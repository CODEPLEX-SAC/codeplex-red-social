import React from "react";

const TABS = [
  { id: "post",          label: "Post" },
  { id: "videos",        label: "Videos" },
  { id: "noticias",      label: "Noticias" },
  { id: "mis-preguntas", label: "Mis Preguntas" },
];

const tabClass = (activo) =>
  `pb-3 pt-[2px] cursor-pointer font-semibold text-[15px] border-b-[3px] transition-all duration-300 ${
    activo
      ? "text-[var(--primary-color)] border-b-[var(--primary-color)]"
      : "text-[var(--text-muted)] border-b-transparent hover:text-[var(--primary-color)]"
  }`;

function PestanasFeed({ activeTab, onTabChange }) {
  return (
    <div className="bg-[var(--white-color)] px-[25px] pt-4 rounded-[var(--radius-md)_var(--radius-md)_0_0] shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-[var(--border-color)]">
      <div className="flex gap-[30px]">
        {TABS.map(({ id, label }) => (
          <div key={id} className={tabClass(activeTab === id)} onClick={() => onTabChange(id)}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PestanasFeed;
