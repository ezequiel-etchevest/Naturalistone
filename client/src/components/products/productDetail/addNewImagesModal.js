// https://github.com/transloadit/uppy
// npm install @uppy/react

import React, { useMemo } from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { DragDrop } from "@uppy/react";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
// import "../../../assets/uppyCustom.css"

const uppy = new Uppy({
  meta: { type: "avatar" },
  restrictions: { maxNumberOfFiles: 3 },
  autoProceed: false
});

  // uppy.use(Tus, { endpoint: "http://localhost:5000/api/customers" });

  uppy.on("complete", (result) => {
    console.log("sreulst", result)
    const url = result.successful[0].uploadURL;
    // store.dispatch({
    //   type: 'SET_USER_AVATAR_URL',
    //   payload: { url },
    // })
    console.log(url);
  });

console.log("soyu ppy afuera", uppy)

const AddImages = (props) => {

 const uppy = useMemo(() => {
    return new Uppy({
      restrictions: { maxNumberOfFiles: 3 },
      autoProceed: false
    });
  }, []);

  // React.useEffect(() => {
  //   return () => uppy.close();
  // }, []);




  const { isOpen, onOpen, onClose } = useDisclosure()

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

            {...props}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
  );
};

export default AddImages;
