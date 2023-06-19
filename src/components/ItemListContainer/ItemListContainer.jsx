import ItemList from '../ItemList/ItemList';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';
import { useParams } from 'react-router-dom';

function ItemListContainer(props) {
    const [products, setProducts] = useState([]);
    const { productCat } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, 'products');
                let q;

                if (productCat) {
                    q = query(productsCollection, where('categoria', '==', productCat));
                } else {
                    q = query(productsCollection);
                }

                const querySnapshot = await getDocs(q);

                const productsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setProducts(productsData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [productCat]);

    return (
        <div className="mt-5" style={{ textAlign: 'center' }}>
            <h2 className="text-center">{props.greeting}</h2>
            <ItemList products={products} />
        </div>
    );
}

export default ItemListContainer;






