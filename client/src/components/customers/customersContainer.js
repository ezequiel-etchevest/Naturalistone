import {Box, Spinner, Center} from '@chakra-ui/react';
import CustomerList from './customerList';
import CustomerFilters from './customerFilters';
import { useState, useEffect } from 'react';
import { getCustomersByFilter } from '../../redux/actions-customers';
import { useDispatch } from 'react-redux';

const CustomersContainer = ({customers, user, focusFilter, setFocusFilter, customer_filters}) => {
    const [ spinner, setSpinner ] = useState(false)
    const handleSpinner = () => {
        setTimeout(()=>{ setSpinner(true)}, 500)
      }
    useEffect(()=>{
        handleSpinner()
      })

    if(spinner){
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
              user={user}
              customer_filters={customer_filters}
              />
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