/**
 * Calcula el costo mensual de los servidores: horas encendidas por tarifa horaria,
 * más $20 por cada GB de almacenamiento que consume la base de datos.
 *
 * @param {number} cantHoras - Horas que estuvieron encendidos los servidores.
 * @param {number} tarifaHora - Precio de cada hora de servidor.
 * @param {number} gbAlmacenamiento - GB de almacenamiento que consume la base.
 * @returns {number} Costo mensual de servidores.
 */
const COSTO_POR_GB = 20;

function calcularCostoServidores(cantHoras, tarifaHora, gbAlmacenamiento) {
    if (typeof cantHoras !== "number" || cantHoras < 0) {
        throw new Error("cantHoras debe ser un número mayor o igual a 0.");
    }
    if (typeof tarifaHora !== "number" || tarifaHora < 0) {
        throw new Error("tarifaHora debe ser un número mayor o igual a 0.");
    }
    if (typeof gbAlmacenamiento !== "number" || gbAlmacenamiento < 0) {
        throw new Error("gbAlmacenamiento debe ser un número mayor o igual a 0.");
    }

    return cantHoras * tarifaHora + COSTO_POR_GB * gbAlmacenamiento;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = calcularCostoServidores;
}
