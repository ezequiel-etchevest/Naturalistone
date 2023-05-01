import {Box, Spinner, Center} from '@chakra-ui/react';
import List from './list';
import Filters from './filters';
import { useState, useEffect } from 'react';

const InfoContainer = ({seller_invoices, user, focusFilter, setFocusFilter, seller_values, customers}) => {
    const [ spinner, setSpinner ] = useState(false)

    const handleSpinner = () => {
        setTimeout(()=>{ setSpinner(true)}, 700)
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
            <Filters seller_values={seller_values} seller_invoices={seller_invoices} user={user} setFocusFilter={setFocusFilter} focusFilter={focusFilter} customers={customers} />
            <List seller_invoices={seller_invoices} user={user} />
            </Box>
        )}else{
            return(
              <Center ml={'16vw'} w={'84vw'} bg={'web.bg'} h={'92vh'}>
                <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
              </Center>
            )
          }
}
export default InfoContainer;