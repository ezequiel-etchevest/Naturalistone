import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Tooltip,
		Center,
    Text,
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
    const [value, setValue] = useState([0,0])

    const handlePrice = (e) => {
      searchParams.set('sqftMin', e[0])
      searchParams.set('sqftMax', e[1])
      searchParams.set('finish', filters.finish)
      searchParams.set('size', filters.size)
      searchParams.set('thickness', filters.thickness)
      searchParams.set('material', filters.material)
      searchParams.set('search', filters.search)
      navigate(`?${searchParams.toString()}`)
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
            zIndex={2}
            onChangeEnd={(val) => {
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
            <Tooltip
              label={limit[0]}
							fontWeight={'normal'}
              bg={'web.sideBar'}
              color="web.text2"
              placement={'left'}
              position={"relative"}
              index={2}   
              isOpen
							fontSize={'0.9vw'}
              >
              <RangeSliderThumb
								boxSize={'1.4vh'} 
                bg={'logo.orange'} 
                position={"relative"}
                index={0}           
                _focus={{
                  borderColor: 'logo.orange',
                  boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
                }}
                />
            </Tooltip>
            <Tooltip
							fontWeight={'normal'}
              label={limit[1]}
							bg={'web.sideBar'}
              color="web.text2"
              placement={'right'}
              isOpen
              fontSize={'0.9vw'}
              >
              <RangeSliderThumb 
                index={1}
								boxSize={'1.4vh'}  
                bg={'logo.orange'}
                _focus={{
                  borderColor: 'logo.orange',
                  boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
                }}  
                />
            </Tooltip>
          </RangeSlider>
					</Center>
    )
}

export default SqftSlider