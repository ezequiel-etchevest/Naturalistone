import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";

const steps = [{ label: "Select Customer" }, { label: "Step 2" }, { label: "Step 3" }, { label: "Step 4" }, { label: "Step 5" }];
   // variant: "circles" | "circles-alt" | "simple" | undefined;
const variant = 'simple'

export const Basic = ({nextStep, prevStep, reset, activeStep}) => {

  const isLastStep = activeStep === steps.length - 1;
  const hasCompletedAllSteps = activeStep === steps.length;
  const bg = useColorModeValue("gray.200", "gray.700");

  return (
    <Flex flexDir="column" width="45vw">
      <Steps variant={variant} colorScheme="orange" activeStep={activeStep}>
        {
        steps.map(({ label }, index) => (
          <Step key={label}></Step>
        ))
        }
      </Steps>
      {/* {
      hasCompletedAllSteps && (
        <Box sx={{ bg, my: 8, p: 8, rounded: "md" }}>
          <Heading fontSize="xl" textAlign={"center"}>
            Woohoo! All steps completed! 🎉
          </Heading>
        </Box>
      )
      } */}
      {/* <Flex width="100%" justify="flex-end" gap={4}>
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={reset}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              isDisabled={activeStep === 0}
              onClick={prevStep}
              size="sm"
              variant="ghost"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? "Finish" : "Next"}
            </Button>
          </>
        )}
      </Flex> */}
    </Flex>
  );
};