/**
 * Compra de mercadería: calcula cuánto dinero gasta la empresa al reponer stock.
 *
 * @param {number} precioCosto - Precio de costo por unidad.
 * @param {number} cantidad - Cantidad de unidades (entero).
 * @param {number} impuestoImportacion - Impuesto de importación en % (ej: 35 = 35%).
 * @returns {number} Total de la compra con impuesto, redondeado a 2 decimales.
 */
function calcularCompraMercaderia(precioCosto, cantidad, impuestoImportacion) {
  if (precioCosto < 0 || cantidad < 0 || impuestoImportacion < 0) {
    throw new Error("Los valores no pueden ser negativos");
  }
  if (!Number.isInteger(cantidad)) {
    throw new Error("La cantidad de unidades debe ser un número entero");
  }

  const costoBase = precioCosto * cantidad;
  const impuesto = costoBase * (impuestoImportacion / 100);
  const total = costoBase + impuesto;

  return Math.round(total * 100) / 100; // redondeo a 2 decimales
}

// Ejemplo de uso:
// calcularCompraMercaderia(1500.75, 20, 35); // 40520.25

if (typeof module !== 'undefined' && module.exports) {
  module.exports = calcularCompraMercaderia;
}
