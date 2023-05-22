import React from 'react';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Footer from './components/Footer/Footer';
import Homepage from './pages/Homepage';
import Creadora from './pages/Creadora';
import Contacto from './pages/Contacto';
import Colecciones from './pages/Colecciones';


function App() {
    return (
        <BrowserRouter>
            <NavBar
                instagramUrl="/src/assets/img/instagram.png"
                facebookUrl="/src//assets/img/facebook.png"
                whatsappUrl="/src/assets/img/whatsapp.png"
                userUrl="/src/assets/img/cuenta.png"
                magusLogo="/src/assets/img/maguslogo.png"
            />
            <Routes>
                <Route path='/' element={<Homepage  />} />
                <Route path='/magusbylili' element={<Creadora />} />
                <Route path='/productos' element={<ItemListContainer greeting="¡Bienvenidos a la tienda en línea de MagusbyLili (PreEntrega 2)!" />} />
                <Route path='/colecciones' element={<Colecciones />} />
                <Route path='/contacto' element={<Contacto />} />
                <Route path='/categoria/:productCat' element={<ItemListContainer />} />
                <Route path='/item/:itemId' element={<ItemDetailContainer />} />
                <Route path='*' element={<h1>404 No hay vida</h1>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
