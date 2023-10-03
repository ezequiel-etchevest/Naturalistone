// https://github.com/transloadit/uppy
// npm install @uppy/react

import React, { useMemo, useState } from "react";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload"
import Tus from "@uppy/tus";
import { DragDrop } from "@uppy/react";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
// import "../../../assets/uppyCustom.css"

const AddImages = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ infoImages, setInfoImages ] = useState({
    site: "imagesProduct",
    prodId: product.ProdID,
    prodName: product.ProductName,
    data: []
  })

  const uppy = useMemo(() => {
    return new Uppy({
      restrictions: { maxNumberOfFiles: 3 },
      autoProceed: false
    });
  }, []);


//   uppy.on('file-added', (file) => {
//   // 'file' contiene la información del archivo seleccionado
//   const fileData = {
//     data: file.data,
//     id: file.id
//   }
//   setInfoImages({
//     ...infoImages,
//     data: [...infoImages.data, fileData]
//   })
// });


// 
// uppy.on("upload", (result) => {
//   console.log("soy resut", result)
//   const fileData = {
//     data: result[0].data,
//     id: result[0].id
//   }
//   setInfoImages({
//     ...infoImages,
//     data: [...infoImages.data, fileData]
//   })
//   console.log('hola', infoImages);
// });

  // uppy.on('file-removed', (file, reason) => {
  //   if (reason === 'removed-by-user') {
  //     infoImages.data.filter((elem) => elem.id !== file.id)
  //   }
  // });

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
         Add new images
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

export default AddImages;
