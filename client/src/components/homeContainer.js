import CurrentMonthStats from './stats/Stats';
import { Highlight, chakra, Box } from '@chakra-ui/react';

const HomeContainer = ({currentMonth}) => {

  return(
    <>
      <Box userSelect={'none'} h={'92vh'} ml={'20vw'} bg={'web.bg'} display={'flex'} flexDir={'column'}>
        <chakra.h1
          placeContent={'center'}
          textAlign={'center'}
          fontSize={'4xl'}
          pt={'4vh'}
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
          <CurrentMonthStats currentMonth={currentMonth}/>
      </Box> 
      </>
    )
}
export default HomeContainer;