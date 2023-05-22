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
  import CreateInvoiceModal from '../createInvoiceModal';
  
  const ModelTr = ({e, setProject, setFocus, focus}) => {
  

    const handleClick = (e) => {
      setProject(e)
      setFocus(`${e.idProjects}`)
    }
    
    return(
      <Tr 
      cursor={'pointer'} 
      key={e.idProjects}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
        }}
        color={focus === `${e.idProjects}` ? '#E47424' : 'white'}
        background={focus === `${e.idProjects}` ? 'web.navBar' : 'none'}
        focus={focus}
        onClick={() => handleClick(e)}
      >
        <Td fontSize={'xs'} textAlign={'center'} w={'4vw'}>{e.idProjects}</Td>
        <Td fontSize={'xs'} textAlign={'center'} w={'14vw'}>{e.ProjectName}</Td>
        <Td fontSize={'xs'} textAlign={'center'} w={'14vw'}>{e.Shipping_Address}</Td>
      </Tr>
    )
  }
  
  const SelectProjectModalList = ({variables, setVariables, setProject, project, customer, projects, onClose4, isOpen4, onOpen4, onClose3, onClose2, onClose1}) => {
    
    const [focus, setFocus] = useState('')

    return(
<>
  <Box
    display={'flex'}
    justifyContent={'center'}
    >
      <Box
      maxHeight={'40vh'}
      minHeight={'40vh'}
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
                    <Th color={'web.text2'} textAlign={'center'} w={'14vw'}fontSize={'x-small'}>Shipping Address</Th>
                  </Tr>
                </Thead>
                <Tbody >
                { 
                  projects.map((e, i) => (
                    <ModelTr key={i} e={e} setProject={setProject} setFocus={setFocus} focus={focus}/> 
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
    <CreateInvoiceModal 
      variables={variables} 
      setVariables={setVariables} 
      customer={customer} 
      project={project} 
      isOpen4={isOpen4} 
      onOpen4={onOpen4} 
      onClose4={onClose4} 
      onClose3={onClose3}
      onClose2={onClose2}
      onClose1={onClose1}
    />
  </>
  )
}
  export default SelectProjectModalList;
  