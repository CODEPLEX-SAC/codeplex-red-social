import React from "react";
import { usePerfilSocial } from "@/capacidades/perfiles/perfil-propio/ganchos/usarContextoPerfilSocial";
import { card, tituloLg } from "@/compartido/constantes/estilos.constantes";
import SeccionDocumentos from "@/capacidades/perfiles/perfil-propio/componentes/documentos/SeccionDocumentos";

function TabDocumentos({ perfilSocial }) {
  const { actualizarPerfilSocial } = usePerfilSocial();
  return <div className="flex flex-col gap-4"><SeccionDocumentos perfilSocial={perfilSocial} actualizarPerfilSocial={actualizarPerfilSocial} card={card} tituloLg={tituloLg} /></div>;
}

export default TabDocumentos;


