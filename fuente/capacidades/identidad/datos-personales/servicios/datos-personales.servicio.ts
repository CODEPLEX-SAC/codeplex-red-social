async function clienteSaas() {
  const { supabaseSaas } = await import("@/integraciones/persistencia/supabase-saas");
  return supabaseSaas;
}

const PERFIL_INTERNO_VACIO = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  dni: "",
  fechaNacimiento: "",
  genero: "",
  pais: "",
  ciudad: "",
  empresa: "",
  cargo: "",
  rubro: "",
  bio: "",
  avatar: "",
};

function perfilUsuarioDesdeFilaPerfiles(fila, correoAuth) {
  if (!fila) {
    return { ...PERFIL_INTERNO_VACIO, email: correoAuth ?? "" };
  }
  return {
    ...PERFIL_INTERNO_VACIO,
    nombre: fila.nombre ?? "",
    apellido: fila.apellido ?? "",
    email: correoAuth ?? "",
    telefono: fila.telefono ?? "",
    dni: fila.dni_ruc ?? "",
    genero: fila.genero ?? "",
    fechaNacimiento: fila.fecha_nacimiento ?? "",
    pais: fila.pais ?? "",
    ciudad: fila.ciudad ?? "",
    empresa: fila.empresa ?? "",
    rubro: fila.rubro ?? "",
    cargo: fila.cargo ?? "",
    bio: fila.biografia ?? "",
    avatar: fila.avatar_url ?? "",
  };
}

function filaPerfilesDesdePerfilUsuario(perfilUsuario, idUsuario) {
  return {
    user_id: idUsuario,
    nombre: perfilUsuario.nombre ?? "",
    apellido: perfilUsuario.apellido ?? "",
    telefono: perfilUsuario.telefono ?? "",
    dni_ruc: perfilUsuario.dni ?? "",
    genero: perfilUsuario.genero ?? "",
    fecha_nacimiento: perfilUsuario.fechaNacimiento || null,
    pais: perfilUsuario.pais ?? "",
    ciudad: perfilUsuario.ciudad ?? "",
    empresa: perfilUsuario.empresa ?? "",
    rubro: perfilUsuario.rubro ?? "",
    cargo: perfilUsuario.cargo ?? "",
    biografia: perfilUsuario.bio ?? "",
    avatar_url: perfilUsuario.avatar ?? "",
  };
}

export async function obtenerPerfilUsuario() {
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

  if (error) {
    return { data: null, error };
  }

  return { data: perfilUsuarioDesdeFilaPerfiles(fila, correo), error: null };
}

export async function actualizarPerfilUsuario(perfilUsuario) {
  const supabaseSaas = await clienteSaas();
  const { data: authData, error: errorAuth } = await supabaseSaas.auth.getUser();
  const usuario = authData?.user;
  if (errorAuth || !usuario?.id) {
    return { data: null, error: errorAuth ?? new Error("Sin sesión de usuario SaaS.") };
  }

  const correo = usuario.email?.trim() ?? "";
  const cargaUtil = filaPerfilesDesdePerfilUsuario(perfilUsuario, usuario.id);

  const { data: fila, error } = await supabaseSaas
    .from("perfiles")
    .upsert(cargaUtil, { onConflict: "user_id" })
    .select()
    .single();

  if (error) {
    return { data: null, error };
  }

  return { data: perfilUsuarioDesdeFilaPerfiles(fila, correo), error: null };
}

export async function verificarCredencialesUsuarioSaaS(contrasenaActual) {
  const supabaseSaas = await clienteSaas();
  const { data: authData, error: errorAuth } = await supabaseSaas.auth.getUser();
  const correo = authData?.user?.email?.trim() ?? "";

  if (errorAuth || !correo || contrasenaActual == null || contrasenaActual === "") {
    return {
      data: { user: null, session: null },
      error: { message: "No se pudo obtener el usuario o la contraseña es inválida." },
    };
  }

  return supabaseSaas.auth.signInWithPassword({
    email: correo,
    password: contrasenaActual,
  });
}

export async function persistirNuevaContrasenaUsuarioSaaS(nuevaContrasena) {
  const supabaseSaas = await clienteSaas();
  return supabaseSaas.auth.updateUser({ password: nuevaContrasena });
}

export async function cerrarSesionUsuarioSaaS() {
  const supabaseSaas = await clienteSaas();
  return supabaseSaas.auth.signOut();
}
