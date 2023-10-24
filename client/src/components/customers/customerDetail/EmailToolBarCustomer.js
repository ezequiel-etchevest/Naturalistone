import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import '../../../assets/styleSheet.css'
import 'react-quill/dist/quill.snow.css';
import { Box } from '@chakra-ui/react';
import { modules, formats, QuillToolbar } from "../../samples/createSample/EmailTollbarButtons";

const EmailTemplateCustomer = ({setInput, input, handleSendEmail, showSuccessToast, showErrorToast}) => {
  
const [editorContent, setEditorContent] = useState("");
  function stripHtml(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  const handleBodyChange = (value) => {
    const plainText = stripHtml(value); 
    setEditorContent(value);
    setInput({
      ...input,
      htmlBody: value,
      plainTextBody: plainText,
      
    });
  };

    const handleAttachment = (file) => {
   
      if (file.size > 0) {
        setInput({
          ...input,
          attachments: [...input.attachments, file],
        });
        showSuccessToast(`${file.name} added successfully`)
      } else {
        showErrorToast(`Failed to load ${file.name}, it seems to be corrupted`)
      }
    };
    
  return (
        <Box w={'100%'} p={'10px'}>
          <QuillToolbar handleSendEmail={handleSendEmail} handleAttachment={handleAttachment}/>
          <ReactQuill
          className='quill-container'
          modules={modules}
          formats={formats}
          bounds={'.app'}
          theme="snow"
          onChange={handleBodyChange}
          value={editorContent}
          placeholder="Write your email here..."
          />
        </Box>
  );
};


export default EmailTemplateCustomer;
