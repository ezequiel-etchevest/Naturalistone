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
        factory: {
          ...formData.factory,
          FactoryID: e.FactoryID || '', 
          Reference: e.Reference || '', 
          Factory_Name: e.Factory_Name || '', 
          Phone: e.Phone || '', 
          Email: e.Email || '', 
          WebSite: e.WebSite || '', 
          International_Flag: e.International_Flag || ''
        },
      });
      // setDisable(false)
    };
   
    return(
      <Tr 
      cursor={'pointer'} 
      key={e.FactoryID}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
        }}
        textColor={e.FactoryID === formData.factory.FactoryID ? 'logo.orange' : 'unset'}
        bg={e.FactoryID === formData.factory.FactoryID ? 'web.navBar' : 'unset'}
        onClick={() => handleClick(e)}
      >
        <Td fontSize={'xs'}  w={'4vw'}>{e.FactoryID}</Td>
        <Td fontSize={'xs'} textAlign={'center'}>{e.Reference ? e.Reference : '-'}</Td>
        <Td fontSize={'xs'} textAlign={'center'}>{e.Factory_Name ? e.Factory_Name : '-'}</Td>
        <Td fontSize={'xs'} textAlign={'center'}>{e.Phone ? e.Phone : '-'}</Td>
        <Td fontSize={'xs'} textAlign={'center'}>{e.Email ? e.Email : '-'}</Td>
        <Td fontSize={'xs'} textAlign={'center'}>{e.WebSite ? e.WebSite : '-'}</Td>
      </Tr>
    )
  }
  
  const CreateOrderFactoryList = ({ factories, setFormData, formData, setDisable}) => {
  
    const [initialCount] = useState(14);
    const [batchCount] = useState(10);
    const [loadedCount, setLoadedCount] = useState(initialCount);

    const handleScroll = () => {
      const container = document.getElementById('selectFactoryList'); // Reemplaza 'scroll-container' con el ID de tu contenedor de desplazamiento
      const { scrollTop, clientHeight, scrollHeight } = container;
  
      if (scrollTop + clientHeight >= scrollHeight - 15) {
        // El usuario ha llegado al final, carga más productos
        setLoadedCount(prevCount => prevCount + batchCount);
      }
    };
    
    useEffect(() => {
      
      const container = document.getElementById('selectFactoryList'); // Reemplaza 'scroll-container' con el ID de tu contenedor de desplazamiento
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
      id={'selectFactoryList'}
      bg={'web.sideBar'} 
      rounded={'md'} 
      p={'3vh'}
      >
      {
        factories.length ? (
          <TableContainer >
            <Table color={'web.text'}variant={'simple'} size={'sm'}>
              <Thead h={'3vh'}>
                <Tr>
                    <Th color={'web.text2'} textAlign={'center'} w={'4vw'} fontSize={'x-small'}>IDs</Th>
                    <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'}>Reference</Th>
                    <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'} w={'24vw'}>Factory Name</Th>
                    <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'} w={'24vw'}>Phone</Th>
                    <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'} w={'24vw'}>Email</Th>
                    <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'} w={'24vw'}>WebSite</Th>
                  </Tr>
                </Thead>
                <Tbody >
                { 
                  factories.slice(0, loadedCount).map((e, i) => (
                    <ModelTr key={i} e={e} setFormData={setFormData} formData={formData} setDisable={setDisable} /> 
                  ))
                }
                </Tbody>
              </Table>
            </TableContainer> 
            ) : (
            <Center w={'full'} h={'full'}>
              <Text userSelect={'none'} fontSize={'2vh'}>No orders found</Text>
            </Center>
            )
        }
      </Box> 
    </Box>
  </>
  )
}
  export default CreateOrderFactoryList;
  