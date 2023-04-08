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
    Box
    } from "@chakra-ui/react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDeliveryNote, cleanStateDeliveryNoteFail } from "../../redux/actions-deliveryNotes";
import CreateDeliveryNotePdf from "./CreateDeliveryNotePdf"
import DeliveryProductList from "./DeliveryProductsTable"
import '../../assets/styleSheet.css'
import { getInvoiceProducts } from "../../redux/actions-invoices";


const CreateDeliveryModal = ({invoice, user, isOpen, onClose, invoice_products}) => {
 
  const { isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onClose: onSecondModalClose } = useDisclosure()

  const dispatch = useDispatch()
  const id = invoice[0].Naturali_Invoice

  const handleQuantities = () => {
   
    return(
      invoice_products?.map(p => {
        return {      
          quantity: p.InStock_Reserved,
          prodID:p.ProdID,
          prodName: p.ProductName ? p.ProductName : '-' ,
          type: p.Type,
          size:p.Size,
          thickness:p.Thickness,
          finish:p.Finish,
          InStock_Reserved: p.InStock_Reserved,
          SalePrice: p.SalePrice,
          delivered: p.Delivered 
        }
      }))
    }

  const [quantities, setQuantities] = useState(handleQuantities)
  const [disabledConfirm, setDisabledConfirm] = useState(false)
  const [errors, setErrors] = useState([])
  
  const deliveryID = useSelector(state => state.deliveryID)
  let deliveryID_error = useSelector(state => state.deliveryID_error)

  const handleSubmit = async () => {
      await dispatch(postDeliveryNote(id, quantities))
      dispatch(getInvoiceProducts(id))
  }

  const handleSecondModalClose = () => {
    handleClear()
    onSecondModalClose()
    onClose()
  }

  const handleFirstModalClose = () => {
    handleClear()
    onClose()
  }

  const handleClear = () => {
    setErrors([])
    setQuantities(handleQuantities)

    dispatch(cleanStateDeliveryNoteFail()) //clean the error message
    dispatch(getInvoiceProducts(id))  //get products again in order to update quantities
  }

  const handleViewPdf = () => {
    onSecondModalOpen()
  }


  return(
<>
{/* Start Create delivery modal */}
  <Modal 
    isOpen={isOpen} 
    onClose={handleFirstModalClose}
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
        Create delivery note for Invoice N° {`${invoice[0].Naturali_Invoice}`}
      </ModalHeader>
      <ModalCloseButton
        color={'web.text2'}
        _hover={{
          color: 'web.text'
        }} />
      <ModalBody color={'web.text2'} display={'flex'} justifyContent={'center'}>
        <DeliveryProductList 
        invoice_products={invoice_products} 
        setQuantities={setQuantities}
        quantities={quantities}
        errors={errors} 
        setErrors={setErrors}
        setDisabledConfirm={setDisabledConfirm}/>
      </ModalBody>
      <ModalFooter mb={'1vh'} mr={'1vw'} ml={'2vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
        <Text 
          color={'red.500'}
          fontSize={'2vh'} 
          fontWeight={'semibold'}
          visibility={deliveryID_error ? 'visible' : 'hidden'}
          >
            *  Registered payments not enough to cover this delivery note </Text>
        <Box display={'flex'} flexDir={'row'}>
        <Button
          colorScheme={'orange'} 
          mr={3} 
          onClick={()=>handleSubmit()}
          disabled={disabledConfirm}
          >
         Submit
        </Button>
        <Button
          colorScheme={'orange'} 
          onClick={()=>handleViewPdf()}
          disabled={deliveryID_error === '' || deliveryID_error === true ? true : false}
          > 
            <Tooltip 
            label="Delivery note not submited yet" 
            aria-label='A tooltip'
            fontWeight={'hairline'} 
            placement='top'
            mb={'2vh'}
            mr={'3vw'}
            isDisabled={deliveryID_error === '' || deliveryID_error === true ? false : true}
            >
            View PDF
          </Tooltip>
        </Button>
        </Box>
      </ModalFooter>
    </ModalContent>
  </Modal>
{/* Finish Create delivery modal */}

{/* Start Render created delivery modal */}
  <Modal 
    isOpen={isSecondModalOpen} 
    onClose={handleSecondModalClose}
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
        <CreateDeliveryNotePdf quantities={quantities} deliveryID={deliveryID} id={id}/>
      </ModalBody>
      <ModalFooter/>
    </ModalContent>
  </Modal>
{/* Finish Render created delivery modal */}
</>
)}

export default CreateDeliveryModal