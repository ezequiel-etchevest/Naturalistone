import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrentMonthStats from './stats/CurrentMonthStats';
import { Highlight, chakra, Box, Divider, HStack } from '@chakra-ui/react';
import StatsFilters from './stats/StatsFilters';
import { getMonthAndYear, getPaymentStatsByMonth } from "../redux/actions-statsByMonth";
import TotalStats from "./stats/TotalStats";
import StatsFilterByMonthAndYear from "./stats/statsMonthAndYear";


const HomeContainer = ({user}) => {
  const dispatch = useDispatch()
  const currentMonth = useSelector(state => state.current_month)
  const paymentStats = useSelector(state => state.payment_stats)

  useEffect(() => {
    if(user.length && Object.entries(currentMonth).length === 0){
      dispatch(getMonthAndYear(user[0].SellerID))
    }
    if(user.length && Object.entries(paymentStats).length === 0){
      dispatch(getPaymentStatsByMonth(user[0].SellerID))
    }
  }, [dispatch, user, paymentStats, currentMonth])


  return(
    <>
      <Box userSelect={'none'} h={'92vh'} ml={'16vw'} bg={'web.bg'} display={'flex'} flexDir={'column'}>
        <chakra.h1
          placeContent={'center'}
          textAlign={'center'}
          fontSize={'xl'}
          pt={'5vh'}
          mb={'6vh'}
          color={'web.text2'}
          fontWeight={'normal'}
          maxH={'17vh'}
          >
          <Highlight
            query={['ON THE GO!']}
            styles={{color: '#E47424' }}
            >
            CHECK YOUR STATS ON THE GO!
          </Highlight>
        </chakra.h1>
        <Divider alignSelf={'center'} w={'78vw'}/>
        {
          user[0].Secction7Flag === 1 ? (
            <Box 
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'flex-end'}
            h={'20vh'}
            >
              <StatsFilters user={user}/>
              <StatsFilterByMonthAndYear user={user}/>
            </Box>
          ):(
            <Box
            display={'flex'}
            justifyContent={'flex-end'}>
              <StatsFilterByMonthAndYear />
            </Box>
            )
        }
        <CurrentMonthStats user={user}/>
        <TotalStats user={user}/>
      </Box> 
      </>
    )
}
export default HomeContainer;