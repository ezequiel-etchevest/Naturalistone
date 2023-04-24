import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    useToast,
    Text,
    Center,
    } from '@chakra-ui/react'
    import { useState } from 'react';
  
  
  const ModelTr = ({e, setProject}) => {
  

    const handleClick = (e) => {
      setProject(e)
    }

    return(
      <Tr 
      cursor={'pointer'} 
      key={e.idProjects}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
        }}
        onClick={() => handleClick(e)}
      >
        <Td fontSize={'xs'} textAlign={'center'} w={'4vw'}>{e.idProjects}</Td>
        <Td fontSize={'xs'} textAlign={'center'} w={'14vw'}>{e.ProjectName}</Td>
      </Tr>
    )
  }
  
  const SelectProjectModalList = ({customer, projects}) => {
    
    const [project, setProject] = useState('')
    console.log(project)
  return(
<>
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
        projects.length ? (
          <TableContainer w={'46vw'}>
            <Table color={'web.text'}variant={'simple'} size={'sm'}>
              <Thead h={'3vh'}>
                <Tr>
                    <Th color={'web.text2'} textAlign={'center'} w={'4vw'} fontSize={'x-small'}>IDs</Th>
                    <Th color={'web.text2'} textAlign={'center'} w={'14vw'}fontSize={'x-small'}>Project Name</Th>
                  </Tr>
                </Thead>
                <Tbody >
                { 
                  projects.map((e, i) => (
                    <ModelTr key={i} e={e} setProject={setProject}/> 
                  ))
                }
                </Tbody>
              </Table>
            </TableContainer> 
            ) : (
            <Center w={'full'} h={'full'}>
              <Text userSelect={'none'} fontSize={'2vh'}>No projects register </Text>
            </Center>
            )
        }
      </Box> 
    </Box>
    {/* <SelectedCustomerModal onSecondModalClose={onSecondModalClose} isSecondModalOpen={isSecondModalOpen} customer={customer} setCustomer={setCustomer}/> */}
  </>
  )
}
  export default SelectProjectModalList;
  