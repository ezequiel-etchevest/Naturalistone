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
  Select
  } from "@chakra-ui/react";
import { BsCalendar4Week } from 'react-icons/bs';
import { SearchIcon } from '@chakra-ui/icons';
import { getInvoicesLastWeek, getInvoicesBySeller, getInvoicesLastMonth, getFilteredInvoices } from "../../redux/actions-invoices";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";


const Filters = ({userId, seller_invoices, setFilteredByCustomer, focus, setFocus, seller_values}) => {

  const dispatch = useDispatch()
  const [errores, setErrores] = useState('')
  const filtered_invoices_month_week = useSelector(state => state.filtered_invoices_month_week)

  const validateSeller = () => {
    if(userId == 6 || userId == 3 || userId == 5 || userId == 15 ) return true
    else return false
  }
  const handleClickAllInvoices = () => {
    dispatch(getInvoicesBySeller(userId))
    setFocus('AllInvoices')
  }
  const handleClickLastWeek = () => {
    dispatch(getInvoicesLastWeek(userId))
    setFocus('LastWeek')
  }
  const handleClickLastMonth = () => {
    dispatch(getInvoicesLastMonth(userId))
    setFocus('LastMonth')
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
        const filteredInvoices = seller_invoices?.filter(d => d.Naturali_Invoice.toString().includes(e.target.value))
        dispatch(getFilteredInvoices(filteredInvoices)) 
      }} else {
        dispatch(getFilteredInvoices(filtered_invoices_month_week))
        setErrores('')
      }
  }
  const handleChangeCustomerName = (e) => {
    if(e.target.value.length){
      let filterByName = seller_invoices.filter(inv => inv.Reference.toLowerCase().includes(e.target.value.toLowerCase()))
      setFilteredByCustomer(filterByName)
    } else {
      setFilteredByCustomer([])
    }
  }
  const handleSellerSelect = (e) => {
    const filteredBySeller = seller_invoices?.filter( d => d.SellerID == e.target.value)
    dispatch(getFilteredInvoices(filteredBySeller)) 
  }
    return (
        <>
        <HStack
          ml={'2vw'}
          mr={'2vw'} 
          h={'20vh'} 
          w={'76vw'}
          justifyContent={'space-between'}
          >
          {/*3 buttons box : All, Last Week, Last Month */}
          <HStack w={'25vw'} spacing={'1vh'}>
            <Button
            variant={'unstyled'} 
            display={'flex'} 
            w={'8vw'}
            h={'10vh'}
            borderRadius={'sm'} 
            placeContent={'center'}
            alignItems={'center'}
            color={focus === 'AllInvoices' ? 'logo.orange' : 'web.text2'}
            _hover={{
                color: 'logo.orange'
                }}
            _active={{
              color: 'logo.orange'
          }}>
          <Text 
            pr={'1.5vh'} 
            fontFamily={'body'} 
            fontWeight={'hairline'}
            onClick={()=> handleClickAllInvoices()} 
            >All</Text>
            <BsCalendar4Week/>
            </Button>
            <Button
              variant={'unstyled'} 
              display={'flex'} 
              w={'15vw'}
              h={'10vh'}
              borderRadius={'sm'} 
              placeContent={'center'}
              alignItems={'center'}
              color={focus === 'LastWeek' ? 'logo.orange' : 'web.text2'}
              _hover={{
                color: 'logo.orange'
                  }}
              _active={{
                color: 'logo.orange'
              }}>
              <Text 
                pr={'1.5vh'} 
                fontFamily={'body'} 
                fontWeight={'hairline'}
                onClick={()=> handleClickLastWeek()} 
                >Last Week</Text>
                <BsCalendar4Week/>
            </Button>
            <Button
              userSelect={'none'}
              variant={'unstyled'} 
              display={'flex'} 
              w={'15vw'}
              h={'10vh'}
              borderRadius={'sm'} 
              placeContent={'center'}
              alignItems={'center'}
              color={focus === 'LastMonth' ? 'logo.orange' : 'web.text2'}
              _hover={{
               color: 'logo.orange'
                  }}         
              _active={{
               color: 'logo.orange'
              }}>
                <Text 
                fontFamily={'body'} 
                fontWeight={'hairline'}
                onClick={()=> handleClickLastMonth()}  
                pr={'1.5vh'}>Last Moth</Text>
                <BsCalendar4Week/>
            </Button>
          </HStack>
          {/*Inputs and select */}
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-end'}
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
                  h={'4vh'}>
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
            <Select
              onChange={(e)=>handleSellerSelect(e)}
              display={validateSeller() === true ? 'unset' : 'none'}
              placeholder="Select seller"
              w={'14vw'}
              variant='outline' 
              h={'4.4vh'}
              fontSize={'xs'}            
              bg={'web.bg'}
              color={'web.text2'}
              borderColor={'web.text2'}
              cursor={'pointer'}
              _focus={{
                borderColor: 'logo.orange',
                boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
              }}>
              {
                validateSeller() === true ? (
                  seller_values ? (
                    seller_values.map((e, i) => {
                      return(
                        <option key={i} value={e.sellerID}>{e.name}</option>
                      )
                    })

                  ): ( null)
                ):(
                  null
                )
              }
            </Select>
          </Box>
        </HStack>
        </>
    )
}

export default Filters