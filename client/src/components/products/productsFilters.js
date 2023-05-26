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
import { useLocation, useNavigate } from "react-router-dom";


const ProductsFilters = ({allProducts, setFilteredProducts, values}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const queryString = location.search;
  const searchParams = new URLSearchParams(queryString);
  const getParamsFinish = searchParams.get('finish')
  const getParamsSize = searchParams.get('size')
  const getParamsThickness = searchParams.get('thickness')
  const getParamsMaterial = searchParams.get('material')
  const getParamsSearch = searchParams.get('search')
  const getParamsPriceMin = searchParams.get('priceMin')
  const getParamsPriceMax = searchParams.get('priceMax')
  const priceMin = getParamsPriceMin ? getParamsPriceMin : 0
  const priceMax = getParamsPriceMax ? getParamsPriceMax : values?.priceMaxmin?.max
  const [filters, setFilters] = useState({
    finish: getParamsFinish ? getParamsFinish : '',
    size: getParamsSize ? getParamsSize : '',
    thickness: getParamsThickness ? getParamsThickness : '',
    material: getParamsMaterial ? getParamsMaterial: '',
    search: getParamsSearch ? getParamsSearch : '',
    price: [priceMin, priceMax]
  })
  const [limit, setLimit] = useState([values?.priceMaxmin?.min, values?.priceMaxmin?.max])

  const handleFinish = (e) => {
    const finish = e.target.value
    searchParams.set('finish', finish)
    searchParams.set('size', filters.size)
    searchParams.set('thickness', filters.thickness)
    searchParams.set('material', filters.material)
    searchParams.set('search', filters.search)
    navigate(`?${searchParams.toString()}`)
    setFilters({
      ...filters,
      finish
    })
    dispatch(getFiltered(finish, filters.size, filters.thickness, filters.material, filters.search, filters.price))
  }

  const handleSize = (e) => {
    const size = e.target.value
    searchParams.set('size', size)
    searchParams.set('finish', filters.finish)
    searchParams.set('thickness', filters.thickness)
    searchParams.set('material', filters.material)
    searchParams.set('search', filters.search)
    navigate(`?${searchParams.toString()}`)
    setFilters({
      ...filters, 
      size
    })
    dispatch(getFiltered(filters.finish, size, filters.thickness, filters.material, filters.search, filters.price))
  }

  const handleThickness = (e) => {
    const thickness = e.target.value
    searchParams.set('thickness', thickness)
    searchParams.set('size', filters.size)
    searchParams.set('finish', filters.finish)
    searchParams.set('material', filters.material)
    searchParams.set('search', filters.search)
    navigate(`?${searchParams.toString()}`)
    setFilters({
      ...filters,
      thickness
    })
    dispatch(getFiltered(filters.finish, filters.size, thickness, filters.material, filters.search, filters.price))
  }

  const handleMaterial = (e) => {
    const material = e.target.value
    searchParams.set('material', material)
    searchParams.set('size', filters.size)
    searchParams.set('finish', filters.finish)
    searchParams.set('thickness', filters.thickness)
    searchParams.set('search', filters.search)
    navigate(`?${searchParams.toString()}`)
    setFilters({
      ...filters,
      material: material
    })
    dispatch(getFiltered(filters.finish, filters.size, filters.thickness, material, filters.search, filters.price))
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
    const search = e.target.value
    searchParams.set('search', search)
    searchParams.set('size', filters.size)
    searchParams.set('finish', filters.finish)
    searchParams.set('material', filters.material)
    searchParams.set('thickness', filters.thickness)
    navigate(`?${searchParams.toString()}`)
      setFilters({
        ...filters,
        search: e.target.value
      })
      dispatch(getFiltered(filters.finish, filters.size, filters.thickness, filters.material, e.target.value, filters.price))
    }
  useEffect(()=>{
      dispatch(
        getFiltered(
          filters.finish,
          filters.size,
          filters.thickness,
          filters.material,
          filters.search,
          filters.price,
          // filters.price
          ))
    },[filters])

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
                  onChange={(e)=>handleMaterial(e)}
                  mb={'0.5vh'}
                  w={'9vw'}
                  minH={'4.5vh'}
                  variant="unstyled"
                  textColor={'web.text2'}
                  _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
                  size={"sm"}
                  borderBottomWidth={"2px"}
                  borderBottomColor={'web.text2'}
                  _hover={{borderColor: 'web.border'}}
                  cursor={'pointer'}
                  value={filters.material}
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
                  onChange={(e)=>handleSize(e)}
                  mb={'0.5vh'}
                  w={'9vw'}
                  minH={'4.5vh'}
                  variant="unstyled"
                  textColor={'web.text2'}
                  _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
                  size={"sm"}
                  borderBottomWidth={"2px"}
                  borderBottomColor={'web.text2'}
                  _hover={{borderColor: 'web.border'}}
                  cursor={'pointer'}
                  value={filters.size}
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
                  onChange={(e)=>handleThickness(e)}
                  mb={'0.5vh'}
                  w={'9vw'}
                  minH={'4.5vh'}
                  variant="unstyled"
                  textColor={'web.text2'}
                  _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
                  size={"sm"}
                  borderBottomWidth={"2px"}
                  borderBottomColor={'web.text2'}
                  _hover={{borderColor: 'web.border'}}
                  cursor={'pointer'}
                  value={filters.thickness}
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
                  onChange={(e)=>handleFinish(e)}
                  mb={'0.5vh'}
                  w={'9vw'}
                  minH={'4.5vh'}
                  variant="unstyled"
                  textColor={'web.text2'}
                  _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
                  size={"sm"}
                  borderBottomWidth={"2px"}
                  borderBottomColor={'web.text2'}
                  _hover={{borderColor: 'web.border'}}
                  cursor={'pointer'}
                  value={filters.finish}
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
            <PriceSlider setFilters={setFilters} filters={filters} limit={limit} setLimit={setLimit} values={values}/>
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