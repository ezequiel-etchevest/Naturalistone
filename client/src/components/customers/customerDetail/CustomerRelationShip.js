import { Box, Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberInput, NumberInputField, Select, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCustomerRelationship } from '../../../redux/actions-customers'

export function CustomerRelationShip({ user, customer }) {

  console.log("soiy user", user)
  console.log("soiy customer", customer)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()

  const handleClose = () => {
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

  const handleSubmit = (event) => {
    dispatch(createCustomerRelationship(formData, user.SellerID, customer.CustomerID))
  }

  console.log("formdata", formData)

  return(
      <>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
          <Text>
            Customer Relationship
          </Text>
          <Button 
          onClick={onOpen} 
          colorScheme={'orange'}
          mt={"10px"}
          h={"20px"}
          >
            Create
          </Button>
          <Modal 
            isOpen={isOpen} 
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
              <option value='value1' className="options" >value1</option>
              <option value='value2' className="options" >value2</option>
              <option value='value3' className="options" >value3</option>
              <option value='value4' className="options" >value4</option>
              <option value='value5' className="options" >value5</option>
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
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', fontStyle:'italic', pl:'1vw' }}
              size={"sm"}
              border={'1px solid'}
              borderColor={'web.border'}
              type={"text"}
              value={formData.Comment}
              onChange={handleChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={'orange'} 
              mr={3}
              // disabled={disabled()} 
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