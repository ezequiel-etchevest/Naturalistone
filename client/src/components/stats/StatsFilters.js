import { 
  Box, 
    HStack, 
    Select,
    } from "@chakra-ui/react";
import '../../assets/styleSheet.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getSellers } from "../../redux/actions-sellers";
import { getMonthAndYear, getPaymentStatsByMonth } from "../../redux/actions-statsByMonth";
import { getSellerId } from "../../redux/actions-sellerId";
import { getPaymentByMonth } from "../../redux/actions.paymentsByMonth";
  
const StatsFilters = ({user}) => {
    
  const dispatch = useDispatch()
  const sellers = useSelector(state => state.sellers)
  const selectedMonth = useSelector(state => state.monthFilter)
  const selectedYear = useSelector(state => state.yearFilter)

  const handleSellerSelect = (e) => {
    if(e.target.value === 'all') {
      dispatch(getSellerId(3))
      dispatch(getMonthAndYear(3, selectedMonth, selectedYear))
      dispatch(getPaymentStatsByMonth(3, selectedMonth, selectedYear))
      dispatch(getPaymentByMonth(3, selectedMonth, selectedYear))
    }
    else {
      dispatch(getSellerId(e.target.value))
      dispatch(getMonthAndYear(e.target.value, selectedMonth, selectedYear))
      dispatch(getPaymentStatsByMonth(e.target.value, selectedMonth, selectedYear))
      dispatch(getPaymentByMonth(e.target.value, selectedMonth, selectedYear))
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
      h={'17vh'}
      w={'12vw'}
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
            mb={'0.5vh'}
            w={'15vw'}
            minH={'4.5vh'}
            variant="unstyled"
            textColor={'web.text2'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
            size={"sm"}
            borderBottomWidth={"2px"}
            borderBottomColor={'web.text2'}
            _hover={{borderColor: 'web.border'}}
            cursor={'pointer'}
          >
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
      </HStack>
    </Box>
      )
  }
  
  export default StatsFilters