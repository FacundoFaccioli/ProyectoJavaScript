let consumo = parseInt(prompt("¿Cuantos kWh de luz consumiste este mes según la factura?"))

function calcularHasta120(consumo) {
    const precioPrimeros60Kwh = 	0.08686
    const precioSiguientes60Kwh = 0.11514

    let precioAPagar
    if(consumo > 60 && consumo < 120){
        precioAPagar = (60* precioPrimeros60Kwh) + ((consumo - 60)* precioSiguientes60Kwh)
    } else {
        precioAPagar = consumo * precioPrimeros60Kwh
    }
    return {
        precioAPagar,
        montoExtra: calcularMontoExtraAleatorio()
    }
}

function calcularDesde120(consumo) {
    const precioPrimeros60Kwh = 0.09347
    const precioSiguientes60Kwh = 0.11932
    const precioExcedente120Kwh = 0.22030

    let precioAPagar
    if(consumo > 60 && consumo <120){
        precioAPagar = (60* precioPrimeros60Kwh) + ((consumo - 60)* precioSiguientes60Kwh)
    }
    if(consumo > 120){
        precioAPagar = (60* precioPrimeros60Kwh) + (60* precioSiguientes60Kwh) + ((consumo - 120)* precioExcedente120Kwh)
    } else {
        precioAPagar = consumo * precioPrimeros60Kwh
    }

    return {
        precioAPagar,
        montoExtra: calcularMontoExtraAleatorio()
    }
}
function probabilidadTresPorCiento() {
    const numeroAleatorio = Math.random();

    if (numeroAleatorio <= 0.03) {
        return true;
    } else {
        return false;
    }
}

function calcularMontoExtraAleatorio() {
    let precioExtra = 0

    for (let i = 0; i < 10; i++) {
        if (probabilidadTresPorCiento()) {
            precioExtra += 37
        }
    }

    return precioExtra
}

function dameElPrecioEnBaseAlConsumo(consumo) {
    if (consumo > 120) {
        return calcularDesde120(consumo)
    } else {
        return calcularHasta120(consumo)
    }
}

const resultado = dameElPrecioEnBaseAlConsumo(consumo)


console.log("El precio a pagar de luz este mes es de $ " + resultado.precioAPagar)
if (resultado.montoExtra == 0) {
    console.log("No corresponde monto extra este mes :)")
} else {
    console.log("El monto extra por subidas de tensión es de: $ " + resultado.montoExtra)
}
