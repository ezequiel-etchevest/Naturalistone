import { 
    Text,
    IconButton,
    Input,
    HStack,
    Box,
    Center,
    Spinner,
    } from "@chakra-ui/react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {BiSearch} from 'react-icons/bi'
import '../../../assets/styleSheet.css'
import { getInvoicesBySeller } from "../../../redux/actions-invoices";
import { AddTaskInvoicesList } from "./AddTaskInvoicesList";

const AddTaskInvoice = ({setFormData, formData, setDisable, user}) =>{
  
  const userId  =  user[0].SellerID
  const dispatch = useDispatch()
  const seller_invoices = useSelector(state => state.seller_invoices)
  const [errores, setErrores] = useState('')
  const [inputValues, setInputValues] = useState(
    {
      inputName: '',
      inputNumber: '',
      selectSeller: '',
      timeFilter: 'All'
    })

  const validateInput = (e) => {
    if(!/^[0-9]*$/.test(e.target.value)){
      setErrores('Special characters or letters not alowed') 
    } else if(e.target.value.length > 5){
      setErrores('Should not be longer than 5 digits')
    } else{
      setErrores('')
    }
  }

  const handleChangeInvoiceNumber = (e) => {
    const invoiceNumber = e.target.value
    validateInput(invoiceNumber)
    if(invoiceNumber.length){
      if(!errores.length){
        setInputValues({...inputValues, inputNumber: invoiceNumber})
        dispatch(getInvoicesBySeller(userId, {...inputValues, inputNumber: invoiceNumber}))
      }
      }
     else {
      setInputValues({...inputValues, inputNumber: ''})
      dispatch(getInvoicesBySeller(userId, {...inputValues, inputNumber: ''}))
    }
  }

  const handleChangeCustomerName = (e) => {
    const customerName = e.target.value
    if(customerName.length){
      setInputValues({...inputValues, inputName: customerName})
      dispatch(getInvoicesBySeller(userId, {...inputValues, inputName: customerName}))
    } else {
      setInputValues({...inputValues, inputName: ''})
      dispatch(getInvoicesBySeller(userId, {...inputValues, inputName: ''}))
    } 
  }

  return(
    <>
      <Text fontWeight={'semibold'}  ml={'1vw'} fontSize={'lg'}  color={'web.text2'} alignSelf={'flex-start'}>If you want to link a invoice, please select one from the list:</Text>
      {
        !formData.CustomerID ? (
          <HStack
          display={'flex'}
          h={'6vh'}
          mt={'2vh'}
          mb={'2vh'}
          p={'1vw'}
          justifyContent={'space-between'}
          >  
          <Box
          display={'flex'}
          alignItems={'center'} 
          w={'15vw'}
          h={'10vh'}
          >
          <Input
            mb={'0.5vh'}
            w={'80%'}
            minH={'4.5vh'}
            variant="unstyled"
            type={'number'}
            placeholder={'Quote number'}
            textColor={'web.text2'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
            size={"sm"}
            borderBottomWidth={"2px"}
            borderBottomColor={'web.text2'}
            name={'invoiceNumber'}
            value={inputValues.inputNumber}
            autoComplete={"off"}
            onChange={(e) => handleChangeInvoiceNumber(e)}
          />
          <IconButton
            color={'web.text2'}
            borderRadius={2}
            aria-label="Search database"
            bgColor={'web.sideBar'}
            ml={1}
            icon={<BiSearch />}
            _hover={{
              color: 'orange',
            }}
            _active={{ color: 'gray.800'}}
          /> 
          {
            errores.length >= 1 && (
              <Box display={'flex'} mt={'8vh'} 
              position={'fixed'}>
                <Text color={'web.error'} fontSize={'xs'} display={'flex'}>
                  {errores}
                </Text>
              </Box>
          )}
          </Box>
          <Box
            display={'flex'}
            alignItems={'center'} 
            w={'15vw'}
            h={'10vh'}
            ml={'1vw'}
            >
            <Input
              mb={'0.5vh'}
              w={'80%'}
              minH={'4.5vh'}
              variant="unstyled"
              placeholder={'Customer name'}
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              value={inputValues.inputName ? inputValues.inputName : ''}
              autoComplete={"off"}
              onChange={(e)=> handleChangeCustomerName(e)}
            />
            <IconButton
              color={'web.text2'}
              borderRadius={2}
              aria-label="Search database"
              bgColor={'web.sideBar'}
              ml={1}
              icon={<BiSearch />}
              _hover={{
                color: 'orange',
              }}
              _active={{ color: 'gray.800'}}
            />
          </Box>
          </HStack>
        ) : (
          <HStack
          display={'flex'}
          h={'6vh'}
          mt={'2vh'}
          mb={'2vh'}
          p={'1vw'}
          justifyContent={'space-between'}
          > </HStack>
        )
      }
        { 
        seller_invoices.length ?
          Array.isArray(seller_invoices) ?
            <AddTaskInvoicesList 
              seller_invoices={seller_invoices} 
              setFormData={setFormData}
              formData={formData}
              setDisable={setDisable}
              />
            :
            <Text maxH={'50vh'} minH={'50vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>No invoices match this filters</Text>
          :
          <Center maxH={'50vh'} minH={'50vh'}>
            <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
          </Center>
        }
    </>
    )
  }
  
  export default AddTaskInvoice