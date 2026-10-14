/**
 * SISTEMA INTEGRADO DE CÁLCULO DE COSTOS E INGRESOS PARA LA EMPRESA
 */

/**
 * MÓDULOS (cada uno vive en su propio archivo)
 * 1. Fondos de inversión  2. Suscripciones / abonos  3. Reparaciones y servicios
 * 4. Ventas en mostrador  5. Costo de servidores     6. Compra de mercadería
 * 7. Liquidación de sueldos  8. Logística
 */
const fondosModulo = require('./calcularInversiones.js');
const abonosModulo = require('./calcularIngresosSuscripcion.js');
const reparacionesModulo = require('./servicioTecnico.js');
const ventasModulo = require('./ventasMostrador.js');
const servidoresModulo = require('./costoServidores.js');
const comprasModulo = require('./compraMercaderia.js');
const sueldosModulo = require('./liquidarSueldo.js');
const logisticaModulo = require('./logistica.js');

/**
 * 9. MÓDULO INTEGRADOR: RESUMEN FINANCIERO DE LA EMPRESA
 * Permite calcular el total general de la empresa integrando todos los módulos en una sola llamada.
 *
 * Ingresos (suman al totalGeneral): fondos, abonos, reparaciones, ventas y logística (envíos).
 * Costos (se unifican en totalCostos): servidores, compras de mercadería y sueldos.
 * resultadoNeto = totalGeneral (ingresos) - totalCostos.
 *
 * @param {Object} datos - Objeto con los datos de las operaciones de la empresa.
 * @returns {Object} Resumen detallado con totales desglosados y el total general.
 */
function calcularResumenEmpresa(datos = {}) {
    const resumen = {
        gananciaFondos: 0,
        ingresosAbonos: 0,
        ingresosReparaciones: 0,
        ingresosVentas: 0,
        ingresosLogistica: 0,
        costoServidores: 0,
        costoCompras: 0,
        costoSueldos: 0,
        totalCostos: 0,
        totalGeneral: 0,
        resultadoNeto: 0
    };

    if (datos.fondoInversion) {
        const { capital, tasaInteres, mes } = datos.fondoInversion;
        resumen.gananciaFondos = fondosModulo(capital, tasaInteres, mes);
    }

    if (datos.abonos) {
        const { cantUsuarios, precioCuota } = datos.abonos;
        resumen.ingresosAbonos = abonosModulo(cantUsuarios, precioCuota);
    }

    if (Array.isArray(datos.reparaciones)) {
        resumen.ingresosReparaciones = datos.reparaciones.reduce((total, r) => {
            return total + reparacionesModulo(r.cantHoras, r.tarifaHora, r.precioRepuesto, r.porcentajeRecargo);
        }, 0);
    }

    if (Array.isArray(datos.ventasMostrador)) {
        resumen.ingresosVentas = datos.ventasMostrador.reduce((total, v) => {
            return total + ventasModulo(v.listaProductos, v.tarjeta);
        }, 0);
    }

    // envios: arreglo de distancias en km; el gestor acumula lo recaudado
    if (Array.isArray(datos.envios)) {
        const registrarEnvio = logisticaModulo();
        datos.envios.forEach(km => {
            resumen.ingresosLogistica = registrarEnvio(km).totalRecaudadoDelDia;
        });
    }

    if (datos.servidores) {
        const { cantHoras, tarifaHora, gbAlmacenamiento } = datos.servidores;
        resumen.costoServidores = servidoresModulo(cantHoras, tarifaHora, gbAlmacenamiento);
    }

    if (datos.compras) {
        const { precioCosto, cantidad, impuestoImportacion } = datos.compras;
        resumen.costoCompras = comprasModulo(precioCosto, cantidad, impuestoImportacion);
    }

    if (Array.isArray(datos.sueldos)) {
        resumen.costoSueldos = datos.sueldos.reduce((total, e) => {
            return total + sueldosModulo(e.sueldoBase, e.horasExtra, e.valorHoraExtra);
        }, 0);
    }

    // Costos unificados: servidores + compras de mercadería + sueldos.
    resumen.totalCostos =
        resumen.costoServidores +
        resumen.costoCompras +
        resumen.costoSueldos;

    // totalGeneral suma solo ingresos; el resultado neto descuenta el total de costos.
    resumen.totalGeneral =
        resumen.gananciaFondos +
        resumen.ingresosAbonos +
        resumen.ingresosReparaciones +
        resumen.ingresosVentas +
        resumen.ingresosLogistica;

    resumen.resultadoNeto = resumen.totalGeneral - resumen.totalCostos;

    return resumen;
}

// Exportación integrada de todos los módulos
module.exports = {
    calcularGananciaMensual: fondosModulo,
    calcularIngresosAbonos: abonosModulo,
    calcularTotalReparacion: reparacionesModulo,
    calcularVenta: ventasModulo,
    calcularCostoServidores: servidoresModulo,
    calcularCompraMercaderia: comprasModulo,
    liquidarSueldo: sueldosModulo,
    crearGestorPedidos: logisticaModulo,
    calcularResumenEmpresa
};
