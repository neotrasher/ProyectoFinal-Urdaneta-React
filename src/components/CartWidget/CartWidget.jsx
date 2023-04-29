function CartWidget(props) {
    return (
        <a id="cart-icon" href="#">
            <img className="logosNavbar me" src={props.cartUrl} alt="carrito" />
            <span className="badge rounded-pill bg-dark cart-badge" id="cart-count">3</span>
        </a>
    );
}

export default CartWidget;