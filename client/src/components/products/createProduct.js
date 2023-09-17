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
  } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { AiOutlineFire, AiOutlinePlus } from 'react-icons/ai';
import { BsFillPlusSquareFill } from "react-icons/bs"
import { InputsCreateProduct } from "./createProductInputs";
import { useDispatch } from "react-redux";
import { postProduct } from "../../redux/actions-products";

const CreateProduct = ({values, factories}) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const [products, setProducts] = useState({
    prodName:'',
    material: '',
    factoryProdName:'',
    factory: '',
    dimensions: [{
          um: 'Sqft',
          size: '',
          thickness: '',
          type:'Tile',
          finish:'Honed',
          price:0
        }]
    });
  
  const addProduct = () => {
    setProducts({...products,
      dimensions:[...products.dimensions, {
      um: 'Sqft',
      size: '',
      thickness: '',
      type:'Tile',
      finish:'Honed',
      price:0
    }]}) 
  }

  const handleChangeProductName = (event) => {
    const {name, value} = event.target
    setProducts({
        ...products,
        [name]: value
    })
  }

  const handleChange = (e, field, index) => {
    const value = e.target.value;
    
    const updated = {...products.dimensions[index]};

   if (field === 'type') {
    if (value === "Tile" || value === "Mosaic") {
    setProducts(prev => {
      const newProducts = {
        ...prev,
        dimensions: [...prev.dimensions]
      };
      newProducts.dimensions[index].um = 'Sqft';
      
      return newProducts; 
    });
      updated['um'] = 'Sqft'
    } else {
    setProducts(prev => {
      const newProducts = {
        ...prev,
        dimensions: [...prev.dimensions]
      };
      newProducts.dimensions[index].um = 'Units';
      
      return newProducts; 
    });
      updated['um'] = 'Units'
    }
   }
    if(field === 'price') {
  
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
  
    setProducts(prev => {
      console.log("soy prev", prev)
      // Actualizar producto en estado
      const newProducts = {
        ...prev,
        dimensions: [...prev.dimensions]
      };
      newProducts.dimensions[index] = updated;
      
      return newProducts; 
    });
  }

  const handleDelete = (index) => {
    const newProducts = [...products.dimensions];
    newProducts.splice(index, 1);
    setProducts({
      ...products,
      dimensions:newProducts
    });
  }

  console.log("products", products)

  const isValid = () => {
    if (
      products.prodName === ''||
      products.factory === '' ||
      products.factoryProdName === '' ||
      products.material === ''
      ) return false
    return products.dimensions.every(product => {
      const requiredFields = ['price'];
  
      return Object.keys(product).every(field => {
        if(requiredFields.includes(field)) {
          return product[field] !== 0;  
        } else {
          return product[field] !== '';
        }
      });
    });
  }

  const handleSubmit = async () => {
    if (!isValid()) {
      alert('Please fill all fields');
      return;
    } else {
      const { response } = await dispatch(postProduct(products))
      console.log("soy response", response)
      if (!response.data.success) {
      if(!toast.isActive("toastProduct")){
        return toast(({
          id: "toastProduct",
          title: "Error",
          description: `${response.data.msg}`,
          status: "error",
          duration: 5000,
          isClosable: true,
          }))
      } else {
        toast(({
          id: "toastProduct",
          title: "Success",
          description: `${response.data.msg}`,
          status: "success",
          duration: 5000,
          isClosable: true,
          }))
        onClose()
      }
      }
    }
  }

  useEffect(() => {

  },[products])

  return(
    <Box>
      <Tooltip placement={'bottom-start'} label={'Create Product'} fontWeight={'hairline'}>      
        <IconButton
          icon={ <BsFillPlusSquareFill/>}
        //   pt={'1.2vh'}
          mr={'0.5vw'}
          variant={'unstyled'} 
          display={'flex'} 
          borderRadius={'full'}
          size={'lg'} 
          placeContent={'center'}
          alignItems={'center'}
          color={'web.text2'} 
          _hover={{
             color: 'logo.orange'
             }}
          _active={{
          }}
          onClick={onOpen}
          >
        </IconButton>
      </Tooltip> 
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInRight"
        zIndex={20}
      >
        <ModalOverlay />
        <ModalContent
          minW={"50vw"}
          maxW={'78vw'}
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
            Create Product
          </ModalHeader>
          <ModalBody
            zIndex={20}
            color={"web.text2"}
            display={"flex"}
            justifyContent={"space-between"} 
            alignItems={'flex-start'}
            flexDir={"column"}>
            <Box display={"flex"} w={"full"} >
            <InputsCreateProduct products={products} handleChangeProductName={handleChangeProductName} factories={factories} />
            <Button
              rightIcon={ <AiOutlinePlus/>}
              variant={'unstyled'} 
              display={'flex'} 
              alignSelf={'flex-end'}
              mr={'1vw'}
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
            </Box>
            <TableContainer mr={"0.5vw"} ml={"0.5vw"} mt={'1vh'} w={'75vw'} maxW={'75vw'} minW={'75vw'}>
               <Table color={"web.text"} variant={"simple"} size={"sm"}w={'74vw'} maxW={'74vw'} minW={'74vw'}>
                <Thead h={"6vh"}>
                  <Tr>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"}> Type </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"}> U/M </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"}> Size </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"}> Thickness </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"}> Finish </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"}> Price </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"}> </Th>
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
            justifyContent={'flex-end'}
            ml={"1vw"}
            mr={"0.5vw"}>
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
  )
}

const ModelTr = ({product, handleChange, handleDelete, index, values}) => {

  
  
  return (
    <Tr
    cursor={"pointer"}
    key={index}
    _hover={{
      bg: "web.navBar",
      color: "logo.orange",
    }}
    >
      <Td pl={'3.5vw'} maxW={'6vw'}>
        <Select
          onChange={e => handleChange(e, 'type', index)}
          mb={'0.5vh'}
          mr={'2vw'}
          w={'5vw'}         
          minH={'5.5vh'}
          variant="unstyled"
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
          size={"sm"}
          borderBottomColor={'web.text2'}
          _hover={{borderColor: 'web.border'}}
          cursor={'pointer'}
          name={'type'}
          value={product.type}
          >
          <option value='Tile'className="options">Tile</option>
          <option value='Slab' className="options">Slab</option>
          <option value='Mosaic' className="options">Mosaic</option>
        </Select>
      </Td>
      <Td  pl={'3.5vw'} maxW={'6vw'}>
        <Text
          id="um"
          textColor={'web.text2'}
          _hover={{borderColor: 'web.border'}}
          >
      {product.um}
</ Text>
      </Td>
      <Td pl={'3.5vw'} maxW={'6vw'} minW={'6vw'}>
        <Input
          w={'5vw'}
          minH={'4.5vh'}
          variant="unstyled"
          placeholder={'Ex: 24x48 '}
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
          size={"sm"}
          value={product.size}
          borderBottomColor={'web.text2'}
          name={'size'}
          onChange={e => handleChange(e, 'size', index)}
        />
      </Td>
      <Td pl={'3vw'} maxW={'6vw'} minW={'6vw'} >
        <Input
          w={'5vw'}
          minH={'4.5vh'}
          variant="unstyled"
          placeholder={'Ex: 3/4 or 9Mm'}
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
          size={"sm"}
          value={product.thickness}
          borderBottomColor={'web.text2'}
          name={'thickness'}
          onChange={e => handleChange(e, 'thickness', index)}
        />
      </Td>
      <Td pl={'3.5vw'} maxW={'8vw'} minW={'8vw'}>
        <Select
          onChange={e => handleChange(e, 'finish', index)}
          mb={'0.5vh'}
          mr={'2vw'}
          w={'8vw'}         
          minH={'5.5vh'}
          variant="unstyled"
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
          size={"sm"}
          borderBottomColor={'web.text2'}
          _hover={{borderColor: 'web.border'}}
          cursor={'pointer'}
          name={'finish'}
          value={product.finish}
          >
            {
              values?.finishValues && values?.finishValues?.map((v, i )=> {
                return(
                  <option value={`${v}`} key={i} className={'options'}>{`${v}`}</option>
                )
                })
             }   
        </Select>
      </Td>
      <Td pl={'3vw'} maxW={'6vw'} minW={'6vw'}>
        <Input
          borderColor={"web.border"}
          color={"web.text2"}
          w={"5vw"}
          h={"4vh"}
          onChange={e => handleChange(e, 'price', index)}
          step={1}
          min={0}
          precision={0}
          type="number"
          name={'price'}
          key={index}
          value={product.price} 
          fontSize={"2xs"}
          style={{ 
            textAlign: 'center',
            WebkitPaddingEnd: 8,
            WebkitPaddingStart: 8
          }}
          _focus={{
            borderColor: "logo.orange",
            boxShadow:
              "0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)",
          }}
        >
        </Input>
      </Td>
      <Td pl={'5vw'} maxW={'4vw'} minW={'4vw'}>
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

export default CreateProduct
