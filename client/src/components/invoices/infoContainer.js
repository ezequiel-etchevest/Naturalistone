import {Box, Spinner, Center} from '@chakra-ui/react';
import List from './list';
import Filters from './filters';
import { useState, useEffect } from 'react';

const InfoContainer = ({seller_invoices, user, focusFilter, setFocusFilter, seller_values}) => {
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
            ml={'20vw'}
            bg={'web.bg'}> 
            <Filters seller_values={seller_values} seller_invoices={seller_invoices} user={user} setFocusFilter={setFocusFilter} focusFilter={focusFilter}/>
            <List seller_invoices={seller_invoices} user={user} />
            </Box>
        )}else{
            return(
              <Center ml={'20vw'} w={'80vw'} bg={'web.bg'} h={'92vh'}>
                <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
              </Center>
            )
          }
}
export default InfoContainer;