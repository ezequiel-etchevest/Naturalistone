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
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { getProjectInvoices } from '../../../redux/actions-projects';
import { CreateNewProject } from './createProject';
import { useState } from 'react';
import { EditProject } from './editProjectModal';

const ModelTr = ({project, highlight, sethighlight}) => {

const dispatch = useDispatch()

const handleClickProject = (event) => {
  if(project.ProjectName !== 'No projects related'){
    dispatch(getProjectInvoices(project.idProjects))}
    sethighlight(event.idProjects);
}
return(
  <Tr
    h={'5vh'} 
    key={project.idProjects}
    cursor={'pointer'}
    _hover={{
      bg: 'web.navBar',
      color: 'logo.orange'
    }}
    onClick={() => handleClickProject(project)}
    textColor={project.idProjects === highlight ? 'logo.orange' : 'unset'}
    >
    <Td textAlign={'center'} fontSize={'1.6vh'}>{project.ProjectName}</Td>
  </Tr>
)
}

const ProjectList = ({projects_by_customer_id, customer, highlight, sethighlight}) => {

return(
<>
  <Box w={'15vw'}>
      <Box 
      display={'flex'} 
      justifyContent={'space-between'}
      p={'1vh'}
      >
      </Box> 
        <Box
          maxHeight={'27vh'}
          maxWidth={'50vw'}
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
          }}> 
        <TableContainer  w={'48vw'} >
          <Table color={'web.text'} variant={'simple'} size={'sm'} >
            <Thead h={'4vh'}>
              <Tr>
                <Th h={'4vh'} color={'web.text2'} textAlign={'center'} fontSize={'1.6vh'}>Project Name</Th>
              </Tr>
            </Thead>
            <Tbody >
              { 
                projects_by_customer_id?.length ? (
                  Array.isArray(projects_by_customer_id) ? (
                  projects_by_customer_id?.map((project, i) =>{
                    return(
                      <ModelTr key={i} project={project} highlight={highlight} sethighlight={sethighlight}/>
                    )})):(
                      <Tr
                      h={'5vh'} 
                      cursor={'pointer'}
                      _hover={{
                        bg: 'web.navBar',
                        color: 'logo.orange'
                          }}>
                      <Td display={'flex'} placeContent={'center'}>{projects_by_customer_id}</Td></Tr>
                    )) : (null)
                  }
                <Tr
                  h={'5vh'} 
                  cursor={'pointer'}
                  _hover={{
                    bg: 'web.navBar',
                    color: 'logo.orange'
                      }}>
                    <Td display={'flex'} placeContent={'center'}>
                        <CreateNewProject customer={customer}/>
                    </Td>
                </Tr>
                <Tr
                  h={'5vh'} 
                  cursor={'pointer'}
                  _hover={{
                    bg: 'web.navBar',
                    color: 'logo.orange'
                      }}>
                    <Td display={'flex'} placeContent={'center'}>
                        <EditProject customer={customer} projects_by_customer_id={projects_by_customer_id}/>
                    </Td>
                </Tr>
                </Tbody>
              </Table>
          </TableContainer>
    </Box> 
      </Box>
    </>
    )}


export default ProjectList;