import {Box} from '@chakra-ui/react';
import List from './list';
import Filters from './filters';
import { useState } from 'react'

const InfoContainer = ({seller_invoices, user, focus, setFocus, seller_values}) => {

    return(
        <Box
        ml={'20vw'}
        bg={'web.bg'}> 
        <Filters seller_values={seller_values} seller_invoices={seller_invoices} user={user} setFocus={setFocus} focus={focus}/>
        <List seller_invoices={seller_invoices} user={user} />
        </Box>
    )
}
export default InfoContainer;