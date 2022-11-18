import { HStack, Text, Button, Select, Box } from "@chakra-ui/react";
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
  } from '@chakra-ui/react';
  import { useState } from "react";
import { patchPaymentMEthod } from "../redux/actions";
import { useDispatch } from "react-redux";

const EditButtons = ({invoice}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [input, setInput] = useState({PaymentMethod : []})
    const dispatch = useDispatch()
    
    const handleSelect = (e) =>{
      if(!input.PaymentMethod.includes(e.target.value)){
       setInput({
        ...input,
        PaymentMethod : [...input.PaymentMethod, e.target.value]
       })}
    }
    const handleDelete = (e) =>{
      setInput({
        ...input,
        PaymentMethod: input.PaymentMethod.filter( m => {
          return m !== e.target.value
        })
      })
    }
    console.log(invoice)
  const handleSubmit = () => {
    if(invoice){
    dispatch(patchPaymentMEthod(invoice[0].Naturali_Invoice, input))
    setInput({PaymentMethod : []})
    onClose()}

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
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Payment Method</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Please select payment method:
            </Text>
            <Select placeholder='Select option' onChange={(e)=>handleSelect(e)}>
              <option value='Check'>Check</option>
              <option value='Cash'>Cash</option>
              <option value='Wire transfer'>Wire transfer</option>
            </Select>
            {
              input.PaymentMethod.map((m, i) => {
                return(
                <Box m={'1vw'} key={i} display={'flex'} flexDir={'row'} bg={'whitesmoke'} w={'6vw'}justifyContent={'space-between'} alignContent={'center'} >
                <Text>{m}</Text>
                <Button bg={'none'} size={'xs'} value={m} onClick={(e)=>{handleDelete(e)}}>x</Button>
                </Box>
                )
              })
            }
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>{handleSubmit()}}>
              Submit
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
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