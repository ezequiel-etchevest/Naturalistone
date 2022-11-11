import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LogIn from './views/Log-in';
import Home from './views/Home';
import NavBar from './components/navBar';

function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
    <div className="App">
      <NavBar/>
      <Routes>
      <Route path="/sign-in" element={<LogIn/>} />
      <Route path="/home" element={<Home/>} />
      </Routes> 
    </div>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
