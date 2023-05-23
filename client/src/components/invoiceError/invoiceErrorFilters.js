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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  getInvoiceErrorsFiltered, getInvoiceErrors } from '../../redux/actions-invoiceErrors'
import { useLocation, useNavigate } from "react-router-dom";


const InvoiceErrorFilters = ({user, sellers}) => {
  
  const dispatch = useDispatch()
  const [errores, setErrores] = useState('')
  const navigate = useNavigate()
  const location = useLocation();
  const searchParams = new URLSearchParams();
  const queryString = location.search
  const url = new URLSearchParams(queryString);
  const getParamsSellerId = url.get('seller')
  const getParamsType = url.get('type')
  const getParamsNumber = url.get('number')
  const [filter, setFilter] = useState({
    user: user,
    sellerID: getParamsSellerId ? getParamsSellerId : '',
    type: getParamsType ? getParamsType : '',
    number: getParamsNumber ? getParamsNumber : ''
  })

  let handleClickSeller = (e) => {
    const sellerIdTarget = e.target.value
    searchParams.set('seller', sellerIdTarget)
    searchParams.set('type', filter.type)
    searchParams.set('number', filter.number)
    navigate(`?${searchParams.toString()}`)
    setFilter({...filter, sellerID: sellerIdTarget})
    dispatch(getInvoiceErrorsFiltered({...filter, sellerID: sellerIdTarget}))
  }
  let handleClickType = (e) => {
    const typeTarget = e.target.value
    searchParams.set('seller', filter.sellerID)
    searchParams.set('type',typeTarget)
    searchParams.set('number', filter.number)
    navigate(`?${searchParams.toString()}`)
    setFilter({...filter, type: typeTarget})
    dispatch(getInvoiceErrorsFiltered({...filter, type: typeTarget}))
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
    const numberTarget = e.target.value
    if(numberTarget.length){
      validateInput(e)
      if(!errores.length){
        searchParams.set('seller', filter.sellerID)
        searchParams.set('type', filter.type)
        searchParams.set('number', numberTarget)
        navigate(`?${searchParams.toString()}`)
        setFilter({...filter, number: numberTarget})
        dispatch(getInvoiceErrorsFiltered({...filter, number: numberTarget }))
      }
    } else {
      searchParams.delete('number')
      searchParams.set('seller', filter.sellerID)
      searchParams.set('type', filter.type)
      navigate(`?${searchParams.toString()}`)
      setFilter({...filter, number: ''})
      dispatch(getInvoiceErrorsFiltered({...filter, number: ''}))
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

  useEffect(() => {
    dispatch(getInvoiceErrorsFiltered(filter))
  }, [])

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
                  mb={'0.5vh'}
                  w={'12vw'}
                  minH={'4.5vh'}
                  variant="unstyled"
                  textColor={'web.text2'}
                  _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
                  size={"sm"}
                  borderBottomWidth={"2px"}
                  borderBottomColor={'web.text2'}
                  _hover={{borderColor: 'web.border'}}
                  cursor={'pointer'}
                  value={filter.sellerID}
                  display={user[0].Secction7Flag === 1 ? 'unset' : 'none'}
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
              (user[0].Secction7Flag === 1) ?
                <Select
                  onChange={(e)=>handleClickType(e)}
                  mb={'0.5vh'}
                  w={'12vw'}
                  minH={'4.5vh'}
                  variant="unstyled"
                  textColor={'web.text2'}
                  _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
                  size={"sm"}
                  borderBottomWidth={"2px"}
                  borderBottomColor={'web.text2'}
                  _hover={{borderColor: 'web.border'}}
                  cursor={'pointer'}
                  value={filter.type}
                  display={user[0].Secction7Flag === 1 ? 'unset' : 'none'}
                >
                  <option value={''} className="options">Select Type</option>
                  <option value={'Order'} className="options">Orders</option>
                  <option value={'Quote'} className="options">Quotes</option>
                  <option value={'Freight'} className="options">Freight</option>
                </Select>
                : 
                null
              }
            <Divider orientation={'vertical'} h={'5vh'} display={user[0].Secction7Flag === 1 ? 'unset' : 'none'}/>
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