let consumo = parseInt(prompt("¿Cuantos kWh de luz consumiste este mes según la factura?"))

function FacturaMenorA120() {
    this.precioPrimeros60Kwh = 	0.08686
    this.precioSiguientes60Kwh = 0.11514

    this.calcularPrecioAPagar = function(consumo){
        if(consumo>60 && consumo <120){
            return (60*this.precioPrimeros60Kwh) + ((consumo - 60)*this.precioSiguientes60Kwh)
        }
        return consumo * this.precioPrimeros60Kwh
    }
}

function FacturaMayorA120() {
    this.precioPrimeros60Kwh = 0.09347
    this.precioSiguientes60Kwh = 0.11932
    this.precioExcedente120Kwh = 0.22030

    this.calcularPrecioAPagar = function (consumo) {
        if(consumo>60 && consumo <120){
            return (60*this.precioPrimeros60Kwh) + ((consumo - 60)*this.precioSiguientes60Kwh)
        }
        if(consumo>120){
            return (60*this.precioPrimeros60Kwh) + (60*this.precioSiguientes60Kwh) + ((consumo - 120)*this.precioExcedente120Kwh)
        }
        return consumo * this.precioPrimeros60Kwh
    }
}

function dameElTipoDeFacturaEnBaseAlConsumo(consumo) {
    if (consumo > 120) {
        return new FacturaMayorA120()
    } else {
        return new FacturaMenorA120()
    }
}

const factura = new dameElTipoDeFacturaEnBaseAlConsumo(consumo)

console.log(factura.calcularPrecioAPagar(consumo))

document.write("<h3>El precio a pagar de luz este mes es de $ " + factura.calcularPrecioAPagar(consumo) + "</h3>")
