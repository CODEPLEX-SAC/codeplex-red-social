import React from "react";
import { usePerfilSocial } from "../PerfilSocialContext";
import { card, tituloLg, inputCls } from "../styles";
import SeccionPresentacion from "../resumen/SeccionPresentacion";
import SeccionDetallesFijados from "../resumen/SeccionDetallesFijados";
import SeccionTitulosVerificados from "../resumen/SeccionTitulosVerificados";
import SeccionHabilidades from "../resumen/SeccionHabilidades";

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

