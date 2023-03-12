// Array de objetos con información de los productos
let productos = [{
        nombre: "Aretes",
        precio: 20000,
        stock: 5
    },
    {
        nombre: "Collares",
        precio: 50000,
        stock: 3
    },
    {
        nombre: "Prendedores",
        precio: 30000,
        stock: 2
    }
];

let filtroPrecio = prompt("¿Desea filtrar por precio? (S/N)").toUpperCase();

while (filtroPrecio !== "S" && filtroPrecio !== "N") {
    alert("Respuesta inválida. Por favor, introduzca 'S' o 'N'.");
    filtroPrecio = prompt("¿Desea filtrar por precio? (S/N)").toUpperCase();
}
if (filtroPrecio === "S") {
    let precioMinimo = parseInt(prompt("Ingrese el precio mínimo: "));
    let precioMaximo = parseInt(prompt("Ingrese el precio máximo: "));
    let productosFiltrados = productos.filter(producto => producto.precio > precioMinimo && producto.precio < precioMaximo);

    if (productosFiltrados.length === 0) {
        alert("No hay productos disponibles en el rango de precios especificado.");
    } else {
        let listaProductos = productosFiltrados.map(producto => producto.nombre).join("\n");
        alert("Productos disponibles en el rango de precios especificado:\n" + listaProductos);
    }
} else if (filtroPrecio === "N") {
    alert("Continuando sin filtro de precios...");
}

// Función para buscar un producto por su nombre
function buscarProducto(nombreProducto) {
    let productoEncontrado = productos.find(producto => producto.nombre.toLowerCase() === nombreProducto.toLowerCase());
    if (productoEncontrado) {
        return productoEncontrado;
    } else {
        return null;
    }
}

// Función para filtrar los productos disponibles
function filtrarProductos(productos) {
    let productosDisponibles = [];
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].stock > 0) {
            productosDisponibles.push(productos[i].nombre);
        }
    }
    return productosDisponibles;
}

function esCantidadValida(mensaje) {
    let cantidad;
    do {
        cantidad = prompt(mensaje);
        if (cantidad === null) {
            alert("Debes ingresar una cantidad válida");
            continue;
        }
        if (isNaN(cantidad) || cantidad < 1) {
            alert("Por favor ingresa un número válido y mayor que cero");
        } else {
            break;
        }
    } while (true);
    return parseInt(cantidad);
}

let carrito = 0;
let productosAgotados = false; // variable de control

do {
    let productosDisponibles = filtrarProductos(productos);
    if (productosDisponibles.length === 0) { // verificar si no hay productos disponibles
        alert("Lo siento, todos los productos están agotados.");
        break;
    }
    let seleccionProducto;
    do {
        seleccionProducto = prompt(
            "Productos disponibles:\n" +
            productosDisponibles.join("\n") +
            "\nIngresa el nombre del producto que deseas agregar al carrito:"
        ).toLowerCase();
        if (!buscarProducto(seleccionProducto)) {
            alert("Producto inválido. Por favor elige uno de los productos disponibles.");
        }
    } while (!buscarProducto(seleccionProducto));

    let productoSeleccionado = buscarProducto(seleccionProducto);
    let stockDisponible = productoSeleccionado.stock;
    if (stockDisponible === 0) {
        alert("Lo siento, este producto está agotado.");
        continue;
    }
    let cantidadProductos;

    cantidadProductos = esCantidadValida(
        "Ingresa la cantidad de " + productoSeleccionado.nombre + " que deseas agregar al carrito:"
    );
    while (cantidadProductos > stockDisponible) {
        alert("Lo siento, no hay suficiente stock de " + productoSeleccionado.nombre);
        cantidadProductos = esCantidadValida(
            "Ingresa una cantidad válida de " +
            productoSeleccionado.nombre +
            " que deseas agregar al carrito, solo quedan " +
            stockDisponible +
            " unidades!"
        );
    }
    carrito += productoSeleccionado.precio * cantidadProductos;
    productoSeleccionado.stock -= cantidadProductos;

    // Preguntar si el usuario desea agregar más productos al carrito
    let agregarOtroProducto;
    do {
        agregarOtroProducto = prompt("¿Deseas agregar otro producto al carrito? (S/N)");
        if (agregarOtroProducto === null) {
            alert("Por favor ingresa una respuesta válida (S/N)");
        } else {
            agregarOtroProducto = agregarOtroProducto.toUpperCase();
        }
    } while (agregarOtroProducto !== "S" && agregarOtroProducto !== "N");

    if (agregarOtroProducto === "N") {
        break;
    }

} while (true);

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