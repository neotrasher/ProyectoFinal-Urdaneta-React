const products = [
    {
        "id": "1",
        "nombre": "In Love",
        "precio": "25500 $",
        "imagen": "/img/arete1.png",
        "disponible": true,
        "fechaCreacion": "2023-01-15",
        "categoria": "aretes",
        "ventas": 0,
        "stock": 4
    },
    {
        "id": "2",
        "nombre": "Armonía Triangular",
        "precio": "35500 $",
        "imagen": "/img/arete2.png",
        "disponible": true,
        "fechaCreacion": "2023-01-24",
        "categoria": "aretes",
        "ventas": 3,
        "stock": 7
    },
    {
        "id": "3",
        "nombre": "Pasión al Cuadrado",
        "precio": "30000 $",
        "imagen": "/img/arete3.png",
        "disponible": true,
        "fechaCreacion": "2022-01-17",
        "categoria": "aretes",
        "ventas": 6,
        "stock": 8
    },
    {
        "id": "4",
        "nombre": "Peyote Circular",
        "precio": "52000 $",
        "imagen": "/img/arete4.png",
        "disponible": true,
        "fechaCreacion": "2021-08-24",
        "categoria": "aretes",
        "ventas": 12,
        "stock": 2
    },
    {
        "id": "5",
        "nombre": "Set Rosa",
        "precio": "32000 $",
        "imagen": "/img/pulseras.png",
        "disponible": true,
        "fechaCreacion": "2021-04-10",
        "categoria": "prendedores",
        "ventas": 7,
        "stock": 5
    },
    {
        "id": "6",
        "nombre": "Friends",
        "precio": "28000 $",
        "imagen": "/img/friends.png",
        "disponible": true,
        "fechaCreacion": "2022-12-12",
        "categoria": "pulseras",
        "ventas": 14,
        "stock": 3
    },
    {
        "id": "7",
        "nombre": "Azucenas",
        "precio": "45000 $",
        "imagen": "/img/doradas.png",
        "disponible": true,
        "fechaCreacion": "2022-10-11",
        "categoria": "collares",
        "ventas": 3,
        "stock": 4
    },
    {
        "id": "8",
        "nombre": "Set Azul",
        "precio": "38000 $",
        "imagen": "/img/azules.png",
        "disponible": true,
        "fechaCreacion": "2023-02-02",
        "categoria": "pulseras",
        "ventas": 5,
        "stock": 1
    }
]


export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 500)
    })
}

export const productDetails = (productId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === productId));
        }, 500)
    })
}

export const productDetailsByCat = (productCat) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.categoria === productCat));
        }, 500)
    })
}

export const getTopSellingProducts = () => {
    const sortedProducts = products.sort((a, b) => b.ventas - a.ventas);
    const topSellingProducts = sortedProducts.slice(0, 4);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(topSellingProducts);
        }, 500);
    });
};

