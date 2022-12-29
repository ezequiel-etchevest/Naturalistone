import CurrentMonthStats from './stats/Stats';
import { Highlight, chakra, Box } from '@chakra-ui/react';

const HomeContainer = ({currentMonth}) => {

  return(
    <>
      <Box h={'92vh'} ml={'20vw'} bg={'web.bg'} display={'flex'} flexDir={'column'}>
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
        {/* <Box 
          h={'79vh'} 
          p={'3vh'} 
          display={'flex'} 
          justifyContent={'center'}>
        <Box 
          display={'flex'} 
          flexDir={'column'} 
          w={'35vw'} 
          maxH={'50vh'} 
          justifyContent={'space-between'}  
          mr={'2vh'}>
        <BarChart/>
        <CurrentMonthStats currentMonth={currentMonth}/> */}
        <CurrentMonthStats currentMonth={currentMonth}/>
        {/* </Box>
        <Box 
          display={'flex'} 
          flexDir={'column'} 
          w={'35vw'} 
          maxH={'50vh'}
          justifyContent={'space-between'} 
          ml={'2vh'}>
        <CurrentMonthStats currentMonth={currentMonth}/>
        <PieChart/>
        </Box>
        </Box>*/}
      </Box> 
      </>
    )
}
export default HomeContainer;