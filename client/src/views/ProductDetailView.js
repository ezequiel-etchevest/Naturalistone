import React, { useEffect } from "react";
import SideBar from "../components/sideBar";
import { Text, Center, Spinner} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployeeById } from "../redux/actions-employees";
import { cleanProductById, getProductById, getHistoryPrices, getProductImages, cleanProductDetail } from '../redux/actions-products';
import { useParams } from "react-router-dom";
import ProductDetail from '../components/products/productDetail/prodDetail';


const ProductDetailView = ({focus, setFocus}) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const product = useSelector(state => state.product_by_id)
  const history_prices = useSelector(state => state.history_prices)
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const { id } = useParams()
  
  useEffect(() => {
    if (!Object.entries(product).length) dispatch(getProductById(id));
    if (!history_prices.length) dispatch(getHistoryPrices(id));
    
    return () => {
      dispatch(cleanProductDetail());
    };
  }, []);
  

  useEffect(() => {
    if (userLocal && !user.length) {
      dispatch(getEmployeeById(userLocal.SellerID));
    }
  }, [user]);

    if(userLocal) {
      if(user.length){
        return(
          <>
            <SideBar user={user} focus={focus} setFocus={setFocus}/>
            {
              Object.entries(product).length ? (
              <ProductDetail product={product} history_prices={history_prices} user={userLocal}/>
              ) : (
              <Center ml={'16vh'} bg={'web.bg'} h={'92vh'}>
               <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
              </Center>)
            }
          </>
        ) 
    }else return (     
      <Center bg={'web.bg'} h={'92vh'}>
        <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
      </Center>)
      }  
    }
  
 


export default ProductDetailView