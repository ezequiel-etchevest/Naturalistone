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
    
    const [selectedCustomerID, setSelectedCustomerID] = useState(formData.customer.CustomerID);

    const handleClick = (e) => {
      const customerID = e.CustomerID;
      setSelectedCustomerID(customerID);
      setFormData({
        ...formData,
        customer: {
          ...formData.customer,
          CustomerID: e.CustomerID || '',
          Contact_Name: e.Contact_Name || '',
          City: e.City || '',
          Address: e.Address || '',
          State: e.State || '',
          ZipCode: e.ZipCode || '',
          Company: e.Company || '',
          Company_Position: e.Company_Position || '',
          Phone: e.Phone || '',
          Email: e.Email || '',
          DiscountID: e.DiscountID || '',
          DiscountRate: e.DiscountRate?.toString() || '',
          Billing_Address: e.Billing_Address || '',
          Billing_City: e.Billing_City || '',
          Billing_ZipCode: e.Billing_ZipCode || '',
          Billing_State: e.Billing_State || '',
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
        <Td fontSize={'xs'}  w={'4vw'}>{e.CustomerID}</Td>
        <Td fontSize={'xs'} textAlign={'center'}>{e.Contact_Name ? e.Contact_Name : '-'}</Td>
        <Td fontSize={'xs'}  w={'24vw'}>{e.Company}</Td>
      </Tr>
    )
  }
  
  const CreateQuoteCustomerList = ({customers, setFormData, formData, setDisable}) => {
  
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
      maxHeight={'51vh'}
      minHeight={'51vh'}
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
    </Box>
  </>
  )
}
  export default CreateQuoteCustomerList;
  