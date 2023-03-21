import {Box, Text} from '@chakra-ui/react';
import OrdersList  from './OrdersList'

const OrdersContainer = ({orders}) => {

    return(
        <Box
        ml={'20vw'}
        bg={'web.bg'}
        userSelect={'none'}> 
            <OrdersList orders={orders}/>
        </Box>
    )
}
export default OrdersContainer;