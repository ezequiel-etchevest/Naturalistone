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
    Text,
    useDisclosure
    } from "@chakra-ui/react"
import DeliveryNotePdf from "./DeliveryPDf"
import DeliveriesList from "./DeliveriesList"
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from "react";


const DeliveryNotesListModal = ({isOpen, onClose, invoice, user, deliveries}) => {
 
const id = invoice[0].Naturali_Invoice

const [input, setInput] = useState([])
const [deliveryID, setDeliveryID]= useState('')

const { isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onClose: onSecondModalClose } = useDisclosure()


const handleSearchInput = (e) => {
  if(e.target.value.length){
    if(deliveries.length) {
      const filteredByID = deliveries.filter(delivery => delivery.DeliveryNumber.toString().includes(e.target.value))
       if(!filteredByID.length) return 
       setInput(filteredByID)

    }
  } else {
    setInput([])
  }
}

  return(
<>
  {/* Start Render delivery notes list modal */}
  <Modal 
    isOpen={isOpen} 
    onClose={onClose}
    size={'xl'}
    >
    <ModalOverlay />
    <ModalContent 
      bg={'web.sideBar'}
      border={'1px solid'}
      borderColor={'web.border'}
      height={'80vh'}
      >
      <ModalHeader
      color={'web.text'}
      display={'flex'}
      flexDir={'column'}
      h={'12vh'}>
        <Text mt={'1vh'} ml={'1vw'}>Delivery notes submited to Invoice N° {`${id}`}</Text>
        <Box display={'flex'} mt={'0.5vh'} mb={'1.5vh'} justifyContent={'flex-end'}>
          <Input
            w={'8vw'}
            mt={'1vh'} mb={'2vh'}
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
        <DeliveriesList id={id} user={user} deliveries={deliveries} input={input} onSecondModalOpen={onSecondModalOpen} setDeliveryID={setDeliveryID}/>
    </ModalBody>
      <ModalFooter mb={'1vh'}>
        <Button
          colorScheme={'orange'} 
          mr={3} 
          onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  {/* Finish Render delivery notes list modal */}

  {/* Start Render selected delivery modal */}
  <Modal 
    isOpen={isSecondModalOpen} 
    onClose={onSecondModalClose}
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
        <DeliveryNotePdf/>
        {/* idDeliveryNote={idDeliveryNote} */}
      </ModalBody>
      <ModalFooter/>
    </ModalContent>
  </Modal>
  {/* Finish Render selected delivery modal */}
</>
)}

export default DeliveryNotesListModal
