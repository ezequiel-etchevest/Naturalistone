import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LogIn from './views/Log-in';
import Home from './views/Home';
import NavBar from './components/navBar';
import InvoiceDetail from './views/InvoiceDetail';

function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
    <div className="App">
    <NavBar/>
      <Routes>
      <Route path="/login" element={<LogIn/>} />
      <Route path="/home" element={<Home/>} />
      <Route path='/invoice/:id' component={<InvoiceDetail/>}></Route>   
      </Routes> 
    </div>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
