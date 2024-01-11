
import CreatedQuotePdf from "./createQuotePdf";
import { useState } from "react";
import SendEmailModal from "./createSendEmailQuote";
import { Box, useDisclosure } from "@chakra-ui/react";

export default function QuotePdfModal({ formData, user, authFlag, setFormData }) {

  const [sendEmail, setSendEmail] = useState(false);
  const [pdf, setPdf] = useState(null);

  const { onOpen, isOpen } = useDisclosure()

  const handleChangeEmail = () => {
    setSendEmail(!sendEmail);
    onOpen()
  };

  return (
    <>
      <Box>  
        <CreatedQuotePdf
          user={user}
          handleChangeEmail={handleChangeEmail}
          authFlag={authFlag}
          formData={formData}
          setFormData={setFormData}
          setPdf={setPdf}
        />
      {sendEmail === false ? (
        <SendEmailModal
          isOpen={isOpen}
          handleChangeEmail={handleChangeEmail}
          customer={formData.customer}
          pdf={pdf}
        />) : null
      }
      </Box>
    </>
  );
}
