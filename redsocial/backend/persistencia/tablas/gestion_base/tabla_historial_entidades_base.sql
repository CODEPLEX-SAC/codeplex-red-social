create table if not exists gestion_base.historial_entidades_base (
    historial_id uuid primary key,
    entidad_id uuid not null,
    empresa_id uuid not null,
    estado_anterior text,
    estado_nuevo text not null,
    usuario_id uuid not null,
    registrado_en timestamptz not null default now()
);
