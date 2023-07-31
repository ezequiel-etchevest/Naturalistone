import {
  Text,
  Box,
  HStack,
  Input,
  Tooltip,
  Divider,
  Select,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { CreateNewProject } from "../../customers/customerDetail/createProject";
import "../../../assets/styleSheet.css";
import CreateSampleProjectList from "./CreateSampleProjectList";
import { validateInputTracking } from "../../../utils/validateForm";

const CreateSampleProjects = ({
    formData,
    setFormData,
    setDisable,
    errorsTrackingNumber,
    setErrorsTrackingNumber,
    }) => {
  const projects = useSelector((state) => state.projects_by_customer_id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrorsTrackingNumber({})
    const errors = validateInputTracking(value)
    if(!Object.entries(errors).length){
      setFormData({
        ...formData,
        variables: {
          [name]: value,
        },
      });
    }else{
      setErrorsTrackingNumber(errors)
    }
  };

  console.log("formdata", formData)
  return (
    <>
      <Box
        color={"web.text2"}
        display={"flex"}
        justifyContent={"center"}
        flexDir={"column"}
        h={"58vh"}
      >
        <Box mt={"10px"} bg={"red"} display={"flex"} flexDirection={"row"}>
          <Box bg={"blue"} w={"50%"}>
          <Text
            ml={"2vw"}
            mt={"2vh"}
            mb={"2vh"}
            fontSize={"lg"}
            w={"16vw"}
            color={"white"}
            alignSelf={"flex-start"}
          >
            Tracking
          </Text>
          <Text fontSize="sm" fontWeight={"semisemibold"} ml={"4.5vw"}>
            {" "}
            Tracking Number{" "}
          </Text>
          <Input
            mb={"0.5vh"}
            w={"15vw"}
            minH={"4.5vh"}
            variant="unstyled"
            textColor={"web.text2"}
            _placeholder={{ fontFamily: "body", fontWeight: "inherit" }}
            size={"sm"}
            borderBottomWidth={"2px"}
            borderBottomColor={"web.text2"}
            type={"text"}
            name={"trackingNumber"}
            ml={"4.5vw"}
            value={formData.variables.trackingNumber || ""}
            onChange={(e) => handleChange(e)}
          />
          {errorsTrackingNumber.trackingNumber && (
            <Text
              mt={"0.5vh"}
              position={"absolute"}
              color={"web.error"}
              fontSize={"xs"}
              ml={"5vw"}
            >
              {errorsTrackingNumber.trackingNumber}
            </Text>
          )}
          </Box>
          <Box bg={"green"} w={"50%"}>
          <Text
            ml={"2vw"}
            mt={"2vh"}
            mb={"2vh"}
            fontSize={"lg"}
            w={"16vw"}
            color={"white"}
            alignSelf={"flex-start"}
          >
            Estimated Delivery
          </Text>
          <Text fontSize="sm" fontWeight={"semisemibold"} ml={"4.5vw"}>
            {" "}
            Date{" "}
          </Text>
          <Tooltip  label="Estimated delivery date" fontWeight={'hairline'} placement='top-start'>
            <Input
              ml={"4.5vw"}
              mb={'0.5vh'}
              w={'10vw'}
              minH={'4.5vh'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              value={formData.variables.estDelivDate || ""}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"date"}
              pattern={"\d{4}-\d{2}-\d{2}"}
              name={"estDelivDate"}
              cursor= {'pointer'}
              onChange={(e)=>handleChange(e)}
              css={{
                '::-webkit-calendar-picker-indicator': {   
                    background: `url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png) center/90% no-repeat`,    
                    cursor: 'pointer',
                    filter: 'invert(59%) sepia(7%) saturate(31%) hue-rotate(184deg) brightness(97%) contrast(92%)',
                    marginRight: 7,
                    position: 'absolute',
                    right: 0,
                    top: 5,
                  },  
              }}
            />
          </Tooltip>
          </Box>
        </Box>
        <Box display={"flex"} alignItems={"end"} h={"10vh"}>
          <Box h={"9vh"}>
            <Text
              ml={"2vw"}
              mt={"5vh"}
              mb={"5vh"}
              fontSize={"lg"}
              w={"16vw"}
              color={"white"}
              alignSelf={"flex-start"}
            >
              Select Project
            </Text>
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"} w={"35vw"}>
            <CreateNewProject customer={formData.customer} />
          </Box>
        </Box>
        <CreateSampleProjectList
          projects={projects}
          formData={formData}
          setFormData={setFormData}
          setDisable={setDisable}
        />
      </Box>
    </>
  );
};

export default CreateSampleProjects;
