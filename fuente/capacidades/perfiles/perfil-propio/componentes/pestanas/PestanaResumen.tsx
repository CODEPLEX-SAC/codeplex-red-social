import React from "react";
import { usePerfilSocial } from "@/capacidades/perfiles/perfil-propio/ganchos/usarContextoPerfilSocial";
import { card, tituloLg, inputCls } from "@/compartido/constantes/estilos.constantes";
import SeccionPresentacion from "@/capacidades/perfiles/perfil-propio/componentes/resumen/SeccionPresentacion";
import SeccionDetallesFijados from "@/capacidades/perfiles/perfil-propio/componentes/resumen/SeccionDetallesFijados";
import SeccionTitulosVerificados from "@/capacidades/perfiles/perfil-propio/componentes/resumen/SeccionTitulosVerificados";
import SeccionHabilidades from "@/capacidades/perfiles/perfil-propio/componentes/resumen/SeccionHabilidades";

function TabResumen({ perfilSocial }) {
  const { actualizarPerfilSocial } = usePerfilSocial();
  const props = { perfilSocial, actualizarPerfilSocial, card, tituloLg, inputCls };
  return (
    <div className="flex flex-col gap-4">
      <SeccionPresentacion {...props} />
      <SeccionDetallesFijados {...props} />
      <SeccionTitulosVerificados {...props} />
      <SeccionHabilidades {...props} />
    </div>
  );
}

export default TabResumen;

