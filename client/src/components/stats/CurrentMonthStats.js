import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  HStack
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { BiDollar } from 'react-icons/bi';
import { FaSortAmountUpAlt } from 'react-icons/fa';
import { TbReceiptTax } from 'react-icons/tb';
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

export default function Stats() {

  const currentMonth = useSelector(state => state.current_month)
  const paymentStats = useSelector(state => state.payment_stats)
  const month = useSelector(state => state.month)
  
  console.log(paymentStats)
  useEffect(()=>{},[currentMonth, paymentStats])

  let InvoicesNumber = `${currentMonth.InvoicesNumber} / ${paymentStats.paidQuotes}`
  return (
    <Box h={'92vh'} px={'4vw'} bg={'web.bg'} >
      <HStack columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={month}
          stat={currentMonth.TotalValue}
          icon={<BiDollar size={'3em'} />}
        />
        <StatsCard
          title={'Current Month Quotes / Paid'}
          stat={InvoicesNumber}
          icon={<FaSortAmountUpAlt size={'3em'} />}
        />
        <StatsCard
          title={'Monthly Sales (Avg)'}
          stat={currentMonth.AverageAmount}
          icon={<TbReceiptTax size={'3em'} />}
        />
      </HStack>
    </Box>
  );
}