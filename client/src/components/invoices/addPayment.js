
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
    Select,
    useDisclosure,
    FormControl,
    FormLabel,
    NumberInput,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputStepper,
    NumberInputField, 
    FormErrorMessage
    } from "@chakra-ui/react"
import { SiAddthis } from 'react-icons/si';
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { patchPaymentMethod } from "../../redux/actions-payments";
import '../../assets/styleSheet.css'



const AddPayment = ({pendingAmount}) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ disabled, setDisabled ] = useState(true)
    const [input, setInput] = useState({
      Method : '',
      Amount: ''})
    const [error, setError] = useState('')

    const handleCancel = () =>{
      setDisabled(true)
      onClose()
    }
    const handleSelect = (e) =>{
      if(e.target.value === 'Cash'|| e.target.value ==='Card'|| e.target.value === 'Wire transfer' || e.target.value === 'Check'){
         setInput({
          ...input,
          Method : e.target.value
         })}
      if(input.Method !== '' && input.Amount !== ''){
        setDisabled(false)
      }
      if(input.Method === ''){
        setDisabled(true)
      }
      if(input.Amount === ''){
        setDisabled(true)
      }
    }
    const handleInput = (e) => {
      setInput({
        ...input,
        Amount : e
       })
       if(input.Method !== '' && input.Amount !== '' ){
        setDisabled(false)
      }
      if(input.Method === ''){
        setDisabled(true)
      }
      if(input.Amount === ''){
        setDisabled(true)
      }
    }
    const handleSubmit = () => {
        if(input.Method !== '' && input.Amount > 0){ 
        dispatch(patchPaymentMethod(id, input))
        setInput({
          Method : '',
          Amount: '' })
        onClose()
        setDisabled(true)}
        else{
          setError('Please complete both fields')
        }
    }
    
    
    return(
        <>
          <ButtonGroup
            variant={'unstyled'} 
            color={'web.text2'}
            onClick={onOpen}
            _hover={{
              color: 'logo.orange'
            }}>
            <Button
              mr={'1vh'} 
              pb={'0.5vh'} 
              alignSelf={'center'} 
              fontWeight={'normal'}
             
              >Add payment</Button>
              <IconButton
                icon={<SiAddthis/>} 
                size={'lg'}
                />
          </ButtonGroup>
          <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            >
            <ModalOverlay/>
            <ModalContent 
              bg={'web.sideBar'}
              border={'1px solid'}
              borderColor={'web.border'}
              >
              <ModalHeader
              color={'web.text'}>
                Add payment
              </ModalHeader>
              <ModalCloseButton
                color={'web.text2'}
                _hover={{
                  color: 'web.text'
                }} />
              <ModalBody>
              <FormControl  isRequired>
                <FormLabel color={'web.text'}>
                  Select payment method
                </FormLabel>
                <Select
                  _focus={{
                    borderColor: 'logo.orange',
                    boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
                  }}
                  borderColor={'web.border'} 
                  color={'web.text2'} 
                  placeholder='Select Option' 
                  onChange={(e)=>handleSelect(e)}>
                  <option value='Check' className="options" >Check</option>
                  <option value='Card' className="options" >Card</option>
                  <option value='Cash' className="options" >Cash</option>
                  <option value='Wire transfer' className="options" >Wire Transfer</option>
                </Select>
                </FormControl>
                <FormControl mt={'2vh'}  isRequired>
                  <FormLabel color={'web.text'}>Amount</FormLabel>
                  <NumberInput
                    borderColor={'web.border'} 
                    color={'web.text2'}
                    onChange={(e)=>handleInput(e)} 
                    step={1} 
                    defaultValue={0} 
                    min={0} 
                    max={pendingAmount} 
                    precision={2}>
                    <NumberInputField                    
                    _focus={{
                      borderColor: 'logo.orange',
                      boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
                            }} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                { error ? (
                  <FormErrorMessage>{error}</FormErrorMessage>
                  ):(
                    null
                  )}
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