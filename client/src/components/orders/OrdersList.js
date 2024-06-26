import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Text,
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getOrdersByID, getOrderProducts, cleanOrderProducts } from '../../redux/actions-orders'



const ModelTr = ({o}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = async () => {
      dispatch(getOrdersByID(o.OrderID, o.FactoryID))
      dispatch(cleanOrderProducts())
      dispatch(getOrderProducts(o.OrderID, o.FactoryID))
      navigate(`/orders/${o.OrderID}/${o.FactoryID}`)
    }

    return(
      <Tr 
        onClick={() => handleClick()} 
        cursor={'pointer'} 
        key={o.OrderID}
        _hover={{
          bg: 'web.navBar',
          color: 'logo.orange'
        }}
        >
        <Td textAlign={'center'}>{o.OrderID.includes('.') ? (o.OrderID.split('.')[0]) + '/' + (o.OrderID.split('.')[1]) : o.OrderID}</Td>
        <Td textAlign={'-moz-initial'}>{o.FactoryName}</Td>
        <Td textAlign={'center'}>{o.EURUSD_Flag === 'Y' ? '€' : '$'} {o.Value.toLocaleString('en-US')}</Td>
        <Td textAlign={'center'}>{o.InvoiceDate !== null ? o.InvoiceDate.split('T')[0] :  '-'}</Td>
        <Td textAlign={'center'}>{o.InvoiceNumber !== null ? (o.InvoiceNumber):('-')} </Td>
        <Td textAlign={'center'}>{o.Status}</Td>
      </Tr>
    )
}

const OrdersList = ({orders}) => {

    return(
        <Box
          display={'flex'}
          justifyContent={'center'}
          ml={'1vh'}
          h={'80vh'}
          w={'82.8vw'} 
          >
          <Box
            maxHeight={'77vh'}
            overflow={'auto'}
            mt={'2vh'}
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
            borderColor={'web.border'}
            bg={'web.sideBar'} 
            border={'1px solid'} 
            rounded={'md'} 
            p={'3vh'}
            w={'80vw'}
            >
            <TableContainer >
                <Table color={'web.text'} variant={'simple'} size={'sm'}  >
                  <Thead h={'6vh'}>
                    <Tr>
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Order Nº</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'12vw'}>Factory</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Value</Th>
                      <Th w={'6vw'} color={'web.text2'} textAlign={'center'}>Date</Th>
                      <Th color={'web.text2'} w={'10vw'} textAlign={'center'}>Freight Invoice N°</Th>
                      <Th color={'web.text2'} w={'8vw'} textAlign={'center'}>Status </Th>
                    </Tr>
                  </Thead>
                  <Tbody 
                  >
                    {
                      orders ? (
                        orders?.map((o, i) => (
                          <ModelTr key={i} o={o}/> 
                          ))
                      ):(
                        <Text>Loading</Text>
                      )
                    }
                  </Tbody>
                </Table>
            </TableContainer> 
            </Box> 
        </Box>
    )
}


export default OrdersList;
