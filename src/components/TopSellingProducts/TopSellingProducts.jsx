import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import { getTopSellingProducts } from '../../asyncMock';
import './TopSellingProducts.css'

const TopSellingProducts = () => {
    const [topSellingProducts, setTopSellingProducts] = useState([]);

    useEffect(() => {
        const fetchTopSellingProducts = async () => {
            try {
                const response = await getTopSellingProducts();
                setTopSellingProducts(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTopSellingProducts();
    }, []);

    return (
        <div className="top-selling-products">
            <h3 className="top-selling-products-heading">Mejores elecciones</h3>
            <div className="cards">
                {topSellingProducts.map((product) => (
                    <Item key={product.id} products={product} />
                ))}
            </div>
        </div>
    );
};

export default TopSellingProducts;
