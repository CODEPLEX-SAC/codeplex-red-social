import React from "react";
import { usePerfilSocial } from "../PerfilSocialContext";
import { card, tituloLg, inputCls } from "../styles";
import SeccionExperienciaLaboral from "../experiencia/SeccionExperienciaLaboral.tsx";
import SeccionFormacionAcademica from "../experiencia/SeccionFormacionAcademica";

function TabExperiencia({ perfilSocial }) {
  const { actualizarPerfilSocial } = usePerfilSocial();
  const props = { perfilSocial, actualizarPerfilSocial, card, tituloLg, inputCls };
  return <div className="flex flex-col gap-4"><SeccionExperienciaLaboral {...props} /><SeccionFormacionAcademica {...props} /></div>;
}

export default TabExperiencia;


