import { 
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Text,
    ModalBody,
    ModalCloseButton,
    Box,
    Input,
    IconButton,
    useToast,
    Select,
    useDisclosure,
    Divider,
    Tooltip,
    Progress
    } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateInvoiceProductsList from "./createInvoiceProductsList";
import ReviewProductsModal from "./createInvoiceProductsReview";
import { getFiltered } from "../../../redux/actions-products";
import {BiSearch} from 'react-icons/bi'
import {AiOutlineClear} from 'react-icons/ai';
import '../../../assets/styleSheet.css'
import { getCustomers } from "../../../redux/actions-customers";

const CreateInvoiceModal = ({variables, setVariables, isOpen, onClose, customer, project, onClose4, onClose3, onClose2, onClose1, isOpen4, onOpen4, setInputValue, setCustomer}) => {
 
const dispatch = useDispatch()
const toast = useToast()
const allProducts = useSelector(state => state.all_products)
const productErrors = useSelector((state) => state.products_errors)
const values = useSelector(state => state.product_values)

const { isOpen: isOpen5, onOpen: onOpen5, onClose: onClose5 } = useDisclosure()

const [products, setProducts] = useState({})
const [disable, setDisable] = useState(true)

const [filters, setFilters] = useState({
  finish:'',
  material: '',
  search:'',
})


const validateToast = () => {
  if(Object.entries(productErrors).length){
    toast({        
      title: `${productErrors.error}`,
      status: 'warning',
      duration: 1500,
      isClosable: true,})
  }
}

useEffect(()=>{
  if(!allProducts?.length ) dispatch(getFiltered('','','','','','',''))
  validateToast()
  },[allProducts])

useEffect(()=>{
  if(Object.keys(products).length) setDisable(false)
  else setDisable(true)
}, [products, filters])


const handleFinish = (e) => {
  setFilters({
    ...filters,
    finish: e.target.value
  })
  dispatch(getFiltered(e.target.value, '', '', filters.material, filters.search, '', ''))
}


const handleMaterial = (e) => {
  setFilters({
    ...filters,
    material: e.target.value
  })
  dispatch(getFiltered(filters.finish, '', '', e.target.value, filters.search, '', ''))
}

const handleChangeProductName = (e) => {
  setFilters({
    ...filters,
    search: e.target.value
  })
  dispatch(getFiltered(filters.finish, '', '', filters.material, e.target.value, '', ''))
}

const handleClear = () => {
  setFilters({
    finish:'',
    material:'',
    search:''
    }) 
    dispatch(getFiltered('','','','', '','',''))
}


  const handlePrevious = () => {
    handleClear()
    onClose4()
    setProducts({})
  }

  const handleNext = () => {
      onOpen5()
      onClose4()
      setFilters({
        finish:'',
        material:'',
        search:'',
        })
      dispatch(getFiltered('','','','','','',''))
  }

  const handleClose = () => {
    onClose4()
    onClose3()
    onClose2()
    onClose1()
    setInputValue('')
    setCustomer('')
    dispatch(getCustomers('', ''))
  }

  return(
<>
  <Modal 
    isOpen={isOpen4} 
    onClose={handleClose}
    size={'4xl'}
    motionPreset='slideInRight'
    >
    <ModalOverlay />
    <ModalContent 
      bg={'web.sideBar'}
      border={'1px solid'}
      borderColor={'web.border'}
      >
      <Progress value={80} 
        colorScheme={"orange"} 
        mb={'2vh'} 
        background={'web.border'} 
        size={'sm'}
        borderTopRightRadius={'md'}
        borderTopLeftRadius={'md'}
        />  
        <ModalBody color={'web.text2'} display={'flex'} justifyContent={'center'} flexDir={'column'} h={'58vh'}>
        <Text ml={'2vw'} mt={'2vh'} fontSize={'lg'} w={'14vw'} color={'white'} alignSelf={'flex-start'}>Select products</Text>
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            h={'6vh'}
            mb={'2vh'}
            mr={'1.2vw'}
            >
            <Select
              onChange={(e)=>handleMaterial(e)}
              mb={'0.5vh'}
              mr={'2vw'}
              w={'9vw'}             
              minH={'5.5vh'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              _hover={{borderColor: 'web.border'}}
              cursor={'pointer'}
              value={filters.material}
            >
            <option value='' className="options">Type</option>
            {
              Object.entries(values).length ?
              values?.materials.map((v, i) => {
                  return(
                    <option value={`${v}`} key={i} className={'options'}>{`${v}`}</option>
                  )
                })
              :
              null  
            }
            </Select>
            <Select
              onChange={(e)=>handleFinish(e)}
              mb={'0.5vh'}
              w={'10vw'}
              minH={'5.5vh'}
              mr={'2vw'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              _hover={{borderColor: 'web.border'}}
              cursor={'pointer'}
              value={filters.finish}
            >
            <option value='' className="options">Finish</option>
            {
              Object.entries(values).length ?
              values?.finishValues.map((v, i )=> {
                return(
                  <option value={`${v}`} key={i} className={'options'}>{`${v}`}</option>
                )
              })
              :
              null
            }                     
            </Select>
            <Input
              mb={'0.5vh'}
              w={'10vw'}
              minH={'4.5vh'}
              variant="unstyled"
              placeholder={'Product name'}
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
              size={"sm"}
              value={filters.search}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              onChange={(e) => handleChangeProductName(e)}
              />
            <IconButton
              color={'web.text2'}
              aria-label="Search database"
              bgColor={'web.sideBar'}
              ml={'-0.5vw'}
              icon={<BiSearch />}
              size={'lg'}
              _hover={{
                color: 'orange.500',
              }}
              boxSize={'3.5'}
              mt={'3.3vh'}
              _active={{ color: 'gray.800'}}
            />
            <Divider orientation={'vertical'} h={'5vh'} ml={'1vw'}mr={'1vw'}/>
            <Tooltip placement={'bottom-start'} label={'Clear all filters'} fontWeight={'hairline'}>      
            <IconButton
              icon={ <AiOutlineClear/>}
              variant={'unstyled'} 
              display={'flex'} 
              borderRadius={'sm'} 
              placeContent={'center'}
              alignItems={'center'}
              color={'web.text2'} 
              _hover={{
                 color: 'logo.orange'
                 }}
              _active={{
              }}
              onClick={(e) => handleClear(e)}
              >
            </IconButton>
        </Tooltip> 
          </Box>          
          <CreateInvoiceProductsList allProducts={allProducts} products={products} setProducts={setProducts}/>
        </ModalBody>
        <ModalFooter mb={'2vh'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} ml={'2vw'} mr={'2vw'}>
        <Button
          colorScheme={'orange'}
          size={'sm'}
          onClick={()=>handlePrevious()}
          >
         Previous
        </Button>
        <Button
          colorScheme={'orange'}
          size={'sm'}
          disabled={disable}
          onClick={()=>handleNext()} 
          >
         Next
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  <ReviewProductsModal 
    variables={variables} 
    setVariables={setVariables} 
    products={products} 
    setProducts={setProducts} 
    customer={customer} 
    project={project} 
    isOpen5={isOpen5} 
    onClose5={onClose5} 
    onOpen4={onOpen4} 
    onClose4={onClose4}
    onClose3={onClose3}
    onClose2={onClose2}
    onClose1={onClose1}
    setInputValue={setInputValue}
    setCustomer={setCustomer}
  />
</>
)}

export default CreateInvoiceModal