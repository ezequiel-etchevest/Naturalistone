import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactQuill from 'react-quill';
import '../../../assets/styleSheet.css'
import 'react-quill/dist/quill.snow.css';
import { Box } from '@chakra-ui/react';
import { modules, formats, QuillToolbar } from "../../samples/createSample/EmailTollbarButtons";

const EmailTemplateCustomer = ({setInput, input, handleSendEmail}) => {
  
const [editorContent, setEditorContent] = useState("");

    const handleBodyChange = (value) => {
      setEditorContent(value);
      setInput({
        ...input, htmlBody: value
      });
    };

  return (
        <Box w={'100%'} p={'10px'}>
          <QuillToolbar handleSendEmail={handleSendEmail} />
          <ReactQuill className='quill-container' modules={modules} formats={formats} bounds={'.app'} theme="snow" onChange={handleBodyChange} value={editorContent} placeholder="Write your email here..."/>
        </Box>
  );
};

export default EmailTemplateCustomer;
