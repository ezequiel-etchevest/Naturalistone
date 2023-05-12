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
    Box,
    Input,
    IconButton,
    useToast,
    useDisclosure
    } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateInvoiceProductsList from "./createInvoiceProductsList";
import ReviewProductsModal from "./createInvoiceProductsReview";
import { getFiltered } from "../../../redux/actions-products";
import {BiSearch} from 'react-icons/bi'
import '../../../assets/styleSheet.css'

const CreateInvoiceModal = ({variables, isOpen, onClose, customer, project, onQuotesModalClose, isQuotesModalOpen, onQuotesModalOpen, onProjectModalClose}) => {
 
const dispatch = useDispatch()
const toast = useToast()
const allProducts = useSelector(state => state.all_products)
const productErrors = useSelector((state) => state.products_errors)

const { isOpen: isReviewModalOpen, onOpen: onReviewModalOpen, onClose: onReviewModalClose } = useDisclosure()

const [products, setProducts] = useState([])

const validateToast = () => {
  if(Object.entries(productErrors).length){
    toast({        
      title: `${productErrors.error}`,
      status: 'warning',
      duration: 1500,
      isClosable: true,})
  }
}

useEffect(()=>{
  if(!allProducts?.length ) dispatch(getFiltered('','','','','','',''))
  validateToast()
  },[allProducts])

  // const handleChangeProductName = (e) => {
  //   dispatch(getFiltered('', '', '', '', e.target.value, '',''))
  // }

  const handlePrevious = () => {
    onQuotesModalClose()
    dispatch(getFiltered('','','','','','',''))
    setProducts([])
  }

  const handleNext = () => {
    onReviewModalOpen()
    onQuotesModalClose()
  }

  return(
<>
  <Modal 
    isOpen={isQuotesModalOpen} 
    onClose={onQuotesModalClose}
    size={'4xl'}
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
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            h={'6vh'}
            mb={'2vh'}
            mr={'1.2vw'}
            spacing={'0.5vw'}>
            <Input
              mb={'0.5vh'}
              w={'10vw'}
              minH={'4.5vh'}
              variant="unstyled"
              placeholder={'Product name'}
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              // onChange={(e) => handleChangeProductName(e)}
              />
            <IconButton
              color={'web.text2'}
              borderRadius={2}
              aria-label="Search database"
              bgColor={'web.sideBar'}
              ml={'-0.5vw'}
              icon={<BiSearch />}
              size={'lg'}
              _hover={{
                color: 'orange.500',
              }}
              _active={{ color: 'gray.800'}}
            />
          </Box>
          <CreateInvoiceProductsList allProducts={allProducts} products={products} setProducts={setProducts}/>
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
          onClick={()=>handleNext()} 
          >
         Next
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  <ReviewProductsModal variables={variables} isReviewModalOpen={isReviewModalOpen} onQuotesModalOpen={onQuotesModalOpen} onReviewModalClose={onReviewModalClose} products={products} setProducts={setProducts} customer={customer} project={project} onProjectModalClose={onProjectModalClose}/>
</>
)}

export default CreateInvoiceModal