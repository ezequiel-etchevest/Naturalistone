import { 
  Box,
  Select, 
  HStack, 
  Input, 
  IconButton, 
  Text,
  Button
 } from "@chakra-ui/react";
import { useState } from "react";
import { SearchIcon } from '@chakra-ui/icons';
import '../../assets/styleSheet.css';
import { getAllProducts, getFiltered } from "../../redux/actions-products";
import { useDispatch } from 'react-redux';
import {AiOutlineClear} from 'react-icons/ai';
import PriceSlider from "./priceSlider";


const ProductsFilters = ({allProducts, setFilteredProducts}) => {
  
  const dispatch = useDispatch()
 
  const [filters, setFilters] = useState({
    type:'',
    size:'',
    thickness:'',
    price: [0, 300]
  })

  const handleType = (e) => {
    setFilters({
      ...filters,
      type: e.target.value
    })
  }

  const handleSize = (e) => {
    setFilters({
      ...filters, 
      size: e.target.value
    })
  }

  const handleThickness = (e) => {
    setFilters({
      ...filters,
      thickness: e.target.value
    })
  }

 
  const handleFilters = () => {
    dispatch(getFiltered(filters))
  }

  const handleClear = () => {
    setFilters({
      type:'',
      size:'',
      thickness:'',
      price: [0, 300]
      })
    dispatch(getAllProducts())
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
        alignItems={'flex-start'}
        ml={'3.2vw'}
        w={'72vw'}
        h={'20vh'} 
        flexDir={'column'}
        justifyContent={'space-around'}
        pb={'2vh'}
        >
        {/* --------------------BOX SELECTS AND CLEAR BUTTON------------------------------ */}
        <HStack
          mt={'3vh'}
          h={'5vh'}
          w={'73vw'} 
          display={'flex'} 
          alignItems={'center'}  
          justifyContent={'space-between'}>

        {/* --------------------BOX SELECT TYPE, SIZE AND THICKNESS------------------------------ */}
          <Box 
            display={'flex'} 
            flexDir={'row'} 
            w={'32vw'} 
            justifyContent={'space-between'} >
            <Select 
              variant='outline' 
              w={'9vw'}
              h={'4.2vh'}
              fontSize={'xs'}            
              bg={'web.sideBar'}
              color={'web.text2'}
              borderColor={'web.border'}
              cursor={'pointer'}
              value={filters.type}
              _focus={{
                borderColor: 'logo.orange',
                boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
              }}
              onChange={(e) => handleType(e)}
              >              
              <option value='' className="options"> Select Type</option>
              <option value='Tile' className="options">Tile</option>
              <option value='Slab' className="options">Slab</option>
            </Select>
            <Select 
              variant='outline' 
              w={'9vw'}
              h={'4.2vh'}
              fontSize={'xs'}             
              bg={'web.sideBar'}
              color={'web.text2'}
              borderColor={'web.border'}
              cursor={'pointer'}
              value={filters.size}
              _focus={{
                borderColor: 'logo.orange',
                boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
              }}
              onChange={(e) => handleSize(e)}
              >
              <option value='' className="options">Select Size</option>
              <option value='24x24' className="options">24 x 24</option>
              <option value='24x48' className="options">24 x 48</option>
              <option value='48x48' className="options">48 x 48</option>
              <option value='12x24' className="options">12 x 24</option>
              <option value='1x1' className="options">1 x 1</option>
              <option value='2x2' className="options">2 x 2</option>
              <option value='120x50' className="options">120 x 50</option>
              <option value='126x63' className="options">126 x 63</option>
              <option value='127x64' className="options">127 x 64</option>
              <option value='128x65' className="options">128 x 65</option>
            </Select>
            <Select 
              variant='outline' 
              w={'11vw'}
              h={'4.2vh'}
              fontSize={'xs'}             
              bg={'web.sideBar'}
              color={'web.text2'}
              borderColor={'web.border'}
              cursor={'pointer'}
              value={filters.thickness}
              _focus={{
                borderColor: 'logo.orange',
                boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
              }}
              onChange={(e) => handleThickness(e)}
              >
              <option value='' className="options">Select Thickness</option>
              <option value='3/4' className="options">3/4</option>
              <option value='1/2' className="options">1/2</option>
              <option value='1 1/4' className="options">1 1/4</option>
            </Select>
          </Box>
          {/* -------------------- SEARCH INPUT ------------------------------ */}
        <Box pr={'3vh'}>
            <Input
              w={'15vw'}
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
            
        </HStack>
        <Box
          display={'flex'}
          alignItems={'center'}
          w={'72vw'}
          flexDir={'row'}
          justifyContent={'space-between'}
          >
          <PriceSlider setFilters={setFilters} filters={filters}/>

        <Button
            leftIcon={ <AiOutlineClear/>}
            variant={'unstyled'} 
            display={'flex'} 
            w={'10vw'}
            h={'10vh'}
            borderRadius={'sm'} 
            placeContent={'center'}
            alignItems={'center'}
            color={'web.text2'} 
            _hover={{
               color: 'logo.orange'
               }}
            _active={{
            }}
            onClick={(e) => handleClear(e)}
            >
            <Text 
              pr={'1.5vh'} 
              fontFamily={'body'} 
              fontWeight={'hairline'}
              >Clear filters
            </Text>
            </Button>
          </Box>

      </Box>
    </>
  )
}
export default ProductsFilters