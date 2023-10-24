import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactQuill from 'react-quill';
import '../../../assets/styleSheet.css'
import 'react-quill/dist/quill.snow.css';
import { Box } from '@chakra-ui/react';
import { modules, formats, QuillToolbar } from "./EmailTollbarButtons";

const EmailTemplate = ({ formData, setInput, input, handleSendEmail, showSuccessToast}) => {
  
  const valuesProducts = Object.values(formData?.products)

  const samplesProducts = valuesProducts?.map((el) =>{
    return {
      description: el.prodName,
      finish: el.finish
    }
  })

  const initialContent = ReactDOMServer.renderToString(
    <div>
      <h4><strong>Dear {formData.customer.Contact_Name.split(' ')[0]},</strong></h4>
      <p>
      <br />
        I hope this email finds you well. We are writing to provide you with the information about the samples that you requested. Below, you will find the details of your order, including the tracking number, estimated delivery date, and sample products.
      </p>
      <p>
      <br />
        <strong>Tracking number:</strong> {formData.variables.trackingNumber}
      </p>
      <p>
        <strong>Estimated delivery:</strong> {formData.variables.estDelivDate}
      </p>
      <p>
        <br />
        <strong>Sample products:</strong>
      </p>
      <p>
      <br />
      <ul>
        {samplesProducts.map((sample) => (
          <li key={sample.description}>
            {sample.description} {sample.finish}
          </li>
        ))}
      </ul>
      </p>
      <p>
        <br />
        If you have any questions about this samples, simply reply to this email or reach out to our support team for help.
        <br />
      </p>
    </div>
  );
  

const [editorContent, setEditorContent] = useState(initialContent);

    const handleBodyChange = (value) => {
      setEditorContent(value);
      setInput({
        ...input, htmlBody: value
      });
    };

    const handleAttachment = (file) => {

      if (file) {
        setInput({
          ...input,
          attachments: [...input.attachments, file],
        });
        showSuccessToast(`${file.name} added successfully`)
      }
    };
  return (
        <Box w={'100%'} p={'10px'}>
          <QuillToolbar handleSendEmail={handleSendEmail} formData={formData} handleAttachment={handleAttachment}/>
          <ReactQuill modules={modules} formats={formats} bounds={'.app'} theme="snow" onChange={handleBodyChange} value={editorContent} placeholder="Write your email here..."/>
        </Box>
  );
};

export default EmailTemplate;
