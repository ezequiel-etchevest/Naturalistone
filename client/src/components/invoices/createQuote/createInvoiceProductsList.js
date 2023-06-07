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
    NumberInput,
    NumberInputField,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputStepper
  } from '@chakra-ui/react';
  import { useEffect, useState } from 'react';


const ModelTr = ({e, setProducts, products}) => {
  let id = e.ProdID

const handleAuthFlag = (event) =>{
  if(event !== 0){
    if((Number(e.InStock_Available) + Number(e.Incoming_Available)) < event) return true
    if((Number(e.InStock_Available) + Number(e.Incoming_Available)) > event) return false
  }else return null 
}

const handleInput = (event) => {
  // Actualizas solo la propiedad que cambió en el objeto de formData
  if(event != 0){
      setProducts((prevFormData) => ({
        ...prevFormData,
        [id]: {
          ...prevFormData[id],
          quantity: event,
          prodID: e.ProdID,
          prodName: e.ProductName,
          type: e.Type,
          size:e.Size,
          thickness:e.Thickness,
          finish:e.Finish,
          price: e.Price,
          authFlag: handleAuthFlag(event)
        },
      }));
  }else {
    setProducts((prevFormData) => {
      const { [id]: value, ...updatedFormData } = prevFormData;   //Se elimina la clave [id] y su valor del objeto products, actualizando así el 
      return updatedFormData;                                     //estado products sin el elemento correspondiente a [id].
    })
  }
}


  return(
    <Tr       
      cursor={'pointer'} 
      key={e.ProdNameID}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
      }} 
      >
        <Td w={'8vw'}>
          <NumberInput
            borderColor={'web.border'} 
            color={'web.text2'}
            w={'6vw'}
            ml={'1vw'}
            h={'4vh'}
            onChange={handleInput} 
            step={1} 
            min={0} 
            precision={0}
            key={e.ProdID}
            value={ products[id] ? products[id].quantity : 0} 
            >
            <NumberInputField 
            fontSize={'2xs'}                   
            _focus={{
              borderColor: 'logo.orange',
              boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
                    }}

              h={'4vh'}/>
            <NumberInputStepper>
              <NumberIncrementStepper fontSize={'3xs'}/>
              <NumberDecrementStepper fontSize={'3xs'}/>
            </NumberInputStepper>
          </NumberInput>
          </Td>
      <Td maxW={'3vw'} fontSize={'2xs'} textAlign={'match-parent'}>{e.ProductName}</Td>
      <Td maxW={'6vw'} fontSize={'2xs'} textAlign={'center'}>{e.Material}</Td>
      <Td maxW={'3vw'} fontSize={'2xs'} textAlign={'center'}>{e.Size}</Td>
      <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}> {e.Thickness === null ? 'N/A' : e.Thickness} </Td>
      <Td fontSize={'2xs'} maxW={'8vw'} textAlign={'center'}> {e.Finish === null ? 'N/A' : e.Finish} </Td>
      <Td maxW={'3vw'} fontSize={'2xs'} isNumeric>$ { e.Price ? e.Price.toLocaleString('en-US') : '-'}</Td>
      <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e.InStock_Available === null ? 'N/A' : e.InStock_Available}</Td>
      <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e.Incoming_Available === null ? 0 : e.Incoming_Available}</Td>
      </Tr>
  )
}

const CreateInvoiceProductsList = ({ allProducts, setProducts, products }) => {
  
  
  const [initialCount] = useState(12);
  const [batchCount] = useState(14);
  const [loadedCount, setLoadedCount] = useState(initialCount);

  const handleScroll = () => {
    const container = document.getElementById('createQuoteProductList'); // Reemplaza 'scroll-container' con el ID de tu contenedor de desplazamiento
    const { scrollTop, clientHeight, scrollHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 14) {
      // El usuario ha llegado al final, carga más productos
      setLoadedCount(prevCount => prevCount + batchCount);
    }
  };
  
  useEffect(() => {
    const container = document.getElementById('createQuoteProductList'); // Reemplaza 'scroll-container' con el ID de tu contenedor de desplazamiento
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [batchCount]);


  return(
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
      id={'createQuoteProductList'}
      bg={'web.sideBar'} 
      rounded={'md'} 
      p={'1vh'}
      >
        {
        allProducts.length ? 
        <TableContainer  mr={'0.5vw'}  ml={'0.5vw'}>
          <Table color={'web.text'} variant={'simple'} size={'sm'}>
            <Thead h={'6vh'}>
              <Tr>  
                <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Quantities</Th>
                <Th color={'web.text2'} fontSize={'2xs'} >Product Name</Th>
                <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Type</Th>
                <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Size</Th>
                <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Thickness</Th>
                <Th color={'web.text2'} fontSize={'2xs'} w={'10vw'} textAlign={'center'}>Finish</Th>
                <Th color={'web.text2'} fontSize={'2xs'} isNumeric>Price</Th>
                <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>In Stock</Th>
                <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Incoming</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                allProducts.slice(0, loadedCount).map((e, i) => {
                  return(
                    <ModelTr key={i} e={e} setProducts={setProducts} products={products} />
                  )
                })
              }
            </Tbody>
          </Table>
        </TableContainer>
        :
        (
          <Center w={'full'} h={'full'}>
          <Text userSelect={'none'} fontSize={'2vh'}>No products found</Text>
          </Center>
        )
        }
      </Box>  
    </Box>
  )
}
export default CreateInvoiceProductsList;