import { DeleteIcon } from "@chakra-ui/icons";
import { 
  Box,
  Button,
  HStack,
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
  } from "@chakra-ui/react"
import { useState } from "react";
import { AiOutlineClear, AiOutlinePlus } from 'react-icons/ai';
import { TfiSplitV } from "react-icons/tfi";



const BreakDrownProduct = ({product, products, setFormData}) => {
  console.log({product})
  console.log({products})
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [acc, setAcc] = useState(0);

  const [breakdown, setBreakdown] = useState([{
    quantity: 0, 
    description: ""
  }])
 
  
  const addProduct = () => {
    setBreakdown([...breakdown, {
      quantity: 0, 
      description: ""
    }])
  }

  const handleClear = () => {
    setBreakdown([{
      quantity: 0, 
      description: ""
    }])
  }

  const handleDelete = (index) => {
    if(breakdown.length === 1){
      handleClear()
    } else {
    const newBreakDown = [...breakdown];
    newBreakDown.splice(index, 1);
    setBreakdown(newBreakDown);
    }
  }

  const handleChange = (e, field, index) => {

    const updated = {...breakdown[index]};

    const value = e.target.value;
   
    if(field === 'quantity') {
  
      const regex = /^\d+(\.\d{1,2})?$|^$/;
  
      if(regex.test(value)) {
      
        if(value === '') {
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
  
    setBreakdown(prev => {
      // Actualizar producto en estado
      const newBreakdown = [...prev];
      newBreakdown[index] = updated;

      const totalQuantity = newBreakdown.reduce((sum, item) => sum + item.quantity, 0);
      setAcc(totalQuantity);

      return newBreakdown; 
    });
  }

  const isValid = () => {

    return acc <= product.quantity && breakdown.every(row => {
      const requiredFields = ['quantity', 'description'];
  
      return Object.keys(row).every(field => {
        if (requiredFields.includes(field)) {
          // Validar que el campo no sea 0 o una cadena vacía
          return row[field] !== 0 && row[field] !== '';
        } else {
          return true; // Para otros campos no especificados, no aplicar validación
        }
      });
    });
  };
  
  

  const handleSubmit = () => {
    // if (!isValid()) {
    //   alert('Please fill all fields');
    //   return;
    // } else {

    //   setFormData({
    //     ...formData,
    //     specialProducts: products
    //   })
    // }

    // onClose()
  }

  return(
    <Box>
      <Tooltip placement={'top'} label={'Break down Product'}fontWeight={'hairline'}>      
        <IconButton
          icon={ <TfiSplitV/>}
          variant={'unstyled'} 
          display={'flex'} 
          borderRadius={'sm'} 
          placeContent={'center'}
          alignItems={'center'}
          color={'web.text'} 
          onClick={onOpen}
          _hover={{
             color: 'logo.orange'
             }}
          _active={{
          }}
          >
        </IconButton>
      </Tooltip> 
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInRight"
      >
        <ModalOverlay />
        <ModalContent
          minW={"60vw"}
          maxW={'60vw'}
          bg={"web.sideBar"}
          border={"1px solid"}
          borderColor={"web.border"}
        >
          <ModalCloseButton
            color={"web.text2"}
            mt={"2vh"}
            mr={"0.5vw"}
            position={"absolute"}
          />
          <ModalHeader mt={'2vh'} ml={'1vw'} fontSize={'lg'} justifyContent={'space-between'}
          display={'flex'} flexDir={'row'} alignItems={'center'} color={'web.text'} >
            Breakdown product
          </ModalHeader>
          <ModalBody
            color={"web.text2"}
            display={"flex"}
            justifyContent={"center"}
            flexDir={"column"}>
            <HStack gap={'7vw'}>
              <HStack ml={'1vw'} minW={'38vw'}>
                <Text minW={'22vw'}  display={'flex'} alignItems={'center'}>{product.prodName} {product.material} {product.finish} {product.type} {product.size} {product.thickness}</Text>
                <Text  w={'8vw'} display={'flex'} justifyContent={'center'} alignItems={'center'}>{product.quantity}</Text>
              </HStack>
              <HStack gap={'1vw'}>
                <Button
                  rightIcon={ <AiOutlinePlus/>}
                  variant={'unstyled'} 
                  display={'flex'} 
                  alignSelf={'flex-end'}
                  alignItems={'center'}
                  fontSize={'sm'}
                  color={'web.text2'}     
                  fontWeight={'normal'}
                  _hover={{
                     color: 'logo.orange'
                     }}
                  _active={{
                  }}
                  onClick={addProduct}
                  >
                    Add row
                </Button>
                <Tooltip placement={'bottom'} label={'Clear all filters'} fontWeight={'hairline'}>      
                  <IconButton
                    icon={ <AiOutlineClear/>}
                    variant={'unstyled'} 
                    display={'flex'} 
                    borderRadius={'sm'} 
                    placeContent={'center'}
                    alignItems={'center'}
                    color={'web.text2'} 
                    _hover={{
                       color: 'logo.orange'
                       }}
                    _active={{
                    }}
                    onClick={(e) => handleClear(e)}
                    >
                  </IconButton>
                </Tooltip> 
            </HStack>
          </HStack>
          <TableContainer mr={"0.5vw"} ml={"1vw"} mt={'1vh'} w={'50vw'} maxW={'55vw'} minW={'55vw'}  justifyContent={'center'} display={'flex'}>
               <Table color={"web.text"} variant={"simple"} size={"sm"} w={'45vw'} maxW={'45vw'} minW={'45vw'}>
                <Thead h={"6vh"}>
                  <Tr>
                    <Th color={"web.text2"} fontSize={"2xs"} w={'10vw'}textAlign={"center"}> Quantities </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} w={'30vw'} textAlign={"center"}> Description </Th>
                    <Th color={"web.text2"} fontSize={"2xs"}></Th>
                  </Tr>
                </Thead>
                <Tbody> 
                {breakdown?.map((row, index) => (
                  <ModelTr
                    key={index} 
                    index={index}
                    row={row}
                    handleDelete={handleDelete}
                    handleChange={handleChange}
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
            justifyContent={'flex-end'}
            ml={"1vw"}
            mr={"0.5vw"}>
              <Tooltip visibility={!isValid() ? true : false} label={`Quantities must be less or equal to ${product.quantity}`}>
                <Button
                    colorScheme="orange"
                    mr={3}
                    disabled={!isValid()}
                    onClick={handleSubmit}
                  >
                    Submit
                </Button>
              </Tooltip>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
  
}


const ModelTr = ({row, index, handleDelete, handleChange}) => {
  
  return (
    <Tr
    cursor={"pointer"}
    key={index}
    _hover={{
      bg: "web.navBar",
      color: "logo.orange",
    }}
    >
      <Td  maxW={'6vw'}  minW={'6vw'}>
          {/* <Box display={'flex'} justifyContent={'space-around'} color="white" mt="1"> */}
            <Input
              mb={"0.5vh"}
              w={"6vw"}
              minW={"80px"}
              minH={"4.5vh"}
              variant="unstyled"
              textColor={"web.text2"}
              name={'quantity'}
              onChange={(ev) => handleChange(ev, 'quantity', index)}
              value={row.quantity}
              _placeholder={{
                fontFamily: "body",
                fontWeight: "inherit",
              }}
              size={"sm"}
              fontSize={'xs'}
              border={'0.2px solid #30363D'}
              type={"number"}
              textAlign= {"center"}
            />
      </Td>
      <Td maxW={'20vw'} minW={'20vw'}>
            <Input
              mb={"0.5vh"}
              w={"20vw"}
              minH={"4.5vh"}
              variant="unstyled"
              textColor={"web.text2"}
              pl={'10px'}
              _placeholder={{
                fontFamily: "body",
                fontWeight: "inherit",
              }}
              onChange={(ev) => handleChange(ev, 'description', index)}
              value={row.description}
              size={"sm"}
              fontSize={'xs'}
              border={'0.2px solid #30363D'}
              placeholder={"Description"}
              type={"text"}
              name={"description"}
            />
      </Td>
      <Td maxW={'4vw'} minW={'4vw'}>
        <IconButton
          icon={ <DeleteIcon/>}
          variant={'unstyled'} 
          display={'flex'} 
          borderRadius={'full'}
          size={'sm'} 
          placeContent={'center'}
          alignItems={'center'}
          color={'web.text2'} 
          _hover={{
             color: 'logo.orange'
             }}
          _active={{
          }}
          onClick={() => handleDelete(index)}
        />
      </Td>
    </Tr>
  )
}

export default BreakDrownProduct
