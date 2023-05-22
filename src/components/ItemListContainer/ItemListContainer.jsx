import ItemList from '../ItemList/ItemList'
import { useEffect, useState } from "react";
import { getProducts, productDetailsByCat } from "../../asyncMock";
import { useParams } from 'react-router-dom';

function ItemListContainer(props) {
    const [products, setProducts] = useState([])
    const { productCat } = useParams()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let response;
                if (productCat) {
                    response = await productDetailsByCat(productCat);
                } else {
                    response = await getProducts();
                }
                console.log("Response:", response);

                setProducts(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [productCat]);

    return (
        <div className="mt-5"  style={{ textAlign: "center" }}>
            <h2 className="text-center">{props.greeting}</h2>
            <ItemList products={products} />
        </div>
    );
}

export default ItemListContainer;





