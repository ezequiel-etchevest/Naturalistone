import {Box} from '@chakra-ui/react';
import OrdersList  from './OrdersList'
//import { CreateOrderModal } from './createOrder/createOrderModal';

const OrdersContainer = ({orders}) => {

  return(
    <Box
    ml={'16vw'}
    bg={'web.bg'}
    userSelect={'none'}> 
      {/* <CreateOrderModal orders={orders}/> */}
      <OrdersList orders={orders}/>
    </Box>
  )
}
export default OrdersContainer;