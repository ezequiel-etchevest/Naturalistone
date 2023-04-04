import { 
  Box,
  Select, 
  HStack, 
  Input, 
  IconButton, 
  Tooltip,
  Divider,
 } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import '../../assets/styleSheet.css';
import {AiOutlineClear} from 'react-icons/ai';
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  getInvoiceErrorsFiltered, getInvoiceErrors } from '../../redux/actions-invoiceErrors'


const InvoiceErrorFilters = ({user, sellers}) => {
  
  const dispatch = useDispatch()
  const [errores, setErrores] = useState('')
  const [filter, setFilter] = useState({
    user: user,
    sellerID: '',
    type: '',
    number:''
  }) 
  let handleClickSeller = (e) => {
    setFilter({...filter, sellerID: e.target.value})
    dispatch(getInvoiceErrorsFiltered(e.target.value, filter.type, filter.number, user))
  }
  let handleClickType = (e) => {
    setFilter({...filter, type: e.target.value})
    dispatch(getInvoiceErrorsFiltered(filter.sellerID, e.target.value, filter.number, user))
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
  const handleChangeNumber = (e) => {
    if(e.target.value.length){
      validateInput(e)
      if(!errores.length){
        setFilter({...filter, number: e.target.value})
        dispatch(getInvoiceErrorsFiltered(filter.sellerID, filter.type, e.target.value, user))
      }
    } else {
      setFilter({...filter, number: ''})
      dispatch(getInvoiceErrorsFiltered(filter.sellerID, filter.type, '', user))
    }
  }
  const handleClear = () => {
    setFilter({
      user: user,
      sellerID: '',
      type: '',
      number:''
    })
    dispatch(getInvoiceErrors(user))
  }

  return (
    <>    
      <Box>
        <HStack
           pt={'2vh'}
           ml={'2vw'}
           mr={'2vw'} 
           h={'17vh'}
           w={'80vw'}
           justifyContent={'space-between'}>
{/* -------------------- Input------------------------------ */}
            <Box 
            display={'flex'} 
            justifyContent={'space-between'} 
            flexDir={'row'} 
            w={'47vw'}>
              <Box>
                <Input
                onChange={(e)=>handleChangeNumber(e)}
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
                value={filter.number}
                
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
            {
              (user[0].Secction7Flag === 1) ?
              <Select
                onChange={(e)=>handleClickSeller(e)}
                variant='outline' 
                w={'12vw'}
                h={'4.4vh'}
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
                }}>              
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
              (user[0].Secction7Flag === 1) ?
              <Select
                onChange={(e)=>handleClickType(e)}
                variant='outline' 
                w={'12vw'}
                h={'4.4vh'}
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
                }}>  
                  <option value={''} className="options">Select Type</option>
                  <option value={'Order'} className="options">Orders</option>
                  <option value={'Quote'} className="options">Quotes</option>
                  <option value={'Freight'} className="options">Freight</option>
                </Select>
                : 
                null
              }
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
      </HStack>
    </Box>
  </>
)
}
export default InvoiceErrorFilters