import React from 'react';
import { PasoIndicador } from './PasoIndicador';
import { SubidaFoto } from './SubidaFoto';
import { usarVerificacionIdentidad } from '../ganchos/usarVerificacionIdentidad';

/* ═══════════════════════════════════════════════════════════════
   TabVerificacionIdentidad — UI pura del flujo de DNI.
   No contiene lógica de negocio ni llamadas a Supabase.
   Toda la lógica vive en usarVerificacionIdentidad.
═══════════════════════════════════════════════════════════════ */
interface TabVerificacionIdentidadProps { alConfirmar: () => void }

export function TabVerificacionIdentidad({ alConfirmar }: TabVerificacionIdentidadProps) {
  const {
    paso, avanzarPaso, retrocederPaso,
    dniFrontal, dniReverso,
    previstaFrontal, previstaReverso,
    cargando, cargarFoto, enviarVerificacion,
  } = usarVerificacionIdentidad(alConfirmar);

  /* ── Paso 3: verificación completada ── */
  if (paso === 3) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'var(--gradient-primary)' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div>
          <h3 className="text-[16px] font-bold text-[var(--text-dark)] m-0 mb-1">¡Identidad verificada!</h3>
          <p className="text-[13px] text-[var(--text-muted)] m-0 leading-[1.5]">
            Tu cuenta está <strong className="text-[var(--primary-color)]">verificada</strong>.<br/>
            Ya puedes publicar, comentar y conectar con la comunidad.
          </p>
        </div>
        <div className="w-full p-3 rounded-[var(--radius-sm)] bg-[rgba(72,127,255,0.06)] border border-[rgba(72,127,255,0.15)]">
          <p className="text-[12px] text-[var(--text-dark)] m-0">
            Acceso <strong>completo</strong> a todas las funciones de la red social.
          </p>
        </div>
        <button onClick={alConfirmar}
          className="w-full py-3 border-none rounded-[var(--radius-sm)] text-white text-[14px] font-bold cursor-pointer font-[inherit]"
          style={{ background: 'var(--gradient-primary)' }}>
          Entrar a la red social
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <PasoIndicador pasoActual={paso} totalPasos={2} />

      {/* ── Paso 1: DNI anverso ── */}
      {paso === 1 && (
        <>
          <div className="text-center mb-1">
            <h3 className="text-[14px] font-bold text-[var(--text-dark)] m-0 mb-1">Foto del DNI — Anverso</h3>
            <p className="text-[12px] text-[var(--text-muted)] m-0">
              Sube una foto clara de la parte <strong>frontal</strong> de tu DNI
            </p>
          </div>
          <SubidaFoto
            etiqueta="Parte frontal del DNI"
            subeEtiqueta="JPG, PNG · máx. 5MB"
            tipo="dni"
            prevista={previstaFrontal}
            alCambiar={f => cargarFoto(f, 'frontal')}
          />
          <div className="flex items-start gap-2 p-3 bg-[var(--background-color)] rounded-[var(--radius-sm)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" className="mt-[1px] shrink-0">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-[11px] text-[var(--text-muted)] m-0 leading-[1.5]">
              Asegúrate que el documento esté bien iluminado, sin reflejos y todos los datos sean legibles.
            </p>
          </div>
          <button onClick={avanzarPaso} disabled={!dniFrontal}
            className="w-full py-3 border-none rounded-[var(--radius-sm)] text-white text-[14px] font-bold cursor-pointer font-[inherit] disabled:opacity-40"
            style={{ background: 'var(--gradient-primary)' }}>
            Continuar →
          </button>
        </>
      )}

      {/* ── Paso 2: DNI reverso ── */}
      {paso === 2 && (
        <>
          <div className="text-center mb-1">
            <h3 className="text-[14px] font-bold text-[var(--text-dark)] m-0 mb-1">Foto del DNI — Reverso</h3>
            <p className="text-[12px] text-[var(--text-muted)] m-0">
              Sube una foto clara de la parte <strong>trasera</strong> de tu DNI
            </p>
          </div>
          <SubidaFoto
            etiqueta="Parte trasera del DNI"
            subeEtiqueta="JPG, PNG · máx. 5MB"
            tipo="dni"
            prevista={previstaReverso}
            alCambiar={f => cargarFoto(f, 'reverso')}
          />
          <div className="flex gap-3">
            <button onClick={retrocederPaso}
              className="flex-1 py-3 border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[var(--text-dark)] text-[14px] font-bold cursor-pointer bg-transparent font-[inherit] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors">
              ← Atrás
            </button>
            <button onClick={enviarVerificacion} disabled={!dniReverso || cargando}
              className="flex-[2] py-3 border-none rounded-[var(--radius-sm)] text-white text-[14px] font-bold cursor-pointer font-[inherit] disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ background: 'var(--gradient-primary)' }}>
              {cargando
                ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : 'Enviar verificación ✓'
              }
            </button>
          </div>
        </>
      )}

      <button onClick={alConfirmar}
        className="text-[11px] text-[var(--text-muted)] bg-transparent border-none cursor-pointer p-0 hover:text-[var(--primary-color)] transition-colors font-[inherit] text-center">
        Verificar después (acceso limitado)
      </button>
    </div>
  );
}
