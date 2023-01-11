import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure ,
  Image
} from '@chakra-ui/react'
import miniPDF from '../../../assets/miniPDF.png'
import LoadPDF from '../../pdf/pdfModify'
import LoadPdfPaid from '../../pdf/pdfPaidFunction'


export default function ModalPDF({invoice, payments}) {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const id = invoice[0].Naturali_Invoice

  return (
    <>
      <Image onClick={onOpen} src={miniPDF} cursor={'pointer'} />
      <Modal isOpen={isOpen} onClose={onClose} size={'full'} >
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
            invoice[0].Payment_Stamp != 0 ? (
                <LoadPdfPaid idpdf={id}/>
              ):(
                <LoadPDF idpdf={id} />
              )       
            }
          </ModalBody>
        </ModalContent>
    </Modal>
  </>
)
}