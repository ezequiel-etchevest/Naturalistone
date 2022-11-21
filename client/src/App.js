import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LogIn from './views/Log-in';
import Home from './views/Home';
import NavBar from './components/navBar';
import InvoiceDetail from './views/InvoiceDetail';
import { useState } from 'react';
import { naturali_theme } from './theme';

function App() {

  const [site, setSite ] = useState('home')

  return (
    <ChakraProvider theme={naturali_theme}>
    <BrowserRouter>
    <div className="App">
    <NavBar/>
      <Routes>
      <Route path="/login" element={<LogIn/>} />
      <Route path="/home" element={<Home site={site} setSite={setSite}/>} />
      <Route path='/invoices/:id' element={<InvoiceDetail site={site} setSite={setSite}/>}></Route>   
      </Routes> 
    </div>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
