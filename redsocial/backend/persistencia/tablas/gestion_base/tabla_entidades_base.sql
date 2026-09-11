create table if not exists gestion_base.entidades_base (
    entidad_id uuid primary key,
    empresa_id uuid not null,
    sucursal_id uuid not null,
    periodo_id uuid not null,
    nombre text not null,
    estado text not null,
    creado_en timestamptz not null default now(),
    actualizado_en timestamptz not null default now()
);
