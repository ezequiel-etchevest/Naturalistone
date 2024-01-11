import { 
    Text,
    Table,
    Thead,
    Tbody,
    Box,
    Tr,
    Th,
    Td,
    TableContainer,
    FormLabel,
    Textarea,
    FormControl,
    useToast,
    Collapse,
    Input,
    Tooltip,
    IconButton,
    } from "@chakra-ui/react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TfiSplitV } from "react-icons/tfi";
import '../../../assets/styleSheet.css'
import React, { useState } from "react";
import BreakDrownProduct from "./createQuoteBreakDownProducts";

const CreateQuoteProductsReview = ({ formData, setFormData }) => {
  const toast = useToast();
  const toastId = "error-toast";
  const [isOpenState, setIsOpenState] = useState({});
  

  const handleChangeNotes = (e) => {

    const inputValue = e.target.value;

    if (inputValue.length <= 180) {
      setFormData({
        ...formData,
        quote: {
          ...formData?.quote,
          notes: inputValue,
        },
      });
    } else if(!toast.isActive(toastId)) {
          toast({
            id: toastId,
            title: "Error",
            description: "Text field, up to 180 characters",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
  }}

  const handleChangeInputs = (i, type, value, name) => {

    setFormData((prevFormData) => {
      const updatedProducts = { ...prevFormData[type] };
  
      if (!updatedProducts[i]) {
        return prevFormData; // No hace cambios si el producto con el i no existe
      }
  
      updatedProducts[i] = {
        ...updatedProducts[i],
        [name]: value,
      };
  
      return {
        ...prevFormData,
        [type]: updatedProducts,
      };
    });
  };
  
  const handleToggle = (index) => {
    // Maneja el estado de isOpen para el índice específico
    setIsOpenState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const generateUniqueId = (prefix, index) => {
    return `${prefix}_${index}`;
  };

  return(
<>
<Box display={"flex"} justifyContent={"center"} flexDir={'column'}>
  <Text h={'4vh'} mb={'1vh'} mt={'2vh'} ml={'2vw'} fontSize={'lg'} w={'16vw'} color={'white'} alignSelf={'flex-start'}>Products review</Text>
  <Box 
    color={'web.text2'} 
    maxHeight={'45vh'}
    minHeight={'45vh'}
    overflow={'auto'}
    css={{
      '&::-webkit-scrollbar': {
        width: '0.2vw',
      },
      '&::-webkit-scrollbar-track': {
        width: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#E47424',
        borderRadius: '5px',
      },
    }} 
    alignItems={'center'}>
    <TableContainer
      mr={'0.5vw'}  
      ml={'0.5vw'}
      bg={'web.sideBar'} 
      rounded={'md'}
      px={'3vh'}>
      <Table color={'web.text'} variant={'simple'} size={'sm'}>
        <Thead h={'6vh'}>
          <Tr>  
            <Th color={'web.text2'} fontSize={'sm'} textAlign={'center'}>Quantities</Th>
            <Th color={'web.text2'} fontSize={'sm'} w={'16vw'} >Product Name</Th>
            <Th color={'web.text2'} fontSize={'sm'} textAlign={'center'}>Type</Th>
            <Th color={'web.text2'} fontSize={'sm'} textAlign={'center'}>Size</Th>
            <Th color={'web.text2'} fontSize={'sm'} textAlign={'center'}>Thickness</Th>
            <Th color={'web.text2'} fontSize={'sm'} textAlign={'center'}>Price</Th>
            <Th color={'web.text2'} fontSize={'sm'} w={'10vw'} textAlign={'center'}>Finish</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
        {Object.entries(formData.products).length
          ? Object.entries(formData.products).map((e, i) => (
              <React.Fragment key={i}>
                <Tr
                  cursor={"pointer"}
                  key={i}
                  _hover={{
                    bg: "web.navBar",
                    color: "logo.orange",
                  }}
                  onClick={() => handleToggle(generateUniqueId("product", i))}
                >
              <Td fontSize={'xs'} textAlign={'center'}>{e[1].quantity}</Td>
              <Td fontSize={'xs'} w={'16vw'} >{e[1].prodName}</Td>
              <Td fontSize={'xs'} textAlign={'center'}>{e[1].type}</Td>
              <Td fontSize={'xs'} textAlign={'center'}>{e[1].size}</Td>
              <Td fontSize={'xs'} textAlign={'center'}>{e[1].thickness}</Td>
              <Td fontSize={'xs'} textAlign={'center'}>{e[1].price}</Td>
              <Td fontSize={'xs'} textAlign={'center'}>{e[1].finish}</Td>
              <Td>
                  <BreakDrownProduct product={e[1]} products = {formData.products} setFormData={setFormData} />
              </Td>
              <Td> { !isOpenState[`product_${i}`] ? <IoIosArrowDown/> : <IoIosArrowUp /> } </Td>
              </Tr>
              <Tr display= {isOpenState[`product_${i}`] ? 'table-row' : 'none' }>
                <Td colSpan={7}>
                  <Collapse
                      key={`product_${i}`}
                      in={isOpenState[`product_${i}`]}
                      >
                    <Box display={'flex'} justifyContent={'space-around'} color="white" mt="1">
                    <Input
                      mb={"0.5vh"}
                      w={"24vw"}
                      minW={"120px"}
                      minH={"4.5vh"}
                      variant="unstyled"
                      textColor={"web.text2"}
                      pl={'10px'}
                      name={'leadTime'}
                      onChange={(ev) => handleChangeInputs(e[1].prodID, "products", ev.target.value, 'leadTime')}
                      value={formData.products[e[1].prodID]?.leadTime || ""}
                      _placeholder={{
                        fontFamily: "body",
                        fontWeight: "inherit",
                      }}
                      size={"sm"}
                      fontSize={'xs'}
                      border={'0.2px solid #30363D'}
                      placeholder={"Lead time - In stock"}
                      type={"text"}
                    />
                    <Input
                      mb={"0.5vh"}
                      w={"24vw"}
                      minW={"120px"}
                      minH={"4.5vh"}
                      variant="unstyled"
                      textColor={"web.text2"}
                      pl={'10px'}
                      _placeholder={{
                        fontFamily: "body",
                        fontWeight: "inherit",
                      }}
                      onChange={(ev) => handleChangeInputs(e[1].prodID, "products", ev.target.value, 'notes')}
                      value={formData.products[e[1].prodID]?.notes || ""}
                      size={"sm"}
                      fontSize={'xs'}
                      border={'0.2px solid #30363D'}
                      placeholder={"Product notes"}
                      type={"text"}
                      name={"notes"}
                    />
                    </Box>
                  </Collapse>
                  </Td>
                  <Td></Td>
                  <Td></Td>
                  </Tr>
                </React.Fragment>
              ))
          : null
        }
        {
        Object.entries(formData.specialProducts).length
          ? Object.entries(formData.specialProducts).map((e, i) => (
          <React.Fragment key={i}>
            <Tr
              cursor={"pointer"}
              key={i}
              _hover={{
                bg: "web.navBar",
                color: "logo.orange",
              }}
              onClick={() => handleToggle(generateUniqueId("specialProduct", i))}
              >
              <Td fontSize={'xs'} textAlign={'center'}>{e[1]?.quantity}</Td>
              <Td fontSize={'xs'} w={'16vw'}>{e[1]?.prodName}</Td>
              <Td fontSize={'xs'} textAlign={'center'}>{e[1]?.type}</Td>
              <Td fontSize={'xs'} textAlign={'center'}>{e[1]?.size}</Td>
              <Td fontSize={'xs'} textAlign={'center'}>{e[1]?.thickness}</Td>
              <Td fontSize={'xs'} textAlign={'center'}>{e[1]?.price}</Td>
              <Td fontSize={'xs'} textAlign={'center'}>{e[1]?.finish}</Td>
              <Td>
                  <BreakDrownProduct product={e[1]} products = {formData.specialProducts} setFormData={setFormData} />
              </Td>
              <Td> { !isOpenState[`specialProduct_${i}`] ? <IoIosArrowDown/> : <IoIosArrowUp /> } </Td>
            </Tr>
            <Tr display= {isOpenState[`specialProduct_${i}`] ? 'table-row' : 'none' }>
              <Td colSpan={7}>
                <Collapse
                  key={`specialProduct_${i}`}
                  in={isOpenState[`specialProduct_${i}`]}
                  >
                  <Box display={'flex'} justifyContent={'space-around'} color="white" mt="1">
                    <Input
                      mb={"0.5vh"}
                      w={"24vw"}
                      minW={"120px"}
                      minH={"4.5vh"}
                      variant="unstyled"
                      textColor={"web.text2"}
                      pl={'10px'}
                      _placeholder={{
                        fontFamily: "body",
                        fontWeight: "inherit",
                      }}
                      onChange={(ev) => handleChangeInputs(i, "specialProducts", ev.target.value, 'leadTime')}
                      value={formData.specialProducts[i]?.leadTime || ""}
                      size={"sm"}
                      fontSize={'xs'}
                      border={'0.2px solid #30363D'}
                      placeholder={"Lead time - In stock"}
                      type={"text"}
                    />
                    <Input
                      mb={"0.5vh"}
                      w={"24vw"}
                      minW={"120px"}
                      minH={"4.5vh"}
                      variant="unstyled"
                      textColor={"web.text2"}
                      pl={'10px'}
                      _placeholder={{
                        fontFamily: "body",
                        fontWeight: "inherit",
                      }}
                      onChange={(ev) => handleChangeInputs(i, "specialProducts", ev.target.value, 'notes')}
                      value={formData.specialProducts[i]?.notes || ""}
                      size={"sm"}
                      fontSize={'xs'}
                      border={'0.2px solid #30363D'}
                      placeholder={"Product notes"}
                      type={"text"}
                      name={"notes"}
                    />
                  </Box>
                </Collapse>
              </Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          </React.Fragment> 
        ))
        : null}
        </Tbody>
      </Table>
    </TableContainer>
  </Box>
    <FormControl mt={'3vh'} px={'2vw'}>
      <Box
        display={'flex'} 
        flexDirection={'row'}
        >
        <FormLabel color={'web.text'}>Notes:</FormLabel>
      </Box>
      <Textarea
        h={"50px"}
        variant="unstyled"
        textColor={'web.text'}
        placeholder="Write your comment here..."
        _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', fontStyle:'italic' }}
        size={"sm"}
        border={'1px solid'}
        borderColor={'web.border'}
        type={"text"}
        value={formData?.quote?.notes}
        onChange={(e)=> handleChangeNotes(e)}
        px={"1vw"}
        />
    </FormControl>
  </Box>
</>
)}

export default CreateQuoteProductsReview

