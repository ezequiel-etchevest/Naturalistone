import { 
  Box, 
    HStack, 
    IconButton,
    Select,
    Divider,
    Tooltip,
    } from "@chakra-ui/react";
import '../../assets/styleSheet.css';
import {AiOutlineClear} from 'react-icons/ai';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getSellers } from "../../redux/actions-sellers";
import { getCurrentMonth, getPaymentStats } from "../../redux/actions-stats";
import { months } from "../../utils/months";
import { getMonthAndYear, getPaymentStatsByMonth } from "../../redux/actions-statsByMonth";
import { years } from "../../utils/years";
import { getMonth } from "../../redux/actions-month";
  
const StatsFilters = ({user}) => {
    
  const dispatch = useDispatch()
  const sellers = useSelector(state => state.sellers)
  const month = useSelector(state => state.month)
  // const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedSellerId, setSelectedSellerId] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  const handleSellerSelect = (e) => {
    if(e.target.value === 'all') {
      dispatch(getCurrentMonth(3, 1))
      dispatch(getPaymentStats(3, 1))
    }
    else {
      setSelectedSellerId(e.target.value)
      dispatch(getCurrentMonth(Number(e.target.value), 0))
      dispatch(getPaymentStats(Number(e.target.value), 0))
    }
    }

  const handleSellerByMonth = (e) => {
    // setSelectedMonth(e.target.value)
    const monthValue = e.target.value
    const monthName = months[monthValue -1]
    dispatch(getMonth(monthName))
    dispatch(getMonthAndYear(selectedSellerId, e.target.value, selectedYear))
    dispatch(getPaymentStatsByMonth(selectedSellerId, e.target.value, selectedYear))
  }

  const handleSelectYear = (e) => {
    setSelectedYear(e.target.value)
    dispatch(getMonthAndYear(selectedSellerId, month, e.target.value))
    dispatch(getPaymentStatsByMonth(selectedSellerId, month, e.target.value))
  }

  useEffect(()=>{
    if(!sellers.length) dispatch(getSellers())
    },[sellers])

  const year = years();

    
  return (
    <Box>
      <HStack
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
        </Box>
      {/*Selects */}
        <Box 
        w={'20vw'} 
        display={'flex'}
        justifyContent={'flex-end'}
        > 
          <Select
          defaultValue=""
          onChange={(e)=>handleSellerSelect(e)}
          w={'15vw'}
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
            <option value="" disabled hidden>Filter by Seller</option>
            <option value={'all'} className="options">All seller</option>
              {  
                  sellers?.map((e, i) => {
                    if(e.SellerID != 3){
                      return(
                        <option key={i} className={'options'} value={e.SellerID}>{e.FirstName} {e.LastName}</option>
                        )
                    }
                     })
              }
            </Select>
          </Box>
          <Box 
            w={'18vw'} 
            display={'flex'}
            justifyContent={'flex-end'}
          > 
          <Select
          defaultValue=""
          onChange={(e)=>handleSellerByMonth(e)}
          w={'15vw'}
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
            <option value="" disabled hidden>Filter by Months</option>
              {  
                  months?.map((e, i) => {
                      return(
                        <option key={i} className={'options'} name={e} value={i+1}>{e}</option>
                        )
                     })
              }
          </Select>
          </Box>
          <Box 
            w={'10vw'} 
            display={'flex'}
            justifyContent={'flex-end'}
          > 
          <Select
          defaultValue=""
          onChange={(e)=>handleSelectYear(e)}
          w={'10vw'}
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
            <option value="" disabled hidden>Filter by Year</option>
              {  
                  year?.map((e, i) => {
                      return(
                        <option key={i} className={'options'} value={e}>{e}</option>
                        )
                     })
              }
          </Select>
          </Box>
          <Divider orientation={'vertical'} h={'5vh'}/>
          <Tooltip placement={'bottom-start'} label={'Clear all filters'} fontWeight={'hairline'}>      
            <IconButton
            disabled={true}
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
  
  export default StatsFilters