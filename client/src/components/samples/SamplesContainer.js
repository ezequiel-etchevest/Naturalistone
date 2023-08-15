import {Box, Spinner, Center} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import SamplesList from './SamplesList';
import SamplesFilters from './SamplesFilters';

const SamplesContainer = ({samples, user, focusFilter, setFocusFilter, sellers }) => {

    const [ spinner, setSpinner ] = useState(false)

    const handleSpinner = () => {
        setTimeout(()=>{ setSpinner(true)}, 500)
      }

    useEffect(()=>{
        handleSpinner()
      })

    if(spinner === true){
        return(
            <Box
              userSelect={'none'}
              ml={'16vw'}
              bg={'web.bg'}> 
                <SamplesFilters
                  samples={samples}
                  sellers={sellers}/>
                <SamplesList 
                  samples={samples}
                  user={user}/>
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