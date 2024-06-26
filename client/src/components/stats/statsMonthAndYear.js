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
import { months } from "../../utils/months";
import { getMonthAndYear, getPaymentStatsByMonth } from "../../redux/actions-statsByMonth";
import { getMonth } from "../../redux/actions-month";
import { getMonthFilter } from "../../redux/actions-monthFilter";
import { getYearFilter } from "../../redux/actions-yearFilter";
import { getPaymentByMonth } from "../../redux/actions.paymentsByMonth";
  
const StatsFilterByMonthAndYear = ({user}) => {
    
  const dispatch = useDispatch()
  const sellers = useSelector(state => state.sellers)
  const sellerFilterId = useSelector(state => state.sellerId)
  const selectedMonth = useSelector(state => state.monthFilter)
  const selectedYear = useSelector(state => state.yearFilter)
  const seller = useSelector(state => state.user)
  const sellerId = seller[0].SellerID
  const years = useSelector(state => state.current_month)

  const handleSellerByMonth = (e) => {
    const monthValue = e.target.value
    const monthName = months[monthValue -1]
    dispatch(getMonth(monthName))
    dispatch(getMonthFilter(e.target.value))
  }

  const handleSelectYear = (e) => {
    dispatch(getYearFilter(e.target.value))
  }

  useEffect(()=>{
    if(!sellers.length) dispatch(getSellers())
    if(selectedMonth !== 0) {
      dispatch(getMonthAndYear(sellerFilterId ? sellerFilterId : sellerId, selectedMonth, selectedYear))
      dispatch(getPaymentStatsByMonth(sellerFilterId ? sellerFilterId : sellerId, selectedMonth, selectedYear))
      dispatch(getPaymentByMonth(sellerFilterId ? sellerFilterId : sellerId, selectedMonth, selectedYear))
    }
    },[sellers, selectedMonth, selectedYear])

 
  return (
    <Box>
      <HStack
      ml={'1.75vw'}
      mr={'2vw'} 
      h={'17vh'}
      w={'35vw'}
      justifyContent={'space-between'}
      spacing={'2vw'}
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
            w={'18vw'} 
            display={'flex'}
            justifyContent={'flex-end'}
          > 
            <Select
              defaultValue=""
              onChange={(e)=>handleSellerByMonth(e)}
              mb={'0.5vh'}
              w={'13vw'}
              minH={'4.5vh'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              cursor={'pointer'}
              _hover={{borderColor: 'web.border'}}
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
          </Box>
          <Box 
            w={'12vw'} 
            display={'flex'}
            justifyContent={'flex-end'}
          > 
          <Select
            defaultValue=""
            onChange={(e)=>handleSelectYear(e)}
            mb={'0.5vh'}
            w={'12vw'}
            minH={'4.5vh'}
            variant="unstyled"
            textColor={'web.text2'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
            size={"sm"}
            borderBottomWidth={"2px"}
            borderBottomColor={'web.text2'}
            cursor={'pointer'}
            _hover={{borderColor: 'web.border'}}
            > 
            <option value="" disabled hidden>Filter by Year</option>
              {  
                  years.invoiceDates?.map((e, i) => {
                      return(
                        <option key={i} className={'options'} value={e.dates}>{e.dates}</option>
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
  
  export default StatsFilterByMonthAndYear