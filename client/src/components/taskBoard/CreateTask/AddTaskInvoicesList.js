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
    
  
  const ModelTr = ({e, setFormData, formData}) => {

    const handleClick = () => {
      if(formData.InvoiceID === e.Naturali_Invoice){
        setFormData({
          ...formData,
          InvoiceID:'',
        })
      }else {
        setFormData({
          ...formData,
          InvoiceID: e.Naturali_Invoice,
        })
      }

    }
  
    return(
      <Tr 
      onClick={handleClick} 
      cursor={'pointer'} 
      key={e.CustomerID}
      bg={formData.InvoiceID === e.Naturali_Invoice ? 'web.navBar' : 'unset'}
      textColor={formData.InvoiceID === e.Naturali_Invoice ? 'logo.orange' : 'unset'}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
        }}
      >
        <Td fontSize={'xs'} maxW={'6vw'} textAlign={'match-parent'}>{e.Naturali_Invoice}</Td>
        <Td fontSize={'xs'} maxW={'10vw'} textAlign={'match-parent'}>{e.Contact_Name ? e.Contact_Name : '-'}</Td>
        <Td fontSize={'xs'} maxW={'10vw'} textAlign={'match-parent'}>{e.Company ? e.Company : '-'}</Td>
        <Td fontSize={'xs'} maxW={'6vw'} textAlign={'match-parent'}>{e.InvoiceDate ? e.InvoiceDate.split('T')[0] : '-'}</Td>
      </Tr>
    )
  }
  
  export const AddTaskInvoicesList = ({seller_invoices, setFormData, formData}) => {
  
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
              seller_invoices.length ?
  
               (
                <TableContainer  maxW={'80vw'}>
                  <Table color={'web.text'}variant={'simple'} size={'sm'}>
                    <Thead h={'6vh'}>
                      <Tr>
                          <Th color={'web.text2'} maxW={'6vw'} textAlign={'center'}>Nº</Th>
                          <Th color={'web.text2'} maxW={'10vw'} textAlign={'center'}>Customer</Th>
                          <Th color={'web.text2'} maxW={'10vw'} textAlign={'center'}>Company</Th>
                          <Th color={'web.text2'} maxW={'6vw'} textAlign={'center'}>Date</Th>
                        </Tr>
                      </Thead>
                      <Tbody >
                      { 
                        seller_invoices.slice(0, loadedCount).map((e, i) => {
                          return (<ModelTr key={i} e={e} setFormData={setFormData} formData={formData}/> )
                        })
                      }
                      </Tbody>
                    </Table>
                  </TableContainer> 
                  ) : (
                  <Center w={'full'} h={'full'}>
                    <Text userSelect={'none'} fontSize={'2vh'}>No invoices found</Text>
                  </Center>
                  )
              }
          </Box> 
        </Box>
      )}