import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSesion } from "../../sesion/SesionContext";
import {
  PAISES,
  CIUDADES_POR_PAIS,
  CIUDADES_DEFAULT,
  CARGOS,
  GENEROS,
  TABS_FORM,
  NOTIFICACIONES_ITEMS,
} from "../datosPersonalesData";
import {
  obtenerPerfilUsuario,
  actualizarPerfilUsuario as persistirPerfilUsuarioEnTablaPerfiles,
  verificarCredencialesUsuarioSaaS,
  persistirNuevaContrasenaUsuarioSaaS,
  cerrarSesionUsuarioSaaS,
} from "../services/datosPersonales.service";

function textoNombreCompletoDesdePerfil(perfil) {
  return [perfil.nombre, perfil.apellido].filter(Boolean).join(" ");
}

export function useDatosPersonales() {
  const {
    estadoSesion,
    perfil,
    actualizarPerfil,
    modoExploracion,
    comenzarAutenticacion,
    comenzarAutenticacionSaas,
  } = useSesion();

  const [perfilUsuario, actualizarPerfilUsuario] = useState(perfil);
  const [, establecerModoEdicionPerfil] = useState(true);
  const [perfilMarcadoGuardado, establecerPerfilMarcadoGuardado] = useState(false);
  const [indiceTabPerfilActivo, establecerIndiceTabPerfilActivo] = useState(0);
  const [textoNombreCompletoEdicion, establecerTextoNombreCompletoEdicion] = useState(() =>
    textoNombreCompletoDesdePerfil(perfil)
  );

  const [solicitudGuardadoPerfilEnCurso, establecerSolicitudGuardadoPerfilEnCurso] = useState(false);
  const [mensajeErrorGuardadoPerfil, establecerMensajeErrorGuardadoPerfil] = useState("");

  const [contrasenaActualUsuario, establecerContrasenaActualUsuario] = useState("");
  const [nuevaContrasenaUsuario, establecerNuevaContrasenaUsuario] = useState("");
  const [confirmacionNuevaContrasenaUsuario, establecerConfirmacionNuevaContrasenaUsuario] = useState("");
  const [mensajeErrorCambioContrasena, establecerMensajeErrorCambioContrasena] = useState("");
  const [cambioContrasenaExitoso, establecerCambioContrasenaExitoso] = useState(false);
  const [solicitudCambioContrasenaEnCurso, establecerSolicitudCambioContrasenaEnCurso] = useState(false);

  const [mapaPreferenciasNotificacionActivas, establecerMapaPreferenciasNotificacionActivas] = useState(() =>
    Object.fromEntries(NOTIFICACIONES_ITEMS.map((n) => [n.id, false]))
  );

  const actualizarPerfilRef = useRef(actualizarPerfil);
  actualizarPerfilRef.current = actualizarPerfil;

  useEffect(() => {
    if (estadoSesion !== "autenticado") return;
    let cancelado = false;
    (async () => {
      const { data, error } = await obtenerPerfilUsuario();
      if (cancelado || error || !data) return;
      actualizarPerfilRef.current(data);
    })();
    return () => {
      cancelado = true;
    };
  }, [estadoSesion]);

  useEffect(() => {
    actualizarPerfilUsuario(perfil);
    establecerTextoNombreCompletoEdicion(textoNombreCompletoDesdePerfil(perfil));
  }, [perfil]);

  const ciudadesDisponiblesPerfil = useMemo(
    () => CIUDADES_POR_PAIS[perfilUsuario.pais] ?? (perfilUsuario.pais ? CIUDADES_DEFAULT : []),
    [perfilUsuario.pais]
  );

  const nombreCompletoPerfil = useMemo(() => textoNombreCompletoDesdePerfil(perfil), [perfil.nombre, perfil.apellido]);

  const inicialNombrePerfil = useMemo(
    () => nombreCompletoPerfil?.[0]?.toUpperCase() || "U",
    [nombreCompletoPerfil]
  );

  const fechaMaximaNacimientoPermitida = useMemo(() => new Date().toISOString().split("T")[0], []);

  const propsCampoDeshabilitadoExploracion = modoExploracion ? { disabled: true } : {};

  const establecerCampoPerfilUsuario = useCallback(
    (campo, valor) => {
      if (modoExploracion) return;
      actualizarPerfilUsuario((prev) => ({ ...prev, [campo]: valor }));
    },
    [modoExploracion]
  );

  const alCambiarPaisPerfilUsuario = useCallback(
    (valorPais) => {
      if (modoExploracion) return;
      actualizarPerfilUsuario((prev) => ({ ...prev, pais: valorPais, ciudad: "" }));
    },
    [modoExploracion]
  );

  const alCambiarTextoNombreCompletoUsuario = useCallback(
    (valorTexto) => {
      if (modoExploracion) return;
      establecerTextoNombreCompletoEdicion(valorTexto);
      const partes = valorTexto.trim().split(/\s+/);
      const nombre = partes[0] || "";
      const apellido = partes.slice(1).join(" ");
      actualizarPerfilUsuario((prev) => ({ ...prev, nombre, apellido }));
    },
    [modoExploracion]
  );

  const guardarPerfilUsuario = useCallback(
    async (evento) => {
      evento.preventDefault();
      if (modoExploracion) return;
      establecerMensajeErrorGuardadoPerfil("");
      establecerSolicitudGuardadoPerfilEnCurso(true);
      try {
        const { data, error } = await persistirPerfilUsuarioEnTablaPerfiles(perfilUsuario);
        if (error) {
          establecerMensajeErrorGuardadoPerfil(error.message || "No se pudo guardar el perfil.");
          return;
        }
        if (data) {
          actualizarPerfil(data);
        }
        establecerModoEdicionPerfil(false);
        establecerPerfilMarcadoGuardado(true);
        setTimeout(() => establecerPerfilMarcadoGuardado(false), 3000);
      } finally {
        establecerSolicitudGuardadoPerfilEnCurso(false);
      }
    },
    [modoExploracion, perfilUsuario, actualizarPerfil]
  );

  const cancelarEdicionPerfilUsuario = useCallback(() => {
    actualizarPerfilUsuario(perfil);
    establecerTextoNombreCompletoEdicion(textoNombreCompletoDesdePerfil(perfil));
    establecerModoEdicionPerfil(false);
    establecerMensajeErrorGuardadoPerfil("");
  }, [perfil]);

  const alCambiarArchivoAvatarUsuario = useCallback(
    (archivo) => {
      if (!archivo || modoExploracion) return;
      const lector = new FileReader();
      lector.onload = (ev) => {
        const datos = ev.target?.result;
        if (datos == null) return;
        actualizarPerfilUsuario((prev) => ({ ...prev, avatar: datos }));
      };
      lector.readAsDataURL(archivo);
    },
    [modoExploracion]
  );

  const alSeleccionarIndiceTabPerfil = useCallback((indice) => {
    establecerIndiceTabPerfilActivo(indice);
    establecerModoEdicionPerfil(false);
  }, []);

  const cambiarPasswordUsuario = useCallback(
    async (evento) => {
      evento.preventDefault();
      establecerMensajeErrorCambioContrasena("");
      establecerCambioContrasenaExitoso(false);

      if (!contrasenaActualUsuario) {
        establecerMensajeErrorCambioContrasena("Ingresa tu contraseña actual.");
        return;
      }
      if (nuevaContrasenaUsuario.length < 8) {
        establecerMensajeErrorCambioContrasena("La nueva contraseña debe tener al menos 8 caracteres.");
        return;
      }
      if (nuevaContrasenaUsuario !== confirmacionNuevaContrasenaUsuario) {
        establecerMensajeErrorCambioContrasena("Las contraseñas no coinciden.");
        return;
      }

      establecerSolicitudCambioContrasenaEnCurso(true);
      try {
        const { error: errorLogin } = await verificarCredencialesUsuarioSaaS(contrasenaActualUsuario);
        if (errorLogin) {
          establecerMensajeErrorCambioContrasena("La contraseña actual es incorrecta.");
          return;
        }

        const { error: errorActualizacion } = await persistirNuevaContrasenaUsuarioSaaS(nuevaContrasenaUsuario);
        if (errorActualizacion) {
          establecerMensajeErrorCambioContrasena(`Error al cambiar contraseña: ${errorActualizacion.message}`);
          return;
        }

        establecerCambioContrasenaExitoso(true);
        establecerContrasenaActualUsuario("");
        establecerNuevaContrasenaUsuario("");
        establecerConfirmacionNuevaContrasenaUsuario("");
        setTimeout(async () => {
          await cerrarSesionUsuarioSaaS();
          comenzarAutenticacionSaas();
        }, 2000);
      } finally {
        establecerSolicitudCambioContrasenaEnCurso(false);
      }
    },
    [contrasenaActualUsuario, nuevaContrasenaUsuario, confirmacionNuevaContrasenaUsuario, comenzarAutenticacionSaas]
  );

  const alAlternarPreferenciaNotificacion = useCallback(
    (idPreferencia) => {
      if (modoExploracion) return;
      establecerMapaPreferenciasNotificacionActivas((prev) => ({
        ...prev,
        [idPreferencia]: !prev[idPreferencia],
      }));
    },
    [modoExploracion]
  );

  const fechaNacimientoFormateadaResumen = useMemo(() => {
    if (!perfil.fechaNacimiento) return null;
    return new Date(`${perfil.fechaNacimiento}T00:00:00`).toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, [perfil.fechaNacimiento]);

  const textoUbicacionResumenPerfil = useMemo(
    () => [perfil.ciudad, perfil.pais].filter(Boolean).join(", "),
    [perfil.ciudad, perfil.pais]
  );

  return {
    perfil,
    perfilUsuario,
    textoNombreCompletoEdicion,
    indiceTabPerfilActivo,
    perfilMarcadoGuardado,
    modoExploracion,
    comenzarAutenticacion,
    solicitudGuardadoPerfilEnCurso,
    mensajeErrorGuardadoPerfil,
    ciudadesDisponiblesPerfil,
    nombreCompletoPerfil,
    inicialNombrePerfil,
    fechaMaximaNacimientoPermitida,
    propsCampoDeshabilitadoExploracion,
    establecerCampoPerfilUsuario,
    alCambiarPaisPerfilUsuario,
    alCambiarTextoNombreCompletoUsuario,
    alCambiarArchivoAvatarUsuario,
    guardarPerfilUsuario,
    cancelarEdicionPerfilUsuario,
    alSeleccionarIndiceTabPerfil,
    contrasenaActualUsuario,
    nuevaContrasenaUsuario,
    confirmacionNuevaContrasenaUsuario,
    establecerContrasenaActualUsuario,
    establecerNuevaContrasenaUsuario,
    establecerConfirmacionNuevaContrasenaUsuario,
    mensajeErrorCambioContrasena,
    cambioContrasenaExitoso,
    solicitudCambioContrasenaEnCurso,
    cambiarPasswordUsuario,
    elementosNotificacionDisponibles: NOTIFICACIONES_ITEMS,
    mapaPreferenciasNotificacionActivas,
    alAlternarPreferenciaNotificacion,
    paisesDisponiblesPerfil: PAISES,
    cargosDisponiblesPerfil: CARGOS,
    generosDisponiblesPerfil: GENEROS,
    titulosTabsPerfil: TABS_FORM,
    fechaNacimientoFormateadaResumen,
    textoUbicacionResumenPerfil,
  };
}
