import React from "react";
import { Box } from "@chakra-ui/react";
import CarouselProduct from "./miniCarousel";
import Carousel from "./carousel";
import { useEffect } from "react";
import { getProductImages } from "../../redux/actions-products";
import { useDispatch } from "react-redux";

const ProductPicture = ({product}) => {

  const dispatch = useDispatch()
  console.log(product)
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
            <CarouselProduct/>
        </Box>
      </>
    )
}

export default ProductPicture