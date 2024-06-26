import { 
  Text,
  Box,
  Input,
  IconButton,
  useToast,
  Select,
  Divider,
  Tooltip,
} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsNewQuote, getAllProductsNewSamples } from "../../../redux/actions-products";
import {BiSearch} from 'react-icons/bi'
import {AiOutlineClear} from 'react-icons/ai';
import '../../../assets/styleSheet.css'
import CreateSampleProductsList from "./CreateSampleProductsList";
  
  const CreateSampleProducts = ({formData, setFormData}) => {
  
  const dispatch = useDispatch()
  const toast = useToast()
  const allProducts = useSelector(state => state.products_new_samples)
  const values = useSelector(state => state.products_new_samples_values)
  
  const [filters, setFilters] = useState({
    finish:'',
    material: '',
    search:'',
  })
  
  const handleFinish = (e) => {
    setFilters({
      ...filters,
      finish: e.target.value
    })
    dispatch(getAllProductsNewSamples(e.target.value, filters.material, filters.search))
  }
  
  const handleMaterial = (e) => {
    setFilters({
      ...filters,
      material: e.target.value
    })
    dispatch(getAllProductsNewSamples(filters.finish, e.target.value, filters.search))
  }
  
  const handleChangeProductName = (e) => {
    setFilters({
      ...filters,
      search: e.target.value
    })
    dispatch(getAllProductsNewSamples(filters.finish, filters.material, e.target.value))
  }
  
  const handleClear = () => {
    setFilters({
      finish:'',
      material:'',
      search:''
      }) 
      dispatch(getAllProductsNewSamples( '','',''))
  }

  useEffect(() => {
    getAllProductsNewSamples('', '', '')
  },[])
  
  return(
  <>
  <Box color={'web.text2'} 
    display={'flex'} 
    justifyContent={'center'} 
    flexDir={'column'} 
    h={'58vh'}
    >
    <Box h={"6vh"} mt={'1vh'}>
      <Text
        ml={"1vw"}
        fontSize={"lg"}
        color={"white"}
        >
        Select products
      </Text>
    </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        h={'6vh'}
        mb={'3vh'}
        ml={'1vw'}
        pl={'1vw'}
        mr={'1.2vw'}
        minW={'650px'}
        >
        <Select
          onChange={(e)=>handleMaterial(e)}
          mb={'0.5vh'}
          mr={'2vw'}
          w={'160px'}             
          minH={'5.5vh'}
          variant="unstyled"
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
          size={"sm"}
          borderBottomWidth={"2px"}
          borderBottomColor={'web.text2'}
          _hover={{borderColor: 'web.border'}}
          cursor={'pointer'}
          name={'material'}
          value={filters.material}
        >
        <option value='' className="options">Material</option>
        {
          Object.entries(values).length ?
          values?.materials.map((v, i) => {
              return(
                <option value={`${v}`} key={i} className={'options'}>{`${v}`}</option>
              )
            })
          :
          null  
        }
        </Select>
        <Select
          onChange={(e)=>handleFinish(e)}
          mb={'0.5vh'}
          w={'160px'}
          minH={'5.5vh'}
          mr={'2vw'}
          variant="unstyled"
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
          size={"sm"}
          borderBottomWidth={"2px"}
          borderBottomColor={'web.text2'}
          _hover={{borderColor: 'web.border'}}
          cursor={'pointer'}
          name={'finish'}
          value={filters.finish}
        >
        <option value='' className="options">Finish</option>
        {
          Object.entries(values).length ?
          values?.finishValues.map((v, i )=> {
            return(
              <option value={`${v}`} key={i} className={'options'}>{`${v}`}</option>
            )
          })
          :
          null
        }                     
        </Select>
        <Input
          mb={'0.5vh'}
          w={'160px'}
          minH={'4.5vh'}
          variant="unstyled"
          placeholder={'Product name'}
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
          size={"sm"}
          value={filters.search}
          borderBottomWidth={"2px"}
          borderBottomColor={'web.text2'}
          name={'search'}
          onChange={(e) => handleChangeProductName(e)}
          />
        <IconButton
          color={'web.text2'}
          aria-label="Search database"
          bgColor={'web.sideBar'}
          ml={'-0.5vw'}
          icon={<BiSearch />}
          size={'lg'}
          _hover={{
            color: 'orange.500',
          }}
          boxSize={'3.5'}
          mt={'3.3vh'}
          _active={{ color: 'gray.800'}}
        />
        <Divider orientation={'vertical'} h={'5vh'} ml={'2vw'}mr={'1vw'} alignSelf={'flex-end'}/>
        <Tooltip placement={'bottom-start'} label={'Clear all filters'} fontWeight={'hairline'}>      
        <IconButton
          icon={ <AiOutlineClear/>}
          variant={'unstyled'} 
          display={'flex'} 
          alignSelf={'flex-end'}
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
      <CreateSampleProductsList allProducts={allProducts} formData={formData} setFormData={setFormData}/>
    </Box> 
  </>
  )}
  export default CreateSampleProducts;