import { 
  Box, 
  HStack, 
  Select,
  Divider,
  IconButton,
  Tooltip
    } from "@chakra-ui/react";
import {AiOutlineClear} from 'react-icons/ai';
import '../../assets/styleSheet.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSellers } from "../../redux/actions-sellers";
import { months } from "../../utils/months";
import { getStats } from "../../redux/actions-stats";
import { cleanStats } from "../../redux/actions-statsByMonth";
import { useLocation, useNavigate } from 'react-router-dom';
  
const FilterStats = ({user, setFilters, filters, years, handleClear}) => {
    
  const dispatch = useDispatch()
  const sellers = useSelector(state => state.sellers)
  const navigate = useNavigate();  
  const location = useLocation();
  const queryString = location.search;
  const url = new URLSearchParams(queryString);
  const searchParams = new URLSearchParams();
  const getParamsYear = url.get('Year')
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear();
  const year = getParamsYear ? getParamsYear : currentYear

  const handleSelectMonth = (e) =>{
    const selectedMonth = e.target.value
    setFilters({
      ...filters,
      Month: selectedMonth
    })

    searchParams.set('SellerID', filters.SellerID)
    searchParams.set('Month', selectedMonth)
    searchParams.set('Year', filters.Year)

    navigate(`?${searchParams.toString()}`);

    dispatch(cleanStats())

    dispatch(getStats({...filters, Month: selectedMonth}))
  }
  const handleSelectYear = (e) => {
    const selectedYear = e.target.value
    setFilters({
      ...filters,
      Year: selectedYear
    })

    searchParams.set('SellerID', filters.SellerID)
    searchParams.set('Month', filters.Month)
    searchParams.set('Year', selectedYear)

    navigate(`?${searchParams.toString()}`);

    dispatch(cleanStats())

    dispatch(getStats({...filters, Year: selectedYear}))
  }


  const handleSelectSeller = (e) => {
    const selectedSeller = e.target.value
    if(e.target.value === 'all') {
      setFilters({
        ...filters,
        SellerID: 3
      })
      searchParams.set('Month', filters.Month)
      searchParams.set('Year', filters.Year)
      navigate(`?${searchParams.toString()}`);
      dispatch(cleanStats())
      dispatch(getStats({...filters, SellerID: 3 }))
    }
    else {      
      setFilters({
        ...filters,
        SellerID: selectedSeller
      })
      searchParams.set('SellerID', selectedSeller)
      searchParams.set('Month', filters.Month)
      searchParams.set('Year', filters.Year)
      navigate(`?${searchParams.toString()}`);
      
      dispatch(cleanStats())
      dispatch(getStats({...filters, SellerID: e.target.value}))
    }
    }

  useEffect(()=>{
    if(!sellers.length) dispatch(getSellers())
    },[sellers])

    
  return (
    <Box>
      <HStack
      ml={'2vw'}
      mr={'2vw'} 
      h={'10vh'}
      justifyContent={'space-between'}
      >
      {/*Selects */}
        <Box 
        w={user[0].Secction7Flag === 1 ? '30vw':'15vw'} 
        display={'flex'}
        justifyContent={user[0].Secction7Flag === 1 ? 'space-between' : 'flex-end'}
        mr={'1vw'} 
        >
        {/*Filter by seller */}
        {
          user[0].Secction7Flag === 1 ? (
            <Select
            onChange={(e)=>handleSelectSeller(e)}
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
            value={filters.SellerID}
          >
            <option value="" disabled hidden>Filter by Seller</option>
            <option value={'all'} className="options">All seller</option>
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
          ):(null)
        }
        {/*Filter by month */} 
        <Select
          onChange={(e)=>handleSelectMonth(e)}
          mb={'0.5vh'}
          w={'9vw'}
          minH={'4.5vh'}
          variant="unstyled"
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
          size={"sm"}
          borderBottomWidth={"2px"}
          borderBottomColor={'web.text2'}
          cursor={'pointer'}
          _hover={{borderColor: 'web.border'}}
          value={filters.Month}
          >
          <option value={''} disabled hidden>Filter by Month</option>
            {  
              months?.map((e, i) => {
                return(
                  <option key={i} className={'options'} value={i+1}>{e}</option>
                      )
                     })
              }
        </Select>
        {/*Filter by year */} 
        <Select
          onChange={(e)=>handleSelectYear(e)}
          mb={'0.5vh'}
          w={'9w'}
          minH={'4.5vh'}
          variant="unstyled"
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
          size={"sm"}
          borderBottomWidth={"2px"}
          borderBottomColor={'web.text2'}
          cursor={'pointer'}
          _hover={{borderColor: 'web.border'}}
          value={filters.Year}
          > 
          <option value='' disabled hidden >Filter by Year</option>
            {  
              years?.map((e, i) => {
                return(
                  <option key={i} className={'options'} value={e.dates}>{e}</option>
                  )
                })
            }
          </Select>
        </Box>
        <Divider orientation={'vertical'} h={'5vh'}/>
          <Tooltip placement={'bottom-start'} label={'Clear all filters'} fontWeight={'hairline'}>      
            <IconButton
            onClick={() => handleClear()}
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
            >
            </IconButton>
          </Tooltip>   
      </HStack>
    </Box>
      )
  }
  
  export default FilterStats