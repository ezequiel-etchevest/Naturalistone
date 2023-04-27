import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  Text,
  Center,
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCustomerById } from '../../redux/actions-customers';
import { useEffect } from 'react';



const ModelTr = ({e}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(getCustomerById(e.CustomerID))
    navigate(`/customers/${e.CustomerID}`)
  }

  return(
    <Tr 
    onClick={() => handleClick()} 
    cursor={'pointer'} 
    key={e.CustomerID}
    _hover={{
      bg: 'web.navBar',
      color: 'logo.orange'
      }}
    >
      <Td fontSize={'xs'} textAlign={'match-parent'}>{e.LastName ?`${e.Name} ${e.LastName}` : '-'}</Td>
      <Td fontSize={'xs'} textAlign={'match-parent'}>{e.Reference ? e.Reference : '-'}</Td>
      <Td fontSize={'xs'} textAlign={'center'}>{e.Phone ? e.Phone : '-'}</Td>
      <Td fontSize={'xs'} textAlign={'center'}>{e.Email ? e.Email : '-'}</Td>
      <Td fontSize={'xs'} textAlign={'center'}>{e.DiscountID ? e.DiscountID :'-'}</Td>
    </Tr>
  )
}

const CustomerList = ({customers, user}) => {

const toast = useToast()
const id = 'test-toast'

const validateResults = () => {
  // if(result === 'no_results'){
  //   if (!toast.isActive(id)) {
  //   toast({
  //     id,
  //     title: 'No results found',
  //     status: 'warning',
  //     duration: 2000,
  //     isClosable: true,
  //   });
  // }}
}

useEffect(()=>{
  validateResults()
})
  return(
  <Box
  display={'flex'}
  justifyContent={'center'}
  ml={'1vh'}
  h={'75vh'}
  w={'82.8vw'} 
  >
    <Box
    maxHeight={'73vh'}
    overflow={'auto'}
    css={{
      '&::-webkit-scrollbar': {
        width: '0.4vw',
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
    {
      customers.length ? (
        <TableContainer>
          <Table color={'web.text'}variant={'simple'} size={'sm'}>
            <Thead h={'6vh'}>
              <Tr>
                  <Th color={'web.text2'} textAlign={'start'}>Full Name</Th>
                  <Th color={'web.text2'} textAlign={'start'} >Company</Th>
                  <Th color={'web.text2'} textAlign={'center'}>Main Phone</Th>
                  <Th color={'web.text2'} textAlign={'center'}>E-mail</Th>
                  <Th color={'web.text2'} textAlign={'center'}>Discount</Th>
                </Tr>
              </Thead>
              <Tbody >
              { 
                customers.map((e, i) => (
                  <ModelTr key={i} e={e} user={user}/> 
                ))
              }
              </Tbody>
            </Table>
          </TableContainer> 
          ) : (
          <Center w={'full'} h={'full'}>
            <Text userSelect={'none'} fontSize={'2vh'}>No customers found</Text>
          </Center>
          )
      }
    </Box> 
  </Box>
    )
}
export default CustomerList;
