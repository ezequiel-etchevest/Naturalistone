
import CreatedQuotePdf from "./createQuotePdf";
import { useState } from "react";
import SendEmailModal from "./createSendEmailQuote";

export default function QuotePdfModal({ formData, user, authFlag, setFormData }) {

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
          setFormData={setFormData}
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
