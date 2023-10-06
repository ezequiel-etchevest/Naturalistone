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
  Center
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


const ModelTr = ({ e, products, setProducts, index }) => {

const handleClick = (event) => {
    setProducts({
        ...products,
        idProductName: event.ProdNameID,
    })
}

  return(
    <>
        <Tr       
        cursor={'pointer'} 
        key={e.ProdID}
        _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
        }}
        onClick={() => handleClick(e)}
        color={e.ProdNameID === products.idProductName ? 'logo.orange' : 'unset'}
        > 
        <Td maxH={'6vh'} maxW={'3vw'} fontSize={'xs'} textAlign={'center'}>{e.ProductName}</Td>
        <Td maxH={'6vh'} maxW={'3vw'} fontSize={'xs'} textAlign={'center'}>{e.Material}</Td>
        </Tr>
    </>

)
}

const ProductListCreateProductDimension = ({ all_products_search, products, setProducts }) => {

const productErrors = useSelector((state) => state.products_errors);
const toast = useToast();
const [initialCount] = useState(20);
const [batchCount] = useState(15);
const [loadedCount, setLoadedCount] = useState(initialCount);
const toastId = 'error_products'

const validateToast = () => {
  if (Object.entries(productErrors).length) {
    if(!toast.isActive(toastId)){
      toast({
        id: toastId,
        title: `${productErrors}`,
        status: 'warning',
        duration: 1500,
        isClosable: true,
      });
    }

  }
};

const handleScroll = () => {
  const container = document.getElementById('scroll-create-product-container'); // Reemplaza 'scroll-container' con el ID de tu contenedor de desplazamiento
  const { scrollTop, clientHeight, scrollHeight } = container;

  if (scrollTop + clientHeight >= scrollHeight - 20) {
    // El usuario ha llegado al final, carga más productos
    setLoadedCount(prevCount => prevCount + batchCount);
  }
};
useEffect(() => {
  
  const container = document.getElementById('scroll-create-product-container'); // Reemplaza 'scroll-container' con el ID de tu contenedor de desplazamiento
  container.addEventListener('scroll', handleScroll);

  return () => {
    container.removeEventListener('scroll', handleScroll);
  };
}, [batchCount]);

useEffect(() => {
  validateToast();
}, [all_products_search]);

return (
  <Box userSelect={'none'} display={'flex'} justifyContent={'center'} h={'30vh'} w={'20vw'}>
    <Box
      id='scroll-create-product-container'
      maxHeight={'67vh'}
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
      borderColor={'web.border'}
      bg={'web.sideBar'}
      rounded={'md'}
      w={'82vw'}
    >
      {
      all_products_search.length ? (
        <TableContainer mr={'1vw'}>
          <Table color={'web.text'} variant={'simple'} size={'sm'} alignItems={"center"}>
            <Thead textAlign={"center"}>
              <Tr>
                <Th fontSize={'0.8vw'} color={'web.text2'} textAlign={"center"}>
                  Product name
                </Th>
                <Th fontSize={'0.8vw'} color={'web.text2'} textAlign={"center"}>
                  Material
                </Th>
              </Tr>
            </Thead>
            <Tbody >
              {all_products_search.slice(0, loadedCount).map((e, i) => {
                return <ModelTr
                key={i}
                index={i}
                e={e}
                products={products}
                all_products_search={all_products_search}
                loadedCount={loadedCount}
                setProducts={setProducts}
                />;
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Center w={'full'} h={'full'}>
          <Text userSelect={'none'} fontSize={'2vh'}>
            No products found
          </Text>
        </Center>
      )}
    </Box>
  </Box>
);
};

export default ProductListCreateProductDimension;