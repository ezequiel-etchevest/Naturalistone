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
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredSearch, postProduct } from "../../../redux/actions-products";
import { SearchProduct } from "./searchProduct";
import CreateListProductDimension from "./createListProductDimension";

const CreateProductDimension = ({ values, materials }) => {
  const all_products_search = useSelector((state) => state.all_products_search);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const [progress, setProgress] = useState(50)
  const [products, setProducts] = useState({
    idProduct: "",
    idProductName: "",
    searchProduct: "",
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
      getFilteredSearch(
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
    idProduct: "",
    idProductName: "",
    searchProduct: "",
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
          setProgress(50)
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
                all_products_search={all_products_search}
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
              disabled={products.idProductName === "" ? true : false}
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

export default CreateProductDimension;
