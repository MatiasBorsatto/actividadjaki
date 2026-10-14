/**
 * Logística: crea un gestor que registra envíos y acumula los totales del día.
 * Cada envío cuesta $500 por km.
 *
 * @returns {function(number): {costoEnvio: number, totalPedidosDelDia: number, totalRecaudadoDelDia: number}}
 */
function crearGestorPedidos() {
  const COSTO_POR_KM = 500;
  let totalPedidosDelDia = 0;
  let totalRecaudadoDelDia = 0;

  return function procesarEnvio(distanciaKm) {
    if (typeof distanciaKm !== "number" || !Number.isFinite(distanciaKm) || distanciaKm <= 0) {
      throw new Error("La distancia debe ser un número mayor a 0.");
    }

    // Cálculo del costo individual
    const costoEnvio = distanciaKm * COSTO_POR_KM;

    // Actualización de contadores del día
    totalPedidosDelDia += 1;
    totalRecaudadoDelDia += costoEnvio;

    return {
      costoEnvio,
      totalPedidosDelDia,
      totalRecaudadoDelDia
    };
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = crearGestorPedidos;
}
