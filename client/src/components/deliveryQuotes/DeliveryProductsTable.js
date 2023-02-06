import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Text,
    NumberInput,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputStepper,
    NumberInputField, 
  } from '@chakra-ui/react'
  import { useNavigate } from 'react-router-dom'
  import { useState } from 'react'


const ModelTr = ({p, setQuantities, quantities}) => {
  
  const navigate = useNavigate()


  const [input, setInput] = useState({
      quantity:'',
      prodID:'',
      prodName:'',
      type:'',
      size:'',
      thickness:'',
      finish:''
    })
  


  const handleInput = (e) => {
    setInput({
      quantity: e,
      prodID:p.ProdID,
      prodName: p.ProductName,
      type: p.Type,
      size:p.Size,
      thickness:p.Thickness,
      finish:p.Finish,
    })
  };


  const handleOnBlur = () => {
    let updated = false;
    
    if (quantities.length) {
      quantities.forEach(e => {
        if (e.prodID === input.prodID) {
          e.quantity = input.quantity;
          updated = true;
        }
      });
    }
  
    if (!updated) {
      setQuantities([...quantities, input]);
    }
  }
 

    return(
      <Tr 
        cursor={'pointer'}
        key={p.ProdID} 
        _hover={{
          bg: 'web.navBar',
          color: 'logo.orange'
        }}
        onBlur={() => handleOnBlur()}
        //onClick={() => handleClick()}
        >
        <Td w={'10vw'}>
          <NumberInput
            clampValueOnBlur={true}
            borderColor={'web.border'} 
            color={'web.text2'}
            w={'6vw'}
            ml={'1vw'}
            onChange={(e)=>handleInput(e)} 
            step={1} 
            defaultValue={0} 
            min={0} 
            precision={0}
            >
            <NumberInputField                    
            _focus={{
              borderColor: 'logo.orange',
              boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
                    }} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Td>
        <Td textAlign={'center'} w={'10vw'}>{p.ProductName}</Td>
        <Td textAlign={'center'} w={'6vw'}>{p.Type} </Td>
        <Td textAlign={'center'} w={'6vw'}>{p.Size} </Td>
        <Td textAlign={'center'} w={'6vw'}>{p.Thickness} </Td>
        <Td textAlign={'center'} w={'6vw'}>{p.Finish} </Td>
        <Td textAlign={'center'} w={'6vw'}>{p.Quantity} </Td>
        <Td textAlign={'center'} w={'6vw'}></Td>
      </Tr>
    )
}

const DeliveryProductList = ({invoice_products, setQuantities, quantities}) => {
 
    return(
        <Box
        display={'flex'}
        justifyContent={'center'}
       
        >
          <Box
            maxHeight={'60vh'}
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
            bg={'web.sideBar'}           
            >
            <TableContainer>
                <Table mt={'1vh'} color={'web.text'} variant={'simple'} size={'sm'}border={'2px solid red'}>
                  <Thead h={'6vh'}>
                    <Tr>
                      <Th color={'web.text2'} textAlign={'center'} w={'10vw'}>Delivery Quantity</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'10vw'}>Product Name</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Type</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Size</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Thickness</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Finish</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Quantity</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Remaining</Th>
                      
                    </Tr>
                  </Thead>
                  <Tbody >
                    { invoice_products.map((p, i) =>{
                        return(
                          <ModelTr p={p} key={i} id={i} setQuantities={setQuantities} quantities={quantities}/>
                        )
                      })
                    }
                  </Tbody>
                </Table>
            </TableContainer> 
            </Box> 
        </Box>
    )
}
export default DeliveryProductList;