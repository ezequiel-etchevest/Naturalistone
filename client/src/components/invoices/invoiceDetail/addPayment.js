
import { 
    Button, 
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
    FormErrorMessage,
    useToast,
    Tooltip,
    Box,
    Flex,
    background
    } from "@chakra-ui/react"
import { SiAddthis } from 'react-icons/si';
import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { patchPaymentMethod } from "../../../redux/actions-payments";
import '../../../assets/styleSheet.css'
import { motionValue } from "framer-motion";



const AddPayment = ({pendingAmount}) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const toast = useToast()
    const [isToastShowing, setIsToastShowing] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ disabled, setDisabled ] = useState(true)
    const [input, setInput] = useState({
      Method : '',
      Amount: ''})
    const [error, setError] = useState('')
    const invoice = useSelector(state => state.invoice)
    const totalValueInvoice = invoice[0].Value
    const paymentsInvoices = useSelector(state => state.payments_by_id)
    const value = paymentsInvoices?.paymentsMath?.PendingAmount ?? invoice[0].Value
    const halfValue = Number(totalValueInvoice / 2)
    const [isOptionDisabled, setIsOptionDisabled] = useState(false)
    const CARD = 'Card'

  const paymentsCard = paymentsInvoices.paymentData.filter((el) => {
    const element = el.Method === CARD
    if(!element) {
      return
    }
    return element
  })

  const allPaymentsCard = paymentsCard?.reduce((acumulador, element) => {
    const sumOfAmounts = acumulador.Amount + element.Amount
    if(!sumOfAmounts) {
      return
    }
    return { Amount: sumOfAmounts }
  }, { Amount: 0 })

  const restOfPaymentCard = halfValue - allPaymentsCard.Amount

  console.log('soyrest', restOfPaymentCard)

    useEffect(() => {
      maxPaymentCard()
    },[paymentsInvoices, isOptionDisabled, setIsOptionDisabled])

    const handleCancel = () =>{
      setDisabled(true)
      onClose()
    }

    const handleSelect = (e) =>{
      if(e.target.value === CARD && input.Amount > restOfPaymentCard) {
        setIs50Active(false);
        setIs100Active(false);
      }
      setInput({
          ...input,
          Method : e.target.value
         })
      if(e.target.value !== '' && input.Amount !== ''){
        setDisabled(false)
      } else if (e.target.value === '' || input.Amount === 0.00){
        setDisabled(true)
      }
    }

    const handleInput = (e) => {
      setIs50Active(false)
      setIs100Active(false)
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
      if(!isToastShowing) {
        if (totalValueInvoice > 5000){
          if(input.Method === CARD && parseFloat(input.Amount) > restOfPaymentCard){
            setIsToastShowing(true)
            return toast({
              title: 'Invalid amount',
              description: `cannot exceed ${restOfPaymentCard} of the card payment`,
              status: 'error',
              duration: 4000,
              isClosable: true,
              onCloseComplete: () => setIsToastShowing(false),
            });
          }
      }
      if(parseFloat(input.Amount) > parseFloat(pendingAmount)){
        setIsToastShowing(true)
        toast({
          title: 'Invalid amount',
          description: `Pending amount equals to $${pendingAmount}`,
          status: 'error',
          duration: 4000,
          isClosable: true,
          onCloseComplete: () => setIsToastShowing(false),
        });
      } else{
        if(input.Method !== '' && input.Amount > 0){ 
          dispatch(patchPaymentMethod(id, input))
          setInput({
            Method : '',
            Amount: '' })
          setIs50Active(false);
          setIs50Active(false);
          onClose(setError(''))
      } else{
        setIsToastShowing(true)
        toast({
          title: 'Incompleted fields',
          description: `Both fields must be completed`,
          status: 'error',
          duration: 4000,
          isClosable: true,
          onCloseComplete: () => setIsToastShowing(false),
        });
      }
    }
  }
  }

  const [is50Active, setIs50Active] = useState(false);
  const [is100Active, setIs100Active] = useState(false);

  const handle50Toggle = () => {
    setIs50Active(true);
    setIs100Active(false);
      const valueAmount = value / 2
      setInput({
        ...input,
        Amount: valueAmount
      })
  };

  const handle100Toggle = () => {
    setIs50Active(false);
    setIs100Active(true);
    const valueAmount = value
    setInput({
      ...input,
      Amount: valueAmount
    })
  };

  const valueInput = () => {
    if (totalValueInvoice > 5000) {
      if (input.Method === CARD && input.Amount > restOfPaymentCard) {
        if(!isToastShowing) {
            setIsToastShowing(true)
            toast({
              title: 'You cannot make the invoice payment of more than 50% with card if the amount exceeds 5000',
              description: `cannot exceed ${restOfPaymentCard} of the card payment`,
              status: 'error',
              duration: 4000,
              isClosable: true,
              onCloseComplete: () => setIsToastShowing(false),
            });
        }
        setInput({
          ...input,
          Amount: 0
        })
        return 0.00
      }
    }
      if(is50Active){
      const totalValue = Number(value / 2)
      const formattedNumber = totalValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return formattedNumber
    }
    if(is100Active){
      const totalValue = Number(value)
      const formattedNumber = totalValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return formattedNumber
    }
    return 
  }

  const maxPaymentCard = () => {
    if(totalValueInvoice > 5000){
      if(restOfPaymentCard === 0) {
        setIsOptionDisabled(true)
        return;
      } 
    }
    setIsOptionDisabled(false);
    return restOfPaymentCard
  }
  
  function calculateMaxInputValueAndIsCardMaxPayment(amount, paymentMethod) {
    const maxInputValue = (amount > 5000 && paymentMethod === CARD) ? amount / 2 : amount;
    const isCardMaxPayment = (amount > 5000 && paymentMethod === CARD);
    return { maxInputValue, isCardMaxPayment };
  }

  const { maxInputValue, isCardMaxPayment } = calculateMaxInputValueAndIsCardMaxPayment(value, input.Method)

  return(
    <>
      <Tooltip label={'Add payment'} fontWeight={'hairline'}>
        <IconButton
        display={'flex'}
        alignItems={'center'}
        variant={'unstyled'} 
        color={'web.text2'}
        onClick={onOpen}
        _hover={{
          color: 'logo.orange'
        }}
        icon={<SiAddthis/>} 
        size={'md'}
        />
      </Tooltip>
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
            bg={'web.sideBar'}
            borderColor={'web.border'} 
            color={'web.text2'}
            onChange={(e)=>handleSelect(e)}>
              <option value='' className="options" >Select Option</option>
              <option value='Check' className="options" >Check</option>
              <option value='Card' className="options" id="cardId" disabled={isOptionDisabled}>Card</option>
              <option value='Cash' className="options" >Cash</option>
              <option value='Wire transfer' className="options" >Wire Transfer</option>
          </Select>
          </FormControl>
          <FormControl mt={'2vh'}  isRequired>
            <Box
              mt={8}
              display={'flex'} 
              flexDirection={'row'}
            >
              <FormLabel color={'web.text'}>Amount</FormLabel>
            </Box>
            <NumberInput
            clampValueOnBlur={true} 
            value={valueInput()}
            borderColor={'web.border'} 
            color={'web.text2'}
            onChange={(e)=>handleInput(e)} 
            min={0} 
            max={maxInputValue}
            precision={2}
            >
              <NumberInputField
              placeholder={'0.00'}
              _focus={{
              borderColor: 'logo.orange',
              boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
              }} />
              </NumberInput>
            </FormControl>
            { error ? (
              <FormErrorMessage>{error}</FormErrorMessage>
              ):(
                null
              )}
              <Box 
                display={'flex'} 
                justifyContent={'flex-start'} 
                width={'100%'}
                mt={2}
              >
                <Button
                onClick={()=>handle50Toggle()}
                  colorScheme={is50Active ? 'orange' : ''} 
                  color={'web.text'}
                  mr={3}
                  h={6}
                  p={2}
                  >
                  50%
                </Button>
                <Button
                  onClick={()=>handle100Toggle()}
                  colorScheme={is100Active ? 'orange' : ''} 
                  color={'web.text'}
                  h={6}
                  p={2}
                  mr={3}
                  disabled={isCardMaxPayment}
                >
                  100%
                </Button>
              </Box>
          </ModalBody>
          <ModalFooter>
            <Button
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