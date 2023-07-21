import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import CreatedQuotePdf from "../createQuote2/createQuotePdf";
import { cleanCreatedQuote } from "../../../redux/actions-invoices";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SendEmailModal from "./createSendEmailQuote";

export default function QuotePdfModal({ formData, user, authFlag }) {
  const [sendEmail, setSendEmail] = useState(false);
  const [pdf, setPdf] = useState(null);

  const handleChangeEmail = () => {
    setSendEmail(!sendEmail);
  };

  return (
    <>
      {sendEmail === false ? (
        <CreatedQuotePdf
          user={user}
          handleChangeEmail={handleChangeEmail}
          authFlag={authFlag}
          formData={formData}
        />
      ) : (
        <SendEmailModal
          handleChangeEmail={handleChangeEmail}
          customer={formData.customer}
          pdf={pdf}
        />
      )}
    </>
  );
}
