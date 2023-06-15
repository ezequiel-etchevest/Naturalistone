import {Box, Text} from '@chakra-ui/react';
import FreightsList from './freightsList'

const FreightsContainer = ({freights}) => {

    return(
        <Box
        ml={'16vw'}
        bg={'web.bg'}
        userSelect={'none'}> 
            <FreightsList freights={freights}/>
        </Box>
    )
}

export default FreightsContainer;