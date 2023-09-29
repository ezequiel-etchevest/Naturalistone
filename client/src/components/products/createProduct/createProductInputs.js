import { Box, Button, IconButton, Input, Select, Text, Tooltip } from "@chakra-ui/react";
import { AiOutlineClear, AiOutlinePlus } from "react-icons/ai";
import React from "react";

export function InputsCreateProduct({
  products,
  handleChangeProductName,
  factories,
  materials,
  addProduct,
  handleClear
}) {
  return (
    <>
      <Box display={"flex"} w={"full"} flexDir={"row"} justifyContent={'space-between'} ml={'2vw'} mr={'1vw'}>
        <Box display={"flex"} w={"80%"} flexDir={"row"} gap={"1vw"}>
        <Box display={"flex"} flexDir={"column"} w={"23%"}>
          <Text fontSize={'0.7rem'}>Product name</Text>
          <Input
            mb={"3vh"}
            w={"80%"}
            minH={"4.5vh"}
            variant="unstyled"
            placeholder={"Product name"}
            textColor={"web.text2"}
            _placeholder={{ fontFamily: "body", fontWeight: "thin" }}
            size={"sm"}
            name={"prodName"}
            value={products.prodName}
            borderBottomWidth={"2px"}
            borderBottomColor={"web.text2"}
            onChange={handleChangeProductName}
          />
        </Box>
        <Box display={"flex"} flexDir={"column"} w={"23%"}>
          <Text fontSize={'0.7rem'}>Material</Text>
          <Select
            onChange={(e) => handleChangeProductName(e)}
            mb={"0.5vh"}
            w={"80%"}
            minH={"4.5vh"}
            name={"material"}
            variant="unstyled"
            textColor={"web.text2"}
            _placeholder={{
              fontFamily: "body",
              fontWeight: "inherit",
              textColor: "inherit",
            }}
            size={"sm"}
            borderBottomWidth={"2px"}
            borderBottomColor={"web.text2"}
            _hover={{ borderColor: "web.border" }}
            cursor={"pointer"}
            value={products.material}
            mr={"15px"}
          >
            <option value="" className="options">
              Materials
            </option>
            {materials &&
              materials.map((material, i) => {
                return (
                  <option
                    value={`${material.Material}`}
                    key={i}
                    className={"options"}
                  >{`${material.Material}`}</option>
                );
              })}
          </Select>
        </Box>
        <Box display={"flex"} flexDir={"column"} w={"23%"}>
          <Text fontSize={'0.7rem'}>Factory Name</Text>
          <Select
            onChange={(e) => handleChangeProductName(e)}
            mb={"0.5vh"}
            w={"80%"}
            minH={"4.5vh"}
            name={"factory"}
            variant="unstyled"
            textColor={"web.text2"}
            _placeholder={{
              fontFamily: "body",
              fontWeight: "inherit",
              textColor: "inherit",
            }}
            size={"sm"}
            borderBottomWidth={"2px"}
            borderBottomColor={"web.text2"}
            _hover={{ borderColor: "web.border" }}
            cursor={"pointer"}
            value={products.factory}
            mr={"15px"}
          >
            <option value="" className="options">
              Factories
            </option>
            {factories &&
              factories.map((factory, i) => {
                return (
                  <option
                    value={`${factory.FactoryID}`}
                    key={i}
                    className={"options"}
                  >{`${factory.Factory_Name}`}</option>
                );
              })}
          </Select>
        </Box>
        <Box display={"flex"} flexDir={"column"} w={"23%"}>
          <Text fontSize={'0.7rem'}>Factory product name</Text>
          <Input
            mb={"3vh"}
            w={"80%"}
            minH={"4.5vh"}
            variant="unstyled"
            name={"factoryProdName"}
            placeholder={"Product name"}
            textColor={"web.text2"}
            _placeholder={{ fontFamily: "body", fontWeight: "thin" }}
            size={"sm"}
            value={products.factoryProdName}
            borderBottomWidth={"2px"}
            borderBottomColor={"web.text2"}
            onChange={(e) => handleChangeProductName(e)}
          />
        </Box>
        </Box>
        <Box display={"flex"} flexDir={"row"} alignItems={'center'} w={'10vw'} justifyContent={'space-between'}>
          <Button
            leftIcon={<AiOutlinePlus />}
            variant={"unstyled"}
            display={"flex"}
            mr={"1vw"}
            alignItems={"center"}
            fontSize={"sm"}
            color={"web.text2"}
            fontWeight={"normal"}
            _hover={{
              color: "logo.orange",
            }}
            _active={{}}
            onClick={addProduct}
          >
            Add row
          </Button>
          <Tooltip
            placement={"bottom-start"}
            label={"Clear all"}
            fontWeight={"hairline"}
          >
            <IconButton
              icon={<AiOutlineClear />}
              variant={"unstyled"}
              display={"flex"}
              borderRadius={"sm"}
              color={"web.text2"}
              _hover={{
                color: "logo.orange",
              }}
              onClick={(e) => handleClear(e)}
            ></IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
}
