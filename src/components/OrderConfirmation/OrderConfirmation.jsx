import React, { useState, useContext } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './OrderConfirmation.css';
import Swal from 'sweetalert2';

const OrderConfirmation = () => {
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [country, setCountry] = useState('');
    const [zip, setZip] = useState('');
    const [state, setState] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const navigate = useNavigate();
    const { totalPrice, clearCart, cartItems } = useContext(CartContext);

    const handleInputChange = (event, setValue) => {
        setValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const db = getFirestore();

        try {
            const docRef = await addDoc(collection(db, 'orders'), {
                email,
                cardNumber,
                expiration,
                cvv,
                cardHolder,
                country,
                zip,
                state,
                discountCode,
                products: cartItems,
                date: new Date(),
            });

            console.log('Orden creada con ID:', docRef.id);

            Swal.fire({
                icon: 'success',
                title: '¡Compra realizada!',
                text: `Tu orden con ID ${docRef.id} se ha completado correctamente.`,
                confirmButtonColor: '#4A4848',
                iconColor: '#BD95B7',
            }).then(() => {
                clearCart();
                navigate('/');
                window.scrollTo(0, 0);
            });

            setEmail('');
            setCardNumber('');
            setExpiration('');
            setCvv('');
            setCardHolder('');
            setCountry('');
            setZip('');
            setState('');
            setDiscountCode('');
        } catch (error) {
            console.error('Error al crear la orden:', error);
        }
    };


    return (
        <div className="container">
            <div className="card">
                <div className="payment-details">
                    <h3>Detalles del Pago</h3>
                    <p>Completa tu compra proporcionando los detalles de pago</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-text">
                        <input
                            type="text"
                            placeholder="luke@skywalker.com"
                            value={email}
                            onChange={(e) => handleInputChange(e, setEmail)}
                            required
                        />
                        <span>Email</span>
                    </div>
                    <div className="input-text">
                        <input
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber}
                            onChange={(e) => handleInputChange(e, setCardNumber)}
                            data-slots="0"
                            data-accept="\d"
                            required
                        />
                        <span>Numero de tarjeta</span>
                    </div>
                    <div className="input-text-cvv">
                        <input
                            type="text"
                            placeholder="mm/aa"
                            value={expiration}
                            onChange={(e) => handleInputChange(e, setExpiration)}
                            data-slots="my"
                            required
                        />
                    </div>
                    <div className="input-text-cvv cvv">
                        <input
                            type="text"
                            placeholder="000"
                            value={cvv}
                            onChange={(e) => handleInputChange(e, setCvv)}
                            data-slots="0"
                            data-accept="\d"
                            size="3"
                            required
                        />
                    </div>
                    <div className="input-text">
                        <input
                            type="text"
                            placeholder="Nombre y Apellidos"
                            value={cardHolder}
                            onChange={(e) => handleInputChange(e, setCardHolder)}
                            required
                        />
                        <span>Tarjetahabiente</span>
                    </div>
                    <div className="billing">
                        <span>Direccion de Pago</span>
                        <select
                            value={country}
                            onChange={(e) => handleInputChange(e, setCountry)}
                            required
                        >
                            <option>Seleccione Pais</option>
                            <option>United States</option>
                            <option>India</option>
                            <option>England</option>
                            <option>France</option>
                            <option>Germany</option>
                            <option>Japan</option>
                            <option>China</option>
                            <option>Italy</option>
                            <option>Russia</option>
                        </select>
                        <div className="zip-state">
                            <div className="zip">
                                <input
                                    type="text"
                                    placeholder="Codigo Postal"
                                    value={zip}
                                    onChange={(e) => handleInputChange(e, setZip)}
                                    required
                                />
                            </div>
                            <div className="state">
                                <select
                                    value={state}
                                    onChange={(e) => handleInputChange(e, setState)}
                                    required
                                >
                                    <option>Select State</option>
                                    <option>New York</option>
                                    <option>New Delhi</option>
                                    <option>London</option>
                                    <option>Paris</option>
                                    <option>Berlin</option>
                                    <option>Tokyo</option>
                                    <option>Bejing</option>
                                    <option>Rome</option>
                                    <option>Mosco</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="input-text">
                        <input
                            type="text"
                            placeholder="BLACKWEDNESDAY"
                            value={discountCode}
                            onChange={(e) => handleInputChange(e, setDiscountCode)}
                        />
                        <span>Discount code</span>
                    </div>
                    <div className="summary">
                        <div className="text-data">
                            <p>Subtotal</p>
                            <p>Discount</p>
                            <h5>Total</h5>
                        </div>
                        <div className="numerical-data">
                            <p>$ {totalPrice.toFixed(2)}</p>
                            <p>$ 0.00</p>
                            <h5>$ {totalPrice.toFixed(2)}</h5>
                        </div>
                    </div>
                    <div className="pay">
                        <button type="submit">Pagar</button>
                    </div>
                </form>
                <div className="secure">
                    <i className="fa fa-lock"></i>
                    <p>Los pagos están seguros y encriptados. (test)</p>
                </div>
                <div className="last">
                    <a href="#"> TyC </a>
                    <a href="#"> Privacidad </a>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
