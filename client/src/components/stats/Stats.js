import {
    Box,
    Flex,
    Stat,
    StatLabel,
    StatNumber,
    HStack
  } from '@chakra-ui/react';
  import { BiDollar } from 'react-icons/bi';
  import { FaSortAmountUpAlt } from 'react-icons/fa';
  import { TbReceiptTax } from 'react-icons/tb';

  
  function StatsCard(props) {
    
    const { title, stat, icon } = props;

    return (
      <Stat
        p={'2vh'}
        maxW={'11vw'}
        maxH={'16vh'}
        border={'1px solid'}
        borderColor={'web.border'}
        rounded={'md'}>
        <StatLabel 
          fontWeight={'small'} 
          fontSize={'1.7vh'} 
          color={'web.text2'} >
          {title}
        </StatLabel>
        <Flex justifyContent={'space-around'} my={'1vh'} >
          <StatNumber fontSize={'2xl'} fontWeight={'medium'} color={'web.text'} >
            {stat}
          </StatNumber>
          <Box
            my={'auto'}
            color={'web.text'}
            alignContent={'center'}
            fontSize={'xx-small'}
            >
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }
  
  export default function CurrentMonthStats({currentMonth}) {

    return (
        <Box maxW={'35vw'} maxH={'15vh'}>
        <HStack  
          spacing={'2vh'}
          >
          <StatsCard
            title={'Current Month Sales'}
            stat={currentMonth.TotalValue}
            icon={<BiDollar size={'3em'} />}
          />
          <StatsCard
            title={'Current Month Quotes'}
            stat={currentMonth.InvoicesNumber}
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