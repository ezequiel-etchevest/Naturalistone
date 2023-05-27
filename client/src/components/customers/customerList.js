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
import { useEffect, useState } from 'react';



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
      <Td fontSize={'xs'} maxW={'6vw'} textAlign={'match-parent'}>{e.Contact_Name}</Td>
      <Td fontSize={'xs'} maxW={'10vw'} textAlign={'match-parent'}>{e.Company ? e.Company : '-'}</Td>
      <Td fontSize={'xs'} maxW={'6vw'} textAlign={'match-parent'}>{e.Email ? e.Email.toLowerCase() : '-'}</Td>
      {
        e.Phone ? (
          <Td fontSize={'xs'} maxW={'6vw'} textAlign={'end'}>{ e.Phone}</Td>
        ):(
          <Td fontSize={'xs'} maxW={'6vw'} textAlign={'center'}>{'-'}</Td>
        )
      }
      
      <Td fontSize={'xs'} maxW={'3vw'} textAlign={'center'}>{e.DiscountID ? e.DiscountID :'-'}</Td>
    </Tr>
  )
}

const CustomerList = ({customers, user}) => {

const [initialCount] = useState(20);
const [batchCount] = useState(15);
const [loadedCount, setLoadedCount] = useState(initialCount);
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
  const handleScroll = () => {
    const container = document.getElementById('scroll-container'); // Reemplaza 'scroll-container' con el ID de tu contenedor de desplazamiento
    const { scrollTop, clientHeight, scrollHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      // El usuario ha llegado al final, carga más productos
      setLoadedCount(prevCount => prevCount + batchCount);
    }
  };
useEffect(()=>{
  const container = document.getElementById('scroll-container'); // Reemplaza 'scroll-container' con el ID de tu contenedor de desplazamiento
  container.addEventListener('scroll', handleScroll);
  return () => {
    container.removeEventListener('scroll', handleScroll);
  }}, [batchCount]);
  return(
  <Box
  display={'flex'}
  justifyContent={'center'}
  ml={'1vh'}
  h={'75vh'}
  w={'82.8vw'} 
  >
    <Box
    id='scroll-container'
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
        <TableContainer  maxW={'80vw'}>
          <Table color={'web.text'}variant={'simple'} size={'sm'}>
            <Thead h={'6vh'}>
              <Tr>
                  <Th color={'web.text2'} maxW={'6vw'} textAlign={'center'}>Full Name</Th>
                  <Th color={'web.text2'} maxW={'10vw'} textAlign={'center'}>Company</Th>
                  <Th color={'web.text2'} maxW={'6vw'} textAlign={'center'}>E-mail</Th>
                  <Th color={'web.text2'} maxW={'6vw'} textAlign={'center'}>Main Phone</Th>
                  <Th color={'web.text2'} maxW={'3vw'} textAlign={'center'}>Discount</Th>
                </Tr>
              </Thead>
              <Tbody >
              { 
                customers.slice(0, loadedCount).map((e, i) => {
                  return (<ModelTr key={i} e={e} user={user}/> )
                })
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
