import { 
  Box, 
  HStack, 
  Text, 
  Button, 
  Input, 
  IconButton, 
  FormControl, 
  NumberInput,
  NumberInputField, 
  Select,
  Divider,
  Tooltip,
  } from "@chakra-ui/react";
import { BsCalendar4Week } from 'react-icons/bs';
import { SearchIcon } from '@chakra-ui/icons';
import {  getInvoicesBySeller, getFilteredInvoices } from "../../redux/actions-invoices";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";
import '../../assets/styleSheet.css';
import {AiOutlineClear} from 'react-icons/ai';

const Filters = ({user, seller_invoices, focusFilter, setFocusFilter, seller_values}) => {

  const dispatch = useDispatch()
  const [ disabled, setDisabled ] = useState(false)
  const [errores, setErrores] = useState('')
  const [inputValues, setInputValues] = useState(
    {
      inputName: '',
      inputNumber: '',
      selectSeller: '',
      timeFilter: 'All'
    }
    )

  const userId  =  user[0].SellerID

  const validateSeller = () => {
    
    if(user[0].Secction7Flag === 1) return true
    else return false
  }
  const handleClickAllInvoices = () => {
    setInputValues({...inputValues, timeFilter: 'All'})
    dispatch(getInvoicesBySeller(userId, {...inputValues, timeFilter: 'All'}))

  }
  const handleClickLastWeek = () => {
    setInputValues({...inputValues, timeFilter: 'LastWeek'})
    dispatch(getInvoicesBySeller(userId, {...inputValues, timeFilter: 'LastWeek'}))
  }
  const handleClickLastMonth = () => {
    setInputValues({...inputValues, timeFilter: 'LastMonth'})
    dispatch(getInvoicesBySeller(userId, {...inputValues, timeFilter: 'LastMonth'}))
  }
  const handleTimeSelect = (e) => {
    if(e.target.value === 'All') return handleClickAllInvoices()
    if(e.target.value === 'Lastweek') return handleClickLastWeek()
    if(e.target.value === 'Lastmonth') return handleClickLastMonth()
  }
  const validateInput = (e) => {
      if(!/^[0-9]*$/.test(e.target.value)){
        setErrores('Special characters or letters not alowed') 
      } else if(e.target.value.length > 5){
        setErrores('Should not be longer than 5 digits')
      } else{
        setErrores('')
      }
  }
  const handleChangeInvoiceNumber = (e) => {
    if(e.target.value.length){
      validateInput(e)
      if(!errores.length){
        setInputValues({...inputValues, inputNumber: e.target.value})
        dispatch(getInvoicesBySeller(userId, {...inputValues, inputNumber: e.target.value}))
      }
    } else {
      setInputValues({...inputValues, inputNumber: ''})
      dispatch(getInvoicesBySeller(userId, {...inputValues, inputNumber: ''}))
    }
  }
  const handleChangeCustomerName = (e) => {
    if(e.target.value.length){
      setInputValues({...inputValues, inputName: e.target.value})
      dispatch(getInvoicesBySeller(userId, {...inputValues, inputName: e.target.value}))
    } else {
      setInputValues({...inputValues, inputName: ''})
      dispatch(getInvoicesBySeller(userId, {...inputValues, inputName: ''}))
    }
  }
  const handleSellerSelect = (e) => {
    setInputValues({...inputValues, selectSeller: e.target.value})
    dispatch(getInvoicesBySeller(userId, {...inputValues, selectSeller: e.target.value}))
  }
  const handleClear = () => {
    setInputValues({
      inputNumber:'',
      inputName: '',
      selectSeller:'',
      timeFilter:'All'
    })
    dispatch(getInvoicesBySeller(userId, {      
    inputNumber:'',
    inputName: '',
    selectSeller:'',
    timeFilter:'All'}
    ))
    setFocusFilter('All')
  }
  const uniqueSellerIDs = seller_invoices?.reduce((acc, cur) => {
    if (!acc.includes(cur.SellerID)) {
      acc.push(cur.SellerID);
    }
    return acc;
  }, []);
  const matchedSellers = seller_values?.filter((seller) => {
    return uniqueSellerIDs.includes(seller.sellerID);
  });

    return (

      <Box>
        <HStack
          pt={'2vh'}
          ml={'2vw'}
          mr={'2vw'} 
          h={'17vh'}
          w={'76vw'}
          justifyContent={'space-between'}
          >
          {/*Inputs and select */}
          <Box
            display={'flex'}
            alignItems={'center'}
            w={'48vw'}
            >
            <Box
              ml={'2vh'}
              display={'flex'}
              flexDir={'row'}
              alignItems={'flex-start'}
              justifyItems={'flex-end'}
              pt={'1vh'}
              w={'15vw'}
              h={'6vh'}
              >
              <FormControl 
              display={'flex'}
              flexDir={'row'}>
                 <NumberInput 
                  variant={"unstyled"}
                  borderBottomWidth={"2px"}
                  textColor={'web.text2'}
                  borderBottomColor={'web.text2'}
                  w={'80%'}
                  size={"sm"}
                  h={'4vh'}
                  value={inputValues.inputNumber}
                  >
                  <NumberInputField
                    placeholder={'Quote number'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
                    name={'invoiceNumber'}
                    onChange={(e) => handleChangeInvoiceNumber(e)}
                    />
                </NumberInput>
                  <IconButton
                    pb={'2vh'}
                    color={'web.text2'}
                    aria-label={"Search database"}
                    bgColor={'web.bg'}
                    icon={<SearchIcon />}
                    _hover={{
                      color: 'logo.orange',
                    }}
                    _active={{ color: 'logo.orange'}}
                  />
                      
                  {
                    errores.length >= 1 && (
                      <Box position={'absolute'} display={'flex'}>
                        <Text color={'web.error'} fontSize={'12px'} display={'flex'}>
                          {errores}
                        </Text>
                      </Box>
                    )}
              </FormControl>
            </Box>
            <Box
                display={'flex'}
                alignItems={'center'} 
                w={'15vw'}
                h={'10vh'}
                >
                <Input
                  mb={'0.5vh'}
                  w={'80%'}
                  minH={'4.5vh'}
                  variant="unstyled"
                  placeholder={'Customer Name'}
                  textColor={'web.text'}
                  _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
                  size={"sm"}
                  borderBottomWidth={"2px"}
                  borderBottomColor={'web.text2'}
                  value={inputValues.inputName}
                  onChange={(e)=> handleChangeCustomerName(e)}
                  
                />
                <IconButton
                  color={'web.text2'}
                  borderRadius={2}
                  aria-label="Search database"
                  bgColor={'web.bg'}
                  ml={1}
                  icon={<SearchIcon />}
                  _hover={{
                    color: 'orange',
                  }}
                  _active={{ color: 'gray.800'}}
                />
            </Box>
            </Box>
             {/*Selects */}
          <HStack w={'30vw'}> 
            <Select
          onChange={(e)=>handleTimeSelect(e)} 
          w={'11vw'}
          variant='outline' 
          h={'4.4vh'}
          fontSize={'xs'}            
          bg={'web.sideBar'}
          color={'web.text2'}
          borderColor={'web.border'}
          cursor={'pointer'}
          _focus={{
            borderColor: 'logo.orange',
            boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
          }}>
          <option value='All' className="options">All time</option>
          <option value='Lastweek' className="options">Last week</option>
          <option value='Lastmonth' className="options">Last month</option>
          {
          }
            </Select>
            <Select
          onChange={(e)=>handleSellerSelect(e)}
          display={validateSeller() === true ? 'unset' : 'none'}  
          w={'15vw'}
          variant='outline' 
          h={'4.4vh'}
          fontSize={'xs'}            
          bg={'web.sideBar'}
          color={'web.text2'}
          borderColor={'web.border'}
          cursor={'pointer'}
          value={inputValues.selectSeller}
          _focus={{
            borderColor: 'logo.orange',
            boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
          }}>
          <option value='' className="options">Select seller</option>
          {
            validateSeller() === true ? (
              matchedSellers?.map((e, i) => {
                  return(
                    <option key={i} className={'options'} value={e.sellerID}>{e.name}</option>
              )})
                  
              ): ( null)
          }
            </Select>
            </HStack>
        <Divider orientation={'vertical'} h={'5vh'}/>
        <Tooltip label={'Clear all filters'} fontWeight={'hairline'}>      
        <IconButton
            icon={ <AiOutlineClear/>}
            variant={'unstyled'} 
            display={'flex'} 
            borderRadius={'sm'} 
            placeContent={'center'}
            alignItems={'center'}
            color={'web.text2'} 
            _hover={{
               color: 'logo.orange'
               }}
            _active={{
            }}
            onClick={(e) => handleClear(e)}
            >
            </IconButton>
          </Tooltip>   
          
        </HStack>


      </Box>
    )
}

export default Filters