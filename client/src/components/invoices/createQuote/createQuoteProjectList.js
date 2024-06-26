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
    Spinner,
    } from '@chakra-ui/react'
import { useState } from 'react';

  
  const ModelTr = ({e, formData, setFormData, setDisable }) => {

    const [selectedProjectID, setSelectedProjectID] = useState(formData.project.idProjects);

    const handleClick = (e) => {
      const projectId = e.idProjects;
      setSelectedProjectID(projectId);
      setFormData({
        ...formData,
        project: {
          ...formData.project,
          ProjectName: e.ProjectName || '',
          idProjects: e.idProjects || '',
          Shipping_State: e.shipping_address_id ? e.shipping_state : e.Shipping_State || '',
          Shipping_ZipCode: e.shipping_address_id ? e.shipping_zip_code : e.Shipping_ZipCode || '',
          Shipping_City: e.shipping_address_id ? e.shipping_city : e.Shipping_City || '',
          Shipping_Address: e.shipping_address_id ? e.shipping_address : e.Shipping_Address || '',
          shipping_address_id: e.shipping_address_id ? e.shipping_address_id : '' 
        }
      })
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
        <Td fontSize={'xs'} textAlign={'center'} w={'4vw'}>{e.idProjects}</Td>
        <Td fontSize={'xs'} textAlign={'center'} w={'14vw'}>{e.ProjectName}</Td>
        <Td fontSize={'xs'} textAlign={'center'} w={'14vw'}>{e.shipping_address_id ? e.shipping_address : e.Shipping_Address}</Td>
        <Td fontSize={'xs'} textAlign={'center'} w={'14vw'}>{e.shipping_address_id ? e.shipping_zip_code : e.Shipping_ZipCode}</Td>
        <Td fontSize={'xs'} textAlign={'center'} w={'14vw'}>{e.shipping_address_id ? e.shipping_city : e.Shipping_City}</Td>
        <Td fontSize={'xs'} textAlign={'center'} w={'14vw'}>{e.shipping_address_id ? e.shipping_state : e.Shipping_State}</Td>
      </Tr>
    )
  }
  
  const CreateQuoteProjectList = ({ projects, formData, setFormData, setDisable }) => {
    return(
<>
  <Box
    display={'flex'}
    justifyContent={'center'}
    >
      <Box
      maxHeight={'42vh'}
      minHeight={'42vh'}
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
      p={'3vh'}
      >
      {
        projects.length ? (
            <TableContainer w={'66vw'}>
            <Table color={'web.text'}variant={'simple'} size={'sm'}>
              <Thead h={'3vh'}>
                <Tr>
                    <Th color={'web.text2'} textAlign={'center'} w={'4vw'} fontSize={'x-small'}>IDs</Th>
                    <Th color={'web.text2'} textAlign={'center'} w={'14vw'}fontSize={'x-small'}>Project Name</Th>
                    <Th color={'web.text2'} textAlign={'center'} w={'14vw'}fontSize={'x-small'}>Shipping Address</Th>
                    <Th color={'web.text2'} textAlign={'center'} w={'14vw'}fontSize={'x-small'}>Shipping ZipCode</Th>
                    <Th color={'web.text2'} textAlign={'center'} w={'14vw'}fontSize={'x-small'}>Shipping City</Th>
                    <Th color={'web.text2'} textAlign={'center'} w={'14vw'}fontSize={'x-small'}>Shipping State</Th>
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
              <Text userSelect={'none'} fontSize={'sm'}>No projects registered for {formData.customer.Contact_Name?.length ? formData.customer?.Contact_Name : formData.customer?.CustomerID } </Text>
            </Center>
            )
        }
      </Box> 
    </Box>
  </>
  )
}
  export default CreateQuoteProjectList;
  