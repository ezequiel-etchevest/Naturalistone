import { 
    Box, 
    HStack, 
    Input, 
    IconButton,
    Divider,
    Tooltip,
    Select,
    } from "@chakra-ui/react";
  import { SearchIcon } from '@chakra-ui/icons';
  import { useDispatch, useSelector } from 'react-redux'
  import { useEffect, useState } from "react";
  import '../../assets/styleSheet.css';
  import {AiOutlineClear} from 'react-icons/ai';
  import CreateSampleModal from './createSample/CreateSampleModal';
  import { useLocation, useNavigate } from "react-router-dom";
import { getCustomers } from "../../redux/actions-customers";
import { getSamples } from "../../redux/actions-samples";
  
  const SamplesFilters = ({sellers, samples, user, setLoading}) => {
    
    const sellerDinamic = user[0].Secction7Flag === 1 ? '3' : user[0].SellerID

    const [inputValues, setInputValues] = useState({
      searchSample: '',
      selectSeller: sellerDinamic
    })
  
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const customers = useSelector(state => state.customers)

    useEffect(() => {
      if(!customers.length){
        dispatch(getCustomers('',''))
      }
    },[])

    // const location = useLocation();
    // const searchParams = new URLSearchParams();
    // const queryString = location.search
    // // const url = new URLSearchParams(queryString);
    // const getParamsCustomer = url.get('samples')  
    const handleInput = (e) => {
      setLoading(true)
      const { name, value } = e.target
      if(value.length){
        // searchParams.set('samples', samples)
        setInputValues({
          ...inputValues,
          [name]: value
        })
        dispatch(getSamples(value, inputValues.selectSeller))
      setLoading(false)
      } else {
      setLoading(true)
        // searchParams.delete('samples')
        setInputValues({
          searchSample: '',
          selectSeller: inputValues.selectSeller
        })
        dispatch(getSamples(inputValues.searchSample, inputValues.selectSeller))
      }
        // navigate(`?${searchParams.toString()}`)
    }

    const validateSeller = () => {
      if(user[0].Secction7Flag === 1) return true
      else return false
    }

    const handleSellerSelect = (e) => {
      setLoading(true)
      const { name, value } = e.target
      setInputValues({
        ...inputValues,
        [name]: value
      }
      )
      dispatch(getSamples(inputValues.searchSample || '', value))
    }
  
    const handleClear = () => {
      setLoading(true)
      setInputValues({
        searchSample: '',
        selectSeller: sellerDinamic
      })
      dispatch(getCustomers(''))
      dispatch(getSamples('', sellerDinamic))
    }

    useEffect(() => {
      dispatch(getSamples(inputValues.searchSample || '', inputValues.selectSeller))
    }, [inputValues])
    
    return (
      <Box>
        <HStack
        pt={'2vh'}
        ml={'2vw'}
        mr={'2vw'} 
        h={'17vh'}
        w={'80vw'}
        justifyContent={'space-between'}
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
            w={'20vw'}
            h={'10vh'}
            ml={'1vw'}
            >
              <Input
              mb={'0.5vh'}
              w={'80%'}
              minH={'4.5vh'}
              variant="unstyled"
              placeholder={'Search by name/company'}
              textColor={'web.text2'}
              name={"searchSample"}
              _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              value={inputValues.searchSample}
              onChange={(e)=> handleInput(e)}
              className="mailInputs"
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
              display={validateSeller() === true ? 'unset' : 'none' }
              mb={'0.5vh'}
              w={'10vw'}
              name={"selectSeller"}
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
              <option value='3' className="options">All seller</option>
              {  
                  sellers?.map((e, i) => {
                    if(e.SellerID !== 3){
                      return(
                        <option key={i} className={'options'} value={e.SellerID}>{e.FirstName} {e.LastName}</option>
                        )
                    }
                     })
              }
            </Select>
          </Box>
          <Box 
          w={'28vw'} 
          display={'flex'} 
          justifyContent={'flex-end'}
          >  
            <CreateSampleModal customers={customers} sellers={sellers} samples={samples}/>
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
          </Box>    
        </HStack>
      </Box>
      )
  }
  
  export default SamplesFilters