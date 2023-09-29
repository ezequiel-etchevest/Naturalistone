import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
		Center,
    RangeSliderMark,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux'
import { getFiltered }  from "../../redux/actions-products";
import { useEffect } from 'react';

let SqftSlider = ({setFilters, filters, limit, setLimit, valueDefault, setValueDefault, values}) =>{
    
    const dispatch = useDispatch()
   
    const handleSqft = (e) => {
        setLimit(e);
        setFilters({
          ...filters,
          sqft: e
        })  
      }
      // useEffect(() => {
      //   setValueDefault(valueDefault)
      // },[values])

    return(
			<Center
				rounded={'md'} 
				bg={'web.sideBar'} 
				border={'1px solid'} 
				borderColor={'web.border'}
				w={'26vw'}
        position={"relative"}
        zIndex={2}
        >
        <RangeSlider 
            aria-label={['min', 'max']}
            colorScheme={'orange'}
            value={filters.sqft}
            position={"relative"}
            onChangeEnd={(val) => {
              dispatch(getFiltered(filters.finish, filters.size, filters.thickness,filters.material, filters.search, val, filters.type))}}
            onChange={(e) => handleSqft(e)}
            w={'15vw'}
            defaultValue={valueDefault}
            min={valueDefault[0]}
            max={valueDefault[1]}
            step={15}
            h={'4vh'}
            >
            <RangeSliderTrack bg={'web.text2'} h={'0.3vh'}>
              <RangeSliderFilledTrack/>
            </RangeSliderTrack>
            <RangeSliderThumb
							boxSize={'1.4vh'} 
              bg={'logo.orange'} 
              position={"relative"}
              index={0}           
              _focus={{
                borderColor: 'logo.orange',
                boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
              }}
              >
              <RangeSliderMark
                fontWeight={'normal'}
                bg={'web.sideBar'}
                color="web.text2"          
                fontSize={'0.8vw'}
                ml="-62px"
                w={'45px'}
                textAlign={'center'}
                value={limit[0]}
                >{limit[0]}
              </RangeSliderMark>
            </RangeSliderThumb>
            <RangeSliderThumb 
                index={1}
								boxSize={'1.4vh'}  
                bg={'logo.orange'}
                _focus={{
                  borderColor: 'logo.orange',
                  boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
                }}>  
              <RangeSliderMark
                fontWeight={'normal'}
                bg={'web.sideBar'}
                color="web.text2"
                fontSize={'0.8vw'}
                ml="22px"
                w={'45px'}
                textAlign={'center'}
                value={limit[1]}
                >{limit[1]}
              </RangeSliderMark>
            </RangeSliderThumb>
          </RangeSlider>
					</Center>
    )
}

export default SqftSlider