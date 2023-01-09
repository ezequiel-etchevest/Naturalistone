import React from "react";
import { Box, Text } from "@chakra-ui/react";

const ProductNotes = () => {
    return (
        <>
         <Box
          ml={'1vw'}
          px={'1.5vw'}
          py={'2vh'}
          h={'30vh'}
          w={'37.5vw'}
          display={'flex'}
          flexDir={'column'}
          color={'web.text'}
          bg={'web.sideBar'}
          border={'1px solid'} 
          rounded={'md'} 
          borderColor={'web.border'}
          >
          <Text color={'web.text2'} fontSize={'2.2vh'}>Notes</Text>
        </Box>
        </>
    )
}

export default ProductNotes