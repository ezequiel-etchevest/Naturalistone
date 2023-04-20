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
import Customers from './views/Customers';
import { useState, useEffect } from 'react';
import {PrivateRoute} from './components/PrivateRoutes';
import Redirect from './views/RedirectPage';

function App() {

  const [focus, setFocus] = useState('Home')

  useEffect(() => {
    const path = window.location.pathname;
    setFocus(path.split('/')[1] || 'Home');
  }, []);
  
  return (
    <ChakraProvider theme={naturali_theme}>
    <BrowserRouter>
    <div className="App">
    <NavBar/>
      <Routes>
        <Route path="/login" element= {<LogIn/>} />
        <Route path="/" element={<PrivateRoute><Home focus={focus} setFocus={setFocus}/></PrivateRoute>} />
        <Route path="/redirect" element= {<Redirect/>} />
        <Route path="/*" element={<PrivateRoute><Home focus={focus} setFocus={setFocus} /></PrivateRoute>}/>
        <Route path="/home" element={<PrivateRoute><Home focus={focus} setFocus={setFocus}/></PrivateRoute>}/>
        <Route path="/quotes" element={<PrivateRoute><Quotes focus={focus} setFocus={setFocus}/></PrivateRoute>}/>
        <Route path="/quotes/:id" element={<PrivateRoute><InvoiceDetail focus={focus} setFocus={setFocus}/></PrivateRoute>}/>
        <Route path="/inventory" element={<PrivateRoute><Products focus={focus} setFocus={setFocus} /></PrivateRoute>}/>
        <Route path="/products/:id" element={<PrivateRoute><ProductDetailView focus={focus} setFocus={setFocus} /></PrivateRoute>}/>
        <Route path="/invoice-errors" element={<PrivateRoute><InvoiceErrors focus={focus} setFocus={setFocus} /></PrivateRoute>}/>
        <Route path="/orders" element={<PrivateRoute><Orders focus={focus} setFocus={setFocus} /></PrivateRoute>}/>
        <Route path="/orders/:id" element={<PrivateRoute><OrderDetail focus={focus} setFocus={setFocus} /></PrivateRoute>}/>
        <Route path="/warehouse" element={<PrivateRoute><Warehouse focus={focus} setFocus={setFocus} /></PrivateRoute>}/>
        <Route path="/customers" element={<PrivateRoute><Customers focus={focus} setFocus={setFocus} /></PrivateRoute>}/>
        
      </Routes> 
    </div>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
