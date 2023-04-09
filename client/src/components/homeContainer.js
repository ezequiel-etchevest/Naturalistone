import CurrentMonthStats from './stats/Stats';
import { Highlight, chakra, Box, Divider } from '@chakra-ui/react';
import StatsFilters from './stats/StatsFilters';

const HomeContainer = ({currentMonth}) => {

  return(
    <>
      <Box userSelect={'none'} h={'92vh'} ml={'16vw'} bg={'web.bg'} display={'flex'} flexDir={'column'}>
        <chakra.h1
          placeContent={'center'}
          textAlign={'center'}
          fontSize={'4xl'}
          pt={'10vh'}
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
        <StatsFilters/>
        <CurrentMonthStats currentMonth={currentMonth}/>
        <CurrentMonthStats currentMonth={currentMonth}/>
      </Box> 
      </>
    )
}
export default HomeContainer;