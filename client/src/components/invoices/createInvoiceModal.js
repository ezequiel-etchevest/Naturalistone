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
import { getFiltered } from "../../redux/actions-products";
import CreateInvoiceProductsList from "./createInvoiceProductsList";


const CreateInvoiceModal = ({ isOpen, onClose, customer, project, onQuotesModalClose, isQuotesModalOpen}) => {
 
  // const { isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onClose: onSecondModalClose } = useDisclosure()

const dispatch = useDispatch()
const allProducts = useSelector(state => state.all_products)

useEffect(()=>{
  if(!allProducts?.length ) dispatch(getFiltered('','','','','','',''))
  },[allProducts])


  const handlePrevious = () => {
    onQuotesModalClose()
  }

  return(
<>
  <Modal 
    isOpen={isQuotesModalOpen} 
    onClose={onQuotesModalClose}
    size={'5xl'}
    >
    <ModalOverlay />
    <ModalContent 
      bg={'web.sideBar'}
      border={'1px solid'}
      borderColor={'web.border'}
      >
      <ModalHeader></ModalHeader>
      <ModalCloseButton
        color={'web.text2'}
        _hover={{
          color: 'web.text'
        }}
        onClick={onClose} 
      />
      <Box color={'white'}>
        <Text ml={'3vw'} fontSize={'lg'}>Create quote</Text>
        <ModalBody color={'web.text2'} display={'flex'} justifyContent={'center'} flexDir={'column'} h={'58vh'}>
          <CreateInvoiceProductsList allProducts={allProducts}/>
        </ModalBody>
      </Box>  
        <ModalFooter mb={'2vh'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} ml={'2vw'} mr={'2vw'}>
        <Button
          colorScheme={'orange'}
          size={'sm'}
          onClick={()=>handlePrevious()}
          >
         Previous
        </Button>
        <Button
          colorScheme={'orange'}
          size={'sm'}
          // onClick={()=>handleNext()} 
          >
         Next
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
</>
)}

export default CreateInvoiceModal