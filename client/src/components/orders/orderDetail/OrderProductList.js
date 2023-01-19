import {
    Box,
    Text,
  } from '@chakra-ui/react'
import TableOrderProducts from './TableOrderProducts'



const OrderProductList = ({order_products}) => {

    return(
        <Box
        display={'flex'}
        justifyContent={'center'}
        >
          <Box
            maxHeight={'36vh'}
            overflow={'auto'}
            css={{
              '&::-webkit-scrollbar': {
                width: '0.2vw',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#E47424',
                borderRadius: '5px',
              },
            }}
            bg={'web.sideBar'}           
            >
            <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Text fontSize={'xl'} color={'web.text2'}>Products Details</Text>
            </Box>
              <TableOrderProducts order_products={order_products}/>
            </Box> 
        </Box>
    )
}
export default OrderProductList;