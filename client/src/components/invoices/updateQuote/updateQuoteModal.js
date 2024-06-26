import { 
    IconButton, 
    useDisclosure, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalBody, 
    ModalFooter, 
    Button,
    ButtonGroup,
    Progress,
    useToast,
    ModalCloseButton} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from 'react-icons/fi'
import { validateEmptyInputsCreateQuote } from "../../../utils/validateForm";
import { getCustomers, updateCustomer } from "../../../redux/actions-customers";
import { cleanProjectsCustomer, getCustomerProjects } from "../../../redux/actions-projects";
import CreateQuoteCustomerProjets from "../createQuote/createQuoteProject";
import { getAllProductsNewQuote } from "../../../redux/actions-products";
import {  cleanInvoiceProducts, updateQuote, updateQuoteProds } from "../../../redux/actions-invoices";
import CreateQuoteCustomer from "../createQuote/createQuoteCustomer";
import CreateQuoteCustomerReview from "../createQuote/createQuoteCustomerReview";
import { UpdateQuoteSelection } from "./updateQuoteSelection";
import CreateQuoteProducts from "../createQuote/createQuoteProducts";
import { formatProducts } from "../../../utils/formatedProducts";
import updateQuotePdf from "./updateQuotePdf";
import CreateQuoteProductsReview from "../createQuote/createQuoteProductsReview";
import UpdateQuoteProductsReview from "./updateQuoteProductList";

export default function UpdateQuoteModal({invoice, invoice_products}) {

    const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure()
    const user = useSelector(state => state.user)
    const customers = useSelector(state => state.customers)
    const values = useSelector(state => state.products_new_quote_values)
    const [errorsCustomer, setErrorsCustomer] = useState({})
    const [disable, setDisable] = useState(true)
    const [progress, setProgress] = useState(0)
    const [update, setUpdate] = useState('Update')
    const [component, setComponent] = useState('')
    const [submited, setSubmited] = useState(false)
    const [customersFilter, setCustomersFilter] = useState(customers)
    const [formData, setFormData] = useState({
      customer: {
        Contact_Name: invoice[0].Contact_Name,
        City: invoice[0].City,
        Address: invoice[0].Address,
        State: invoice[0].State,
        ZipCode: invoice[0].ZipCode,
        Company: invoice[0].Company,
        Company_Position: invoice[0].Company_Position,
        Phone: invoice[0].Phone,
        Email: invoice[0].Email,
        DiscountID: invoice[0].DiscountID,
        DiscountRate: invoice[0].DiscountRate,
        Billing_Address:invoice[0].Billing_Address,
        Billing_City:invoice[0].Billing_City,
        Billing_ZipCode:invoice[0].Billing_ZipCode,
        Billing_State:invoice[0].Billing_State,
        CustomerID: invoice[0].CustomerID
      },
      project: {
        ProjectName: invoice[0].ProjectName,
        idProjects:invoice[0].idProjects,
        Shipping_State: invoice[0].Shipping_State,
        Shipping_ZipCode: invoice[0].Shipping_ZipCode,
        Shipping_City: invoice[0].Shipping_City,
        Shipping_Address: invoice[0].Shipping_Address
      },
      products: formatProducts(invoice_products),
      variables:{
        shipVia: invoice[0].ShippingMethod,
        method: invoice[0].P_O_No,
        paymentTerms:invoice[0].PaymentTerms,
        estDelivDate: invoice[0].EstDelivery_Date !== null ? invoice[0].EstDelivery_Date?.split('T')[0] : null,
        transferFee: invoice[0].Transfer_Fee ?? '',
        cratingFee: invoice[0].Crating_Fee ?? '',
        shippingFee: invoice[0].Shipping_Fee ?? '',
      },
      quote: {
        notes: invoice[0].Sale_Notes
      }
    });
    const dispatch = useDispatch();
    const toast = useToast()
    const toastId = 'error-toast'
    const customerID = formData?.customer.CustomerID
    const invoiceID = invoice[0].Naturali_Invoice
    const SellerID = user[0].SellerID
    
    useEffect(() => {
      if(!customers?.length){
        dispatch(getCustomers('',''))
      }
      dispatch(getCustomerProjects(invoice[0].CustomerID))
      dispatch(getAllProductsNewQuote('', '', ''))
    }, [])
 
    useEffect(()=>{
        setFormData({
          customer: {
            Contact_Name: invoice[0].Contact_Name,
            City: invoice[0].City,
            Address: invoice[0].Address,
            State: invoice[0].State,
            ZipCode: invoice[0].ZipCode,
            Company: invoice[0].Company,
            Company_Position: invoice[0].Company_Position,
            Phone: invoice[0].Phone,
            Email: invoice[0].Email,
            DiscountID: invoice[0].DiscountID,
            DiscountRate: invoice[0].DiscountRate,
            Billing_Address:invoice[0].Billing_Address,
            Billing_City:invoice[0].Billing_City,
            Billing_ZipCode:invoice[0].Billing_ZipCode,
            Billing_State:invoice[0].Billing_State,
            CustomerID: invoice[0].CustomerID
          },
          project: {
            ProjectName: invoice[0].ProjectName,
            idProjects:invoice[0].idProjects,
            Shipping_State: invoice[0].Shipping_State,
            Shipping_ZipCode: invoice[0].Shipping_ZipCode,
            Shipping_City: invoice[0].Shipping_City,
            Shipping_Address: invoice[0].Shipping_Address
          },
          products: formatProducts(invoice_products),
          variables:{
            shipVia: invoice[0].ShippingMethod,
            method: invoice[0].P_O_No,
            paymentTerms:invoice[0].PaymentTerms,
            estDelivDate:invoice[0].EstDelivery_Date !== null ? invoice[0].EstDelivery_Date?.split('T')[0] : null,
            transferFee: invoice[0].Transfer_Fee ?? '',
            shippingFee: invoice[0].Shipping_Fee ?? '',
            cratingFee: invoice[0].Crating_Fee ?? '',
          },
          quote: {
            notes: invoice[0].Sale_Notes
        }
        })
    }, [invoice, invoice_products])

    const handleSubmit = async () => {
      if(progress === 60 || (component === "Project" && progress === 20)){
         dispatch(updateQuote(invoiceID, formData, SellerID))
      } 
      if(component === 'Products' && progress === 40){
         dispatch(updateQuoteProds(invoiceID, formData, SellerID))
         dispatch(cleanInvoiceProducts())
      }
      updateQuotePdf(formData, user, invoice)
      setSubmited(true)
      handleClose()
      handleCleanFormData()
      dispatch(getAllProductsNewQuote('', '', ''))
    }

    const handleClose = () => {
      setDisable(true)
      setProgress(0)
      setUpdate('')
      dispatch(getCustomers('', ''))
      onCloseUpdate()
      handleCleanFormData()
    }

    const handleCleanFormData = () => {
      setSubmited(false)
      setFormData({
        customer: {
          Contact_Name: invoice[0].Contact_Name,
          City: invoice[0].City,
          Address: invoice[0].Address,
          State: invoice[0].State,
          ZipCode: invoice[0].ZipCode,
          Company: invoice[0].Company,
          Company_Position: invoice[0].Company_Position,
          Phone: invoice[0].Phone,
          Email: invoice[0].Email,
          DiscountID: invoice[0].DiscountID,
          DiscountRate: invoice[0].DiscountRate,
          Billing_Address:invoice[0].Billing_Address,
          Billing_City:invoice[0].Billing_City,
          Billing_ZipCode:invoice[0].Billing_ZipCode,
          Billing_State:invoice[0].Billing_State,
          CustomerID: invoice[0].CustomerID
        },
        project: {
          ProjectName: invoice[0].ProjectName,
          idProjects:invoice[0].idProjects,
          Shipping_State: invoice[0].Shipping_State,
          Shipping_ZipCode: invoice[0].Shipping_ZipCode,
          Shipping_City: invoice[0].Shipping_City,
          Shipping_Address: invoice[0].Shipping_Address
        },
        products: formatProducts(invoice_products),
        variables:{
          shipVia: invoice[0].ShippingMethod,
          method: invoice[0].P_O_No,
          paymentTerms:invoice[0].PaymentTerms,
          estDelivDate:invoice[0].EstDelivery_Date !== null ? invoice[0].EstDelivery_Date?.split('T')[0] : null,
          transferFee: invoice[0].Transfer_Fee,
          shippingFee: invoice[0].Shipping_Fee ?? '',
          cratingFee: invoice[0].Crating_Fee,
        },
        quote: {
          notes: invoice[0].Sale_Notes
        }
      });
    }

    const handleNextButton = () =>{
      setErrorsCustomer({})
      if(progress === 40){
        if(invoice[0].CustomerID !== formData.customer.CustomerID){
          setFormData({
            ...formData,
            project: {
              ProjectName: '',
              idProjects: '',
              Shipping_State: '',
              Shipping_ZipCode: '',
              Shipping_City: '',
              Shipping_Address: ''
            },
          });
        };
        let newErrors = validateEmptyInputsCreateQuote(formData.customer)
        setErrorsCustomer(newErrors)
        if(Object.entries(newErrors)?.length){
          if(!toast.isActive(toastId)){
            return toast(({
              id: toastId,
              title: "Error",
              description: 'All fields must be completed',
              status: "error",
              duration: 5000,
              isClosable: true,
              }))
          }} else {
            dispatch(cleanProjectsCustomer(customerID))
            dispatch(updateCustomer(customerID, formData.customer))
            dispatch(getCustomerProjects(customerID))
            setProgress(progress + 20)
            if (
              Object.values(formData.variables)?.every((value) => value?.length !== 0) &&
              formData?.project.ProjectName?.length !== 0
            ) {
              setDisable(false);
            } else {
              setDisable(true);
            }
          }
      }
       else {
        setProgress(progress + 20) 
    }}
    
    const handlePreviousButton = () => {
      if(progress === 40){
        setErrorsCustomer({})
        dispatch(getCustomers('', ''))
        handleCleanFormData()
        setProgress(progress - 20)
      }
      if(progress === 60){
        setDisable(false)
        setProgress(progress - 20)
      }
      if(component === 'Project' && progress === 100){
        setProgress(0)
      }else{
        setProgress(progress - 20)
      }
    }

    useEffect(() => {
      setCustomersFilter(customers)
    },[customers])

    return (
      <>
        <ButtonGroup
          onClick={onOpenUpdate}
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
           icon={<FiEdit/>}/>
           <Button
            fontSize={'1vw'}
            variant={'unstyled'}           
            fontWeight={'normal'}
            >Edit
           </Button>       
        </ButtonGroup>
        <Modal 
          isOpen={isOpenUpdate} 
          onClose={handleClose}
          size={progress === 0 ? 'lg' : '6xl'}
          motionPreset='slideInRight'
          >
          <ModalOverlay />
          <ModalContent 
            bg={'web.sideBar'}
            border={'1px solid'}
            borderColor={'web.border'}
            >
            <Progress value={progress}
              visibility={progress === 0 ? 'hidden' : 'unset'} 
              colorScheme={"orange"} 
              mb={'2vh'} 
              background={'web.border'} 
              size={'sm'} 
              borderTopRightRadius={'md'}
              borderTopLeftRadius={'md'}
              />
            <ModalCloseButton color={'web.text2'} mt={'2vh'} mr={'0.5vw'} position={'absolute'}/>
            <ModalBody color={'web.text2'} display={'flex'} justifyContent={'center'} flexDir={'column'} minH={'64vh'} maxH={ '64vh'}>
            {
            progress == 0 &&(
              <UpdateQuoteSelection setProgress={setProgress} setComponent={setComponent} setUpdate={setUpdate}/>
              ) 
            }
            {
              component === 'Customer' && progress === 20 &&(
                <CreateQuoteCustomer customers={customers} setFormData={setFormData} formData={formData} setDisable={setDisable} update={update} invoice={invoice} customersFilter={customersFilter} setCustomersFilter={setCustomersFilter}/>
              )
            }
            {
              component === 'Customer' && progress === 40 &&(
                <CreateQuoteCustomerReview  formData={formData} setFormData={setFormData} errorsCustomer={errorsCustomer} setErrorsCustomer={setErrorsCustomer}/>)
            }
            {
              component === 'Customer' && progress === 60 &&(
                <CreateQuoteCustomerProjets formData={formData} setFormData={setFormData} setDisable={setDisable} update={update} invoice={invoice}/>
              )
            }
            {
              component === 'Project' && progress === 20 &&(
                <CreateQuoteCustomerProjets formData={formData} setFormData={setFormData} setDisable={setDisable} update={update}  invoice={invoice}/>
              )
            }
            {
              component === 'Products' && progress === 20 &&(
                <CreateQuoteProducts formData={formData} setFormData={setFormData} setDisable={setDisable} invoice_products={invoice_products} values={values}/>
                )
              }
              {
                component === 'Products' && progress === 40 &&(
                  <UpdateQuoteProductsReview formData={formData} setFormData={setFormData}/>
                )
              }
            </ModalBody> 
            {
              <ModalFooter mb={'2vh'} mt={'2vh'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} ml={'1vw'} mr={'0.5vw'}>
                <Button visibility={progress === 0 ? 'hidden' : 'unset'} colorScheme='orange' mr={3} onClick={()=>handlePreviousButton()}>
                Prev
                </Button>
                {
                (component === 'Customer' && progress === 60) || (component === 'Project' && progress === 20) || (component === 'Products' && progress === 40)
                ? (
                    <Button colorScheme='orange' mr={3} onClick={(e)=>handleSubmit(e)} disabled={disable}>
                      Submit
                    </Button>
                ):(
                  <Button visibility={progress === 0 ? 'hidden' : 'unset'} colorScheme='orange' disabled={disable} mr={3} onClick={()=>handleNextButton()}>
                    Next
                  </Button>
                )
                }
              </ModalFooter>
            }
          </ModalContent>
        </Modal>
  </>
  )
}      


