let consumo = parseInt(prompt("¿Cuantos kWh de luz consumiste este mes según la factura?"))

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

function dameElTipoDeFacturaEnBaseAlConsumo(consumo) {
    if (consumo > 120) {
        return new FacturaMayorA120Kwh()
    } else {
        return new FacturaHastaA120Kwh()
    }
}

const factura = dameElTipoDeFacturaEnBaseAlConsumo(consumo)
const resultado = factura.calcularPrecioAPagar(consumo)


document.write("<h3>El precio a pagar de luz este mes es de $ " + resultado.precioAPagar + "</h3>")
if (resultado.montoExtra == 0) {
    document.write("<h3>No corresponde monto extra este mes :)</h3>")
} else {
    document.write("<h3>El monto extra por subidas de tensión es de: $ " + resultado.montoExtra + "</h3>")
}

