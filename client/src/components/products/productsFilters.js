import { Box, Select, HStack, Icon, Text, Button, Input, IconButton, FormControl } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';

const ProductsFilters = ({allProducts, setFilteredProducts}) => {

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
        const filteredByName = allProducts?.filter(prod => prod.Naturali_ProdName.toLowerCase().includes(e.target.value))
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
        justifyContent={'end'}
        mr={'2vw'}
        w={'78vw'}
        h={'20vh'}
        >
        <HStack h={'15vh'} w={'55vw'} mr={'2vh'}>
          <Select 
            variant='outline' 
            placeholder='Outline'
            w={'12vw'}
            >
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>
          <Select 
            variant='outline' 
            placeholder='Outline'
            w={'12vw'}
            bg={'web.sideBar'}
            color={'web.text'}
            size='md'
            borderColor={'web.border'}
            >
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>
          <Select 
            variant='outline' 
            placeholder='Outline'
            w={'12vw'}
            >
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>
        </HStack>
        {/* <Box
          display={'flex'}
          alignItems={'center'}
          w={'19vw'}
          h={'15vh'}
          >
          <Input
            w={'70%'}
            variant={"unstyled"}
            placeholder={'Product number'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
            size={"sm"}
            borderBottomWidth={"2px"}
            name={'productNumber'}
            textColor={'web.text'}
            borderBottomColor={'web.text2'}
            onChange={(e) => handleChangeProductID(e)}
            />
          <IconButton
            borderRadius={2}
            color={'web.text2'}
            aria-label={"Search database"}
            bgColor={'web.bg'}
            ml={1}
            icon={<SearchIcon />}
            _hover={{
              color: 'logo.orange',
            }}
            _active={{ color: 'logo.orange'}}
            />
        </Box> */}
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