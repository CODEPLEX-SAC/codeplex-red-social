import React from "react";
import { usePerfilSocial } from "@/capacidades/perfiles/perfil-propio/ganchos/usarContextoPerfilSocial";
import { card, tituloLg, inputCls } from "@/compartido/constantes/estilos.constantes";
import SeccionExperienciaLaboral from "@/capacidades/perfiles/perfil-propio/componentes/experiencia/SeccionExperienciaLaboral";
import SeccionFormacionAcademica from "@/capacidades/perfiles/perfil-propio/componentes/experiencia/SeccionFormacionAcademica";

function TabExperiencia({ perfilSocial }) {
  const { actualizarPerfilSocial } = usePerfilSocial();
  const props = { perfilSocial, actualizarPerfilSocial, card, tituloLg, inputCls };
  return <div className="flex flex-col gap-4"><SeccionExperienciaLaboral {...props} /><SeccionFormacionAcademica {...props} /></div>;
}

export default TabExperiencia;


