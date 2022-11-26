
import { 
    Button, 
    ButtonGroup, 
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Select,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputStepper,
    NumberInputField 
    } from "@chakra-ui/react"
import { SiAddthis } from 'react-icons/si';
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { patchPaymentMethod } from "../../redux/actions-payments";



const AddPayment = ({pendingAmount}) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ disabled, setDisabled ] = useState(true)
    const [input, setInput] = useState({
      Method : '',
      Amount: ''})

    const handleCancel = () =>{
      onClose()
    }

    const handleSelect = (e) =>{
      if(e.target.value == 'Cash'|| e.target.value == 'Card'|| e.target.value == 'Wire transfer' || e.target.value == 'Check'){
         setInput({
          ...input,
          Method : e.target.value
         })}
      if(input.Method !== '' && input.Amount !== ''){
        setDisabled(false)
      }
      }
    const handleInput = (e) => {
      setInput({
        ...input,
        Amount : e
       })
       if(input.Method !== '' && input.Amount !== ''){
        setDisabled(false)
      }
      }

    const handleSubmit = () => {

        if(input.Method !== ''){
          
        dispatch(patchPaymentMethod(id, input))
        setInput({
          Method : '',
          Amount: '' })
        onClose()}
      }
    
    
    return(
        <>
          <ButtonGroup 
            variant={'unstyled'} 
            color={'web.text2'}
            _hover={{
              color: 'logo.orange'
            }}>
            <Button 
              mr={'1vh'} 
              pb={'0.5vh'} 
              alignSelf={'center'} 
              fontWeight={'normal'}
              onClick={onOpen}
              >Add payment</Button>
              <IconButton
                icon={<SiAddthis/>} 
                size={'lg'}
                />
          </ButtonGroup>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
              <ModalHeader>
                Add payment
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
              <FormControl  isRequired>
                <FormLabel>
                  Select payment method
                </FormLabel>
                <Select placeholder='Select Option' onChange={(e)=>handleSelect(e)}>
                  <option value='Check'>Check</option>
                  <option value='Card'>Card</option>
                  <option value='Cash'>Cash</option>
                  <option value='Wire transfer'>Wire Transfer</option>
                </Select>
                </FormControl>
                <FormControl  isRequired>
               
                  <FormLabel>Amount</FormLabel>
                  <NumberInput
                    onChange={(e)=>handleInput(e)} 
                    step={100} 
                    defaultValue={0} 
                    min={100} 
                    max={pendingAmount} 
                    precision={2}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={disabled} 
                  colorScheme={'orange'} 
                  mr={3} 
                  onClick={()=>handleSubmit()}>
                  Submit
                </Button>
                <Button variant='ghost' onClick={()=> handleCancel()}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
    )
}

export default AddPayment