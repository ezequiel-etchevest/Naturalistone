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
  import SelectedCustomerModal from './selectedCustomerReview';
  import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCustomerById } from '../../../redux/actions-customers';
  
  const ModelTr = ({e, onOpen2, setCustomer}) => {
    
    const dispatch = useDispatch()

    const handleClick = (e) => {
      dispatch(getCustomerById(e.CustomerID))
      setCustomer(e)
      onOpen2()
    }

    return(
      <Tr 
      cursor={'pointer'} 
      key={e.CustomerID}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
        }}
        onClick={() => handleClick(e)}
      >
        <Td fontSize={'xs'}  w={'4vw'}>{e.CustomerID}</Td>
        <Td fontSize={'xs'} textAlign={'center'}>{e.Contact_Name ? e.Contact_Name : '-'}</Td>
        <Td fontSize={'xs'}  w={'24vw'}>{e.Company}</Td>
      </Tr>
    )
  }
  
  const SelectCustomerModalList = ({customers, customer, setCustomer, onOpen2, onClose2, isOpen2, onClose1, setInputValue}) => {
  
    const [initialCount] = useState(14);
    const [batchCount] = useState(10);
    const [loadedCount, setLoadedCount] = useState(initialCount);

    const handleScroll = () => {
      const container = document.getElementById('selectCustomerList'); // Reemplaza 'scroll-container' con el ID de tu contenedor de desplazamiento
      const { scrollTop, clientHeight, scrollHeight } = container;
  
      if (scrollTop + clientHeight >= scrollHeight - 15) {
        // El usuario ha llegado al final, carga más productos
        setLoadedCount(prevCount => prevCount + batchCount);
      }
    };
    
    useEffect(() => {
      
      const container = document.getElementById('selectCustomerList'); // Reemplaza 'scroll-container' con el ID de tu contenedor de desplazamiento
      container.addEventListener('scroll', handleScroll);
  
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }, [batchCount]);
  

  return(
<>
  <Box
    display={'flex'}
    justifyContent={'center'}
    >
      <Box
      maxHeight={'50vh'}
      minHeight={'50vh'}
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
      id={'selectCustomerList'}
      bg={'web.sideBar'} 
      rounded={'md'} 
      p={'3vh'}
      >
      {
        customers.length ? (
          <TableContainer w={'46vw'}>
            <Table color={'web.text'}variant={'simple'} size={'sm'}>
              <Thead h={'3vh'}>
                <Tr>
                    <Th color={'web.text2'} textAlign={'center'} w={'4vw'} fontSize={'x-small'}>IDs</Th>
                    <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'}>Full Name</Th>
                    <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'} w={'24vw'}>Company</Th>
                  </Tr>
                </Thead>
                <Tbody >
                { 
                  customers.slice(0, loadedCount).map((e, i) => (
                    <ModelTr key={i} e={e}  onOpen2={onOpen2} setCustomer={setCustomer} /> 
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
    <SelectedCustomerModal 
    onClose2={onClose2}
    onClose1={onClose1}
    isOpen2={isOpen2}
    onOpen2={onOpen2} 
    customer={customer}
    setInputValue={setInputValue}
    setCustomer={setCustomer}/>
  </>
  )
}
  export default SelectCustomerModalList;
  