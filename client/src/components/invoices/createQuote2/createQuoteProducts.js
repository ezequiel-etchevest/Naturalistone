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
import { getAllProductsNewQuote } from "../../../redux/actions-products";
import {BiSearch} from 'react-icons/bi'
import {AiOutlineClear} from 'react-icons/ai';
import '../../../assets/styleSheet.css'
import CreateQuoteProductsList from "./createQuoteProductsList";

const CreateQuoteProducts = ({formData, setFormData}) => {

const dispatch = useDispatch()
const toast = useToast()
const allProducts = useSelector(state => state.products_new_quote)
const allProductsErrors = useSelector(state => state.products_new_quote_errors)
const productErrors = useSelector((state) => state.products_errors)
const values = useSelector(state => state.products_new_quote_values)

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
  dispatch(getAllProductsNewQuote(e.target.value, filters.material, filters.search))
}

const handleMaterial = (e) => {
  setFilters({
    ...filters,
    material: e.target.value
  })
  dispatch(getAllProductsNewQuote(filters.finish, e.target.value, filters.search))
}

const handleChangeProductName = (e) => {
  setFilters({
    ...filters,
    search: e.target.value
  })
  dispatch(getAllProductsNewQuote(filters.finish, filters.material, e.target.value))
}

const handleClear = () => {
  setFilters({
    finish:'',
    material:'',
    search:''
    }) 
    dispatch(getAllProductsNewQuote( '','',''))
}


return(
<>
<Box color={'web.text2'} display={'flex'} justifyContent={'center'} flexDir={'column'} h={'58vh'}>
  <Text ml={'2vw'} mt={'2vh'} fontSize={'lg'} w={'14vw'} color={'white'} alignSelf={'flex-start'}>Select products</Text>
    <Box
      display={'flex'}
      justifyContent={'flex-end'}
      h={'6vh'}
      mb={'2vh'}
      mr={'1.2vw'}
      >
      <Select
        onChange={(e)=>handleMaterial(e)}
        mb={'0.5vh'}
        mr={'2vw'}
        w={'9vw'}             
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
      <option value='' className="options">Type</option>
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
        w={'10vw'}
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
        value={filters.finishfinish}
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
        w={'10vw'}
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
      <Divider orientation={'vertical'} h={'5vh'} ml={'1vw'}mr={'1vw'} pt={'2vh'}/>
      <Tooltip placement={'bottom-start'} label={'Clear all filters'} fontWeight={'hairline'}>      
      <IconButton
        icon={ <AiOutlineClear/>}
        pt={'2.2vh'}
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
    <CreateQuoteProductsList allProducts={allProducts} allProductsErrors={allProductsErrors} formData={formData} setFormData={setFormData}/>
  </Box> 
</>
)}
export default CreateQuoteProducts;