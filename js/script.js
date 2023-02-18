/* // Definimos el precio de los productos
var precioProducto1 = 10;
var precioProducto2 = 15;
var precioProducto3 = 20;

// Definimos el carrito de compras y su valor inicial
var carrito = 0;

// Creamos una variable para almacenar la cantidad de productos que se agregaran al carrito
var cantidadProductos;

// Usando un ciclo for, preguntamos al usuario por la cantidad de cada producto que desea agregar al carrito
for (var i = 1; i <= 3; i++) {
  cantidadProductos = prompt("Ingresa la cantidad de producto " + i + " que deseas agregar al carrito:");
  carrito += precioProducto(i) * cantidadProductos;
}

// Usando un ciclo while, preguntamos al usuario si desea seguir agregando productos al carrito
var seguirAgregando = true;
while (seguirAgregando) {
  var agregarMas = prompt("Deseas agregar mas productos al carrito? (si/no)");
  if (agregarMas.toLowerCase() === "si") {
    var producto = prompt("Ingresa el numero de producto que deseas agregar al carrito (1, 2 o 3):");
    cantidadProductos = prompt("Ingresa la cantidad de producto " + producto + " que deseas agregar al carrito:");
    carrito += precioProducto(producto) * cantidadProductos;
  } else {
    seguirAgregando = false;
  }
}

// Funcion que devuelve el precio de un producto dado su numero
function precioProducto(numeroProducto) {
  switch (numeroProducto) {
    case 1:
      return precioProducto1;
    case 2:
      return precioProducto2;
    case 3:
      return precioProducto3;
  }
}

// Mostramos el valor total del carrito
alert("El valor total del carrito es: " + carrito); */



// Definimos el precio y el stock de los productos
// Definimos el precio y el stock de los productos
// Definimos el precio y el stock de los productos
// Definimos el precio y el stock de los productos
var camisas = {
    precio: 20,
    stock: 5
  };
  var zapatos = {
    precio: 50,
    stock: 3
  };
  var pantalones = {
    precio: 30,
    stock: 2
  };
  
  // Definimos el carrito de compras y su valor inicial
  var carrito = 0;
  
  // Función para manejar el caso en que no hay suficiente stock de un producto
  function noHayStock(producto) {
    console.log("Lo siento, no hay suficiente stock de " + producto);
    do {
      cantidadProductos = prompt("Ingresa una cantidad válida de " + producto + " que deseas agregar al carrito, solo quedan " + stockDisponible + " unidades!");
    } while (!esCantidadValida(cantidadProductos));
    return parseInt(cantidadProductos);
  }
  
  // Función para validar la entrada del usuario
  function esCantidadValida(cantidad) {
    return !isNaN(cantidad) && cantidad > 0;
  }
  
  // Usando un ciclo for, preguntamos al usuario por la cantidad de cada producto que desea agregar al carrito
  for (var i = 1; i <= 3; i++) {
    var producto;
    if (i === 1) {
      producto = "camisas";
    } else if (i === 2) {
      producto = "zapatos";
    } else if (i === 3) {
      producto = "pantalones";
    }
    var cantidadProductos;
    var stockDisponible;
    switch (producto) {
      case "camisas":
        stockDisponible = camisas.stock;
        break;
      case "zapatos":
        stockDisponible = zapatos.stock;
        break;
      case "pantalones":
        stockDisponible = pantalones.stock;
        break;
    }
    do {
      cantidadProductos = prompt("Ingresa la cantidad de " + producto + " que deseas agregar al carrito:");
    } while (!esCantidadValida(cantidadProductos));
    while (cantidadProductos > stockDisponible) {
      cantidadProductos = noHayStock(producto);
      switch (producto) {
        case "camisas":
          stockDisponible = camisas.stock;
          break;
        case "zapatos":
          stockDisponible = zapatos.stock;
          break;
        case "pantalones":
          stockDisponible = pantalones.stock;
          break;
      }
    }
    switch (producto) {
      case "camisas":
        carrito += camisas.precio * cantidadProductos;
        camisas.stock -= cantidadProductos;
        break;
      case "zapatos":
        carrito += zapatos.precio * cantidadProductos;
        zapatos.stock -= cantidadProductos;
        break;
      case "pantalones":
        carrito += pantalones.precio * cantidadProductos;
        pantalones.stock -= cantidadProductos;
        break;
    }
  }
  
  // Mostramos el valor total del carrito
  console.log("El valor total del carrito es: $" + carrito);
  
