const idsDeClienteValidos = [123, 456, 789, 6655]

function obtenerNumeroAleatorio() {
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
        if (obtenerNumeroAleatorio()) {
            precioExtra += 37
        }
    }

    return precioExtra
}

function FacturaHastaA120Kwh() {
    this.precioPrimeros60Kwh = 	0.08686
    this.precioSiguientes60Kwh = 0.11514

    this.calcularPrecioAPagar = function(consumo){
        let precioAPagar
        if(consumo>60 && consumo <120){
            precioAPagar = (60*this.precioPrimeros60Kwh) + ((consumo - 60)*this.precioSiguientes60Kwh)
        } else {
            precioAPagar = consumo * this.precioPrimeros60Kwh
        }
        return {
            precioAPagar,
            montoExtra: calcularMontoExtraAleatorio()
        }
    }
}

function FacturaMayorA120Kwh() {
    this.precioPrimeros60Kwh = 0.09347
    this.precioSiguientes60Kwh = 0.11932
    this.precioExcedente120Kwh = 0.22030

    this.calcularPrecioAPagar = function (consumo) {
        let precioAPagar
        if(consumo>60 && consumo <120){
            precioAPagar = (60*this.precioPrimeros60Kwh) + ((consumo - 60)*this.precioSiguientes60Kwh)
        }
        if(consumo>120){
            precioAPagar = (60*this.precioPrimeros60Kwh) + (60*this.precioSiguientes60Kwh) + ((consumo - 120)*this.precioExcedente120Kwh)
        } else {
            precioAPagar = consumo * this.precioPrimeros60Kwh
        }

        return {
            precioAPagar,
            montoExtra: calcularMontoExtraAleatorio()
        }
    }
}

function obtenerFactura(consumo) {
    if (consumo > 120) {
        return new FacturaMayorA120Kwh()
    } else {
        return new FacturaHastaA120Kwh()
    }
}

let clienteId = parseInt(prompt("Por favor ingrese su ID de cliente"))

if (idsDeClienteValidos.includes(clienteId)) {
    const consumo = parseInt(prompt("¿Cuantos kWh de luz consumiste este mes según la factura?"))
    const factura = obtenerFactura(consumo)
    const resultado = factura.calcularPrecioAPagar(consumo)


    console.log(`El precio a pagar de luz este mes es de ${resultado.precioAPagar}`)
    if (resultado.montoExtra === 0) {
        console.log("No corresponde monto extra este mes :)")
    } else {
        console.log("El monto extra por subidas de tensión es de: " + resultado.montoExtra + " pesos")
    }
} else {
    console.log("El cliente no pertenece a la compañía")
}
