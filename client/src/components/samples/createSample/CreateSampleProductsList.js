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


const ModelTr = ({e, formData, setFormData}) => {
  let id = e.ProdID

const handleInput = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      products: {
        ...prevFormData.products,
        [id]: {
          ...prevFormData.products[id],
              prodID: e.ProdID,
              prodName: e.ProductName,
              type: e.Material,
              size:e.Size,
              thickness:e.Thickness,
              finish:e.Finish,
              price: e.Price,
              prodNameID: e.ProdNameID
            },
          },
        }));
      }

      console.log('formdata', formData)
    
  return(
    <Tr       
      cursor={'pointer'} 
      key={e.ProdID}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
      }} 
      onClick={handleInput} 
      >
      <Td maxW={'3vw'} fontSize={'xs'} textAlign={'match-parent'}>{e.ProductName}</Td>
      <Td maxW={'6vw'} fontSize={'xs'} textAlign={'center'}>{e.Material}</Td>
      <Td fontSize={'xs'} maxW={'8vw'} textAlign={'center'}> {e.Finish === null ? 'N/A' : e.Finish} </Td>
      </Tr>
  )
}

const CreateSampleProductsList = ({ allProducts, allProductsErrors, formData, setFormData }) => {
  
  console.log('all produc', allProducts)
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
        <TableContainer  mr={'0.5vw'}  ml={'0.5vw'} w={'40vw'}>
          <Table color={'web.text'} variant={'simple'} size={'sm'}>
            <Thead h={'6vh'}>
              <Tr>  
                <Th color={'web.text2'} fontSize={'xs'} w={'5vw'}>Product Name</Th>
                <Th color={'web.text2'} fontSize={'xs'} w={'5vw'} textAlign={'center'}>Type</Th>
                <Th color={'web.text2'} fontSize={'xs'} w={'10vw'} textAlign={'center'}>Finish</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                allProducts.slice(0, loadedCount).map((e, i) => {
                  return(
                    <ModelTr key={i} e={e} setFormData={setFormData} formData={formData} />
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
export default CreateSampleProductsList;