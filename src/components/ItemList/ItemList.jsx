import './ItemList.css'
import Item from '../Item/Item'

const ItemList = ({ products }) => {
    return (
        <div className="cards mb-5">
            {products.map((products) => (
                <Item key={products.id} products={products}/>
            ))}
        </div>
    );
};

export default ItemList;
