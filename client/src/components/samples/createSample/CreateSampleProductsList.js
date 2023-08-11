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
    Center
  } from '@chakra-ui/react';
  import { useEffect, useState } from 'react';


const ModelTr = ({e, formData, setFormData}) => {
  let id = e.ProdID

const handleInput = () => {
    if(!formData.products.hasOwnProperty(e.ProdID)){
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
        }else{
          setFormData((prevFormData) => {
            const { [id]: value, ...updatedProducts } = prevFormData.products;
            return {
              ...prevFormData,
              products: updatedProducts,
            };
          });
        }
      }

  return(
    <Tr       
      cursor={'pointer'} 
      key={e.ProdID}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
      }} 
      onClick={handleInput} 
      bg={formData.products.hasOwnProperty(e.ProdID)? 'web.navBar' : 'unset' }
      color={formData.products.hasOwnProperty(e.ProdID)? 'logo.orange' : 'unset' }
      >
      <Td maxW={'3vw'} fontSize={'xs'} textAlign={'match-parent'}>{e.ProductName}</Td>
      <Td maxW={'6vw'} fontSize={'xs'} textAlign={'center'}>{e.Material}</Td>
      <Td maxW={'8vw'} fontSize={'xs'} textAlign={'center'}> {e.Finish === null ? 'N/A' : e.Finish} </Td>
    </Tr>
  )
}

const CreateSampleProductsList = ({ allProducts, allProductsErrors, formData, setFormData }) => {
  
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
      maxHeight={'44vh'}
      minHeight={'44vh'}
      w={'700px'}
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
      id={'createQuoteProductList'}
      bg={'web.sideBar'} 
      rounded={'md'} 
      p={'0.5vw'}
      >
        {
        allProducts.length ? 
        <TableContainer pr={'0.5vw'}  pl={'0.5vw'}>
          <Table color={'web.text'} variant={'simple'} size={'sm'}>
            <Thead h={'6vh'}>
              <Tr>  
                <Th color={'web.text2'} fontSize={'x-small'} w={'5vw'}>Product Name</Th>
                <Th color={'web.text2'} fontSize={'x-small'} w={'5vw'} textAlign={'center'}>Type</Th>
                <Th color={'web.text2'} fontSize={'x-small'} w={'10vw'} textAlign={'center'}>Finish</Th>
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