import { 
  Box, 
  HStack, 
  Text, 
  Input, 
  IconButton,
  Select,
  Divider,
  Tooltip,
  } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import {  getInvoicesBySeller } from "../../redux/actions-invoices";
import { useDispatch } from 'react-redux'
import { useState } from "react";
import '../../assets/styleSheet.css';
import {AiOutlineClear} from 'react-icons/ai';
import {  useNavigate } from "react-router-dom";
import CreateQuote from "./createQuote/createQuoteModal";

const Filters = ({user, seller_invoices, sellers, setFocusFilter, seller_values, customers, inputValues, setInputValues, setLoading}) => {

  const dispatch = useDispatch()
  const [ disabled, setDisabled ] = useState(false)
  const [errores, setErrores] = useState('')
  const searchParams = new URLSearchParams();
  const navigate = useNavigate()
  const lastWeek = 'LastWeek'
  const lastMonth = 'LastMonth'
  const all = 'All'

  const userId  =  user[0].SellerID

  const validateSeller = () => {
    if(user[0].Secction7Flag === 1) return true
    else return false
  }
  
  const handleClickStatus = (e) => {
    setLoading(true)
    const status = e.target.value
    searchParams.set('status', status)
    searchParams.set('timeFilter', inputValues.timeFilter)
    searchParams.set('seller', inputValues.selectSeller)
    if(inputValues.inputName){
      searchParams.set('name', inputValues.inputName)
    } else {
      searchParams.delete('name')
    }
    if(inputValues.inputNumber){
      searchParams.set('number', inputValues.inputNumber)
    } else {
      searchParams.delete('number')
    }
    navigate(`?${searchParams.toString()}`)
    setInputValues({...inputValues, quoteStatus: status})
    dispatch(getInvoicesBySeller(userId, {...inputValues, quoteStatus: status}))
  }

  const handleClickAllInvoices = () => {
    setLoading(true)
    setInputValues({...inputValues, timeFilter: all})
    searchParams.set('timeFilter', 'All')
    searchParams.set('seller', inputValues.selectSeller)
    searchParams.set('status', inputValues.quoteStatus)
    navigate(`?${searchParams.toString()}`)
    dispatch(getInvoicesBySeller(userId, {...inputValues, timeFilter: 'All'}))
  }

  
  const handleClickLastWeek = () => {
    setLoading(true)
    setInputValues({...inputValues, timeFilter: lastWeek})
    searchParams.set('timeFilter', lastWeek)
    searchParams.set('seller', inputValues.selectSeller)
    searchParams.set('status', inputValues.quoteStatus)
    if(inputValues.inputName){
      searchParams.set('name', inputValues.inputName)
    } else {
      searchParams.delete('name')
    }
    if(inputValues.inputNumber){
      searchParams.set('number', inputValues.inputNumber)
    } else {
      searchParams.delete('number')
    }
    navigate(`?${searchParams.toString()}`)
    dispatch(getInvoicesBySeller(userId, {...inputValues, timeFilter: lastWeek}))
  }

  const handleClickLastMonth = () => {
    setLoading(true)
    setInputValues({...inputValues, timeFilter: lastMonth})
    searchParams.set('timeFilter', lastMonth)
    searchParams.set('status', inputValues.quoteStatus)
    searchParams.set('seller', inputValues.selectSeller)
    if(inputValues.inputName){
      searchParams.set('name', inputValues.inputName)
    } else {
      searchParams.delete('name')
    }
    if(inputValues.inputNumber){
      searchParams.set('number', inputValues.inputNumber)
    } else {
      searchParams.delete('number')
    }
    navigate(`?${searchParams.toString()}`)
    dispatch(getInvoicesBySeller(userId, {...inputValues, timeFilter: lastMonth}))
  }

  const handleTimeSelect = (e) => {
    setLoading(true)
    if(e.target.value === 'All') return handleClickAllInvoices()
    if(e.target.value === 'LastWeek') return handleClickLastWeek()
    if(e.target.value === 'LastMonth') return handleClickLastMonth()
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
    setLoading(true)
    const invoiceNumber = e.target.value
    if(invoiceNumber.length){
      validateInput(e)
      if(!errores.length){
        setInputValues({...inputValues, inputNumber: invoiceNumber})
        searchParams.set('timeFilter', inputValues.timeFilter)
        searchParams.set('seller', inputValues.selectSeller)
        searchParams.set('status', inputValues.quoteStatus)
        if(inputValues.inputName){
          searchParams.set('name', inputValues.inputName)
        } else {
          searchParams.delete('name')
        }
        if(inputValues.inputNumber){
          searchParams.set('number', invoiceNumber)
        } else {
          searchParams.delete('number')
        }
        navigate(`?${searchParams.toString()}`)
        dispatch(getInvoicesBySeller(userId, {...inputValues, inputNumber: invoiceNumber}))
      }
    } else {
      searchParams.delete('number');
      searchParams.set('timeFilter', inputValues.timeFilter)
      searchParams.set('status', inputValues.quoteStatus)
      searchParams.set('seller', inputValues.selectSeller)
      if(inputValues.inputName){
        searchParams.set('name', inputValues.inputName)
      } else {
        searchParams.delete('name')
      }
      navigate(`?${searchParams.toString()}`)
      setInputValues({...inputValues, inputNumber: ''})
      setErrores('')
      dispatch(getInvoicesBySeller(userId, {...inputValues, inputNumber: ''}))
    }
  }

  const handleChangeCustomerName = (e) => {
    setLoading(true)
    const customerName = e.target.value
    if(customerName.length){
      setInputValues({...inputValues, inputName: customerName})
      searchParams.set('timeFilter', inputValues.timeFilter)
      searchParams.set('seller', inputValues.selectSeller)
      searchParams.set('name', customerName)
      searchParams.set('number', inputValues.inputNumber)
      searchParams.set('status', inputValues.quoteStatus)
      navigate(`?${searchParams.toString()}`)
      dispatch(getInvoicesBySeller(userId, {...inputValues, inputName: customerName}))
    } else {
      searchParams.delete('name');
      searchParams.set('timeFilter', inputValues.timeFilter)
      searchParams.set('seller', inputValues.selectSeller)
      searchParams.set('status', inputValues.quoteStatus)
      if(inputValues.inputNumber){
        searchParams.set('number', inputValues.inputNumber)
      } else {
        searchParams.delete('name')
      }
      navigate(`?${searchParams.toString()}`)
      setInputValues({...inputValues, inputName: ''})
      dispatch(getInvoicesBySeller(userId, {...inputValues, inputName: ''}))
    } 
  }
  
  const handleSellerSelect = (e) => {
    setLoading(true)
    const selectSeller = e.target.value
    setInputValues({...inputValues, selectSeller: selectSeller})
    searchParams.set('timeFilter', inputValues.timeFilter)
    searchParams.set('status', inputValues.quoteStatus)
    searchParams.set('seller', selectSeller)
    if(inputValues.inputName){
      searchParams.set('name', inputValues.inputName)
    } else {
      searchParams.delete('name')
    }
    if(inputValues.inputNumber){
      searchParams.set('number', inputValues.inputNumber)
    } else {
      searchParams.delete('number')
    }
    navigate(`?${searchParams.toString()}`)
    dispatch(getInvoicesBySeller(userId, {...inputValues, selectSeller: selectSeller}))
  }
  
  const handleClear = () => {
    setLoading(true)
    searchParams.delete('timeFilter')
    searchParams.delete('seller')
    searchParams.delete('number')
    searchParams.delete('name')
    searchParams.delete('status')
    navigate(`?${searchParams.toString()}`)
    setInputValues({
      inputNumber:'',
      inputName: '',
      selectSeller:'',
      timeFilter:'All',
      quoteStatus: '',
    })
    dispatch(getInvoicesBySeller(userId, {      
    inputNumber:'',
    inputName: '',
    selectSeller:'',
    timeFilter:'All',
    quoteStatus: '',
  }
    ))
    setFocusFilter('All')
  }
  
  const uniqueSellerIDs = Object.entries(seller_invoices).length ? seller_invoices.reduce((acc, cur) => {
    if (!acc.includes(cur.SellerID)) {
      acc.push(cur.SellerID);
    }
    return acc;
  }, []) : ( [] )

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
          w={'80vw'}
          justifyContent={'space-between'}
          spacing={'1vw'}
          >
          {/*Inputs*/}
          <Box
            display={'flex'}
            alignItems={'center'}
            w={'48vw'}
            >         
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
              type={'number'}
              placeholder={'Quote number'}
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              name={'invoiceNumber'}
              value={inputValues.inputNumber}
              autoComplete={"off"}
              onChange={(e) => handleChangeInvoiceNumber(e)}
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
            {
              errores.length >= 1 && (
                <Box display={'flex'} mt={'8vh'} 
                position={'fixed'}>
                  <Text color={'web.error'} fontSize={'xs'} display={'flex'}>
                    {errores}
                  </Text>
                </Box>
            )}
            </Box>
            <Box
              display={'flex'}
              alignItems={'center'} 
              w={'15vw'}
              h={'10vh'}
              ml={'1vw'}
              >
              <Input
                mb={'0.5vh'}
                w={'80%'}
                minH={'4.5vh'}
                variant="unstyled"
                placeholder={'Customer name'}
                textColor={'web.text2'}
                _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
                size={"sm"}
                borderBottomWidth={"2px"}
                borderBottomColor={'web.text2'}
                value={inputValues.inputName ? inputValues.inputName : ''}
                autoComplete={"off"}
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
          <Box 
            w={'30vw'} 
            display={'flex'} 
            gap={"1vw"}
            justifyContent={'flex-end'}
            >
            <Select
              onChange={(e)=>handleSellerSelect(e)}
              display={validateSeller() === true ? 'unset' : 'none' }
              mb={'0.5vh'}
              w={'10vw'}
              minH={'4.5vh'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              _hover={{borderColor: 'web.border'}}
              value={inputValues.selectSeller}
              cursor={'pointer'}
            >
              <option value='' className="options">All seller</option>
              {
                
                validateSeller() === true ? (
                  matchedSellers?.map((e, i) => {
                      return(
                        <option key={i} className={'options'} value={e.sellerID}>{e.name}</option>
                  )})
                      
                  ): ( null)
              }
            </Select>
            <Select
                onChange={(e)=>handleTimeSelect(e)}
                mb={'0.5vh'}
                w={'8vw'}
                minH={'4.5vh'}
                variant="unstyled"
                textColor={'web.text2'}
                _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
                size={"sm"}
                borderBottomWidth={"2px"}
                borderBottomColor={'web.text2'}
                _hover={{borderColor: 'web.border'}}
                cursor={'pointer'}
                value={inputValues.timeFilter}
              >
              <option value='All' className="options">All time</option>
              <option value='LastWeek' className="options">Last week</option>
              <option value='LastMonth' className="options">Last month</option>
            </Select>
            <Select
                onChange={(e)=>handleClickStatus(e)}
                mb={'0.5vh'}
                w={'8vw'}
                minH={'4.5vh'}
                variant="unstyled"
                textColor={'web.text2'}
                _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
                size={"sm"}
                borderBottomWidth={"2px"}
                borderBottomColor={'web.text2'}
                _hover={{borderColor: 'web.border'}}
                cursor={'pointer'}
                value={inputValues.quoteStatus}
              >
              <option value='' className="options">All status</option>
              <option value='Canceled' className="options">Canceled</option>
              <option value='Half-Paid' className="options">Half Paid</option>
              <option value='Paid' className="options">Paid</option>
              <option value='Pending' className="options">Pending</option>
              <option value='Pending_Approval' className="options">Pending Approval</option>
            </Select>
            </Box>
        <Divider orientation={'vertical'} h={'5vh'}/>
        <Tooltip placement={'bottom-start'} label={'Clear all filters'} fontWeight={'hairline'}>      
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
        {/* <CreateInvoiceButton user={user} customers={customers}/> */}
        <CreateQuote customers={customers} sellers={sellers}/>
        </HStack>


      </Box>
    )
}

export default Filters