import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LogIn from './views/Log-in';
import Home from './views/Home';
import NavBar from './components/navBar';
import InvoiceDetail from './views/InvoiceDetail';
import Quotes from './views/Quotes';
import Products from './views/Products';
import { useState } from 'react';
import { naturali_theme } from './theme';

function App() {

  const [site, setSite ] = useState('Home')
  const userLocal = JSON.parse(localStorage.getItem('user'))

  return (
    <ChakraProvider theme={naturali_theme}>
    <BrowserRouter>
    <div className="App">
    <NavBar/>
      <Routes>
      <Route path= '*'  element = { userLocal ? <Home site={site} setSite={setSite}/> : <LogIn/>} />
      <Route path="/login" element= { userLocal ? <Home site={site} setSite={setSite}/> : <LogIn/>} />
      <Route path="/home" element={ <Home site={site} setSite={setSite}/>}/>
      <Route path="/quotes" element={<Quotes/>}/>
      <Route path="/products" element={<Products/>} />
      <Route path="/products/:id"/>
      <Route path='/quotes/:id' element={ userLocal ? <InvoiceDetail site={site} setSite={setSite}/>: <LogIn/>}></Route>   
      </Routes> 
    </div>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
