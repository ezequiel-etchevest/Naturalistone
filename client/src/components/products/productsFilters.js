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
  Tooltip,
  Text,
  Button,
  useToast,
  Divider
 } from "@chakra-ui/react";
import { useState } from "react";
import { SearchIcon, CheckIcon } from '@chakra-ui/icons';
import '../../assets/styleSheet.css'
import { IoFilterSharp } from 'react-icons/io5' 
import { getAllProducts, getFiltered } from "../../redux/actions-products";
import { useDispatch, useSelector } from 'react-redux'


const ProductsFilters = ({allProducts, setFilteredProducts}) => {
  
  const dispatch = useDispatch()
  const toast = useToast()

  // const products_errors = useSelector(state => state.products_errors)
  // const [errors, setErrors] = useState(
  //   {
  //     // type: '', 
  //     // size: '', 
  //     // thickness: '', 
  //     // price:''
  //   })

  const [limit, setLimit] = useState([0, 300])
  const [filters, setFilters] = useState({
    type:'',
    size:'',
    thickness:'',
    price: [0, 300]
  })

//     const handleChangeProductID = (e) => {
 
//     if(e.target.value.length) {
//         const filteredByID = allProducts?.filter(prod => prod.ProdNameID.toString().includes(e.target.value))
//         if(!filteredByID.length) return alert('No Products match this search')
//         setFilteredProducts(filteredByID)
//     } else {
//         setFilteredProducts([])

//     }
// }
  // const handleErrors = () => {
  //   (products_errors?.type == '')? setErrors({type: ''}) : setErrors({ type: products_errors?.type})
  //   (products_errors?.size !== '')? setErrors({size:''}) : setErrors({ size: products_errors?.size})
  //   (products_errors?.thickness !== '')? setErrors({thickness: ''}) : setErrors({ thickness: products_errors?.thickness})
  // }
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

  const handlePrice = (e) => {
    setLimit(e);
    setFilters({
      ...filters,
      price: e
    })
  }

  const handleFilters = () => {
    dispatch(getFiltered(filters))
    // handleErrors()
    // handleToast()
  }

  // const handleToast = () => {
  //     if(Object.entries(errors.type).length > 0){
  //       toast({
  //         title: 'Search Error',
  //         description: `${errors.type}`,
  //         status: 'error',
  //         duration: 9000,
  //         isClosable: true,
  //       })
  //     }
  //       if(Object.entries(errors.size).length > 0){
  //         toast({
  //           title: 'Search Error',
  //           description: `${errors.size}`,
  //           status: 'error',
  //           duration: 9000,
  //           isClosable: true,
  //       })
  //     }
  //       if(Object.entries(errors.thickness).length > 0){
  //         toast({
  //           title: 'Search Error',
  //           description: `${errors.thickness}`,
  //           status: 'error',
  //           duration: 9000,
  //           isClosable: true,
  //       })
  //     } 
  //   } 
  const handleClear = () => {
    setFilters({
      type:'',
      size:'',
      thickness:'',
      price: [0, 300]
      })
      // setErrors(      
      //   {
      //   type: '', 
      //   size: '', 
      //   thickness: '', 
      //   price:''
      // })
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
// const handleChangeSelect = (e) => {
//     setSelect(e.target.value)
// }

  return (
    <>    
      <Box
        display={'flex'}
        alignItems={'flex-start'}
        ml={'3.2vw'}
        pt={'10vh'}
        w={'72vw'}
        h={'20vh'} 
        flexDir={'column-reverse'}
        >
        <HStack h={'5vh'} w={'72vw'} display={'flex'} alignItems={'center'} mb={'3.5vh'} ml={'0.5vw'} justifyContent={'space-between'}>
          <Box display={'flex'} flexDir={'row'} w={'30vw'} justifyContent={'space-between'} >
          <Select 
            variant='outline' 
            w={'9vw'}
            h={'3.5vh'}
            fontSize={'sm'}            
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
            h={'3.5vh'}
            fontSize={'sm'}             
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
            w={'9vw'}
            h={'3.5vh'}
            fontSize={'sm'}             
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
          <RangeSlider 
            aria-label={['min', 'max']}
            colorScheme={'orange'}
            value={filters.price}
            onChangeEnd={(val) => console.log(val)}
            onChange={(e) => handlePrice(e)}
            w={'13vw'}
            defaultValue={[0, 300]}
            min={0}
            max={300}
            step={15}
            h={'4vh'}
            >
            <RangeSliderTrack bg={'web.text2'} h={'0.3vh'}>
              <RangeSliderFilledTrack/>
            </RangeSliderTrack>
            <Tooltip
              label={`$${limit[0]}`}
              bg={'none'}
              color="web.text"
              placement="bottom"
              isOpen
              fontSize={'1.4vh'}
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
              fontSize={'1.4vh'}
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
          <Box
            display={'flex'}
            w={'12vw'}
            justifyContent={'space-between'}
            >
            <Button
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
                >Clear
              </Text>
              <Text>X</Text>
            </Button>
            <Button
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
              onClick={(e) => handleFilters()}
              >
              <Text 
                pr={'1.5vh'} 
                fontFamily={'body'} 
                fontWeight={'hairline'}
                >Apply
              </Text>
              <CheckIcon/>
            </Button>
          </Box>
        </HStack>
        <Box
          display={'flex'}
          alignItems={'center'}
          w={'72vw'}
          h={'10vh'}
          flexDir={'row'}
          justifyContent={'space-between'}
          mb={'1vh'}
          >
          <Button
              variant={'unstyled'} 
              display={'flex'} 
              w={'7vw'}
              h={'5vh'}
              borderRadius={'sm'} 
              placeContent={'center'}
              alignItems={'center'}
              color={'web.text2'}
              ml={'0.5vw'} 
              _hover={{
                 color: 'logo.orange'
                 }}
              _active={{
              }}
              >
              <Text 
                pr={'1.5vh'} 
                fontFamily={'body'} 
                fontWeight={'hairline'}
                >Filters
              </Text>
              <IoFilterSharp/>
          </Button>
          <Box>
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
          </Box>

      </Box>
    </>
  )
}
export default ProductsFilters