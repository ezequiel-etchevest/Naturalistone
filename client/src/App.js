import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LogIn from './views/Log-in';
import Home from './views/Home';
import Stats from './views/Stats';
import Invoices from './views/Invoices';
import NavBar from './components/navBar';

function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
    <div className="App">
    <NavBar/>
      <Routes>
      <Route path="/login" element={<LogIn/>} />
      <Route path="/home" element={<Home/>} />   
      </Routes> 
    </div>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
