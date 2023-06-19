import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams, useNavigate  } from 'react-router-dom';
import { Hearts } from 'react-loader-spinner';
import './ItemDetailContainer.css';
import Swal from 'sweetalert2';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [showSpinner, setShowSpinner] = useState(true);
    const { itemId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const docRef = doc(db, 'products', itemId);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    setProduct({ id: docSnapshot.id, ...docSnapshot.data() });
                } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Ooops...',
                      text: "Producto no existe",
                      confirmButtonColor: '#4A4848',
                      iconColor: '#BD95B7',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate('/');
                      }
                    });
                    throw new Error("Dato no encontrado");
                  }

                setTimeout(() => {
                    setShowSpinner(false);
                }, 450);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductDetails();
    }, [itemId]);

    if (showSpinner) {
        return (
            <div className="spinner-container">
                <div className="spinner-wrapper">
                    <Hearts color="#BD95B7" ariaLabel="hearts-loading" visible={true} />
                </div>
            </div>
        );
    }

    return (
        <div className="cards p-5 align-items-center">
            {product && <ItemDetail {...product} />}
        </div>
    );
};

export default ItemDetailContainer;
