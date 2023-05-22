import React, { useState, useEffect } from 'react';
import { productDetails } from '../../asyncMock';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import { Hearts } from 'react-loader-spinner'
import './ItemDetailContainer.css'

const ItemDetailContainer = () => {
    const [products, setProducts] = useState(null);
    const [showSpinner, setShowSpinner] = useState(true);
    const { itemId } = useParams();
    

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await productDetails(itemId);
                setProducts(response);
                setTimeout(() => {
                    setShowSpinner(false);
                }, 500);
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
                    <Hearts
                        color="#BD95B7"
                        ariaLabel="hearts-loading"
                        visible={true}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className='cards p-5 align-items-center'>
            <ItemDetail {...products} />
        </div>
    )
}

export default ItemDetailContainer;
