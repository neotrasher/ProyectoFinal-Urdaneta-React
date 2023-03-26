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

    // Agregar el producto al carrito
    addToCart(productId, productName, productPrice);

    // Actualizar el resumen del carrito
    updateCartSummary();
  });
});

// Función para agregar un producto al carrito
function addToCart(id, name, price) {
  // Obtener los productos agregados al carrito
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Buscar si el producto ya está en el carrito
  const existingProduct = cartItems.find(item => item.id === id);

  if (existingProduct) {
    // Si el producto ya está en el carrito, aumentar la cantidad
    existingProduct.quantity++;
  } else {
    // Si el producto no está en el carrito, agregarlo
    cartItems.push({
      id,
      name,
      price,
      quantity: 1
    });
  }

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
  // Verificar si el descuento aún no se ha aplicado
  if (!discountApplied) {
    // Obtener el valor del input con id "discount-code"
    const discountCode = document.getElementById('discount-code').value;

    // Calcular el descuento
    let discount = 0;
    if (discountCode.toLowerCase() === 'descuento10') { // Ejemplo de código de descuento
      discount = 0.1; // 10% de descuento
    }

    // Obtener el total del carrito
    const cartTotalElement = document.getElementById('cart-total');
    const cartTotal = parseFloat(cartTotalElement.textContent);

    // Calcular el nuevo total con descuento
    const newTotal = cartTotal * (1 - discount);

    // Mostrar el nuevo total en el resumen del carrito
    cartTotalElement.textContent = newTotal.toFixed(2);

    // Establecer discountApplied en true
    discountApplied = true;
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
    localStorage.clear();
    updateCartSummary();
    updateCartCount()
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
    btnDecrease.classList.add('btn', 'btn-secondary', 'btn-sm');
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