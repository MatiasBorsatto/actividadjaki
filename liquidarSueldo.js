/**
 * Liquida el sueldo neto de un empleado: sueldo base + horas extra,
 * menos 11% de descuento de jubilación.
 *
 * @param {number} sueldoBase - Sueldo base.
 * @param {number} horasExtra - Cantidad de horas extra trabajadas.
 * @param {number} valorHoraExtra - Valor de cada hora extra.
 * @returns {number} Sueldo neto.
 */
function liquidarSueldo(sueldoBase, horasExtra, valorHoraExtra) {
  if (sueldoBase < 0 || horasExtra < 0 || valorHoraExtra < 0) {
    throw new Error("Los valores no pueden ser negativos");
  }

  const pagoHorasExtra = horasExtra * valorHoraExtra;
  const bruto = sueldoBase + pagoHorasExtra;
  const descuentoJubilacion = bruto * 0.11;
  const neto = bruto - descuentoJubilacion;

  return neto;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = liquidarSueldo;
}
