// Techo máximo de inversión: no se acepta un capital mayor a este monto.
const CAPITAL_MAXIMO = 1000000;

/**
 * Calcula la ganancia generada en un mes específico del fondo de inversión,
 * usando interés compuesto.
 *
 * Criterio (opción B): el parámetro "mes" representa cuántos periodos de
 * capitalización ya se completaron antes de calcular la ganancia de ese mes.
 * Es decir, mes=1 asume que ya hubo una capitalización previa.
 *
 * Fórmula:
 *   ganancia(mes) = capitalInvertido * (1 + tasa)^mes * tasa
 *
 * @param {number} capitalInvertido   - Capital inicial invertido (no puede superar CAPITAL_MAXIMO).
 * @param {number} porcentajeInteres  - Tasa de interés mensual en % (ej: 5 = 5%).
 * @param {number} mes                - Número de mes (entero, >= 1).
 * @returns {number} Dinero ganado únicamente en ese mes.
 */
function calcularGananciaMensual(capitalInvertido, porcentajeInteres, mes) {
    if (typeof capitalInvertido !== "number" || capitalInvertido < 0) {
        throw new Error("capitalInvertido debe ser un número positivo.");
    }
    if (capitalInvertido > CAPITAL_MAXIMO) {
        throw new Error("capitalInvertido no puede superar el máximo de inversión ($" + CAPITAL_MAXIMO + ").");
    }
    if (typeof porcentajeInteres !== "number" || porcentajeInteres < 0) {
        throw new Error("porcentajeInteres debe ser un número positivo.");
    }
    if (!Number.isInteger(mes) || mes < 1) {
        throw new Error("mes debe ser un número entero mayor o igual a 1.");
    }

    const tasa = porcentajeInteres / 100;
    const ganancia = capitalInvertido * Math.pow(1 + tasa, mes) * tasa;

    return ganancia;
}

// Ejemplo de uso:
// const ganancia = calcularGananciaMensual(100000, 5, 3);
// console.log(ganancia); // dinero ganado únicamente en el mes 3

module.exports = calcularGananciaMensual;
