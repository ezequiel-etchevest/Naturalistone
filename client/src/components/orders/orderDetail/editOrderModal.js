import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
    Button,
    Text,
    ButtonGroup,
    IconButton,
    ModalFooter,
    ModalHeader,
    ModalCloseButton,
    Tooltip
  } from '@chakra-ui/react'
import { BiEditAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import TableOrderProducts from './TableOrderProducts'
  
export default function EditOrderModal({order_products}) {
    
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch()
    onClose()
  }
  
    return (
      <>
        <Tooltip>
        <ButtonGroup
          display={'flex'}
          color={'web.text2'}
          placeContent={'space-between'}
            _hover={{
            color: 'logo.orange'
          }}
          mr={'2vw'}>
          <IconButton 
            display={'flex'}
            variant={'unstyled'}
            fontSize={'3vh'}           
            fontWeight={'normal'}
            onClick={onOpen}
            icon={<BiEditAlt/>}
            />
        </ButtonGroup>
        </Tooltip>
        <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay />
        <ModalContent 
          rounded={'md'} 
          mt={'4vh'} 
          mb={'4vh'} 
          w={'60vw'}
          h={'44vh'} 
          bg={'web.sideBar'} 
          border={'1px solid'} 
          p={'3vh'} 
          pl={'3vw'}
          pr={'3vw'}
          borderColor={'web.border'}
          >
          {/* <ModalHeader color={'web.text'}>Do you want to stamp quote n°  ? </ModalHeader> */}
          <ModalCloseButton color={'web.text'}/>
          <ModalBody>
            <TableOrderProducts order_products={order_products}/>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='orange' 
              mr={3} 
              onClick={()=>handleSubmit()}>
                Confirm</Button>
            <Button 
              variant='ghost' 
              color={'web.text'} 
              onClick={onClose}
              _hover={{
                color: 'logo.orange'
              }}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )}
//   )}else{
//     return(
//     <>
//       <Tooltip label={'Stamped quote'}>
//       <ButtonGroup
//         display={'flex'}
//         spacing={0}
//         placeContent={'space-between'}
//           _hover={{
//           color: 'logo.orange'
//         }}>
//         <IconButton
//           disabled={true}  
//           variant={'unstyled'}           
//           fontWeight={'normal'}
//           icon={<TfiStamp/>}/>
//         <Button
//           disabled={true}  
//           variant={'unstyled'}              
//           fontWeight={'normal'}
//           >Stamp PDF
//         </Button>
//       </ButtonGroup>
//       </Tooltip>
//     </>)
//   }
// }