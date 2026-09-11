create or replace function gestion_base.fn_listar_entidades_base(p_empresa_id uuid)
returns table(entidad_id uuid, nombre text, estado text) as $$
begin
    return query
    select entidad_id, nombre, estado
      from gestion_base.vista_resumen_entidades_base
     where empresa_id = p_empresa_id;
end;
$$ language plpgsql;
