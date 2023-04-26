import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Tooltip,
    useToast,
    Switch,
    Text,
    Center,
    NumberInput,
    NumberInputField,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputStepper
  } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/actions-products';
import { useEffect, useState } from 'react';
import{ ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { patchDiscontinued } from '../../redux/actions-products';


const ModelTr = ({e}) => {

//   const a = e.Discontinued_Flag === 'True' ? true : false 
//   const [flag, setFlag] = useState(a)

//   const navigate = useNavigate()
//   const dispatch = useDispatch()


//     const handleClickProduct = () => {
//       dispatch(getProductById(e.ProdID))
//       if(e.ProdID !== undefined)
//       navigate(`/products/${e.ProdID}`)
//     }
//     const handleClickSwitch = () => {
//       setFlag(flag === true ? false : true)
//       dispatch(patchDiscontinued(e.ProdID, flag))
//     }

//     let validateSeller = () => {
//       if(user[0].Secction7Flag === 1 ) return true
//       else return false
//     }
    
  return(
    <Tr       
      cursor={'pointer'} 
      key={e.ProdNameID}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
      }} 
      >
        <Td w={'8vw'}>
          <NumberInput
            clampValueOnBlur={true}
            borderColor={'web.border'} 
            color={'web.text2'}
            w={'6vw'}
            ml={'1vw'}
            h={'4vh'}
            // onChange={(e)=>handleInput(e)} 
            step={1} 
            defaultValue={0} 
            min={0} 
            precision={0}
            >
            <NumberInputField 
            fontSize={'2xs'}                   
            _focus={{
              borderColor: 'logo.orange',
              boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
                    }} 
              h={'4vh'}/>
            <NumberInputStepper>
              <NumberIncrementStepper fontSize={'3xs'}/>
              <NumberDecrementStepper fontSize={'3xs'}/>
            </NumberInputStepper>
          </NumberInput>
          </Td>
      <Td maxW={'3vw'} fontSize={'2xs'} textAlign={'match-parent'}>{e.ProductName}</Td>
      <Td maxW={'6vw'} fontSize={'2xs'} textAlign={'center'}>{e.Material.slice(0, 4)}</Td>
      <Td maxW={'3vw'} fontSize={'2xs'} textAlign={'center'}>{e.Size}</Td>
      <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}> {e.Thickness === null ? 'N/A' : e.Thickness} </Td>
      <Td maxW={'3vw'} fontSize={'2xs'} textAlign={'center'}> {e.Finish === null ? 'N/A' : e.Finish.slice(0, 1)} </Td>
      <Td maxW={'3vw'} fontSize={'2xs'} isNumeric>$ { e.Price ? e.Price.toLocaleString('en-US') : '-'}</Td>
      <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e.InStock_Available === null ? 'N/A' : e.InStock_Available}</Td>
      <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e.Incoming_Available === null ? 0 : e.Incoming_Available}</Td>
      </Tr>
  )
}

const CreateInvoiceProductsList = ({ allProducts }) => {

  return(
    <Box
    display={'flex'}
    justifyContent={'center'}
      >
      <Box
      maxHeight={'50vh'}
      minHeight={'50vh'}
      overflow={'auto'}
      css={{
        '&::-webkit-scrollbar': {
          width: '0.4vw',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#E47424',
          borderRadius: '5px',
        },
      }}
      borderColor={'web.border'}
      bg={'web.sideBar'} 
      border={'1px solid'} 
      rounded={'md'} 
      p={'3vh'}
      >
        {
        allProducts.length ? 
        <TableContainer  mr={'1vw'} >
          <Table color={'web.text'} variant={'simple'} size={'sm'}>
            <Thead h={'6vh'}>
              <Tr>  
                <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Quantities</Th>
                <Th color={'web.text2'} fontSize={'2xs'} >Product Name</Th>
                <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Type</Th>
                <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Size</Th>
                <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Thickness</Th>
                <Tooltip label={'H - Honed\nB - Brushed'} fontWeight={'hairline'} sx={{ whiteSpace: 'pre-line' }}>
                  <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Finish</Th>
                </Tooltip>
                <Th color={'web.text2'} fontSize={'2xs'} isNumeric>Price</Th>
                <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>In Stock</Th>
                <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Incoming</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                allProducts.map((e, i) => {
                  return(
                    <ModelTr key={i} e={e}/>
                  )
                })
              }
            </Tbody>
          </Table>
        </TableContainer>
        :
        (
          <Center w={'full'} h={'full'}>
          <Text userSelect={'none'} fontSize={'2vh'}>No products found</Text>
          </Center>
        )
        }
      </Box>  
    </Box>
  )
}
export default CreateInvoiceProductsList;