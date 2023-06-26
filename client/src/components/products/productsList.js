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
  Center,
  Button
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/actions-products';
import { useEffect, useState } from 'react';
import{ ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { patchDiscontinued } from '../../redux/actions-products';
import '../../assets/styleImgs.css';
import { getProductImage } from '../../redux/actions-products';


const ModelTr = ({e, user, allProducts, loadedCount}) => {


const a = e.Discontinued_Flag === 'True' ? true : false 
const [flag, setFlag] = useState(a)
const productImage = useSelector(state => state.product_image);
const navigate = useNavigate()
const dispatch = useDispatch()


const handleClickProduct = () => {
  dispatch(getProductById(e.ProdID))
  if(e.ProdID !== undefined)
  navigate(`/products/${e.ProdID}`)
  }
const handleClickSwitch = () => {
  setFlag(flag === true ? false : true)
  dispatch(patchDiscontinued(e.ProdID, flag))
  }

  // useEffect(() => {
  //   if (!productImage[name]) {
  //     dispatch(getProductImage(e.ProductName, e.Material, e.ProdID));
  //   }
  // }, [allProducts, loadedCount]);

  const material = e.Material.replace(/\+/g, '+')
  const name = e.ProductName.replace(/\+/g, '+')
  const urlImg = `https://naturalistone-images.s3.amazonaws.com/${material}/${name}/${name}_0.jpg`

  return(
  <Tr       
  cursor={'pointer'} 
  key={e.ProdNameID}
  _hover={{
    bg: 'web.navBar',
    color: 'logo.orange'
  }} 
  >
    {
      urlImg ? (
        <Td maxH={'3vh'} minH={'3vh'} h={'3vh'} w={'4vw'} onClick={() => handleClickProduct()} fontSize={'xs'} textAlign={'match-parent'}>
        <div className="image-container" >
          <img src={urlImg} className="enlarge-image" alt="" />
        </div>
      </Td>
      ) : (
         <Td maxH={'3vh'} minH={'3vh'} h={'3vh'} w={'4vw'} onClick={() => handleClickProduct()} fontSize={'xs'} textAlign={'match-parent'}>
       <div className="image-container" >
        </div>
      </Td>
      )}
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

const ProductList = ({ allProducts, user, currentPage, setCurrentPage, filters }) => {

const productErrors = useSelector((state) => state.products_errors);
const toast = useToast();
const toastId = 'error_products'
const [productsPerPage] = useState(20);
const navigate = useNavigate()
const searchParams = new URLSearchParams()
const location = useLocation()
const queryString = location.search;
const url = new URLSearchParams(queryString);
const getParamsFinish = url.get('finish')
const getParamsSize = url.get('size')
const getParamsThickness = url.get('thickness')
const getParamsMaterial = url.get('material')
const getParamsSearch = url.get('search')
const getParamsPriceMin = url.get('priceMin')
const getParamsPriceMax = url.get('priceMax')

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

const totalPages = Math.ceil(allProducts.length / productsPerPage);

const handleNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage((prevPage) => prevPage + 1);
  }
  searchParams.set('size', getParamsSize ?? '')
  searchParams.set('finish', getParamsFinish ?? '')
  searchParams.set('thickness', getParamsThickness ?? '')
  searchParams.set('material', getParamsMaterial ?? '')
  searchParams.set('search', getParamsSearch ?? '')
  searchParams.set('page', currentPage + 1)
  navigate(`?${searchParams.toString()}`)
};

const handlePrevPage = () => {
  if (currentPage > 1) {
    setCurrentPage((prevPage) => prevPage - 1);
  }
  searchParams.set('size', getParamsSize ?? '')
  searchParams.set('finish', getParamsFinish ?? '')
  searchParams.set('thickness', getParamsThickness ?? '')
  searchParams.set('material', getParamsMaterial ?? '')
  searchParams.set('search', getParamsSearch ?? '')
  searchParams.set('page', currentPage - 1)
  navigate(`?${searchParams.toString()}`)
};

useEffect(() => {
  validateToast();
}, [allProducts]);

const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);


return (
  <Box userSelect={'none'} display={'flex'} justifyContent={'center'} h={'69vh'} w={'82.8vw'} ml={'1vh'}>
    <Box
      maxHeight={'60vh'}
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
            <Tbody>
                {currentProducts.map((e, i) => {
                  return <ModelTr key={i} e={e} user={user} />;
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
          <Box mt={4} display="flex" justifyContent="center">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            variant="outline"
            _hover={{
              color: 'logo.orange',
              fontWeight: 'normal'
              }}
            color={'web.text2'}
            borderColor={'none'}
            mr={2}
            _active={'none'}
          >
            Back
          </Button>
          <Box
          p={'8px'}>
            <Text color={'web.text2'}> Page: {currentPage}</Text>
          </Box>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            variant="outline"
            _hover={{
              color: 'logo.orange',
              fontWeight: 'normal'
              }}
            color={'web.text2'}
            borderColor={'none'}
            _active={'none'}
          >
            Next
          </Button>
        </Box>
    </Box>
  </Box>
);
};

export default ProductList;