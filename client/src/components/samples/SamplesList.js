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
    useDisclosure,
    } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import SamplesProducts from './SamplesProducts';
import { getSamplesProducts } from '../../redux/actions-samples';
  
  
  const ModelTr = ({e}) => {

    const { isOpen, onClose, onOpen } = useDisclosure()
  
    const handleClick = (e) => {
      onOpen()
    }
  
    return(
      <>
      <Tr 
      onClick={handleClick} 
      cursor={'pointer'} 
      key={e.CustomerID}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
        }}
      >
        <Td fontSize={'xs'} maxW={'6vw'} textAlign={'center'}>{e.idSamples}</Td>
        <Td fontSize={'xs'} maxW={'10vw'} textAlign={'center'}>{e.Company}</Td>
        <Td fontSize={'xs'} maxW={'6vw'} textAlign={'center'}>{e.ProjectName}</Td>
        <Td fontSize={'xs'} maxW={'3vw'} textAlign={'center'}>{e.TrackingNumber}</Td>
      </Tr>
      { isOpen && <SamplesProducts isOpenModal={isOpen} onCloseModal={onClose} idSamples={e.idSamples}/> }
      </>
    )
  }
  
  const SamplesList = ({ samples, user }) => {
  
  const [initialCount] = useState(20);
  const [batchCount] = useState(15);
  const [loadedCount, setLoadedCount] = useState(initialCount);
  const toast = useToast()
  const id = 'test-toast'

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
    ml={'1vh'}
    h={'75vh'}
    w={'82.8vw'} 
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
      p={'3vh'}
      w={'80vw'}
      >
      {
        samples?.length ? (
          <TableContainer  maxW={'80vw'}>
            <Table color={'web.text'}variant={'simple'} size={'sm'}>
              <Thead h={'6vh'}>
                <Tr>
                    <Th color={'web.text2'} maxW={'6vw'} textAlign={'center'}>Sample ID</Th>
                    <Th color={'web.text2'} maxW={'10vw'} textAlign={'center'}>Company / Customer</Th>
                    <Th color={'web.text2'} maxW={'6vw'} textAlign={'center'}>Project</Th>
                    <Th color={'web.text2'} maxW={'6vw'} textAlign={'center'}>Tracking Number</Th>
                  </Tr>
                </Thead>
                <Tbody >
                { 
                  samples?.slice(0, loadedCount).map((e, i) => {
                    return (<ModelTr key={i} e={e} user={user}/> )
                  })
                }
                </Tbody>
              </Table>
            </TableContainer> 
             ) : (
            <Center w={'full'} h={'full'}>
              <Text userSelect={'none'} fontSize={'2vh'}>No customers found</Text>
            </Center>
            )
         } 
      </Box> 
    </Box>
      )
  }
  export default SamplesList;
  