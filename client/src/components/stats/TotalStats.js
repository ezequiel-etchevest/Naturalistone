import {
    Box,
    Flex,
    Stat,
    StatLabel,
    StatNumber,
    HStack
  } from '@chakra-ui/react';
import { FaHandsHelping } from 'react-icons/fa';
import { BsCreditCardFill } from 'react-icons/bs';
import { HiReceiptPercent } from 'react-icons/hi2';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
  
function StatsCard(props) {
    
  const { title, stat, icon } = props;
  
  return (
    <Stat
    w={'10vw'}
    px={{ base: 2, md: 4 }}
    py={'5'}
    border={'1px solid'}
    borderColor={'web.border'}
    rounded={'md'}
    color={'web.text'}
    _hover={{
        bg: 'logo.orange',
        color: 'web.text'
    }}>
    <Flex justifyContent={'space-between'}>
      <Box pl={{ base: 2, md: 6 }}>
        <StatLabel fontWeight={'medium'} >
          {title}
        </StatLabel>
        <StatNumber fontSize={'4xl'} fontWeight={'medium'} >
          {stat?.toLocaleString('en-US')} 
        </StatNumber>
      </Box>
      <Box
        my={'auto'}
        color={'web.text'}
        alignContent={'center'}
        >
        {icon}
      </Box>
    </Flex>
  </Stat>
    );
  }
  
export default function TotalStats() {

  const paymentStats = useSelector(state => state.payment_stats)
  useEffect(()=>{},[paymentStats])

  return (
    <Box h={'92vh'} px={'4vw'} bg={'web.bg'} >
      <HStack columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
        title={'Closing Rate'}
        stat={paymentStats.closingRate}
        icon={<FaHandsHelping size={'3em'} />}
        />
        <StatsCard
        title={'Payments Amount'}
        stat={paymentStats.totalCharged}
        icon={<BsCreditCardFill size={'3em'} />}
        />
        <StatsCard
        title={'Closing Days (Avg)'}
        stat={paymentStats.closingDaysAvg}
        icon={<HiReceiptPercent size={'3em'} />}
        />
      </HStack>
    </Box>
    );
  }