import { HStack, Text, Button, Select, Box, VStack } from "@chakra-ui/react";
import { MdOutlinePayments, MdOutlinePrint } from 'react-icons/md';
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
import { patchPaymentMethod } from "../redux/actions";
import { useDispatch } from "react-redux";
import { Signature } from "./signaturePad";

const EditButtons = ({invoice}) => {

    const [imgURL, setImgURL ] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [input, setInput] = useState({PaymentMethod : []})
    const dispatch = useDispatch()
    
    const handleSelect = (e) =>{
      if(e.target.value == 'Cash'|| e.target.value == 'Card'|| e.target.value == 'Wire transfer' || e.target.value == 'Check'){
        if(!input.PaymentMethod.includes(e.target.value)){
         setInput({
          ...input,
          PaymentMethod : [...input.PaymentMethod, e.target.value]
         })}
      }
    }
    const handleDelete = (e) =>{
      setInput({
        ...input,
        PaymentMethod: input.PaymentMethod.filter( m => {
          return m !== e.target.value
        })
      })
    }
  const handleSubmit = () => {
    if(invoice &&  imgURL ){
    dispatch(patchPaymentMethod(invoice[0].Naturali_Invoice, input))
    setInput({PaymentMethod : []})
    onClose()}
  }
  
  const handleCancel = () =>{
    setInput({PaymentMethod : []})
    onClose()
  }
    return (
        <>
        <VStack ml={'4vw'} mb={'20vh'} spacing={'2vw'} align={'flex-start'}>
        <Button
        rounded={'md'}
        bg={'gray.200'}
        shadow={'md'}
        onClick={onOpen}
        variant={'unstyled'} 
        display={'flex'} 
        w={'19vw'}
        h={'6vh'}
        borderRadius={'sm'} 
        placeContent={'center'}
        alignItems={'center'}
        color={'gray.700'}
        _hover={{
            color: 'white',
            bg: '#E47424'
            }}
        _active={{
          color: '#E47424'
        }}>
          <Text 
            pr={'1.5vh'} 
            fontFamily={'body'} 
            fontWeight={'hairline'} 
            >Declare Payment</Text>
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
            <Select placeholder='Select Option' onChange={(e)=>handleSelect(e)}>
              <option value='Check'>Check</option>
              <option value='Card'>Card</option>
              <option value='Cash'>Cash</option>
              <option value='Wire transfer'>Wire Transfer</option>
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
          <Signature imgURL={imgURL} setImgURL={setImgURL}/>
          <ModalFooter>
            <Button colorScheme={'orange'} mr={3} onClick={()=>{handleSubmit()}}>
              Submit
            </Button>
            <Button variant='ghost' onClick={()=> handleCancel()}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button
        rounded={'md'}
        bg={'gray.200'}
        shadow={'md'}
        variant={'unstyled'} 
        display={'flex'} 
        w={'19vw'}
        h={'6vh'}
        borderRadius={'sm'} 
        color={'gray.700'}
        _hover={{
            color: 'white',
            bg: '#E47424'
            }}
        _active={{
          color: '#E47424'
        }}>          
        <Text 
        pr={'1.5vh'} 
        fontFamily={'body'} 
        fontWeight={'hairline'} 
        >Print</Text>
        <MdOutlinePrint/></Button>      
        </VStack>
        </>
    )
}

export default EditButtons