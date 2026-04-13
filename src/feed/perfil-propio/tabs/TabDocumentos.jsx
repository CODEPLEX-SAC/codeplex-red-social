import React from "react";
import { usePerfilSocial } from "../PerfilSocialContext";
import { card, tituloLg } from "../styles";
import SeccionDocumentos from "../documentos/SeccionDocumentos.tsx";

function TabDocumentos({ perfilSocial }) {
  const { actualizarPerfilSocial } = usePerfilSocial();
  return <div className="flex flex-col gap-4"><SeccionDocumentos perfilSocial={perfilSocial} actualizarPerfilSocial={actualizarPerfilSocial} card={card} tituloLg={tituloLg} /></div>;
}

export default TabDocumentos;


