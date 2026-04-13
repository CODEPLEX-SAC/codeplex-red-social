import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useSesion } from "../../../identidad/sesion/SesionContext";
import BotonesInline from "../../../compartido/ui/BotonesInline";
import FilaVacia from "../../../compartido/ui/FilaVacia";

interface ExperienciaLaboral {
  id: number;
  cargo: string;
  empresa: string;
  periodo: string;
  desc: string;
  user_id: string;
}

interface Props {
  perfilSocial: any;
  actualizarPerfilSocial: (payload: any) => void;
  card: string;
  tituloLg: string;
  inputCls: string;
}

const EXPERIENCIA_VACIA = { cargo: "", empresa: "", periodo: "", desc: "" };

export default function SeccionExperienciaLaboral({ perfilSocial, actualizarPerfilSocial, card, tituloLg, inputCls }: Props) {
  const { userSocial } = useSesion() as any;
  const usuarioId = userSocial?.id as string | undefined;
  const [indiceEnEdicion, setIndiceEnEdicion] = useState(false);
  const [experienciaEnEdicion, setExperienciaEnEdicion] = useState(EXPERIENCIA_VACIA);
  const [experienciasLaborales, setExperienciasLaborales] = useState<ExperienciaLaboral[]>([]);

  useEffect(() => {
    if (!usuarioId) return;
    const cargarExperiencias = async () => {
      const { data, error } = await supabase.from("trabajos").select("id,cargo,empresa,periodo,desc,user_id").eq("user_id", usuarioId).order("id", { ascending: false });
      if (error) return console.error(error);
      const filas = (data ?? []) as ExperienciaLaboral[];
      setExperienciasLaborales(filas);
      actualizarPerfilSocial({ trabajos: filas.map(({ id, cargo, empresa, periodo, desc }) => ({ id, cargo, empresa, periodo, desc })) });
    };
    cargarExperiencias();
  }, [usuarioId]);

  const actualizarCampo = (campo: keyof typeof EXPERIENCIA_VACIA, valor: string) => {
    setExperienciaEnEdicion((prev) => ({ ...prev, [campo]: valor }));
  };

  const agregarExperiencia = async () => {
    if (!usuarioId) return;
    if (!experienciaEnEdicion.cargo.trim() && !experienciaEnEdicion.empresa.trim()) return;

    const { data, error } = await supabase
      .from("trabajos")
      .insert([{ ...experienciaEnEdicion, user_id: usuarioId }])
      .select("id,cargo,empresa,periodo,desc,user_id")
      .single();

    if (error) return console.error(error);

    const nueva = data as ExperienciaLaboral;
    const nuevasExperiencias = [nueva, ...experienciasLaborales];
    setExperienciasLaborales(nuevasExperiencias);
    actualizarPerfilSocial({ trabajos: nuevasExperiencias.map(({ id, cargo, empresa, periodo, desc }) => ({ id, cargo, empresa, periodo, desc })) });
    setExperienciaEnEdicion(EXPERIENCIA_VACIA);
  };

  const eliminarExperiencia = async (id: number) => {
    const { error } = await supabase.from("trabajos").delete().eq("id", id);
    if (error) return console.error(error);

    const nuevasExperiencias = experienciasLaborales.filter((item) => item.id !== id);
    setExperienciasLaborales(nuevasExperiencias);
    actualizarPerfilSocial({ trabajos: nuevasExperiencias.map(({ id: eid, cargo, empresa, periodo, desc }) => ({ id: eid, cargo, empresa, periodo, desc })) });
  };

  const experienciasParaVista = useMemo(() => experienciasLaborales, [experienciasLaborales]);

  return (
    <div className={card}>
      <div className="flex items-center justify-between mb-4">
        <h4 className={tituloLg}>Experiencia laboral</h4>
      </div>

      {indiceEnEdicion ? (
        <div className="flex flex-col gap-3">
          <input className={inputCls} value={experienciaEnEdicion.cargo} onChange={(e) => actualizarCampo("cargo", e.target.value)} placeholder="Cargo" />
          <input className={inputCls} value={experienciaEnEdicion.empresa} onChange={(e) => actualizarCampo("empresa", e.target.value)} placeholder="Empresa" />
          <input className={inputCls} value={experienciaEnEdicion.periodo} onChange={(e) => actualizarCampo("periodo", e.target.value)} placeholder="Periodo" />
          <textarea className={`${inputCls} resize-none`} rows={3} value={experienciaEnEdicion.desc} onChange={(e) => actualizarCampo("desc", e.target.value)} placeholder="Descripción" />
          <button onClick={agregarExperiencia} className="self-start px-4 py-[7px] text-[13px] font-semibold border border-[var(--border-color)] rounded-[var(--radius-sm)]">+ Agregar</button>
          <BotonesInline
            onCancelar={() => setIndiceEnEdicion(false)}
            onGuardar={async () => {
              if (experienciaEnEdicion.cargo.trim() || experienciaEnEdicion.empresa.trim()) await agregarExperiencia();
              setIndiceEnEdicion(false);
            }}
          />
        </div>
      ) : experienciasParaVista.length ? (
        experienciasParaVista.map((item) => (
          <div key={item.id} className="flex justify-between py-2">
            <span>{item.cargo} · {item.empresa}</span>
            <button onClick={() => eliminarExperiencia(item.id)} className="text-[var(--error-color)] bg-transparent border-none">×</button>
          </div>
        ))
      ) : (
        <FilaVacia icono={<span>+</span>} label="+ Agregar experiencia laboral" sublabel="Empresa, cargo y periodo" onClick={() => setIndiceEnEdicion(true)} />
      )}
    </div>
  );
}
