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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiSquaresPlus } from "react-icons/hi2";
import {
  validateEmptyInputsCreateQuote,
} from "../../../utils/validateForm";
import { getCustomers, updateCustomer } from "../../../redux/actions-customers";
import { getCustomerProjects } from "../../../redux/actions-projects";
import {
  getAllProductsNewSamples,
} from "../../../redux/actions-products";
import CreateSampleCustomer from "./CreateSampleCustomer";
import CreateSampleCustomerReview from "./CreateSampleCustomerReview";
import CreateSampleProjects from "./CreateSampleProjects";
import CreateSampleProducts from "./CreateSampleProducts";
import CreateSampleProductsReview from "./CreateSampleProductsReview";
import { getSamples, postSamples } from "../../../redux/actions-samples";
import CreateSampleModalAskEmail from "./CreateSampleModalAskEmail";

export function CreateSampleModal({ customers }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const user = useSelector((state) => state.user);
  const [errorsCustomer, setErrorsCustomer] = useState({});
  const [errorsTrackingNumber, setErrorsTrackingNumber] = useState({});
  const [disable, setDisable] = useState(true);
  const [progress, setProgress] = useState(20);
  const [submited, setSubmited] = useState(false);
  const samples = useSelector((state) => state.samples);
  const [formData, setFormData] = useState({
    customer: {
      Contact_Name: "",
      Company: "",
      Company_Position: "",
      Phone: "",
      Email: "",
      DiscountID: "",
      DiscountRate: "",
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
      trackingNumber: "",
      estDelivDate: "",
    },
    quote: {
      quoteID: "",
    },
  });
  const dispatch = useDispatch();
  const toast = useToast();
  const toastId = "error-toast";
  const customerID = formData.customer.CustomerID;

  useEffect(() => {
    if (!samples.length) getSamples("");
  }, []);
  console.log({formData})
  const handleSubmit = () => {
    if (progress === 100) {
      dispatch(postSamples(formData));
      toast({
        title: "Update Successful",
        description: "The update was successful",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
      dispatch(getSamples(""));
    }
    setSubmited(false);
    setProgress(20);
    onOpen2()
  };

  const handleClose = () => {
    onClose();
    handleCleanFormData();
    setDisable(true);
    setProgress(20);
    setSubmited(false);
  };

  const handleCleanFormData = () => {
    setFormData({
      //Reincia valores de formData, limpiando todo al cerrar el componente.
      customer: {
        Contact_Name: "",
        Company: "",
        Company_Position: "",
        Phone: "",
        Email: "",
        DiscountID: "",
        DiscountRate: "",
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
        trackingNumber: "",
        estDelivDate: "",
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

      if (!formData.variables.trackingNumber.length) {
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
      }else{
        dispatch(getAllProductsNewSamples("", "", ""));
        setProgress(progress + 20);
      }
    } else {
      setProgress(progress + 20);
      dispatch(getAllProductsNewSamples("", "", ""));
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
          label={"Create new sample"}
          fontWeight={"hairline"}
        >
          <IconButton
            icon={<HiSquaresPlus />}
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
        size={progress == 40 ? "3xl" : "4xl"}
        motionPreset="slideInRight"
      >
        <ModalOverlay />
        <ModalContent
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
            minH={!submited ? "55vh" : "80vh"}
            maxH={!submited ? "64vh" : "80vh"}
          >
            {progress == 20 && (
              <CreateSampleCustomer
                customers={customers}
                setFormData={setFormData}
                formData={formData}
                setDisable={setDisable}
              />
            )}
            {progress == 40 && (
              <CreateSampleCustomerReview
                formData={formData}
                setFormData={setFormData}
                errorsCustomer={errorsCustomer}
                setErrorsCustomer={setErrorsCustomer}
              />
            )}
            {progress == 60 && (
              <CreateSampleProjects
                formData={formData}
                setFormData={setFormData}
                setDisable={setDisable}
                errorsTrackingNumber={errorsTrackingNumber}
                setErrorsTrackingNumber={setErrorsTrackingNumber}
              />
            )}
            {progress == 80 && (
              <CreateSampleProducts
                formData={formData}
                setFormData={setFormData}
                setDisable={setDisable}
              />
            )}
            {!submited &&
              progress == 100 &&
              (Object.entries(formData.products).length ? (
                <CreateSampleProductsReview
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
      <CreateSampleModalAskEmail isOpen2={isOpen2} onOpen2={onOpen2} onClose2={onClose2} formData={formData} handleCleanFormData={handleCleanFormData}
      />
    </>
  );
}

export default CreateSampleModal;
