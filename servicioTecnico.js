function calcularTotalReparacion(cantHoras, tarifaHora, precioRepuesto, porcentajeRecargo = 0.30) {
    // 1. Validar que el recargo esté entre 20% (0.20) y 40% (0.40)
    if (porcentajeRecargo < 0.20 || porcentajeRecargo > 0.40) {
        throw new Error("El recargo de repuestos debe estar entre el 20% y el 40%.");
    }

    // 2. Calcular costo de mano de obra
    let costoManoObra = cantHoras * tarifaHora;

    // 3. Calcular costo de repuestos con recargo aplicado
    let costoRepuestoConRecargo = precioRepuesto * (1 + porcentajeRecargo);

    // 4. Calcular el total del arreglo
    let totalArreglo = costoManoObra + costoRepuestoConRecargo;

    return totalArreglo;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = calcularTotalReparacion;
}