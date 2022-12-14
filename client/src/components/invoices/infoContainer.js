import {Box} from '@chakra-ui/react';
import List from './list';
import Filters from './filters';
import { useState } from 'react'

const InfoContainer = ({seller_invoices, userId, focus, setFocus}) => {

    const [filteredByCustomer, setFilteredByCustomer] = useState([]) 

    return(
        <Box
        ml={'20vw'}
        bg={'web.bg'}> 
        <Filters seller_invoices={seller_invoices} userId={userId} setFilteredByCustomer={setFilteredByCustomer} setFocus={setFocus} focus={focus}/>
        <List seller_invoices={seller_invoices} filteredByCustomer={filteredByCustomer} />
        </Box>
    )
}
export default InfoContainer;