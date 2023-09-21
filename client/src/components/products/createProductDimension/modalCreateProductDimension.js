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
  Progress,
  Select,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineClear, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getFiltered, postProduct } from "../../../redux/actions-products";
import { SearchProduct } from "./searchProduct";
import CreateListProductDimension from "./createListProductDimension";

const CreateProductDimension = ({ values, factories, materials }) => {
  const allProducts = useSelector((state) => state.all_products);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const [progress, setProgress] = useState(50)
  const [disabled, setDisabled] = useState(false)
  const [products, setProducts] = useState({
    idProduct: "",
    searchProduct: "",
    productSelect: "",
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

    const handleNextButton = () => {
      setProgress(progress + 50);
  };

  const handleChangeProductName = (event) => {
    const { name, value } = event.target;
    setProducts({
      ...products,
      [name]: value,
    });
    dispatch(
      getFiltered(
        "",
        "",
        "",
        "",
        event.target.value,
        "",
        ""
      )
    );
  };

    const handlePreviousButton = () => {
    setProgress(progress - 50);
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
          handleClear();
          onClose();
        }
      }
    }
  };

  return (
    <Box>
      <Tooltip
        placement={"bottom-start"}
        label={"Create product dimension"}
        fontWeight={"hairline"}
      >
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
         New Product Dimension 
       </Button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInRight"
      >
        <ModalOverlay />
        <ModalContent
          minW={progress === 100 ? "50vw" : null}
          maxW={progress === 100 ? "78vw" : null}
          bg={"web.sideBar"}
          border={"1px solid"}
          borderColor={"web.border"}
          position={"relative"}
          zIndex={100}
        >
            <Progress 
            value={progress}
            colorScheme={"orange"}
            mb={"2vh"}
            background={"web.border"}
            size={"sm"}
            borderTopRightRadius={"md"}
            borderTopLeftRadius={"md"}
            />
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
            Create Product Dimension
          </ModalHeader>
          <ModalBody
            position={"relative"}
            color={"web.text2"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            flexDir={"column"}
          >
            {
              progress === 50 && (
                <SearchProduct
                allProducts={allProducts}
                handleChangeProductName={handleChangeProductName}
                products={products}
                setProducts={setProducts}
                />
              )

            }
            {
              progress === 100 && (
                <CreateListProductDimension 
                values={values}
                materials={materials}
                products={products}
                setProducts={setProducts}
                handleClear={handleClear}
                /> 
              )
            }
          </ModalBody>
          <ModalFooter
            mb={"2vh"}
            mt={"2vh"}
            display={"flex"}
            justifyContent={"flex-end"}
            ml={"1vw"}
            mr={"0.5vw"}
          >
            {
              progress === 50 &&
              <Button
              colorScheme="orange"
              mr={3}
              disabled={products.productSelect === "" ? true : false}
              onClick={handleNextButton}>
                Next
              </Button>
            }
            {
            progress === 100 && 
            <Box display={"flex"} justifyContent={"space-between"} w={"full"}>
              <Button
              colorScheme="orange"
              mr={3}
              onClick={handlePreviousButton}
              >
                Prev
              </Button>
              <Button
              colorScheme="orange"
              mr={3}
              disabled={!isValid()}
              onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
            }
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
      <Td pl={"3.5vw"} maxW={"6vw"}>
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
      <Td pl={"3.5vw"} maxW={"6vw"}>
        <Text
          id="um"
          textColor={"web.text2"}
          _hover={{ borderColor: "web.border" }}
        >
          {product.um}
        </Text>
      </Td>
      <Td pl={"3.5vw"} maxW={"6vw"} minW={"6vw"}>
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
      <Td pl={"3vw"} maxW={"6vw"} minW={"6vw"}>
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
      <Td pl={"3.5vw"} maxW={"8vw"} minW={"8vw"}>
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
      <Td pl={"3vw"} maxW={"6vw"} minW={"6vw"}>
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
      <Td pl={"5vw"} maxW={"4vw"} minW={"4vw"}>
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

export default CreateProductDimension;
