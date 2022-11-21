import {Box, Divider} from '@chakra-ui/react';
import List from './list';
import Filters from './filters';
import { useState } from 'react'

const InfoContainer = ({seller_invoices, site, setSite, userId}) => {

    const [filteredByCustomer, setFilteredByCustomer] = useState([]) 

    return(
        <Box
        ml={'20vw'}
        bg={'web.bg'}> 
        <Filters seller_invoices={seller_invoices} userId={userId} setFilteredByCustomer={setFilteredByCustomer}/>
        <List setSite={setSite} seller_invoices={seller_invoices} filteredByCustomer={filteredByCustomer} />
        </Box>
    )
}
export default InfoContainer;