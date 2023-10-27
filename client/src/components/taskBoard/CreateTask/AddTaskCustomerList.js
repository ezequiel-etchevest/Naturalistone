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
  Center,
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanProjectDetail, getCustomerProjects } from '../../../redux/actions-projects';
import { getInvoicesBySeller } from '../../../redux/actions-invoices';



const ModelTr = ({e, setFormData, formData}) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleClick = () => {
    if(formData.CustomerID === e.CustomerID){
      setFormData({
        ...formData,
        CustomerID: '',
      })
      dispatch(cleanProjectDetail())
      dispatch(getInvoicesBySeller(user[0].SellerID,{inputName:'',inputNumber:'',selectSeller:'',timeFilter:''}))

    }else{
      setFormData({
        ...formData,
        CustomerID: e.CustomerID,
      })
      dispatch(getCustomerProjects(e.CustomerID))
    }
  }

  return(
    <Tr 
    onClick={handleClick} 
    cursor={'pointer'} 
    key={e.CustomerID}
    bg={formData.CustomerID === e.CustomerID ? 'web.navBar' : 'unset'}
    textColor={formData.CustomerID === e.CustomerID ? 'logo.orange' : 'unset'}
    _hover={{
      bg: 'web.navBar',
      color: 'logo.orange'
      }}
    >
      <Td fontSize={'xs'} maxW={'6vw'} textAlign={'match-parent'}>{e.Contact_Name}</Td>
      <Td fontSize={'xs'} maxW={'10vw'} textAlign={'match-parent'}>{e.Company ? e.Company : '-'}</Td>
      <Td fontSize={'xs'} maxW={'6vw'} textAlign={'match-parent'}>{e.Email ? e.Email.toLowerCase() : '-'}</Td>
    </Tr>
  )
}

export const AddTaskCustomerList = ({customers, setFormData, formData, customersFilter}) => {

  const [initialCount] = useState(20);
  const [batchCount] = useState(15);
  const [loadedCount, setLoadedCount] = useState(initialCount);

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
      maxH={'40vh'}
      minH={'40vh'}
      ml={'1vh'}
      w={'96%'}
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
        p={'2vh'}
        w={'100%'} 
        >
          {
            customersFilter.length ?
             (
              <TableContainer  maxW={'80vw'}>
                <Table color={'web.text'}variant={'simple'} size={'sm'}>
                  <Thead h={'6vh'}>
                    <Tr>
                        <Th color={'web.text2'} maxW={'6vw'} textAlign={'center'}>Full Name</Th>
                        <Th color={'web.text2'} maxW={'10vw'} textAlign={'center'}>Company</Th>
                        <Th color={'web.text2'} maxW={'6vw'} textAlign={'center'}>E-mail</Th>
                      </Tr>
                    </Thead>
                    <Tbody >
                    { 
                      customersFilter.slice(0, loadedCount).map((e, i) => {
                        return (<ModelTr key={i} e={e} setFormData={setFormData} formData={formData}/> )
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
    )}