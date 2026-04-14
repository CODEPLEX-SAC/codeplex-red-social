import React from "react";
import SidebarProfile from "../../../identidad/cuenta/SidebarProfile";
import SidebarMenu from "./SidebarMenu";

function Sidebar({ estaAbierto, alCerrar, vistaActiva, alNavegar, appsActivas = [] }) {
  const handleNavegar = (vista) => {
    alNavegar(vista);
    if (window.innerWidth < 1300) {
      alCerrar();
    }
  };

  return (
    <>
      {estaAbierto && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[599] [@media(min-width:1300px)]:hidden"
          onClick={alCerrar}
        />
      )}
      <aside
        className={`
          w-[260px] [@media(min-width:1300px)]:w-[280px]
          bg-[var(--white-color)]
          fixed left-0 top-0
          h-[100dvh]
          py-[30px]
          overflow-y-auto
          shadow-[2px_0_5px_rgba(0,0,0,0.05)]
          transition-transform duration-300
          z-[600]
          [&::-webkit-scrollbar]:w-[6px]
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-[var(--border-color)]
          [&::-webkit-scrollbar-thumb]:rounded-[3px]
          ${estaAbierto ? "translate-x-0" : "-translate-x-full [@media(min-width:1300px)]:translate-x-0"}
        `}
      >
        <SidebarProfile />
        <SidebarMenu
          vistaActiva={vistaActiva}
          alNavegar={handleNavegar}
          appsActivas={appsActivas}
        />
      </aside>
    </>
  );
}

export default Sidebar;
