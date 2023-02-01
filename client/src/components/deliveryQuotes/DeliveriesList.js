import {
  Box,
  Table,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  TableContainer,

} from '@chakra-ui/react';
import { useSelector } from 'react-redux';


const ModelTr = ({e, user}) => {


  return(
    <Tr 
      // onClick={() => handleClick()} 
      cursor={'pointer'} 
      key={e.DeliveryNumber}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
      }}
      >
      <Td textAlign={'center'}>{e.DeliveryNumber}</Td>
      <Td textAlign={'center'}>{e.SaleID}</Td>
      <Td textAlign={'center'}>{e.Delivery_Date?.split('T')[0]}</Td>
    </Tr>
  )
}

const DeliveriesList = ({user, deliveries, input}) => {

  

  //const deliveries = useSelector(state => state.deliveries_notes_by_id)
  
  return(
      <Box
      display={'flex'}
      justifyContent={'center'}
      >
        <Box
          maxHeight={'58vh'}
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
          borderColor={'web.border'}
          bg={'web.sideBar'} 
          rounded={'md'} 
          p={'3vh'}
          w={'40vw'}
          ml={'3vw'}
          mr={'3vw'}
          >
          <TableContainer>
              <Table color={'web.text'} variant={'simple'} size={'sm'} >
                <Thead h={'6vh'}>
                  <Tr>
                    <Th color={'web.text2'} w={'7vw'} textAlign={'center'}>Delivery note Nº</Th>
                    <Th color={'web.text2'} w={'7vw'}  textAlign={'center'}>Sale ID</Th>
                    <Th w={'5vw'} color={'web.text2'} textAlign={'center'}>Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                {
                  input.length ?
                  input.map((e, i) =>{
                    return(
                      <ModelTr key={i} e={e}/>
                    )
                  })
                  :
                  (
                  deliveries.length ? 
                    deliveries.map((e, i) =>{
                      return(
                        <ModelTr key={i} e={e}/>
                      )
                    })
                  : 
                    <Text>NO DELIVERIES DONE TO THIS INVOICE YET</Text>)
                  }
                </Tbody>
              </Table>
          </TableContainer> 
          </Box> 
      </Box>
  )
}
export default DeliveriesList;
