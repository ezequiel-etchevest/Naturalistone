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



const ModelTr = ({proforma}) => {

    return(
      <Tr 
        cursor={'pointer'} 
        key={proforma.Invoice}
        _hover={{
          bg: 'web.navBar',
          color: 'logo.orange'
        }}
        >
        <Td textAlign={'center'}>{proforma.Proforma}</Td>
      </Tr>
    )
}

const ProformaList = ({proformas}) => {

    return(
        <Box
          display={'flex'}
          justifyContent={'center'}
          ml={'1vh'}
          maxH={'47vh'}
          w={'20vw'}
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
          >
          <Box
            maxHeight={'80vh'}
            overflow={'auto'}
            mt={'3vh'}
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
                      <Th color={'web.text2'} textAlign={'center'} w={'6vw'}>Proforma</Th>
                    </Tr>
                  </Thead>
                  <Tbody 
                  >
                    {
                      proformas ? (
                        proformas?.map((proforma, i) => (
                          <ModelTr key={i} proforma={proforma}/> 
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


export default ProformaList;
