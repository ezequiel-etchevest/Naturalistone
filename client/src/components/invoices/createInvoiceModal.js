import { 
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Text,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Tooltip,
    Box,
    useToast
    } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../assets/styleSheet.css'


const CreateInvoiceModal = ({userId, isOpen, onClose}) => {
 
  const { isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onClose: onSecondModalClose } = useDisclosure()

//   const dispatch = useDispatch()
  const id = userId


  return(
<>
{/* Start Create delivery modal */}
  <Modal 
    isOpen={isOpen} 
    // onClose={handleFirstModalClose}
    size={'6xl'}
    >
    <ModalOverlay />
    <ModalContent 
      bg={'web.sideBar'}
      border={'1px solid'}
      borderColor={'web.border'}
      height={'80vh'}
      w={'66vw'}
      >
      <ModalHeader
      ml={'1vw'}
      mt={'3vh'}
      color={'web.text'}>
        Create delivery note for Invoice N°
      </ModalHeader>
      <ModalCloseButton
        color={'web.text2'}
        _hover={{
          color: 'web.text'
        }} />
      <ModalBody color={'web.text2'} display={'flex'} justifyContent={'center'}>
        {/* <DeliveryProductList 
        invoice_products={invoice_products} 
        setQuantities={setQuantities}
        quantities={quantities}
        errors={errors} 
        setErrors={setErrors}
        deliveryID={deliveryID}/> */}
      </ModalBody>
      <ModalFooter mb={'1vh'} mr={'1vw'} ml={'2vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
        <Text 
          color={'red.500'}
          fontSize={'2vh'} 
          fontWeight={'semibold'}
        //   visibility={deliveryID_error ? 'visible' : 'hidden'}
          >
            *  Registered payments not enough to cover this delivery note </Text>
        <Box display={'flex'} flexDir={'row'}>
        <Button
          colorScheme={'orange'} 
          mr={3} 
        //   onClick={()=>handleSubmit()}
        //   disabled={disabledConfirm}
          >
         Submit
        </Button>
        </Box>
      </ModalFooter>
    </ModalContent>
  </Modal>
{/* Finish Create delivery modal */}

{/* Start Render created delivery modal */}
  <Modal 
        // isOpen={isSecondModalOpen} 
    // onClose={handleSecondModalClose}
    size={'4xl'}
    >
    <ModalOverlay />
    <ModalContent 
      rounded={'md'} 
      mt={'2vh'} 
      mb={'2vh'} 
      w={'64vw'} 
      bg={'web.sideBar'} 
      border={'1px solid'} 
      borderColor={'web.border'}
      >
      <ModalHeader/>
      <ModalBody color={'web.text2'} w={'100%'} h={'100%'}>
        {/* <CreateDeliveryNotePdf quantities={quantities} deliveryID={deliveryID} id={id}/> */}
      </ModalBody>
      <ModalFooter/>
    </ModalContent>
  </Modal>
{/* Finish Render created delivery modal */}
</>
)}

export default CreateInvoiceModal