import {Box} from '@chakra-ui/react';
import List from './list';
import Filters from './filters';

const InfoContainer = ({seller_invoices, user, focusFilter, setFocusFilter, seller_values}) => {

    return(
        <Box
        ml={'20vw'}
        bg={'web.bg'}> 
        <Filters seller_values={seller_values} seller_invoices={seller_invoices} user={user} setFocusFilter={setFocusFilter} focusFilter={focusFilter}/>
        <List seller_invoices={seller_invoices} user={user} />
        </Box>
    )
}
export default InfoContainer;