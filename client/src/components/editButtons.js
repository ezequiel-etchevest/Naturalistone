import { HStack, Text, Button } from "@chakra-ui/react";
import { MdOutlinePayments, MdOutlineLocalShipping } from 'react-icons/md';
import { useDisclosure } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

const EditButtons = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const handleClick = () =>{
        
    }

    return (
        <>
        <HStack mb={'2vh'} spacing={'2vw'}>
        <Button
        onClick={onOpen}
        variant={'unstyled'} 
        display={'flex'} 
        w={'17vw'}
        h={'10vh'}
        borderRadius={'sm'} 
        placeContent={'center'}
        alignItems={'center'}
        color={'gray.700'}
        _hover={{
            color: '#E47424'
            }}
        _active={{
          color: '#E47424'
        }}>
          <Text 
            pr={'1.5vh'} 
            fontFamily={'body'} 
            fontWeight={'hairline'} 
            >Edit Payment Method</Text>
            <MdOutlinePayments/>
        </Button>
        <Modal>
          <Text>Please enter the payment method</Text>
        </Modal>
        <Button
         variant={'unstyled'} 
         display={'flex'} 
         w={'17vw'}
         h={'10vh'}
         borderRadius={'sm'} 
         placeContent={'center'}
         alignItems={'center'}
         color={'gray.700'}
         _hover={{
             color: '#E47424'
             }}
         _active={{
           color: '#E47424'
         }}>
            <Text 
            fontFamily={'body'} 
            fontWeight={'hairline'}  
            pr={'1.5vh'}>Edit Shipping Method</Text>
            <MdOutlineLocalShipping/>
        </Button>
       
        </HStack>
        </>
    )
}

export default EditButtons