import React from 'react';
import Icon from '@/compartido/interfaz/primitivas/Icono';

export default function BtnEditar({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-transparent cursor-pointer text-[var(--text-muted)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors shrink-0"
    >
      <Icon name="edit_regular" size={13} />
    </button>
  );
}
