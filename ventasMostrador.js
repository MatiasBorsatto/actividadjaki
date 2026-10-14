function calcularVenta(listaProductos, tarjeta) {
    if (!Array.isArray(listaProductos)) {
        throw new TypeError("listaProductos debe ser un arreglo de números.");
    }
    let totalVenta = 0;

    for (const precio of listaProductos) {
        totalVenta += precio;
    }

    if (tarjeta === 1) {
        totalVenta *= 1.15;
    }

    return totalVenta;
}

module.exports = calcularVenta;