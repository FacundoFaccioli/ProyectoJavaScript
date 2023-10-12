const idsDeClienteValidos = [
    {
        id: "123",
        descuento: 0.1
    },
    {
        id: "AA456",
        descuento: 0.2
    },
    {
        id: "789",
        descuento: 0.05
    },
    {
        id: "6655",
        descuento: 0.15
    }
]

const ARSFormateador = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
})

function obtenerNumeroAleatorio() {
    const numeroAleatorio = Math.random();

    if (numeroAleatorio <= 0.03) {
        return true
    } else {
        return false
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

function actualizarIdDeUsuario() {
    if (localStorage.getItem("clienteId") != null) {
        const usuario = JSON.parse(localStorage.getItem("clienteId"))
        document.getElementById("idDeUsuario").innerHTML = "Tu id de usuario es: " + usuario.id
        document.getElementById("erroresUsuario").innerHTML = ""
    } else {
        document.getElementById("idDeUsuario").innerHTML = "No hay ID de cliente definido"
    }
}

document.getElementById("definirId").addEventListener("click", function () {
    const clienteId = document.getElementById("clienteId").value
    if (clienteId === "") {
        document.getElementById("erroresUsuario").innerHTML = "Por favor ingrese un ID de cliente"
    } else {
        const cliente = idsDeClienteValidos.find((id) => id.id === clienteId)
        if (cliente) {
            localStorage.setItem("clienteId", JSON.stringify(cliente));
            actualizarIdDeUsuario()
        } else {
            document.getElementById("erroresUsuario").innerHTML = "El id no pertenece a la compañía"
        }
    }
})

document.getElementById("botonCalcular").addEventListener("click", function () {
    const clienteString = localStorage.getItem("clienteId")
    if (clienteString  == null) {
        document.getElementById("erroresDeCalculo").innerHTML = "Por favor defina su ID de cliente"
        return
    } else {
        document.getElementById("erroresDeCalculo").innerHTML = ""
    }

    const cliente = JSON.parse(clienteString)

    const consumo = parseInt(document.getElementById("consumoCliente").value)
    const factura = obtenerFactura(consumo)
    const resultado = factura.calcularPrecioAPagar(consumo)

    document.getElementById("totalAPagar").innerHTML = "El precio a pagar de luz este mes es de " + ARSFormateador.format(resultado.precioAPagar - (resultado.precioAPagar * cliente.descuento)) +
        ".</br> Se te aplico un descuento del " + (cliente.descuento * 100) + "% (" + ARSFormateador.format(resultado.precioAPagar * cliente.descuento) + ")"

    if (resultado.montoExtra === 0) {
        document.getElementById("totalAPagar").innerHTML += ". <br/>No corresponde monto extra este mes :)" + "."
    } else {
        document.getElementById("totalAPagar").innerHTML += ". <br/>El monto extra por subidas de tensión es de: " + ARSFormateador.format(resultado.montoExtra) + "."
    }
})

actualizarIdDeUsuario()