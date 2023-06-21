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
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getFreight, getFreightId } from '../../redux/actions-freights'
import { useEffect, useState } from 'react'


const ModelTr = ({freight}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = async () => {
    dispatch(getFreightId(freight.FreightRefNumber))
    navigate(`/freights/${freight.FreightRefNumber}`)
  }

    return(
      <Tr 
        cursor={'pointer'}
        onClick={() => handleClick()} 
        key={freight.FreightRefNumber}
        _hover={{
          bg: 'web.navBar',
          color: 'logo.orange'
        }}
        >
        {/* <Td textAlign={'center'}>{o.OrderID.includes('.') ? (o.OrderID.split('.')[0]) + '/' + (o.OrderID.split('.')[1]) : o.OrderID}</Td> */}
        <Td textAlign={'center'}>{freight.FreightRefNumber}</Td>
        <Td textAlign={'center'}>{freight.Origin}</Td>
        <Td textAlign={'center'}>{freight.Destination}</Td>
        <Td textAlign={'center'}>{freight.InvoiceNumber} </Td>
        <Td textAlign={'center'}>{freight.TotalCost}</Td>
        <Td textAlign={'center'}>{freight.InvoiceDate !== null ? freight.InvoiceDate.split('T')[0] :  '-'}</Td>
        <Td textAlign={'center'}>{freight.EstimatedDate !== null ? freight.InvoiceDate.split('T')[0] : '-'}</Td>
      </Tr>
    )
}

const FreightsList = ({freights}) => {
  
    return(
        <Box
          display={'flex'}
          justifyContent={'center'}
          ml={'1vh'}
          h={'92vh'}
          w={'82.8vw'} 
          >
          <Box
            maxHeight={'80vh'}
            overflow={'auto'}
            mt={'7vh'}
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
            borderColor={'web.border'}
            bg={'web.sideBar'} 
            border={'1px solid'} 
            rounded={'md'} 
            p={'3vh'}
            w={'80vw'}
            >
            <TableContainer >
                <Table color={'web.text'} variant={'simple'} size={'sm'}  >
                  <Thead h={'6vh'}>
                    <Tr>
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Freight Ref Number</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'12vw'}>Origin</Th>
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Destination</Th>
                      <Th w={'6vw'} color={'web.text2'} textAlign={'center'}>Invoice Number</Th>
                      <Th color={'web.text2'} w={'8vw'} textAlign={'center'}>Total Cost</Th>
                      <Th color={'web.text2'} w={'8vw'} textAlign={'center'}>Invoice Date</Th>
                      <Th color={'web.text2'} w={'10vw'} textAlign={'center'}>Estimated Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody 
                  >
                    {
                      freights ? (
                        freights?.map((freight, i) => (
                          <ModelTr key={i} freight={freight}/> 
                          ))
                      ):(
                        <Text>Loading</Text>
                      )
                    }
                  </Tbody>
                </Table>
            </TableContainer> 
            </Box> 
        </Box>
    )
}


export default FreightsList;
