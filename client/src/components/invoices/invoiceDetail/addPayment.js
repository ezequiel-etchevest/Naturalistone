import {
    Box, 
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
    NumberInputField, 
    useToast,
    Tooltip,
    } from "@chakra-ui/react"
import { SiAddthis } from 'react-icons/si';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { patchPaymentMethod } from "../../../redux/actions-payments";
import '../../../assets/styleSheet.css'

const AddPayment = ({pendingAmount, cardPaymentAmount, totalAmount}) => {

  
  const dispatch = useDispatch()
  const {id} = useParams()
  const toast = useToast()
  const toastId = 'error-toast'
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [error, setError] = useState({msg: ''})
  const [isOptionDisabled, setIsOptionDisabled] = useState(false)
  const invoice = useSelector(state => state.invoice)
  cardPaymentAmount = Number(cardPaymentAmount)
  totalAmount = Number(totalAmount)
    const [input, setInput] = useState({
      Method : '',
      Amount: 0.00})

  useEffect(() => {
      if(totalAmount < 5000){
         setIsOptionDisabled(false)
        }else {
          if((cardPaymentAmount >= 5000) || (cardPaymentAmount >= (totalAmount / 2))) {
            setIsOptionDisabled(true);
          }
        }

    if(error.msg !== ''){
      if(!toast.isActive(toastId)){
      toast({
        id: toastId,
        title: "Error",
        description: error.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
      });}
    }
    return (()=>{
      setIsOptionDisabled(false)
    })
    }, [error, toast, cardPaymentAmount]);

  const handleSelect = (e) =>{
    if(e.target.value === 'Card' && totalAmount > 5000){
      if((input.Amount + cardPaymentAmount) > 5000 || (input.Amount + cardPaymentAmount) >= totalAmount / 2) {
        setError({msg: `Card payment amount cannot exceed 50% of the quote or $5000.`})
        setInput({
          ...input,
          Amount : 0.00
        })
      }else{
        setInput({
          ...input,
          Method : e.target.value
         })
    }}else{
      setInput({
          ...input,
          Method : e.target.value
         })
    }
  }

  const handleInput = (e) => {
    setError({msg: ''})
    if(input.Method === 'Card' && totalAmount > 5000){
      if((Number(e) + cardPaymentAmount) > 5000 || (Number(e) + cardPaymentAmount) > (totalAmount / 2)) {
        setError({msg: `Card payment amount cannot exceed 50% of the quote or $5000.`})    
      }else{
        setInput({
          ...input,
          Amount : Number(e)
        })
    }}else{
      if(e > Number(pendingAmount)){
        setError({msg:`Unpaid balance: ${pendingAmount}`})
        setInput({
          ...input,
          Amount : Number(pendingAmount)
        })
        setIsOptionDisabled(true)
      }else{
        setInput({
          ...input,
          Amount : Number(e)
        })
        if(totalAmount > 5000){
          if((e + cardPaymentAmount) > 5000 && totalAmount > 5000 || (e + cardPaymentAmount) >= Number(totalAmount / 2)){
            setIsOptionDisabled(true)}
          if((e + cardPaymentAmount) < 5000 || (e + cardPaymentAmount) <= Number(totalAmount / 2)){
            setIsOptionDisabled(false) } 
        }else if (totalAmount < 5000) setIsOptionDisabled(false) 
      }

    }
  }

  const handleClickPercentageButtons = (e) => {
    const { name } = e.target;
    const is50Percent = name === '50';
    const is100Percent = name === '100';
    let amount = is50Percent ? pendingAmount / 2 : is100Percent ? pendingAmount : 0.00;
  
    if (totalAmount > 5000) {
      if (input.Method === 'Card') {
        const isExceedingLimit = (amount + cardPaymentAmount) > (totalAmount / 2) || (amount + cardPaymentAmount) > 5000;
        setError({ msg: isExceedingLimit ? `Card payment amount cannot exceed 50% of the quote or $5000.` : '' });
        if (!isExceedingLimit) {
          setInput({
            ...input,
            Amount: amount
          });
        }
      } else {
        setInput({
          ...input,
          Amount: amount
        });
      }
    } else if (totalAmount < 5000) {
      setInput({
        ...input,
        Amount: amount
      });
    }
  
    if (totalAmount > 5000) {
      const isExceedingAmount = (amount + cardPaymentAmount) > 5000 && totalAmount > 5000 || (amount + cardPaymentAmount) >= Number(totalAmount / 2);
      setIsOptionDisabled(isExceedingAmount);
    } else if (totalAmount < 5000) {
      setIsOptionDisabled(false);
    }
  };
  
  
  const handleSubmit = () => {
    if(input.Amount && input.Method){
      dispatch(patchPaymentMethod(id, input))
      setInput({
        Method : '',
        Amount: 0 })
      setError({msg: ''})
      setIsOptionDisabled(false)
      onClose()
    }
  }

  const handleClose = ()=>{
    setInput({
      Method : '',
      Amount: 0 })
    setError({msg: ''})
    setIsOptionDisabled(false)
    onClose()
  }
 
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
      {/*Modal AddPayment*/}
      <Modal 
        isOpen={isOpen} 
        onClose={handleClose}
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
            onClick={handleClose}
            color={'web.text2'}
            _hover={{
              color: 'web.text'
            }} />
          <ModalBody>
          <FormControl isRequired>
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
            onChange={(e)=>handleSelect(e)}
            value={input.Method}
            >
              <option value='' className="options" >Select Option</option>
              <option value='Check' className="options" >Check</option>
              <option value='Card' className="options" id="cardId" disabled={isOptionDisabled}>Card</option>
              <option value='Cash' className="options" >Cash</option>
              <option value='Wire transfer' className="options" >Wire Transfer</option>
          </Select>
          </FormControl>
          <FormControl mt={'2vh'} isRequired>
            <Box
              mt={8}
              display={'flex'} 
              flexDirection={'row'}
            >
              <FormLabel color={'web.text'}>Amount</FormLabel>
            </Box>
            <NumberInput
            clampValueOnBlur={true} 
            value={Number(input.Amount).toLocaleString('en-US')}
            borderColor={'web.border'} 
            color={'web.text2'}
            onChange={(e)=>handleInput(e)} 
            min={0} 
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
              <Box 
                display={'flex'} 
                justifyContent={'flex-start'} 
                width={'100%'}
                mt={2}
              >
                <Button
                onClick={(e)=>handleClickPercentageButtons(e)}
                name={'0'}
                w={'3vw'}
                variant={'unstyled'}           
                fontWeight={'light'}
                display={'flex'}         
                _hover={{
                  color: 'logo.orange',
                  fontWeight: 'normal'
                }}
                color={'web.text2'}
                >
                0%
                </Button>

                <Button
                onClick={(e)=>handleClickPercentageButtons(e)}
                name={'50'}
                w={'3vw'}
                variant={'unstyled'}           
                fontWeight={'light'}
                display={'flex'}         
                _hover={{
                color: 'logo.orange',
                fontWeight: 'normal'
                }}
                color={'web.text2'}
                  >
                  50%
                </Button>
                <Button
                  onClick={(e)=>handleClickPercentageButtons(e)}
                  name={'100'}
                  w={'4vw'}
                  variant={'unstyled'}           
                  fontWeight={'light'}
                  display={'flex'}         
                  _hover={{
                  color: 'logo.orange',
                  fontWeight: 'normal'
                  }}
                  color={'web.text2'}
                >
                  100%
                </Button>
              </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={'orange'} 
              mr={3}
              disabled={input.Method == '' || input.Amount == '' || input.Amount == 0.00 ? true : false} 
              onClick={()=>handleSubmit()}
              >
              Submit
            </Button>
            <Button 
            w={'10vh'}
            variant={'unstyled'}           
            fontWeight={'normal'}
            display={'flex'}         
            _hover={{
            color: 'logo.orange',
            fontWeight: 'normal'
            }}
            color={'web.border'}
            onClick={()=> handleClose()}
            >Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddPayment