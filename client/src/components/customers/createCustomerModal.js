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
    IconButton,
    HStack,
    Tooltip,
    Box,
    useToast
    } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {IoPersonAddOutline} from 'react-icons/io5'
import '../../assets/styleSheet.css'


const CreateCustomerModal = ({userId, isOpen, onClose}) => {
 
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
      color={'web.text'}
      display={'flex'}
      w={'60vw'}
      >
        Select customer
        <IconButton
          variant='outline'
          bgColor={'orange.500'}
          colorScheme={'white'}
          ml={'3vw'}
          icon={<IoPersonAddOutline />}
        />
      </ModalHeader>
      <ModalCloseButton
        color={'web.text2'}
        _hover={{
          color: 'web.text'
        }} />
      <ModalBody color={'web.text2'} display={'flex'} justifyContent={'center'} border={'2px solid red'}>
      </ModalBody>
      <ModalFooter mb={'2vh'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} ml={'2vw'} mr={'2vw'}>
        <Button
          colorScheme={'orange'}
          size={'sm'}
        //   onClick={()=>handleSubmit()}
        //   disabled={disabledConfirm}
          >
         Previous
        </Button>
        <Button
          colorScheme={'orange'}
          size={'sm'} 
        //   onClick={()=>handleSubmit()}
        //   disabled={disabledConfirm}
          >
         Next
        </Button>
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

export default CreateCustomerModal