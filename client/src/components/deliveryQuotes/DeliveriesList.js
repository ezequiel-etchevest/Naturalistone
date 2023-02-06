import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { getDeliveryNote } from '../../redux/actions-deliveryNotes';
import { useDispatch } from 'react-redux';

const ModelTr = ({e, onSecondModalOpen}) => {

  const dispatch = useDispatch()

  const handleClick = async () => {
    await dispatch(getDeliveryNote(e.DeliveryNumber))
    onSecondModalOpen()
  }

  return(
    <Tr 
      onClick={() => handleClick()} 
      cursor={'pointer'} 
      key={e.DeliveryNumber}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
      }}
      display={'flex'}
      justifyContent={'space-around'}
      >
      <Td textAlign={'center'} w={'10vw'}>{e.DeliveryNumber}</Td>
      <Td textAlign={'center'} w={'10vw'}>{e.Delivery_Date?.split('T')[0]}</Td>
    </Tr>
  )
}

const DeliveriesList = ({deliveries, input, onSecondModalOpen, setDeliveryID}) => {
  
  return(
      <Box
      display={'flex'}
      justifyContent={'center'}
      h={'52vh'}
      mt={'3vh'}
      border={'1px solid'}
      borderColor={'web.border'}
      borderRadius={'md'}
      w={'28vw'}
      py={'3vh'}

      >
        <Box
          borderColor={'web.border'}
          bg={'web.sideBar'} 
          rounded={'md'} 
          w={'25vw'}
          >
          <TableContainer  h={'46vh'} w={'25vw'}>
              <Table color={'web.text'} variant={'simple'} size={'sm'}>
                <Thead h={'6vh'}>
                  <Tr display={'flex'} flexDir={'row'} justifyContent={'space-around'}>
                    <Th color={'web.text2'} w={'10vw'} borderBottom={'none'}>Delivery note Nº</Th>
                    <Th w={'6vw'} color={'web.text2'} borderBottom={'none'}>Date</Th>
                  </Tr>
                </Thead>
                <Box
                  maxHeight={'56vh'}
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
                  display={'flex'}
                  w={'25vw'}
                  >
                <Tbody w={'24vw'}> 
                {
                  input.length ?
                  input.map((e, i) =>{
                    return(
                      <ModelTr key={i} e={e} onSecondModalOpen={onSecondModalOpen} setDeliveryID={setDeliveryID}/>
                    )
                  })
                  :
                  (
                  deliveries.length ? 
                    deliveries.map((e, i) =>{
                      return(
                        <ModelTr key={i} e={e} onSecondModalOpen={onSecondModalOpen} setDeliveryID={setDeliveryID}/>
                      )
                    })
                  : 
                   null)
                  }
                </Tbody>
                </Box>
              </Table>
          </TableContainer> 
          </Box> 
      </Box>
  )
}
export default DeliveriesList;
