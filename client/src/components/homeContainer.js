import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrentMonthStats from './stats/CurrentMonthStats';
import { Highlight, chakra, Box, Spinner, Center } from '@chakra-ui/react';
import TotalStats from "./stats/TotalStats";
import PaymentsStats from "./stats/PaymentsStats";
import FilterStats from "./stats/filterStats";
import { getStats } from "../redux/actions-stats";
import { cleanStats } from "../redux/actions-statsByMonth";
import { useLocation } from "react-router-dom";

const HomeContainer = ({user}) => {

  const dispatch = useDispatch()
  const stats = useSelector(state => state.stats)
  const location = useLocation();
  const queryString = location.search;
  const searchParams = new URLSearchParams(queryString);
  const getParamsSellerID = searchParams.get('SellerID')
  const getParamsMonth = searchParams.get('Month')
  const getParamsYear = searchParams.get('Year')
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear();


  const [filters, setFilters] = useState({
    SellerID: getParamsSellerID ? getParamsSellerID : user[0].SellerID,
    Month: getParamsMonth ? getParamsMonth : currentMonth,
    Year: getParamsYear ? getParamsYear : currentYear,
  });

  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if(user.length && Object.entries(stats).length === 0){
      dispatch(getStats(filters))
    }
    return ()=>{cleanStats()}
  }, [])

  useEffect(() => {
    if(Object.entries(stats).length > 0) {
      setSpinner(false)
    } else {
      setSpinner(true)
    }
  },[stats])
  

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
        <Box 
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'flex-end'}
          h={'20vh'}
          mb={'1vw'}
          mr={'1.5vw'}
          >
          <FilterStats 
          user={user}
          years={stats.YearsInvoices}
          filters={filters}
          setFilters={setFilters}
          setSpinner={setSpinner}
          />
        </Box>
        {
          Object.entries(stats).length !== 0 && spinner === false ? (
           <>
            <CurrentMonthStats currentMonth={filters.Month} user={user} stats={stats}/>
            <TotalStats user={user} stats={stats} filters={filters}/>
            <PaymentsStats user={user} stats={stats} filters={filters}/>
           </> 

          ):(
            <Center w={'84vw'} bg={'web.bg'} h={'40vh'}>
            <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
          </Center>
          )
        }


      </Box> 
      </>
    )

  }
export default HomeContainer;