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
import { Box, Button, ButtonGroup, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";
import "../../../assets/uppyCustom.css"

const AddFiles = ({ product, allowedFileTypes, title, fieldName, url, pxButton, tooltip}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const uppy = new Uppy({
    restrictions: {
      allowedFileTypes,
      maxFileSize: null,
    },
  })
    uppy.use(XHR, { endpoint: `http://localhost:5000/api${url}`, fieldName, formData: true });

  return (
    <>
      <Tooltip label={tooltip} placement={'bottom-start'} fontWeight={'hairline'}>
        <Box px={pxButton}>
          <ButtonGroup
          textColor={'web.text2'}
          h={'5vh'}
          display={'flex'}
          spacing={0}
          _hover={{
          color: 'logo.orange'
          }}
          >
            <IconButton
            variant={'unstyled'}           
            fontSize={'xl'}
            onClick={onOpen}
            icon={<BiAddToQueue/>}/>
            <Button
            fontSize={'1vw'}
            variant={'unstyled'} 
            onClick={onOpen}
            fontWeight={'normal'}
            >{title}</Button>       
          </ButtonGroup>
      </Box>
        </Tooltip>
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
