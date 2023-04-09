// Definir un mixin personalizado
const addToCartMixin = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  width: 425,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

// Obtener los botones "Agregar al carrito"
const addToCartButtons = document.querySelectorAll('a[id^="add-to-cart-"]');

// Escuchar el evento "click" en cada botón
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Obtener el id del producto
    const productId = button.id.replace('add-to-cart-', '');

    // Obtener el nombre y el precio del producto desde el DOM
    const productName = button.parentNode.querySelector('h5').textContent;
    const productPrice = button.parentNode.querySelector('h6').textContent;
    const productImage = button.parentNode.parentNode.querySelector('img').src;

    // Agregar el producto al carrito
    addToCart(productId, productName, productPrice, productImage);

    // Actualizar el resumen del carrito
    updateCartSummary();

    // Actualizar la ruta de la imagen en el mixin personalizado
    addToCartMixin.update({
      imageUrl: productImage
    });

    // Mostrar la alerta con el mixin personalizado
    addToCartMixin.fire({
      icon: 'success',
      title: 'Producto agregado al carrito',
      html: `<div style="display: flex; align-items: center;">
                <img src="${productImage}" alt="${productName}" width="50" height="" style="margin-right: 25px;">
                <div style="text-align: right;">
                  <p style="margin-bottom: 5px;" "><strong>${productName} x (${getProductQuantity(productId)})</strong></p>
                </div>
              </div>`
    });
  });
});

// Función para obtener la cantidad de un producto en el carrito
function getProductQuantity(id) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const product = cartItems.find(item => item.id === id);
  return product ? product.quantity : 0;
}

// Función para agregar un producto al carrito
function addToCart(id, name, price) {
  // Obtener los productos agregados al carrito
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Buscar si el producto ya está en el carrito
  const existingProduct = cartItems.find(item => item.id === id);


  // Si el producto ya está en el carrito, aumentar la cantidad
  // Si el producto no está en el carrito, agregarlo
  (existingProduct) ? existingProduct.quantity++: cartItems.push({
    id,
    name,
    price,
    quantity: 1
  });

  // Guardar los productos en localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Actualizar el contador de productos en el carrito
  updateCartCount();
}

// Función para actualizar el contador de productos en el carrito
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  let totalQuantity = 0;
  cartItems.forEach(item => {
    totalQuantity += item.quantity;
  });

  cartCount.textContent = totalQuantity;
}

// Declarar la variable booleana del descuento aplicado
let discountApplied = false;

// Listener al botón "Aplicar código"
const applyDiscountButton = document.getElementById('apply-discount');
applyDiscountButton.addEventListener('click', () => {
  // Verificar si el descuento aún no se ha aplicado y obtener el valor del input con id "discount-code"
  if (!discountApplied && document.getElementById('discount-code').value.toLowerCase() === 'descuento10') {
    // Calcular el descuento
    const discount = 0.1; // 10% de descuento

    // Obtener el total del carrito y calcular el nuevo total con descuento
    const cartTotalElement = document.getElementById('cart-total');
    const cartTotal = parseFloat(cartTotalElement.textContent);
    if (cartTotal === 0) {
      // Mostrar la alerta de error 
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      }).fire({
        title: 'Lo siento!',
        text: 'No hay productos en el carrito para aplicar un descuento.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } else {
      // Verificar si el descuento aún no se ha aplicado y obtener el valor del input con id "discount-code"
      if (!discountApplied && document.getElementById('discount-code').value.toLowerCase() === 'descuento10') {
        // Calcular el descuento
        const discount = 0.1; // 10% de descuento

        // Calcular el nuevo total con descuento
        const newTotal = cartTotal * (1 - discount);

        // Mostrar el nuevo total en el resumen del carrito y establecer discountApplied en true
        cartTotalElement.textContent = newTotal.toFixed(2);
        discountApplied = true;

        // Mostrar mensaje de descuento aplicado 
        Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        }).fire({
          icon: 'success',
          title: 'Descuento aplicado',
          text: 'El código de descuento ha sido aplicado con éxito.',
        });
      } else {
        // Mostrar mensaje de aviso cuando no se ha ingresado código o el descuento ya ha sido aplicado
        Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        }).fire({
          icon: 'warning',
          title: 'Lo siento!',
          text: 'Por favor ingresa un código de descuento válido o el descuento ya ha sido aplicado.',
        });
      }
    }
  } else {
    // Mostrar mensaje de aviso cuando no se ha ingresado código o el descuento ya ha sido aplicado
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    }).fire({
      icon: 'warning',
      title: 'Lo siento!',
      text: 'Por favor ingresa un código de descuento válido o el descuento ya ha sido aplicado.',
    });
  }
});

// Función para actualizar el resumen del carrito
function updateCartSummary() {
  const cartItemsList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartSummary = document.getElementById('cart-summary');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Restablecer la variable discountApplied
  discountApplied = false;

  // Agregar botón de limpiar carrito
  const clearCartBtn = document.getElementById('clear-cart');
  clearCartBtn.addEventListener('click', () => {
    // Verificar si el carrito está vacío
    if (cartItemsList.innerHTML === '') {
      // Mostrar la alerta de información
      Swal.fire({
        title: '',
        text: 'El carrito de compras está vacío.',
        icon: 'info',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#4A4848',
        iconColor: '#BD95B7',
      });
    } else {
      // Limpiar el carrito
      localStorage.clear();
      updateCartSummary();
      updateCartCount();
    }
  });

  // Limpiar la lista de productos en el resumen del carrito
  cartItemsList.innerHTML = '';

  let total = 0;

  // Agregar cada producto al resumen del carrito
  cartItems.forEach(item => {
    const productTotal = item.quantity * parseFloat(item.price);
    total += productTotal;

    const li = document.createElement('li');

    // Agregar botones "+" y "-" para incrementar y disminuir la cantidad de productos
    const btnDecrease = document.createElement('button');
    btnDecrease.classList.add('btn', 'btn-secondary', 'btn-sm', );
    btnDecrease.textContent = '-';
    btnDecrease.style.margin = '3px';
    btnDecrease.addEventListener('click', () => {
      decreaseQuantity(item.id);
      updateCartSummary();
      updateCartCount();
    });

    const btnIncrease = document.createElement('button');
    btnIncrease.classList.add('btn', 'btn-secondary', 'btn-sm');
    btnIncrease.textContent = '+';
    btnIncrease.style.margin = '3px'
    btnIncrease.addEventListener('click', () => {
      addToCart(item.id);
      updateCartSummary();
    });

    li.innerHTML = `${item.name} - $${item.price} x 
      <span id="quantity-${item.id}">${item.quantity}</span> 
      <span class="float-end">
      </span>`;
    li.lastElementChild.appendChild(btnDecrease);
    li.lastElementChild.appendChild(btnIncrease);
    li.style.fontSize = "15px";

    cartItemsList.appendChild(li);
  });

  // Actualizar el total en el resumen del carrito
  cartTotal.textContent = total.toFixed(2);

  // Actualizar el resumen del carrito en el DOM
  cartSummary.style.display = 'block';

  // Evitar que se cierre el carrito al hacer clic en los botones + y -
  const cartSummaryButtons = cartSummary.querySelectorAll('button');
  cartSummaryButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation();
    });
  });
}

function decreaseQuantity(itemId) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const itemIndex = cartItems.findIndex(item => item.id === itemId);

  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity--;

    if (cartItems[itemIndex].quantity === 0) {
      cartItems.splice(itemIndex, 1);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    updateCartSummary();
  }
}

function updateProductQuantity(product) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const itemIndex = cartItems.findIndex(item => item.id === product.id);

  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity++;
  } else {
    cartItems.push({
      ...product,
      quantity: 1
    });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartCount();
  updateCartSummary();
}

document.addEventListener("DOMContentLoaded", () => {
  // Obtener el icono del carrito y el contenedor del resumen del carrito
  const cartIcon = document.getElementById('cart-icon');
  const cartSummary = document.getElementById('cart-summary');

  // Actualizar el contador de productos en el carrito
  updateCartCount();

  // Mostrar el resumen del carrito al hacer hover sobre el icono del carrito
  cartIcon.addEventListener('mouseover', () => {
    updateCartSummary();
    cartSummary.style.display = 'block';
  });

  // Agregar event listener para cerrar carrito al hacer clic fuera de él
  document.addEventListener('click', function (event) {
    const cartSummary = document.getElementById('cart-summary');
    const targetElement = event.target;

    if (!cartSummary.contains(targetElement)) {
      cartSummary.classList.remove('show');
    }
    if (!cartSummary.contains(event.target)) {
      cartSummary.style.display = 'none';
    }
  });
});

// Obtener el botón "Iniciar compra" y el total del carrito
const checkoutButton = document.getElementById('checkout-button');
const cartTotal = document.getElementById('cart-total');

// Escuchar el evento "click" en el botón "Iniciar compra"
checkoutButton.addEventListener('click', () => {
  const total = parseInt(cartTotal.innerText);
  if (total === 0) {
    // Aqui se muestra una alerta para indicar que no hay productos en el carrito
    swal.fire({
      icon: 'error',
      title: 'Lo siento!',
      text: 'No hay productos en el carrito',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#4A4848'
    });
  } else {
    // Muestra una alerta para confirmar si todos los datos son correctos
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro?',
      text: '¿Deseas finalizar la compra?',
      showCancelButton: true,
      confirmButtonText: 'Sí, finalizar compra',
      confirmButtonColor: '#4A4848',
      iconColor: '#BD95B7',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#BD95B7',

    }).then((result) => {
      if (result.isConfirmed) {
        // Vacia el carrito
        localStorage.removeItem('cartItems');

        // Actualiza el contador de productos en el carrito
        updateCartCount();

        // Muestra una alerta para indicar que la compra ha finalizado correctamente
        Swal.fire({
          icon: 'success',
          title: 'Compra finalizada',
          text: 'La compra ha sido completada exitosamente.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#4A4848',
          iconColor: '#BD95B7',
        });
      }
    });
  }
});

// // Obtener el elemento select del filtro
// const filtroSelect = document.querySelector('.filtroProducto');

// // Obtener el contenedor de las tarjetas de productos
// const productosContainer = document.querySelector('.cards');

// // Función para cargar los productos desde el archivo JSON
// const cargarProductos = () => {
//   return new Promise((resolve, reject) => {
//     fetch('./assets/js/productos.json')
//       .then(response => response.json())
//       .then(data => resolve(data))
//       .catch(error => reject(error));
//   });
// };

// // Función para renderizar las tarjetas de productos en el contenedor
// const renderizarProductos = (productos) => {
//   productosContainer.innerHTML = '';
//   productos.forEach(producto => {
//     const card = `
//       <div class="card m-3 align-items-center shadow p-3 mb-5 bg-body rounded" data-aos="fade-right"
//         data-aos-duration="1500" style="width: 18rem;">
//         <img src="${producto.imagen}" class="card-img-top" alt="...">
//         <div class="card-body">
//           <h5 class="card-title text-center">${producto.nombre}</h5>
//           <h6 class="card-text text-center">${producto.precio}</h6>
//           <a class="btn btn-dark text-center" id="add-to-cart-1">Agregar al carrito</a>
//         </div>
//       </div>
//     `;
//     productosContainer.innerHTML += card;

    
//   });
// };

// // Función para filtrar los productos según la opción seleccionada en el filtro
// const filtrarProductos = (productos, filtro) => {
//   return new Promise((resolve) => {
//     switch (filtro) {
//       case 'price-ascending':
//         productos.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
//         break;
//       case 'price-descending':
//         productos.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
//         break;
//       case 'alpha-ascending':
//         productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
//         break;
//       case 'alpha-descending':
//         productos.sort((a, b) => b.nombre.localeCompare(a.nombre));
//         break;
//       case 'created-descending':
//         productos.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
//         break;
//       case 'created-ascending':
//         productos.sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion));
//         break;
//       case 'best-selling':
//         // Aquí tengo que implementar la lógica para ordenar por los productos más vendidos
//         break;
//       default:
//         // No se aplica ningún filtro
//         break;
//     }
//     resolve(productos);
//   });
// };

// // Cargar los productos y renderizarlos inicialmente
// cargarProductos()
//   .then(productos => {
//     renderizarProductos(productos);
//   })
//   .catch(error => {
//     console.error('Error al cargar los productos:', error);
//   });

// // Event listener para el cambio de opción en el filtro
// filtroSelect.addEventListener('change', (event) => {
//   const filtro = event.target.value;
//   cargarProductos()
//     .then(productos => {
//       return filtrarProductos(productos, filtro);
//     })
//     .then(productosFiltrados => {
//       renderizarProductos(productosFiltrados);
//     })
//     .catch(error => {
//       console.error('Error al filtrar los productos:', error);
//     });
// });