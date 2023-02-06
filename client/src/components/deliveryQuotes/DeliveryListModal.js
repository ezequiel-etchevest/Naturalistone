import { 
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input, 
    IconButton,
    Text
    } from "@chakra-ui/react"
import PdfDelivery from "./DeliveryDetailPDf"
import DeliveriesList from "./DeliveriesList"
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from "react";

const DeliveryListModal = ({isOpen, onClose, invoice, user, deliveries}) => {
 
const id = invoice[0].Naturali_Invoice

//   const [quantities, setQuantities] = useState([])
  const [input, setInput] = useState([])
  
//   const handleSubmit = () => {
//     dispatch(postDeliveryNote(id, quantities))
//     onClose()
//   }
const handleSearchInput = (e) => {
  if(e.target.value.length){
    if(deliveries.length) {
      const filteredByID = deliveries.filter(delivery => delivery.DeliveryNumber.toString().includes(e.target.value))
       if(!filteredByID.length) return 
       setInput(filteredByID)
       console.log(filteredByID)
    }
  } else {
    setInput([])
  }
  
}
  return(

  <Modal 
  isOpen={isOpen} 
  onClose={onClose}
  size={'3xl'}
  >
    <ModalOverlay />
    <ModalContent 
      bg={'web.sideBar'}
      border={'1px solid'}
      borderColor={'web.border'}
      height={'82vh'}
      w={'62vw'}
      >
      <ModalHeader
      ml={'1vw'}
      mt={'3vh'}
      color={'web.text'}
      display={'flex'}
      flexDir={'row'}
      h={'8vh'}
      justifyContent={'space-between'}>
        <Text>Delivery notes submited to Invoice N° {`${id}`}</Text>
        <Box  ml={'2vw'} mr={'2vw'} mt={'3vh'} h={'4vh'}>
          <Input
            w={'8vw'}
            variant={"unstyled"}
            placeholder={'Delivery number'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
            size={"sm"}
            borderBottomWidth={"2px"}
            textColor={'web.text'}
            type={'number'}
            pattern={"[0-9]{10}"}
            borderBottomColor={'web.text2'}
            onChange={(e) => handleSearchInput(e)}
            />
          <IconButton
            borderRadius={2}
            aria-label={"Search database"}
            color={'web.text2'}
            bgColor={'web.sideBar'}
            ml={1}
            icon={<SearchIcon />}
            _hover={{
              color: 'logo.orange',
            }}
            _active={{ color: 'logo.orange'}}
          />
      </Box>
      </ModalHeader>
    <ModalCloseButton
      color={'web.text2'}
      _hover={{
        color: 'web.text'
      }} />
    <ModalBody color={'web.text2'} display={'flex'} justifyContent={'center'}>
      {/* <PdfDelivery/> */}
      <Box
        ml={'0.5vw'}
        mr={'0.5vw'}
        w={'58vw'}>
        <DeliveriesList id={id} user={user} deliveries={deliveries} input={input}/>
      </Box>
    </ModalBody>
      <ModalFooter mb={'1vh'} mr={'1vw'}>
        <Button
          colorScheme={'orange'} 
          mr={3} 
          // onClick={()=>handleSubmit()}
          >
         Confirm
        </Button>
        <Button variant='ghost' onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)}

export default DeliveryListModal
