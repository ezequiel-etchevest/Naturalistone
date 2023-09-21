import { Box, Button, FormControl, FormLabel, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCustomerRelationship, getCustomerRelationship } from '../../../redux/actions-customers'
import { BsFillPlusSquareFill } from "react-icons/bs";

export function CustomerRelationship({ user, customer }) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()

  const handleClose = () => {
    setFormData({
      Action: "",
      Comment: "",
    })
    onClose()
  }

  const [formData, setFormData] = useState({
    Action: "",
    Comment: "",
  })

  const handleSelect = (event) => {
    setFormData({
      ...formData,
      Action: event.target.value
    })
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      Comment: event.target.value
    })
  }

  const handleSubmit = () => {
    if (formData.Action === "" || formData.Comment === "") {
      return;
    }
    dispatch(createCustomerRelationship(formData, user.SellerID, customer.CustomerID))
    dispatch(getCustomerRelationship(customer.CustomerID))
    setFormData({
      Action: "",
      Comment: "",
    })
    onClose()
  }

  return(
      <>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexDir={"row"}>
          <Text
            mb={'1vh'} 
            fontSize={'2.6vh'} 
            color={'web.text2'}>
            Customer Relationship
          </Text>
            <IconButton
              size={'lg'}
              icon={ <BsFillPlusSquareFill/>}
              variant={'unstyled'} 
              display={'flex'} 
              placeContent={'center'}
              alignItems={'center'}
              pr={"40px"}
              color={'web.text2'} 
              _hover={{
                color: 'logo.orange'
              }}
              _active={{
              }}
              onClick={onOpen}
            />
          <Modal 
            isOpen={isOpen} 
            onClose={handleClose}
          >
          <ModalOverlay/>
          <ModalContent 
            bg={'web.sideBar'}
            border={'1px solid'}
            borderColor={'web.border'}
            >
            <ModalHeader
            color={'web.text'}>
              Relationship
            </ModalHeader>
            <ModalCloseButton
            onClick={handleClose}
            color={'web.text2'}
            _hover={{
            color: 'web.text'
            }} />
            <ModalBody>
            <FormControl isRequired>
            <FormLabel color={'web.text'}>
              Action
            </FormLabel>
          <Select
            _focus={{
              borderColor: 'logo.orange',
              boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
              }}
            bg={'web.sideBar'}
            borderColor={'web.border'} 
            color={'web.text2'}
            onChange={(e)=>handleSelect(e)}
            value={formData.Action}
            >
              <option value='' className="options" >Select Option</option>
              <option value='Call' className="options" >Call</option>
              <option value='Email' className="options" >Email</option>
              <option value='Showroom visit' className="options" >Showroom visit</option>
          </Select>
            </FormControl>
            <FormControl mt={'2vh'} isRequired>
            <Box
              mt={8}
              display={'flex'} 
              flexDirection={'row'}
            >
              <FormLabel color={'web.text'}>Comment</FormLabel>
            </Box>
            <Textarea
              mb={'0.5vh'}
              h={"50px"}
              variant="unstyled"
              textColor={'web.text'}
              placeholder="Write your comment here..."
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', fontStyle:'italic' }}
              size={"sm"}
              border={'1px solid'}
              borderColor={'web.border'}
              type={"text"}
              value={formData.Comment}
              onChange={handleChange}
              p={"1vw"}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={'orange'} 
              mr={3}
              onClick={()=>handleSubmit()}
              >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </Box>
      </>
  )
}