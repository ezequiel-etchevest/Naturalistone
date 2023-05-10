import React from "react";
import { Box } from "@chakra-ui/react";
import CarouselProduct from "./miniCarousel";

const ProductPicture = () => {
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