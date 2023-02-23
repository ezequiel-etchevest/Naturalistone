import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    NumberInput,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputStepper,
    NumberInputField,
    useToast, 
  } from '@chakra-ui/react'
  import { useNavigate } from 'react-router-dom'
  import { useState } from 'react'


const ModelTr = ({p, setQuantities, quantities, errors, setErrors, setDisabled}) => {
  
  const navigate = useNavigate()
  const toast = useToast()

  const [input, setInput] = useState({
      quantity: p.InStock_Reserved,
      prodID:p.ProdID,
      prodName: p.ProductName,
      type: p.Type,
      size:p.Size,
      thickness:p.Thickness,
      finish:p.Finish,
      InStock_Reserved: p.InStock_Reserved,
      SalePrice: p.SalePrice,
      delivered: p.Delivered
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
      InStock_Reserved: p.InStock_Reserved,
      SalePrice: p.SalePrice,
      delivered: p.Delivered
    })

  let upd = false;
  
  if (errors.length) {
    errors.forEach(err => {
      if (err === input.prodID) {
        if(e >= 0 && e <= p.InStock_Reserved){
          setErrors(errors.filter(error=> error !== input.prodID))
        }
        upd = true
      }})}  

  if(!upd){
    if( e > p.InStock_Reserved ){
      setErrors([...errors, p.ProdID])
      toast({
        title: 'Invalid amount',
        description: `Quantity in ${p.ProductName} must be lower than ${p.InStock_Reserved}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }
}


  const handleOnBlur = () => {
    let updated = false;
    
    if (quantities.length) {
      quantities.forEach(e => {
        if (e.prodID === input.prodID) {
          e.quantity = input.quantity;
          if(e.quantity == 0){
            setQuantities(quantities.filter(q => q.prodID !== input.prodID))
          }
          updated = true;
    }});  
    }
  
    if (!updated){
      if(input.quantity > 0){
      setQuantities([...quantities, input])
      // handleDisableChange()
  }}
  }

  // const handleDisableChange = () => {
  //   if(!errors.length && quantities.length)setDisabled(false)
  //   else setDisabled(true)
  // }  

    return(
      <Tr 
        cursor={'pointer'}
        key={p.ProdID} 
        _hover={{
          bg: 'web.navBar',
          color: 'logo.orange'
        }}
        onBlur={() => handleOnBlur()}
       // onChange={() => handleDisableChange()}
        >
        <Td w={'10vw'}>
          <NumberInput
            clampValueOnBlur={true}
            borderColor={'web.border'} 
            color={'web.text2'}
            size={'md'}
            w={'7vw'}
            ml={'1vw'}
            h={'4vh'}
            onChange={(e)=>handleInput(e)} 
            step={1} 
            defaultValue={p.InStock_Reserved} 
            min={0} 
            precision={0}
            >
            <NumberInputField                    
            _focus={{
              borderColor: 'logo.orange',
              boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
                    }} 
              h={'4vh'}/>
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Td>
        <Td textAlign={'center'} w={'10vw'}>{p.ProductName}</Td>
        <Td textAlign={'center'} w={'6vw'}>{p.Material} - {p.Type} </Td>
        <Td textAlign={'center'} w={'6vw'}>{p.Size} </Td>
        <Td textAlign={'center'} w={'6vw'}>{p.Thickness} </Td>
        <Td textAlign={'center'} w={'6vw'}>{p.Finish} </Td>
        <Td textAlign={'center'} w={'6vw'}>{p.InStock_Reserved}</Td>
        <Td textAlign={'center'} w={'6vw'}>{p.Quantity - p.Delivered}</Td>
      </Tr>
    )
}

const DeliveryProductList = ({invoice_products, setQuantities, quantities, errors, setErrors, setDisabled}) => {

    return(
        <Box
        display={'flex'}
        justifyContent={'center'}
        w={'64vw'}
        pl={'1vw'}
        pr={'1vw'}
        >
          <Box
            maxHeight={'54vh'}
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
            bg={'web.sideBar'}           
            >
            <TableContainer >
                <Table mt={'1vh'} color={'web.text'} variant={'simple'} size={'sm'}>
                  <Thead h={'6vh'}>
                    <Tr>
                      <Th color={'web.text2'} textAlign={'center'} w={'10vw'}>Delivery Quantity</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'10vw'}>Product Name</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Type</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Size</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Thickness</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Finish</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Stock Reserved</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Remaining</Th>
                    </Tr>
                  </Thead>
                  <Tbody >
                    { invoice_products.map((p, i) =>{
                        return(
                          <ModelTr p={p} key={i} id={i} setQuantities={setQuantities} quantities={quantities} errors={errors} setErrors={setErrors} setDisabled={setDisabled}/>
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


// const ModelTr = ({p, setQuantities, quantities, setDisabled, errors, setErrors}) => {

// const navigate = useNavigate()
// const toast = useToast()

// const [input, setInput] = useState({
//     quantity: 0,
//     prodID:'',
//     prodName:'',
//     type:'',
//     size:'',
//     thickness:'',
//     finish:'',
//     SalePrice: '',
//     Delivered: '',
//     InStock_Reserved: '',
//   })



// const handleInput = (e) => {
//   if( e > p.InStock_Reserved ){
//     setErrors([...errors, p.ProductName])
//     toast({
//       title: 'Invalid amount',
//       description: `Quantity in ${p.ProductName} must be lower than ${p.InStock_Reserved}`,
//       status: 'error',
//       duration: 2000,
//       isClosable: true,
//     })
//   } else {
//     if(e !== 0){
//       setInput({
//         quantity: e,
//         prodID:p.ProdID,
//         prodName: p.ProductName,
//         type: p.Type,
//         size:p.Size,
//         thickness:p.Thickness,
//         finish:p.Finish,
//         SalePrice: p.SalePrice,
//         Delivered: p.Delivered,
//         InStock_Reserved: p.InStock_Reserved,
//       })
//       setErrors(errors.filter(err=> err !== p.ProductName))
//     }
// }};


// const handleOnBlur = () => {
//   let updated = false;
  
//   if (quantities.length) {
//     quantities.forEach(e => {
//       if (e.prodID === input.prodID) {
//         // if(input.quantity > p.InStock_Reserved){
//         //   toast({
//         //     title: 'Invalid amount',
//         //     description: `Quantity in ${p.ProductName} must be lower than ${p.InStock_Reserved}`,
//         //     status: 'error',
//         //     duration: 2000,
//         //     isClosable: true,
//         //   })
//         // } else {
//         e.quantity = input.quantity;
//         updated = true;
//       // }}
//   }});

//   if (!updated) {
//     setQuantities([...quantities, input]);
//   }
// }}
// console.log('errors', errors)
// console.log('input', input)
// console.log('quantities', quantities)
// // }}
// // });
// // if(!errors.length) setDisabled(false) 
// // else setDisabled(true)
// // }
  
//   return(
//     <Tr 
//       cursor={'pointer'}
//       key={p.ProdID} 
//       _hover={{
//         bg: 'web.navBar',
//         color: 'logo.orange'
//       }}
//       onBlur={() => handleOnBlur()}
      
//       //onClick={() => handleClick()}
//       >
//       <Td w={'10vw'}>
//         <NumberInput
//           clampValueOnBlur={true}
//           borderColor={'web.border'} 
//           color={'web.text2'}
//           size={'md'}
//           w={'7vw'}
//           ml={'1vw'}
//           h={'4vh'}
//           onChange={(e)=>handleInput(e)} 
//           step={1} 
//           defaultValue={0} 
//           min={0} 
//           precision={2}
//           >
//           <NumberInputField                    
//           _focus={{
//             borderColor: 'logo.orange',
//             boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
//                   }} 
//             h={'4vh'}/>
//           <NumberInputStepper>
//             <NumberIncrementStepper />
//             <NumberDecrementStepper />
//           </NumberInputStepper>
//         </NumberInput>
//       </Td>
//       <Td textAlign={'center'} w={'10vw'}>{p.ProductName}</Td>
//       <Td textAlign={'center'} w={'6vw'}>{p.Type} </Td>
//       <Td textAlign={'center'} w={'6vw'}>{p.Size} </Td>
//       <Td textAlign={'center'} w={'6vw'}>{p.Thickness} </Td>
//       <Td textAlign={'center'} w={'6vw'}>{p.Finish} </Td>
//       <Td textAlign={'center'} w={'6vw'}>{p.Quantity} </Td>
//       <Td textAlign={'center'} w={'6vw'}>{p.InStock_Reserved}</Td>
//     </Tr>
//   )
// }

// const DeliveryProductList = ({invoice_products, setQuantities, quantities, setDisabled, errors, setErrors}) => {

//   return(
//       <Box
//       display={'flex'}
//       justifyContent={'center'}
//       w={'60vw'}
//       >
//         <Box
//           maxHeight={'54vh'}
//           overflow={'auto'}
//           css={{
//             '&::-webkit-scrollbar': {
//               width: '0.2vw',
//             },
//             '&::-webkit-scrollbar-track': {
//               width: '6px',
//             },
//             '&::-webkit-scrollbar-thumb': {
//               background: '#E47424',
//               borderRadius: '5px',
//             },
//           }}
//           bg={'web.sideBar'}           
//           >
//           <TableContainer >
//               <Table mt={'1vh'} color={'web.text'} variant={'simple'} size={'sm'}>
//                 <Thead h={'6vh'}>
//                   <Tr>
//                     <Th color={'web.text2'} textAlign={'center'} w={'10vw'}>Delivery Quantity</Th>
//                     <Th color={'web.text2'} textAlign={'center'} w={'10vw'}>Product Name</Th>
//                     <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Type</Th>
//                     <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Size</Th>
//                     <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Thickness</Th>
//                     <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Finish</Th>
//                     <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Quantity</Th>
//                     <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Stock Reserved</Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody >
//                   { 
//                     invoice_products.map((p, i) =>{
//                       return(
//                         <ModelTr p={p} key={i} id={i} 
//                         setQuantities={setQuantities} 
//                         quantities={quantities} 
//                         setDisabled={setDisabled}
//                         errors={errors} 
//                         setErrors={setErrors}/>
//                       )
//                     })
//                   }
//                 </Tbody>
//               </Table>
//           </TableContainer> 
//           </Box> 
//       </Box>
//   )
// }
// export default DeliveryProductList;