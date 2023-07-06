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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { day0, month0, year } from "../../../utils/todayDate";
import { AiOutlineFileAdd } from "react-icons/ai";
import CreateQuoteCustomer from "./createQuoteCustomer";
import CreateQuoteCustomerReview from "./createQuoteCustomerReview";
import { validateEmptyInputsCreateQuote } from "../../../utils/validateForm";
import { getCustomers, updateCustomer } from "../../../redux/actions-customers";
import { getCustomerProjects } from "../../../redux/actions-projects";
import CreateQuoteCustomerProjets from "./createQuoteProject";
import CreateQuoteProducts from "./createQuoteProducts";
import { getAllProductsNewQuote } from "../../../redux/actions-products";
import CreateQuoteProductsReview from "./createQuoteProductsReview";
import { createQuote } from "../../../redux/actions-invoices";
import CreatedQuotePdf from "./createQuotePdf";
import QuotePdfModal from "../createQuote/quotePdfModal";

export function CreateQuote({ customers }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.user);
  const [errorsCustomer, setErrorsCustomer] = useState({});
  const [disable, setDisable] = useState(true);
  const [progress, setProgress] = useState(20);
  const [submited, setSubmited] = useState(false);
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
      Billing_City: "",
      Billing_ZipCode: "",
      Billing_State: "",
      CustomerID: "",
    },
    project: {
      ProjectName: "",
      idProjects: "",
      Shipping_State: "",
      Shipping_ZipCode: "",
      Shipping_City: "",
      Shipping_Address: "",
    },
    products: {},
    variables: {
      shipVia: "",
      method: "",
      paymentTerms: "",
      estDelivDate: `${year}-${month0}-${day0}`,
    },
    quote: {
      quoteID: "",
    },
  });
  const dispatch = useDispatch();
  const toast = useToast();
  const toastId = "error-toast";
  const customerID = formData.customer.CustomerID;

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
  let authFlag = validateAuthFlag(formData.products);

  const handleSubmit = () => {
    if (progress === 100) {
      dispatch(createQuote(user[0].SellerID, { formData, authFlag }));
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
        Billing_City: "",
        Billing_ZipCode: "",
        Billing_State: "",
        CustomerID: "",
      },
      project: {
        ProjectName: "",
        Shipping_State: "",
        Shipping_ZipCode: "",
        Shipping_City: "",
        Shipping_Address: "",
      },
      products: {},
      variables: {
        shipVia: "",
        method: "",
        paymentTerms: "",
        estDelivDate: `${year}-${month0}-${day0}`,
      },
      quote: {
        quoteID: "",
      },
    });
  };

  const handleNextButton = () => {
    setErrorsCustomer({});
    if (progress === 40) {
      let newErrors = validateEmptyInputsCreateQuote(formData.customer);
      setErrorsCustomer(newErrors);
      if (Object.entries(newErrors).length) {
        if (!toast.isActive(toastId)) {
          return toast({
            id: toastId,
            title: "Error",
            description: "All fields must be completed",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        dispatch(updateCustomer(customerID, formData.customer));
        dispatch(getCustomerProjects(customerID));
        setProgress(progress + 20);
        if (
          Object.values(formData.variables).every(
            (value) => value.length !== 0
          ) &&
          formData.project.ProjectName.length !== 0
        ) {
          setDisable(false);
        } else {
          setDisable(true);
        }
      }
    }
    if (progress === 60) {
      dispatch(getAllProductsNewQuote("", "", ""));
      setProgress(progress + 20);
    } else {
      setProgress(progress + 20);
    }
  };

  const handlePreviousButton = () => {
    if (progress == 40) {
      setErrorsCustomer({});
      dispatch(getCustomers("", ""));
      handleCleanFormData();
      setDisable(true);
    }
    if (progress == 60) {
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
        size={"4xl"}
        motionPreset="slideInRight"
      >
        <ModalOverlay />
        <ModalContent
          minW={"50vw"}
          bg={"web.sideBar"}
          border={"1px solid"}
          borderColor={"web.border"}
        >
          <Progress
            value={progress}
            colorScheme={"orange"}
            mb={"2vh"}
            background={"web.border"}
            size={"sm"}
            borderTopRightRadius={"md"}
            borderTopLeftRadius={"md"}
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
            minH={!submited ? "64vh" : "80vh"}
            maxH={!submited ? "64vh" : "80vh"}
          >
            {progress == 20 && (
              <CreateQuoteCustomer
                customers={customers}
                setFormData={setFormData}
                formData={formData}
                setDisable={setDisable}
              />
            )}
            {progress == 40 && (
              <CreateQuoteCustomerReview
                formData={formData}
                setFormData={setFormData}
                errorsCustomer={errorsCustomer}
                setErrorsCustomer={setErrorsCustomer}
              />
            )}
            {progress == 60 && (
              <CreateQuoteCustomerProjets
                formData={formData}
                setFormData={setFormData}
                setDisable={setDisable}
              />
            )}
            {progress == 80 && (
              <CreateQuoteProducts
                formData={formData}
                setFormData={setFormData}
                setDisable={setDisable}
              />
            )}
            {!submited &&
              progress == 100 &&
              (Object.entries(formData.products).length ? (
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
            {submited && progress == 100 && (
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
