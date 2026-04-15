import React, { useEffect, useRef, useState } from "react";
import { usePerfilSocial } from "@/capacidades/perfiles/perfil-propio/ganchos/usarContextoPerfilSocial";
import { ModalAuthRedSocial } from "@/capacidades/identidad/sesion/ModalAuthRedSocial";
import CabeceraPerfilPropio from "@/capacidades/perfiles/perfil-propio/componentes/cabecera/CabeceraPerfilPropio";
import TabRedSocial from "@/capacidades/perfiles/perfil-propio/componentes/pestanas/PestanaRedSocial";
import TabResumen from "@/capacidades/perfiles/perfil-propio/componentes/pestanas/PestanaResumen";
import TabExperiencia from "@/capacidades/perfiles/perfil-propio/componentes/pestanas/PestanaExperiencia";
import TabDocumentos from "@/capacidades/perfiles/perfil-propio/componentes/pestanas/PestanaDocumentos";
import TabMetricas from "@/capacidades/perfiles/perfil-propio/componentes/pestanas/PestanaMetricas";

function PerfilPropio({ onVolver, alNavegar, publicaciones = [], misPreguntas = [], onMarcarComentarioUtil, onCambiarEstado, onEditarPublicacion, onEliminarPublicacion, onAgregarComentario, onAgregarRespuesta, onEditarComentario, onEliminarComentario, onReaccionarComentario }) {
  const { perfilSocial, actualizarPerfilSocial } = usePerfilSocial();
  const [tabActiva, setTabActiva] = useState("red-social");
  const [modoEdicionIdentidad, setModoEdicionIdentidad] = useState(false);
  const [modalVerificacionAbierto, setModalVerificacionAbierto] = useState(false);
  const [menuFotoAbierto, setMenuFotoAbierto] = useState(false);
  const [lightboxFotoAbierto, setLightboxFotoAbierto] = useState(false);
  const [identidadEnEdicion, setIdentidadEnEdicion] = useState({ nombre: perfilSocial.nombre || "", apellido: perfilSocial.apellido || "" });
  const menuFotoRef = useRef(null); const fileInputRef = useRef(null);
  useEffect(() => { if (!menuFotoAbierto) return; const handler = (e) => { if (menuFotoRef.current && !menuFotoRef.current.contains(e.target)) setMenuFotoAbierto(false); }; document.addEventListener("mousedown", handler); return () => document.removeEventListener("mousedown", handler); }, [menuFotoAbierto]);
  const actualizarCampo = (campo, valor) => setIdentidadEnEdicion((prev) => ({ ...prev, [campo]: valor }));
  const onGuardarIdentidad = () => { const nombreVisible = [identidadEnEdicion.nombre, identidadEnEdicion.apellido].filter(Boolean).join(" ").trim() || null; actualizarPerfilSocial({ nombre: identidadEnEdicion.nombre.trim(), apellido: identidadEnEdicion.apellido.trim(), nombreVisible }); setModoEdicionIdentidad(false); };
  const onCancelarIdentidad = () => { setIdentidadEnEdicion({ nombre: perfilSocial.nombre || "", apellido: perfilSocial.apellido || "" }); setModoEdicionIdentidad(false); };
  const onElegirFoto = (e) => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = (ev) => { actualizarPerfilSocial({ avatar: ev.target.result }); setMenuFotoAbierto(false); }; reader.readAsDataURL(file); e.target.value = ""; };
  const publicacionesPropias = publicaciones.filter((p) => p.esPropia);

  return <div className="w-full"><div className="flex flex-col bg-[var(--background-color)] w-full gap-4"><CabeceraPerfilPropio perfilSocial={perfilSocial} publicacionesPropias={publicacionesPropias} onVolver={onVolver} tabActiva={tabActiva} setTabActiva={setTabActiva} modoEdicionIdentidad={modoEdicionIdentidad} setModoEdicionIdentidad={setModoEdicionIdentidad} identidadEnEdicion={identidadEnEdicion} actualizarCampo={actualizarCampo} onCancelarIdentidad={onCancelarIdentidad} onGuardarIdentidad={onGuardarIdentidad} menuFotoAbierto={menuFotoAbierto} setMenuFotoAbierto={setMenuFotoAbierto} lightboxFotoAbierto={lightboxFotoAbierto} setLightboxFotoAbierto={setLightboxFotoAbierto} fileInputRef={fileInputRef} menuFotoRef={menuFotoRef} onElegirFoto={onElegirFoto} onAbrirModalVerificacion={() => setModalVerificacionAbierto(true)} />{tabActiva === "red-social" && <TabRedSocial perfilSocial={perfilSocial} publicaciones={publicaciones} misPreguntas={misPreguntas} onMarcarComentarioUtil={onMarcarComentarioUtil} onCambiarEstado={onCambiarEstado} onEditarInfo={() => setModoEdicionIdentidad(true)} onIrResumen={() => setTabActiva("resumen")} onIrExperiencia={() => setTabActiva("experiencia")} alNavegar={alNavegar} onEditarPublicacion={onEditarPublicacion} onEliminarPublicacion={onEliminarPublicacion} onAgregarComentario={onAgregarComentario} onAgregarRespuesta={onAgregarRespuesta} onEditarComentario={onEditarComentario} onEliminarComentario={onEliminarComentario} onReaccionarComentario={onReaccionarComentario} />}{tabActiva === "resumen" && <TabResumen perfilSocial={perfilSocial} />}{tabActiva === "experiencia" && <TabExperiencia perfilSocial={perfilSocial} />}{tabActiva === "documentos" && <TabDocumentos perfilSocial={perfilSocial} />}{tabActiva === "metricas" && <TabMetricas perfilSocial={perfilSocial} publicaciones={publicaciones} misPreguntas={misPreguntas} onEditarInfo={() => setModoEdicionIdentidad(true)} />}{modalVerificacionAbierto && <ModalAuthRedSocial modoVerificacion onConfirmar={() => setModalVerificacionAbierto(false)} onCerrar={() => setModalVerificacionAbierto(false)} />}</div></div>;
}

export default PerfilPropio;

