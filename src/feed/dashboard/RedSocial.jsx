import React from "react";
import TarjetasEstadisticas from "./TarjetasEstadisticas";
import CreadorPublicacion from "../publicaciones/CreadorPublicacion";
import PublicacionesFeed from "../publicaciones/PublicacionesFeed";
import TarjetaMonedero from "../../planes/monedero/TarjetaMonedero";
import RankingUsuarios from "./RankingUsuarios";
import MensajesFlotante from "../buzon/MensajesFlotante";
// RedSocial es el ORQUESTADOR — recibe publicaciones desde App (estado compartido)
function RedSocial({ alNavegar, alVerPerfil,
  publicaciones, crearPublicacion, obtenerPorTipo,
  cambiarEstado, marcarComentarioUtil, registrarFeedback,
  editarPublicacion, eliminarPublicacion,
  agregarComentario, agregarRespuesta, editarComentario, eliminarComentario, reaccionarComentario,
  misPreguntas,
}) {

  return (
    <div className="grid grid-cols-[1fr_350px] gap-5 [@media(max-width:1400px)]:grid-cols-1">
      <div className="flex flex-col gap-5 min-w-0">
        <TarjetasEstadisticas />
        <CreadorPublicacion onPublicar={crearPublicacion} alNavegar={alNavegar} />
        <PublicacionesFeed
          publicaciones={publicaciones}
          obtenerPorTipo={obtenerPorTipo}
          alVerPerfil={alVerPerfil}
          alNavegar={alNavegar}
          misPreguntas={misPreguntas}
          onCambiarEstado={cambiarEstado}
          onMarcarComentarioUtil={marcarComentarioUtil}
          onFeedback={registrarFeedback}
          onEditar={editarPublicacion}
          onEliminar={eliminarPublicacion}
          onAgregarComentario={agregarComentario}
          onAgregarRespuesta={agregarRespuesta}
          onEditarComentario={editarComentario}
          onEliminarComentario={eliminarComentario}
          onReaccionarComentario={reaccionarComentario}
        />
      </div>

      <div className="flex flex-col gap-5 [@media(max-width:1400px)]:grid [@media(max-width:1400px)]:grid-cols-2 [@media(max-width:1400px)]:gap-5 [@media(max-width:768px)]:grid-cols-1">
        <TarjetaMonedero />
        <RankingUsuarios />
      </div>

      <MensajesFlotante alNavegar={alNavegar} />
    </div>
  );
}

export default RedSocial;
