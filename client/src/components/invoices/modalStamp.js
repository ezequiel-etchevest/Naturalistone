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
    ModalCloseButton
  } from '@chakra-ui/react'
  import { TfiStamp } from 'react-icons/tfi'
  
  export default function ModalStamp({invoice}) {
    
  const { isOpen, onOpen, onClose } = useDisclosure()
  const id = invoice[0].Naturali_Invoice

  const handleSubmit = () => {
 
  }

  return (
    <>
      <ButtonGroup
        display={'flex'}
        spacing={0}
        placeContent={'space-between'}
          _hover={{
          color: 'logo.orange'
        }}>
        <IconButton
          variant={'unstyled'}           
          fontWeight={'normal'}
          icon={<TfiStamp/>}/>
        <Button
          variant={'unstyled'}              
          fontWeight={'normal'}
          onClick={onOpen}
          >Stamp PDF
        </Button>
      </ButtonGroup>
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'} >
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
        <ModalHeader color={'web.text'}>Do you want to stamp quote n° {id} ? </ModalHeader>
        <ModalCloseButton color={'web.text'}/>
        <ModalBody>
          <Text
          color={'web.text2'}
          textAlign={'justify'}
          pt={'2vh'}
          >Once you confirm this set of payments, you wont be able to change it again. Please make sure to have all the correct information.</Text>
        </ModalBody>
        <ModalFooter>
          <Button  colorScheme='orange' mr={3} onClick={handleSubmit}>Confirm Payments</Button>
          <Button variant='ghost' color={'web.text'} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
)
}