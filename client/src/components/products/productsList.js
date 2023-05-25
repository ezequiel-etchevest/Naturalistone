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
    Switch,
    Text,
    Center
  } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/actions-products';
import { useEffect, useState } from 'react';
import{ ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { patchDiscontinued } from '../../redux/actions-products';
import '../../assets/styleImgs.css';
import { getProductImage } from '../../redux/actions-products';
import img from '../../assets/ProductPicture/354-1.jpg'



const ModelTr = ({e, user, allProducts}) => {

  
  const a = e.Discontinued_Flag === 'True' ? true : false 
  const [flag, setFlag] = useState(a)
  const productImage = useSelector(state => state.product_image);
  
  const [images, setImages] = useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const name = e.ProductName
  
  const handleClickProduct = () => {
    dispatch(getProductById(e.ProdID))
    if(e.ProdID !== undefined)
    navigate(`/products/${e.ProdID}`)
    }
  const handleClickSwitch = () => {
    setFlag(flag === true ? false : true)
    dispatch(patchDiscontinued(e.ProdID, flag))
    }

    useEffect(() => {
      if (!productImage[name]?.length) {
        dispatch(getProductImage(e.ProductName, e.Material, e.ProdID));
      }
    }, [allProducts]);
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     if (productImage[name] && productImage[name].length > 0) {
  //       const imageUrls = await Promise.all(
  //         productImage[name].map((data) => `data:image/jpeg;base64,${data}`)
  //       );
  //       setImages(imageUrls);
  //     }
  //   };
  //   fetchImages();
  // }, [productImage, allProducts]);

  console.log(productImage)
  return(
    <Tr       
    cursor={'pointer'} 
    key={e.ProdNameID}
    _hover={{
      bg: 'web.navBar',
      color: 'logo.orange'
    }} 
    >
      {/* Descomentar para pruebas en el local -> */}
      {/* <Td maxH={'3vh'} minH={'3vh'} h={'3vh'} w={'4vw'} onClick={() => handleClickProduct()} fontSize={'xs'} textAlign={'match-parent'}>
        <div className="image-container" >
          <img src={img} className="enlarge-image" alt="Product Image" />
        </div>
      </Td> */}
      {/* Comentar para pruebas en el local -> */}
      {
        productImage[name] ? (
          <Td maxH={'3vh'} minH={'3vh'} h={'3vh'} w={'4vw'} onClick={() => handleClickProduct()} fontSize={'xs'} textAlign={'match-parent'}>
          <div className="image-container" >
            <img src={`data:image/jpeg;base64,${productImage[name][0]}`} className="enlarge-image" alt="Product Image" />
          </div>
        </Td>
        ) : (
           <Td maxH={'3vh'} minH={'3vh'} h={'3vh'} w={'4vw'} onClick={() => handleClickProduct()} fontSize={'xs'} textAlign={'match-parent'}>
         <div className="image-container" >
          </div>
        </Td>
        )   
      }
      <Td maxH={'6vh'} maxW={'3vw'} onClick={() => handleClickProduct()} fontSize={'xs'} textAlign={'match-parent'}>{e.ProductName}</Td>
      <Td maxH={'6vh'} maxW={'6vw'} onClick={() => handleClickProduct()} fontSize={'xs'} textAlign={'center'}>{e.Material}</Td>
      <Td maxH={'6vh'} maxW={'3vw'} onClick={() => handleClickProduct()} fontSize={'xs'} textAlign={'center'}>{e.Size}</Td>
      <Td maxH={'6vh'} maxW={'2vw'} onClick={() => handleClickProduct()} fontSize={'xs'} textAlign={'center'}> {e.Thickness === null ? 'N/A' : e.Thickness} </Td>
      <Td maxH={'6vh'} maxW={'3vw'} onClick={() => handleClickProduct()} fontSize={'xs'} textAlign={'center'}> {e.Finish === null ? 'N/A' : e.Finish} </Td>
      <Td maxH={'6vh'} maxW={'3vw'} onClick={() => handleClickProduct()} fontSize={'xs'} isNumeric>$ { e.Price ? e.Price.toLocaleString('en-US') : '-'}</Td>
      <Td maxH={'6vh'} maxW={'2vw'} onClick={() => handleClickProduct()} fontSize={'xs'} textAlign={'center'}>{e.InStock_Available === null ? 'N/A' : e.InStock_Available}</Td>
      <Td maxH={'6vh'} maxW={'2vw'} onClick={() => handleClickProduct()} fontSize={'xs'} textAlign={'center'}>{e.Incoming_Available === null ? 0 : e.Incoming_Available}</Td>
      <Td maxH={'6vh'} maxW={'3vw'} onClick={() => handleClickProduct()} fontSize={'xs'} textAlign={'center'}>{e.NextArrival === undefined ? '-' : e.NextArrival}</Td>
      <Td maxH={'6vh'} maxW={'3vw'} pl={'3.5vw'}>{ user[0].Secction7Flag !== 1 ? (e.Discontinued_Flag === 'True' ? <ImCheckboxChecked color='logo.orange'/> : <ImCheckboxUnchecked color='logo.orange'/> ) : (<Switch  onChange={() => handleClickSwitch()} isChecked={flag} colorScheme={'orange'} size={'sm'}/>) }</Td>
      </Tr>
  )
}

const ProductList = ({ allProducts, user }) => {
  const productErrors = useSelector((state) => state.products_errors);
  const toast = useToast();
  const [initialCount] = useState(20);
  const [batchCount] = useState(15);
  const [loadedCount, setLoadedCount] = useState(initialCount);

  const validateToast = () => {
    if (Object.entries(productErrors).length) {
      toast({
        title: `${productErrors.error}`,
        status: 'warning',
        duration: 1500,
        isClosable: true,
      });
    }
  };


  const handleScroll = () => {
    const container = document.getElementById('scroll-container'); // Reemplaza 'scroll-container' con el ID de tu contenedor de desplazamiento
    const { scrollTop, clientHeight, scrollHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      // El usuario ha llegado al final, carga más productos
      setLoadedCount(prevCount => prevCount + batchCount);
    }
  };
  useEffect(() => {
    
    const container = document.getElementById('scroll-container'); // Reemplaza 'scroll-container' con el ID de tu contenedor de desplazamiento
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [batchCount]);

  useEffect(() => {
    validateToast();
  }, [allProducts]);

  return (
    <Box userSelect={'none'} display={'flex'} justifyContent={'center'} h={'69vh'} w={'82.8vw'} ml={'1vh'}>
      <Box
        id='scroll-container'
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
        border={'1px solid'}
        rounded={'md'}
        p={'3vh'}
        w={'80vw'}
      >
        {allProducts.length && !Object.entries(productErrors).length ? (
          <TableContainer mr={'1vw'}>
            <Table color={'web.text'} variant={'simple'} size={'sm'}>
              <Thead h={'6vh'}>
                <Tr>
                  <Th fontSize={'0.8vw'} color={'web.text2'}></Th>
                  <Th fontSize={'0.8vw'} color={'web.text2'}>
                    Product Name
                  </Th>
                  <Th fontSize={'0.8vw'} color={'web.text2'} textAlign={'center'}>
                    Type
                  </Th>
                  <Th fontSize={'0.8vw'} color={'web.text2'} textAlign={'center'}>
                    Size
                  </Th>
                  <Th fontSize={'0.8vw'} color={'web.text2'} textAlign={'center'}>
                    Thickness
                  </Th>
                  <Th fontSize={'0.8vw'} color={'web.text2'} textAlign={'center'}>
                    Finish
                  </Th>
                  <Th fontSize={'0.8vw'} color={'web.text2'} isNumeric>
                    Price
                  </Th>
                  <Th fontSize={'0.8vw'} color={'web.text2'} textAlign={'center'}>
                    In Stock
                  </Th>
                  <Th fontSize={'0.8vw'} color={'web.text2'} textAlign={'center'}>
                    Incoming
                  </Th>
                  <Th fontSize={'0.8vw'} color={'web.text2'} textAlign={'center'}>
                    Next Arrival
                  </Th>
                  <Th fontSize={'0.8vw'} color={'web.text2'}>
                    Discontinued
                  </Th>
                </Tr>
              </Thead>
              <Tbody >
                {allProducts.slice(0, loadedCount).map((e, i) => {
                  return <ModelTr key={i} e={e} user={user} allProducts={allProducts} />;
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

export default ProductList;
