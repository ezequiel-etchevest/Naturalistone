import { Box, Input, Select, Text } from "@chakra-ui/react";
import React from "react";

export function InputsCreateProduct({
  products,
  handleChangeProductName,
  factories,
  materials,
}) {
  return (
    <>
      <Box display={"flex"} w={"full"} flexDir={"row"} pl={"5vw"} gap={"1vw"}>
        <Box display={"flex"} flexDir={"column"} w={"23%"}>
          <Text>Product Name</Text>
          <Input
            mb={"3vh"}
            w={"70%"}
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
          <Text>Material</Text>
          <Select
            onChange={(e) => handleChangeProductName(e)}
            mb={"0.5vh"}
            w={"9vw"}
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
          <Text>Factory Name</Text>
          <Select
            onChange={(e) => handleChangeProductName(e)}
            mb={"0.5vh"}
            w={"9vw"}
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
          <Text>Factory Product Name</Text>
          <Input
            mb={"3vh"}
            w={"70%"}
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
    </>
  );
}
