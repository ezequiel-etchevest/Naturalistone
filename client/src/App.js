import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LogIn from './views/Log-in';

function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path="/sign-in" element={<LogIn/>} />
      </Routes> 
    </div>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
