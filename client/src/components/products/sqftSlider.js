import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Tooltip,
		Center,
    Text,
    SliderMark,
    RangeSliderMark,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux'
import { getFiltered }  from "../../redux/actions-products";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

let SqftSlider = ({setFilters, filters, limit, setLimit, values}) =>{
    
    const dispatch = useDispatch()
    const searchParams = new URLSearchParams()
    const navigate = useNavigate()
    const [valueMax, setValueMax] = useState(values?.sqftMinMax?.max) 

    const handlePrice = (e) => {
        setLimit(e);
        setFilters({
          ...filters,
          sqft: e
        })  
      }

      useEffect(() => {
        setValueMax(values?.sqftMinMax?.max)
      },[values])
    
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
            onMouseUp={(val) => {
              dispatch(getFiltered(filters.finish, filters.size, filters.thickness,filters.material, filters.search, val, filters.type))}}
            onChange={(e) => handlePrice(e)}
            w={'15vw'}
            defaultValue={[values?.sqftMinMax?.min === undefined ? 0 : values?.sqftMinMax?.min, values?.sqftMinMax?.max]}
            min={values?.sqftMinMax?.min === undefined ? 0 : values?.sqftMinMax?.min }
            max={valueMax}
            step={15}
            h={'4vh'}
            >
            <RangeSliderTrack bg={'web.text2'} h={'0.3vh'}>
              <RangeSliderFilledTrack/>
            </RangeSliderTrack>
              
            {/* <Tooltip
              label={limit[0]}
							fontWeight={'normal'}
              bg={'web.sideBar'}
              color="web.text2"
              placement={'left'}
              position={"relative"}
              index={2}   
              isOpen
							fontSize={'0.9vw'}
              zIndex={0}
              > */}
              <RangeSliderThumb
								boxSize={'1.4vh'} 
                bg={'logo.orange'} 
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
              isOpen
              fontSize={'0.8vw'}
              ml="-62px"
              w={'45px'}
              textAlign={'center'}
              value={limit[0]}
              >{limit[0]}
            </RangeSliderMark>
            </RangeSliderThumb>
            {/* </Tooltip> */}
            {/* <Tooltip
							fontWeight={'normal'}
              label={limit[1]}
							bg={'web.sideBar'}
              color="web.text2"
              placement={'right'}
              isOpen
              fontSize={'0.9vw'}
              position={"relative"}
              zIndex={0}
              > */}
              <RangeSliderThumb 
                index={1}
								boxSize={'1.4vh'}  
                bg={'logo.orange'}
                _focus={{
                  borderColor: 'logo.orange',
                  boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
                }}  
                >
              <RangeSliderMark
                fontWeight={'normal'}
                bg={'web.sideBar'}
                color="web.text2"
                isOpen
                fontSize={'0.8vw'}
                ml="22px"
                w={'45px'}
                textAlign={'center'}
                value={limit[1]}
                >{limit[1]}
              </RangeSliderMark>
            </RangeSliderThumb>
            {/* </Tooltip> */}
          </RangeSlider>
					</Center>
    )
}

export default SqftSlider