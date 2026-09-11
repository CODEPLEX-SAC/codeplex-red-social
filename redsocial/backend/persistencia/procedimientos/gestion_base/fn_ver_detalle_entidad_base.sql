create or replace function gestion_base.fn_ver_detalle_entidad_base(p_entidad_id uuid, p_empresa_id uuid)
returns table(entidad_id uuid, empresa_id uuid, sucursal_id uuid, periodo_id uuid, nombre text, estado text) as $$
begin
    return query
    select entidad_id, empresa_id, sucursal_id, periodo_id, nombre, estado
      from gestion_base.vista_detalle_entidad_base
     where entidad_id = p_entidad_id
       and empresa_id = p_empresa_id;
end;
$$ language plpgsql;
