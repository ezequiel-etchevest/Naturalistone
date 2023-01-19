import {BrowserRouter, Route, Routes} from 'react-router-dom';
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
import Warehouse from './views/Warehouse'

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
      <Route path='/quotes/:id' element={<InvoiceDetail />} /> 
      <Route path="/products" element={<Products/>} />
      <Route path="/products/:id" element={<ProductDetailView/>}/>
      <Route path="/Invoice Errors" element={<InvoiceErrors/>}/>
      <Route path="/orders" element={<Orders/>} />
      <Route path="/orders/:id" element={<OrderDetail/>} />
      <Route path='/warehouse' element={<Warehouse />} /> 
      </Routes> 
    </div>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
