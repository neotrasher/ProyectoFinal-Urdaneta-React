import React from 'react';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';


function App() {
    return (
        <div>
            <NavBar
                instagramUrl="./src/assets/img/instagram.png"
                facebookUrl="./src//assets/img/facebook.png"
                whatsappUrl="./src/assets/img/whatsapp.png"
                userUrl="./src/assets/img/cuenta.png"
                magusLogo="./src/assets/img/maguslogo.png"
            />
            <ItemListContainer
                greeting="¡Bienvenidos a la tienda en línea de MagusbyLili!"
                magusLogo="./src/assets/img/maguslogo.png"
            />
        </div>
    );
}

export default App;
