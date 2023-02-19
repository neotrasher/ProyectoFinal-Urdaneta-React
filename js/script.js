let aretes = {
    precio: 20000,
    stock: 5
};
let collares = {
    precio: 50000,
    stock: 3
};
let prendedores = {
    precio: 30000,
    stock: 2
};

// Definimos el carrito de compras y su valor inicial
let carrito = 0;

// Función para manejar el caso en que no hay suficiente stock de un producto
function noHayStock(producto) {
    alert("Lo siento, no hay suficiente stock de " + producto);
    var cantidadProductos;
    do {
        cantidadProductos = esCantidadValida("Ingresa una cantidad válida de " + producto + " que deseas agregar al carrito, solo quedan " + stockDisponible + " unidades!");
        if (cantidadProductos > stockDisponible) {
            alert("Lo siento, no hay suficiente stock de " + producto);
        }
    } while (cantidadProductos > stockDisponible);
    return cantidadProductos;
}

// Función para validar la entrada del usuario
function esCantidadValida(mensaje) {
    let cantidad;
    do {
        cantidad = prompt(mensaje);
        if (cantidad === null || isNaN(cantidad) || cantidad <= 0) {
            alert("Por favor ingresa un número válido y mayor que cero");
        }
    } while (cantidad === null || isNaN(cantidad) || cantidad <= 0);
    return parseInt(cantidad);
}

// Definimos la variable stockDisponible
let stockDisponible;

// Usando un ciclo for, preguntamos al usuario por la cantidad de cada producto que desea agregar al carrito
for (let i = 1; i <= 3; i++) {
    let producto;
    if (i === 1) {
        producto = "Aretes";
    } else if (i === 2) {
        producto = "Collares";
    } else if (i === 3) {
        producto = "Prendedores";
    }
    switch (producto) {
        case "Aretes":
            stockDisponible = aretes.stock;
            break;
        case "Collares":
            stockDisponible = collares.stock;
            break;
        case "Prendedores":
            stockDisponible = prendedores.stock;
            break;
    }
    cantidadProductos = esCantidadValida("Ingresa la cantidad de " + producto + " que deseas agregar al carrito:");
    while (cantidadProductos > stockDisponible) {
        cantidadProductos = noHayStock(producto);
        switch (producto) {
            case "Aretes":
                stockDisponible = aretes.stock;
                break;
            case "Collares":
                stockDisponible = collares.stock;
                break;
            case "Prendedores":
                stockDisponible = prendedores.stock;
                break;
        }
    }
    switch (producto) {
        case "Aretes":
            carrito += aretes.precio * cantidadProductos;
            aretes.stock -= cantidadProductos;
            break;
        case "Collares":
            carrito += collares.precio * cantidadProductos;
            collares.stock -= cantidadProductos;
            break;
        case "Prendedores":
            carrito += prendedores.precio * cantidadProductos;
            prendedores.stock -= cantidadProductos;
            break;
    }
}

// Mostramos el valor total del carrito
alert("El valor total del carrito es: $" + carrito);

// Preguntar si el usuario tiene un código de descuento
let descuento = 0;
let codigoPromocional = prompt("¿Tiene un código promocional? Ingréselo aquí (si no tiene uno, deje en blanco):");

// Verificar si el código de promoción es válido
if (codigoPromocional !== null && codigoPromocional.toLowerCase() === "desc15") {
    descuento = carrito * 0.15;
    alert("¡Felicitaciones! Código promocional válido. Se ha aplicado un descuento del 15%.");
} else if (codigoPromocional !== "") {
    alert("Código promocional inválido.");
}

// Aplicar el descuento al total del carrito
carrito -= descuento;

// Mostrar el valor final del carrito, incluyendo el descuento aplicado
alert("El valor total del carrito, incluyendo el descuento aplicado, es: $" + carrito);