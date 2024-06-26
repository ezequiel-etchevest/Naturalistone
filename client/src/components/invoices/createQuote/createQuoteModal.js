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
  Text,
  useToast,
  Tooltip,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { day0, month0, year } from "../../../utils/todayDate";
import { AiOutlineFileAdd } from "react-icons/ai";
import CreateQuoteCustomer from "./createQuoteCustomer";
import CreateQuoteCustomerReview from "./createQuoteCustomerReview";
import { validateEmptyInputsCreateQuote } from "../../../utils/validateForm";
import { createAddressCustomer, getCustomers, updateCustomer } from "../../../redux/actions-customers";
import { getCustomerProjects } from "../../../redux/actions-projects";
import CreateQuoteCustomerProjets from "./createQuoteProject";
import CreateQuoteProducts from "./createQuoteProducts";
import { getAllProductsNewQuote } from "../../../redux/actions-products";
import CreateQuoteProductsReview from "./createQuoteProductsReview";
import { cleanCreatedQuote, createQuote, getInvoicesBySeller } from "../../../redux/actions-invoices";
import QuotePdfModal from "./quotePdfModal";
import { updateAddress } from "../../../redux/actions-address";

export function CreateQuote({ customers, sellers, customersFilter, setCustomersFilter}) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.user);
  const values = useSelector(state => state.products_new_quote_values)
  
  const [errorsCustomer, setErrorsCustomer] = useState({});
  const [disable, setDisable] = useState(true);
  const [progress, setProgress] = useState(20);
  const [submited, setSubmited] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [formData, setFormData] = useState({
    customer: {
      Contact_Name: "",
      City: "",
      Address: "",
      State: "",
      ZipCode: "",
      Company: "",
      Company_Position: "",
      Phone: "",
      Email: "",
      DiscountID: "",
      DiscountRate: "",
      Billing_Address: "",
      Billing_Address2: "",
      Billing_City: "",
      Billing_ZipCode: "",
      Billing_State: "",
      CustomerID: "",
      Seller: "",
      billing_address_id: "",
      shipping_address_id: ""
    },
    project: {
      ProjectName: "",
      idProjects: "",
      Shipping_State: "",
      Shipping_ZipCode: "",
      Shipping_City: "",
      Shipping_Address: "",
      shipping_address_id: ""
    },
    products: {},
    specialProducts:[],
    variables: {
      shipVia: "",
      method: "",
      paymentTerms: "",
      estDelivDate: `${year}-${month0}-${day0}`,
      shippingPrice: "",
      transferFee: "",
      cratingFee: ""
    },
    quote: {
      quoteID: "",
      notes:'',
      taxVal: 0
    },
  });

  const dispatch = useDispatch();
  const toast = useToast();
  const toastId = "error-toast";
  const customerID = formData.customer.CustomerID;
  const [change, setChange] = useState(false);
  const [allMaterials, setAllMaterials] = useState(values?.materials)
  const [allValues, setAllValues] = useState(values?.finishValues)
  
  useEffect(() => {
    if(!values.length){
      dispatch(getAllProductsNewQuote('', '', ''))
    }}, []);

    useEffect(() => {
      if(progress === 40){
        const data = formData.customer
        if(data.Billing_Address.length !== 0 &&
          data.Billing_City.length !== 0 &&
          data.Billing_State.length !== 0 &&
          data.Billing_ZipCode.length !== 0 &&
          ((data.Company_Position === "Home Owner" && data.Company.length === 0) || (data.Company_Position === "Home Owner" && data.Company.length !== 0) || (data.Company_Position !== "Home Owner" && data.Company.length !== 0)) &&
          data.Company_Position.length !== 0 &&
          data.Contact_Name.length !== 0 &&
          data.DiscountRate.length !== 0 &&
          data.Email.length !== 0 &&
          data.Phone.length !== 0 &&
          data.Seller.length !== 0 &&
          Object.entries(errorsCustomer).length === 0
          ) {
          setDisable(false);
        } else {
          setDisable(true)
        }
    }}, [formData.customer, progress, errorsCustomer]);
    
  const validateAuthFlag = (objetos) => {
    for (const id in objetos) {
      if (objetos.hasOwnProperty(id)) {
        if (objetos[id].authFlag) {
          return true;
        }
      }
    }
    return false;
  };
  
  // const sp1PostBack = () => {
  //   if(formData.specialProducts.length && Object.entries(posted_quote).length){
  //     let invoiceID = posted_quote.Naturali_Invoice;
  //      dispatch(addSpecialProducts(invoiceID,  formData.specialProducts))
  //   }
  // }

  let authFlag = validateAuthFlag(formData.products)
  ;
  const handleSubmit = async () => {
    if (progress === 100) {
      await dispatch(createQuote(user[0].SellerID, { formData, authFlag }));
      dispatch(getInvoicesBySeller(user[0].SellerID, {inputName: '', inputNumber: '', selectSeller: '', timeFilter: ''}))
    }
    setSubmited(true);
  };

  const handleClose = () => {
    onClose();
    handleCleanFormData();
    dispatch(getCustomers("", ""));
    setDisable(true);
    setProgress(20);
    setSubmited(false);
    dispatch(cleanCreatedQuote())
  };

  const handleCleanFormData = () => {
    setFormData({
      //Reincia valores de formData, limpiando todo al cerrar el componente.
      customer: {
        Contact_Name: "",
        City: "",
        Address: "",
        State: "",
        ZipCode: "",
        Company: "",
        Company_Position: "",
        Phone: "",
        Email: "",
        DiscountID: "",
        DiscountRate: "",
        Billing_Address: "",
        Billing_Address2: "",
        Billing_City: "",
        Billing_ZipCode: "",
        Billing_State: "",
        CustomerID: "",
        billing_address_id: "",
        shipping_address_id: ""
      },
      project: {
        ProjectName: "",
        Shipping_State: "",
        Shipping_ZipCode: "",
        Shipping_City: "",
        Shipping_Address: "",
      },
      products: {},
      specialProducts:[],
      variables: {
        shipVia: "",
        method: "",
        paymentTerms: "",
        estDelivDate: `${year}-${month0}-${day0}`,
        shippingPrice: "",
        transferFee: "",
        cratingFee: ""
      },
      quote: {
        quoteID: "",
        notes: "",
        taxVal: 0
      },
    });
  };

  const handleNextButton = async () => {
    setChange(!change);
    if(progress === 20){
      const areCustomerFieldCompleted = Object.values(formData.customer).every((value) => value.length !== 0)
      
      setDisable(!areCustomerFieldCompleted);
    }
    if (progress === 40) {
      let newErrors = validateEmptyInputsCreateQuote(formData.customer);
      setErrorsCustomer(newErrors);
      if (Object.entries(newErrors).length > 0) {
        if (!toast.isActive(toastId)) {
          toast({
            id: toastId,
            title: "Error",
            description: "All fields must be completed",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
        return; // No avanza si hay errores
      } else {
        if(updated){
          await dispatch(updateCustomer(customerID, formData.customer));
          if(formData.customer.billing_address_id) {
            await dispatch(updateAddress(formData.customer.billing_address_id, 
              {
                address: formData.customer.Billing_Address, city: formData.customer.Billing_City, state: formData.customer.Billing_State, zip_code: formData.customer.Billing_ZipCode, address2: formData.customer.Billing_Address2
              }
          ))
          } else {
            await dispatch(createAddressCustomer(formData.customer.CustomerID, 
          {
            Address: formData.customer.Billing_Address, City: formData.customer.Billing_City, State: formData.customer.Billing_State, ZipCode: formData.customer.Billing_ZipCode, AddressInShipping: false, Address2: formData.customer.Billing_Address2
          }
            ))
          }
          }
        dispatch(getCustomerProjects(customerID));
        setProgress(progress + 20);
    }}
  
    if (progress === 60) {
      dispatch(getAllProductsNewQuote("", "", ""));
      setAllMaterials(values?.materials)
      setAllValues(values?.finishValues)
      setProgress(progress + 20);
    } else {
      setProgress(progress + 20);
    }
  };

  useEffect(() => {
    if (progress === 80) {
      setDisable(false);
      dispatch(getAllProductsNewQuote("", "", ""));
      setAllMaterials(values?.materials)
      setAllValues(values?.finishValues)
    }
},[])

  const handlePreviousButton = () => {
    setChange(!change);
    if (progress === 40) {
      setErrorsCustomer({});
      dispatch(getCustomers("", ""));
      handleCleanFormData();
      setDisable(true);
    }
    if (progress === 60) {
      setDisable(false);
    }
    setProgress(progress - 20);
  };
 
  return (
    <>
      <ButtonGroup onClick={onOpen} display={"flex"} spacing={0}>
        <Tooltip
          placement={"bottom-start"}
          label={"Create new quote"}
          fontWeight={"hairline"}
        >
          <IconButton
            icon={<AiOutlineFileAdd />}
            variant={"unstyled"}
            display={"flex"}
            borderRadius={"sm"}
            placeContent={"center"}
            alignItems={"center"}
            fontSize={"xl"}
            color={"web.text2"}
            _hover={{
              color: "logo.orange",
            }}
            _active={{}}
          />
        </Tooltip>
      </ButtonGroup>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size={!submited ? "5xl" : 'full'}
        motionPreset="slideInRight"
      >
        <ModalOverlay />
        <ModalContent
          minW={"50vw"}
          maxW={!submited ? '70vw' : '60vw'}
          bg={"web.sideBar"}
          border={"1px solid"}
          borderColor={"web.border"}
        >
          <Progress
            value={progress}
            colorScheme={"orange"}
            mb={!submited ? "2vh" : '0'}
            background={"web.border"}
            size={"sm"}
            borderTopRightRadius={"md"}
            borderTopLeftRadius={"md"}
            hidden={!submited ? false : true}
          />
          <ModalCloseButton
            color={"web.text2"}
            mt={"2vh"}
            mr={"0.5vw"}
            position={"absolute"}
          />
          <ModalBody
            color={"web.text2"}
            display={"flex"}
            justifyContent={"center"}
            flexDir={"column"}
            minH={!submited ? "64vh" : "100%"}
            maxH={!submited ? "64vh" : "100%"}
          >
            {progress === 20 && (
              <CreateQuoteCustomer
                customers={customers}
                setFormData={setFormData}
                formData={formData}
                setDisable={setDisable}
                user={user}
                customersFilter={customersFilter}
                setCustomersFilter={setCustomersFilter}
              />
            )}
            {progress === 40 && (
              <CreateQuoteCustomerReview
                formData={formData}
                setFormData={setFormData}
                errorsCustomer={errorsCustomer}
                setErrorsCustomer={setErrorsCustomer}
                setUpdated={setUpdated}
                sellers={sellers}
                user={user}
              />
            )}
            {progress === 60 && (
              <CreateQuoteCustomerProjets
                formData={formData}
                setFormData={setFormData}
                setDisable={setDisable}
              />
            )}
            {progress === 80 && (
              <CreateQuoteProducts
                formData={formData}
                setFormData={setFormData}
                setDisable={setDisable}
                values={values}
                change={change}
                allMaterials={allMaterials}
                allValues={allValues}
              />
            )}
            {!submited &&
              progress === 100 &&
              (Object.entries(formData.products).length || Object.entries(formData.specialProducts).length  ? (
                <CreateQuoteProductsReview
                  formData={formData}
                  setFormData={setFormData}
                />
              ) : (
                <Text
                  display={"flex"}
                  justifyContent={"center"}
                  alignContent={"center"}
                >
                  No products selected
                </Text>
              ))}
            {submited && progress === 100 && (
              <QuotePdfModal
                formData={formData}
                setFormData={setFormData}
                authFlag={authFlag}
                user={user}
                isOpen={isOpen}
              />
            )}
          </ModalBody>
          {!submited && (
            <ModalFooter
              mb={"2vh"}
              mt={"2vh"}
              display={"flex"}
              flexDir={"row"}
              justifyContent={"space-between"}
              ml={"1vw"}
              mr={"0.5vw"}
            >
              <Button
                visibility={progress === 20 ? "hidden" : "unset"}
                colorScheme="orange"
                mr={3}
                onClick={() => handlePreviousButton()}
              >
                Prev
              </Button>
              {progress === 100 ? (
                <Button
                  colorScheme="orange"
                  mr={3}
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  colorScheme="orange"
                  disabled={disable}
                  mr={3}
                  onClick={() => handleNextButton()}
                >
                  Next
                </Button>
              )}
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateQuote;
