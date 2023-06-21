import {
    Box,
    Text,
  } from '@chakra-ui/react'
import TableFreightList from './tableFreightList';



const FreightFactoryList = ({freights_factory}) => {

    return(
        <Box
        display={'flex'}
        justifyContent={'center'}
        >
          <Box
            maxHeight={'36vh'}
            overflow={'auto'}
            css={{
              '&::-webkit-scrollbar': {
                width: '0.2vw',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#E47424',
                borderRadius: '5px',
              },
            }}
            pl={'2vh'}
            pr={'2vh'}
            bg={'web.sideBar'}           
            >
            <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Text fontSize={'xl'} color={'web.text2'}>Freight Orders</Text>
            </Box>
              <TableFreightList freights_factory={freights_factory}/>
            </Box> 
        </Box>
    )
}
export default FreightFactoryList;