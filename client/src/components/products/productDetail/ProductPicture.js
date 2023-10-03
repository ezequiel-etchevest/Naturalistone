import React from "react";
import { Box } from "@chakra-ui/react";
import CarouselProduct from "./miniCarousel";
import { useEffect } from "react";
import { getProductImages } from "../../../redux/actions-products";
import { useDispatch } from "react-redux";

const ProductPicture = ({product}) => {

  const dispatch = useDispatch()

  useEffect(() => {
    if (Object.entries(product).length) {
      dispatch(getProductImages(product.ProductName, product.Material));
    }
  }, [product.ProductName, product.Material, dispatch]);
  
  return (
    <>
      <Box
          px={'1.5vw'}
          py={'2vh'}
          h={'30vh'}
          w={'38vw'}
          display={'flex'}
          flexDir={'column'}
          color={'web.text'}
          bg={'web.sideBar'}
          border={'1px solid'} 
          rounded={'md'} 
          borderColor={'web.border'}
          >
            <CarouselProduct product={product}/>
        </Box>
      </>
    )
}

export default ProductPicture