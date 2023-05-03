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
import { useState } from 'react';

const ModelTr = ({project}) => {


  const dispatch = useDispatch()

  const handleClickProject = () => {
    if(project.ProjectName !== 'No projects related'){
    dispatch(getProjectInvoices(project.idProjects))}
  }

  return(
    <Tr
      h={'5vh'} 
      cursor={'pointer'}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
      }}
      onClick={handleClickProject}
      >
      <Td textAlign={'center'} fontSize={'1.6vh'}>{project.ProjectName}</Td>
    </Tr>
  )
}

const ProjectList = ({projects_by_customer_id}) => {

  return(
  <>
    <Box w={'15vw'}>
        <Box 
        display={'flex'} 
        justifyContent={'space-between'}
        p={'1vh'}
        >
        </Box> 
          {/* {
            handlePendig() === true ? (
              <AddPayment pendingAmount={pendingAmount}/>
            ):(
              null
            )
          } */}
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
                  projects_by_customer_id?.map((project, i) =>{
                    return(
                      <ModelTr key={i} project={project}/>
                      )})                   
                    }
                  </Tbody>
                </Table>
            </TableContainer>
            
        {/* ):(
          <Text mt={'3vh'} color={'web.text'}>No payments entered yet</Text>          
        )

      } */}
      </Box> 
        </Box>
      </>
      )}
  

export default ProjectList;