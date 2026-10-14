/**
 * Calcula el total de ingresos de la empresa por el cobro de abonos mensuales.
 * 
 * @param {number} cantUsuarios - Cantidad de usuarios activos (tipo entero / int).
 * @param {number} precio - Precio base de la cuota mensual (tipo double / float).
 * @returns {number} Total de ingresos por abonos.
 */
function calcularIngresosAbonos(cantUsuarios, precio) {
  // Validación de entradas
  if (typeof cantUsuarios !== 'number' || typeof precio !== 'number') {
    throw new TypeError('Ambos parámetros deben ser de tipo numérico.');
  }

  if (!Number.isInteger(cantUsuarios) || cantUsuarios < 0) {
    throw new Error('La variable cantUsuarios debe ser un número entero (int) mayor o igual a 0.');
  }

  if (precio < 0) {
    throw new Error('El precio debe ser un número positivo.');
  }

  const totalBase = cantUsuarios * precio;

  // Si supera 500 usuarios, aplica 10% de descuento por volumen (cuenta corporativa)
  if (cantUsuarios > 500) {
    return totalBase * 0.90;
  }

  return totalBase;
}

// Exportación para Node.js / CommonJS y compatibilidad
if (typeof module !== 'undefined' && module.exports) {
  module.exports = calcularIngresosAbonos;
}
