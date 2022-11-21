import { Box, HStack, Icon, Text, Button, Input, IconButton, FormControl } from "@chakra-ui/react";
import { BsCalendar4Week } from 'react-icons/bs';
import { SearchIcon } from '@chakra-ui/icons';
import { getInvoicesLastWeek, getInvoicesBySeller, getInvoicesLastMonth, getFilteredInvoices } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";

const Filters = ({userId, seller_invoices, setFilteredByCustomer}) => {

  const dispatch = useDispatch()
  const [errores, setErrores] = useState('')   

  const filtered_invoices_month_week = useSelector(state => state.filtered_invoices_month_week)

  const handleClickAllInvoices = () => {
    dispatch(getInvoicesBySeller(userId))
    
  }
  const handleClickLastWeek = () => {
    dispatch(getInvoicesLastWeek(userId))
  }
  const handleClickLastMonth = () => {
    dispatch(getInvoicesLastMonth(userId))
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
        if(!filteredInvoices.length) return alert('No Invoices match this search')
          dispatch(getFilteredInvoices(filteredInvoices)) 
      }} else {
        dispatch(getFilteredInvoices(filtered_invoices_month_week))
        setErrores('')
      }
    }

  const handleChangeCustomerName = (e) => {
    if(e.target.value.length){
      let filterByName = seller_invoices.filter(inv => inv.Reference.toLowerCase().includes(e.target.value))
      if(!filterByName.length) return alert('No customer name match this search')
      setFilteredByCustomer(filterByName)
    } else {
      setFilteredByCustomer([])
    }
  }

    return (
        <>
        <HStack ml={'2vw'} mb={'5vh'} mt={'5vh'} mr={'2vw'} h={'20vh'} spacing={'1.5vw'}>
        <Button
        variant={'unstyled'} 
        display={'flex'} 
        w={'10vw'}
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
            onClick={()=> handleClickAllInvoices()} 
            >All Invoices</Text>
            <BsCalendar4Week/>
        </Button>
        <Button
        variant={'unstyled'} 
        display={'flex'} 
        w={'12vw'}
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
            onClick={()=> handleClickLastWeek()} 
            >Last Week Invoices</Text>
            <BsCalendar4Week/>
        </Button>
        <Button
         variant={'unstyled'} 
         display={'flex'} 
         w={'12vw'}
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
            onClick={()=> handleClickLastMonth()}  
            pr={'1.5vh'}>Last Moth Invoices</Text>
            <BsCalendar4Week/>
        </Button>
        <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        pl={'2vw'}
        w={'38vw'}
        >
          
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  w={'19vw'}
                  h={'15vh'}
                  >
                    <FormControl>
                    <Input
                        w={'70%'}
                        variant="unstyled"
                        placeholder={'Invoice number'}
                        _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
                        size="sm"
                        borderBottomWidth="2px"
                        name='invoiceNumber'
                        onChange={(e) => handleChangeInvoiceNumber(e)}
                      />
                      <IconButton
                        borderRadius={2}
                        aria-label="Search database"
                        bgColor={'white'}
                        ml={1}
                        icon={<SearchIcon />}
                        _hover={{
                          color: 'orange',
                        }}
                        _active={{ color: 'gray.800'}}
                      />
                      
                      {
                      errores.length >= 1 && (
                        <Box position={'absolute'} display={'flex'}>
                         <Text color="red.300" fontSize={'12px'} display={'flex'}>
                            {errores}
                         </Text>
                        </Box>
                      )}
                      </FormControl>
                </Box>
                <Box
                  display={'flex'}
                  alignItems={'center'} 
                  w={'19vw'}
                  h={'10vh'}>
                  <Input
                      w={'70%'}
                      variant="unstyled"
                      placeholder={'Customer Name'}
                      _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
                      size="sm"
                      borderBottomWidth="2px"
                      onChange={(e)=> handleChangeCustomerName(e)}
                    />
                    <IconButton
                      borderRadius={2}
                      aria-label="Search database"
                      bgColor={'white'}
                      ml={1}
                      icon={<SearchIcon />}
                      _hover={{
                        color: 'orange',
                      }}
                      _active={{ color: 'gray.800'}}
                    />
                  </Box>
        </Box>
        
        </HStack>
        </>
    )
}

export default Filters