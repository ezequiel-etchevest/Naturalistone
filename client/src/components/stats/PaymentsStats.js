import {
    Box,
    Flex,
    Stat,
    StatLabel,
    StatNumber,
    HStack,
    Spinner,
    useDisclosure,
  } from '@chakra-ui/react';
import { BsCreditCardFill } from 'react-icons/bs';
import { HiReceiptPercent } from 'react-icons/hi2';
import { MdOutlinePayments } from 'react-icons/md';
import PaymentsMadeModal from './paymentsMadeModal';
  
function StatsCard(props) {

  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
    
  const { title, stat, icon, visibility } = props;

  return (
    <>
    <Stat
    visibility={visibility}
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
        <StatNumber fontSize={'4xl'} fontWeight={'medium'}>
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
  <PaymentsMadeModal isOpenModal={isOpen1} onCloseModal={onClose1} />
  </>
    );
  }
  
export default function PaymentsStats({stats}) {


  return (
    <Box h={'92vh'} px={'4vw'} bg={'web.bg'} >
      <HStack columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
        title={'Payments'}
        stat={stats.TotalAmount === null ? 0 : Number(stats.TotalAmount.toFixed(2))}
        icon={<MdOutlinePayments size={'3em'} />}
        />
        <StatsCard
        visibility='hidden'
        display='none'
        title={'Payments Amount'}
        // stat={Number(paymentStats.totalCharged)}
        icon={<BsCreditCardFill size={'3em'} />}
        />
        <StatsCard
        visibility= 'hidden'
        title={'Closing Days (Avg)'}
        // stat={paymentStats.closingDaysAvg}
        //icon={<HiReceiptPercent size={'3em'} />}
        />
      </HStack>
    </Box>
    );
  }