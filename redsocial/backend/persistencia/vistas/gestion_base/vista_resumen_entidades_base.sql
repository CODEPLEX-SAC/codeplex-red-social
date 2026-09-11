create or replace view gestion_base.vista_resumen_entidades_base as
select entidad_id, empresa_id, sucursal_id, periodo_id, nombre, estado
from gestion_base.entidades_base;
