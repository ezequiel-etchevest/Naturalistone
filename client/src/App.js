import {BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LogIn from './views/Log-in';
import Home from './views/Home';
import NavBar from './components/navBar';
import InvoiceDetail from './views/InvoiceDetail';
import Quotes from './views/Quotes';
import Orders from './views/Orders';
import OrderDetail from './views/OrderDetail';
import InvoiceErrors from './views/InvoiceErrors';
import Products from './views/Products';
import { naturali_theme } from './theme';
import ProductDetailView from './views/ProductDetailView';
import Warehouse from './views/Warehouse';
import { useState } from 'react';
import {PrivateRoute} from './components/PrivateRoutes';
import Redirect from './views/RedirectPage';

function App() {

  const [focus, setFocus] = useState('Home')
  
  return (
    <ChakraProvider theme={naturali_theme}>
    <BrowserRouter>
    <div className="App">
    <NavBar/>
      <Routes>
        <Route path="/login" element= {<LogIn/>} />
        <Route path="/redirect" element= {<Redirect/>} />
        <Route path="/*" element={<Home focus={focus} setFocus={setFocus} />}/>
        <Route path="/home" element={<Home focus={focus} setFocus={setFocus}/>}/>
        <Route path="/quotes" element={<Quotes focus={focus} setFocus={setFocus}/>}/>
        <Route path="/quotes/:id" element={<InvoiceDetail focus={focus} setFocus={setFocus}/>}/>
        <Route path="/inventory" element={<Products focus={focus} setFocus={setFocus} />}/>
        <Route path="/products/:id" element={<ProductDetailView focus={focus} setFocus={setFocus} />}/>
        <Route path="/invoice-errors" element={<InvoiceErrors focus={focus} setFocus={setFocus} />}/>
        <Route path="/orders" element={<Orders focus={focus} setFocus={setFocus} />}/>
        <Route path="/orders/:id" element={<OrderDetail focus={focus} setFocus={setFocus} />}/>
        <Route path="/warehouse" element={<Warehouse focus={focus} setFocus={setFocus} />}/>
      </Routes> 
    </div>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
