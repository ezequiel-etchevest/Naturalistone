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
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  } from "@chakra-ui/react"
import { useState } from "react";
import { AiOutlineFire, AiOutlinePlus } from 'react-icons/ai';

const AddSpecialProduct = ({values, allMaterials, formData, setFormData}) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState([{
    quantity: 0,
    um: 'Units',
    prodName: '',
    material: 'Marble',
    size: '',
    thickness: '',
    type:'Tile',
    finish:'Honed',
    price:0
  }]);
  
  const addProduct = () => {
    setProducts([...products, {
      quantity: 0,
      um: 'Units',
      prodName: '',
      material: 'Marble',
      size: '',
      thickness: '',
      type:'Tile',
      finish:'Honed',
      price:0
    }]) 
  }

  const handleChange = (e, field, index) => {

    const updated = {...products[index]};

    const value = e.target.value;
   
    if(field === 'price' || field === 'quantity') {
  
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
      // Actualizar producto en estado
      const newProducts = [...prev];
      newProducts[index] = updated;
      return newProducts; 
    });
  }

  const handleDelete = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  }

  const isValid = () => {
    return products.every(product => {
      const requiredFields = ['price', 'quantity'];
  
      return Object.keys(product).every(field => {
        if(requiredFields.includes(field)) {
          return product[field] !== 0;  
        } else {
          return product[field] !== '';
        }
      });
    });
  }

  const handleSubmit = () => {
    if (!isValid()) {
      alert('Please fill all fields');
      return;
    } else {

      setFormData({
        ...formData,
        specialProducts: products
      })
    }

    onClose()
  }

  return(
    <Box>
      <Tooltip placement={'bottom-start'} label={'Add special product'} fontWeight={'hairline'}>      
        <IconButton
          icon={ <AiOutlineFire/>}
          pt={'1.2vh'}
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
            Add special product
          </ModalHeader>
          <ModalBody
            color={"web.text2"}
            display={"flex"}
            justifyContent={"space-between"} 
            alignItems={'flex-start'}
            flexDir={"column"}>
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
            <TableContainer mr={"0.5vw"} ml={"0.5vw"} mt={'1vh'} w={'75vw'} maxW={'75vw'} minW={'75vw'}>
               <Table color={"web.text"} variant={"simple"} size={"sm"}w={'74vw'} maxW={'74vw'} minW={'74vw'}>
                <Thead h={"6vh"}>
                  <Tr>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"}> Quantities </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"}> U/M </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} > Product Name </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"}> Material </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"}> Size </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"}> Thickness </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"}> Type </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"}> Finish </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"}> Price </Th>
                    <Th color={"web.text2"} fontSize={"2xs"} textAlign={"center"}> </Th>
                  </Tr>
                </Thead>
                <Tbody> 
                {products?.map((product, index) => (
                  <ModelTr
                    key={index} 
                    index={index}
                    handleChange={handleChange}
                    handleDelete={handleDelete}
                    product={product}
                    values={values} 
                    allMaterials={allMaterials}
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

const ModelTr = ({product, handleChange, handleDelete, index, values, allMaterials}) => {
  
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
      <Input
          borderColor={"web.border"}
          color={"web.text2"}
          w={"5vw"}
          h={"4vh"}
          onChange={e => handleChange(e, 'quantity', index)}
          step={1}
          min={0}
          precision={0}
          name={'quantity'}
          type="number"
          key={index}
          value={product.quantity}
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
          }}>
        </Input>
      </Td>
      <Td  maxW={'6vw'}>
        <Select
          onChange={e => handleChange(e, 'um', index)}
          w={'5vw'}         
          minH={'5.5vh'}
          variant="unstyled"
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
          size={"sm"}
          borderBottomColor={'web.text2'}
          _hover={{borderColor: 'web.border'}}
          cursor={'pointer'}
          name={'um'}
          value={product?.um}
          >
          <option value='Units'className="options">Units</option>
          <option value='Sqft' className="options">Sqft</option>
        </Select>
      </Td>
      <Td maxW={'12vw'} minW={'12vw'} >
        <Input
          w={'10vw'}
          minH={'4.5vh'}
          variant="unstyled"
          placeholder={'Product name ...'}
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
          size={"sm"}
          value={product?.prodName}
          borderBottomColor={'web.text2'}
          name={'prodName'}
          onChange={e => handleChange(e, 'prodName', index)}
        />
      </Td>
      <Td maxW={'9vw'} minW={'9vw'}>
        <Select
          onChange={e => handleChange(e, 'material', index)}
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
          name={'material'}
          value={product?.material}
        >
        {
          Object.entries(values)?.length ?
          allMaterials?.map((v, i) => {
              return(
                <option value={`${v}`} key={i} className={'options'}>{`${v}`}</option>
              )
            })
          :
          null  
        }
      </Select>
      </Td>
      <Td maxW={'6vw'} minW={'6vw'}>
        <Input
          w={'5vw'}
          minH={'4.5vh'}
          variant="unstyled"
          placeholder={'Ex: 24x48 '}
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
          size={"sm"}
          value={product?.size}
          borderBottomColor={'web.text2'}
          name={'size'}
          onChange={e => handleChange(e, 'size', index)}
        />
      </Td>
      <Td maxW={'7vw'} minW={'7vw'} >
        <Input
          w={'5vw'}
          minH={'4.5vh'}
          variant="unstyled"
          placeholder={'Ex: 3/4 or 9Mm'}
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
          size={"sm"}
          value={product?.thickness}
          borderBottomColor={'web.text2'}
          name={'thickness'}
          onChange={e => handleChange(e, 'thickness', index)}
        />
      </Td>
      <Td maxW={'6vw'}>
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
          value={product?.type}
          >
          <option value='Tile'className="options">Tile</option>
          <option value='Slab' className="options">Slab</option>
          <option value='Mosaic' className="options">Mosaic</option>
        </Select>
      </Td>
      <Td maxW={'10vw'} minW={'10vw'}>
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
          value={product?.finish}
          >
          {
            Object.entries(values)?.length ?
            values?.finishValues?.map((v, i )=> {
              return(
                <option value={`${v}`} key={i} className={'options'}>{`${v}`}</option>
              )
            })
            :
            null
          }    
        </Select>
      </Td>
      <Td maxW={'6vw'} minW={'6vw'}>
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
          value={product?.price} 
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

export default AddSpecialProduct
