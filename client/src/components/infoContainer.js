import {Box} from '@chakra-ui/react';
import List from './list';
import Filters from './filters';


const InfoContainer = ({seller_invoices, site, setSite, userId}) => {


    return(
        <Box
        ml={'20vw'}> 
        <Filters seller_invoices={seller_invoices} userId={userId}/>
        <List setSite={setSite} seller_invoices={seller_invoices} />
        </Box>
    )
}
export default InfoContainer;