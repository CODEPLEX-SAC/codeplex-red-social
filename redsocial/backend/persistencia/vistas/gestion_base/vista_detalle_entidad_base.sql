create or replace view gestion_base.vista_detalle_entidad_base as
select entidad_id, empresa_id, sucursal_id, periodo_id, nombre, estado, creado_en, actualizado_en
from gestion_base.entidades_base;
