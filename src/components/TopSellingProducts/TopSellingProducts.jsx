import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';
import Item from '../Item/Item';
import './TopSellingProducts.css';

const TopSellingProducts = () => {
    const [topSellingProducts, setTopSellingProducts] = useState([]);

    useEffect(() => {
        const fetchTopSellingProducts = async () => {
            try {
                const collectionRef = collection(db, 'products');
                const querySnapshot = await getDocs(collectionRef);
                const products = [];

                querySnapshot.forEach((doc) => {
                    if (doc.exists()) {
                        products.push({ id: doc.id, ...doc.data() });
                    }
                });

                const sortedProducts = products.sort((a, b) => b.ventas - a.ventas);
                const topSelling = sortedProducts.slice(0, 4);

                setTopSellingProducts(topSelling);
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
                    <Item key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default TopSellingProducts;

