import {Box, Spinner, Center} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import SamplesList from './SamplesList';
import SamplesFilters from './SamplesFilters';

const SamplesContainer = ({samples, user, sellers, loading}) => {
    const sellerDinamic = user[0].Secction7Flag === 1 ? '3' : user[0].SellerID

        return(
            <Box
              userSelect={'none'}
              ml={'16vw'}
              bg={'web.bg'}> 
                <SamplesFilters
                  samples={samples}
                  sellers={sellers}
                  user={user}
                  sellerDinamic={sellerDinamic}
                  />
                <SamplesList 
                  samples={samples}
                  user={user}
                  loading={loading}
                  sellerDinamic={sellerDinamic}
                  />
            </Box>
        )
}
export default SamplesContainer;