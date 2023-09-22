import { SearchIcon } from "@chakra-ui/icons";
import { Box, IconButton, Input, Text } from "@chakra-ui/react";
import React from "react";
import ProductListCreateProductDimension from "./productsListCreateProductDimension";

export function SearchProduct({ all_products_search, handleChangeProductName, products, setProducts }) {
  
  return (
    <>   
      <Box w={"full"} h={"full"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDir={"column"}>      
        <Box w={"full"} display={"flex"} alignItems={"center"} mb={'3vh'}>
          <Input
            w={"40%"}
            ml={'1vw'}
            minH={"4.5vh"}
            variant="unstyled"
            name={"searchProduct"}
            placeholder={"Product name"}
            textColor={"web.text2"}
            _placeholder={{ fontFamily: "body", fontWeight: "thin" }}
            size={"sm"}
            value={products.searchProduct}
            borderBottomWidth={"2px"}
            borderBottomColor={"web.text2"}
            onChange={(e) => handleChangeProductName(e)}
          />
          <IconButton
            color={"web.text2"}
            borderRadius={2}
            aria-label="Search database"
            bgColor={"web.sideBar"}
            size={"sm"}
            ml={1}
            icon={<SearchIcon />}
            _hover={{
              color: "orange",
            }}
            _active={{ color: "gray.800" }}
          />
        </Box>
        <ProductListCreateProductDimension
        all_products_search={all_products_search}
        products={products}
        setProducts={setProducts}
        />
      </Box>
    </>
  )
}