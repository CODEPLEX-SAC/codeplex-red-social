create or replace function gestion_base.fn_registrar_entidad_base(
    p_entidad_id uuid,
    p_empresa_id uuid,
    p_sucursal_id uuid,
    p_periodo_id uuid,
    p_nombre text,
    p_estado text
) returns void as $$
begin
    insert into gestion_base.entidades_base (entidad_id, empresa_id, sucursal_id, periodo_id, nombre, estado)
    values (p_entidad_id, p_empresa_id, p_sucursal_id, p_periodo_id, p_nombre, p_estado);
end;
$$ language plpgsql;
