import {Box, Spinner, Center} from '@chakra-ui/react';
import CustomerList from './customerList';
import CustomerFilters from './customerFilters';
import { useState, useEffect } from 'react';

const CustomersContainer = ({/*seller_invoices,*/ user, focusFilter, setFocusFilter /*,seller_values*/}) => {
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
              /*seller_values={seller_values} seller_invoices={seller_invoices}*/ 
              user={user} 
              setFocusFilter={setFocusFilter} 
              focusFilter={focusFilter}/>
              <CustomerList 
              /*seller_invoices={seller_invoices}*/ 
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