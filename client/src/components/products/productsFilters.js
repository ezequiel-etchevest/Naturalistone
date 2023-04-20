import { 
  Box,
  Select,  
  Input, 
  IconButton, 
  Tooltip,
  Divider
 } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SearchIcon } from '@chakra-ui/icons';
import '../../assets/styleSheet.css';
import { getFiltered } from "../../redux/actions-products";
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
    price: [values.priceMaxmin.min === null ? 0 : values.priceMaxmin.min, values.priceMaxmin.max]
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
  useEffect(()=>{
    return ()=> {
      dispatch(getFiltered('','','','','','',''))
    }
    },[])

  return (
    <>    
      <Box
        display={'flex'}
        flexDir={'column'}
        alignItems={'center'}
          ml={'2vw'}
          mr={'2vw'}
          mb={'6vh'} 
          h={'17vh'}
          w={'80vw'}
          justifyContent={'center'}
        >
          {/* -------------------- SEARCH INPUT ------------------------------ */}
        <Box ml={'2vh'} w={'15vw'} mt={'8vh'} display={'flex'} alignSelf={'flex-start'} >
          <Input
            mb={'3vh'}
            w={'80%'}
            minH={'4.5vh'}
            variant="unstyled"
            placeholder={'Product name'}
            textColor={'web.text2'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
            size={"sm"}
            value={filters.search}
            borderBottomWidth={"2px"}
            borderBottomColor={'web.text2'}
            onChange={(e) => handleChangeProductName(e)}
            />
            <IconButton
              color={'web.text2'}
              borderRadius={2}
              aria-label="Search database"
              bgColor={'web.bg'}
              ml={1}
              icon={<SearchIcon />}
              _hover={{
                color: 'orange',
              }}
              _active={{ color: 'gray.800'}}
            />
        </Box>
{/* --------------------BOX SELECTS, SLIDER AND CLEAR BUTTON ------------------------------ */}
        <Box 
          display={'flex'} 
          flexDir={'row'} 
          justifyContent={'space-between'}
          alignItems={'center'} 
          w={'80vw'}
          ml={'1vw'}
          >
          <Box 
            display={'flex'} 
            flexDir={'row'}
            w={'39vw'}
            justifyContent={'space-between'}>
            <Select 
              variant='outline' 
              w={'9vw'}
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
                <option value='' className="options">Type</option>
                {
                  values.materials.map((v, i) => {
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
                <option value='' className="options">Size</option>
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
              w={'9vw'}
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
              <option value='' className="options">Thickness</option>
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
                <option value='' className="options">Finish</option>
                {
                  values.finishValues.map((v, i )=> {
                    return(
                      <option value={`${v}`} key={i} className={'options'}>{`${v}`}</option>
                    )
                  })
                }                     
            </Select>
          </Box>
          <Box display={'flex'} alignItems={'center'} flexDir={'row'} h={'4.2vh'}>
            <PriceSlider  setFilters={setFilters} filters={filters} limit={limit} setLimit={setLimit} values={values}/>
            <Divider orientation={'vertical'} h={'5vh'} ml={'2vw'}/>
            <Tooltip placement={'bottom-start'} label={'Clear all filters'} fontWeight={'hairline'}>      
            <IconButton
              icon={ <AiOutlineClear/>}
              variant={'unstyled'} 
              display={'flex'} 
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
            </IconButton>
        </Tooltip> 
          </Box> 
          </Box>  
      </Box>
    </>
  )
}
export default ProductsFilters