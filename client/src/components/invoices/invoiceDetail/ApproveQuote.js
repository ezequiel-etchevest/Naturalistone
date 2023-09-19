import { 
    Button, 
    ButtonGroup, 
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
    Box
    } from "@chakra-ui/react"
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { BsFileEarmarkCheck } from 'react-icons/bs'
import { changeStatus, getInvoiceById } from "../../../redux/actions-invoices";
import '../../../assets/styleSheet.css';
import { useEffect, useState } from "react";

const ApproveQuote= ({invoice, user, handleDisabled}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const {id} = useParams()

  const handleSubmit = () => {
    dispatch(changeStatus(id, 'Pending'))
    dispatch(getInvoiceById(invoice[0].Naturali_Invoice))
    onClose()
  }
  
    return(
        <>
          <ButtonGroup
            textColor={'web.text2'}
            h={'5vh'}
            onClick={user.Secction7Flag === 1 ? onOpen : null}  
            display={'flex'}
            spacing={0}
            _hover={{
            color: 'logo.orange'
            }}
            disabled={handleDisabled()}
            >
          <IconButton
            fontSize={'xl'}
            variant={'unstyled'}           
            fontWeight={'normal'}
            disabled={handleDisabled()}
            icon={<BsFileEarmarkCheck/>}/>
              <Button
                variant={'unstyled'}           
                fontWeight={'normal'}
                fontSize={'1vw'}
                disabled={handleDisabled()}
                >Approve </Button>   
          </ButtonGroup>
          <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            >
            <ModalOverlay/>
            <ModalContent 
              bg={'web.sideBar'}
              border={'1px solid'}
              borderColor={'web.border'}
              >
              <ModalHeader
              color={'web.text'}>
                Approve Quote
              </ModalHeader>
              <ModalCloseButton
                color={'web.text2'}
                _hover={{
                  color: 'web.text'
                }} />
              <ModalBody color={'web.text2'}>
               <Text>Are you sure you want to approve this Quote?</Text>
              <Text> This action can't be undone</Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme={'orange'} 
                  mr={3} 
                  onClick={()=>handleSubmit()}
                  >
                 Confirm
                </Button>
                <Button variant='ghost' onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
    )
}

export default ApproveQuote
