import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { InputsCreateProduct } from "./createProductInputs";
import { useDispatch } from "react-redux";
import { getFiltered, postProduct } from "../../../redux/actions-products";

const CreateProduct = ({ values, factories, materials }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const [products, setProducts] = useState({
    prodName: "",
    material: "",
    factoryProdName: "",
    factory: "",
    dimensions: [
      {
        um: "Sqft",
        size: "",
        thickness: "",
        type: "Tile",
        finish: "Honed",
        price: 0,
      },
    ],
  });

  const addProduct = () => {
    setProducts({
      ...products,
      dimensions: [
        ...products.dimensions,
        {
          um: "Sqft",
          size: "",
          thickness: "",
          type: "Tile",
          finish: "Honed",
          price: 0,
        },
      ],
    });
  };

  const handleChangeProductName = (event) => {
    const { name, value } = event.target;
    setProducts({
      ...products,
      [name]: value,
    });
  };

  const handleChange = (e, field, index) => {
    const value = e.target.value;

    const updated = { ...products.dimensions[index] };

    if (field === "type") {
      if (value === "Tile" || value === "Mosaic") {
        setProducts((prev) => {
          const newProducts = {
            ...prev,
            dimensions: [...prev.dimensions],
          };
          newProducts.dimensions[index].um = "Sqft";

          return newProducts;
        });
        updated["um"] = "Sqft";
      } else {
        setProducts((prev) => {
          const newProducts = {
            ...prev,
            dimensions: [...prev.dimensions],
          };
          newProducts.dimensions[index].um = "Units";

          return newProducts;
        });
        updated["um"] = "Units";
      }
    }
    if (field === "price") {
      const regex = /^\d+(\.\d{1,2})?$|^$/;

      if (regex.test(value)) {
        if (value === "") {
          updated[field] = 0;
        } else {
          const rounded = Math.round(value * 100) / 100;

          updated[field] = rounded;
        }
      } else {
        return;
      }
    } else {
      updated[field] = value;
    }

    setProducts((prev) => {
      // Actualizar producto en estado
      const newProducts = {
        ...prev,
        dimensions: [...prev.dimensions],
      };
      newProducts.dimensions[index] = updated;

      return newProducts;
    });
  };

  const handleDelete = (index) => {
    const newProducts = [...products.dimensions];
    newProducts.splice(index, 1);
    setProducts({
      ...products,
      dimensions: newProducts,
    });
  };

  const isValid = () => {
    if (
      products.prodName === "" ||
      products.factory === "" ||
      products.factoryProdName === "" ||
      products.material === ""
    )
      return false;
    return products.dimensions.every((product) => {
      const requiredFields = ["price"];

      return Object.keys(product).every((field) => {
        if (requiredFields.includes(field)) {
          return product[field] !== 0;
        } else {
          return product[field] !== "";
        }
      });
    });
  };

  const handleClear = () => {
    setProducts({
      prodName: "",
      material: "",
      factoryProdName: "",
      factory: "",
      dimensions: [
        {
          um: "Sqft",
          size: "",
          thickness: "",
          type: "Tile",
          finish: "Honed",
          price: 0,
        },
      ],
    });
  };

  const handleSubmit = async () => {
    if (!isValid()) {
      alert("Please fill all fields");
      return;
    } else {
      if (!toast.isActive("toastProduct")) {
        const response = await dispatch(postProduct(products));
        if (!response.data.success) {
          return toast({
            id: "toastProduct",
            title: "Error",
            description: `${response.data.msg}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            id: "toastProduct",
            title: "Success",
            description: `${response.data.msg}`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          dispatch(getFiltered("","","","","","",""))
          handleClear();
          onClose();
        }
      }
    }
  };

  return (
    <Box>
      {/* <Tooltip
        placement={"bottom-start"}
        label={"Create Product"}
        fontWeight={"hairline"}
      > */}
        <Button
         leftIcon={<AiOutlinePlus />}
         variant={"unstyled"}
         display={"flex"}
         alignSelf={"flex-end"}
         mr={"1vw"}
         alignItems={"center"}
         fontSize={"sm"}
         color={"web.text2"}
         fontWeight={"normal"}
         _hover={{
           color: "logo.orange",
          }}
         _active={{}}
         onClick={onOpen}
        >
         Create product
       </Button>
      {/* </Tooltip> */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInRight"
      >
        <ModalOverlay />
        <ModalContent
          minW={"50vw"}
          maxW={"78vw"}
          bg={"web.sideBar"}
          border={"1px solid"}
          borderColor={"web.border"}
          position={"relative"}
          zIndex={100}
        >
          <ModalCloseButton
            color={"web.text2"}
            mt={"2vh"}
            mr={"0.5vw"}
            position={"absolute"}
          />
          <ModalHeader
            mt={"2vh"}
            ml={"1vw"}
            fontSize={"lg"}
            justifyContent={"space-between"}
            display={"flex"}
            flexDir={"row"}
            alignItems={"center"}
            color={"web.text"}
          >
            Create product
          </ModalHeader>
          <ModalBody
            position={"relative"}
            color={"web.text2"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            flexDir={"column"}
          >
            <Box display={"flex"} w={"full"}>
              <InputsCreateProduct
                products={products}
                handleChangeProductName={handleChangeProductName}
                factories={factories}
                materials={materials}
                addProduct={addProduct}
                handleClear={handleClear}
              />
            </Box>
            <TableContainer mr={"0.5vw"} ml={"0.5vw"} mt={'1vh'} w={'75vw'} maxW={'75vw'} minW={'75vw'}>
               <Table color={"web.text"} variant={"simple"} size={"sm"}w={'74vw'} maxW={'74vw'} minW={'74vw'}>
                <Thead h={"6vh"}>
                  <Tr>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"} w={'6vw'}> Type </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"} w={'6vw'}> U/M </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"} w={'10vw'}> Size </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"} w={'10vw'} > Thickness </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"} w={'10vw'} > Finish </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"} w={'10vw'} > Price </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"} w={'6vw'}> </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.dimensions.map((product, index) => (
                    <ModelTr
                      key={index}
                      index={index}
                      handleChange={handleChange}
                      handleDelete={handleDelete}
                      product={product}
                      values={values}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter
            mb={"2vh"}
            mt={"2vh"}
            display={"flex"}
            justifyContent={"flex-end"}
            ml={"1vw"}
            mr={"0.5vw"}
          >
            <Button
              colorScheme="orange"
              mr={3}
              disabled={!isValid()}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const ModelTr = ({ product, handleChange, handleDelete, index, values }) => {
  return (
    <Tr
      cursor={"pointer"}
      key={index}
      _hover={{
        bg: "web.navBar",
        color: "logo.orange",
      }}
    >
      <Td maxW={"6vw"} minW={'6vw'} pl={'2vw'}>
        <Select
          onChange={(e) => handleChange(e, "type", index)}
          mb={"0.5vh"}
          mr={"2vw"}
          w={"5vw"}
          minH={"5.5vh"}
          variant="unstyled"
          textColor={"web.text2"}
          _placeholder={{
            fontFamily: "body",
            fontWeight: "inherit",
            textColor: "inherit",
          }}
          size={"sm"}
          borderBottomColor={"web.text2"}
          _hover={{ borderColor: "web.border" }}
          cursor={"pointer"}
          name={"type"}
          value={product.type}
        >
          <option value="Tile" className="options">
            Tile
          </option>
          <option value="Slab" className="options">
            Slab
          </option>
          <option value="Mosaic" className="options">
            Mosaic
          </option>
        </Select>
      </Td>
      <Td maxW={"6vw"} pl={'3vw'} >
        <Text
          id="um"
          textColor={"web.text2"}
          _hover={{ borderColor: "web.border" }}
        >
          {product.um}
        </Text>
      </Td>
      <Td maxW={"6vw"} minW={"6vw"} pl={'4.5vw'} >
        <Input
          w={"5vw"}
          minH={"4.5vh"}
          variant="unstyled"
          placeholder={"Ex: 24x48 "}
          textColor={"web.text2"}
          _placeholder={{ fontFamily: "body", fontWeight: "thin" }}
          size={"sm"}
          value={product.size}
          borderBottomColor={"web.text2"}
          name={"size"}
          onChange={(e) => handleChange(e, "size", index)}
        />
      </Td>
      <Td maxW={"6vw"} minW={"6vw"} pl={'4vw'} >
        <Input
          w={"5vw"}
          minH={"4.5vh"}
          variant="unstyled"
          placeholder={"Ex: 3/4 or 9Mm"}
          textColor={"web.text2"}
          _placeholder={{ fontFamily: "body", fontWeight: "thin" }}
          size={"sm"}
          value={product.thickness}
          borderBottomColor={"web.text2"}
          name={"thickness"}
          onChange={(e) => handleChange(e, "thickness", index)}
        />
      </Td>
      <Td maxW={"8vw"} minW={"8vw"} pl={'3.5vw'} >
        <Select
          onChange={(e) => handleChange(e, "finish", index)}
          mb={"0.5vh"}
          mr={"2vw"}
          w={"8vw"}
          minH={"5.5vh"}
          variant="unstyled"
          textColor={"web.text2"}
          _placeholder={{
            fontFamily: "body",
            fontWeight: "inherit",
            textColor: "inherit",
          }}
          size={"sm"}
          borderBottomColor={"web.text2"}
          _hover={{ borderColor: "web.border" }}
          cursor={"pointer"}
          name={"finish"}
          value={product.finish}
        >
          {values?.finishValues &&
            values?.finishValues?.map((v, i) => {
              return (
                <option
                  value={`${v}`}
                  key={i}
                  className={"options"}
                >{`${v}`}</option>
              );
            })}
        </Select>
      </Td>
      <Td maxW={"6vw"} minW={"6vw"} pl={'4vw'} >
        <Input
          borderColor={"web.border"}
          color={"web.text2"}
          w={"5vw"}
          h={"4vh"}
          onChange={(e) => handleChange(e, "price", index)}
          step={1}
          min={0}
          precision={0}
          type="number"
          name={"price"}
          key={index}
          value={product.price}
          fontSize={"2xs"}
          style={{
            textAlign: "center",
            WebkitPaddingEnd: 8,
            WebkitPaddingStart: 8,
          }}
          _focus={{
            borderColor: "logo.orange",
            boxShadow:
              "0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)",
          }}
        ></Input>
      </Td>
      <Td maxW={"4vw"} minW={"4vw"}pl={'2vw'} >
        <IconButton
          icon={<DeleteIcon />}
          variant={"unstyled"}
          display={"flex"}
          borderRadius={"full"}
          size={"sm"}
          placeContent={"center"}
          alignItems={"center"}
          color={"web.text2"}
          _hover={{
            color: "logo.orange",
          }}
          _active={{}}
          onClick={() => handleDelete(index)}
        />
      </Td>
    </Tr>
  );
};

export default CreateProduct;
