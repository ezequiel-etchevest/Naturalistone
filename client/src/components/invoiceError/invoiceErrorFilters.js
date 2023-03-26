import { 
  Box,
  Select, 
  HStack, 
  Input, 
  IconButton, 
  Text,
  Button,
 } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import '../../assets/styleSheet.css';
import {AiOutlineClear} from 'react-icons/ai';
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  getInvoiceErrorsFiltered } from '../../redux/actions-invoiceErrors'


const InvoiceErrorFilters = ({user, sellers, invoice_errors_by_filter, setFilteredInvoicesErrors, invoice_errors}) => {

  const dispatch = useDispatch()

  const [filter, setFilter] = useState({
    sellerID: '',
    type: '',
    input:''
  }) 

 // const [input, setInput] = useState('') 

  const handleSeller = (e) => {
    setFilter({
      ...filter,
      sellerID: e.target.value
    })
    dispatch(getInvoiceErrorsFiltered(e.target.value, filter.type))
  }

  const handleType = (e) => {
    setFilter({
      ...filter,
      type: e.target.value
    })
    dispatch(getInvoiceErrorsFiltered(filter.sellerID, e.target.value))
  }
  
  const handleClear = () => {
        setFilter({
          sellerID:'',
          type: '',
          input:''
        })
        setFilteredInvoicesErrors('')
        dispatch(getInvoiceErrorsFiltered())
      }
  
  const handleSearchInput = (e) => {    
    setFilter({input:e.target.value})
      if(e.target.value.length){
        if(invoice_errors_by_filter.length){
          const filteredByID = invoice_errors_by_filter.filter(invoice => invoice.Invoice.includes(e.target.value))
          if(!filteredByID.length) return 
          setFilteredInvoicesErrors(filteredByID)
        } else {
          if(invoice_errors.length){
            const filteredByID = invoice_errors.filter(invoice => invoice.Invoice.includes(e.target.value))
            if(!filteredByID.length) return 
            setFilteredInvoicesErrors(filteredByID) 
          }
        }
    } else {
        setFilteredInvoicesErrors([])
    }
  }

  return (
    <>    
      <Box
        display={'flex'}
        ml={'3.2vw'}
        w={'74vw'}
        h={'18vh'} 
        flexDir={'row'}
        alignItems={'center'}
        >
        <HStack
          h={'8vh'}
          display={'flex'} 
          alignItems={'center'}
          justifyContent={'space-between'}  
          w={'74vw'}>
{/* --------------------BOX SELECT AND Input------------------------------ */}
            <Box 
            display={'flex'} 
            justifyContent={'space-between'} 
            flexDir={'row'} 
            w={'47vw'}>
            {
              (user[0].SellerID === 3 || user[0].SellerID === 5 || user[0].SellerID === 15 ) ?
              <Select
                variant='outline' 
                w={'12vw'}
                h={'6vh'}
                fontSize={'xs'}            
                bg={'web.sideBar'}
                color={'web.text2'}
                borderColor={'web.border'}
                cursor={'pointer'}
                value={filter.sellerID}
                display={user[0].Secction7Flag === 1 ? 'unset' : 'none'}
                _focus={{
                  borderColor: 'logo.orange',
                  boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
                }}
                onChange={(e) => handleSeller(e)}
                >              
                <option value='' className="options"> Select Seller</option>
               {
                  sellers.length ?
                  sellers.map((s, i) =>{
                    return(
                    <option key={i} s={s} value={s.SellerID} className="options">{s.FirstName} {s.LastName}</option>
                    )}
                    )
                    :
                    null
                }
              </Select>
              : null
              }
              {
              (user[0].SellerID === 3 || user[0].SellerID === 5 || user[0].SellerID === 15 ) ?
              <Select
                variant='outline' 
                w={'12vw'}
                h={'6vh'}
                fontSize={'xs'}            
                bg={'web.sideBar'}
                color={'web.text2'}
                borderColor={'web.border'}
                cursor={'pointer'}
                value={filter.type}
                display={user[0].Secction7Flag === 1 ? 'unset' : 'none'}
                _focus={{
                  borderColor: 'logo.orange',
                  boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
                }}
                onChange={(e) => handleType(e)}
                >  
                  <option value={''} className="options">Select Type</option>
                  <option value={'Order'} className="options">Orders</option>
                  <option value={'Quote'} className="options">Quotes</option>
                </Select>
                : 
                null
              }
            <Box>
              <Input
                w={'15vw'}
                variant={"unstyled"}
                placeholder={'Invoice number'}
                _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
                size={"sm"}
                borderBottomWidth={"2px"}
                textColor={'web.text'}
                type={'number'}
                pattern={"[0-9]{10}"}
                borderBottomColor={'web.text2'}
                value={filter.input}
                onChange={(e) => handleSearchInput(e)}
                />
              <IconButton
                borderRadius={2}
                aria-label={"Search database"}
                color={'web.text2'}
                bgColor={'web.bg'}
                ml={1}
                icon={<SearchIcon />}
                _hover={{
                  color: 'logo.orange',
                }}
                _active={{ color: 'logo.orange'}}
                />
              </Box>
            </Box>
        <Box
          w={'12vw'}
          >
          <Button
            leftIcon={ <AiOutlineClear/>}
            variant={'unstyled'} 
            display={'flex'} 
            w={'10vw'}
            h={'10vh'}
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
            <Text 
              pr={'1.5vh'} 
              fontFamily={'body'} 
              fontWeight={'hairline'}
              >Clear filters
            </Text>
          </Button>
        </Box> 
      </HStack>
    </Box>
  </>
)
}
export default InvoiceErrorFilters