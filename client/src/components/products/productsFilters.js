import { Box, HStack, Icon, Text, Button, Input, IconButton, FormControl } from "@chakra-ui/react";
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
        ml={'50%'}
        mb={'5%'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        pl={'2vw'}
        w={'38vw'}
        >
            <Box
                display={'flex'}
                alignItems={'center'}
                w={'19vw'}
                h={'15vh'}
                >
                    <Input
                        w={'70%'}
                        variant="unstyled"
                        placeholder={'Product number'}
                        _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
                        size="sm"
                        borderBottomWidth="2px"
                        name='invoiceNumber'
                        onChange={(e) => handleChangeProductID(e) }

                      />
                      <IconButton
                        borderRadius={2}
                        aria-label="Search database"
                        bgColor={'white'}
                        ml={1}
                        icon={<SearchIcon />}
                        _hover={{
                          color: 'orange',
                        }}
                        _active={{ color: 'gray.800'}}
                      />
                      
                      {/* {
                      errores.length >= 1 && (
                        <Box position={'absolute'} display={'flex'}>
                         <Text color="red.300" fontSize={'12px'} display={'flex'}>
                            {errores}
                         </Text>
                        </Box>
                      )} */}
                </Box>
                <Box
                  display={'flex'}
                  alignItems={'center'} 
                  w={'19vw'}
                  h={'10vh'}>
                  <Input
                      w={'70%'}
                      variant="unstyled"
                      placeholder={'Product name'}
                      _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
                      size="sm"
                      borderBottomWidth="2px"
                      onChange={(e) => handleChangeProductName(e)}

                    />
                    <IconButton
                      borderRadius={2}
                      aria-label="Search database"
                      bgColor={'white'}
                      ml={1}
                      icon={<SearchIcon />}
                      _hover={{
                        color: 'orange',
                      }}
                      _active={{ color: 'gray.800'}}
                    />
                  </Box>
        </Box>
        </>
        )
        }

export default ProductsFilters