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

  
  const ModelTr = ({e, setFormData, formData, setDisable}) => {
    
    const handleClick = (e) => {
     
      setFormData({
        ...formData,
        customer: {
          ...formData.customer,
          CustomerID: e.CustomerID || '',
          Contact_Name: e.Contact_Name || '',
          Company: e.Company || '',
          Company_Position: e.Company_Position || '',
          Phone: e.Phone || '',
          Email: e.Email || '',
          DiscountID: e.DiscountID || 1,
          DiscountRate: e.DiscountRate || 0,
          Seller: e.SellerID || ''
        },
      });
      setDisable(false)
    };
   
    return(
      <Tr 
        cursor={'pointer'} 
        key={e.CustomerID}
        _hover={{
          bg: 'web.navBar',
          color: 'logo.orange'
        }}
        textColor={e.CustomerID === formData.customer.CustomerID ? 'logo.orange' : 'unset'}
        bg={e.CustomerID === formData.customer.CustomerID ? 'web.navBar' : 'unset'}
        onClick={() => handleClick(e)}
      >
        <Td fontSize={'xs'} w={'6vw'} maxW={'6vw'} minW={'6vw'} textAlign={'center'}>{e.CustomerID}</Td>
        <Td fontSize={'xs'} w={'10vw'} maxW={'10vw'} overflow={'hidden'}>
          <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{e.Contact_Name && e.Contact_Name !== 'null' ? e.Contact_Name : ''}</Text>
        </Td>
        <Td fontSize={'xs'} w={'10vw'} maxW={'10vw'} minW={'10vw'} overflow={'hidden'}textAlign={'center'}>
          <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{e.Email && e.Email !== 'null' ? e.Email : ''}</Text>
        </Td>
        <Td fontSize={'xs'} textAlign={'center'} w={'8vw'} maxW={'8vw'} minW={'8vw'}>{e.Phone && e.Phone !== 'null' ? e.Phone : ''}</Td>
        <Td fontSize={'xs'} w={'12vw'} maxW={'12vw'} minW={'12vw'} overflow={'hidden'}>
          <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{e.Company && e.Company !== 'null' ? e.Company : ''}</Text>
        </Td>
      </Tr>
    )
  }
  
  const CreateSampleCustomerList = ({customersFilter, setFormData, formData, setDisable}) => {
  
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
      maxHeight={'50vh'}
      minHeight={'50vh'}
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
      id={'selectCustomerList'}
      bg={'web.sideBar'} 
      rounded={'md'} 
      p={'3vh'}
      >
      {
        customersFilter.length ? (
          <TableContainer>
            <Table color={'web.text'}variant={'simple'} size={'sm'}>
              <Thead h={'3vh'}>
                <Tr>
                    <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'}>IDs</Th>
                    <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'}>Name</Th>
                    <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'}>Email</Th>
                    <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'}>Phone</Th>
                    <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'}>Company</Th>
                  </Tr>
                </Thead>
                <Tbody >
                { 
                  customersFilter.slice(0, loadedCount).map((e, i) => (
                    <ModelTr key={i} e={e} setFormData={setFormData} formData={formData} setDisable={setDisable} /> 
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
  </>
  )
}
  export default CreateSampleCustomerList;
  