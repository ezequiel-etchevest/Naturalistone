import {Box, Spinner, Center} from '@chakra-ui/react';
import CustomerList from './customerList';
import CustomerFilters from './customerFilters';
import { useState, useEffect } from 'react';

const CustomersContainer = ({customers, user, focusFilter, setFocusFilter }) => {
    const [ spinner, setSpinner ] = useState(false)
    const handleSpinner = () => {
        setTimeout(()=>{ setSpinner(true)}, 500)
      }
    useEffect(()=>{
        handleSpinner()
      })
    if(spinner === true){
        return(
            <Box
            userSelect={'none'}
            ml={'16vw'}
            bg={'web.bg'}> 
              <CustomerFilters
              customers={customers}
              user={user} 
              setFocusFilter={setFocusFilter} 
              focusFilter={focusFilter}/>
              <CustomerList 
              customers={customers}
              user={user} />
            </Box>
        )}else{
            return(
              <Center ml={'16vw'} w={'84vw'} bg={'web.bg'} h={'92vh'}>
                <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
              </Center>
            )
          }
}
export default CustomersContainer;