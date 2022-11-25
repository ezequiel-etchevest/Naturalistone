import { 
  Box,
  Select, 
  HStack, 
  Input, 
  IconButton, 
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Tooltip
 } from "@chakra-ui/react";
import { useState } from "react";
import { SearchIcon } from '@chakra-ui/icons';
import '../../assets/styleSheet.css'

const ProductsFilters = ({allProducts, setFilteredProducts}) => {
  
    const [limit, setLimit] = useState([120, 240])
  
    const onChange = (val) => {
      setLimit(val);
    }

    const handleChangeProductID = (e) => {
 
    if(e.target.value.length) {
        const filteredByID = allProducts?.filter(prod => prod.ProdNameID.toString().includes(e.target.value))
        if(!filteredByID.length) return alert('No Products match this search')
        setFilteredProducts(filteredByID)
    } else {
        setFilteredProducts([])

    }
}

    const handleChangeProductName = (e) => {
 
    if(e.target.value.length){
        const filteredByName = allProducts?.filter(prod => prod.ProductName.toLowerCase().includes(e.target.value))
        if(!filteredByName.length) return alert('No Products match this search')
        setFilteredProducts(filteredByName)
    } else {
        setFilteredProducts([])
    }
}

  return (
    <>    
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        ml={'3vw'}
        pt={'10vh'}
        w={'74vw'}
        h={'20vh'} 
        >
        <HStack h={'10vh'} w={'54vw'} border={'solid red 2px'} spacing={'1.5vw'} >
          <Box display={'flex'} flexDir={'row'} w={'35vw'} justifyContent={'space-around'}>
          <Select 
            variant='outline' 
            w={'10vw'}
            h={'4vh'}            
            bg={'web.sideBar'}
            color={'web.text2'}
            borderColor={'web.border'}
            cursor={'pointer'}
            _focus={{
              borderColor: 'logo.orange',
              boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
            }}
            >              
            <option value='' className="options"> Select Type</option>
            <option value='tile' className="options">Tile</option>
            <option value='slab' className="options">Slab</option>
          </Select>
          <Select 
            variant='outline' 
            w={'10vw'}
            h={'4vh'}            
            bg={'web.sideBar'}
            color={'web.text2'}
            borderColor={'web.border'}
            cursor={'pointer'}
            _focus={{
              borderColor: 'logo.orange',
              boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
            }}
            >
            <option value='' className="options">Select Size</option>
            <option value='option1' className="options">24 x 24</option>
            <option value='option2' className="options">24 x 48</option>
            <option value='option3' className="options">48 x 48</option>
            <option value='option4' className="options">12 x 24</option>
            <option value='option5' className="options">1 x 1</option>
            <option value='option6' className="options">2 x 2</option>
            <option value='option7' className="options">120 x 50</option>
            <option value='option8' className="options">126 x 63</option>
            <option value='option9' className="options">127 x 64</option>
            <option value='option' className="options">128 x 65</option>
          </Select>
          <Select 
            variant='outline' 
            w={'12vw'}
            h={'4vh'}            
            bg={'web.sideBar'}
            color={'web.text2'}
            borderColor={'web.border'}
            cursor={'pointer'}
            _focus={{
              borderColor: 'logo.orange',
              boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
            }}
            >
            <option value='' className="options">Select Thickness</option>
            <option value='option10' className="options">3/4</option>
            <option value='option11' className="options">1/2</option>
            <option value='option12' className="options">1 1/4</option>
          </Select>
          </Box>
          <RangeSlider 
            aria-label={['min', 'max']}
            colorScheme={'orange'}
            onChangeEnd={(val) => console.log(val)}
            w={'14vw'}
            onChange={onChange}
            defaultValue={[120, 240]}
            min={0}
            max={300}
            step={15}
            >
            <RangeSliderTrack bg={'web.text2'}>
              <RangeSliderFilledTrack/>
            </RangeSliderTrack>
            <Tooltip
              label={`$${limit[0]}`}
              bg={'none'}
              color="web.text"
              placement="bottom"
              isOpen
              >
              <RangeSliderThumb 
                bg={'logo.orange'} 
                index={0}           
                _focus={{
                  borderColor: 'logo.orange',
                  boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
                }}
                />
            </Tooltip>
            <Tooltip
              label={`$${limit[1]}`}
              bg={'none'}
              color="web.text"
              placement="bottom"
              isOpen
              >
              <RangeSliderThumb 
                index={1} 
                bg={'logo.orange'}
                _focus={{
                  borderColor: 'logo.orange',
                  boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
                }}  
                />
            </Tooltip>
          </RangeSlider>
          {/* <Button
            h={'4vh'}
            w={'5vw'}  
            textAlign={'left'}
            fontFamily={'body'} 
            display={'flex'}
            alignItems={'center'}
            bg={'web.sideBar'}
            color={'web.text2'}
            fontWeight={'hairline'}>Apply
          </Button> */}
        </HStack>

        <Box
          display={'flex'}
          alignItems={'center'} 
          w={'19vw'}
          h={'10vh'}
          >
          <Input
            w={'70%'}
            variant={"unstyled"}
            placeholder={'Product name'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
            size={"sm"}
            borderBottomWidth={"2px"}
            textColor={'web.text'}
            onChange={(e) => handleChangeProductName(e)}
            borderBottomColor={'web.text2'}
            />
          <IconButton
            borderRadius={2}
            aria-label={"Search database"}
            color={'web.text2'}
            bgColor={'web.bg'}
            ml={1}
            icon={<SearchIcon />}
            _hover={{
              color: 'logo.orange',
            }}
            _active={{ color: 'logo.orange'}}
            />
          </Box>
        </Box>
      </>
    )
}

export default ProductsFilters