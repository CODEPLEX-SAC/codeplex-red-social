import React, { useState } from 'react';
import { TabInicioSesion }         from './componentes/TabInicioSesion';
import { TabRegistro }             from './componentes/TabRegistro';
import { TabVerificacionIdentidad } from './componentes/TabVerificacionIdentidad';

/* ═══════════════════════════════════════════════════════════════
   ModalAuthRedSocial — orquestador del flujo de autenticación
   de la red social.

   Responsabilidad ÚNICA: mostrar el modal y alternar entre pestañas.
   Toda la lógica de negocio (signIn, signUp, verificación DNI)
   vive en los ganchos de cada tab.

   Pestañas disponibles:
     'login'        → TabInicioSesion
     'registro'     → TabRegistro
     'verificacion' → TabVerificacionIdentidad
═══════════════════════════════════════════════════════════════ */
type PestanaAuth = 'login' | 'registro' | 'verificacion';

interface ModalAuthRedSocialProps {
  onConfirmar:       () => void;
  onCerrar:          () => void;
  modoVerificacion?: boolean;
  initialTab?:       PestanaAuth;
}

export function ModalAuthRedSocial({
  onConfirmar,
  onCerrar,
  modoVerificacion = false,
  initialTab,
}: ModalAuthRedSocialProps) {
  const [pestana, setPestana] = useState<PestanaAuth>(
    initialTab ?? (modoVerificacion ? 'verificacion' : 'login'),
  );

  const esVerificacion = pestana === 'verificacion';

  const BotonPestana = ({ id, etiqueta }: { id: PestanaAuth; etiqueta: string }) => (
    <button
      onClick={() => setPestana(id)}
      className={`flex-1 py-[10px] text-[13px] font-bold border-b-2 transition-all duration-200 bg-transparent border-x-0 border-t-0 cursor-pointer font-[inherit] ${
        pestana === id
          ? 'text-[var(--primary-color)] border-b-[var(--primary-color)]'
          : 'text-[var(--text-muted)] border-b-transparent hover:text-[var(--text-dark)]'
      }`}>
      {etiqueta}
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-[600] overflow-y-auto overscroll-y-contain flex items-start justify-center sm:items-center p-3 sm:p-4 py-6 sm:py-8"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onClick={e => { if (e.target === e.currentTarget) onCerrar(); }}>

      <div
        className="bg-[var(--white-color)] rounded-[var(--radius-md)] shadow-[0_24px_64px_rgba(0,0,0,0.22)] w-full max-w-[420px] min-h-0 max-h-[calc(100dvh-3rem)] sm:max-h-[min(90vh,calc(100dvh-2rem))] flex flex-col overflow-hidden shrink-0"
        style={{ animation: 'modalSlideIn 0.18s ease' }}
        onClick={e => e.stopPropagation()}>

        {/* ── Cabecera ── */}
        <div className="shrink-0 flex items-center justify-between px-6 pt-5 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[#0f1e3c] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <rect x="2"  y="2"  width="6" height="6" rx="1.5" fill="white"   fillOpacity="0.9"/>
                <rect x="10" y="2"  width="6" height="6" rx="1.5" fill="white"   fillOpacity="0.55"/>
                <rect x="2"  y="10" width="6" height="6" rx="1.5" fill="white"   fillOpacity="0.55"/>
                <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#93c5fd" fillOpacity="0.9"/>
              </svg>
            </div>
            <div>
              <span className="text-[15px] font-medium text-[var(--text-dark)] tracking-[-0.3px]">
                Code<strong className="font-extrabold text-[var(--primary-color)]">plex</strong> Red Social
              </span>
              {esVerificacion && (
                <p className="text-[11px] text-[var(--text-muted)] m-0 leading-none mt-[2px]">
                  Verificación de identidad
                </p>
              )}
            </div>
          </div>
          <button onClick={onCerrar}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--text-muted)] hover:bg-[var(--background-color)] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* ── Pestañas (ocultas en verificación) ── */}
        {!esVerificacion && (
          <div className="shrink-0 flex border-b border-[var(--border-color)] px-6">
            <BotonPestana id="login"    etiqueta="Iniciar sesión" />
            <BotonPestana id="registro" etiqueta="Registrarse"    />
          </div>
        )}

        {/* ── Cuerpo con scroll ── */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-y-contain touch-pan-y">
          <div className="px-6 py-5">
            {pestana === 'login'        && <TabInicioSesion          alConfirmar={onConfirmar} />}
            {pestana === 'registro'     && <TabRegistro              alConfirmar={onConfirmar} />}
            {pestana === 'verificacion' && <TabVerificacionIdentidad  alConfirmar={onConfirmar} />}
          </div>

          {/* ── Pie: solo en login/registro ── */}
          {!esVerificacion && (
            <div className="px-6 pb-5 pt-0 text-center">
              <p className="text-[12px] text-[var(--text-muted)] m-0">
                ¿Solo quieres explorar?{' '}
                <button onClick={onCerrar}
                  className="text-[var(--primary-color)] font-semibold bg-transparent border-none cursor-pointer p-0 text-[12px] font-[inherit]">
                  Continuar en modo demo
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
