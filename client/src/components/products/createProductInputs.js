import { Box, Input, Select, Text } from "@chakra-ui/react";
import React from "react";

export function InputsCreateProduct({products, handleChangeProductName, factories}) {
  console.log('soy products', products)
  return(
      <>
        <Box display={"flex"} w={"full"} flexDir={"row"} pl={"5vw"}>
          <Box display={"flex"} flexDir={"column"} w={"25%"}>
            <Text>Product Name</Text>
            <Input 
            mb={'3vh'}
            w={'70%'}
            minH={'4.5vh'}
            variant="unstyled"
            placeholder={'Product name'}
            textColor={'web.text2'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
            size={"sm"}
            name={"prodName"}
            value={products.prodName}
            borderBottomWidth={"2px"}
            borderBottomColor={'web.text2'}
            onChange={handleChangeProductName}
            />
          </Box>
          <Box display={"flex"} flexDir={"column"} w={"25%"}>
            <Text>Material</Text>
            <Input 
            mb={'3vh'}
            w={'60%'}
            minH={'4.5vh'}
            variant="unstyled"
            holder={'Material'}
            textColor={'web.text2'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
            size={"sm"}
            placeholder={'Material'}
            name={"material"}
            value={products.material}
            borderBottomWidth={"2px"}
            borderBottomColor={'web.text2'}
            onChange={(e) => handleChangeProductName(e)}
            />
          </Box>
          <Box  display={"flex"} flexDir={"column"} w={"25%"}>
            <Text>Factory Name</Text>
            <Select
            onChange={(e)=>handleChangeProductName(e)}
            mb={'0.5vh'}
            w={'9vw'}
            minH={'4.5vh'}
            name={"factory"}
            variant="unstyled"
            textColor={'web.text2'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
            size={"sm"}
            borderBottomWidth={"2px"}
            borderBottomColor={'web.text2'}
            _hover={{borderColor: 'web.border'}}
            cursor={'pointer'}
            value={products.factory}
            mr={'15px'}
            >
                <option value='' className="options">Factories</option>
                {
                  factories && factories.map((factory, i) => {
                      return(
                        <option value={`${factory.FactoryID}`} key={i} className={'options'}>{`${factory.Factory_Name}`}</option>
                      )
                    })
                }
                </Select>
          </Box>
          <Box  display={"flex"} flexDir={"column"} w={"25%"}>
            <Text>Factory Product Name</Text>
            <Input 
            mb={'3vh'}
            w={'60%'}
            minH={'4.5vh'}
            variant="unstyled"
            name={"factoryProdName"}
            placeholder={'Product name'}
            textColor={'web.text2'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
            size={"sm"}
            value={products.factoryProdName}
            borderBottomWidth={"2px"}
            borderBottomColor={'web.text2'}
            onChange={(e) => handleChangeProductName(e)}
            />
          </Box>
        </Box>
      </>
    )
}