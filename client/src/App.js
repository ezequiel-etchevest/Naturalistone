import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LogIn from './views/Log-in';
import Home from './views/Home';
import NavBar from './components/navBar';
import InvoiceDetail from './views/InvoiceDetail';
import ProductDetail from './views/ProductDetail';
import Quotes from './views/Quotes';
import Products from './views/Products';
import { naturali_theme } from './theme';

function App() {

  const userLocal = JSON.parse(localStorage.getItem('user'))
  
  return (
    <ChakraProvider theme={naturali_theme}>
    <BrowserRouter>
    <div className="App">
    <NavBar/>
      <Routes>
      <Route path= '*'  element = {<Home />} />
      <Route path="/login" element= {<LogIn/>} />
      <Route path="/home" element={ <Home/>}/>
      <Route path="/quotes" element={<Quotes/>}/>
      <Route path="/products" element={<Products/>} />
      <Route path="/products/:id" element={<ProductDetail/>}/>
      <Route path='/quotes/:id' element={<InvoiceDetail />} /> 
      </Routes> 
    </div>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
