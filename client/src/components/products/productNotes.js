import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { updateProductNotes } from "../../redux/actions-products";
import EditableInputNotes from "./editableInput";

const ProductNotes = ({product}) => {
    return (
        <>
         <Box
          ml={'1vw'}
          px={'1.5vw'}
          py={'2vh'}
          h={'30vh'}
          w={'18vw'}
          display={'flex'}
          flexDir={'column'}
          color={'web.text'}
          bg={'web.sideBar'}
          border={'1px solid'} 
          rounded={'md'} 
          borderColor={'web.border'}
          >
          <Text color={'web.text2'} fontSize={'2.2vh'}>Notes</Text>
          <EditableInputNotes/>
        </Box>
        </>
    )
}

export default ProductNotes