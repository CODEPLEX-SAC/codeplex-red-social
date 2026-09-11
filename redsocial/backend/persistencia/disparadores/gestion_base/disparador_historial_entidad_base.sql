create or replace function gestion_base.fn_registrar_historial_entidad_base()
returns trigger as $$
begin
    insert into gestion_base.historial_entidades_base (historial_id, entidad_id, empresa_id, estado_anterior, estado_nuevo, usuario_id)
    values (gen_random_uuid(), new.entidad_id, new.empresa_id, old.estado, new.estado, gen_random_uuid());
    return new;
end;
$$ language plpgsql;
