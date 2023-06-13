import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure ,
  ButtonGroup,
  IconButton,
  Button,
  Center,
  Spinner
} from '@chakra-ui/react'
import LoadPdf from '../../pdf/pdfPaidFunction'
import { MdOpenInNew } from 'react-icons/md'


export default function ModalPDF({invoice}) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const id = invoice[0].Naturali_Invoice
  const stamp = invoice[0].Payment_Stamp

  return (
    <>
       <ButtonGroup
         textColor={'web.text2'}
         h={'5vh'}
         display={'flex'}
         spacing={0}
         _hover={{
         color: 'logo.orange'
         }}
         onClick={onOpen}
         >
        <IconButton
         variant={'unstyled'}           
         fontSize={'xl'}
         icon={<MdOpenInNew/>}/>
         <Button
         fontSize={'1vw'}
         variant={'unstyled'}           
         fontWeight={'normal'}
         >Open</Button>       
        </ButtonGroup>
      <Modal isOpen={isOpen} onClose={onClose} size={'6xl'}>
        <ModalOverlay />
        <ModalContent 
          rounded={'md'} 
          mt={'4vh'} 
          mb={'4vh'} 
          w={'60vw'} 
          bg={'web.sideBar'} 
          border={'1px solid'} 
          pt={'2vh'} 
          pb={'2vh'} 
          borderColor={'web.border'}>
            
          <ModalBody w={'100%'} h={'100%'}>
            {
             !invoice.length ?
              <Center>
                <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
              </Center>
              :
              <LoadPdf idpdf={id} stamp={stamp}/>
            }
          </ModalBody>
        </ModalContent>
    </Modal>
  </>
)
}