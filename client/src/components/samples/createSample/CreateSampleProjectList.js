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
    Center,
    } from '@chakra-ui/react'

  
  const ModelTr = ({e, formData, setFormData, setDisable }) => {
  

    const handleClick = (e) => {
      setFormData({
        ...formData,
        project: {
          ...formData.project,
          ProjectName: e.ProjectName || '',
          idProjects: e.idProjects || '',
          Shipping_State: e.Shipping_State || '',
          Shipping_ZipCode: e.Shipping_ZipCode || '',
          Shipping_City: e.Shipping_City || '',
          Shipping_Address: e.Shipping_Address || ''
        }
      })
      setDisable(false)
    }
    
    return(
      <Tr 
      cursor={'pointer'} 
      key={e.idProjects}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
        }}
        textColor={ e.idProjects === formData.project.idProjects  ? 'logo.orange' : 'unset'}
        bg={e.idProjects === formData.project.idProjects ? 'web.navBar' : 'unset'}
        onClick={() => handleClick(e)}
      >
        <Td fontSize={'0.8rem'} textAlign={'center'} w={'4vw'}>{e.idProjects}</Td>
        <Td fontSize={'0.8rem'} textAlign={'center'} w={'14vw'}>{e.ProjectName}</Td>
        <Td fontSize={'0.8rem'} textAlign={'center'} w={'14vw'}>{e.Shipping_Address}</Td>
      </Tr>
    )
  }
  
  const CreateSampleProjectList = ({ projects, formData, setFormData, setDisable }) => {
    
    return(
      <>
        <Box
          display={'flex'}
          justifyContent={'center'}
          >
          <Box
          maxHeight={'44vh'}
          minHeight={'44vh'}
          w={'700px'}
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
          rounded={'md'} 
          p={'0.5vw'}
          >
          {
            projects.length && projects !== 'No projects related' ? (
              <TableContainer pr={'0.5vw'}  pl={'0.5vw'}>
                <Table color={'web.text'}variant={'simple'} size={'sm'}>
                  <Thead h={'6vh'}>
                    <Tr>
                        <Th color={'web.text2'} textAlign={'center'} w={'4vw'} fontSize={'x-small'}>IDs</Th>
                        <Th color={'web.text2'} textAlign={'center'} w={'14vw'}fontSize={'x-small'}>Project Name</Th>
                        <Th color={'web.text2'} textAlign={'center'} w={'14vw'}fontSize={'x-small'}>Shipping Address</Th>
                      </Tr>
                    </Thead>
                    <Tbody >
                    { 
                  
                    projects.map((e, i) => (  
                        <ModelTr key={i} e={e} setFormData={setFormData} formData={formData} setDisable={setDisable}/> 
                      ))
                    }
                    </Tbody>
                  </Table>
                </TableContainer> 
                ) : (
                <Center w={'full'} h={'full'}>
                  <Text userSelect={'none'} h={'5vh'} fontSize={'2vh'}>No projects register </Text>
                </Center>
                )
            }
          </Box> 
        </Box>
      </>
      )
  }
  export default CreateSampleProjectList;
  