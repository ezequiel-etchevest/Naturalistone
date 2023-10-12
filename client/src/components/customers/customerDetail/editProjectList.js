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
import { normalizeValue } from '../../../utils/normalizeValue'
  
  const ModelTr = ({e, formData, setFormData, setDisable }) => {

    const normalizeValueAddress = normalizeValue(e?.shipping_address_id ? e?.shipping_address : e?.Shipping_Address)
    const normalizeValueCity = normalizeValue(e?.shipping_address_id ? e?.shipping_city : e?.Shipping_City)
    const normalizeValueState = normalizeValue(e?.shipping_address_id ? e?.shipping_state : e?.Shipping_State)
    const normalizeValueZipcode = normalizeValue(e?.shipping_address_id ? e?.shipping_zip_code : e?.Shipping_ZipCode)
  
    const handleClick = (e) => {
      setFormData({
          ProjectName: e.ProjectName || '',
          idProject: e.idProjects || '',
          Shipping_State: normalizeValueState || '',
          Shipping_ZipCode: normalizeValueZipcode || '',
          Shipping_City: normalizeValueCity || '',
          Shipping_Address: normalizeValueAddress || '',
          Shipping_Address_id: e.shipping_address_id
      })
      setDisable(false)
    }
    
    return(
      <Tr 
      cursor={'pointer'} 
      key={e?.idProjects}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
        }}
        textColor={ e?.idProjects === formData?.idProject  ? 'logo.orange' : 'unset'}
        bg={e?.idProjects === formData?.idProject ? 'web.navBar' : 'unset'}
        onClick={() => handleClick(e)}
      >
        <Td fontSize={'xs'} textAlign={'center'} w={'4vw'}>{e?.idProjects}</Td>
        <Td fontSize={'xs'} textAlign={'center'} w={'14vw'}>{e?.ProjectName}</Td>
        <Td fontSize={'xs'} textAlign={'center'} w={'14vw'}>{normalizeValueAddress}</Td>
        <Td fontSize={'xs'} textAlign={'center'} w={'14vw'}>{normalizeValueCity}</Td>
        <Td fontSize={'xs'} textAlign={'center'} w={'14vw'}>{normalizeValueState}</Td>
        <Td fontSize={'xs'} textAlign={'center'} w={'14vw'}>{normalizeValueZipcode}</Td>

      </Tr>
    )
  }
  
  const EditProjectList = ({ projects, formData, setFormData, setDisable }) => {
    
    return(
      <>
        <Box
          display={'flex'}
          justifyContent={'center'}
          >
          <Box
          maxHeight={'60vh'}
          minHeight={'60vh'}
          w={'full'}
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
                        <Th color={'web.text2'} textAlign={'center'} w={'14vw'}fontSize={'x-small'}>Shipping City</Th>
                        <Th color={'web.text2'} textAlign={'center'} w={'14vw'}fontSize={'x-small'}>Shipping State</Th>
                        <Th color={'web.text2'} textAlign={'center'} w={'14vw'}fontSize={'x-small'}>Shipping Zipcode</Th>
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
                  <Text userSelect={'none'} fontSize={'2vh'}>No projects register </Text>
                </Center>
                )
            }
          </Box> 
        </Box>
      </>
      )
  }
  export default EditProjectList;
  