import {
    Box,
    Flex,
    Stat,
    StatLabel,
    StatNumber,
    HStack,
    useDisclosure
  } from '@chakra-ui/react';
import { FaHandsHelping } from 'react-icons/fa';
import { BsCreditCardFill } from 'react-icons/bs';
import { HiReceiptPercent } from 'react-icons/hi2';
import PaymentsModal from './paymentsModal';


  
function StatsCard(props) {

  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
    
  const { title, stat, icon, filters } = props;

  return (
    <>
      <Stat
        w={'10vw'}
        h={'16vh'}
        px={{ base: 2, md: 4 }}
        py={'5'}
        border={'1px solid'}
        borderColor={'web.border'}
        rounded={'md'}
        color={'web.text'}
        _hover={{
          bg: 'logo.orange',
          color: 'web.text',
          cursor: 'pointer',
        }}
        onClick={onOpen1}
      >
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
      <PaymentsModal isOpenModal={isOpen1} onCloseModal={onClose1} filters={filters}/>
    </>
    );
  }
  
export default function TotalStats({stats, filters}) {

  return (
    <Box h={'92vh'} px={'4vw'} bg={'web.bg'} >
      <HStack columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
        title={'Closing Rate'}
        stat={stats.ClosingRate}
        icon={<FaHandsHelping size={'3em'} />}
        filters={filters}/>
        <StatsCard
        title={'Payments Amount'}
        stat={Number(stats.TotalCharged)}
        icon={<BsCreditCardFill size={'3em'} />}
        filters={filters}/>
        <StatsCard
        title={'Closing Days (Avg)'}
        stat={stats.ClosingDaysAvg}
        icon={<HiReceiptPercent size={'3em'} />}
        filters={filters}/>
      </HStack>
    </Box>
    );
  }