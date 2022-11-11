import {
    Box,
    Flex,
    Stat,
    StatLabel,
    StatNumber,
    HStack,
    chakra,
    Highlight
  } from '@chakra-ui/react';
  import { BiDollar } from 'react-icons/bi';
  import { FaSortAmountUpAlt } from 'react-icons/fa';
  import { HiOutlineReceiptPercent } from 'react-icons/hi2';
  
  function StatsCard(props) {
    const { title, stat, icon } = props;
    return (
      <Stat
        w={'10vw'}
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'lg'}
        border={'1px solid'}
        borderColor={'gray.500'}
        rounded={'md'}
        _hover={{
            bg: '#E47424',
            color: 'white'
        }}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 6 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={'gray.700'}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }
  
  export default function Stats() {
    return (
      <Box  p={'4vw'} ml={'20vw'} >
        <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        color={'gray.700'}
        fontWeight={'normal'}
        fontFamily={'body'}>
        <Highlight
            query={['ON THE GO!']}
            styles={{ px: '2', py: '1', color: '#E47424' }}
            >
        CHECK YOUR STATS ON THE GO!
        </Highlight>
      </chakra.h1>
        <HStack mt={'5vh'} columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Current Month Sales'}
            stat={'$5,000'}
            icon={<BiDollar size={'3em'} />}
          />
          <StatsCard
            title={'Current Month Invoices'}
            stat={'10'}
            icon={<FaSortAmountUpAlt size={'3em'} />}
          />
          <StatsCard
            title={'Monthly Sales (Avg)'}
            stat={'$70.000'}
            icon={<HiOutlineReceiptPercent size={'3em'} />}
          />
        </HStack>
      </Box>
    );
  }