import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure
  } from '@chakra-ui/react'
import CreatedQuotePdf from './createQuotePdf'
import { cleanCreatedQuote } from '../../../redux/actions-invoices'
import { useDispatch } from 'react-redux'
  
  export default function QuotePdfModal({variables, isPdfModalOpen, onPdfModalClose, customer, project, products, user}) {
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    
  const dispatch = useDispatch()

  
  const handleCloseModal = () => {
    onPdfModalClose()
    dispatch(cleanCreatedQuote())
  }

    return (
      <>
        <Modal 
        isOpen={isPdfModalOpen} 
        onClose={handleCloseModal} 
        size={'6xl'}>
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
              <CreatedQuotePdf variables={variables} customer={customer} project={project} products={products} user={user}/>
            </ModalBody>
          </ModalContent>
      </Modal>
    </>
  )
  }