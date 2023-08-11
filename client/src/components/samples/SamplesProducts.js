import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSamplesProducts } from "../../redux/actions-samples";

const SamplesProducts = ({ isOpenModal, onCloseModal, idSamples }) => {
  const samples_products = useSelector((state) => state.samples_products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSamplesProducts(idSamples));
  }, []);


  return (
    <>
      <Modal isOpen={isOpenModal} onClose={onCloseModal} size={"3xl"}>
        <ModalOverlay />
        <ModalContent
          bg={"web.sideBar"}
          border={"1px solid"}
          borderColor={"web.border"}
          h={"76vh"}
        >
          <ModalHeader
            display={"flex"}
            justifyContent={"center"}
            color={"web.text"}
            mt={"3vh"}
            h={"7vh"}
          >
            Sample Products
          </ModalHeader>
          <ModalCloseButton
            color={"web.text2"}
            _hover={{
              color: "web.text",
            }}
            onClick={onCloseModal}
          />
          <ModalBody
            color={"web.text2"}
            display={"flex"}
            justifyContent={"flex-start"}
            flexDir={"column"}
            maxH={"70vh"}
          >
            <Box
              maxHeight={"59vh"}
              minHeight={"50vh"}
              overflow={"auto"}
              css={{
                "&::-webkit-scrollbar": {
                  width: "0.4vw",
                },
                "&::-webkit-scrollbar-track": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#E47424",
                  borderRadius: "5px",
                },
              }}
              bg={"web.sideBar"}
              rounded={"md"}
              p={"3vh"}
            >
              <TableContainer>
                <Table color={"web.text"} variant={"simple"} size={"sm"}>
                  <Thead h={"6vh"}>
                    <Tr h={"6vh"}>
                      <Th
                        color={"web.text2"}
                        textAlign={"center"}
                        fontSize={"x-small"}
                      >
                        Product Name
                      </Th>
                      <Th
                        color={"web.text2"}
                        textAlign={"center"}
                        fontSize={"x-small"}
                      >
                        Material
                      </Th>
                      <Th
                        color={"web.text2"}
                        textAlign={"center"}
                        fontSize={"x-small"}
                      >
                        Finish
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {samples_products.map((e, i) => (
                      <Tr
                        key={e}
                        cursor={"pointer"}
                        _hover={{
                          bg: "web.navBar",
                          color: "logo.orange",
                        }}
                        borderBottom={"1px solid"}
                        fontSize={"xs"}
                        textAlign={"center"}
                        fontWeight={"hairline"}
                        h={"4.5vh"}
                      >
                        <Td textAlign={"center"}>{e.Naturali_ProdName}</Td>
                        <Td textAlign={"center"}>{e.Material}</Td>
                        <Td textAlign={"center"}>{e.Finish}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SamplesProducts;
