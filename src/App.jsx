import React, { useState, useEffect } from 'react';
import { SesionProvider, useSesion } from './identidad/sesion/SesionContext';
import { PerfilSocialProvider, usePerfilSocial } from './feed/perfil-propio/PerfilSocialContext';
import Sidebar from './ui/layout/Sidebar/Sidebar';
import Header from './ui/layout/Header/Header';
import RedSocial from './feed/dashboard/RedSocial';
import Login from './identidad/login/Login';
import { ModalAuthRedSocial } from './identidad/sesion/ModalAuthRedSocial';
import { ModalOnboardingSocial } from './identidad/sesion/ModalOnboardingSocial';
import GestionEmpresas from './organizacion/empresas/GestionEmpresas';
import DatosPersonales from './identidad/datos-personales/DatosPersonales';
import DatosFacturacion from './organizacion/facturacion/DatosFacturacion';
import Buzon from './feed/buzon/Buzon';
import Mensajes from './feed/buzon/Mensajes';
import Tickets from './organizacion/tickets/Tickets';
import Mantenedores from './organizacion/mantenedores/Mantenedores';
import CanjeMonedas from './planes/monedero/CanjeMonedas';
import Monedero from './planes/monedero/Monedero';
import Colaboradores from './organizacion/colaboradores/Colaboradores';
import Monetizacion from './planes/monetizacion/Monetizacion';
import TiendaAplicaciones from './planes/aplicaciones/TiendaAplicaciones';
import VistaPasarelaPago from './planes/pasarela-pago/VistaPasarelaPago';
import { useCarritoSuscripciones } from './planes/aplicaciones/useCarritoSuscripciones';
import PaginaCarrito from './planes/carrito/PaginaCarrito';
import CarritoMobile from './planes/carrito/CarritoMobile';
import VistaPlaceholder from './ui/placeholders/VistaPlaceholder';
import PerfilPublico from './feed/perfil-publico/PerfilPublico';
import PerfilPropio  from './feed/perfil-propio/PerfilPropio';
import usePublicaciones from './feed/publicaciones/usePublicaciones';

/* ── Apps precargadas en modo exploración ──────────────────────────────────
   El usuario sin login ve todas las apps disponibles en "Mis Aplicaciones"
   para que pueda explorar el sistema completo. Al iniciar sesión este array
   se limpia y queda solo con las apps que el usuario realmente adquiera.
──────────────────────────────────────────────────────────────────────────── */
const APPS_EXPLORACION = [
  { id: 1, suscripcionModal: "contaplex",   nombre: "Conta-Plex",              publisher: "CodePlex",    icono: "contaplex",               colorTema: "color-contaplex",   planDisplay: "Exploración" },
  { id: 2, suscripcionModal: "gestionplex", nombre: "GestiónPlex",             publisher: "Comercial",   icono: "gestionplex-comercial",   colorTema: "color-comercial",   planDisplay: "Exploración" },
  { id: 3, suscripcionModal: "restaurante", nombre: "GestiónPlex",             publisher: "Restaurante", icono: "gestionplex-restaurante", colorTema: "color-restaurante", planDisplay: "Exploración" },
  { id: 4, suscripcionModal: "grifo",       nombre: "Gestión-Plex Grifo",      publisher: "CodePlex",    icono: "contaplex",               colorTema: "color-grifo",       planDisplay: "Exploración" },
  { id: 5, suscripcionModal: "facturacion", nombre: "Facturación Electrónica", publisher: "CodePlex",    icono: "contaplex",               colorTema: "color-facturacion", planDisplay: "Exploración" },
  { id: 6, suscripcionModal: "transporte",  nombre: "Gestión-Plex Transporte", publisher: "CodePlex",    icono: "contaplex",               colorTema: "color-transporte",  planDisplay: "Exploración" },
];

/* ══════════════════════════════════════════════════════════════
   AppContent — consume SesionContext, maneja estado de UI/apps
══════════════════════════════════════════════════════════════ */
function AppContent() {
  const { estadoSesion, modoExploracion, comenzarAutenticacion, confirmarSesion, irAExploracion, userSocial } = useSesion();
  const { tienePerfil } = usePerfilSocial();

  /* El modal solo aparece si la auto-creación del perfil falló (caso extremo).
     En condiciones normales, PerfilSocialContext crea el perfil automáticamente
     usando los datos del SaaS sin necesitar intervención del usuario. */
  const mostrarOnboardingSocial =
    estadoSesion === 'autenticado' && Boolean(userSocial) && tienePerfil === false;

  const [sidebarOpen, setSidebarOpen]           = useState(false);
  const [vistaActiva, setVistaActiva]           = useState("red-social");
  const [pagoData, setPagoData]                 = useState(null);
  const [perfilUsuario, setPerfilUsuario]       = useState(null);
  const [origenMensajes, setOrigenMensajes]     = useState(null);

  /* Publicaciones levantadas al nivel App para compartir entre RedSocial y PerfilPropio */
  const {
    publicaciones, crearPublicacion, obtenerPorTipo,
    cambiarEstado, marcarComentarioUtil, registrarFeedback,
    editarPublicacion, eliminarPublicacion,
    agregarComentario, agregarRespuesta, editarComentario, eliminarComentario, reaccionarComentario,
    misPreguntas,
  } = usePublicaciones();

  /* Amigos del usuario — Juan Pérez ya es amigo */
  const AMIGOS_NOMBRES = new Set(["Juan Pérez"]);

  const alVerPerfil = (usuario) => {
    setPerfilUsuario(usuario);
    setVistaActiva("perfil-usuario");
  };
  const [misApps, setMisApps]                   = useState(APPS_EXPLORACION);
  const [appsActivas, setAppsActivas]           = useState([]);
  const [pestanaAppsInicial, setPestanaAppsInicial] = useState("mis");

  const {
    itemsCarrito,
    totalCarrito,
    agregarAlCarrito,
    quitarDelCarrito,
    limpiarCarrito,
    verificarEnCarrito,
  } = useCarritoSuscripciones();

  /* Scroll al top en cada cambio de vista (SPA: el navegador no lo hace solo) */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [vistaActiva]);

  /* Limpiar origen de mensajes al salir de la vista mensajes */
  useEffect(() => {
    if (vistaActiva !== 'mensajes') setOrigenMensajes(null);
  }, [vistaActiva]);

  /* Al confirmar sesión: limpiar apps de exploración */
  useEffect(() => {
    if (estadoSesion === 'autenticado') {
      setMisApps([]);
      setAppsActivas([]);
      setPestanaAppsInicial("adquirir");
    }
    if (estadoSesion === 'exploracion') {
      setMisApps(APPS_EXPLORACION);
      setPestanaAppsInicial("mis");
    }
  }, [estadoSesion]);

  const handleVerCarrito = () => setVistaActiva("carrito");

  const handleProcederPago = (data) => {
    setPagoData(data);
    setVistaActiva("pasarela-pago");
  };

  const handleActivar = (appData) => {
    const items = Array.isArray(appData) ? appData : [appData];
    setMisApps((prev) => [
      ...prev,
      ...items.map((a, i) => ({ ...a, id: Date.now() + i })),
    ]);
    setPestanaAppsInicial("mis");
    setVistaActiva("aplicaciones");
  };

  const handleDesinstalarApp = (id) => {
    setMisApps((prev) => prev.filter((a) => a.id !== id));
    setAppsActivas((prev) => prev.filter((a) => a.id !== id));
  };

  const handleToggleAppActiva = (app) => {
    setAppsActivas((prev) =>
      prev.some((a) => a.id === app.id)
        ? prev.filter((a) => a.id !== app.id)
        : [...prev, app]
    );
  };

  const handleSelectAllApps   = () => setAppsActivas([...misApps]);
  const handleDeselectAllApps = () => setAppsActivas([]);

  const renderVista = () => {
    switch (vistaActiva) {
      case "red-social":        return <RedSocial alNavegar={setVistaActiva} alVerPerfil={alVerPerfil}
                                          publicaciones={publicaciones} crearPublicacion={crearPublicacion} obtenerPorTipo={obtenerPorTipo}
                                          cambiarEstado={cambiarEstado} marcarComentarioUtil={marcarComentarioUtil} registrarFeedback={registrarFeedback}
                                          editarPublicacion={editarPublicacion} eliminarPublicacion={eliminarPublicacion}
                                          agregarComentario={agregarComentario} agregarRespuesta={agregarRespuesta}
                                          editarComentario={editarComentario} eliminarComentario={eliminarComentario}
                                          reaccionarComentario={reaccionarComentario} misPreguntas={misPreguntas} />;
      case "perfil-usuario":    return <PerfilPublico usuario={perfilUsuario} onVolver={() => setVistaActiva("red-social")} alNavegar={setVistaActiva}
                                          sonAmigos={AMIGOS_NOMBRES.has(perfilUsuario?.nombre)}
                                          onEnviarMensaje={({ usuarioDestino, origenDesdePerfilPublico }) => {
                                            setOrigenMensajes({ usuarioDestino, origenDesdePerfilPublico });
                                            setVistaActiva("mensajes");
                                          }} />;
      case "perfil-propio":     return <PerfilPropio onVolver={() => setVistaActiva("red-social")} alNavegar={setVistaActiva}
                                          publicaciones={publicaciones} misPreguntas={misPreguntas}
                                          onMarcarComentarioUtil={marcarComentarioUtil} onCambiarEstado={cambiarEstado}
                                          onEditarPublicacion={editarPublicacion} onEliminarPublicacion={eliminarPublicacion}
                                          onAgregarComentario={agregarComentario} onAgregarRespuesta={agregarRespuesta}
                                          onEditarComentario={editarComentario} onEliminarComentario={eliminarComentario}
                                          onReaccionarComentario={reaccionarComentario} />;
      case "datos-personales":  return <DatosPersonales />;
      case "empresas":          return <GestionEmpresas />;
      case "datos-facturacion": return <DatosFacturacion />;
      case "buzon":             return <Buzon />;
      case "mensajes":          return <Mensajes
                                          usuarioOrigen={origenMensajes?.usuarioDestino ?? null}
                                          origenDesdePerfilPublico={origenMensajes?.origenDesdePerfilPublico ?? false}
                                          onVolverAlPerfil={(usuario) => { alVerPerfil(usuario); }} />;
      case "tickets":           return <Tickets />;
      case "mantenedores":      return <Mantenedores />;
      case "canje-monedas":     return <CanjeMonedas />;
      case "monedero":          return <Monedero />;
      case "colaboradores":     return <Colaboradores />;
      case "monetizacion":      return <Monetizacion />;
      case "aplicaciones":      return (
        <TiendaAplicaciones
          alProcederPago={handleProcederPago}
          suscripcionesActivas={misApps}
          pestanaInicial={pestanaAppsInicial}
          alCambiarPestana={setPestanaAppsInicial}
          alDesinstalar={handleDesinstalarApp}
          itemsCarrito={itemsCarrito}
          totalCarrito={totalCarrito}
          agregarAlCarrito={agregarAlCarrito}
          quitarDelCarrito={quitarDelCarrito}
          verificarEnCarrito={verificarEnCarrito}
          alVerCarrito={handleVerCarrito}
        />
      );
      case "carrito":           return (
        <PaginaCarrito
          itemsCarrito={itemsCarrito}
          totalCarrito={totalCarrito}
          alQuitarItem={quitarDelCarrito}
          alProcederPago={() => {
            handleProcederPago({ itemsCarrito, totalCarrito, periodoFacturacion: "mensual" });
            limpiarCarrito();
          }}
          alExplorar={() => setVistaActiva("aplicaciones")}
          alVolver={() => setVistaActiva("aplicaciones")}
        />
      );
      case "pasarela-pago":     return (
        <VistaPasarelaPago
          planData={pagoData}
          alVolver={() => setVistaActiva("aplicaciones")}
          alActivar={handleActivar}
        />
      );
      default:                  return <VistaPlaceholder vista={vistaActiva} />;
    }
  };

  if (estadoSesion === 'autenticando-saas') {
    return (
      <Login
        onLogin={confirmarSesion}
        onBackToDemo={irAExploracion}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-[var(--background-color)]">
      <Sidebar
        estaAbierto={sidebarOpen}
        alCerrar={() => setSidebarOpen(false)}
        vistaActiva={vistaActiva}
        alNavegar={setVistaActiva}
        appsActivas={appsActivas}
      />

      <Header
        alAlternarMenu={() => setSidebarOpen(!sidebarOpen)}
        alNavegar={setVistaActiva}
        vistaActiva={vistaActiva}
        itemsCarrito={itemsCarrito}
        totalCarrito={totalCarrito}
        alVerCarrito={handleVerCarrito}
        misApps={misApps}
        appsActivas={appsActivas}
        alAlternarAppActiva={handleToggleAppActiva}
        alSeleccionarTodasApps={handleSelectAllApps}
        alDeseleccionarTodasApps={handleDeselectAllApps}
      />

      <div className={`content-wrapper flex-1 min-w-0 ml-[280px] px-6 pb-6 transition-[margin-left] duration-300 ease-in-out min-h-screen [@media(max-width:1299px)]:ml-0 [@media(max-width:1299px)]:px-8 [@media(max-width:768px)]:px-4 [@media(max-width:768px)]:pb-4${modoExploracion ? " main-content--demo" : ""}`}>
        <main className="max-w-[1400px] mx-auto w-full">
          {renderVista()}
        </main>
      </div>

      {/* Login / Registro social normal */}
      {estadoSesion === 'autenticando-social' && (
        <ModalAuthRedSocial
          onConfirmar={confirmarSesion}
          onCerrar={irAExploracion}
        />
      )}

      {/* Onboarding: usuario autenticado (SaaS o social) sin cuenta en la red social */}
      {estadoSesion === 'autenticado' && !userSocial && (
        <ModalAuthRedSocial
          onConfirmar={confirmarSesion}
          onCerrar={irAExploracion}
          initialTab="registro"
        />
      )}

      {mostrarOnboardingSocial && <ModalOnboardingSocial />}

      {vistaActiva !== "carrito" && (
        <CarritoMobile
          itemsCarrito={itemsCarrito}
          totalCarrito={totalCarrito}
          alVerCarrito={handleVerCarrito}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   App — solo envuelve con el provider de sesión
══════════════════════════════════════════════════════════════ */
function App() {
  return (
    <SesionProvider>
      <PerfilSocialProvider>
        <AppContent />
      </PerfilSocialProvider>
    </SesionProvider>
  );
}

export default App;
