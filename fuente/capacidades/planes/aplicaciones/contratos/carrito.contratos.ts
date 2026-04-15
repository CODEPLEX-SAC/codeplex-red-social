/**
 * Dominio — Carrito de Suscripciones
 */

export interface ItemCarrito {
  id: number;
  precioDesde?: string;
  [key: string]: unknown;
}

/** Suma el precio base de cada Aplicacion en el carrito */
export function calcularTotalCarrito(items: ItemCarrito[]): number {
  return items.reduce((total: number, item: ItemCarrito) => {
    const precio: number = parseFloat(item.precioDesde?.replace(/[^\d.]/g, "") ?? "0") || 0;
    return total + precio;
  }, 0);
}

/** Retorna true si una Aplicacion ya está en el carrito */
export function estaEnCarrito(items: ItemCarrito[], aplicacionId: number): boolean {
  return items.some((item: ItemCarrito) => item.id === aplicacionId);
}
