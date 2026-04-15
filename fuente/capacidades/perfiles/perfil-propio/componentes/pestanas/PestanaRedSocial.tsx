import React, { useState } from "react";
import PanelMisPreguntas from "@/capacidades/publicaciones/componentes/PanelMisPreguntas";
import PanelDatosPersonales from "@/capacidades/perfiles/perfil-propio/componentes/red-social/PanelDatosPersonales";
import PanelActividadReciente from "@/capacidades/perfiles/perfil-propio/componentes/red-social/PanelActividadReciente";
import { card } from "@/compartido/constantes/estilos.constantes";

const subTabClass = (activo) => `px-4 py-[7px] rounded-full text-[13px] font-semibold cursor-pointer border transition-all duration-200 ${activo ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]" : "bg-transparent text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"}`;

function PanelFotos({ publicaciones, card }) {
  const fotos = (publicaciones ?? [])
    .filter((p) => p.esPropia)
    .flatMap((p) => (p.medios ?? []).filter((m) => m.tipo === "imagen"))
    .slice(0, 9);

  return (
    <div className={card}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[13px] font-bold text-[var(--text-dark)] m-0">Fotos</h4>
        {fotos.length > 0 && (
          <button className="text-[12px] text-[var(--primary-color)] bg-transparent border-none cursor-pointer font-semibold p-0">
            Ver todas
          </button>
        )}
      </div>
      {fotos.length === 0 ? (
        <p className="text-[12px] text-[var(--text-muted)] m-0">Aún no has subido fotos.</p>
      ) : (
        <div className="grid grid-cols-3 gap-1">
          {fotos.map((foto, i) => (
            <div key={i} className="aspect-square rounded-[var(--radius-sm)] overflow-hidden bg-[var(--border-color)]">
              <img src={foto.url} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TabRedSocial({ perfilSocial, publicaciones, misPreguntas, onMarcarComentarioUtil, onCambiarEstado, onEditarInfo, onIrResumen, onIrExperiencia, alNavegar, onEditarPublicacion, onEliminarPublicacion, onAgregarComentario, onAgregarRespuesta, onEditarComentario, onEliminarComentario, onReaccionarComentario }) {
  const [subTab, setSubTab] = useState("actividad");
  const publicacionesPropias = (publicaciones ?? []).filter((p) => p.esPropia).slice().reverse();

  return (
    <div className="flex gap-4 items-start [@media(max-width:860px)]:flex-col">
      {/* Columna izquierda — oculta en responsivo */}
      <div className="w-[300px] shrink-0 flex flex-col gap-3 [@media(max-width:860px)]:hidden">
        <PanelDatosPersonales perfilSocial={perfilSocial} onEditarInfo={onEditarInfo} onIrResumen={onIrResumen} onIrExperiencia={onIrExperiencia} card={card} />
        <PanelFotos publicaciones={publicaciones} card={card} />
        <div className={card}>
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-[13px] font-bold text-[var(--text-dark)] m-0">Amigos</h4>
            <button className="text-[12px] text-[var(--primary-color)] bg-transparent border-none cursor-pointer font-semibold p-0">Ver todos</button>
          </div>
          <p className="text-[12px] text-[var(--text-muted)] m-0">0 amigos</p>
        </div>
      </div>
      {/* Columna derecha — full width en responsivo */}
      <div className="flex-1 min-w-0 flex flex-col gap-3 [@media(max-width:860px)]:w-full">
        <div className="flex gap-2">
          {[{ id: "actividad", label: "Actividad reciente" }, { id: "mis-preguntas", label: "Mis Preguntas" }].map(({ id, label }) => (
            <button key={id} className={subTabClass(subTab === id)} onClick={() => setSubTab(id)}>{label}</button>
          ))}
        </div>
        {subTab === "actividad" && (
          <PanelActividadReciente perfilSocial={perfilSocial} publicacionesPropias={publicacionesPropias} alNavegar={alNavegar} card={card}
            onMarcarComentarioUtil={onMarcarComentarioUtil} onCambiarEstado={onCambiarEstado}
            onEditarPublicacion={onEditarPublicacion} onEliminarPublicacion={onEliminarPublicacion}
            onAgregarComentario={onAgregarComentario} onAgregarRespuesta={onAgregarRespuesta}
            onEditarComentario={onEditarComentario} onEliminarComentario={onEliminarComentario}
            onReaccionarComentario={onReaccionarComentario}
          />
        )}
        {subTab === "mis-preguntas" && (
          <PanelMisPreguntas misPreguntas={misPreguntas} onMarcarComentarioUtil={onMarcarComentarioUtil} onCambiarEstado={onCambiarEstado} />
        )}
      </div>
    </div>
  );
}

export default TabRedSocial;

