import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import FreightDetailList from "./freightDetailList";
import FreightFactoryList from "./freightFactoryList";

const FreightDetails = ({freight, freights_factory}) => {

  return(
    <Box
      bg={'web.bg'}  
      ml={'16vw'} 
      h={'92vh'}
      display={'flex'}
      flexDir={'column'}
      >
      <Box
        display={'flex'}
        flexDir={'column'}
      >
        <Box
          display={'flex'}
          flexDir={'row'}
        >
          {
              Object.entries(freight).length ? (
              <FreightDetailList freight={freight}/>
              ):(
              <Center ml={'16vh'} bg={'web.bg'} h={'92vh'}>
                <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
              </Center>
             )
            }
        </Box>
      <Box
        mt={'3vh'}
        ml={'2vw'}
        mr={'2vw'}
        pt={'1.5vw'}
        pb={'1.5vw'} 
        border={'1px solid'} 
        rounded={'md'} 
        borderColor={'web.border'} 
        bg={'web.sideBar'}
        h={'40vh'}
        w={'70vw'}
        >
        {
          freights_factory.length ? (
            <FreightFactoryList freights_factory={freights_factory}  />
          ) : (
            <Center w={'full'} h={'full'}>
            <Text userSelect={'none'} color={'web.border'} fontSize={'2.3vh'}>No products linked to this order</Text>
            </Center>
          )
        }
        </Box>
        </Box>
        </Box>	
      )
  }

export default FreightDetails;
