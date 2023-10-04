import {Box, Spinner, Center} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import SamplesList from './SamplesList';
import SamplesFilters from './SamplesFilters';

const SamplesContainer = ({samples, user, sellers }) => {
    const sellerDinamic = user[0].Secction7Flag === 1 ? '3' : user[0].SellerID

    const [ spinner, setSpinner ] = useState(false)

    const handleSpinner = () => {
        setTimeout(()=>{ setSpinner(true)}, 1000)
      }

    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        handleSpinner()
      }, [spinner])

    useEffect(() => {
      setTimeout(()=>{ setLoading(false)}, 1000)
    },[loading])

    if(spinner === true){
        return(
            <Box
              userSelect={'none'}
              ml={'16vw'}
              bg={'web.bg'}> 
                <SamplesFilters
                  samples={samples}
                  sellers={sellers}
                  user={user}
                  setLoading={setLoading}
                  sellerDinamic={sellerDinamic}
                  />
                <SamplesList 
                  samples={samples}
                  user={user}
                  loading={loading}
                  sellerDinamic={sellerDinamic}
                  />
            </Box>
        )}else{
            return(
              <Center ml={'16vw'} w={'84vw'} bg={'web.bg'} h={'92vh'}>
                <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
              </Center>
            )
          }
}
export default SamplesContainer;