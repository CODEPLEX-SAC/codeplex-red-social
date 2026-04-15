/**
 * INFRAESTRUCTURA: PerfilPersonalRepository
 * Adaptador Supabase SaaS — acceso a datos del perfil personal.
 * PARA BACKEND: único punto de contacto con la tabla `perfiles`.
 */

async function clienteSaas() {
  const { supabaseSaas } = await import("@/integraciones/persistencia/supabase-saas");
  return supabaseSaas;
}

const PERFIL_VACIO = {
  nombre: "", apellido: "", email: "", telefono: "",
  dni: "", fechaNacimiento: "", genero: "", pais: "",
  ciudad: "", empresa: "", cargo: "", rubro: "", bio: "", avatar: "",
};

function perfilDesdeFilaBD(fila, correoAuth) {
  if (!fila) return { ...PERFIL_VACIO, email: correoAuth ?? "" };
  return {
    ...PERFIL_VACIO,
    nombre:          fila.nombre          ?? "",
    apellido:        fila.apellido        ?? "",
    email:           correoAuth           ?? "",
    telefono:        fila.telefono        ?? "",
    dni:             fila.dni_ruc         ?? "",
    genero:          fila.genero          ?? "",
    fechaNacimiento: fila.fecha_nacimiento ?? "",
    pais:            fila.pais            ?? "",
    ciudad:          fila.ciudad          ?? "",
    empresa:         fila.empresa         ?? "",
    rubro:           fila.rubro           ?? "",
    cargo:           fila.cargo           ?? "",
    bio:             fila.biografia       ?? "",
    avatar:          fila.avatar_url      ?? "",
  };
}

function filaDesdePerfilPersonal(perfil, idUsuario) {
  return {
    user_id:          idUsuario,
    nombre:           perfil.nombre           ?? "",
    apellido:         perfil.apellido         ?? "",
    telefono:         perfil.telefono         ?? "",
    dni_ruc:          perfil.dni              ?? "",
    genero:           perfil.genero           ?? "",
    fecha_nacimiento: perfil.fechaNacimiento  || null,
    pais:             perfil.pais             ?? "",
    ciudad:           perfil.ciudad           ?? "",
    empresa:          perfil.empresa          ?? "",
    rubro:            perfil.rubro            ?? "",
    cargo:            perfil.cargo            ?? "",
    biografia:        perfil.bio              ?? "",
    avatar_url:       perfil.avatar           ?? "",
  };
}

export async function obtenerPerfilPersonal() {
  const supabaseSaas = await clienteSaas();
  const { data: authData, error: errorAuth } = await supabaseSaas.auth.getUser();
  const usuario = authData?.user;
  if (errorAuth || !usuario?.id) {
    return { data: null, error: errorAuth ?? new Error("Sin sesión de usuario SaaS.") };
  }

  const correo = usuario.email?.trim() ?? "";
  const { data: fila, error } = await supabaseSaas
    .from("perfiles")
    .select("*")
    .eq("user_id", usuario.id)
    .maybeSingle();

  if (error) return { data: null, error };
  return { data: perfilDesdeFilaBD(fila, correo), error: null };
}

export async function guardarPerfilPersonal(perfil) {
  const supabaseSaas = await clienteSaas();
  const { data: authData, error: errorAuth } = await supabaseSaas.auth.getUser();
  const usuario = authData?.user;
  if (errorAuth || !usuario?.id) {
    return { data: null, error: errorAuth ?? new Error("Sin sesión de usuario SaaS.") };
  }

  const correo = usuario.email?.trim() ?? "";
  const cargaUtil = filaDesdePerfilPersonal(perfil, usuario.id);

  const { data: fila, error } = await supabaseSaas
    .from("perfiles")
    .upsert(cargaUtil, { onConflict: "user_id" })
    .select()
    .single();

  if (error) return { data: null, error };
  return { data: perfilDesdeFilaBD(fila, correo), error: null };
}

export async function verificarContrasenaActual(contrasenaActual) {
  const supabaseSaas = await clienteSaas();
  const { data: authData, error: errorAuth } = await supabaseSaas.auth.getUser();
  const correo = authData?.user?.email?.trim() ?? "";

  if (errorAuth || !correo || !contrasenaActual) {
    return {
      data: { user: null, session: null },
      error: { message: "No se pudo obtener el usuario o la contraseña es inválida." },
    };
  }

  return supabaseSaas.auth.signInWithPassword({ email: correo, password: contrasenaActual });
}

export async function actualizarContrasena(nuevaContrasena) {
  const supabaseSaas = await clienteSaas();
  return supabaseSaas.auth.updateUser({ password: nuevaContrasena });
}

export async function cerrarSesion() {
  const supabaseSaas = await clienteSaas();
  return supabaseSaas.auth.signOut();
}
