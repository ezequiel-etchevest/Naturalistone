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
  
  export default function QuotePdfModal({variables, isOpen6, onClose6, customer, project, products, user, onClose5, onClose4, onClose3, onClose2, onClose1}) {
    
  const dispatch = useDispatch()

  
  const handleCloseAllModal = () => {
    onClose6()
    onClose5()
    onClose4()
    onClose3()
    onClose2()
    onClose1()
    dispatch(cleanCreatedQuote())
  }

    return (
      <>
        <Modal 
        isOpen={isOpen6} 
        onClose={handleCloseAllModal} 
        size={'6xl'}
        motionPreset='slideInRight'>
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