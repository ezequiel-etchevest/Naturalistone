import {Box} from '@chakra-ui/react';
import List from './list';
import Filters from './filters';
import { useState } from 'react'

const InfoContainer = ({seller_invoices, userId, focus, setFocus, seller_values}) => {

    const [filteredByCustomer, setFilteredByCustomer] = useState([]) 

    return(
        <Box
        ml={'20vw'}
        bg={'web.bg'}> 
        <Filters seller_values={seller_values} seller_invoices={seller_invoices} userId={userId} setFilteredByCustomer={setFilteredByCustomer} setFocus={setFocus} focus={focus}/>
        <List seller_invoices={seller_invoices} filteredByCustomer={filteredByCustomer} userId={userId} />
        </Box>
    )
}
export default InfoContainer;