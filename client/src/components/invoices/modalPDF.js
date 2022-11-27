import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure ,
  Image,
  Button
} from '@chakra-ui/react'
import miniPDF from '../../assets/miniPDF.png'
import LoadPDF from '../pdf/pdfModify'

export default function ModalPDF() {

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Image onClick={onOpen} src={miniPDF} cursor={'pointer'} />
      <Modal isOpen={isOpen} size={'xl'} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader/>
          <ModalCloseButton />
          <ModalBody>
            <Image src={miniPDF} />
            {/* <LoadPDF/> */}
          </ModalBody>
          <ModalFooter>
            <Button bg={'web.sideBar'} textColor={'white'} _hover={{bg: 'logo.orange'}} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' border={'orange 1px solid'} textColor={'web.sideBar'} _hover={{bg: 'logo.orange'}}>Print</Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  </>
)
}