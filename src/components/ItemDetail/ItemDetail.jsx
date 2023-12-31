import { useState } from "react";
import ItemCount from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const ItemDetail = ({ id, nombre, precio, imagen, disponible, fechaCreacion, categoria, ventas, stock }) => {
    const [quantityAdded, setQuantityAdded] = useState(0);
    const { addItem } = useContext(CartContext);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleOnAdd = (quantity) => {
        setQuantityAdded(quantity);
        const item = { id, nombre, precio, imagen };
        addItem(item, quantity);
    };

    const showCheckoutButton = quantityAdded > 0;

    return (
        <div className="card mt-1 align-items-center shadow p-3 mb-5 bg-body rounded" data-aos="zoom-in-up" data-aos-duration="1000" style={{ width: '30rem' }}>
            <img className="card-img-top" src={imagen} alt={nombre} />
            <div className="card-body card-text text-center">
                <h5>{nombre}</h5>
                <h6>Precio: {precio}</h6>
                <p>Disponible: {disponible ? 'Sí' : 'No'}</p>
                {!showCheckoutButton && (
                    <ItemCount initial={1} stock={stock} onAddToCart={handleOnAdd} />
                )}
                {showCheckoutButton && (
                    <div>
                        <div className="checkout-buttons">
                            <Link to="/cart" className="btn" onClick={scrollToTop}>Finalizar Compra</Link>
                        </div>
                        <div>
                            <Link to="/productos" className="btn mt-3">Continuar Comprando</Link>
                        </div>
                    </div>
                )}
                {!showCheckoutButton && (
                    <div className="continue-shopping">
                        <Link to="/productos" className="btn mt-3">Continuar Comprando</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemDetail;
