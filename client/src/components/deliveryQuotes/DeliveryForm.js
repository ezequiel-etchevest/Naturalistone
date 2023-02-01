
import { 
  Button, 
  ButtonGroup, 
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast
  } from "@chakra-ui/react"
// import { useState } from "react";
// import { useParams } from 'react-router-dom';
// import { useDispatch } from "react-redux";
import DeliveryProductList from "./DeliveryProductsTable"
import '../../assets/styleSheet.css'



const DeliveryForm = ({user, invoice, invoice_products, setQuantities, quantities}) => {

  return(
<>
  <FormControl
    ml={'0.5vw'}
    mr={'0.5vw'}
    w={'58vw'}
    >
    <DeliveryProductList invoice_products={invoice_products} setQuantities={setQuantities} quantities={quantities}/>
  </FormControl>
      {/* { error ? 
        (<FormErrorMessage>{error}</FormErrorMessage>)
        :
        (null)
      } */}
</>
  )
}

export default DeliveryForm