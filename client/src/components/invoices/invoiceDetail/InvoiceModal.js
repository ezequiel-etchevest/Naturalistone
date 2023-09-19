import { 
  Modal,
  ModalContent,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import React from "react";

export function InvoiceModal({ isOpen, onClose }){
  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        >
         <ModalOverlay/>
         <ModalContent
          w={"80vw"}
          h={"80vh"}
          bg={'web.sideBar'}
          border={'1px solid'}
          borderColor={'web.border'}
          >
        </ModalContent>
      </Modal>
    </>
  )
}
