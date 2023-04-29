function ItemListContainer(props) {
    return (
        <div className="container mt-3" style={{ textAlign: "center" }}>
            <h2 className="text-center">{props.greeting}</h2>
            <img src={props.magusLogo} alt="Magus Logo" />
        </div>
    );
}

export default ItemListContainer;