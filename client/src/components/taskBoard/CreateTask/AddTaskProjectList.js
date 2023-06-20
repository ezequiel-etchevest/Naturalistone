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
import { useEffect, useState } from 'react';



const ModelTr = ({e, setFormData, formData}) => {
  const handleClick = () => {
    setFormData({
      ...formData,
      ProjectID: e.idProjects,
    })
  }

  return(
    <Tr 
    onClick={handleClick} 
    cursor={'pointer'} 
    key={e.idProjects}
    bg={formData.ProjectID === e.idProjects ? 'web.navBar' : 'unset'}
    textColor={formData.ProjectID === e.idProjects ? 'logo.orange' : 'unset'}
    _hover={{
      bg: 'web.navBar',
      color: 'logo.orange'
      }}
    >
      <Td fontSize={'xs'} maxW={'6vw'} textAlign={'match-parent'}>{e.ProjectName}</Td>
      <Td fontSize={'xs'} maxW={'10vw'} textAlign={'match-parent'}>{e.Shipping_Address ? e.Shipping_Address : '-'}</Td>
      <Td fontSize={'xs'} maxW={'6vw'} textAlign={'match-parent'}>{e.Shipping_City ? e.Shipping_City.toLowerCase() : '-'}</Td>
    </Tr>
  )
}

export const AddTaskProjectList = ({projects, setFormData, formData}) => {
    console.log(projects)
  const [initialCount] = useState(20);
  const [batchCount] = useState(15);
  const [loadedCount, setLoadedCount] = useState(initialCount);

    const handleScroll = () => {
      const container = document.getElementById('scroll-container'); // Reemplaza 'scroll-container' con el ID de tu contenedor de desplazamiento
      const { scrollTop, clientHeight, scrollHeight } = container;
  
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        // El usuario ha llegado al final, carga más productos
        setLoadedCount(prevCount => prevCount + batchCount);
      }
    };
  useEffect(()=>{
    const container = document.getElementById('scroll-container'); // Reemplaza 'scroll-container' con el ID de tu contenedor de desplazamiento
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    }}, [batchCount]);

    return(
      <Box
      display={'flex'}
      justifyContent={'center'}
      maxH={'40vh'}
      minH={'40vh'}
      ml={'1vh'}
      w={'96%'}
      >
        <Box
        id='scroll-container'
        maxHeight={'73vh'}
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
        p={'2vh'}
        w={'100%'} 
        >
          {
            projects.length ?

             (
              <TableContainer  maxW={'80vw'}>
                <Table color={'web.text'}variant={'simple'} size={'sm'}>
                  <Thead h={'6vh'}>
                    <Tr>
                        <Th color={'web.text2'} maxW={'6vw'} textAlign={'center'}>Project Name</Th>
                        <Th color={'web.text2'} maxW={'10vw'} textAlign={'center'}>Shipping Address</Th>
                        <Th color={'web.text2'} maxW={'6vw'} textAlign={'center'}>Shipping City</Th>
                      </Tr>
                    </Thead>
                    <Tbody >
                    { 
                      projects.slice(0, loadedCount).map((e, i) => {
                        return (<ModelTr key={i} e={e} setFormData={setFormData} formData={formData}/> )
                      })
                    }
                    </Tbody>
                  </Table>
                </TableContainer> 
                ) : (
                <Center w={'full'} h={'full'}>
                  <Text userSelect={'none'} fontSize={'2vh'}>No projects found</Text>
                </Center>
                )
            }
        </Box> 
      </Box>
    )}