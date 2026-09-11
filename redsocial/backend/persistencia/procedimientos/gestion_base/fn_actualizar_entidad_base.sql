create or replace function gestion_base.fn_actualizar_entidad_base(
    p_entidad_id uuid,
    p_empresa_id uuid,
    p_nombre text,
    p_estado text
) returns void as $$
begin
    update gestion_base.entidades_base
       set nombre = p_nombre,
           estado = p_estado,
           actualizado_en = now()
     where entidad_id = p_entidad_id
       and empresa_id = p_empresa_id;
end;
$$ language plpgsql;
