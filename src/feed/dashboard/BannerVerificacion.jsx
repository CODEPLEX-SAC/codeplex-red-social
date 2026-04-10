import React, { useState } from 'react';
import { useSesion } from '../../identidad/sesion/SesionContext';
import { usePerfilSocial } from '../perfil-propio/PerfilSocialContext';

/**
 * DOMINIO: Feed > Verificación
 * Banner que aparece en el feed cuando el usuario está autenticado pero
 * aún no ha verificado su identidad. Invita a completar el proceso.
 */
export default function BannerVerificacion() {
  const { estadoSesion, comenzarVerificacionIdentidad } = useSesion();
  const { perfilSocial } = usePerfilSocial();
  const [cerrado, setCerrado] = useState(false);

  /* Solo mostrar si está autenticado, no verificado y no fue cerrado manualmente */
  if (estadoSesion !== 'autenticado') return null;
  if (perfilSocial.verificado) return null;
  if (cerrado) return null;

  const enRevision = perfilSocial.estadoVerificacion === 'en-revision';

  return (
    <div
      className="flex items-start gap-3 px-4 py-3 rounded-[var(--radius-md)] border"
      style={{
        background:   enRevision ? 'var(--warning-bg, #fffbeb)' : 'var(--primary-bg, #eff6ff)',
        borderColor:  enRevision ? 'var(--warning-color, #f59e0b)' : 'var(--primary-color)',
      }}
    >
      {/* Icono */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-[1px]"
        style={{ background: enRevision ? 'var(--warning-color, #f59e0b)' : 'var(--primary-color)' }}
      >
        {enRevision ? (
          /* Reloj */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        ) : (
          /* Escudo / verificación */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
        )}
      </div>

      {/* Texto */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-[var(--text-dark)] m-0 mb-[2px]">
          {enRevision
            ? 'Tu identidad está siendo verificada'
            : 'Verifica tu identidad para interactuar'}
        </p>
        <p className="text-[12px] text-[var(--text-muted)] m-0 leading-[1.4]">
          {enRevision
            ? 'Estamos revisando tu documento. Te avisaremos cuando esté listo. Mientras tanto, tu acceso es limitado.'
            : 'Para publicar, comentar y conectar con la comunidad necesitas verificar tu documento de identidad. Solo toma un momento.'}
        </p>
      </div>

      {/* Acción */}
      <div className="flex items-center gap-2 shrink-0">
        {!enRevision && (
          <button
            onClick={comenzarVerificacionIdentidad}
            className="px-3 py-[6px] rounded-[var(--radius-sm)] text-[12px] font-bold text-white border-none cursor-pointer transition-opacity duration-200 hover:opacity-90 whitespace-nowrap"
            style={{ background: 'var(--primary-color)' }}
          >
            Verificar ahora
          </button>
        )}
        <button
          onClick={() => setCerrado(true)}
          className="w-7 h-7 flex items-center justify-center border-none bg-transparent cursor-pointer text-[var(--text-muted)] rounded-full transition-colors duration-200 hover:bg-[var(--hover-color)] hover:text-[var(--text-dark)]"
          title="Cerrar"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
