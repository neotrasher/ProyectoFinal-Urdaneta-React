import ItemCount from "../ItemCount/ItemCount";
import './ItemDetail.css'

const ItemDetail = ({ id, nombre, precio, imagen, disponible, fechaCreacion, categoria, ventas, stock }) => {
    return (
        <div className="card mt-3 align-items-center shadow p-3 mb-5 bg-body rounded" data-aos="zoom-in-up" data-aos-duration="1000" style={{ width: '30rem' }}>
            <img  className="card-img-top" src={imagen} alt={nombre} />
            <div className="card-body card-text text-center">
                <h5>{nombre}</h5>
                <h6>Precio: {precio}</h6>
                <p>Disponible: {disponible ? 'Sí' : 'No'}</p>
                <ItemCount
                    initial={1} stock={stock} onAddToCart={(count) => console.log('Cantidad agregada ', count)}
                />
            </div>
        </div>
    );
};

export default ItemDetail;