import {     
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  } from "@chakra-ui/react"
  import {  useSelector } from 'react-redux'


// const ModelTr = ({e}) => {


//   const handleClick = () => {
//     // dispatch(getProductById(e.ProdID))
//     // if(e.ProdID !== undefined)
//     // navigate(`/products/${e.ProdID}`)
//   }

//   return(
//     <Tr 
//       onClick={() => handleClick()} 
//       cursor={'pointer'} 
//       key={e.ProdNameID}
//       _hover={{
//         bg: 'web.navBar',
//         color: 'logo.orange'
//       }} 
//       >
//       <Td textAlign={'match-parent'}>{e.InStock_Available}</Td>
//       <Td textAlign={'match-parent'}>{e.InStock_PendingPayment}</Td>
//       <Td textAlign={'match-parent'}>{e.InStock_Reserved}</Td>
//       <Td textAlign={'center'}> {e.Incoming_Available} </Td>
//       <Td isNumeric>{e.Incoming_PendingPayment}</Td>
//       <Td isNumeric>{e.Incoming_Reserved}</Td>
//       <Td textAlign={'center'}>{e.NextArrival === null ? '-' : e.NextArrival}</Td>
//     </Tr>
//   )
// }


const HistoricalProductList = ({product}) => {

  return(
    <>
      <Box    
        className={'product-details'}
        mt={'3vh'}
        ml={'2vw'}
        mr={'1vw'}
        pl={'1vw'}
        pt={'1vw'}
        pr={'1vw'}
        pb={'1vw'}
        h={'26vh'}
        w={'30vw'}
        display={'flex'}
        flexDir={'column'}
        color={'web.text'}
        bg={'web.sideBar'}
        border={'1px solid'} 
        rounded={'md'} 
        borderColor={'web.border'}
        >
      </Box>
    </>
  )
}

export default HistoricalProductList