// https://github.com/transloadit/uppy
// npm install @uppy/react

import React, { useMemo, useState } from "react";
import Uppy from "@uppy/core";
// import XHRUpload from "@uppy/xhr-upload"
import Tus from "@uppy/tus";
import XHR from '@uppy/xhr-upload';

// import { DragDrop } from "@uppy/react";
import AwsS3 from '@uppy/aws-s3';
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
// import "../../../assets/uppyCustom.css"

const AddFiles = ({ product, allowedFileTypes, title, fieldName, url}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ infoImages, setInfoImages ] = useState({
    site: "imagesProduct",
    prodId: product.ProdID,
    prodName: product.ProductName,
    data: []
  })

  const uppy = new Uppy({
    restrictions: {
      allowedFileTypes,
      maxFileSize: null,
    },
  })
    uppy.use(XHR, { endpoint: `http://localhost:5000/api${url}`, fieldName, formData: true });

  return (
    <>
      <Box px="1vh">
        <Button
         leftIcon={<AiOutlinePlus />}
         variant={"unstyled"}
         display={"flex"}
         alignSelf={"flex-end"}
         mr={"1vw"}
         alignItems={"center"}
         fontSize={"sm"}
         color={"web.text2"}
         fontWeight={"normal"}
         _hover={{
           color: "logo.orange",
          }}
         _active={{}}
         onClick={onOpen}
        >
         {title}
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}  size={'6xl'}>
        <ModalOverlay />
        <ModalContent
          rounded={'md'} 
          mt={'4vh'}
          mb={'4vh'} 
          w={'50vw'}
          height={"80vh"}
          bg={'web.sideBar'} 
          border={'1px solid'} 
          pt={'2vh'} 
          pb={'2vh'} 
          borderColor={'web.border'}>
          <ModalCloseButton />
          <ModalBody w={'100%'} h={'100%'}>
            <Dashboard
            uppy={uppy}
            plugins={["DragDrop"]}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
  );
};

export default AddFiles;
