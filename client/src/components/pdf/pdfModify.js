import React, { useState, useEffect, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Box } from '@chakra-ui/react';
import axios from 'axios'

const LoadPDF = ({idpdf}) => {
    console.log(idpdf)
    const [pdfInfo, setPdfInfo] = useState([]);
    const viewer = useRef(null);
    const filename = idpdf

    useEffect(() => {
      modifyPdf();
    }, []);

    
    function getpdf(filename) {
      return async function () {
        try {
          const response = await axios.get(`/one-drive-data/${filename}.pdf`, { responseType: 'arraybuffer' });
          return response;
        } catch (error) {
          console.log({ error });
        }
      }
    }
    
    
    const modifyPdf = async () => {
      const response = await getpdf(filename)();
      const bytes = new Uint8Array(response.data);
      const pdfDoc = await PDFDocument.load(bytes);
    
      const pdfBytes = await pdfDoc.save();
      const docUrl = URL.createObjectURL(
        new Blob([pdfBytes], { type: "application/pdf" })
      );
      setPdfInfo(docUrl);
    };
    

    return (
        <Box h={'85vh'}>
        {<iframe width={'100%'} height={'100%'} title="test-frame" src={pdfInfo} ref={viewer} type="application/pdf" />}
        </Box>
      );
  };
  
  export default LoadPDF;

