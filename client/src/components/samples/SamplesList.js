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
    useDisclosure,
    } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import SamplesProducts from './SamplesProducts';
import { AiFillDelete } from "react-icons/ai"
import { deleteSample, getSamples } from '../../redux/actions-samples';
import { useDispatch } from 'react-redux';
  

  const ModelTr = ({e}) => {

    const { isOpen, onClose, onOpen } = useDisclosure()

    const dispatch = useDispatch()
  
    const handleClick = (e) => {
      onOpen()
    }

    const handleDelete = (idSample) => {
      dispatch(deleteSample(idSample))
      dispatch(getSamples())
    }
  
    return(
      <>
      <Tr 
      cursor={'pointer'} 
      key={e.CustomerID}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
        }}
      >

        <Td onClick={handleClick} fontSize={'xs'} pl={'2vw'}>{e.idSamples}</Td>
        <Td onClick={handleClick} fontSize={'xs'} w={'10vw'} maxW={'10vw'} minW={'10vw'} overflow={'hidden'}>
          <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{e.Company}</Text>
        </Td>
        <Td onClick={handleClick} fontSize={'xs'} w={'10vw'} maxW={'10vw'} minW={'10vw'} overflow={'hidden'}>
          <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{e.ProjectName}</Text>
        </Td>
        <Td onClick={handleClick} fontSize={'xs'} w={'8vw'} maxW={'8vw'}textAlign={'center'}>{e.TrackingNumber}</Td>
        <Td onClick={handleClick} fontSize={'xs'} w={'6vw'} maxW={'6vw'}textAlign={'center'}>{e.InsertDate?.split('T')[0]}</Td>
        <Td onClick={handleClick} fontSize={'xs'} w={'8vw'} maxW={'6vw'}textAlign={'center'}>{e.EstDelivery_Date?.split('T')[0]}</Td>
        <Td onClick={() => handleDelete(e.idSamples)} fontSize={'xs'} w={'2vw'} maxW={'6vw'}textAlign={'center'}>{<AiFillDelete />}</Td>
      </Tr>
      { isOpen && <SamplesProducts isOpenModal={isOpen} onCloseModal={onClose} idSamples={e.idSamples}/> }
      </>
    )
  }
  
  const SamplesList = ({ samples, user }) => {
  
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
                    <Th color={'web.text2'} w={'4vw'} maxW={'4vw'} >Sample ID</Th>
                    <Th color={'web.text2'} w={'10vw'} maxW={'10vw'}>Company / Customer</Th>
                    <Th color={'web.text2'} w={'10vw'} maxW={'10vw'}>Project</Th>
                    <Th color={'web.text2'} w={'8vw'} maxW={'8vw'} textAlign={'center'}>Tracking Number</Th>
                    <Th color={'web.text2'} w={'6vw'} maxW={'6vw'} textAlign={'center'}>Insert Date</Th>
                    <Th color={'web.text2'} w={'6vw'} maxW={'6vw'} textAlign={'center'}>Est Delivery Date</Th>
                    <Th color={'web.text2'} w={'2vw'} maxW={'6vw'} textAlign={'center'}></Th>
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
              <Text userSelect={'none'} color={'web.text2'} fontSize={'2vh'}>No samples found</Text>
            </Center>
            )
         } 
      </Box> 
    </Box>
      )
  }
  export default SamplesList;
  