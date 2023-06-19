# Readme

Este proyecto es un ejemplo de una tienda en línea desarrollada con React. A continuación, se presentan los componentes principales utilizados en la aplicación:

## Componente Navbar

El componente `Navbar` es responsable de renderizar la barra de navegación de la tienda. Proporciona enlaces a diferentes secciones del sitio y muestra el logotipo de la tienda, enlaces a redes sociales y un carrito de compras.

Este componente hace uso de las siguientes librerías:

- [react-router-dom](https://www.npmjs.com/package/react-router-dom): Esta librería se utiliza para manejar la navegación entre las diferentes páginas de la aplicación. Permite crear enlaces y rutas que se corresponden con los componentes de React.

## Componente ItemListContainer

El componente `ItemListContainer` es responsable de mostrar una lista de productos en la tienda. Obtiene los datos de los productos desde una base de datos Firestore y los muestra utilizando el componente `ItemList`.

Este componente hace uso de las siguientes librerías:

- [firebase](https://www.npmjs.com/package/firebase): Esta librería se utiliza para interactuar con la base de datos Firestore de Firebase. Permite realizar consultas y obtener documentos de la base de datos.

## Componente Cart

El componente `Cart` representa el carrito de compras de la tienda. Muestra los productos agregados al carrito, permite eliminar productos individualmente o vaciar completamente el carrito, y ofrece la opción de proceder con el pago.

Este componente hace uso de las siguientes librerías:

- [sweetalert2](https://www.npmjs.com/package/sweetalert2): Esta librería se utiliza para mostrar mensajes de confirmación al realizar acciones como vaciar el carrito o eliminar un producto. Proporciona una interfaz de diálogo atractiva y personalizable.

- [@fortawesome/react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome): Esta librería se utiliza para mostrar íconos en el componente `Cart`. Permite utilizar una amplia variedad de íconos de forma sencilla.

## Componente OrderConfirmation

El componente `OrderConfirmation` muestra un formulario donde el usuario puede proporcionar los detalles de pago para completar una compra. Una vez que se envía el formulario, se crea una nueva orden en la base de datos Firestore.

Este componente hace uso de las siguientes librerías:

- [firebase](https://www.npmjs.com/package/firebase): Al igual que el componente `ItemListContainer`, este componente utiliza la librería Firebase para interactuar con la base de datos Firestore y agregar una nueva orden.

- [sweetalert2](https://www.npmjs.com/package/sweetalert2): Se utiliza para mostrar una notificación de éxito una vez que se ha completado la compra.

## Instrucciones de instalación

1. Clona este repositorio en tu máquina local.
2. Ejecuta el comando `npm install` para instalar las dependencias necesarias.
3. Utiliza el comando `npm start` para iniciar la aplicación en tu entorno de desarrollo.

¡Disfruta de tu experiencia de compra en línea con esta tienda desarrollada con React!

*Nota: Este readme se encuentra en desarrollo y se irá actualizando con información adicional.*