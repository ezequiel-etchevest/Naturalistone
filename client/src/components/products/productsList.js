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
  Input,
  Center
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/actions-products';
import { useEffect, useState } from 'react';
import{ ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { patchProduct } from '../../redux/actions-products';
import '../../assets/styleImgs.css';


const ModelTr = ({e, user, allProducts, loadedCount}) => {
const a = e.Discontinued_Flag === 'True' ? true : false 
const [flag, setFlag] = useState(a)
const [priceSt, setPrice] = useState(e.Price !== null ? e.Price : '')
const navigate = useNavigate()
const dispatch = useDispatch()
const validUser = user[0].SellerID === 17 ? true : false

const handleClickProduct = () => {
  dispatch(getProductById(e.ProdID))
  if(e.ProdID !== undefined)
  navigate(`/products/${e.ProdID}`)
  }
const handleClickSwitch = () => {
  setFlag(flag === true ? false : true)
  const bodyUpdate = {
    flag
  }
  dispatch(patchProduct(e.ProdID, bodyUpdate))
  }

  const handleChangePrice = (event) => {
    const regex = /^\d+(\.\d{0,2})?$/;  // Modificado para permitir solo dos decimales o números enteros
  
    if (regex.test(event.target.value) || event.target.value === '') {
      const rounded = event.target.value === '' ? '' : Math.round(parseFloat(event.target.value) * 100) / 100;
  
      setPrice(rounded);
    }
  }
  const handleBlurDispatch = () => {
      const price = {
        Price: priceSt
      };
    dispatch(patchProduct(e.ProdID, price));
  }

  const material = e.Material.replace(/\+/g, '+')
  const name = e.ProductName.replace(/\+/g, '+')
  const urlImg = `https://naturalistone-images.s3.amazonaws.com/${material}/${name}/${name}_0.jpg`

  return(
  <>
  <Tr       
  cursor={'pointer'} 
  h={'5.8vh'}
  key={e.ProdNameID}
  _hover={{
    bg: 'web.navBar',
    color: 'logo.orange'
  }} 
  >
    {
      urlImg ? (
        <Td maxH={'3vh'} minH={'3vh'} h={'3vh'} minW={'4vw'} w={'5vw'} onClick={() => handleClickProduct()} fontSize={'0.9rem'} textAlign={'match-parent'}>
        <div className="image-container" >
          <img src={urlImg} className="enlarge-image" alt="" />
        </div>
      </Td>
      ) : (
         <Td maxH={'3vh'} minH={'3vh'} h={'3vh'} minW={'4vw'} w={'5vw'} onClick={() => handleClickProduct()} fontSize={'0.9rem'} textAlign={'match-parent'}>
       <div className="image-container" >
        </div>
      </Td>
      )}
    <Td maxH={'6vh'} maxW={'3vw'} onClick={() => handleClickProduct()} fontSize={'0.9rem'} textAlign={'match-parent'}>{e.ProductName}</Td>
    <Td maxH={'6vh'} maxW={'6vw'} onClick={() => handleClickProduct()} fontSize={'0.9rem'} textAlign={'center'}>{e.Material}</Td>
    <Td maxH={'6vh'} maxW={'6vw'} onClick={() => handleClickProduct()} fontSize={'0.9rem'} textAlign={'center'}>{e.Type}</Td>
    <Td maxH={'6vh'} maxW={'3vw'} onClick={() => handleClickProduct()} fontSize={'0.9rem'} textAlign={'center'}>{e.Size}</Td>
    <Td maxH={'6vh'} maxW={'2vw'} onClick={() => handleClickProduct()} fontSize={'0.9rem'} textAlign={'center'}> {e.Thickness === null ? 'N/A' : e.Thickness} </Td>
    <Td maxH={'6vh'} maxW={'3vw'} onClick={() => handleClickProduct()} fontSize={'0.9rem'} textAlign={'center'}> {e.Finish === null ? 'N/A' : e.Finish} </Td>
    <Td maxH={'6vh'} maxW={'6vw'} w={'6vw'} fontSize={'0.9rem'} >
      {
        validUser === true ? 
        <Input
          w={'4vw'}
          value={priceSt}
          onChange={(event) => handleChangePrice(event)}
          onBlur={handleBlurDispatch} 
          fontSize={'0.8rem'}
          borderColor={"web.border"}
          color={"web.text2"}
          h={"4vh"}
          step={1}
          min={0}
          precision={0}
          type="number"
          name={"price"}
          style={{
            textAlign: "center",
            WebkitPaddingEnd: 8,
            WebkitPaddingStart: 8,
          }}
          _focus={{
            borderColor: "logo.orange",
            boxShadow:
              "0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)",
          }}
          />
          :
          <Text textAlign={'center'}>{e.Price}</Text>
      }

    </Td>
    <Td maxH={'6vh'} maxW={'2vw'} onClick={() => handleClickProduct()} fontSize={'0.9rem'} textAlign={'center'}>{e.InStock_Available === null ? 'N/A' : e.InStock_Available}</Td>
    <Td maxH={'6vh'} maxW={'2vw'} onClick={() => handleClickProduct()} fontSize={'0.9rem'} textAlign={'center'}>{e.Incoming_Available === null ? 0 : e.Incoming_Available}</Td>
    <Td maxH={'6vh'} maxW={'3vw'} onClick={() => handleClickProduct()} fontSize={'0.9rem'} textAlign={'center'}>{e.NextArrival === undefined ? '-' : e.NextArrival}</Td>
    <Td maxH={'6vh'} maxW={'3vw'} pl={'3.5vw'}>{ user[0].Secction7Flag !== 1 ? (e.Discontinued_Flag === 'True' ? <ImCheckboxChecked color='logo.orange'/> : <ImCheckboxUnchecked color='logo.orange'/> ) : (<Switch  onChange={() => handleClickSwitch()} isChecked={flag} colorScheme={'orange'} size={'sm'}/>) }</Td>
    </Tr>

    </>

)
}

const ProductList = ({ allProducts, user }) => {

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
      {
      allProducts.length ? (
        <TableContainer>
          <Table color={'web.text'} variant={'simple'} size={'sm'}>
            <Thead h={'6vh'}>
              <Tr>
                <Th color={'web.text2'}></Th>
                <Th color={'web.text2'}>
                  Product Name
                </Th>
                <Th color={'web.text2'} textAlign={'center'}>
                  Material
                </Th>
                <Th color={'web.text2'} textAlign={'center'}>
                  Type
                </Th>
                <Th color={'web.text2'} textAlign={'center'}>
                  Size
                </Th>
                <Th color={'web.text2'} textAlign={'center'}>
                  Thickness
                </Th>
                <Th color={'web.text2'} textAlign={'center'}>
                  Finish
                </Th>
                <Th color={'web.text2'} textAlign={'center'}>
                  Price
                </Th>
                <Th color={'web.text2'} textAlign={'center'}>
                  In Stock
                </Th>
                <Th color={'web.text2'} textAlign={'center'}>
                  Incoming
                </Th>
                <Th color={'web.text2'} textAlign={'center'}>
                  Next Arrival
                </Th>
                <Th color={'web.text2'}>
                  Discontinued
                </Th>
              </Tr>
            </Thead>
            <Tbody >
              {allProducts.slice(0, loadedCount).map((e, i) => {
                return <ModelTr key={i} e={e} user={user} allProducts={allProducts} loadedCount={loadedCount}/>;
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