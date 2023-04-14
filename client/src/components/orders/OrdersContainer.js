import {Box} from '@chakra-ui/react';
import OrdersList  from './OrdersList'

const OrdersContainer = ({orders}) => {

    return(
        <Box
        ml={'16vw'}
        bg={'web.bg'}
        userSelect={'none'}> 
            <OrdersList orders={orders}/>
        </Box>
    )
}
export default OrdersContainer;