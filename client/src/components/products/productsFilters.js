import { 
  Box,
  Select, 
  HStack, 
  Input, 
  IconButton, 
  Text,
  Button,
 } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SearchIcon } from '@chakra-ui/icons';
import '../../assets/styleSheet.css';
import { getAllProducts, getFiltered } from "../../redux/actions-products";
import { useDispatch } from 'react-redux';
import {AiOutlineClear} from 'react-icons/ai';
import PriceSlider from "./priceSlider";


const ProductsFilters = ({allProducts, setFilteredProducts, values}) => {

  const dispatch = useDispatch()
  const [filters, setFilters] = useState({
    finish:'',
    size:'',
    thickness:'',
    material: '',
    search:'',
    price: [values.priceMaxmin.min, values.priceMaxmin.max]
  })

  const [limit, setLimit] = useState([values.priceMaxmin.min, values.priceMaxmin.max])
  const handleFinish = (e) => {
    setFilters({
      ...filters,
      finish: e.target.value
    })
    dispatch(getFiltered(e.target.value, filters.size, filters.thickness, filters.material, filters.search, filters.price))
  }

  const handleSize = (e) => {
    setFilters({
      ...filters, 
      size: e.target.value
    })
    dispatch(getFiltered(filters.finish, e.target.value, filters.thickness, filters.material, filters.search, filters.price))
  }

  const handleThickness = (e) => {
    setFilters({
      ...filters,
      thickness: e.target.value
    })
    dispatch(getFiltered(filters.finish, filters.size, e.target.value, filters.material, filters.search, filters.price))
  }

  const handleMaterial = (e) => {
    setFilters({
      ...filters,
      material: e.target.value
    })
    dispatch(getFiltered(filters.finish, filters.size, filters.thickness, e.target.value, filters.search, filters.price))
  }
  const handleClear = () => {
    setFilters({
      finish:'',
      size:'',
      thickness:'',
      material:'',
      search:'',
      price: [values.priceMaxmin.min, values.priceMaxmin.max]
      })
      dispatch(getFiltered('','','','', '','',''))
      setLimit([values.priceMaxmin.min, values.priceMaxmin.max])
  }

  const handleChangeProductName = (e) => {
      setFilters({
        ...filters,
        search: e.target.value
      })
      dispatch(getFiltered(filters.finish, filters.size, filters.thickness, filters.material, e.target.value, filters.price))
    }
  // useEffect(()=>{
  //   },[values])
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
              value={filters.finish}
              _focus={{
                borderColor: 'logo.orange',
                boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
              }}
              onChange={(e) => handleFinish(e)}
              >
                <option value='' className="options"> Select Finish</option>
                {
                  values.finishValues.map((v, i )=> {
                    return(
                      <option value={`${v}`} key={i} className={'options'}>{`${v}`}</option>
                    )
                  })
                }              
              
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
              {
                  values.sizes.map((v, i) => {
                    return(
                      <option value={`${v}`} key={i} className={'options'}>{`${v}`}</option>
                    )
                  })
                       
              }
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
              {
                  values.thickness.map((v, i) => {
                    return(
                      <option value={`${v}`} key={i} className={'options'}>{`${v}`}</option>
                    )
                  })
              }
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
              value={filters.material}
              _focus={{
                borderColor: 'logo.orange',
                boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
              }}
              onChange={(e) => handleMaterial(e)}
              >
              <option value='' className="options">Select Material</option>
              {
                  values.materials.map((v, i) => {
                    return(
                      <option value={`${v}`} key={i} className={'options'}>{`${v}`}</option>
                    )
                  })
              }
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
              value={filters.search}
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
          <PriceSlider setFilters={setFilters} filters={filters} limit={limit} setLimit={setLimit} values={values} />

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