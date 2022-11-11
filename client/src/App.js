import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LogIn from './views/Log-in';

function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route path="/sign-in" element={<LogIn/>} />
      </Switch> 
    </div>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
